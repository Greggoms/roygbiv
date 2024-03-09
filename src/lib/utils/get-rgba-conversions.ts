import * as c from "colors-convert";
import { RgbaConversions } from "@/types/conversions";

export default function getRgbaConversions(rgba: string): RgbaConversions {
  if (!rgba) return undefined;

  let adjustedRgba = rgba;

  // getRgbaObjFromString will throw an error if `c.isRgba(rgba) === false`, so no need to check for it in this block.
  const validRgbaObj = getRgbaObjFromString(rgba);
  const rgbaArray = Object.values(validRgbaObj);

  adjustedRgba = `rgba(${rgbaArray[0]}, ${rgbaArray[1]}, ${rgbaArray[2]}, ${rgbaArray[3]})`;

  // convert color to rgba value
  // eg: rgba === "blue" -> c.colorToRgba("blue") -> "rgba(100, 200, 123, 0.54)"
  // This won't work alongside the current validation approach.
  let colorToRgba = "";
  // if (c.isColor(rgba)) {
  //   colorToRgba = c.colorToRgba(rgba);
  // }

  return {
    toCMYK: c.rgbaToCmyk(validRgbaObj),
    toRGB: c.rgbaToRgb(validRgbaObj),
    toHEX: c.rgbaToHex(validRgbaObj),
    toHSL: c.rgbaToHsl(validRgbaObj),
    toHSLA: c.rgbaToHsla(validRgbaObj),
    adjustedRgba,
    colorToRgba,
  };
}

export const getRgbaObjFromString = (rgba: string) => {
  // regex may be better here...
  let adjustedRgba = rgba
    .replaceAll("rgba", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("%", "")
    .replaceAll(",", "");

  // turn the string into an array of 4 numbers.
  const rgbaNums = adjustedRgba
    .split(" ")
    .splice(0, 4)
    .map((num) => parseFloat(num));

  const rgbaObj = {
    r: rgbaNums[0],
    g: rgbaNums[1],
    b: rgbaNums[2],
    a: rgbaNums[3],
  };

  if (!c.isRgba(rgbaObj)) {
    throw new Error(`${adjustedRgba} is an invalid RGBA value`);
  }

  //   console.log(rgbaNums);
  //   console.log(rgbaObj);

  return rgbaObj;
};
