interface SettingsState {
  backgroundRichness: "minimal" | "reduced" | "rich";
  floatingCodeSpeed: number;
  disableCenterPainting: boolean;
  disableGestures: boolean;
  disableSoundEffect: boolean;
  pageTheme: Record<NavigationKey, ThemeKey | ThemeDataConfig>;
  notificationStyle: NotificationStyle;
  flyingBalloonRate: number;
  goldSphereAnimationIntensity: number;
  customThemeData: ThemeDataConfig[];
  customThemeIndex: number;
  regularThemeMakerTheme: ThemeKey | ThemeDataConfig;
  expandThemeMakerWindow: boolean;
  optimizeProfileExport: boolean;
  allowExtendedGradientStopsRange: boolean;
  enableColorInterpolationMethod: boolean;
  hideColorLookupPanel: boolean;
  windowLimit: number;
  notebookData: NotebookData[];
  notebookIndex: number;
  calculatorButtonHasBorder: boolean;
  disableWindowSnapping: boolean;
  disableSpecialTheme: boolean;
  windowSaveData: {
    windows: WindowSaveData[];
    viewport: {
      width: number;
      height: number;
    };
  };
  disableWindowSaving: boolean;
  toastBannerLimit: number;
  alwaysEnableFireworks: boolean;
  windowResizeBehavior: "corner" | "center" | "adaptive";
  disableWindowSnapToViewportBorder: boolean;
  disableSystemFont: boolean;
  enableWindowDebugger: boolean;
}

type NotificationStyle = "disabled" | "toast" | "banner";
