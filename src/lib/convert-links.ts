import * as c from "colors-convert";
import getHexConversions from "./utils/get-hex-conversions";
import getCmykConversions from "./utils/get-cmyk-conversions";
import getHslConversions from "./utils/get-hsl-conversions";
import getHslaConversions from "./utils/get-hsla-conversions";
import getRgbConversions from "./utils/get-rgb-conversions";
import getRgbaConversions from "./utils/get-rgba-conversions";
import {
  CmykConversions,
  HexConversions,
  HslConversions,
  HslaConversions,
  RgbConversions,
  RgbaConversions,
} from "@/types/conversions";

export type ColorLabel = "CMYK" | "HEX" | "HSL" | "HSLA" | "RGB" | "RGBA";

export type ColorLink = {
  url: string;
  label: ColorLabel;
  description: string;
  example: string;
  cmykConversions?: CmykConversions;
  hexConversions?: HexConversions;
  hslConversions?: HslConversions;
  hslaConversions?: HslaConversions;
  rgbConversions?: RgbConversions;
  rgbaConversions?: RgbaConversions;
};

const cmykExample = `cmyk(${Math.floor(Math.random() * 101)}%, ${Math.floor(
  Math.random() * 101
)}%, ${Math.floor(Math.random() * 101)}%, ${Math.floor(Math.random() * 101)}%)`;

const hexExample = c.randomHex();

const hslExample = `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(
  Math.random() * 101
)}%, ${Math.floor(Math.random() * 101)}%)`;

const randHslAlpha = Math.random();
const hslaExample = `hsla(${Math.floor(Math.random() * 360)}, ${Math.floor(
  Math.random() * 101
)}%, ${Math.floor(Math.random() * 101)}%, ${
  randHslAlpha >= 0.96 ? 1 : Number(randHslAlpha.toFixed(2))
})`;

const rgbExample = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
  Math.random() * 256
)}, ${Math.floor(Math.random() * 256)})`;

const randRgbAlpha = Math.random();
const rgbaExample = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
  Math.random() * 256
)}, ${Math.floor(Math.random() * 256)}, ${
  randRgbAlpha >= 0.96 ? 1 : Number(randRgbAlpha.toFixed(2))
})`;

const convertLinks: ColorLink[] = [
  {
    url: "/convert/cmyk",
    label: "CMYK",
    description: "Click to convert a CMYK value",
    example: cmykExample,
    cmykConversions: getCmykConversions(cmykExample),
  },
  {
    url: "/convert/hex",
    label: "HEX",
    description: "Click to convert a HEX value",
    example: hexExample,
    hexConversions: getHexConversions(hexExample),
  },
  {
    url: "/convert/hsl",
    label: "HSL",
    description: "Click to convert an HSL value",
    example: hslExample,
    hslConversions: getHslConversions(hslExample),
  },
  {
    url: "/convert/hsla",
    label: "HSLA",
    description: "Click to convert an HSLA value",
    example: hslaExample,
    hslaConversions: getHslaConversions(hslaExample),
  },
  {
    url: "/convert/rgb",
    label: "RGB",
    description: "Click to convert an RGB value",
    example: rgbExample,
    rgbConversions: getRgbConversions(rgbExample),
  },
  {
    url: "/convert/rgba",
    label: "RGBA",
    description: "Click to convert an RGBA value",
    example: rgbaExample,
    rgbaConversions: getRgbaConversions(rgbaExample),
  },
];

export default convertLinks;
