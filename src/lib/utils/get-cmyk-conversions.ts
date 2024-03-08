import * as c from "colors-convert";

type CmykConversions =
  | undefined
  | {
      toHEX: string;
      toRGB: {
        r: number;
        g: number;
        b: number;
      };
      toRGBA: {
        r: number;
        g: number;
        b: number;
        a?: number;
      };
      toHSL: {
        h: number;
        s: number;
        l: number;
      };
      toHSLA: {
        h: number;
        s: number;
        l: number;
        a: number;
      };
      adjustedCmyk: string;
      colorToCmyk: string;
    };

export default function getCmykConversions(cmyk: string): CmykConversions {
  if (!cmyk) return undefined;

  let adjustedCmyk = cmyk;

  // getCmykObjFromString will throw an error if `c.isCmyk(cmyk) === false`, so no need to check for it in this block.
  const validCmykObj = getCmykObjFromString(cmyk);
  const cmykArray = Object.values(validCmykObj);

  adjustedCmyk = "cmyk(" + cmykArray.splice(0, 4).join("%, ") + "%)";

  // convert color to cmyk value
  // eg: cmyk === "blue" -> c.colorToCmyk("blue") -> "cmyk(100%, 100%, 0%, 0%)"
  // This won't work alongside the current validation approach.
  let colorToCmyk = "";
  // if (c.isColor(cmyk)) {
  //   colorToCmyk = c.colorToCmyk(cmyk);
  // }

  return {
    toRGB: c.cmykToRgb(validCmykObj),
    toRGBA: c.cmykToRgba(validCmykObj),
    toHEX: c.cmykToHex(validCmykObj),
    toHSL: c.cmykToHsl(validCmykObj),
    toHSLA: c.cmykToHsla(validCmykObj),
    adjustedCmyk,
    colorToCmyk,
  };
}

export const getCmykObjFromString = (cmyk: string) => {
  // regex may be better here...
  let adjustedCmyk = cmyk
    .replaceAll("cmyk", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("%", "")
    .replaceAll(",", "");

  // turn the string into an array of 4 numbers.
  const cmykNums = adjustedCmyk
    .split(" ")
    .splice(0, 4)
    .map((num) => parseInt(num));

  const cmykObj = {
    c: cmykNums[0],
    m: cmykNums[1],
    y: cmykNums[2],
    k: cmykNums[3],
  };

  if (!c.isCmyk(cmykObj)) {
    throw new Error(`${adjustedCmyk} is an invalid CMYK value`);
  }

  // console.log(cmykNums);
  // console.log(cmykObj);

  return cmykObj;
};
