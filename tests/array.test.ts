// eslint-disable-next-line import/no-unresolved
import parser from "../src/index";

describe("each parser", () => {
  describe("array()", () => {
    test(`"[]" (only bracket) should be [] (just array)`, () => {
      const result = parser("[]");
      expect(result).toStrictEqual([]);
      expect(result).toStrictEqual(JSON.parse("[]"));
    });

    test(`"[0]" (value is one number) should be array`, () => {
      const result = parser("[0]");
      expect(result).toStrictEqual([0]);
      expect(result[0]).toStrictEqual(0);
      expect(result.length).toStrictEqual(1);
      expect(result).toStrictEqual(JSON.parse("[0]"));
    });

    test(`"[0,1,2,3]" (value is some numbers) should be array`, () => {
      const result = parser("[0,1,2,3]");
      expect(result).toStrictEqual([0, 1, 2, 3]);
      expect(result[0]).toStrictEqual(0);
      expect(result[1]).toStrictEqual(1);
      expect(result[2]).toStrictEqual(2);
      expect(result[3]).toStrictEqual(3);
      expect(result.length).toStrictEqual(4);
      expect(result).toStrictEqual(JSON.parse("[0,1,2,3]"));
    });

    test(`"[""]" (value is no string) should be array`, () => {
      const result = parser('[""]');
      expect(result).toStrictEqual([""]);
      expect(result[0]).toStrictEqual("");
      expect(result.length).toStrictEqual(1);
      expect(result).toStrictEqual(JSON.parse('[""]'));
    });

    test(`"["a"]" (value is one string) should be array`, () => {
      const result = parser('["a"]');
      expect(result).toStrictEqual(["a"]);
      expect(result[0]).toStrictEqual("a");
      expect(result.length).toStrictEqual(1);
      expect(result).toStrictEqual(JSON.parse('["a"]'));
    });

    test(`"["a","b","c"]" (value is some strings) should be array`, () => {
      const result = parser('["a","b","c"]');
      expect(result).toStrictEqual(["a", "b", "c"]);
      expect(result[0]).toStrictEqual("a");
      expect(result[1]).toStrictEqual("b");
      expect(result[2]).toStrictEqual("c");
      expect(result.length).toStrictEqual(3);
      expect(result).toStrictEqual(JSON.parse('["a","b","c"]'));
    });
  });
});
