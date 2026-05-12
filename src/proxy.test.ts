import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

const originalAdminUsername = process.env.ADMIN_USERNAME;
const originalAdminPassword = process.env.ADMIN_PASSWORD;

function makeRequest(url: string, init?: RequestInit) {
  return new NextRequest(new Request(url, init));
}

function encodeBasicAuth(username: string, password: string) {
  return Buffer.from(`${username}:${password}`).toString("base64");
}

function resetAdminEnv() {
  if (originalAdminUsername === undefined) {
    delete process.env.ADMIN_USERNAME;
  } else {
    process.env.ADMIN_USERNAME = originalAdminUsername;
  }

  if (originalAdminPassword === undefined) {
    delete process.env.ADMIN_PASSWORD;
  } else {
    process.env.ADMIN_PASSWORD = originalAdminPassword;
  }
}

test("middleware redirects www traffic to the apex hostname", () => {
  const request = makeRequest("https://www.calculatormap.com/calculators?ref=campaign");

  const response = middleware(request);

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://calculatormap.com/calculators?ref=campaign");
});

test("middleware blocks admin pages when credentials are missing", () => {
  delete process.env.ADMIN_USERNAME;
  delete process.env.ADMIN_PASSWORD;

  const request = makeRequest("https://calculatormap.com/admin");
  const response = middleware(request);

  assert.equal(response.status, 401);
  assert.match(response.headers.get("www-authenticate") ?? "", /Basic realm="CalculatorMap Admin"/);
  assert.equal(response.headers.get("cache-control"), "private, no-store");

  resetAdminEnv();
});

test("middleware allows admin API requests with matching basic auth credentials", () => {
  process.env.ADMIN_USERNAME = "admin-user";
  process.env.ADMIN_PASSWORD = "admin-pass";

  const request = makeRequest("https://calculatormap.com/api/admin/settings", {
    headers: {
      authorization: `Basic ${encodeBasicAuth("admin-user", "admin-pass")}`
    }
  });
  const response = middleware(request);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-middleware-next"), "1");

  resetAdminEnv();
});
