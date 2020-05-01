// eslint-disable-next-line import/no-unresolved
import parser from "../src/index";

describe("each parser", () => {
  describe("number()", () => {
    test(`"0" shoule be 0`, () => {
      const result = parser("0");
      expect(result).toStrictEqual(0);
    });

    test(`"-1" shoule be -1`, () => {
      const result = parser("-1");
      expect(result).toStrictEqual(-1);
    });

    test(`"0.0" shoule be 0`, () => {
      const result = parser("0.0");
      expect(result).toStrictEqual(0);
    });

    test(`"0.42" shoule be 0.42`, () => {
      const result = parser("0.42");
      expect(result).toStrictEqual(0.42);
    });

    test(`"1e10" shoule be 10000000000`, () => {
      const result = parser("1e10");
      expect(result).toStrictEqual(10000000000);
    });

    test(`"0.2e10" shoule be 10000000000`, () => {
      const result = parser("0.2e10");
      expect(result).toStrictEqual(2000000000);
    });

    test(`"2.3e10" shoule be 10000000000`, () => {
      const result = parser("2.3e10");
      expect(result).toStrictEqual(23000000000);
    });

    test(`"10e-2" shoule be 0.1`, () => {
      const result = parser("10e-2");
      expect(result).toStrictEqual(0.1);
    });

    test(`"10e+2" shoule be 1000`, () => {
      const result = parser("10e+2");
      expect(result).toStrictEqual(1000);
    });
  });
});
