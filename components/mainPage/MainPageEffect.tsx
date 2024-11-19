"use client";

import { ReactNode, useEffect } from "react";
import { parseStoredSettings, useSettings } from "../contexts/SettingsContext";
import { defaultSettings } from "@/lib/constants/defaultSettings";
import ToastBannerReceiver from "../widgets/ToastBannerReceiver";
import ToastDisplayLegacy from "../widgets/ToastDisplayLegacy";
import WindowManager from "../window/WindowManager";
import MobileDesktopEntryRenderer from "../widgets/MobileDesktopEntryRenderer";
import { useWindow } from "../contexts/WindowContext";
import { windowEntryMap } from "../window/WindowPickerEntry";

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
    function downloadUserInfo() {
      const savedRawSettings = localStorage.getItem("websiteSettingsWorkspace");
      const loadedSettings = parseStoredSettings(savedRawSettings || "") || {};

      updateSettings(loadedSettings, false);

      if (
        !loadedSettings.disableWindowSaving &&
        (loadedSettings.windowSaveData?.windows?.length ?? 0) > 0
      ) {
        restoreWindowFromSave(
          loadedSettings.windowSaveData.windows,
          loadedSettings.windowSaveData.viewport
        );
      } else {
        restoreWindowFromSave(
          [
            {
              centerX: window.innerWidth / 2,
              centerY: window.innerHeight / 2,
              width: 562,
              height: 488,
              order: 0,
              initialProps: {},
              data: {
                ...windowEntryMap.windowPicker.window,
                defaultCenterX: window.innerWidth / 2,
                defaultCenterY: window.innerHeight / 2,
                saveComponentKey: "windowPicker",
              },
            },
          ],
          {
            width: window.innerWidth,
            height: window.innerHeight,
          }
        );
      }
    }

    downloadUserInfo();
  }, []);

  return (
    <>
      <MobileDesktopEntryRenderer desktop={<WindowManager />} />
      {toastComponentMap[settings.notificationStyle]}
      {children}
    </>
  );
}
