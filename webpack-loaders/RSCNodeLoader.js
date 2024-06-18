import { load } from 'react-server-dom-webpack/node-loader';

export default function (source, sourceMap) {
  const callback = this.async();
  // if (!source.includes('use client')) {
  //   return callback(null, source, sourceMap);
  // }
  load(`file://${this.resourcePath}`, null, async () => {
    return {
      format: 'module',
      source,
    }
  }).then(result => {
    return callback(null, result.source, sourceMap);
  });
}
