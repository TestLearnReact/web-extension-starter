declare const __DEV__: boolean;
declare const __IS_WEBPACK__: boolean;
declare const __IS_VITE__: boolean;
declare const __IS_CRXJS__: boolean;

declare module "*?script";
declare module "*?script&module";

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}
