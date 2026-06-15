# Getting Started

## Prerequisites

- Java 21
- Node.js 20 (use `nvm use 20`)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- A running Valtimo instance (v13.29+)
- A running Hasura instance connected to a PostgreSQL database (the [Hasura Plugin](https://github.com/generiekzaakafhandelcomponent/gzac-plugin-hasura) handles this)

## Backend

Add the dependency to your Valtimo backend project:

```kotlin
dependencies {
    implementation("com.ritense.valtimoplugins:lrk-import-plugin:1.0.0")
}
```

The plugin auto-configures via Spring Boot's autoconfiguration mechanism — no manual bean registration is required.

## Frontend

Install the package:

```shell
npm install @valtimo-plugins/lrk-import-plugin
```

Register the module and specification in your `app.module.ts`:

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

Create a plugin configuration in the Valtimo admin UI under **Plugins**. The only required field is a configuration name — all action-specific properties (CSV URL, CBS codes, batch size, process variable names) are configured per process link.

## Database setup

The plugin stores transformed records as process variables for downstream Hasura mutations. Before running the import, the target tables must exist in your Hasura-managed PostgreSQL database. Reference DDL is provided in [docs/sql/](../docs/sql/):

- `create_houder.sql` — `houder` table (organisations)
- `create_voorziening.sql` — `voorziening` table (locations, foreign-keyed to `houder`)

Use the Hasura Plugin's **Execute SQL Files** and **Track Tables** actions in a setup process to create and expose these tables before importing data.

## Further reading

- [Plugin Reference](plugin.md) — action properties and output format
- [Example Application](example-application.md) — running the bundled demo locally
- [Valtimo plugin documentation](https://docs.valtimo.nl/features/plugins/plugins/custom-plugin-definition)
