---
mode: agent
---


# Mixcore JavaScript SDK Migration Progress (Platform & Domain-Driven)

This document tracks the migration of all shared, base, and API modules from the legacy portal to the new modular SDK, as required by the migration spec.

## Legend
- [x] Complete
- [ ] In Progress / Not Started
- [~] Partially Complete

---


## 1. Core Migration Steps (Platform & Domain-Driven)
- [x] Monorepo structure created (Lerna/PNPM workspaces)
- [x] TypeScript, Jest, and build tooling configured
- [x] Packages scaffolded: `shared`, `base`, `apis`
- [x] Initial code audit and mapping
- [ ] Domain-driven package reorganization (User, Template, File, Config, Database, etc.)
- [ ] SDK bootstrap/config entrypoint (`createMixcoreSdk(config)`) implemented
- [ ] Plugin/adapter interface defined and documented
- [ ] OpenAPI codegen adopted for REST API clients (if OpenAPI specs exist)
- [ ] CLI for scaffolding, testing, and docs generation

---


## 2. Domain-Driven Module Migration Checklist

### User Domain
| Module                  | Legacy Path                                         | Migrated | Refactored | Unit Tested | Docs |
|-------------------------|-----------------------------------------------------|----------|------------|-------------|------|
| user-services           | app-client/services/user-services.js                |   [ ]    |    [ ]     |    [ ]      | [ ]  |

### Template Domain
| Module                  | Legacy Path                                         | Migrated | Refactored | Unit Tested | Docs |
|-------------------------|-----------------------------------------------------|----------|------------|-------------|------|
| template-service        | app-portal/services/template-service.js              |   [ ]    |    [ ]     |    [ ]      | [ ]  |

### File Domain
| Module                  | Legacy Path                                         | Migrated | Refactored | Unit Tested | Docs |
|-------------------------|-----------------------------------------------------|----------|------------|-------------|------|
| file-services           | app-shared/services/file-service.js                  |    [x]   |    [x]     |    [x]      | [ ]  |
| file-services (portal)  | app-portal/pages/file/file-services.js              |   [ ]    |    [ ]     |    [ ]      | [ ]  |

### Configuration Domain
| Module                  | Legacy Path                                         | Migrated | Refactored | Unit Tested | Docs |
|-------------------------|-----------------------------------------------------|----------|------------|-------------|------|
| configuration-services  | app-portal/pages/configuration/configuration-services.js | [ ] |    [ ]     |    [ ]      | [ ]  |

### Navigation Domain
| Module                  | Legacy Path                                         | Migrated | Refactored | Unit Tested | Docs |
|-------------------------|-----------------------------------------------------|----------|------------|-------------|------|
| rest-navigation-service | app-client/services/rest-navigation-service.js      |   [ ]    |    [ ]     |    [ ]      | [ ]  |

### Database Domain
| Module                  | Legacy Path                                         | Migrated | Refactored | Unit Tested | Docs |
|-------------------------|-----------------------------------------------------|----------|------------|-------------|------|
| mix-database-rest-portal-service | app-shared/services/mix-database/rest-portal-service.js | [ ] | [ ] | [ ] | [ ] |
| mix-database-column-rest-service | app-shared/services/mix-database-column/rest-service.js | [ ] | [ ] | [ ] | [ ] |
| mix-database-data-rest-client-service | app-shared/services/mix-database-data/rest-client-service.js | [ ] | [ ] | [ ] | [ ] |
| mix-database-data-rest-portal-service | app-shared/services/mix-database-data/rest-portal-service.js | [ ] | [ ] | [ ] | [ ] |
| mix-database-data-value-rest-service | app-shared/services/mix-database-data-value/rest-service.js | [ ] | [ ] | [ ] | [ ] |
| module-data-rest-mvc-service | app-shared/services/module-data-service/rest-mvc-service.js | [ ] | [ ] | [ ] | [ ] |
| post-rest-mvc-service | app-shared/services/post-service/rest-mvc-service.js | [ ] | [ ] | [ ] | [ ] |
| related-attribute-data-rest-form-service | app-shared/services/related-attribute-data/rest-form-service.js | [ ] | [ ] | [ ] | [ ] |
| related-attribute-data-rest-portal-service | app-shared/services/related-attribute-data/rest-portal-service.js | [ ] | [ ] | [ ] | [ ] |
| related-attribute-set-rest-portal-service | app-shared/services/related-attribute-set/rest-portal-service.js | [ ] | [ ] | [ ] | [ ] |

