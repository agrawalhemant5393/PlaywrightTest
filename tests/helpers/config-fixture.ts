import { test as base } from "@playwright/test";

export type EnvConfig = {
  envName: string;
  APPurl: string;
  /** Base URL for the nopCommerce admin web app (e.g. https://admin-demo.nopcommerce.com) */
  nopCommerceWeb: string;
  /** Base URL for the REST API under test (e.g. https://reqres.in/api) */
  apiURL: string;
  dbConfig: {};
};

export const test = base.extend<EnvConfig>({
  envName: ["Test", { option: true }],
  APPurl: ["<provideURL>", { option: true }],
  nopCommerceWeb: ["<provideURL>", { option: true }],
  apiURL: ["<provideURL>", { option: true }],
  dbConfig: [{}, { option: true }],
});
