"use client";

import { ReactNode } from "react";
import sidebarStyle from "./sidebar.module.css";
import { useSettings } from "@/components/contexts/SettingsContext";
import { generateInlineStyleObject } from "@/lib/colorPaletteParser";
import ThemeMakerSidebarButtons from "./ThemeMakerSidebarButtons";

interface Props {
  children?: ReactNode;
}

export default function ThemeMakerSidebar({ children }: Props) {
  const { currentCustomThemeConfig, settings } = useSettings();

  const isCollapsed = settings.hideColorLookupPanel;

  const colorPreviewThemeStyle = generateInlineStyleObject(
    currentCustomThemeConfig.palette
  );

  return (
    <div className="shrink-0 h-full flex flex-row">
      <div
        className={`h-full shrink-0 flex-grow ${sidebarStyle.colorWrapper} ${
          isCollapsed ? sidebarStyle.collapsed : sidebarStyle.expanded
        }`}
      >
        <div
          style={colorPreviewThemeStyle}
          className="h-full relative overflow-hidden"
        >
          <div
            className={`h-full ${
              isCollapsed ? "pointer-events-none select-none" : ""
            }`}
          >
            {children}
          </div>
        </div>
      </div>
      <ThemeMakerSidebarButtons />
    </div>
  );
}
