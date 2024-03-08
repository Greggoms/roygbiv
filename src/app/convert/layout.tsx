import { cookies } from "next/headers";
import type { Metadata } from "next";

import Sidebar from "@/components/convert/Sidebar";

export const metadata: Metadata = {
  title: "Convert Colors | roygbiv",
  description: "Convert all manner of colors",
};

export default function ConvertLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <section className="h-full">
      <Sidebar
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      >
        {children}
      </Sidebar>
    </section>
  );
}
