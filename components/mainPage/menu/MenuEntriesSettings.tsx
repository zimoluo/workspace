"use client";

import { Fragment, ReactNode, useCallback } from "react";
import { useSettings } from "@/components/contexts/SettingsContext";
import SettingsFlip from "./settings/SettingsFlip";
import SettingsSlider from "./settings/SettingsSlider";
import menuStyle from "./menu.module.css";
import { useTheme } from "@/components/contexts/ThemeContext";
import SettingsThemePicker from "./settings/SettingsThemePicker";
import { useNavigation } from "@/lib/helperHooks";
import NotificationStylePicker from "./settings/NotificationStylePicker";
import ThemeProfileSelector from "@/app/design/theme-maker/ThemeProfileSelector";
import { useWindow } from "@/components/contexts/WindowContext";

const settingsNameMap: { [key in keyof Partial<SettingsState>]: string } = {
  backgroundRichness: "Background richness",
  disableCenterPainting: "Disable center art",
  disableGestures: "Disable gestures",
  pageTheme: "Theme preset",
  notificationStyle: "Notification style",
  floatingCodeSpeed: "Floating code rate",
  flyingBalloonRate: "Birthday balloon rate",
  goldSphereAnimationIntensity: "Spinning intensity",
  customThemeData: "Theme profile",
  expandThemeMakerWindow: "Expand Theme Maker to fullscreen",
  optimizeProfileExport: "Optimize profile export",
  allowExtendedGradientStopsRange: "Allow extended gradient",
  enableColorInterpolationMethod: "Enable color interpolation method",
  hideColorLookupPanel: "Hide color lookup panel",
  windowLimit: "Number of windows",
  calculatorAppearance: "Calculator appearance",
  disableWindowSnapping: "Disable window snapping",
  disableWindowSaving: "Disable window saving",
  toastBannerLimit: "Number of banners for wide screen",
  alwaysEnableFireworks: "Always enable fireworks effect",
  windowResizeBehavior: "Window resizing behavior",
  disableWindowSnapToViewportBorder: "Disable snap to screen border",
  disableSystemFont: "Disable system font",
  enableWindowDebugger: "Enable window debugger",
};

interface SettingsPanelEntry {
  entry: keyof SettingsState;
  type: "flip" | "slider" | "special";
  condition?: { value: string; match: string | string[] | boolean | number }[];
  component?: ReactNode;
  values?: string[] | number[];
  captions?: string[];
  flipAppearance?: SettingsFlipAppearance;
}

