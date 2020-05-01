import parser from "../src/index";

describe("each parser", () => {
  describe("string()", () => {
    test(`"" shoule be ""`, () => {
      const result = parser('""');
      expect(result).toStrictEqual("");
    });

    test(`"key" shoule be "key"`, () => {
      const result = parser('"key"');
      expect(result).toStrictEqual("key");
    });

    test(`"key1" shoule be "key1"`, () => {
      const result = parser('"key1"');
      expect(result).toStrictEqual("key1");
    });

    test(`"key'1" shoule be "key'1"`, () => {
      const result = parser('"key\'1"');
      expect(result).toStrictEqual("key'1");
    });
  });
});
