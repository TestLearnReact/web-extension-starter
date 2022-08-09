import { toolbarMain } from "../cs-modules/toolbar";
import { ContentScriptRegistry } from "../types";

export const csToolbar = async () => {
  const registry = window["contentScriptRegistry"] as ContentScriptRegistry;
  registry?.registerToolbarScript(toolbarMain); // await
  return;
};

(async () => {
  await csToolbar();
})();
