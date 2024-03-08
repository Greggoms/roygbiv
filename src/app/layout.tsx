import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/shared/Header";
import { cn } from "@/lib/utils/shadcn-utils";
// import { LocalStorageProvider } from "@/context/LocalStorageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "roygbiv",
  description: "Do stuff with colors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <LocalStorageProvider defaultValue="" > */}
          <div className="grid grid-rows-layout min-h-screen">
            <Header />
            {children}
          </div>
          {/* </LocalStorageProvider> */}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
