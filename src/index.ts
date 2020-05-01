/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MyObject = { [key: string]: any };

const isBetween0And9 = (str: string) => str >= "0" && str <= "9";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    ch = text.charAt(at);
    at++;

    if (expect) {
      if (ch === expect) return ch;
      error(`Expected: ${expect}, Real: ${ch}`);
    }

    return ch;
  };

  const string = (): string => {
    let str = "";

    while (next() !== '"') {
      str += ch;
    }
    return str;
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
        next("r");
        next("u");
        next("e");
        return true;
      case "f":
        next("a");
        next("l");
        next("s");
        next("e");
        return false;
      case "n":
        next("u");
        next("l");
        next("l");
        return null;
      default:
        return error(
          `Expected: true, false or null, Real: unknown. (NOTE: undefined is not defined as JSON schema.)`
        );
    }
  };

  const object = (): MyObject | never => {
    if (ch === "{") {
      const o = {} as MyObject;

      if (next() === "}") return o;

      const key = string();
      next(":");
      const v = value();
      o[key] = v;
      return o;
    }

    return error("Bad object");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const array = (): any[] | never => {
    if (ch === "[") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const a = [] as any[];
      if (next() === "]") return a;

      // NOTE: rethink
      at--;

      a.push(value());

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      while (ch === "," || next() === ",") {
        a.push(value());
      }
      return a;
    }

    return error("Bad array");
  };

  const value = () => {
    switch (next()) {
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
