import parser from "../src/index";

describe("each parser", () => {
  describe("string()", () => {
    describe("normal string", () => {
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

  describe("unicode", () => {
    test(`Japanese "あいう"`, () => {
      const result = parser(`{"str": "\u3042\u3044\u3046"}`);
      expect(result).toStrictEqual({ str: "あいう" });
      expect(result).toStrictEqual(JSON.parse(`{"str": "\u3042\u3044\u3046"}`));
    });
  });

  describe("other escapee", () => {
    test(`single quote "'"`, () => {
      const result = parser(`"'"`);
      expect(result).toStrictEqual("'");
      expect(result).toStrictEqual(JSON.parse(`"'"`));
    });

    test(`solidus(slash) "/"`, () => {
      const result = parser('{"str":"/"}');
      expect(result).toStrictEqual({ str: "/" });
      expect(result).toStrictEqual(JSON.parse('{"str":"/"}'));
    });

    test(`backspace "b"`, () => {
      const result = parser('{"str":"\\b"}');
      expect(result).toStrictEqual({ str: "" });
      expect(result).toStrictEqual(JSON.parse('{"str":"\\b"}'));
    });

    test(`formfeed "\\f"`, () => {
      const result = parser('{"str":"\\f"}');
      expect(result).toStrictEqual({ str: "\f" });
      expect(result).toStrictEqual(JSON.parse('{"str":"\\f"}'));
    });

    test(`linefeed "\\n"`, () => {
      const result = parser('{"str":"\\n"}');
      expect(result).toStrictEqual({ str: "\n" });
      expect(result).toStrictEqual(JSON.parse('{"str":"\\n"}'));
    });

    test(`carriage return "\\r"`, () => {
      const result = parser('{"str":"\\r"}');
      expect(result).toStrictEqual({ str: "\r" });
      expect(result).toStrictEqual(JSON.parse('{"str":"\\r"}'));
    });

    test(`tab "\\t"`, () => {
      const result = parser('{"str":"\\t"}');
      expect(result).toStrictEqual({ str: "	" });
      expect(result).toStrictEqual({ str: "\t" });
      expect(result).toStrictEqual(JSON.parse('{"str":"\\t"}'));
    });
  });
});
