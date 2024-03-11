"use client";

import { useColorStore } from "@/store";
import ConvertRgbaForm from "@/components/forms/ConvertRgbaForm";
import RgbaCard from "@/components/convert/RgbaCard";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";

const ConvertRgbaPage = () => {
  const submittedColors = useColorStore((state) => state.submittedColors);
  const colors = getColorsByFormat(submittedColors, "rgba");
  return (
    <main className="container mt-5 mb-10">
      <h1 className="sr-only">Convert an RGBA value</h1>
      <ConvertRgbaForm />

      {colors && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Recently Converted</h2>
          <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colors.split("__").map((c) => (
              <li key={c}>
                <RgbaCard color={c} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <OtherColorCard /> */}
      {/* <RgbaExamples /> */}
    </main>
  );
};

export default ConvertRgbaPage;
