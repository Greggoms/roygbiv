"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useColorStore } from "@/store";
import HslaCard from "../convert/HslaCard";
import HslaBadge from "../convert/HslaBadge";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getHslaConversions from "@/lib/utils/get-hsla-conversions";
import {
  ConvertHslaValues,
  convertHslaSchema,
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

const ConvertHslaForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "hsla");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertHslaValues>({
    resolver: zodResolver(convertHslaSchema),
    defaultValues: { hsla: "" },
  });

  const onSubmit = (values: ConvertHslaValues) => {
    const { hsla } = values;
    try {
      const conversions = getHslaConversions(hsla);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedHsla);
        setSubmittedColor(conversions.adjustedHsla);
      }
    } catch (error: any) {
      form.setError("hsla", { message: error.message, type: "validate" });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5">
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="hsla"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>HSLA Value</FormLabel>
                  <div className="flex items-center gap-x-2">
                    <FormControl>
                      <Input
                        placeholder="eg: hsla(250, 50%, 50%, 0.5) || 250 50 50 0.5"
                        {...field}
                      />
                    </FormControl>
                    <Button type="submit">Convert</Button>
                  </div>
                  <FormDescription>
                    h: 0-359, s: 0-100, l: 0-100, a: 0-1
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
                      form.setValue("hsla", "");
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
                          <HslaBadge
                            color={color}
                            handleSubmit={() => {
                              form.setValue("hsla", color, {
                                shouldValidate: true,
                              });
                              form.setFocus("hsla");
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
                          <HslaBadge
                            color={color}
                            handleSubmit={() => {
                              form.setValue("hsla", color, {
                                shouldValidate: true,
                              });
                              form.setFocus("hsla");
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

      {submittedColor && <HslaCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertHslaForm;
