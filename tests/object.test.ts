// eslint-disable-next-line import/no-unresolved
import parser from "../src/index";

describe("each parser", () => {
  describe("object()", () => {
    describe("flat", () => {
      test(`"{}" (only braces) should be {} (just object)`, () => {
        const result = parser("{}");
        expect(result).toStrictEqual({});
        expect(result).toStrictEqual(JSON.parse("{}"));
      });

      test(`"{"key1":123}" (value is number) should be object`, () => {
        const result = parser('{"key1":123}');
        expect(result).toStrictEqual({ key1: 123 });
        expect(result).toStrictEqual(JSON.parse('{"key1":123}'));
      });

      test(`"{"key1":""}" (value is "") should be object`, () => {
        const result = parser('{"key1":""}');
        expect(result).toStrictEqual({ key1: "" });
        expect(result).toStrictEqual(JSON.parse('{"key1":""}'));
      });

      test(`"{"key1":"value1"}" (value is strign) should be object`, () => {
        const result = parser('{"key1":"value1"}');
        expect(result).toStrictEqual({ key1: "value1" });
        expect(result).toStrictEqual(JSON.parse('{"key1":"value1"}'));
      });

      test(`"{"key1":true}" (value is boolean: true) should be object`, () => {
        const result = parser('{"key1":true}');
        expect(result).toStrictEqual({ key1: true });
        expect(result).toStrictEqual(JSON.parse('{"key1":true}'));
      });

      test(`"{"key1":false}" (value is boolean: false) should be object`, () => {
        const result = parser('{"key1":false}');
        expect(result).toStrictEqual({ key1: false });
        expect(result).toStrictEqual(JSON.parse('{"key1":false}'));
      });

      test(`"{"key1":null}" (value is boolean: null) should be object`, () => {
        const result = parser('{"key1":null}');
        expect(result).toStrictEqual({ key1: null });
        expect(result).toStrictEqual(JSON.parse('{"key1":null}'));
      });
    });

    describe("deep", () => {
      test(`"{key1:{}}" (only braces) should be has {} (just object)`, () => {
        const result = parser('{"key1":{}}');
        expect(result).toStrictEqual({ key1: {} });
        expect(result).toStrictEqual(JSON.parse('{"key1":{}}'));
      });

      test(`"{"key1":{"key2":123}}" (value is number) should be object`, () => {
        const result = parser('{"key1":{"key2":123}}');
        expect(result).toStrictEqual({ key1: { key2: 123 } });
        expect(result).toStrictEqual(JSON.parse('{"key1":{"key2":123}}'));
      });

      test(`"{"key1":{"key2":""}}" (value is "") should be object`, () => {
        const result = parser('{"key1":{"key2":""}}');
        expect(result).toStrictEqual({ key1: { key2: "" } });
        expect(result).toStrictEqual(JSON.parse('{"key1":{"key2":""}}'));
      });

      test(`"{"key1":{"key2":"value1"}}" (value is strign) should be object`, () => {
        const result = parser('{"key1":{"key2":"value1"}}');
        expect(result).toStrictEqual({ key1: { key2: "value1" } });
        expect(result).toStrictEqual(JSON.parse('{"key1":{"key2":"value1"}}'));
      });

      test(`"{"key1":{"key2":true}}" (value is boolean: true) should be object`, () => {
        const result = parser('{"key1":{"key2":true}}');
        expect(result).toStrictEqual({ key1: { key2: true } });
        expect(result).toStrictEqual(JSON.parse('{"key1":{"key2":true}}'));
      });

      test(`"{"key1":{"key2":false}}" (value is boolean: false) should be object`, () => {
        const result = parser('{"key1":{"key2":false}}');
        expect(result).toStrictEqual({ key1: { key2: false } });
        expect(result).toStrictEqual(JSON.parse('{"key1":{"key2":false}}'));
      });

      test(`"{"key1":{"key2":null}}" (value is boolean: null) should be object`, () => {
        const result = parser('{"key1":{"key2":null}}');
        expect(result).toStrictEqual({ key1: { key2: null } });
        expect(result).toStrictEqual(JSON.parse('{"key1":{"key2":null}}'));
      });
    });
  });
});
