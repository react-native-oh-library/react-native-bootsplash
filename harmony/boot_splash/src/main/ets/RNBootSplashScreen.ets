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

import window from '@ohos.window';
import { convertColorValueToHex } from '@rnoh/react-native-openharmony';
import Logger from './Logger';
import { SPLASH_BACKGROUND_ID, SPLASH_WINDOW_NAME } from './const/Const';
import * as SplashPage from './pages/RNBootSplashPage';
import { RNBootSplashModuleImpl } from './RNBootSplashModuleImpl';

export class RNBootSplashScreen {
  public static async init(context: Context, windowStage: window.WindowStage) {
    // 创建子窗口
    windowStage.createSubWindow(SPLASH_WINDOW_NAME, (err, subWindow) => {
      Logger.info('createSubWindow: ' + JSON.stringify(err));
      if (err.code) {
        Logger.error('Failed to create the subwindow. Cause: ' + JSON.stringify(err));
        return;
      }
      RNBootSplashModuleImpl.setSplashWindow(subWindow);

      // 设置子窗口全屏
      subWindow.setWindowLayoutFullScreen(true);
      // 加载自定义启动页
      subWindow.loadContentByName(SplashPage.entryName, (err) => {
        Logger.info('subWindow.loadContentByName:' + JSON.stringify(err));
        if (err.code) {
          Logger.error('Failed to load the content. Cause:' + JSON.stringify(err));
          return;
        }
        // 显示子窗口
        subWindow.showWindow((err) => {
          if (err.code) {
            Logger.error('Failed to show the window. Cause: ' + JSON.stringify(err));
            return;
          }
          Logger.info('Succeeded in showing the window.');
        });
        let backgroundColor = context.resourceManager.getColorByNameSync(SPLASH_BACKGROUND_ID);
        subWindow.setWindowBackgroundColor(convertColorValueToHex(backgroundColor));
      });
    })
  }
}