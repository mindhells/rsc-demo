import compress from '@fastify/compress';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import closeWithGrace from 'close-with-grace';
import fastify from 'fastify';

import { getFullPath, readJSONFile } from './server/fileManager.js';
import { setGlobalContext } from './server/withContext.js';
import { createGlobalContext } from './server/createGlobalContext.js';
import { createRenderApp } from './server/createRenderApp.js';
import { runServerAction } from './server/runServerAction.js';

const REACT_CLIENT_MANIFEST_MAP = readJSONFile(
  'public/react-client-manifest.json',
);
setGlobalContext(createGlobalContext());
const renderApp = createRenderApp(REACT_CLIENT_MANIFEST_MAP);

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

// this is here so the workshop app knows when the server has started
app.head('/', (req, res) => res.status(200));

app.get('/rsc', (req, res) => {
  res.type('text/html').send(renderApp());
});

app.post('/action', async (req, res) => {
  const serverReference = req.headers['rsc-action'] as string;
  const returnValue = await runServerAction(
    serverReference,
    req.body as object,
  );
  res.type('text/html');
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
