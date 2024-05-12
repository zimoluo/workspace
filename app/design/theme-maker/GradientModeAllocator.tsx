"use client";

import { ReactNode } from "react";
import { useGradientData } from "./GradientCategoryContext";
import AngleDataInput from "./AngleDataInput";

const gradientModeMap: Record<string, ReactNode> = {
  "linear-gradient": <AngleDataInput />,
};

export default function GradientModeAllocator() {
  const { selectedLayer, currentLayerIndex } = useGradientData();
  const gradientMode = selectedLayer[currentLayerIndex].type;

  return (
    <div className="w-full flex-grow flex items-center justify-center rounded-xl bg-light bg-opacity-80 shadow-lg">
      {gradientModeMap[gradientMode] ?? null}
    </div>
  );
}
