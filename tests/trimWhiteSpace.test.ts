import parser from "../src/index";

describe("each parser", () => {
  describe("trimWhiteSpace()", () => {
    test(`not trim when pass string`, () => {
      const result = parser('" my name is kobakazu0429 "');
      expect(result).toStrictEqual(" my name is kobakazu0429 ");
    });

    test(`array: " [ 0 , 1 , 2 , 3 , "a", "b", "c"] "`, () => {
      const result = parser(' [ 0 , 1 , 2 , 3  , "a" , "b" , "c" ] ');
      expect(result).toStrictEqual([0, 1, 2, 3, "a", "b", "c"]);
      expect(result).toStrictEqual(
        JSON.parse(' [ 0 , 1 , 2 , 3  , "a" , "b" , "c" ] ')
      );
    });

    test(`object: " { "key1" : { "key2" : "value1" }} "`, () => {
      const result = parser(' { "key1" : { "key2" : "value1" }} ');
      expect(result).toStrictEqual({ key1: { key2: "value1" } });
      expect(result).toStrictEqual(
        JSON.parse(' { "key1" : { "key2" : "value1" }} ')
      );
    });
  });
});
