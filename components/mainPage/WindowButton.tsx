"use client";

import DeleteCommentIcon from "../assets/comment/DeleteCommentIcon";
import BroomIcon from "../assets/entries/BroomIcon";
import MagnetIcon from "../assets/entries/MagnetIcon";
import WindowIcon from "../assets/entries/WindowIcon";
import { useWindow } from "../contexts/WindowContext";
import { windowEntryMap } from "../window/WindowPickerEntry";
import buttonStyle from "./window-button.module.css";

const contextKey = "window-picker";

export default function WindowButton() {
  const {
    appendWindow,
    windows,
    setActiveWindowByContextKey,
    setIsWindowMinimized,
    isWindowMinimized,
    clearWindow,
    initiateWindowCleanup,
  } = useWindow();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.shiftKey && windows.length > 0) {
      event.preventDefault();
      setIsWindowMinimized((prev) => !prev);
      return;
    }

    if (isWindowMinimized) {
      setIsWindowMinimized(false);
      return;
    }

    if (windows.some((window) => window.contextKey === contextKey)) {
      setActiveWindowByContextKey(contextKey);
      return;
    }

    appendWindow({
      ...windowEntryMap.windowPicker.window,
      defaultCenterX: window.innerWidth / 2,
      defaultCenterY: window.innerHeight / 2,
      saveComponentKey: "windowPicker",
    });
  };

  const toggleMinimize = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (windows.length === 0) {
      return;
    }

    event.preventDefault();

    setIsWindowMinimized((prev) => !prev);
  };

  const handleBroom = () => {
    if (windows.length === 0 || isWindowMinimized) {
      return;
    }
    initiateWindowCleanup();
  };

  const clearAllWindows = () => {
    clearWindow();
    setIsWindowMinimized(false);
  };

  return (
    <div
      className={`hidden md:flex fixed z-[12] bottom-8 right-8 items-center flex-col-reverse ${buttonStyle.container}`}
    >
      <button
        className={`w-16 h-16 aspect-square p-3.5 rounded-full border-none border-transparent group ${
          buttonStyle.transition
        } ${
          isWindowMinimized ? buttonStyle.glow : "shadow-lg ease-out"
        } backdrop-blur-2xl bg-widget-60`}
        onClick={handleClick}
        onContextMenu={toggleMinimize}
      >
        <WindowIcon className="relative w-full h-full transition-transform duration-300 ease-out delay-0 group-hover:scale-110" />
      </button>
      <button
        className={`w-16 h-16 ${buttonStyle.extraButton} ${
          windows.length > 0 ? buttonStyle.extraButtonActive : ""
        } aspect-square rounded-full border-none shadow-lg backdrop-blur-2xl bg-widget-60 group`}
        onClick={toggleMinimize}
        disabled={windows.length === 0}
      >
        <MagnetIcon className="relative w-full h-full transition-transform duration-300 ease-out group-hover:scale-110 -rotate-[135deg]" />
      </button>
      <button
        className={`w-16 h-16 ${buttonStyle.extraButton} ${
          windows.length > 0 ? buttonStyle.extraButtonActive : ""
        } aspect-square rounded-full border-none shadow-lg backdrop-blur-2xl bg-widget-60 group`}
        onClick={handleBroom}
        disabled={windows.length === 0}
      >
        <BroomIcon
          className="relative w-full h-full transition-transform duration-300 ease-out scale-110 group-hover:scale-125"
          strokeWidth={45.45}
        />
      </button>
      <button
        className={`w-16 h-16 ${buttonStyle.extraButton} ${
          windows.length > 0 ? buttonStyle.extraButtonActive : ""
        } aspect-square rounded-full border-none shadow-lg backdrop-blur-2xl bg-widget-60 group`}
        onClick={clearAllWindows}
        disabled={windows.length === 0}
      >
        <DeleteCommentIcon
          className="relative w-full h-full transition-transform duration-300 ease-out scale-90 group-hover:scale-100"
          strokeWidth={1.67}
        />
      </button>
    </div>
  );
}
