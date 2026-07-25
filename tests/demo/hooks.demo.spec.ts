import { test, expect } from "@playwright/test";

test.beforeAll("Before All hook", async () => {
  console.log("Before All");
});

test.beforeEach("Before Each hook", async () => {
  console.log("Before Each");
});

test.describe("Test Suite 1", () => {
  test.beforeAll("Before All hook inside suite1", async () => {
    console.log("Before All inside suite1");
  });

  test.beforeEach("Before Each hook inside suite1", async () => {
    console.log("Before Each inside suite1");
  });

  test("Test one", () => {
    console.log("Test one");
  });

  test("Test Two", () => {
    console.log("Test Two");
  });

  test("Test Three", () => {
    console.log("Test Three");
  });
});


test.describe("Test Suite 2", () => {
  test.beforeAll("Before All hook inside suite2", async () => {
    console.log("Before All inside suite2");
  });

  test.beforeEach("Before Each hook inside suite2", async () => {
    console.log("Before Each inside suite2");
  });

  test("Test one", () => {
    console.log("Test one");
  });

  test("Test Two", () => {
    console.log("Test Two");
  });

  test("Test Three", () => {
    console.log("Test Three");
  });
});
