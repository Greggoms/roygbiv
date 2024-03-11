"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useColorStore } from "@/store";
import RgbaCard from "../convert/RgbaCard";
import RgbaBadge from "../convert/RgbaBadge";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getRgbaConversions from "@/lib/utils/get-rgba-conversions";
import {
  ConvertRgbaValues,
  convertRgbaSchema,
} from "./schemas/convert-colors-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ConvertRgbaForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "rgba");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertRgbaValues>({
    resolver: zodResolver(convertRgbaSchema),
    defaultValues: { rgba: "" },
  });

  const onSubmit = (values: ConvertRgbaValues) => {
    const { rgba } = values;
    try {
      const conversions = getRgbaConversions(rgba);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedRgba);
        setSubmittedColor(conversions.adjustedRgba);
      }
    } catch (error: any) {
      form.setError("rgba", { message: error.message, type: "validate" });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5">
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="rgba"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>RGBA Value</FormLabel>
                  <div className="flex items-center gap-x-2">
                    <FormControl>
                      <Input
                        placeholder="eg: rgba(155, 50, 50, 0.5) || 155 50 50 0.5"
                        {...field}
                      />
                    </FormControl>
                    <Button type="submit">Convert</Button>
                  </div>
                  <FormDescription>
                    r: 0-255, g: 0-255, b: 0-255, a:0-1
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {colorMap.length > 0 && (
              <div>
                <div className="flex items-baseline gap-x-3 mb-2">
                  <p className="text-xs text-muted-foreground mb-1">
                    Previous colors:
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-xs py-[2px] px-[4px] h-auto"
                    onClick={() => {
                      removeSomeColors(colorMap);
                      form.setValue("rgba", "");
                    }}
                  >
                    remove all
                  </Button>
                </div>

                {/* Badges */}
                <Collapsible>
                  <div className="flex flex-col gap-2">
                    <ul className="flex flex-wrap gap-x-3 gap-y-2">
                      {/* Always visible badges */}
                      {colorMap.slice(0, 8).map((color) => (
                        <li key={color}>
                          <RgbaBadge
                            color={color}
                            handleSubmit={() => {
                              form.setValue("rgba", color, {
                                shouldValidate: true,
                              });
                              form.setFocus("rgba");
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                    {/* only show a few colors until this button is clicked */}
                    {colorMap.slice(8).length > 0 && (
                      <CollapsibleTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="text-xs"
                          size="sm"
                        >
                          Toggle {colorMap.slice(8).length} older colors
                        </Button>
                      </CollapsibleTrigger>
                    )}
                  </div>
                  <CollapsibleContent>
                    <ul className="flex flex-wrap gap-x-3 gap-y-2 mt-2">
                      {/* Always visible badges */}
                      {colorMap.slice(8).map((color) => (
                        <li key={color}>
                          <RgbaBadge
                            color={color}
                            handleSubmit={() => {
                              form.setValue("rgba", color, {
                                shouldValidate: true,
                              });
                              form.setFocus("rgba");
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}
          </div>
        </form>
      </Form>

      {submittedColor && <RgbaCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertRgbaForm;
