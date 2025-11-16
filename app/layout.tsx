import "@/styles/globals.css";
import type { Metadata } from "next";
import MainPageFrame from "@/components/mainPage/MainPageFrame";
import MainPageElements from "@/components/mainPage/MainPageElements";
import { SettingsProvider } from "@/components/contexts/SettingsContext";
import MainPageEffect from "@/components/mainPage/MainPageEffect";
import { ToastProvider } from "@/components/contexts/ToastContext";
import { defaultRobotsMeta } from "@/lib/siteMetadata";
import ThemeDataInitializer from "@/components/theme/util/ThemeDataInitializer";
import ThemeApplier from "@/components/theme/util/ThemeApplier";
import { WindowProvider } from "@/components/contexts/WindowContext";
import SystemUIFontLoader from "@/components/mainPage/SystemUIFontLoader";
import { MenuControlProvider } from "@/components/contexts/MenuControlContext";

const environment = "production";

export const metadata: Metadata = {
  title: "Workspace",
  description: "Workspace of windows, derived from Zimo Web.",
  robots: defaultRobotsMeta,
  authors: [{ name: "Zimo", url: "https://github.com/zimoluo" }],
  icons: [
    {
      rel: "icon",
      url: `./website-favicon/${environment}/favicon-32x32.png`,
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      url: `./website-favicon/${environment}/favicon-96x96.png`,
      type: "image/png",
      sizes: "96x96",
    },
    {
      rel: "icon",
      url: `./website-favicon/${environment}/favicon-192x192.png`,
      type: "image/png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: `./website-favicon/${environment}/favicon-1024x1024.png`,
      type: "image/png",
      sizes: "1024x1024",
    },
    {
      rel: "apple-touch-icon",
      url: `./website-favicon/${environment}/favicon-180x180.png`,
      type: "image/png",
      sizes: "180x180",
    },
  ],
  keywords:
    "Zimo Web, Zimo Luo, Color, Personal Website, Color Palette, Palette, Theme, Design, Editor, Web app, Theme Editor, Theme Maker, Interactive, Responsive, Online editor, Workspace, Windows, OS, Productivity, PWA",
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-main overflow-hidden antialiased">
        <SettingsProvider>
          <MenuControlProvider>
            <SystemUIFontLoader>
              <ToastProvider>
                <WindowProvider>
                  <ThemeDataInitializer>
                    <ThemeApplier>
                      <MainPageFrame>
                        <MainPageEffect>
                          <MainPageElements>{children}</MainPageElements>
                        </MainPageEffect>
                      </MainPageFrame>
                    </ThemeApplier>
                  </ThemeDataInitializer>
                </WindowProvider>
              </ToastProvider>
            </SystemUIFontLoader>
          </MenuControlProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
