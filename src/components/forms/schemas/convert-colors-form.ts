import { z } from "zod";

export const convertColorSchema = z.object({
  hex: z.string().min(3, "3 char minimum"),
});
export type ConvertColorValues = z.infer<typeof convertColorSchema>;

export const convertCmykSchema = z.object({
  cmyk: z.string().trim().min(7, "7 char minimum - eg: 0 0 0 0"),
});
export type ConvertCmykValues = z.infer<typeof convertCmykSchema>;
