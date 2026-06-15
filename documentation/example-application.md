# Example Application

The bundled example application demonstrates a two-phase LRK import workflow:

1. **Setup process** (`lrk-setup-import-process`) — creates the `houder` and `voorziening` tables via the Hasura Plugin's Execute SQL Files action and then tracks them.
2. **Import process** (`lrk-data-import-process`) — downloads LRK CSV data using this plugin, then bulk-inserts the batched results into Hasura.

## Running the example application

All commands below should be run from the **project root** directory unless stated otherwise.

### Prerequisites

- Java 21
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Node.js 20 (use `nvm use 20`)

### Start Docker

Starts PostgreSQL (app + Hasura), Keycloak, and Hasura:

```shell
./gradlew :backend:app:composeUp
```

| Service | Port |
|---|---|
| Valtimo database (PostgreSQL) | 54320 |
| Hasura GraphQL Engine | 8085 |
| Hasura database (PostgreSQL) | 54322 |
| Keycloak | 8081 |

### Start backend

```shell
./gradlew :backend:app:bootRun
```

### Start frontend

Run the following from the `frontend/` directory:

```shell
nvm use 20
npm run clean
npm install
npm run build
npm start
```

### Keycloak users

| Name | Role | Username | Password |
|---|---|---|---|
| James Vance | ROLE_USER | user | user |
| Asha Miller | ROLE_ADMIN | admin | admin |
| Morgan Finch | ROLE_DEVELOPER | developer | developer |

## Source code

The source code is split up into two modules:

1. [Frontend](/frontend)
2. [Backend](/backend)
