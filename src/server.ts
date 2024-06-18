import compress from '@fastify/compress';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import closeWithGrace from 'close-with-grace';
import fastify from 'fastify';
import { dirname, join, relative } from 'node:path';
import { PassThrough } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import {
  decodeReply,
  renderToPipeableStream,
} from 'react-server-dom-webpack/server';
import App from './App.js';
import { appContextStore } from './appContextStore.js';
import { Chat } from './model/Chat.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const moduleBasePath = new URL(import.meta.url).href;

// this is to resolve the client component imports in the server
import { readFileSync } from 'node:fs';
const REACT_CLIENT_MANIFEST = readFileSync(
  join(__dirname, '..', 'dist', 'react-client-manifest.json'),
  'utf-8',
);
const REACT_CLIENT_MANIFEST_MAP = JSON.parse(REACT_CLIENT_MANIFEST);

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
    root: join(__dirname, '..', 'public'),
    index: false,
    wildcard: false,
  })
  .register(fastifyStatic, {
    root: join(__dirname, '..', 'dist'),
    index: false,
    wildcard: false,
    decorateReply: false,
  });

// this is here so the workshop app knows when the server has started
app.head('/', (req, res) => res.status(200));

const renderApp = (returnValue = undefined) => {
  const appContext = { chatModel: new Chat() };
  return appContextStore.run(appContext, () => {
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
  const url = relative(join(__dirname, 'actions'), new URL(filepath).pathname);
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
  const reply = decodeReply(formData, moduleBasePath);
  const args = await reply;

  res.type('text/html');
  const appContext = { chatModel: new Chat() };
  const returnValue = await appContextStore.run(appContext, () => {
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
