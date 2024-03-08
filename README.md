# roygbiv

Messing around with colors.

This project is made possible by using [colors-convert](https://github.com/ilariaventurini/colors-convert).

- [Docs](https://colors-convert-documentation.netlify.app/)
- [NPM](https://www.npmjs.com/package/colors-convert)

## Convert Colors

You can convert a color in any format to any other supported format.
The table below was taken from the colors-convert [repo](https://github.com/ilariaventurini/colors-convert/blob/master/README.md?plain=1#conversion).

| from \ to |     Hex      |     Rgb      |     Rgba      |     Hsl      |     Hsla      |     Cmyk      |
| :-------: | :----------: | :----------: | :-----------: | :----------: | :-----------: | :-----------: |
|  **Hex**  |      \       |  `hexToRgb`  |  `hexToRgba`  |  `hexToHsl`  |  `hexToHsla`  |  `hexToCmyk`  |
|  **Rgb**  |  `rgbToHex`  |      \       |  `rgbToRgba`  |  `rgbToHsl`  |  `rgbToHsla`  |  `rgbToCmyk`  |
| **Rgba**  | `rgbaToHex`  | `rgbaToRgb`  |      \        | `rgbaToHsl`  | `rgbaToHsla`  | `rgbaToCmyk`  |
|  **Hsl**  |  `hslToHex`  |  `hslToRgb`  |  `hslToRgba`  |      \       |  `hslToHsla`  |  `hslToCmyk`  |
| **Hsla**  | `hslaToHex`  | `hslaToRgb`  | `hslaToRgba`  | `hslaToHsl`  |      \        | `hslaToCmyk`  |
| **Cmyk**  | `cmykToHex`  | `cmykToRgb`  | `cmykToRgba`  | `cmykToHsl`  | `cmykToHsla`  |      \        |
| **Color** | `colorToHex` | `colorToRgb` | `colorToRgba` | `colorToHsl` | `colorToHsla` | `colorToCmyk` |

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
