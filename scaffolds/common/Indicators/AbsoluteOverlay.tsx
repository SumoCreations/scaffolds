import React from "react";
import { Spinner } from "./Spinner";
import clsx from "clsx";

export interface AbsoluteOverlayProps {
  bgClassName?: string;
}

export const AbsoluteOverlay: React.FC<AbsoluteOverlayProps> = ({
  bgClassName,
}) => (
  <div
    className={clsx(
      "flex h-full w-full absolute top-0 left-0 bg-opacity-75 z-30",
      bgClassName ?? "bg-white"
    )}
  >
    <Spinner size="4x" className="m-auto" />
  </div>
);

AbsoluteOverlay.displayName = "Indicators.AbsoluteOverlay";
