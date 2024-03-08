"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import convertLinks from "@/lib/convert-links.json";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils/shadcn-utils";

/**
 * This needs to be a client component.
 * The Resizable component uses cookies to store
 * the desired position to maintain the width across
 * refreshes. I dislike having an entire layout.tsx
 * that serves the sole purpose of passing children.
 * This component must have the children because
 * they are the second panel. The layout.tsx is
 * needed to preserve the side-nav.
 */

interface ResizableLayoutProps {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const ResizableLayout = ({
  children,
  defaultLayout = [15, 85],
  defaultCollapsed = false,
  navCollapsedSize,
}: ResizableLayoutProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <aside>
          <nav>
            <ul>
              {convertLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    asChild
                    variant={pathname === link.url ? "default" : "ghost"}
                    className="w-full"
                  >
                    <Link href={link.url}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResizableLayout;
