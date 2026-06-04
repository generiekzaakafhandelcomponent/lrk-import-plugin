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

data class LrkCsvRecord(
    val lrkId: String,
    val typeOko: String,
    val kvkNummerHouder: String,
    val naamHouder: String,
    val contactPersoon: String,
    val contactTelefoon: String,
    val contactEmailadres: String,
    val contactWebsite: String,
    val correspondentieAdres: String,
    val correspondentiePostcode: String,
    val correspondentieWoonplaats: String,
    val opvanglocatieAdres: String,
    val opvanglocatieWoonplaats: String,
    val opvanglocatiePostcode: String,
    val verantwoordelijkeGemeente: String,
    val cbsCode: String,
)
