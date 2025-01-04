import cubisticConfig from "@/components/theme/config/cubistic";
import lollipopConfig from "@/components/theme/config/lollipop";
import oasisConfig from "@/components/theme/config/oasis";
import springFieldConfig from "@/components/theme/config/springField";

const defaultTheme: ThemeKey = "unity";

export const defaultSettings: SettingsState = {
  backgroundRichness: "rich",
  floatingCodeSpeed: 1800,
  disableCenterPainting: false,
  disableGestures: false,
  pageTheme: {
    home: defaultTheme,
  },
  notificationStyle: "banner",
  flyingBalloonRate: 1600,
  goldSphereAnimationIntensity: 100,
  customThemeData: [
    lollipopConfig,
    cubisticConfig,
    oasisConfig,
    springFieldConfig,
  ],
  customThemeIndex: 0,
  regularThemeMakerTheme: defaultTheme,
  expandThemeMakerWindow: false,
  optimizeProfileExport: false,
  allowExtendedGradientStopsRange: false,
  enableColorInterpolationMethod: false,
  hideColorLookupPanel: false,
  windowLimit: 8,
  notebookData: [],
  notebookIndex: 0,
  calculatorAppearance: "normal",
  disableWindowSnapping: false,
  windowSaveData: {
    viewport: {
      width: 0,
      height: 0,
    },
    windows: [],
  },
  disableWindowSaving: false,
  toastBannerLimit: 3,
  alwaysEnableFireworks: false,
  windowResizeBehavior: "adaptive",
  disableWindowSnapToViewportBorder: false,
  disableSystemFont: false,
  enableWindowDebugger: false,
  hasOpenedStickyNotes: false,
};
