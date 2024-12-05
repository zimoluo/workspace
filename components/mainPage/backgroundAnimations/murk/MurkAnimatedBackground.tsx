"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import spritesStyle from "./sprites.module.css";

export default function MurkAnimatedBackground() {
  const { settings } = useSettings();

  return (
    <>
      <div
        className={`${spritesStyle.sprite} ${spritesStyle.background} fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/murk/background.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.backAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/murk/back.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.middleAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/murk/middle.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.forwardAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/murk/forward.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.moreForwardAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/murk/moreForward.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.foregroundAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/murk/foreground.png")`,
        }}
      />
    </>
  );
}
