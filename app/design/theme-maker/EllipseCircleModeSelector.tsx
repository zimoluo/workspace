"use client";

import { useGradientData } from "./GradientDataContext";
import { useEffect, useState } from "react";

export default function EllipseCircleModeSelector() {
  const { selectedLayer, updateGradientProperty } = useGradientData();
  const isCircle = !!selectedLayer.isCircle;

  const [rx, setRx] = useState(isCircle ? 347 : 440);
  const [ry, setRy] = useState(isCircle ? 347 : 272);

  const handleClick = () => {
    setRx(isCircle ? 440 : 347);
    setRy(isCircle ? 272 : 347);
    updateGradientProperty("isCircle", !isCircle);
  };

  useEffect(() => {
    setRx(isCircle ? 347 : 440);
    setRy(isCircle ? 347 : 272);
  }, [isCircle]);

  return (
    <div className="h-10 w-10 p-2 shrink-0 rounded-lg bg-pastel bg-opacity-65 shadow-sm">
      <button className="w-full h-auto aspect-square" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1024 1024"
          className="w-full h-full"
        >
          <ellipse
            cx="512"
            cy="512"
            rx={rx}
            ry={ry}
            className="stroke-primary transition-all duration-300 ease-out"
            strokeWidth="90"
          />
        </svg>
      </button>
    </div>
  );
}
