import { baseConfig } from "../playwright.config";
import { defineConfig, devices } from "@playwright/test";
import { EnvConfig } from "../tests/helpers/config-fixture";
import path from "node:path"

export default defineConfig<EnvConfig>({
  ...baseConfig,
  testDir: path.resolve(process.cwd(),"./tests"),
  use: {
    ...baseConfig,

    envName: "dev",
    APPurl: "https://google.com",
    dbConfig:{
      server:"",
      dbName:"",
      connectionString: ""
      
    }
  },
});
