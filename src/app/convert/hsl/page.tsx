"use client";

import { useColorStore } from "@/store";
import ConvertHslForm from "@/components/forms/ConvertHslForm";
import HslCard from "@/components/convert/HslCard";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";

const ConvertHslPage = () => {
  const submittedColors = useColorStore((state) => state.submittedColors);
  const colors = getColorsByFormat(submittedColors, "hsl");
  return (
    <main className="container mt-5 mb-10">
      <h1 className="sr-only">Convert an HSL value</h1>
      <ConvertHslForm />

      {colors && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Recently Converted</h2>
          <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colors.split("__").map((c) => (
              <li key={c}>
                <HslCard color={c} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <OtherColorCard /> */}
      {/* <HslExamples /> */}
    </main>
  );
};

export default ConvertHslPage;
