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

package com.ritense.valtimoplugins.lrkimport.client

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

class HasuraSchemaService(
    private val hasuraClient: HasuraClient,
) {
    private val objectMapper = jacksonObjectMapper()

    fun createLrkTables(hasuraUrl: String, adminSecret: String) {
        hasuraClient.runSql(hasuraUrl, adminSecret, loadSql("sql/create_houder.sql"))
        hasuraClient.runSql(hasuraUrl, adminSecret, loadSql("sql/create_voorziening.sql"))
    }

    fun trackTables(hasuraUrl: String, adminSecret: String, tables: List<String>) {
        hasuraClient.trackTables(hasuraUrl, adminSecret, tables)
    }

    fun executeGraphQlQuery(
        hasuraUrl: String,
        adminSecret: String,
        query: String,
        variables: String?,
    ): Map<String, Any>? =
        hasuraClient.executeGraphQlQuery(hasuraUrl, adminSecret, query, parseVariables(variables))

    private fun parseVariables(variables: String?): Map<String, Any> =
        if (!variables.isNullOrBlank()) {
            objectMapper.readValue(variables, object : TypeReference<Map<String, Any>>() {})
        } else emptyMap()

    private fun loadSql(resourcePath: String): String =
        HasuraSchemaService::class.java.classLoader
            .getResourceAsStream(resourcePath)
            ?.bufferedReader()
            ?.readText()
            ?: throw IllegalStateException("SQL resource not found: $resourcePath")
}
