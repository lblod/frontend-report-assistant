import { loadEnv } from 'vite';

export default function apiProxy(options = {}) {
  const { envKey = 'PROXY' } = options;

  let { target } = options;

  return {
    name: 'vite-plugin-api-proxy',
    config(config, { mode }) {
      if (!target) {
        const env = loadEnv(mode, process.cwd(), '');
        target = env[envKey];
      }

      if (target) {
        console.info(`[api-proxy] Proxy to ${target} enabled.`);
      } else {
        console.warn(
          `[api-proxy] No target found for ${envKey}. Proxy disabled.`,
        );
        return;
      }

      return {
        server: {
          proxy: {
            '^/.*': {
              target,
              changeOrigin: true,
              secure: false,
              bypass: (request) => {
                return shouldProxy(request) ? null : request.url;
              },
            },
          },
        },
      };
    },
  };
}

function shouldProxy(request) {
  if (
    request.headers.upgrade === 'websocket' &&
    request.headers['sec-websocket-protocol'] === 'vite-hmr'
  ) {
    return false;
  }

  // We assume all non-GET requests are API requests, which need to be proxied
  if (request.method !== 'GET') return true;

  // Known local paths that match most Ember + Vite apps
  const knownLocalPaths = [
    /^\/(\?.*)?$/,
    /^\/index\.html/,
    /^\/@vite/,
    /^\/vite/,
    /\/@-?embroider/,
    /^\/app\//,
    /^\/assets/,
    /^\/node_modules\//,
    /^\/vendor\//,
  ];

  if (knownLocalPaths.some((path) => path.test(request.url))) {
    return false;
  }

  const isLocalAsset =
    /\.(js|ts|hbs|css|less|sass|scss|png|jpg|jpeg|gif|svg|ico|woff|woff2|json|map|webmanifest)$/i.test(
      request.url,
    );

  if (isLocalAsset) {
    return false;
  }

  const accept = request.headers.accept || '';
  if (accept.includes('text/html')) {
    return false;
  }

  // Everything else is assumed to be an API call
  return true;
}
