/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */

type MyObject = { [key: string]: any };

const isBetween0And9 = (str: string) => str >= "0" && str <= "9";

const parser = (text: string): any => {
  // console.log(text);
  // 現在の文字のインデックス値
  let at = 0;
  // // 現在の文字
  let ch = text.charAt(at);

  const error = (errorMessage: string) => {
    throw new SyntaxError(`${errorMessage}, at position ${at}`);
  };

  const next = (expect?: string): string | never => {
    if (expect && ch !== expect) {
      return error(`Expected: ${expect}, Real: ${ch}`);
    }

    at++;
    ch = text.charAt(at);
    return ch;
  };

  const trimWhiteSpace = (): void => {
    while (ch && ch <= " ") {
      next();
    }
  };

  const string = (): string | never => {
    if (ch === '"') {
      let str = "";
      while (next()) {
        if (ch === '"') {
          next();
          return str;
        } else {
          str += ch;
        }
      }
    }
    return error("Bad string");
  };

  const number = (): number | never => {
    let str = "";

    // minus number
    if (ch === "-") {
      str += "-";
      next();
    }

    while (isBetween0And9(ch)) {
      str += ch;
      next();
    }

    // have a decimal point
    if (ch === ".") {
      str += ".";
      while (next() && isBetween0And9(ch)) {
        str += ch;
      }
    }

    // exponent
    if (ch === "e" || ch === "E") {
      str += "e";
      next();

      // 10e-2 as 0.1, 10e+2 as 1000
      if ((ch as string) === "-" || (ch as string) === "+") {
        str += ch;
        next();
      }

      while (isBetween0And9(ch)) {
        str += ch;
        next();
      }
    }

    return Number(str);
  };

  const boolOrNull = (): boolean | null | never => {
    switch (ch) {
      case "t":
        next("t");
        next("r");
        next("u");
        next("e");
        return true;
      case "f":
        next("f");
        next("a");
        next("l");
        next("s");
        next("e");
        return false;
      case "n":
        next("n");
        next("u");
        next("l");
        next("l");
        return null;
      default:
        return error(
          `Expected: true, false or null, Real: ${ch}. (NOTE: undefined is not defined as JSON schema.)`
        );
    }
  };

  const object = (): MyObject | never => {
    if (ch === "{") {
      const o = {} as MyObject;
      trimWhiteSpace();
      if (next() === "}") {
        next("}");
        return o;
      }

      while (ch) {
        const key = string();
        trimWhiteSpace();
        next(":");
        trimWhiteSpace();
        o[key] = value();
        trimWhiteSpace();

        // @ts-ignore
        if (ch === "}") {
          next("}");
          return o;
        }
        trimWhiteSpace();
        next(",");
      }
    }

    return error("Bad object");
  };

  const array = (): any[] | never => {
    if (ch === "[") {
      next("[");

      trimWhiteSpace();

      const a = [] as any[];

      // @ts-ignore
      if (ch === "]") {
        next("]");
        return a;
      }

      while (ch) {
        a.push(value());
        trimWhiteSpace();

        // @ts-ignore
        if (ch === "]") {
          next("]");
          return a;
        }
        next(",");
        trimWhiteSpace();
      }
    }
    return error("Bad array");
  };

  const value = () => {
    trimWhiteSpace();

    switch (ch) {
      case "{":
        return object();
      case "[":
        return array();
      case '"':
        return string();
      case "-":
        return number();
      default:
        return isBetween0And9(ch) ? number() : boolOrNull();
    }
  };
  return value();
};

export default parser;
