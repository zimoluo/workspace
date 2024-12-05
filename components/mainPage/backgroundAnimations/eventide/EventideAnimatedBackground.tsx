"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import spritesStyle from "./sprites.module.css";

export default function EventideAnimatedBackground() {
  const { settings } = useSettings();

  return (
    <>
      <div
        className={`${spritesStyle.sprite} ${spritesStyle.background} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.backgroundAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/eventide/background.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${spritesStyle.moon} fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/eventide/moon.png")`,
        }}
      />
      {settings.backgroundRichness === "rich" && (
        <>
          <div
            className={`${spritesStyle.sprite} ${spritesStyle.moon} ${spritesStyle.darkMoon} fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
            aria-hidden="true"
            style={{
              backgroundImage: `url("./theme/animated-background/eventide/moon-dark.png")`,
            }}
          />
          <div
            className={`${spritesStyle.sprite} ${spritesStyle.moon} ${spritesStyle.brightMoon} fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
            aria-hidden="true"
            style={{
              backgroundImage: `url("./theme/animated-background/eventide/moon-bright.png")`,
            }}
          />
        </>
      )}
      <div
        className={`${spritesStyle.sprite} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.middleAnimated
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none touch-none -z-20`}
        aria-hidden="true"
        style={{
          backgroundImage: `url("./theme/animated-background/eventide/middle.png")`,
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
          backgroundImage: `url("./theme/animated-background/eventide/foreground.png")`,
        }}
      />
    </>
  );
}
