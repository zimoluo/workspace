"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import Image from "next/image";
import homeStyle from "./home.module.css";
import moving1Src from "@/public/theme/animated-background/home/moving-1.svg";
import moving2Src from "@/public/theme/animated-background/home/moving-2.svg";
import moving3Src from "@/public/theme/animated-background/home/moving-3.svg";

export default function HomeAnimatedBackground() {
  const { settings } = useSettings();

  return (
    <>
      {settings.backgroundRichness === "rich" && (
        <>
          <div
            className={`fixed inset-0 w-large-screen h-large-screen -z-20 flex items-center justify-center pointer-events-none select-none ${homeStyle.moveOne}`}
          >
            <Image
              src={moving1Src}
              className="object-cover w-full h-full"
              alt="Background moving image 1"
              placeholder="empty"
              aria-hidden="true"
              priority={true}
            />
          </div>

          <div
            className={`fixed inset-0 w-large-screen h-large-screen -z-20 flex items-center justify-center pointer-events-none select-none ${homeStyle.moveThree}`}
          >
            <Image
              src={moving3Src}
              className="object-cover w-full h-full"
              alt="Background moving image 3"
              placeholder="empty"
              aria-hidden="true"
              priority={true}
            />
          </div>
        </>
      )}

      {settings.backgroundRichness === "rich" && (
        <div
          className={`fixed inset-0 w-large-screen h-large-screen -z-10 flex items-center justify-center pointer-events-none select-none ${homeStyle.moveTwo}`}
        >
          <Image
            src={moving2Src}
            className="object-cover w-full h-full"
            alt="Background moving image 2"
            placeholder="empty"
            aria-hidden="true"
            priority={true}
          />
        </div>
      )}
    </>
  );
}
