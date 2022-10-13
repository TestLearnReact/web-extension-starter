/**
 *
 */
export declare const resSrc: (...args: string[]) => string;
export declare const resRoot: (...args: string[]) => string;
export declare const res: (...args: string[]) => string;
/**
 *
 */
export declare const EXT_OUTDIR_WEBPACK: string;
export declare const EXT_OUTDIR_VITE: string;
export declare const OUTDIR_WEBPACK_NAME = "extension";
export declare const OUTDIR_VITE_NAME = "dist";
/**
 *
 */
export declare const port: number;
export declare const isDev: boolean;
export declare const isProd: boolean;
export declare const nodeEnv: "production" | "none" | "development" | undefined;
export declare const targetBrowser: string;
/** */
export declare function log(name: string, message: string): void;
