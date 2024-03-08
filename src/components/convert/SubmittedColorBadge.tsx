import * as c from "colors-convert";
import { X } from "lucide-react";

import { useColorStore } from "@/store";
import maxContrast from "@/lib/utils/max-contrast";

import { Button } from "@/components/ui/button";

type SubmittedColorBadgeProps = {
  color: string;
  handleSubmit: () => void;
};

const SubmittedColorBadge = ({
  color,
  handleSubmit,
}: SubmittedColorBadgeProps) => {
  const removeAColor = useColorStore((state) => state.removeAColor);

  const toRgb = c.hexToRgb(color);
  const constrasted = maxContrast(toRgb.r, toRgb.g, toRgb.b);

  return (
    <div className="flex items-center">
      <button
        type="submit"
        onClick={handleSubmit}
        className="p-1 border-none bg-background text-xs rounded-md"
        style={{ backgroundColor: color, color: constrasted }}
      >
        {color}
      </button>
      <Button
        type="button"
        variant="ghost"
        className="rounded-none self-center p-0 bg-background w-5 h-5"
        onClick={() => removeAColor(color)}
      >
        <X />
      </Button>
    </div>
  );
};

export default SubmittedColorBadge;
