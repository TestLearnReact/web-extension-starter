import { resolve } from 'path';
import { bgCyan, black } from 'kolorist';
import { Configuration } from 'webpack';

/**
 *
 */
export const resSrc = (...args: string[]) =>
  resolve(__dirname, '../../src/', ...args);

export const resRoot = (...args: string[]) =>
  resolve(__dirname, '../../../../', ...args);

export const res = (...args: string[]) => resolve(__dirname, '../../', ...args);

/**
 *
 */
export const EXT_OUTDIR_WEBPACK = resRoot('extension/');
export const EXT_OUTDIR_VITE = resRoot('dist/');

export const OUTDIR_WEBPACK_NAME = 'extension';
export const OUTDIR_VITE_NAME = 'dist';

/**
 *
 */
export const port = parseInt(process.env.PORT || '') || 3000;
export const isDev = process.env.NODE_ENV !== 'production';
export const isProd = process.env.NODE_ENV === 'production';
export const nodeEnv = (process.env.NODE_ENV ||
  'development') as Configuration['mode'];
export const targetBrowser = process.env.TARGET_BROWSER || '';

/**
 *
 */
export function log(name: string, message: string) {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message);
}
