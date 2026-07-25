import { test as base } from "@playwright/test";

export type EnvConfig = {
  envName: string;
  APPurl: string;
  dbConfig: {};
};

export const test = base.extend<EnvConfig>({
  envName: ["Test", { option: true }],
  APPurl: ["<provideURL>", { option: true }],
  dbConfig: [{}, { option: true }],
});
