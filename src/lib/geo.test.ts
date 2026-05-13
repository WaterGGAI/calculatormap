import assert from "node:assert/strict";
import test from "node:test";
import { calculators } from "./data";
import { buildCalculatorIndex, buildLlmsFullTxt, buildLlmsTxt } from "./geo";

test("calculator index exposes every published calculator without private routes", () => {
  const index = buildCalculatorIndex();

  assert.equal(index.calculators.length, calculators.length);
  assert.equal(index.site.url, "https://calculatormap.com");
  assert.equal(index.machineReadableResources.llms, "https://calculatormap.com/llms.txt");
  assert.ok(index.calculators.every((calculator) => calculator.url.startsWith("https://calculatormap.com/calculator/")));
  assert.ok(!JSON.stringify(index).includes("/admin"));
  assert.ok(!JSON.stringify(index).includes("/api/admin"));
});

test("llms files give agents a curated and complete content map", () => {
  const llms = buildLlmsTxt();
  const full = buildLlmsFullTxt();

  assert.match(llms, /^# CalculatorMap/);
  assert.match(llms, /Calculator index JSON/);
  assert.match(llms, /XML sitemap/);
  assert.match(full, /## Calculators/);

  for (const calculator of calculators) {
    assert.match(full, new RegExp(`https://calculatormap\\.com/calculator/${calculator.slug}`));
  }

  assert.ok(!llms.includes("/admin"));
  assert.ok(!full.includes("/admin"));
});
