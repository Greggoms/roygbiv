"use client";

import { useColorStore } from "@/store";
import ConvertRgbForm from "@/components/forms/ConvertRgbForm";
import RgbCard from "@/components/convert/RgbCard";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";

const ConvertRgbPage = () => {
  const submittedColors = useColorStore((state) => state.submittedColors);
  const colors = getColorsByFormat(submittedColors, "rgb");
  return (
    <main className="container mt-5 mb-10">
      <h1 className="sr-only">Convert an RGB value</h1>
      <ConvertRgbForm />

      {colors && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Recently Converted</h2>
          <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colors.split("__").map((c) => (
              <li key={c}>
                <RgbCard color={c} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <OtherColorCard /> */}
      {/* <RgbExamples /> */}
    </main>
  );
};

export default ConvertRgbPage;
