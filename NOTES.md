# Notes

## One Component To Rule Them All?

I tried tackling this by using a single component for things like
the colors cards (`<HexCard />`, `<CmykCard />`), and the badge
buttons on each of the forms (`<HexBadge />`, `<CmykBadge>`). I
even tried to use a single form and schema validation.

This approach started to crumble after I completed the Hex color
logic (the first one tackled) and moved onto the Cmyk logic. I have
to pull some workarounds in order to support a string input but validate
it as a valid `colorsConvert.isCmyk(...)` as it expects an object. I
cannot validate it in the zod schema as an object because that would require
registering to 4 inputs on a form. I found a way to throw errors in the
conversion utils to trigger form errors though if the string input doesn't
pass my custom validations, such as splitting the string into an array of
number values that could also be converted into the object expected by
`colorsConvert.isCmyk(...)`.

I've decided to make a `<Card />` and `<Badge />` for each color, at least
until I manage to find a way to simplify things. It may be better to split
everything up anyway, even if there's a lot of repeated code.
