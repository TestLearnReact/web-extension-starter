import { sidebarMain } from '../cs-modules/sidebar';
import { ContentScriptRegistry } from '../types';

export const csSidebar = async () => {
  const registry = window['contentScriptRegistry'] as ContentScriptRegistry;
  await registry?.registerSidebarScript(sidebarMain);
  return;
};

(async () => {
  return await csSidebar();
})();

export default csSidebar;
