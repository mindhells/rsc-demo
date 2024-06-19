import compress from '@fastify/compress';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import closeWithGrace from 'close-with-grace';
import fastify from 'fastify';
import { PassThrough } from 'node:stream';
import { createElement as h } from 'react';
import {
  decodeReply,
  renderToPipeableStream,
} from 'react-server-dom-webpack/server';
import App from './components/App.js';
import {
  getFullPath,
  getRelativeSourcePath,
  readJSONFile,
} from './server/fileManager.js';
import { setGlobalContext, withContext } from './server/withContext.js';
import { createGlobalContext } from './server/createGlobalContext.js';

const REACT_CLIENT_MANIFEST_MAP = readJSONFile(
  'public/react-client-manifest.json',
);

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

await app
  .register(multipart, {
    // Check out the documentation for the other options.
    // You likely want to store all incoming files into disk
    // and not keep them in memory.
    attachFieldsToBody: true,
  })
  .register(compress)
  .register(fastifyStatic, {
    root: getFullPath('public'),
    index: false,
    wildcard: false,
    prefix: '/public/',
  });

setGlobalContext(createGlobalContext());

// this is here so the workshop app knows when the server has started
app.head('/', (req, res) => res.status(200));

const renderApp = (returnValue = undefined) => {
  return withContext(() => {
    const root = h(App);
    const { pipe } = renderToPipeableStream(
      { root, returnValue },
      REACT_CLIENT_MANIFEST_MAP,
    );
    return pipe(new PassThrough());
  });
};

app.get('/rsc', (req, res) => {
  res.type('text/html').send(renderApp());
});

app.post('/action', async (req, res) => {
  const serverReference = req.headers['rsc-action'] as string;
  const [filepath, name] = serverReference.split('#');
  // const url = relative(join(__dirname, 'actions'), new URL(filepath).pathname);
  const url = getRelativeSourcePath(filepath, 'actions');
  const action = (await import(`./actions/${url}`))[name];
  // Validate that this is actually a function we intended to expose and
  // not the client trying to invoke arbitrary functions. In a real app,
  // you'd have a manifest verifying this before even importing it.
  if (action.$$typeof !== Symbol.for('react.server.reference')) {
    throw new Error('Invalid action');
  }

  // Convert the parsed body to a FormData object, as that's what decodeReply
  // requires.
  const formData = new FormData();
  for (const [key, value] of Object.entries(req.body as object)) {
    formData.append(key, value.value);
  }
  const reply = decodeReply(formData);
  const args = await reply;

  res.type('text/html');
  const returnValue = await withContext(() => {
    return action(...args);
  });
  return renderApp(returnValue);
});

app.get('/', function sendIndex(req, res) {
  res.type('text/html');
  return res.sendFile('index.html');
});

await app.listen({ port: 3000 });

closeWithGrace(async ({ signal, err }) => {
  if (err) {
    app.log.error(err, 'Shutting down server due to error');
  } else if (signal) {
    app.log.info({ signal }, 'Shutting down server due to signal');
  }

  await app.close();
});
