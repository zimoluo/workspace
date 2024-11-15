"use client";

import Image from "next/image";
import movingBlocksImage from "@/public/theme/animated-background/perpetuity/moving-blocks.svg";
import movingBlocksStaticImage from "@/public/theme/animated-background/perpetuity/moving-blocks-static.svg";
import { useSettings } from "@/components/contexts/SettingsContext";
import CelebrationAnimatedBackground from "../celebration/CelebrationAnimatedBackground";

export default function PerpetuityAnimatedBackground() {
  const { settings } = useSettings();

  return (
    <>
      {settings.backgroundRichness === "rich" &&
        settings.alwaysEnableFireworks && (
          <>
            <div className="bg-black bg-opacity-35 fixed inset-0 w-screen h-screen -z-20 pointer-events-none select-none touch-none" />
            <CelebrationAnimatedBackground />
          </>
        )}
      <div
        className="fixed inset-0 w-screen h-screen -z-20 flex items-center pointer-events-none select-none touch-none blur-xl"
        aria-hidden="true"
      >
        <Image
          src={
            settings.backgroundRichness === "rich"
              ? movingBlocksImage
              : movingBlocksStaticImage
          }
          alt="Moving blocks"
          className="min-w-full min-h-full object-cover aspect-square opacity-25"
        />
      </div>
    </>
  );
}
