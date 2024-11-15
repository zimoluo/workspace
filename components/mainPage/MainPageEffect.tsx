"use client";

import { ReactNode, useEffect } from "react";
import { parseStoredSettings, useSettings } from "../contexts/SettingsContext";
import { defaultSettings } from "@/lib/constants/defaultSettings";
import _ from "lodash";
import ToastBannerReceiver from "../widgets/ToastBannerReceiver";
import ToastDisplayLegacy from "../widgets/ToastDisplayLegacy";
import WindowManager from "../window/WindowManager";
import MobileDesktopEntryRenderer from "../widgets/MobileDesktopEntryRenderer";
import { useWindow } from "../contexts/WindowContext";

interface Props {
  children?: ReactNode;
}

const toastComponentMap: Record<NotificationStyle, ReactNode> = {
  disabled: null,
  toast: <ToastDisplayLegacy />,
  banner: <ToastBannerReceiver />,
};

const pageKeys: NavigationKey[] = [
  ...(Object.keys(defaultSettings.pageTheme) as NavigationKey[]),
];

export default function MainPageEffect({ children }: Props) {
  const { updateSettings, settings } = useSettings();
  const { restoreWindowFromSave } = useWindow();

  useEffect(() => {
    async function downloadUserInfo(): Promise<SettingsState> {
      const savedRawSettings = localStorage.getItem("websiteSettingsWorkspace");
      const loadedSettings = parseStoredSettings(savedRawSettings || "") || {};

      updateSettings(loadedSettings, false);

      return loadedSettings;
    }

    downloadUserInfo().then((preparedSettings) => {
      if (
        window.innerWidth >= 768 &&
        !preparedSettings.disableWindowSaving &&
        (preparedSettings.windowSaveData?.windows?.length ?? 0) > 0
      ) {
        restoreWindowFromSave(
          preparedSettings.windowSaveData.windows,
          preparedSettings.windowSaveData.viewport
        );
      }
    });
  }, []);

  return (
    <>
      <MobileDesktopEntryRenderer desktop={<WindowManager />} />
      {toastComponentMap[settings.notificationStyle]}
      {children}
    </>
  );
}
