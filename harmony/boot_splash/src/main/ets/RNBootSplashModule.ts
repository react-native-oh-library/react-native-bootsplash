/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';
import { resourceManager } from '@kit.LocalizationKit';
import { window } from '@kit.ArkUI';
import { RNBootSplashModuleImpl } from './RNBootSplashModuleImpl';

export class BootSplashModule extends TurboModule implements TM.RNBootSplash.Spec {
  getConstants(): {
    darkModeEnabled: boolean;
    logoSizeRatio?: number | undefined;
    navigationBarHeight?: number | undefined;
    statusBarHeight?: number | undefined;
  } {
    const configValue = this.ctx.uiAbilityContext.resourceManager.getConfigurationSync();
    const windowClass: window.Window = this.ctx.uiAbilityContext.windowStage.getMainWindowSync();

    // 获取到导航条区域的高度
    let navArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
    let bottomRectHeight = 0;
    if (navArea) {
      bottomRectHeight = navArea.bottomRect.height;
    }

    // 获取到状态栏区域的高度
    let statusArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
    let topRectHeight = 0;
    if (statusArea) {
      topRectHeight = statusArea.topRect.height;
    }

    return {
      darkModeEnabled: configValue.colorMode === resourceManager.ColorMode.DARK,
      logoSizeRatio: 1,
      navigationBarHeight: bottomRectHeight,
      statusBarHeight: topRectHeight,
    };
  }

  hide(fade: boolean): Promise<void> {
    return RNBootSplashModuleImpl.hide(fade);
  }

  isVisible(): Promise<boolean> {
    return RNBootSplashModuleImpl.isVisible();
  }
}