const settingsConfig: {
  title?: string;
  entries: SettingsPanelEntry[];
}[] = [
  {
    title: "Theme",
    entries: [
      {
        entry: "pageTheme",
        type: "special",
        component: (
          <div className="my-5">
            <div className="relative bg-light rounded-2xl bg-opacity-40 border-reflect-primary">
              <div className="relative overflow-y-auto py-4 px-4 rounded-2xl">
                <div
                  className={`${menuStyle.pickerScrollContainer} rounded-xl`}
                >
                  <SettingsThemePicker />
                  <div
                    className="h-4 select-none pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        entry: "customThemeData",
        type: "special",
        component: (
          <div className={`${menuStyle.themeProfileWidth}`}>
            <div className="mt-4 mb-7 px-4">
              <ThemeProfileSelector
                className="-mb-3"
                applyThemeDataConfig={true}
              />
            </div>
          </div>
        ),
      },
      {
        entry: "backgroundRichness",
        type: "slider",
        values: ["minimal", "reduced", "rich"],
        captions: ["Minimal", "Reduced", "Rich"],
      },
      {
        entry: "disableCenterPainting",
        type: "flip",
        condition: [{ value: "animationKey", match: "blog" }],
      },
      {
        entry: "alwaysEnableFireworks",
        type: "flip",
        condition: [{ value: "animationKey", match: "perpetuity" }],
      },
      {
        entry: "floatingCodeSpeed",
        type: "slider",
        values: [6000, 2800, 1800, 800, 40],
        captions: ["*yawn*", "Slack", "Normal", "Hustle", "*yeet*"],
        condition: [{ value: "animationKey", match: "projects" }],
      },
      {
        entry: "flyingBalloonRate",
        type: "slider",
        values: [3000, 1600, 500, 50],
        captions: ["Steady", "Normal", "Rave", "*yeet*"],
        condition: [{ value: "animationKey", match: "birthday" }],
      },
      {
        entry: "goldSphereAnimationIntensity",
        type: "slider",
        values: [20, 60, 100, 150, 800],
        captions: ["Gentle", "Steady", "Dynamic", "Vibrant", "Blazing"],
        condition: [{ value: "animationKey", match: "gold" }],
      },
    ],
  },
  {
    title: "Interface",
    entries: [
      {
        entry: "windowLimit",
        type: "slider",
        values: [4, 8, 16, 50, 80],
        captions: ["Four", "Eight", "Sixteen", "Fifty", "Eighty"],
      },
      { entry: "disableWindowSaving", type: "flip" },
      { entry: "disableWindowSnapping", type: "flip" },
      {
        entry: "disableWindowSnapToViewportBorder",
        type: "flip",
        condition: [{ value: "settings-disableWindowSnapping", match: false }],
      },
      {
        entry: "windowResizeBehavior",
        type: "slider",
        values: ["corner", "center", "adaptive"],
        captions: ["Corner", "Center", "Adaptive"],
      },
      {
        entry: "notificationStyle",
        type: "special",
        component: <NotificationStylePicker className="mt-4" />,
      },
      {
        entry: "toastBannerLimit",
        type: "slider",
        values: [1, 3, 5, 7],
        captions: ["One", "Three", "Five", "Seven"],
        condition: [
          {
            value: "settings-notificationStyle",
            match: "banner",
          },
        ],
      },
      {
        entry: "disableSystemFont",
        type: "flip",
      },
      {
        entry: "hideColorLookupPanel",
        type: "flip",
        condition: [
          {
            value: "currentPage",
            match: "themeMaker",
          },
        ],
      },
      {
        entry: "expandThemeMakerWindow",
        type: "flip",
        condition: [
          {
            value: "currentPage",
            match: "themeMaker",
          },
        ],
      },
      {
        entry: "optimizeProfileExport",
        type: "flip",
        condition: [
          { value: "windowTag", match: "requireThemeMakerSettings" },
          {
            value: "currentPage",
            match: "themeMaker",
          },
        ],
      },
      {
        entry: "allowExtendedGradientStopsRange",
        type: "flip",
        condition: [
          { value: "windowTag", match: "requireThemeMakerSettings" },
          {
            value: "currentPage",
            match: "themeMaker",
          },
        ],
      },
      {
        entry: "enableColorInterpolationMethod",
        type: "flip",
        condition: [
          { value: "windowTag", match: "requireThemeMakerSettings" },
          {
            value: "currentPage",
            match: "themeMaker",
          },
        ],
      },
    ],
  },
  {
    title: "Miscellaneous",
    entries: [
      { entry: "disableGestures", type: "flip" },
      {
        entry: "calculatorAppearance",
        type: "slider",
        values: ["normal", "border", "contrast"],
        captions: ["Standard", "Uniform", "Contrast"],
        condition: [
          {
            value: "windowTag",
            match: "requireCalculatorSettings",
          },
        ],
      },
      {
        entry: "enableWindowDebugger",
        type: "flip",
      },
    ],
  },
];

const entryDivider = (
  <hr className="border-primary border-0.4 border-opacity-20 h-0" />
);

interface Props {
  config?: typeof settingsConfig;
  ignoreConditions?: boolean;
  headless?: boolean;
  cornerRadius?: string;
}

export default function MenuEntriesSettings({
  config = settingsConfig,
  ignoreConditions = false,
  headless = false,
  cornerRadius = "1.5rem",
}: Props) {
  const { settings, updateSettings } = useSettings();
  const { windows } = useWindow();
  const { themeConfig } = useTheme();
  const animationKey = themeConfig.animatedBackgroundKey;

  const currentPage = useNavigation();

  const getWindowTagMatch = useCallback(
    (tag: string) =>
      windows.some((window) => (window.tags ?? []).includes(tag)),
    [windows]
  );

  const checkCondition = (condition: SettingsPanelEntry["condition"]) => {
    if (ignoreConditions) {
      return true;
    }

    if (!condition) {
      return true;
    }

    return condition.some((cond) => {
      const { value, match } = cond;
      if (value === "animationKey") {
        if (!animationKey) {
          return false;
        }
        if (Array.isArray(match)) {
          if (Array.isArray(animationKey)) {
            return animationKey.some((key) => match.includes(key));
          } else if (typeof animationKey === "string") {
            return match.includes(animationKey);
          }
        } else if (typeof match === "string") {
          if (Array.isArray(animationKey)) {
            return animationKey.includes(match as ThemeAnimatedBackgroundKey);
          } else if (typeof animationKey === "string") {
            return animationKey === match || animationKey.includes(match);
          }
        }
      } else if (value === "currentPage") {
        if (Array.isArray(match)) {
          return match.includes(currentPage);
        }
        return currentPage === match;
      } else if (value === "windowTag") {
        if (Array.isArray(match)) {
          return match.some((tag) => getWindowTagMatch(tag));
        }
        return getWindowTagMatch(`${match}`);
      } else if (value.startsWith("settings-")) {
        const settingsKey = value.slice("settings-".length);

        if (settingsKey in settings) {
          if (Array.isArray(match)) {
            return match.includes(
              settings[settingsKey as keyof SettingsState] as any
            );
          }
          return (
            (settings[settingsKey as keyof SettingsState] as any) === match
          );
        }
      }

      return false;
    });
  };

  return (
    <>
      {config.map((section, sectionIndex) => {
        const filteredEntries = section.entries.filter((entry) =>
          checkCondition(entry.condition)
        );
        return (
          <div
            key={`${section.title || "settings-section"}-${sectionIndex}`}
            style={{
              borderRadius: cornerRadius,
            }}
            className={
              headless
                ? "grid grid-cols-1 gap-4"
                : "w-full bg-light bg-opacity-80 shadow-sm px-6 pt-2 pb-6 mb-4 text-lg grid grid-cols-1 gap-4 border border-highlight-light border-opacity-15"
            }
          >
            {section.title && (
              <p className="text-lg font-bold mb-2 mt-2">{section.title}</p>
            )}
            {filteredEntries.map((entry, entryIndex) => {
              const isLastEntry = entryIndex === filteredEntries.length - 1;
              const showDivider = !isLastEntry;

              switch (entry.type) {
                case "flip":
                  return (
                    <Fragment key={`${entry.entry}-${entryIndex}`}>
                      <div className="flex items-center gap-2">
                        <div className="flex-grow text-lg">
                          {settingsNameMap[entry.entry]}
                        </div>
                        <SettingsFlip
                          onClick={(status: boolean) => {
                            updateSettings({
                              [entry.entry]: status,
                            } as Partial<SettingsState>);
                          }}
                          state={settings[entry.entry] as boolean}
                          appearance={entry?.flipAppearance ?? undefined}
                        />
                      </div>
                      {showDivider && entryDivider}
                    </Fragment>
                  );
                case "slider":
                  const entryValue = settings[entry.entry] as number;
                  const performanceWarning =
                    (entry.entry === "floatingCodeSpeed" &&
                      entryValue < 1000) ||
                    (entry.entry === "flyingBalloonRate" &&
                      entryValue < 1000) ||
                    (entry.entry === "windowLimit" && entryValue > 15);

                  return (
                    <Fragment key={`${entry.entry}-${entryIndex}`}>
                      <div>
                        <div
                          className={`text-lg ${menuStyle.entryMinWidth} ${
                            performanceWarning ? "flex items-center" : ""
                          }`}
                        >
                          {settingsNameMap[entry.entry]}
                          {performanceWarning && (
                            <div className="text-xs ml-1">
                              (Performance warning)
                            </div>
                          )}
                        </div>
                        <SettingsSlider
                          setValue={(newValue: string | number) => {
                            updateSettings({
                              [entry.entry]: newValue,
                            } as Partial<SettingsState>);
                          }}
                          values={entry.values as (string | number)[]}
                          text={entry.captions ?? []}
                          entry={entryValue}
                        />
                      </div>
                      {showDivider && entryDivider}
                    </Fragment>
                  );
                case "special":
                  return (
                    <Fragment key={`${entry.entry}-${entryIndex}`}>
                      <div>
                        <div className={`text-lg ${menuStyle.entryMinWidth}`}>
                          {settingsNameMap[entry.entry]}
                        </div>
                        {entry.component}
                      </div>
                      {showDivider && entryDivider}
                    </Fragment>
                  );
                default:
                  return null;
              }
            })}
          </div>
        );
      })}
    </>
  );
}
