import { baseConfig } from "../playwright.config";
import { defineConfig, devices } from "@playwright/test";
import { EnvConfig } from "../tests/helpers/config-fixture";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default defineConfig<EnvConfig>({
  ...baseConfig,
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig,

    envName: "Test",
    APPurl: "https://katalon-demo-cura.herokuapp.com/",
    nopCommerceWeb: "https://admin-demo.nopcommerce.com",
    apiURL: "https://reqres.in/api",

    dbConfig: {
      server: "",
      dbName: "",
      connectionString: "",
    },
  },
});
