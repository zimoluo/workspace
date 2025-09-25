"use client";

import { GradientStopsPositionProvider } from "./GradientStopsPositionContext";
import StopsEditorBar from "./StopsEditorBar";
import StopsEditorUtil from "./StopsEditorUtil";

export default function StopsPositionManager(data: GradientStopsManagerData) {
  return (
    <GradientStopsPositionProvider {...data}>
      <div className="rounded-2xl bg-light bg-opacity-65 shadow-lg h-auto p-4">
        <StopsEditorUtil />
        <StopsEditorBar />
      </div>
    </GradientStopsPositionProvider>
  );
}
