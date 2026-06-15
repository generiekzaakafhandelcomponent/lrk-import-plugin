# LRK Import Plugin Reference

## Overview

The LRK Import Plugin downloads CSV data from the Dutch childcare registration (LRK), filters it by municipality, and stores the results as batched process variables for import into a Hasura-managed PostgreSQL database.

The plugin exposes one action: **Download LRK Data**.

## Dependencies

### Backend

```kotlin
dependencies {
    implementation("com.ritense.valtimoplugins:lrk-import-plugin:1.0.0")
}
```

### Frontend

```json
{
  "dependencies": {
    "@valtimo-plugins/lrk-import-plugin": "1.0.0"
  }
}
```

In your `app.module.ts`:

```typescript
import {
    LrkImportPluginModule,
    lrkImportPluginSpecification,
} from '@valtimo-plugins/lrk-import-plugin';

@NgModule({
    imports: [
        LrkImportPluginModule,
    ],
    providers: [
        {
            provide: PLUGIN_TOKEN,
            useValue: [
                lrkImportPluginSpecification,
            ]
        }
    ]
})
```

## Plugin Configuration

The plugin has no connection-specific properties. The only plugin-level setting is a configuration name used to identify the instance in the Valtimo UI.

## Actions

### Download LRK Data

**Key:** `download-lrk-data`

Downloads the LRK open-data CSV, filters records by CBS code, transforms them into two datasets, and stores each as a batched list in the specified process variables.

| Property | Type | Required | Description |
|---|---|---|---|
| `csvUrl` | `String` | Yes | URL of the LRK CSV export (e.g. the open-data endpoint) |
| `cbsCodes` | `List<String>` | Yes | One or more CBS municipality codes to filter on; only records matching these codes are imported |
| `batchSize` | `Int` | Yes | Number of records per batch; each batch becomes one element in the output list |
| `houdersCollectionVariable` | `String` | Yes | Process variable name where the list of houder batches is stored |
| `voorzieningenCollectionVariable` | `String` | Yes | Process variable name where the list of voorziening batches is stored |

#### Download behaviour

The CSV is downloaded using Spring `RestClient`. If the request fails, it is retried up to **3 times** with exponential backoff (1 s → 2 s). The CSV is decoded as ISO-8859-1 (Latin-1) and a UTF-8 BOM is stripped if present. Fields are semicolon-delimited; leading/trailing apostrophes on contact fields are removed automatically.

#### Data transformation

Each filtered CSV record produces:

- One **houder** entry (deduplicated by KVK number). For VGO-type entries with an empty KVK, the LRK ID is used as the houder ID instead.
- One **voorziening** entry linked to its houder.

**Houder fields stored:**

| Field | Source column |
|---|---|
| `id` | KVK number (or `lrk_id` for VGO without KVK) |
| `naam` | `naam_houder` |
| `kvk` | `kvk_nummer_houder` (parsed as Long) |
| `contact_persoon` | `contact_persoon` |
| `contact_telefoon` | `contact_telefoon` |
| `contact_emailadres` | `contact_emailadres` |
| `contact_website` | `contact_website` |
| `correspondentie_adres` | `correspondentie_adres` |
| `correspondentie_postcode` | `correspondentie_postcode` |
| `correspondentie_woonplaats` | `correspondentie_woonplaats` |
| `updated_at` | timestamp at time of download |

**Voorziening fields stored:**

| Field | Source column |
|---|---|
| `lrk_id` | `lrk_id` |
| `houder_id` | derived houder ID (see above) |
| `adres` | `opvanglocatie_adres` |
| `plaats` | `opvanglocatie_woonplaats` |
| `postcode` | `opvanglocatie_postcode` |
| `verantwoordelijke_gemeente` | `verantwoordelijke_gemeente` |
| `gemeente_cbs_code` | `cbs_code` |
| `soort` | `type_oko` |
| `updated_at` | timestamp at time of download |

#### Output format

Both `houdersCollectionVariable` and `voorzieningenCollectionVariable` are set to a `List<List<Map<String, Any?>>>` — a list of batches, each batch being a list of record maps. A downstream Hasura **Mutation by Process Variable** action can iterate over these batches to bulk-insert the data.

## Database schema

Reference DDL for the target tables is provided in [docs/sql/](../docs/sql/):

- `create_houder.sql`
- `create_voorziening.sql` (foreign key to `houder.id`)
