"use client";

import { useColorStore } from "@/store";
import ConvertHslaForm from "@/components/forms/ConvertHslaForm";
import HslaCard from "@/components/convert/HslaCard";
import getColorsByFormat from "@/lib/utils/get-colors-by-format";

const ConvertHslaPage = () => {
  const submittedColors = useColorStore((state) => state.submittedColors);
  const colors = getColorsByFormat(submittedColors, "hsla");
  return (
    <main className="container mt-5 mb-10">
      <h1 className="sr-only">Convert an HSLA value</h1>
      <ConvertHslaForm />

      {colors && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Recently Converted</h2>
          <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colors.split("__").map((c) => (
              <li key={c}>
                <HslaCard color={c} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <OtherColorCard /> */}
      {/* <HslaExamples /> */}
    </main>
  );
};

export default ConvertHslaPage;
