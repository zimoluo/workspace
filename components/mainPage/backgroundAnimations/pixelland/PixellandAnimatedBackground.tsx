"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import spritesStyle from "./sprites.module.css";

export default function PixellandAnimatedBackground() {
  const { settings } = useSettings();

  return (
    <>
      <div
        style={{
          backgroundImage: `url("./theme/animated-background/pixelland/sun/outer-1.png")`,
        }}
        className={`${
          spritesStyle.sun
        } fixed pointer-events-none select-none -z-20 ${
          settings.backgroundRichness === "rich" ? spritesStyle.outerSun1 : ""
        }`}
      />
      {settings.backgroundRichness === "rich" && (
        <>
          <div
            style={{
              backgroundImage: `url("./theme/animated-background/pixelland/sun/outer-2.png")`,
            }}
            className={`${spritesStyle.sun} fixed pointer-events-none select-none -z-20 ${spritesStyle.outerSun2}`}
          />
          <div
            style={{
              backgroundImage: `url("./theme/animated-background/pixelland/sun/outer-3.png")`,
            }}
            className={`${spritesStyle.sun} fixed pointer-events-none select-none -z-20 ${spritesStyle.outerSun3}`}
          />
          <div
            style={{
              backgroundImage: `url("./theme/animated-background/pixelland/sun/outer-4.png")`,
            }}
            className={`${spritesStyle.sun} fixed pointer-events-none select-none -z-20 ${spritesStyle.outerSun4}`}
          />
          <div
            style={{
              backgroundImage: `url("./theme/animated-background/pixelland/sun/inner-1.png")`,
            }}
            className={`${spritesStyle.sun} fixed pointer-events-none select-none -z-20 ${spritesStyle.innerSun1}`}
          />
          <div
            style={{
              backgroundImage: `url("./theme/animated-background/pixelland/sun/inner-2.png")`,
            }}
            className={`${spritesStyle.sun} fixed pointer-events-none select-none -z-20 ${spritesStyle.innerSun2}`}
          />
          <div
            style={{
              backgroundImage: `url("./theme/animated-background/pixelland/sun/inner-3.png")`,
            }}
            className={`${spritesStyle.sun} fixed pointer-events-none select-none -z-20 ${spritesStyle.innerSun3}`}
          />
          <div
            style={{
              backgroundImage: `url("./theme/animated-background/pixelland/sun/inner-4.png")`,
            }}
            className={`${spritesStyle.sun} fixed pointer-events-none select-none -z-20 ${spritesStyle.innerSun4}`}
          />
          <div
            style={{
              backgroundImage: `url("./theme/animated-background/pixelland/sun/inner-5.png")`,
            }}
            className={`${spritesStyle.sun} fixed pointer-events-none select-none -z-20 ${spritesStyle.innerSun5}`}
          />
        </>
      )}
      <div
        style={{
          backgroundImage: `url("./theme/animated-background/pixelland/pixel-clouds.png")`,
        }}
        className={`${spritesStyle.sprite} ${spritesStyle.clouds} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.animatedClouds
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none -z-20`}
      />
      <div
        className={`${spritesStyle.sprite} ${spritesStyle.treesFar} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.animatedTreesFar
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none -z-10`}
        style={{
          backgroundImage: `url("./theme/animated-background/pixelland/pixel-trees.png")`,
        }}
      />
      <div
        className={`${spritesStyle.sprite} ${spritesStyle.trees} ${
          settings.backgroundRichness === "rich"
            ? spritesStyle.animatedTrees
            : ""
        } fixed left-1/2 -translate-x-1/2 pointer-events-none select-none -z-10`}
        style={{
          backgroundImage: `url("./theme/animated-background/pixelland/pixel-trees.png")`,
        }}
      />
    </>
  );
}
