"use client";

import { useColorStore } from "@/store";
import ConvertHexForm from "@/components/forms/ConvertHexForm";
import HexCard from "@/components/convert/HexCard";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";

const ConvertHEXPage = () => {
  const submittedColors = useColorStore((state) => state.submittedColors);
  const colors = getColorsByFormat(submittedColors, "hex");
  return (
    <main className="container mt-5 mb-10">
      <h1 className="sr-only">Convert a HEX value</h1>
      <ConvertHexForm />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Recently Converted</h2>
        <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {colors.split("__").map((c) => (
            <li key={c}>
              <HexCard color={c} />
            </li>
          ))}
        </ul>
      </div>
      {/* <OtherColorCard /> */}
      {/* <HexExamples /> */}
    </main>
  );
};

export default ConvertHEXPage;
