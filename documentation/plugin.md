# Plugin Documentation

## Overview

This plugin imports LRK data using Hasura to create tables and import from the data source.
## Dependencies

### Backend

```kotlin
dependencies {
    implementation("com.ritense.valtimoplugins:lrk-import-plugin:0.0.1")
}
```

### Frontend

```json
{
  "dependencies": {
    "@valtimo-plugins/sample-plugin": "0.0.1"
  }
}
```

In your `app.module.ts`:

```typescript
import {
    SamplePluginModule, samplePluginSpecification,
} from '@valtimo-plugins/sample-plugin';

@NgModule({
    imports: [
        SamplePluginModule,
    ],
    providers: [
        {
            provide: PLUGIN_TOKEN,
            useValue: [
                samplePluginSpecification,
            ]
        }
    ]
})
```

## Configuration

List the plugin configuration properties and how to set them.

| Property | Type   | Required | Description                          |
|----------|--------|----------|--------------------------------------|
| apiUrl   | string | Yes      | The URL of the time API to call      |

## Actions

### Time API test action

Sends a GET request to the configured API URL and returns the timezone response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
|           |      |          |             |

## Usage

Explain how to use the plugin in a process, with examples if applicable.
