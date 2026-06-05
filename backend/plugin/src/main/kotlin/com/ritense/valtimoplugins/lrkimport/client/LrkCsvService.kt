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

import io.github.oshai.kotlinlogging.KotlinLogging
import org.apache.commons.csv.CSVFormat
import org.apache.commons.csv.CSVParser
import org.springframework.web.client.RestClient
import java.io.StringReader

private val logger = KotlinLogging.logger {}

class LrkCsvService(
    private val restClient: RestClient,
) {
    fun downloadAndParse(csvUrl: String): List<LrkCsvRecord> {
        val bytes = downloadWithRetry(csvUrl)

        var csvText = String(bytes, Charsets.ISO_8859_1)
        if (csvText.startsWith("﻿")) csvText = csvText.substring(1)

        val format = CSVFormat.DEFAULT.builder()
            .setDelimiter(';')
            .setHeader()
            .setSkipHeaderRecord(true)
            .setTrim(true)
            .build()

        return CSVParser.parse(StringReader(csvText), format).use { parser ->
            parser.map { row ->
                LrkCsvRecord(
                    lrkId = row["lrk_id"],
                    typeOko = row["type_oko"],
                    kvkNummerHouder = row["kvk_nummer_houder"],
                    naamHouder = row["naam_houder"],
                    contactPersoon = row["contact_persoon"].stripApostrophes(),
                    contactTelefoon = row["contact_telefoon"].stripApostrophes(),
                    contactEmailadres = row["contact_emailadres"].stripApostrophes(),
                    contactWebsite = row["contact_website"].stripApostrophes(),
                    correspondentieAdres = row["correspondentie_adres"],
                    correspondentiePostcode = row["correspondentie_postcode"],
                    correspondentieWoonplaats = row["correspondentie_woonplaats"],
                    opvanglocatieAdres = row["opvanglocatie_adres"],
                    opvanglocatieWoonplaats = row["opvanglocatie_woonplaats"],
                    opvanglocatiePostcode = row["opvanglocatie_postcode"],
                    verantwoordelijkeGemeente = row["verantwoordelijke_gemeente"],
                    cbsCode = row["cbs_code"],
                )
            }
        }
    }

    private fun downloadWithRetry(csvUrl: String): ByteArray {
        var delayMs = INITIAL_RETRY_DELAY_MS
        var lastException: Exception? = null
        for (attempt in 1..MAX_DOWNLOAD_ATTEMPTS) {
            try {
                logger.info { "Downloading LRK CSV from $csvUrl (attempt $attempt/$MAX_DOWNLOAD_ATTEMPTS)" }
                return restClient.get().uri(csvUrl).retrieve().body(ByteArray::class.java)
                    ?: throw IllegalStateException("No response from $csvUrl")
            } catch (e: Exception) {
                lastException = e
                if (attempt < MAX_DOWNLOAD_ATTEMPTS) {
                    logger.warn { "Download attempt $attempt/$MAX_DOWNLOAD_ATTEMPTS failed: ${e.message}. Retrying in ${delayMs}ms" }
                    Thread.sleep(delayMs)
                    delayMs *= 2
                }
            }
        }
        throw lastException!!
    }

    // The LRK CSV wraps some contact fields in apostrophes (e.g. 'email@example.com')
    private fun String.stripApostrophes() = replace(APOSTROPHES_REGEX, "$1").trim()

    companion object {
        private val APOSTROPHES_REGEX = Regex("^'+(.*?)'+$")
        private const val MAX_DOWNLOAD_ATTEMPTS = 3
        private const val INITIAL_RETRY_DELAY_MS = 1_000L
    }
}
