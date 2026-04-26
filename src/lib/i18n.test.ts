import assert from "node:assert/strict";
import test from "node:test";
import {
  getAlternateLanguagePaths,
  localizeHref,
  stripLocaleFromPath,
  switchLocalePath
} from "./i18n";

test("localizeHref prefixes secondary locale routes and keeps external URLs unchanged", () => {
  assert.equal(localizeHref("zh-TW", "/calculators"), "/zh-TW/calculators");
  assert.equal(localizeHref("en", "/calculators"), "/calculators");
  assert.equal(localizeHref("zh-TW", "/"), "/zh-TW");
  assert.equal(localizeHref("en", "https://calculatormap.com"), "https://calculatormap.com");
});

test("stripLocaleFromPath removes the secondary locale prefix", () => {
  assert.equal(stripLocaleFromPath("/zh-TW"), "/");
  assert.equal(stripLocaleFromPath("/zh-TW/calculator/roas-calculator"), "/calculator/roas-calculator");
  assert.equal(stripLocaleFromPath("/calculator/roas-calculator"), "/calculator/roas-calculator");
});

test("switchLocalePath toggles between localized and default routes", () => {
  assert.equal(switchLocalePath("/calculator/roas-calculator", "zh-TW"), "/zh-TW/calculator/roas-calculator");
  assert.equal(switchLocalePath("/zh-TW/calculator/roas-calculator", "en"), "/calculator/roas-calculator");
});

test("getAlternateLanguagePaths returns absolute URLs for each supported locale", () => {
  const paths = getAlternateLanguagePaths("/calculator/roas-calculator");

  assert.deepEqual(paths, {
    "x-default": "https://calculatormap.com/calculator/roas-calculator",
    en: "https://calculatormap.com/calculator/roas-calculator",
    "zh-TW": "https://calculatormap.com/zh-TW/calculator/roas-calculator"
  });
});
