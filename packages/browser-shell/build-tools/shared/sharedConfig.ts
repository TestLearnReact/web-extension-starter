import path from "path";
import { resSrc } from "./sharedUtils";

export const packages = ["browser-shell", "message-system"];

export const aliasVite = {
  "~icons/public-assets-icons/*": resSrc("../public/assets/icons/"),
  "@browser-shell": resSrc(),
  "@ui": resSrc("extension-ui/"),
  "@utils": resSrc("utils/"),
};

export const aliasWebpack = {
  "~icons/public-assets-icons": resSrc("../public/assets/icons/"),
  "@browser-shell": resSrc(),
  "@ui": resSrc("extension-ui/"),
  "@utils": resSrc("utils/"),
};

export const getAlias = (alias) =>
  packages.reduce(
    (alias, p) => ({
      ...alias,
      [`@workspace/${p}`]: path.resolve(__dirname, `../../../${p}/src`),
    }),
    alias
  );
