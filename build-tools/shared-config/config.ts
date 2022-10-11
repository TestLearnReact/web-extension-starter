import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
//dotenv.config({ path: path.resolve(__dirname, "./env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  MONGO_URI: string | undefined;
  TOOLBAR_OPEN: boolean | undefined;
  SIDEBAR_OPEN: boolean | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  TOOLBAR_OPEN: boolean;
  SIDEBAR_OPEN: boolean;
}

//export type Config = Required<ENV>;

// Loading process.env as ENV interface

// const p = (env: ENV) => {
//   if (process?.env) {
//     console.log("webpack");
//   }
//   if (import.meta.env) {
//     console.log("vite");
//   }
// };

const getConfig = (): ENV => {
  let ret = {};

  if (false) {
    // ret = {
    //   NODE_ENV: process.env.NODE_ENV,
    //   PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    //   MONGO_URI: process.env.MONGO_URI,
    //   TOOLBAR_OPEN:
    //     process.env.TOOLBAR_OPEN || import.meta.env.TOOLBAR_OPEN
    //       ? process.env.TOOLBAR_OPEN === "true"
    //       : undefined,
    //   SIDEBAR_OPEN: process.env.SIDEBAR_OPEN
    //     ? process.env.SIDEBAR_OPEN === "true"
    //     : undefined,
    // };
  }

  return {
    NODE_ENV: import.meta.env.NODE_ENV,
    PORT: import.meta.env.PORT ? Number(import.meta.env.PORT) : undefined,
    MONGO_URI: import.meta.env.MONGO_URI,
    TOOLBAR_OPEN: import.meta.env.TOOLBAR_OPEN
      ? import.meta.env.TOOLBAR_OPEN === "true"
      : undefined,
    SIDEBAR_OPEN: import.meta.env.SIDEBAR_OPEN
      ? import.meta.env.SIDEBAR_OPEN === "true"
      : undefined,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export { sanitizedConfig as config };

export default sanitizedConfig;
