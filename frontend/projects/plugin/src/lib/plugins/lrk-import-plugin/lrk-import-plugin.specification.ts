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
import {CreateTablesActionConfigurationComponent} from "./components/create-tables-action-configuration/create-tables-action-configuration.component";
import {TrackTablesActionConfigurationComponent} from "./components/track-tables-action-configuration/track-tables-action-configuration.component";

const lrkImportPluginSpecification: PluginSpecification = {
  pluginId: "lrk-import-plugin",
  pluginConfigurationComponent: LrkImportPluginConfigurationComponent,
  pluginLogoBase64: LRK_IMPORT_PLUGIN_LOGO_BASE64,
  functionConfigurationComponents: {
    "create-lrk-tables": CreateTablesActionConfigurationComponent,
    "track-hasura-tables": TrackTablesActionConfigurationComponent,
  },
  pluginTranslations: {
    nl: {
      title: "LRK import Plugin",
      "create-lrk-tables": "Maak LRK tabellen aan",
      "track-hasura-tables": "Volg Hasura tabellen",
      description: "Plugin voor het importeren van LRK-data via Hasura.",
      configurationTitle: "Configuratienaam",
      hasuraUrl: "Hasura URL",
      hasuraAdminSecret: "Hasura Admin Secret",
      actionDescription: "Maakt de tabellen 'houder' en 'voorziening' aan via de Hasura Schema API. Geen configuratie vereist.",
      tables: "Te volgen tabellen",
      tablePlaceholder: "Tabelnaam",
      addTable: "+ Tabel toevoegen",
      removeTable: "Verwijderen",
    },
    en: {
      title: "LRK import Plugin",
      "create-lrk-tables": "Create LRK Tables",
      "track-hasura-tables": "Track Hasura Tables",
      description: "Plugin for importing LRK data via Hasura.",
      configurationTitle: "Configuration Name",
      hasuraUrl: "Hasura URL",
      hasuraAdminSecret: "Hasura Admin Secret",
      actionDescription: "Creates the 'houder' and 'voorziening' tables via the Hasura Schema API. No configuration required.",
      tables: "Tables to track",
      tablePlaceholder: "Table name",
      addTable: "+ Add table",
      removeTable: "Remove",
    },
  },
};

export {lrkImportPluginSpecification};
