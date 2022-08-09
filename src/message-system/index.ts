import { getScope } from "./scope";

export { getScope, getScope as useScope };

// Default scope
export const __defaultScopeName = "@extend-chrome/messages__root";
export const messages = getScope(__defaultScopeName);
export const { getMessage } = messages;

export default getMessage; // todo error in utils
// export const test = "666";
// export * as rxjsInternaltypes from "rxjs/internal/types";
// export * from "rxjs/internal/types";

// import * as rxjstypes from "rxjs/internal/types";
// export { rxjstypes };
