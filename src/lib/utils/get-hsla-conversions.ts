import * as c from "colors-convert";
import { HslaConversions } from "@/types/conversions";

export default function getHslaConversions(hsla: string): HslaConversions {
  if (!hsla) return undefined;

  let adjustedHsla = hsla;

  // getHslaObjFromString will throw an error if `c.isHsla(hsla) === false`, so no need to check for it in this block.
  const validHslaObj = getHslaObjFromString(hsla);
  const hslaArray = Object.values(validHslaObj);

  adjustedHsla = `hsla(${hslaArray[0]}, ${hslaArray[1]}%, ${hslaArray[2]}%, ${hslaArray[3]})`;

  // convert color to hsla value
  // eg: hsla === "blue" -> c.colorToHsla("blue") -> "hsla(100%, 100%, 0%, 0%)"
  // This won't work alongside the current validation approach.
  let colorToHsla = "";
  // if (c.isColor(hsla)) {
  //   colorToHsla = c.colorToHsla(hsla);
  // }

  return {
    toCMYK: c.hslaToCmyk(validHslaObj),
    toRGB: c.hslaToRgb(validHslaObj),
    toRGBA: c.hslaToRgba(validHslaObj),
    toHEX: c.hslaToHex(validHslaObj),
    toHSL: c.hslaToHsl(validHslaObj),
    adjustedHsla,
    colorToHsla,
  };
}

export const getHslaObjFromString = (hsla: string) => {
  // regex may be better here...
  let adjustedHsla = hsla
    .replaceAll("hsla", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("%", "")
    .replaceAll(",", "");

  // turn the string into an array of 4 numbers.
  const hslaNums = adjustedHsla
    .split(" ")
    .splice(0, 4)
    .map((num) => parseFloat(num));

  const hslaObj = {
    h: hslaNums[0],
    s: hslaNums[1],
    l: hslaNums[2],
    a: hslaNums[3],
  };

  if (!c.isHsla(hslaObj)) {
    throw new Error(`${adjustedHsla} is an invalid HSLA value`);
  }

  //   console.log(hslaNums);
  //   console.log(hslaObj);

  return hslaObj;
};
