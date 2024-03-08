"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useColorStore } from "@/store";
import SubmittedColorBadge from "@/components/convert/SubmittedColorBadge";
import HexCard from "../convert/HexCard";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";
import getHexConversions from "@/lib/utils/get-hex-conversions";
import {
  ConvertColorValues,
  convertColorSchema,
} from "./schemas/convert-colors-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
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

const ConvertHexForm = () => {
  const [submittedColor, setSubmittedColor] = useState("");
  const submittedColors = useColorStore((state) => state.submittedColors);
  const addAColor = useColorStore((state) => state.addAColor);

  const removeSomeColors = useColorStore((state) => state.removeSomeColors);

  const colors = getColorsByFormat(submittedColors, "hex");
  const colorMap = colors.split("__").filter((val) => !!val);

  const form = useForm<ConvertColorValues>({
    resolver: zodResolver(convertColorSchema),
    defaultValues: { hex: "" },
  });

  const onSubmit = (values: ConvertColorValues) => {
    const { hex } = values;
    try {
      const conversions = getHexConversions(hex);

      if (conversions) {
        // update the value of useLocalStorage
        addAColor(conversions.adjustedHex);
      }
      setSubmittedColor(hex);
    } catch (error: any) {
      form.setError("hex", { message: error.message, type: "validate" });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5">
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="hex"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>HEX Value</FormLabel>
                  <div className="flex items-center gap-x-2">
                    <FormControl>
                      <Input
                        placeholder="eg: #0284c7, 133337, 007"
                        {...field}
                      />
                    </FormControl>
                    <Button type="submit">Convert</Button>
                  </div>
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
                      form.setValue("hex", "");
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
                          <SubmittedColorBadge
                            color={color}
                            handleSubmit={() => {
                              form.setValue("hex", color, {
                                shouldValidate: true,
                              });
                              form.setFocus("hex");
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
                          <SubmittedColorBadge
                            color={color}
                            handleSubmit={() => {
                              form.setValue("hex", color, {
                                shouldValidate: true,
                              });
                              form.setFocus("hex");
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

      {submittedColor && <HexCard color={submittedColor} showFooter />}
    </>
  );
};

export default ConvertHexForm;
