/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */
import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getConstants(): {
    darkModeEnabled: boolean;
    logoSizeRatio?: number;
    navigationBarHeight?: number;
    statusBarHeight?: number;
  };
  hide(fade: boolean): Promise<void>;
  isVisible(): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("RNBootSplash");
