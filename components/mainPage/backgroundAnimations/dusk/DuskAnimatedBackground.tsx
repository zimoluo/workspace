"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import spritesStyle from "./sprites.module.css";

export default function DuskAnimatedBackground() {
  const { settings } = useSettings();

  return (
    <>
      <div
        className={`${spritesStyle.sprite} ${spritesStyle.clouds} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.cloudsAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/dusk/clouds.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.salmonAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/dusk/salmon.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.pinkAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/dusk/pink.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.plumAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/dusk/plum.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.purpleAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/dusk/purple.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.blackAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/dusk/black.png")`,
        }}
      />
    </>
  );
}
