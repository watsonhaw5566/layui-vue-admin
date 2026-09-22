import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginLess } from '@rsbuild/plugin-less';
import AutoImport from 'unplugin-auto-import/rspack';
import Components from 'unplugin-vue-components/rspack';
import { LayuiVueResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath, URL } from 'node:url';

const excludeComponents = ['LightIcon', 'DarkIcon'];

export default defineConfig({
  source: {
    entry: {
      index: './src/main.ts',
    },
  },
  html: {
    template: './index.html',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [pluginVue(), pluginLess()],
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        AutoImport({
          resolvers: [LayuiVueResolver()],
        }),
        Components({
          resolvers: [
            LayuiVueResolver({
              resolveIcons: true,
              exclude: excludeComponents,
            }),
          ],
        }),
      ]);
    },
  },
});
