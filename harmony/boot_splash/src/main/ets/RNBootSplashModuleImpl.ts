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

import { window } from '@kit.ArkUI';
import Logger from './Logger';

export class RNBootSplashModuleImpl {
  // 子窗口
  private static splashWindow: window.Window;

  /**
   * 关闭启动屏
   */
  public static hide(fade: boolean): Promise<void> {
    Logger.info('hide this.splashWindow', JSON.stringify(this.splashWindow));
    if (this.splashWindow && this.splashWindow.isWindowShowing()) {
      this.splashWindow.destroyWindow((err) => {
        if (err.code) {
          Logger.error('Failed to destroy the window. Cause: ' + JSON.stringify(err));
          return;
        }
        this.splashWindow = undefined;
        Logger.info('destroy splashWindow success.');
      });
    }
    return Promise.resolve();
  }

  public static isVisible(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.splashWindow && this.splashWindow.isWindowShowing());
    });
  }

  public static setSplashWindow(splashWindow) {
    this.splashWindow = splashWindow;
  }
}