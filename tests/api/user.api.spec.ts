import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";

test.describe("REST API Demo", () => {
  test("Should get list of users", async ({ request }) => {
    const baseURL = "https://reqres.in/api";
    const res = await request.get(`${baseURL}/users?page=2`, {
      headers: {
        "x-api-key": process.env.RES_RES_API_KEY, // optional; keep for parity with your GET example
      },
    });

    console.log(JSON.stringify(res.status()));

    expect(res.status()).toBe(200);
    const resJSON = await res.json();
    console.log(`>> RESPONSE: ${JSON.stringify(resJSON)}`);
  });

  test("Should create list of users", async ({ request }) => {
    const baseURL = "https://reqres.in/api";
     const payload = {
      name: "test-user",
      job: "leader",
      id: "123",
      createdAt: "2025-08-16T10:13:43.039Z",
    };
    const res = await request.post(`${baseURL}/users?page=2`, {
      headers: {
        "x-api-key": process.env.RES_RES_API_KEY, // optional; keep for parity with your GET example
      },
      data:payload
    });

    console.log(JSON.stringify(res.status()));

    expect(res.status()).toBe(201);
    const resJSON = await res.json();
    console.log(`>> RESPONSE: ${JSON.stringify(resJSON)}`);
   

    // // const payload = { name: "morpheus", job: "leader" };

    // const res = await request.post(`${baseURL}/users`, {
    //   headers: {
    //     "x-api-key": "reqres-free-v1", // optional; keep for parity with your GET example
    //   },
    //   data: payload, // Playwright sends JSON automatically for objects
    // });
  });
});
