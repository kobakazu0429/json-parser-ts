import parser from "../src/index";

describe("each parser", () => {
  describe("boolOrNull()", () => {
    test(`"true" shoule be true`, () => {
      const result = parser("true");
      expect(result).toStrictEqual(true);
    });

    test(`"false" shoule be false`, () => {
      const result = parser("false");
      expect(result).toStrictEqual(false);
    });

    test(`"null" shoule be null`, () => {
      const result = parser("null");
      expect(result).toStrictEqual(null);
    });

    test(`"undefined" shoule be throw error`, () => {
      expect(() => parser("undefined")).toThrowError(
        /Expected: true, false or null, Real: unknown. \(NOTE: undefined is not defined as JSON schema.\), at position [\d]+$/
      );
    });

    test(`"sometext" shoule be throw error`, () => {
      expect(() => parser("sometext")).toThrowError(
        /Expected: true, false or null, Real: unknown. \(NOTE: undefined is not defined as JSON schema.\), at position [\d]+$/
      );
    });
  });
});
