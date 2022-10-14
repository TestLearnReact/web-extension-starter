/* eslint-disable camelcase */
import { defineDynamicResource, defineManifest } from '@crxjs/vite-plugin';
import packageJson from '../../package.json';

const { version } = packageJson;

export const manifest = defineManifest({
  manifest_version: 3,
  name: 'V3 -> CRXJS <-',
  version: version,
  action: {
    default_popup: 'src/browser-shell/popup/index.html',
  },
  options_ui: {
    page: 'src/browser-shell/options/index.html',
    open_in_tab: true,
  },
  icons: {
    16: 'public/assets/icons/icon-512.png',
    48: 'public/assets/icons/icon-512.png',
    128: 'public/assets/icons/icon-512.png',
  },
  content_scripts: [
    {
      js: ['src/browser-shell/contentScripts/cs-scripts/main.ts'],
      matches: ['https://www.google.com/*'],
      run_at: 'document_idle',
      // run_at: "document_end",
    },
  ],
  background: {
    service_worker: 'src/browser-shell/background/dev.ts',
    type: 'module',
  },
  permissions: ['scripting', 'tabs', 'storage', 'activeTab', 'webNavigation'],
  host_permissions: ['https://www.google.com/*'], //
  web_accessible_resources: [
    defineDynamicResource({
      matches: ['https://www.google.com/*'], // "https://www.google.com/*"
    }),
    {
      resources: [
        'dist/*',
        'src/*',
        'assets/*',
        'public/*',
        'public/assets/icons/close.svg',
        'public/assets/icons/openSidebar.svg',
        'assets/icons/openSidebar.svg',
      ],
      matches: ['<all_urls>'],
    },
  ],
});
