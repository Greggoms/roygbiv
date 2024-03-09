import Link from "next/link";

import HexCard from "./HexCard";
import CmykCard from "./CmykCard";
import HslCard from "./HslCard";
import { ColorLink } from "@/lib/convert-links";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import HslaCard from "./HslaCard";
import RgbCard from "./RgbCard";
import RgbaCard from "./RgbaCard";

const ColorLinkCard = ({ link }: { link: ColorLink }) => {
  return (
    <Card key={link.label}>
      <Link
        href={link.url}
        className="block hover:bg-accent/80 transition-colors"
      >
        <CardHeader>
          <CardTitle>{link.label}</CardTitle>
          <CardDescription>{link.description}</CardDescription>
        </CardHeader>
      </Link>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button size="xs" className="w-full">
            See an example
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-0">
            <div className="w-full">
              {link.label === "CMYK" && (
                <CmykCard color={link.example} showFooter />
              )}
              {link.label === "HEX" && <HexCard color={link.example} />}
              {link.label === "HSL" && <HslCard color={link.example} />}
              {link.label === "HSLA" && <HslaCard color={link.example} />}
              {link.label === "RGB" && <RgbCard color={link.example} />}
              {link.label === "RGBA" && <RgbaCard color={link.example} />}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ColorLinkCard;
