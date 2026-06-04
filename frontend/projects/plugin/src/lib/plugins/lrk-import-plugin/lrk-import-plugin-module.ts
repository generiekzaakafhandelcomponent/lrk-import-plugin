/*
 * Copyright 2026 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PluginTranslatePipeModule} from "@valtimo/plugin";
import {CarbonMultiInputModule, FormModule, InputModule as ValtimoInputModule} from "@valtimo/components";
import {LrkImportPluginConfigurationComponent} from "./components/lrk-import-plugin-configuration/lrk-import-plugin-configuration.component";
import {DownloadLrkDataActionConfigurationComponent} from "./components/download-lrk-data-action-configuration/download-lrk-data-action-configuration.component";

@NgModule({
  declarations: [LrkImportPluginConfigurationComponent, DownloadLrkDataActionConfigurationComponent],
  imports: [CommonModule, PluginTranslatePipeModule, FormModule, ValtimoInputModule, CarbonMultiInputModule],
  exports: [LrkImportPluginConfigurationComponent, DownloadLrkDataActionConfigurationComponent],
})
export class LrkImportPluginModule {
}
