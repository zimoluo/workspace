"use client";

import windowPickerStyle from "./window-picker.module.css";
import { useWindow } from "../contexts/WindowContext";
import { useRef } from "react";
import OutlineFavicon from "../assets/OutlineFavicon";
import WindowWidgetFavicon from "./widget/WindowWidgetFavicon";
import DisplayFavicon from "../assets/DisplayFavicon";
import WindowIFrame from "./widget/WindowIFrame";
import CommandKeyIcon from "../assets/entries/CommandKeyIcon";
import ThemeMakerWindowToolset from "./widget/ThemeMakerWindowToolset";
import CogIcon from "../assets/toast/CogIcon";
import MenuEntriesSettings from "../mainPage/menu/MenuEntriesSettings";
import NotebookIcon from "../assets/entries/NotebookIcon";
import WindowNotebook from "./widget/WindowNotebook";
import aboutConfig from "../theme/config/about";
import WikipediaLogo from "../assets/WikipediaLogo";
import CalculatorWidget from "./widget/CalculatorWidget";
import CalculatorIcon from "../assets/entries/CalculatorIcon";
import DashSquircleIcon from "../assets/entries/DashSquircleIcon";
import SignalGeneratorWindow from "./widget/SignalGeneratorWindow";
import SignalIcon from "../assets/entries/SignalIcon";
import WindowIcon from "../assets/entries/WindowIcon";
import WindowPicker from "./WindowPicker";
import WindowDebugger from "./widget/WindowDebugger";
import DebuggerIcon from "../assets/entries/DebuggerIcon";

interface Props {
  entry: WindowPickerEntry;
}

export const windowEntryMap: Record<
  WindowPickerEntry,
  {
    icon: typeof CogIcon;
    title: string;
    window: PartialBy<WindowData, "uniqueId">;
  }
> = {
  faviconWidget: {
    icon: OutlineFavicon,
    title: "Favicon",
    window: {
      content: <WindowWidgetFavicon />,
      defaultHeight: 144,
      defaultWidth: 144,
      minWidth: 144,
      maxWidth: 288,
      minAspectRatio: 1,
      maxAspectRatio: 1,
      disableBlur: true,
      disableShadow: true,
    },
  },
  zimoWebInWindow: {
    icon: ({ className }) => (
      <DisplayFavicon customThemeConfig={aboutConfig} className={className} />
    ),
    title: "Window Web",
    window: {
      content: <WindowIFrame url="https://www.zimoluo.me/" zoom={0.83} />,
      defaultWidth: 340,
      defaultHeight: 480,
      minWidth: 320,
      minHeight: 350,
      maxWidth: 635,
      maxHeight: 1200,
      contextKey: "iframe-zimo-web",
    },
  },
  themeMakerToolset: {
    icon: ({ className }) => (
      <CommandKeyIcon className={className} strokeWidth={44} />
    ),
    title: "Theme Maker",
    window: {
      content: <ThemeMakerWindowToolset />,
      defaultHeight: 500,
      defaultWidth: 768,
      minWidth: 624,
      maxWidth: 1600,
      minHeight: 360,
      maxHeight: 1200,
      contextKey: "theme-maker-toolset-window",
      tags: ["requireThemeMakerSettings"],
    },
  },
  settingsPanel: {
    icon: ({ className }) => <CogIcon className={className} strokeWidth={45} />,
    title: "Settings Panel",
    window: {
      content: (
        <div className="w-full h-full bg-widget-80 px-8 pb-8 pt-6 text-xl grid grid-cols-1 gap-4 overflow-y-auto">
          <MenuEntriesSettings />
        </div>
      ),
      defaultHeight: 500,
      defaultWidth: 592,
      minHeight: 300,
      maxHeight: 900,
      disableWidthAdjustment: true,
    },
  },
  notebook: {
    icon: NotebookIcon,
    title: "Notebook",
    window: {
      content: <WindowNotebook />,
      defaultHeight: 460,
      defaultWidth: 560,
      minWidth: 480,
      maxWidth: 1600,
      minHeight: 300,
      maxHeight: 1200,
    },
  },
  wikipedia: {
    icon: WikipediaLogo,
    title: "Wikipedia",
    window: {
      content: <WindowIFrame url="https://en.wikipedia.org/wiki/Main_Page" />,
      defaultWidth: 768,
      defaultHeight: 520,
      minWidth: 420,
      minHeight: 480,
      maxWidth: 1600,
      maxHeight: 1200,
      contextKey: "iframe-wikipedia",
    },
  },
  calculator: {
    icon: CalculatorIcon,
    title: "Calculator",
    window: {
      content: <CalculatorWidget />,
      defaultHeight: 450,
      defaultWidth: 248,
      minWidth: 248,
      minHeight: 420,
      maxWidth: 1024,
      maxHeight: 480,
      tags: ["requireCalculatorSettings"],
    },
  },
  blank: {
    icon: DashSquircleIcon,
    title: "Blank",
    window: {
      content: <div className="w-full h-full bg-widget-80" />,
      defaultHeight: 360,
      defaultWidth: 360,
      minWidth: 128,
      minHeight: 128,
      maxWidth: 2400,
      maxHeight: 2400,
    },
  },
  signalGenerator: {
    icon: SignalIcon,
    title: "Signal Generator",
    window: {
      content: <SignalGeneratorWindow />,
      defaultHeight: 340,
      defaultWidth: 480,
      minWidth: 450,
      minHeight: 300,
      maxHeight: 460,
      maxWidth: 800,
    },
  },
  windowPicker: {
    icon: WindowIcon,
    title: "Window Gallery",
    window: {
      content: <WindowPicker />,
      contextKey: "window-picker",
      defaultHeight: 480,
      defaultWidth: 562,
      minWidth: 432,
      minHeight: 408,
      maxWidth: 688,
      maxHeight: 660,
    },
  },
  debugger: {
    icon: DebuggerIcon,
    title: "Debugger",
    window: {
      content: <WindowDebugger />,
      defaultHeight: 420,
      defaultWidth: 600,
      minWidth: 560,
      minHeight: 380,
      maxWidth: 1200,
      maxHeight: 1200,
    },
  },
};

export default function WindowPickerEntry({ entry }: Props) {
  const { appendWindow, windows, setActiveWindowByContextKey } = useWindow();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { icon: Icon, title, window } = windowEntryMap[entry] || {};
  return Icon ? (
    <div className={`${windowPickerStyle.entry}`}>
      <div className="w-full h-full flex items-center justify-center">
        <button
          className="aspect-square h-10 w-auto transition-transform duration-300 ease-out hover:scale-110"
          ref={buttonRef}
          onClick={() => {
            if (!window) {
              return;
            }

            if (
              window.contextKey &&
              windows.some((w) => w.contextKey === window.contextKey)
            ) {
              setActiveWindowByContextKey(window.contextKey);
              return;
            }

            appendWindow({
              ...window,
              defaultCenterX:
                (buttonRef.current?.getBoundingClientRect().left ?? 0) +
                (buttonRef.current?.getBoundingClientRect().width ?? 0) / 2,
              defaultCenterY:
                (buttonRef.current?.getBoundingClientRect().top ?? 0) +
                (buttonRef.current?.getBoundingClientRect().height ?? 0) / 2,
              countsToLimit: true,
              saveComponentKey: entry,
            });
          }}
        >
          <Icon className="h-full w-auto aspect-square" />
        </button>
      </div>
      <p>{title}</p>
    </div>
  ) : null;
}
