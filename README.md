# RSC (React Server Components) demo

This project is a simple chat application implemented using RSC

## Launching the application

Make sure you have the latest node LTS version (>=20.14) and install the project deps. You can use `nvm` as in this example:

```sh
nvm install 20.14.0
nvm alias default 20.14.0
corepack enable pnpm
pnpm i
```

Node CorePack might ask you to update your pnpm version, just go ahead and do it. Then you can just launch the development environment with:

```sh
pnpm watch
```

When the server is ready you'll see a link (e.g. <http://127.0.0.1:3000>)

## Debugging the application

Launching it with `pnpm watch`, nodemon (through a webpack plugin) launches the Nodejs process with the inspection port 9229.

Source-maps are generated by webpack so you can create breakpoints on the original sources (both on the server and the client).

For the server part, there's a launch configuration for VSCode you can use to attach to the running process.

## Code organization

- src
  - actions:  server actions
  - components: react components
    - *.client.tsx: client components
  - client: client boot scripts (and root react component)
  - model: chat data source for the demo
  - server: fastify server implementation

## Stack

- NodeJS (server)
- Typescript
- Fastify
- Sass

## Devtools

- Webpack
- SWC loader
- Biome
- Nodemon

## Features

- ✅ Server components
- ✅ Server components context with `AsyncLocalStorage`
- ✅ Client components
- ✅ Server actions (with revalidation)
- ❌ Error boundaries
- ❌ Initial SSR rendering (needs to be done in a separate process without `react-server` condition)
- ❌ Client routing

## External references

- [Epic web workshop about RSC](https://react-server-components.epicweb.dev/)
- [Epic web demo project](https://github.com/epicweb-dev/react-server-components)
- [Alex demo project](https://github.com/sviridoff/rsc-webpack-swc-fastify-demo/tree/main)
- [RSC without a framework article](https://timtech.blog/posts/react-server-components-rsc-no-framework/)
- [Ben Holmes demo project](https://github.com/bholmesdev/simple-rsc)
- [Minimal React Server Components Bundler & Library](https://github.com/unstubbable/mfng)
- [Chechengyi demo project](https://github.com/Chechengyi/rsc-demo)
