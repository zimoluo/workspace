"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import spritesStyle from "./sprites.module.css";

export default function MeadowlandAnimatedBackground() {
  const { settings } = useSettings();

  return (
    <>
      <div
        className={`${spritesStyle.sprite} ${spritesStyle.sky} fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/meadowland/sky.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.cloudAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/meadowland/cloud.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.grasslandAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/meadowland/grassland.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.shrubAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/meadowland/shrub.png")`,
        }}
      />
    </>
  );
}
