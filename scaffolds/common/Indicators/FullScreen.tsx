import React from "react";
import { Spinner } from "./Spinner";

export const FullScreen: React.FC = () => (
  <div className="h-screen w-screen flex">
    <Spinner size="4x" className="m-auto" />
  </div>
);

FullScreen.displayName = "Indicators.FullScreen";