### Shared/Core Domain
| Module                        | Legacy Path                                                      | Migrated | Refactored | Unit Tested | Docs |
|-------------------------------|------------------------------------------------------------------|----------|------------|-------------|------|
| common-services               | app-shared/services/common-services.js                           |    [x]   |    [x]     |    [x]      | [ ]  |
| crypto-services               | app-shared/services/crypto-services.js                           |    [x]   |    [x]     |    [x]      | [ ]  |
| gpay-services                 | app-shared/services/gpay-services.js                             |    [x]   |    [x]     |    [x]      | [ ]  |
| translator-services           | app-shared/services/translator-services.js                       |    [x]   |    [x]     |    [x]      | [ ]  |
| global-settings-services      | app-shared/services/global-settings-services.js                  |    [x]   |    [x]     |    [x]      | [ ]  |
| theme-services                | app-shared/services/theme-services.js                            |    [x]   |    [x]     |    [x]      | [ ]  |
| store-services                | app-shared/services/store-services.js                            |    [x]   |    [x]     |    [x]      | [ ]  |
| shared-module-data-services   | app-shared/components/module-data/shared-module-data-services.js |    [x]   |    [x]     |    [x]      | [ ]  |
| modal-nav-metas-service       | app-portal/components/modal-nav-metas/script.js                  |    [x]   |    [x]     |    [x]      | [ ]  |
| shared global.js              | app-portal/shared/global.js                                      |   [ ]    |    [ ]     |    [ ]      | [ ]  |

### Base Abstractions
| Module             | Legacy Path                                   | Migrated | Refactored | Unit Tested | Docs |
|--------------------|-----------------------------------------------|----------|------------|-------------|------|
| base-service       | app-shared/services/base-service.js           |    [x]   |    [x]     |    [x]      | [ ]  |
| base-rest-service  | app-shared/services/base-rest-service.js      |    [x]   |    [x]     |    [x]      | [ ]  |

### API Clients
| Module                   | Legacy Path                                         | Migrated | Refactored | Unit Tested | Docs |
|--------------------------|-----------------------------------------------------|----------|------------|-------------|------|
| api-services             | app-shared/services/api-services.js                 |    [x]   |    [x]     |    [x]      | [ ]  |
| auth-services            | app-shared/services/auth-services.js                |    [x]   |    [x]     |    [x]      | [ ]  |
| module-article-services  | app-portal/pages/module-post/module-article-services.js | [x]   |    [x]     |    [x]      | [ ]  |
| module-data-services     | app-portal/pages/module-data/module-data-services.js |    [x]   |    [x]     |    [x]      | [ ]  |
| module-gallery-services  | app-portal/pages/module-gallery/module-gallery-services.js | [x] |    [x]     |    [x]      | [ ]  |
| theme-services (API)     | app-shared/services/theme-services.js               |    [x]   |    [x]     |    [x]      | [ ]  |
| store-services (API)     | app-shared/services/store-services.js               |    [x]   |    [x]     |    [x]      | [ ]  |

---


## 3. Tests & Coverage
- [x] Unit tests for all migrated modules
- [ ] Integration/cross-package tests in `/tests`
- [ ] Test coverage report generated
- [ ] 90%+ coverage for all core packages

---


## 4. Documentation & CI
- [ ] README.md for each package/module
- [ ] Migration/usage guides
- [ ] API reference auto-generated from TypeScript/OpenAPI
- [ ] CLI for scaffolding, testing, and docs
- [ ] CI/CD config for lint, test, build, publish
- [ ] Release automation (semantic versioning, changelogs)

---


## 5. Migration/Refactor Notes
- All modules must be TypeScript, framework-agnostic, and have injectable config.
- No SPA/UI dependencies in SDK code.
- All public APIs must be typed, documented, and tested.
- Use OpenAPI codegen for REST clients where possible.
- Provide plugin/adapter interfaces for extensibility.
- Update this checklist as you migrate, refactor, and document each module.

## 6. Success Criteria (Enhanced)

- All SDK code is TypeScript, framework-agnostic, and well-documented.
- 90%+ test coverage for all core packages.
- All public APIs are typed, documented, and auto-generated from source/OpenAPI.
- SDK is extensible via plugins/adapters.
- Legacy code is fully deprecated in consuming projects.
- CI/CD is green and releases are automated.
