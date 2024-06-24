import { readJSONFile } from './fileManager.js';

const REACT_CLIENT_MANIFEST_MAP = readJSONFile('assetsManifest.json');

function getAssetURL(asset) {
  console.log(asset, REACT_CLIENT_MANIFEST_MAP[asset]);
  return REACT_CLIENT_MANIFEST_MAP[asset];
}

function BaseLayout() {
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
  <link rel="icon" type="image/x-icon" href="${getAssetURL('favicon.ico')}">
  <title>RSC demo</title>
  <style>
    @font-face {
      font-weight: 400;
      font-family: "Inter";
      font-style: normal;
      font-display: swap;
      src: url("${getAssetURL('fonts/inter/inter-regular.eot')}");
      src:
        local("Inter Regular"),
        local("Inter-Regular"),
        url("${getAssetURL('fonts/inter/inter-regular.woff2')}") format("woff2"),
        url("${getAssetURL('fonts/inter/inter-regular.woff')}") format("woff"),
        url("${getAssetURL('fonts/inter/inter-regular.ttf')}") format("truetype");
    }
    @font-face {
      font-weight: 600;
      font-family: "Inter";
      font-style: normal;
      font-display: swap;
      src: url("${getAssetURL('fonts/inter/inter-semibold.eot')}");
      src:
        local("Inter SemiBold"),
        local("Inter-SemiBold"),
        url("${getAssetURL('fonts/inter/inter-semibold.woff2')}") format("woff2"),
        url("${getAssetURL('fonts/inter/inter-semibold.woff')}") format("woff"),
        url("${getAssetURL('fonts/inter/inter-semibold.ttf')}") format("truetype");
    }
    @font-face {
      font-family: "Arial Fallback";
      font-weight: 400;
      src: local(Arial);
      size-adjust: 107.4%;
      descent-override: 19%;
    }
    @font-face {
      font-family: "Arial Fallback";
      font-weight: 600;
      src: local(Arial Bold);
      size-adjust: 107.7%;
      descent-override: 19%;
    }
  </style>
  <link rel="stylesheet" href="${getAssetURL('client.css')}">
  <link rel="stylesheet" href="${getAssetURL('server.css')}">
</head>

<body>
  <div id="root"></div>
  <script type="module" src="${getAssetURL('bootstrap.js')}"></script>
</body>
</html>
  `;
}

export default BaseLayout;
