import * as c from "colors-convert";
import { HslConversions } from "@/types/conversions";

export default function getHslConversions(hsl: string): HslConversions {
  if (!hsl) return undefined;

  let adjustedHsl = hsl;

  // getHslObjFromString will throw an error if `c.isHsl(hsl) === false`, so no need to check for it in this block.
  const validHslObj = getHslObjFromString(hsl);
  const hslArray = Object.values(validHslObj);

  adjustedHsl = `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;

  // convert color to hsl value
  // eg: hsl === "blue" -> c.colorToHsl("blue") -> "hsl(100%, 100%, 0%, 0%)"
  // This won't work alongside the current validation approach.
  let colorToHsl = "";
  // if (c.isColor(hsl)) {
  //   colorToHsl = c.colorToHsl(hsl);
  // }

  return {
    toCMYK: c.hslToCmyk(validHslObj),
    toRGB: c.hslToRgb(validHslObj),
    toRGBA: c.hslToRgba(validHslObj),
    toHEX: c.hslToHex(validHslObj),
    toHSLA: c.hslToHsla(validHslObj),
    adjustedHsl,
    colorToHsl,
  };
}

export const getHslObjFromString = (hsl: string) => {
  // regex may be better here...
  let adjustedHsl = hsl
    .replaceAll("hsl", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("%", "")
    .replaceAll(",", "");

  // turn the string into an array of 4 numbers.
  const hslNums = adjustedHsl
    .split(" ")
    .splice(0, 3)
    .map((num) => parseInt(num));

  const hslObj = {
    h: hslNums[0],
    s: hslNums[1],
    l: hslNums[2],
  };

  if (!c.isHsl(hslObj)) {
    throw new Error(`${adjustedHsl} is an invalid HSL value`);
  }

  // console.log(hslNums);
  // console.log(hslObj);

  return hslObj;
};
