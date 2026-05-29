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
import {CarbonMultiInputModule, EditorModule, FormModule, InputModule as ValtimoInputModule} from "@valtimo/components";
import {LrkImportPluginConfigurationComponent} from "./components/lrk-import-plugin-configuration/lrk-import-plugin-configuration.component";
import {CreateTablesActionConfigurationComponent} from "./components/create-tables-action-configuration/create-tables-action-configuration.component";
import {TrackTablesActionConfigurationComponent} from "./components/track-tables-action-configuration/track-tables-action-configuration.component";
import {ExecuteGraphQlQueryActionConfigurationComponent} from "./components/execute-graphql-query-action-configuration/execute-graphql-query-action-configuration.component";
import {ExecuteGraphQlMutationActionConfigurationComponent} from "./components/execute-graphql-mutation-action-configuration/execute-graphql-mutation-action-configuration.component";
import {ImportLrkDataActionConfigurationComponent} from "./components/import-lrk-data-action-configuration/import-lrk-data-action-configuration.component";

@NgModule({
  declarations: [LrkImportPluginConfigurationComponent, CreateTablesActionConfigurationComponent, TrackTablesActionConfigurationComponent, ExecuteGraphQlQueryActionConfigurationComponent, ExecuteGraphQlMutationActionConfigurationComponent, ImportLrkDataActionConfigurationComponent],
  imports: [CommonModule, PluginTranslatePipeModule, FormModule, ValtimoInputModule, CarbonMultiInputModule, EditorModule],
  exports: [LrkImportPluginConfigurationComponent, CreateTablesActionConfigurationComponent, TrackTablesActionConfigurationComponent, ExecuteGraphQlQueryActionConfigurationComponent, ExecuteGraphQlMutationActionConfigurationComponent, ImportLrkDataActionConfigurationComponent],
})
export class LrkImportPluginModule {
}
