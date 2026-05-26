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

package com.ritense.valtimoplugins.lrkimport.plugin

import com.ritense.plugin.annotation.Plugin
import com.ritense.plugin.annotation.PluginAction
import com.ritense.plugin.annotation.PluginActionProperty
import com.ritense.plugin.annotation.PluginProperty
import com.ritense.processlink.domain.ActivityTypeWithEventName.SERVICE_TASK_START
import com.ritense.valtimoplugins.lrkimport.client.HasuraSchemaService
import io.github.oshai.kotlinlogging.KotlinLogging
import org.operaton.bpm.engine.delegate.DelegateExecution

private val logger = KotlinLogging.logger {}

@Plugin(
    key = "lrk-import-plugin",
    title = "LrkImport Plugin",
    description = "Imports LRK data into a Hasura-managed database",
)
open class LrkImportPlugin(
    private val hasuraSchemaService: HasuraSchemaService,
) {
    @PluginProperty(key = "hasuraUrl", secret = false)
    lateinit var hasuraUrl: String

    @PluginProperty(key = "hasuraAdminSecret", secret = true)
    lateinit var hasuraAdminSecret: String

    @PluginAction(
        key = "create-lrk-tables",
        title = "Create LRK Tables",
        description = "Creates the houder and voorziening tables via the Hasura Schema API",
        activityTypes = [SERVICE_TASK_START],
    )
    open fun createLrkTables(execution: DelegateExecution) {
        logger.info { "Creating LRK tables via Hasura Schema API at $hasuraUrl" }

        hasuraSchemaService.createLrkTables(hasuraUrl, hasuraAdminSecret)
        execution.setVariable("lrkTablesCreated", true)

        logger.info { "LRK tables created successfully" }
    }

    @PluginAction(
        key = "track-hasura-tables",
        title = "Track Hasura Tables",
        description = "Tracks the specified tables in Hasura so they are exposed via the GraphQL API",
        activityTypes = [SERVICE_TASK_START],
    )
    open fun trackHasuraTables(
        execution: DelegateExecution,
        @PluginActionProperty tables: List<String>,
    ) {
        logger.info { "Tracking ${tables.size} table(s) in Hasura at $hasuraUrl: $tables" }

        hasuraSchemaService.trackTables(hasuraUrl, hasuraAdminSecret, tables)
        execution.setVariable("hasuraTablesTracked", tables)

        logger.info { "Hasura tables tracked successfully" }
    }
}
