import { baseConfig } from "../playwright.config";
import { defineConfig, devices } from "@playwright/test";
import { EnvConfig } from "../tests/helpers/config-fixture";
import path from "node:path"

export default defineConfig<EnvConfig>({
  ...baseConfig,
  testDir: path.resolve(process.cwd(),"./tests"),
  use: {
    ...baseConfig,

    envName: "Test",
    APPurl: "https://katalon-demo-cura.herokuapp.com/",
    dbConfig:{
      server:"",
      dbName:"",
      connectionString: ""
      
    }
  },
});
