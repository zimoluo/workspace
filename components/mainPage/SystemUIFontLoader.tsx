"use client";

import { ReactNode } from "react";
import { useSettings } from "../contexts/SettingsContext";

interface Props {
  children?: ReactNode;
}

export default function SystemUIFontLoader({ children }: Props) {
  const { settings } = useSettings();

  return (
    <div className={`${settings.disableSystemFont ? "" : "font-system"}`}>
      {children}
    </div>
  );
}
