import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";
import { TurboModuleRegistry } from "react-native";


export type Position = "absolute" | "static" | "relative" | "fixed" | "sticky";

export type AlignItems = "normal" | "flex-start" | "flex-end" | "start" | "end" | "center" | "stretch";

export type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around";

export type ResizeMode = "cover" | "contain" | "stretch" | "repeat" | "center";

export type ImageSource = string;

export type Style = {
  position?: Position;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  backgroundColor?: string;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  width?: number;
  height?: number;
}
export type VoidEventData = Readonly<{}>;

export type ViewStyle = {
  style?: Style;
};

export type ImageProps = {
  fadeDuration?: number;
  resizeMode?: ResizeMode;
  source?: string | number;
  style?: Style;
}

export type Config = {
  fade?: boolean;
};

export type UseHideAnimation = {
  container: ViewStyle;
  logo: ImageProps;
  brand: ImageProps;
};

export type Manifest = {
  background: string;
  darkBackground?: string;
  logo: {
    width: number;
    height: number;
  };
  brand?: {
    bottom: number;
    width: number;
    height: number;
  };
};

export type UseHideAnimationConfig = {
  manifest: Manifest;
  logo?: ImageSource;
  darkLogo?: ImageSource;
  brand?: ImageSource;
  darkBrand?: ImageSource;
  statusBarTranslucent?: boolean;
  navigationBarTranslucent?: boolean;
};

export interface Spec extends TurboModule {
  getConstants(): {
    darkModeEnabled: boolean;
    logoSizeRatio?: number;
    navigationBarHeight?: number;
    statusBarHeight?: number;
  };
  hide(fade: boolean): Promise<void>;
  isVisible(): Promise<boolean>;
  useHideAnimation(config: UseHideAnimationConfig, animate: () => void): UseHideAnimation;
}

export default TurboModuleRegistry.getEnforcing<Spec>("RNBootSplash");