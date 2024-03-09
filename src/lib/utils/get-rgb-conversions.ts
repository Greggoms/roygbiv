import * as c from "colors-convert";
import { RgbConversions } from "@/types/conversions";

export default function getRgbConversions(rgb: string): RgbConversions {
  if (!rgb) return undefined;

  let adjustedRgb = rgb;

  // getRgbObjFromString will throw an error if `c.isRgb(rgb) === false`, so no need to check for it in this block.
  const validRgbObj = getRgbObjFromString(rgb);
  const rgbArray = Object.values(validRgbObj);

  adjustedRgb = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;

  // convert color to rgb value
  // eg: rgb === "blue" -> c.colorToRgb("blue") -> "rgb(100%, 100%, 0%, 0%)"
  // This won't work alongside the current validation approach.
  let colorToRgb = "";
  // if (c.isColor(rgb)) {
  //   colorToRgb = c.colorToRgb(rgb);
  // }

  return {
    toCMYK: c.rgbToCmyk(validRgbObj),
    toRGBA: c.rgbToRgba(validRgbObj),
    toHEX: c.rgbToHex(validRgbObj),
    toHSL: c.rgbToHsl(validRgbObj),
    toHSLA: c.rgbToHsla(validRgbObj),
    adjustedRgb,
    colorToRgb,
  };
}

export const getRgbObjFromString = (rgb: string) => {
  // regex may be better here...
  let adjustedRgb = rgb
    .replaceAll("rgb", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("%", "")
    .replaceAll(",", "");

  // turn the string into an array of 4 numbers.
  const rgbNums = adjustedRgb
    .split(" ")
    .splice(0, 3)
    .map((num) => parseInt(num));

  const rgbObj = {
    r: rgbNums[0],
    g: rgbNums[1],
    b: rgbNums[2],
  };

  if (!c.isRgb(rgbObj)) {
    throw new Error(`${adjustedRgb} is an invalid RGB value`);
  }

  // console.log(rgbNums);
  // console.log(rgbObj);

  return rgbObj;
};
