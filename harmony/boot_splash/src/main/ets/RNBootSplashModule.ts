import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts";
import Logger from './Logger';
import { JSON } from '@kit.ArkTS';


let visible: boolean = false;
const TAG = "BootSplashModule";

export class BootSplashModule extends TurboModule implements TM.RNBootSplash.Spec {
  useHideAnimation(config: TM.RNBootSplash.UseHideAnimationConfig,
    animate: () => void): TM.RNBootSplash.UseHideAnimation {
    try {
      Logger.info(TAG, "config" + JSON.stringify(config))
      const skipLogo = config.logo == null;
      const skipBrand = config.manifest.brand == null || config.brand == null;

      const logoWidth = config.manifest.logo.width;
      const logoHeight = config.manifest.logo.height;
      const brandBottom = config.manifest.brand?.bottom;
      const brandWidth = config.manifest.brand?.width;
      const brandHeight = config.manifest.brand?.height;

      const stants: Stants = this.getConstants();
      const darkModeEnabled: boolean = stants != null ? stants.darkModeEnabled : false;
      const backgroundColor: string =
        darkModeEnabled && config.manifest.darkBackground != null
          ? config.manifest.darkBackground
          : config.manifest.background;

      const logoFinalSrc: ImageSource = skipLogo
        ? undefined
        : darkModeEnabled && config.darkLogo != null
          ? config.darkLogo
          : config.logo;

      const brandFinalSrc: ImageSource = skipBrand
        ? undefined
        : darkModeEnabled && config.darkBrand != null
          ? config.darkBrand
          : config.brand;

      let layoutReady = false;
      let logoReady = skipLogo;
      let brandReady = skipBrand;
      let animateHasBeenCalled = false;

      const maybeRunAnimate = () => {
        if (layoutReady && logoReady && brandReady && !animateHasBeenCalled) {
          animateHasBeenCalled = true;
          this.hide(false).then(() => {
            Logger.info(TAG, "hide run!");
            visible = true;
            animate();
          }).catch((error) => {
            Logger.error("Error hiding:", error)
          });
        }
      }

      const containerStyle: Object = {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      };

      const container: ViewStyle = {
        style: containerStyle,
      };
      layoutReady = true;

      const logo: ImageProps =
        logoFinalSrc == null
          ? { source: -1 }
          : {
          fadeDuration: 0,
          resizeMode: "contain",
          source: logoFinalSrc,
          style: {
            width: logoWidth,
            height: logoHeight,
          }
        };
      logoReady = true;

      const brand: ImageProps =
        brandFinalSrc == null
          ? { source: -1 }
          : {
          fadeDuration: 0,
          resizeMode: "contain",
          source: brandFinalSrc,
          style: {
            position: "absolute",
            bottom: brandBottom,
            width: brandWidth,
            height: brandHeight,
          }
        };
      brandReady = true;

      maybeRunAnimate();
      const re: TM.RNBootSplash.UseHideAnimation = {
        container: container,
        logo: logo,
        brand: brand,
      }
      Logger.info(TAG, "return" + JSON.stringify(re));
      return re;
    } catch (e) {
      Logger.error(TAG, "err,massage:" + e)
    }
  }

  getConstants(): {
    darkModeEnabled: boolean;
    logoSizeRatio?: number | undefined;
    navigationBarHeight?: number | undefined;
    statusBarHeight?: number | undefined;
  } {
    return {
      darkModeEnabled:true,
      logoSizeRatio: 1,
      navigationBarHeight: 0,
      statusBarHeight: 0,
    };
  }

  hide(fade: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  isVisible(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(visible)
    });
  }
}

type ImageSource = string | number ;
type AlignItems = "normal" | "flex-start" | "flex-end" | "start" | "end" | "center" | "stretch";
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
type Position = "absolute" | "static" | "relative" | "fixed" | "sticky";

interface Stants {
  darkModeEnabled: boolean;
  logoSizeRatio?: number;
  navigationBarHeight?: number;
  statusBarHeight?: number;
}

interface Style {
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

interface ViewStyle {
  style?: Style | undefined;
};

type ResizeMode = "cover" | "contain" | "stretch" | "repeat" | "center";

interface ImageProps {
  fadeDuration?: number;
  resizeMode?: ResizeMode;
  source: string | number;
  style?: Style;
}