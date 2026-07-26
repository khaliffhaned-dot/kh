import { describe, expect, it } from "vitest";
import { translations } from "./translations";

describe("translations", () => {
  it("defines the same top-level locales for en and my", () => {
    expect(Object.keys(translations)).toEqual(["en", "my"]);
  });

  it("has matching section keys across all locales", () => {
    const [enSections, mySections] = [
      Object.keys(translations.en).sort(),
      Object.keys(translations.my).sort(),
    ];
    expect(mySections).toEqual(enSections);
  });

  it("has matching nav keys across all locales", () => {
    expect(Object.keys(translations.my.nav).sort()).toEqual(
      Object.keys(translations.en.nav).sort()
    );
  });

  it("has non-empty skill level labels for both locales", () => {
    for (const locale of Object.values(translations)) {
      for (const label of Object.values(locale.training.skillLevels)) {
        expect(label.length).toBeGreaterThan(0);
      }
    }
  });
});
