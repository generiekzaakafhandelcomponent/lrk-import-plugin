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
import com.ritense.processlink.domain.ActivityTypeWithEventName.SERVICE_TASK_START
import com.ritense.valtimoplugins.lrkimport.client.LrkCsvService
import io.github.oshai.kotlinlogging.KotlinLogging
import org.operaton.bpm.engine.delegate.DelegateExecution
import java.time.Instant
import kotlin.time.measureTimedValue

private val logger = KotlinLogging.logger {}

@Plugin(
    key = "lrk-import-plugin",
    title = "LrkImport Plugin",
    description = "Downloads LRK CSV data from given URL and stores it in batched process variables for import a tool like Hasura",
)
open class LrkImportPlugin(
    private val lrkCsvService: LrkCsvService,
) {
    @PluginAction(
        key = "download-lrk-data",
        title = "Download LRK Data",
        description = "Downloads LRK CSV, filters by CBS codes, transforms records and stores them in batched process variables",
        activityTypes = [SERVICE_TASK_START],
    )
    open fun downloadLrkData(
        execution: DelegateExecution,
        @PluginActionProperty csvUrl: String,
        @PluginActionProperty cbsCodes: List<String>,
        @PluginActionProperty batchSize: Int,
        @PluginActionProperty houdersCollectionVariable: String,
        @PluginActionProperty voorzieningenCollectionVariable: String,
    ) {
        val (records, csvDuration) = measureTimedValue { lrkCsvService.downloadAndParse(csvUrl) }
        val filtered = records.filter { it.cbsCode in cbsCodes }
        logger.info { "Downloaded ${records.size} records in $csvDuration, ${filtered.size} match CBS filter" }

        val now = Instant.now().toString()
        val houderMap = LinkedHashMap<String, Map<String, Any?>>()
        val voorzieningen = mutableListOf<Map<String, Any?>>()

        for (record in filtered) {
            val houderId = if (record.typeOko == "VGO" && record.kvkNummerHouder.isEmpty()) {
                record.lrkId
            } else {
                record.kvkNummerHouder
            }

            houderMap.putIfAbsent(
                houderId,
                mapOf(
                    "id" to houderId,
                    "naam" to record.naamHouder,
                    "kvk" to record.kvkNummerHouder.toLongOrNull(),
                    "contact_persoon" to record.contactPersoon,
                    "contact_telefoon" to record.contactTelefoon,
                    "contact_emailadres" to record.contactEmailadres,
                    "contact_website" to record.contactWebsite,
                    "correspondentie_adres" to record.correspondentieAdres,
                    "correspondentie_postcode" to record.correspondentiePostcode,
                    "correspondentie_woonplaats" to record.correspondentieWoonplaats,
                    "updated_at" to now,
                ),
            )

            voorzieningen.add(
                mapOf(
                    "lrk_id" to record.lrkId,
                    "houder_id" to houderId,
                    "adres" to record.opvanglocatieAdres,
                    "plaats" to record.opvanglocatieWoonplaats,
                    "postcode" to record.opvanglocatiePostcode,
                    "verantwoordelijke_gemeente" to record.verantwoordelijkeGemeente,
                    "gemeente_cbs_code" to record.cbsCode,
                    "soort" to record.typeOko,
                    "updated_at" to now,
                ),
            )
        }

        val houders = houderMap.values.toList()
        storeBatches(execution, houders, houdersCollectionVariable, batchSize)
        storeBatches(execution, voorzieningen, voorzieningenCollectionVariable, batchSize)

        val houderBatchCount = (houders.size + batchSize - 1) / batchSize
        val voorzieningBatchCount = (voorzieningen.size + batchSize - 1) / batchSize
        logger.info {
            "LRK data prepared: ${houders.size} houders in $houderBatchCount batches, " +
                "${voorzieningen.size} voorzieningen in $voorzieningBatchCount batches"
        }
    }

    private fun storeBatches(
        execution: DelegateExecution,
        records: List<Map<String, Any?>>,
        collectionVariable: String,
        batchSize: Int,
    ) {
        execution.setVariable(collectionVariable, records.chunked(batchSize))
    }
}
