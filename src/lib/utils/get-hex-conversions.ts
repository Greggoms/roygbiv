import * as c from "colors-convert";
import { HexConversions } from "@/types/conversions";

export default function getHexConversions(hex: string): HexConversions {
  if (!hex) return undefined;

  let adjustedHex = hex;
  adjustedHex = adjustedHex.replaceAll("#", "");

  // extend input to be 6 characters
  if (adjustedHex.length < 6) {
    adjustedHex = (adjustedHex + adjustedHex + adjustedHex).slice(0, 6);
  }
  adjustedHex = "#" + adjustedHex;

  if (!c.isHex(adjustedHex)) {
    throw new Error(`${adjustedHex} is an invalid HEX value`);
  }

  // convert color to hex value
  // eg: hex === "blue" -> c.colorToHex("blue") -> "#0000ff"
  // This won't work alongside the current validation approach.
  let colorToHex = "";
  // if (c.isColor(hex)) {
  //   colorToHex = c.colorToHex(hex);
  // }

  return {
    toRGB: c.hexToRgb(adjustedHex),
    toRGBA: c.hexToRgba(adjustedHex),
    toCMYK: c.hexToCmyk(adjustedHex),
    toHSL: c.hexToHsl(adjustedHex),
    toHSLA: c.hexToHsla(adjustedHex),
    adjustedHex,
    colorToHex,
  };
}
