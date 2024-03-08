"use client";

import { useColorStore } from "@/store";
import ConvertCmykForm from "@/components/forms/ConvertCmykForm";
import CmykCard from "@/components/convert/CmykCard";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";

const ConvertCmykPage = () => {
  const submittedColors = useColorStore((state) => state.submittedColors);
  const colors = getColorsByFormat(submittedColors, "cmyk");
  return (
    <main className="container mt-5 mb-10">
      <h1 className="sr-only">Convert a CMYK value</h1>
      <ConvertCmykForm />

      {colors && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Recently Converted</h2>
          <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colors.split("__").map((c) => (
              <li key={c}>
                <CmykCard color={c} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <OtherColorCard /> */}
      {/* <CmykExamples /> */}
    </main>
  );
};

export default ConvertCmykPage;
