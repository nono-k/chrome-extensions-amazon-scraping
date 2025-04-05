import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  runner: {
    startUrls: ['https://www.amazon.co.jp/'],
  },
  manifest: {
    name: 'Amazon 商品情報取得',
    version: '1.0',
    description: 'Amazonの商品ページから画像URLや商品情報を取得します。',
    manifest_version: 3,
  },
  vite: () => ({
    plugins: [tailwindcss()],
  })
});
