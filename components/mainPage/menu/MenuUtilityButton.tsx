"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import { useToast } from "@/components/contexts/ToastContext";
import { defaultSettings } from "@/lib/constants/defaultSettings";
import { useNextRenderEffect } from "@/lib/helperHooks";
import { useState } from "react";

type Props = {
  utility: MenuUtility;
  needsConfirm?: boolean;
};

const utilityTextMap: Record<MenuUtility, string> = {
  resetSettings: "Reset Settings to Default",
  resetProfiles: "Reset Theme Maker Profiles",
  resetAllData: "Reset All Stored Data",
};

// Used for next rendering only. Typically involves those that modify settings.
const utilityToastMap: Record<MenuUtility, ToastEntry | null> = {
  resetSettings: {
    title: "Settings",
    description: "All settings have been reset.",
    icon: "settings",
  },
  resetProfiles: {
    title: "Settings",
    description: "All profiles have been reset.",
    icon: "settings",
  },
  resetAllData: {
    title: "Settings",
    description: "All data have been reset.",
    icon: "settings",
  },
};

export default function MenuUtilityButton({
  utility,
  needsConfirm = false,
}: Props) {
  const { appendToast } = useToast();
  const { updateSettings } = useSettings();
  const [isInvoked, setIsInvoked] = useState(false);
  const [isInvokedVisible, setIsInvokedVisible] = useState(false);
  const [isImmediatelyTriggered, setIsImmediatelyTriggered] = useState(false);

  const utilityFunctionMap: Record<
    MenuUtility,
    () => void | boolean | Promise<boolean | void>
  > = {
    resetSettings,
    resetProfiles,
    resetAllData,
  };

  function resetSettings() {
    const {
      customThemeData,
      customThemeIndex,
      notebookData,
      notebookIndex,
      windowSaveData,
      ...defaultSettingsToReset
    } = structuredClone(defaultSettings);
    updateSettings(defaultSettingsToReset);
  }

  function resetProfiles() {
    const { customThemeData, customThemeIndex } =
      structuredClone(defaultSettings);
    updateSettings({ customThemeData, customThemeIndex });
  }

  function resetAllData() {
    const { ...defaultSettingsToReset } = structuredClone(defaultSettings);
    updateSettings(defaultSettingsToReset);
  }

  async function performAction() {
    const result = await utilityFunctionMap[utility]();
    if (result === false) return;

    sendOutToast();
  }

  function evaluateClick() {
    if (!needsConfirm) {
      performAction();
      return;
    }

    if (isImmediatelyTriggered || isInvoked || isInvokedVisible) return;

    setIsImmediatelyTriggered(true);
    setTimeout(() => {
      setIsInvoked(true);
    }, 300);
    setTimeout(() => {
      setIsInvokedVisible(true);
    }, 320);
  }

  function restoreInvocation() {
    if (!isImmediatelyTriggered || !isInvoked || !isInvokedVisible) return;

    setIsInvokedVisible(false);
    setTimeout(() => {
      setIsInvoked(false);
    }, 300);
    setTimeout(() => {
      setIsImmediatelyTriggered(false);
    }, 320);
  }

  function confirmAction() {
    performAction();
    restoreInvocation();
  }

  const sendOutToast = useNextRenderEffect(() => {
    utilityToastMap[utility]
      ? appendToast(utilityToastMap[utility] as ToastEntry)
      : null;
  }, [utility]);

  return (
    <button onClick={evaluateClick} className="w-full h-10 my-2 text-base">
      <div
        className={`${needsConfirm && isInvoked ? "hidden" : ""} ${
          needsConfirm && isImmediatelyTriggered ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300 ease-in-out`}
      >
        {utilityTextMap[utility]}
      </div>
      {needsConfirm && (
        <div
          className={`${
            isInvoked ? "" : "hidden pointer-events-none select-none"
          } ${
            isInvokedVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300 ease-in-out flex items-center justify-center h-full`}
        >
          <div
            className="w-1/2"
            role={isInvoked ? "button" : undefined}
            onClick={isInvoked ? restoreInvocation : () => {}}
          >
            Cancel
          </div>
          <div className="border-primary border-x-0.6 h-2/3 opacity-20 shrink-0" />
          <div
            className="w-1/2"
            role={isInvoked ? "button" : undefined}
            onClick={isInvoked ? confirmAction : () => {}}
          >
            Confirm
          </div>
        </div>
      )}
    </button>
  );
}
