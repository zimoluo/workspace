"use client";

import React, { useMemo } from "react";
import { useSettings } from "@/components/contexts/SettingsContext";
import { isHalloweenSeason } from "@/lib/seasonUtil";
import { useClientSideFlag } from "@/lib/clientLogicHooks";
import SettingsFlip from "./SettingsFlip";
import { usePathname } from "next/navigation";
import SettingsSlider from "./SettingsSlider";
import menuStyle from "./menu.module.css";

const securityCommentShutDown =
  process.env.NEXT_PUBLIC_ZIMO_WEB_COMMENT_SHUTDOWN === "true";

export default function MenuEntriesSettings() {
  const { settings, updateSettings } = useSettings();

  const isHalloweenSeasonClient = useClientSideFlag(isHalloweenSeason);

  const routerPathname = usePathname();

  const settingsArray = useMemo(() => {
    let initialSettings = [
      "disableComments",
      "disableGestures",
      "disableSoundEffect",
    ];

    if (routerPathname.startsWith("/blog")) {
      initialSettings = [
        "disableCenterPainting",
        "disableSerifFont",
        ...initialSettings,
      ];
    }

    if (
      routerPathname.startsWith("/photos") ||
      routerPathname.startsWith("/projects")
    ) {
      initialSettings = [
        "preferInitialGridView",
        "disableEntryPopUp",
        ...initialSettings,
      ];
    }

    if (routerPathname.startsWith("/photos")) {
      initialSettings = ["enableGallery", ...initialSettings];
    }

    return initialSettings;
  }, [routerPathname]);

  const settingsNameMap: { [key in keyof Partial<SettingsState>]: string } = {
    syncSettings: "Sync Settings",
    backgroundRichness: "Background Richness",
    navigationBar: "Navigation Bar",
    disableCenterPainting: "Disable Center Blog Art",
    disableComments: "Disable Comments",
    disableGestures: "Disable Gestures",
    disableSerifFont: "Disable Serif Font",
    disableEntryPopUp: "Disable Entry Pop-Up",
    enableGallery: "Gallery Mode",
    enableHalloweenEffect: "Spooky Halloween",
    disableSoundEffect: "Disable Sound Effect",
    preferInitialGridView: "Default to Grid View",
  };

  return (
    <>
      {isHalloweenSeasonClient && (
        <>
          <div className="flex items-center my-4 ">
            <div className="flex-grow text-xl md:text-2xl font-halloween">
              {settingsNameMap["enableHalloweenEffect"]}
            </div>
            <SettingsFlip
              onClick={(status: boolean) => {
                updateSettings({
                  enableHalloweenEffect: status,
                });
              }}
              state={settings.enableHalloweenEffect}
              appearance="halloween"
            />
          </div>
          <div className="border-primary border-menu-rule border-opacity-20" />
        </>
      )}
      <div className="flex items-center my-4 ">
        <div className="flex-grow text-lg md:text-xl">
          {settingsNameMap["syncSettings"]}
        </div>
        <SettingsFlip
          onClick={(status: boolean) => {
            updateSettings({
              syncSettings: status,
            });
          }}
          state={settings.syncSettings}
        />
      </div>
      <div className="border-primary border-0.4 border-opacity-20" />
      <div className="md:flex md:items-center my-4 ">
        <div
          className={`md:flex-grow text-lg md:text-xl ${menuStyle["entry-min-width"]}`}
        >
          Background Richness
        </div>
        <SettingsSlider
          setValue={(newValue: string | number) => {
            updateSettings({
              backgroundRichness: newValue as "minimal" | "reduced" | "rich",
            });
          }}
          values={["minimal", "reduced", "rich"]}
          text={["Minimal", "Reduced", "Rich"]}
          entry={settings.backgroundRichness}
        />
      </div>
      <div className="border-primary border-0.4 border-opacity-20" />
      <div className="md:flex md:items-center my-4 ">
        <div
          className={`md:flex-grow text-lg md:text-xl ${menuStyle["entry-min-width"]}`}
        >
          Navigation Bar
        </div>
        <SettingsSlider
          setValue={(newValue: string | number) => {
            updateSettings({
              navigationBar: newValue as "disabled" | "always" | "flexible",
            });
          }}
          values={["disabled", "always", "flexible"]}
          text={["Disabled", "Always-On", "Flexible"]}
          entry={settings.navigationBar}
        />
      </div>
      <div className="border-primary border-0.4 border-opacity-20" />
      {routerPathname.startsWith("/projects") && (
        <>
          <div className="md:flex md:items-center my-4 ">
            <div
              className={`md:flex-grow text-lg md:text-xl ${
                menuStyle["entry-min-width"]
              } ${
                settings.floatingCodeSpeed < 1000
                  ? "flex md:block items-center"
                  : ""
              }`}
            >
              Floating Code Rate
              {settings.floatingCodeSpeed < 1000 && (
                <div className="text-xs ml-1 md:ml-0">
                  (Performance warning)
                </div>
              )}
            </div>
            <SettingsSlider
              setValue={(newValue: number | string) => {
                updateSettings({
                  floatingCodeSpeed: newValue as number,
                });
              }}
              values={[6000, 2800, 1800, 800, 40]}
              text={["*yawn*", "Slack", "Normal", "Hustle", "*yeet*"]}
              entry={settings.floatingCodeSpeed}
            />
          </div>
          <div className="border-primary border-0.4 border-opacity-20" />
        </>
      )}
      {settingsArray.map((item, index, array) => (
        <React.Fragment key={item}>
          <div className="flex items-center my-4 ">
            <div className="flex-grow text-lg md:text-xl">
              {settingsNameMap[item as keyof SettingsState]}
            </div>
            <SettingsFlip
              key={item}
              onClick={
                item === "disableComments" && securityCommentShutDown
                  ? (status: boolean) => {}
                  : (status: boolean) => {
                      updateSettings({
                        [item]: status,
                      } as Partial<SettingsState>);
                    }
              }
              state={
                item === "disableComments" && securityCommentShutDown
                  ? true
                  : ((settings as unknown as Record<string, unknown>)[
                      item
                    ] as boolean)
              }
            />
          </div>
          {index !== array.length - 1 && (
            <div className="border-primary border-0.4 border-opacity-20" />
          )}
        </React.Fragment>
      ))}
    </>
  );
}