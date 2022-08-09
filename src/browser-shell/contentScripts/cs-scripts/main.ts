import { csMainModule } from "../cs-modules/main";

/**
 * Main content-script (manifest)
 * inject in all webpages
 *  */
(async () => await csMainModule())();
export {};
