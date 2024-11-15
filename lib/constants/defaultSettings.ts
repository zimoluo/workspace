import cubisticConfig from "@/components/theme/config/cubistic";
import energizeConfig from "@/components/theme/config/energize";
import lollipopConfig from "@/components/theme/config/lollipop";
import oasisConfig from "@/components/theme/config/oasis";
import springFieldConfig from "@/components/theme/config/springField";

const defaultTheme: ThemeKey = "plainGray";

export const defaultSettings: SettingsState = {
  backgroundRichness: "rich",
  floatingCodeSpeed: 1800,
  disableCenterPainting: false,
  disableGestures: false,
  disableSoundEffect: false,
  pageTheme: {
    home: defaultTheme,
  },
  notificationStyle: "banner",
  flyingBalloonRate: 1600,
  goldSphereAnimationIntensity: 100,
  customThemeData: [
    lollipopConfig,
    cubisticConfig,
    energizeConfig,
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
  randomizeThemeOnEveryVisit: false,
  windowLimit: 8,
  notebookData: [],
  notebookIndex: 0,
  calculatorButtonHasBorder: false,
  disableWindowSnapping: false,
  disableSpecialTheme: false,
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
};
