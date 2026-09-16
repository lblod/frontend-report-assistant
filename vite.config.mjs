import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import apiProxy from './lib/vite-plugin-api-proxy.mjs';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    apiProxy(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
