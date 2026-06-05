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

import {PluginSpecification} from "@valtimo/plugin";
import {LrkImportPluginConfigurationComponent} from "./components/lrk-import-plugin-configuration/lrk-import-plugin-configuration.component";
import {LRK_IMPORT_PLUGIN_LOGO_BASE64} from "./assets";
import {DownloadLrkDataActionConfigurationComponent} from "./components/download-lrk-data-action-configuration/download-lrk-data-action-configuration.component";

const lrkImportPluginSpecification: PluginSpecification = {
  pluginId: "lrk-import-plugin",
  pluginConfigurationComponent: LrkImportPluginConfigurationComponent,
  pluginLogoBase64: LRK_IMPORT_PLUGIN_LOGO_BASE64,
  functionConfigurationComponents: {
    "download-lrk-data": DownloadLrkDataActionConfigurationComponent,
  },
  pluginTranslations: {
    nl: {
      title: "LRK Import Plugin",
      description: "Plugin voor het downloaden en voorbereiden van LRK-data voor import via Hasura.",
      configurationTitle: "Configuratienaam",
      "download-lrk-data": "LRK-data downloaden",
      csvUrl: "CSV URL",
      batchSize: "Batchgrootte",
      cbsCodes: "CBS-codes",
      houdersCollectionVariable: "Procesvariabele houders",
      voorzieningenCollectionVariable: "Procesvariabele voorzieningen",
    },
    en: {
      title: "LRK Import Plugin",
      description: "Plugin for downloading and preparing LRK data for import via Hasura.",
      configurationTitle: "Configuration Name",
      "download-lrk-data": "Download LRK Data",
      csvUrl: "CSV URL",
      batchSize: "Batch size",
      cbsCodes: "CBS codes",
      houdersCollectionVariable: "Houders process variable",
      voorzieningenCollectionVariable: "Voorzieningen process variable",
    },
  },
};

export {lrkImportPluginSpecification};
