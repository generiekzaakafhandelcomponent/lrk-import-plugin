# LRK Import Plugin for Valtimo

A [Valtimo](https://www.valtimo.nl) plugin that downloads CSV data from the Dutch childcare registration ([LRK — Landelijk Register Kinderopvang](https://www.landelijkregisterkinderopvang.nl)), filters it by municipality (CBS) codes, and stores the transformed records as batched process variables ready for import into a PostgreSQL database via the [Hasura Plugin](https://github.com/generiekzaakafhandelcomponent/gzac-plugin-hasura).

## How it works

1. The plugin downloads the LRK open-data CSV from a configurable URL (retries up to 3 times with exponential backoff).
2. Records are filtered by one or more CBS municipality codes.
3. Filtered records are split into two datasets:
   - **Houders** — childcare organisations (deduplicated by KVK number; VGO-type entries without a KVK use their LRK ID instead).
   - **Voorzieningen** — individual childcare locations.
4. Both datasets are chunked into batches and stored as process variables for downstream Hasura bulk-insert mutations.

## Documentation

- [Getting Started](documentation/getting-started.md) — setup and integration instructions
- [Example Application](documentation/example-application.md) — running the bundled demo locally
- [Plugin Reference](documentation/plugin.md) — action and configuration details
- [Release notes](documentation/release-notes.md) — versiegeschiedenis en wijzigingen
