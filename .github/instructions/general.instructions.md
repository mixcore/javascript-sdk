---
applyTo: '**'
---
## Mixcore JavaScript SDK: Project Context & Coding Guidelines

This SDK is a modular, domain-driven, platform-oriented TypeScript monorepo. It is organized by business domain, not legacy file structure. All code must be framework-agnostic, well-typed, and suitable for both internal and third-party consumers.

### Directory Structure (Domain-Driven)

```
mixcore/javascript-sdk/
├── packages/
│   ├── user/         # User domain services and API clients
│   │   ├── src/
│   │   └── tests/
│   ├── template/     # Template domain services and API clients
│   │   ├── src/
│   │   └── tests/
│   ├── file/         # File domain services and API clients
│   │   ├── src/
│   │   └── tests/
│   ├── config/       # Configuration domain services
│   │   ├── src/
│   │   └── tests/
│   ├── navigation/   # Navigation domain services
│   │   ├── src/
│   │   └── tests/
│   ├── database/     # Database and attribute services
│   │   ├── src/
│   │   └── tests/
│   ├── shared/       # Shared utilities, helpers, constants
│   │   ├── src/
│   │   └── tests/
│   ├── base/         # Base classes, abstract models, interfaces
│   │   ├── src/
│   │   └── tests/
│   ├── api/          # API bootstrap, core API clients, SDK entrypoint
│   │   ├── src/
│   │   └── tests/
├── tests/            # Cross-package/unit/integration tests
├── README.md
├── package.json
└── nx.json / lerna.json / pnpm-workspace.yaml (if using monorepo tool)
```

### Coding Guidelines

- All code must be TypeScript, framework-agnostic, and have injectable config.
- Organize modules by business domain (User, Template, File, Config, Database, etc.).
- Provide a single SDK bootstrap/config entrypoint (`createMixcoreSdk(config)`).
- Support plugin/adapter architecture and OpenAPI codegen for API clients.
- Enforce advanced TypeScript, test, and documentation standards.
- No SPA/UI dependencies in SDK code.
- All public APIs must be typed, documented, and tested.
- Use OpenAPI codegen for REST clients where possible.
- Provide plugin/adapter interfaces for extensibility.
- Update migration checklists and documentation as you migrate, refactor, and document each module.


### Extraction & Refactoring Requirements

- Audit and extract all shared, base, and API code from `/.legacy` (legacy portal) into the correct domain-driven package.
- Exclude all SPA/UI-coupled logic (routing, DOM, framework state, etc.).
- Refactor all imports/exports to use package-relative paths.
- Remove or abstract any SPA-coupled dependencies (e.g., window, document, SPA-specific stores).
- All configuration (endpoints, tokens, etc.) must be injectable and never hardcoded.
- Maintain original directory structure for clarity where possible.

### Build, Testing, and Automation

- Build outputs must support both ESM and CJS, and generate TypeScript declarations.
- All public APIs must have unit and integration tests (Jest or Vitest recommended).
- Integration/cross-package tests should be placed in `/tests`.
- CI/CD must lint, type-check, test, and build each package on every commit.
- Use semantic versioning (per-package or global).

### Documentation

- Each package/module must have a README.md with usage examples.
- Provide migration/usage guides for teams adopting the SDK.
- All public APIs, types, and configuration points must have TSDoc/JSDoc comments.
- API reference should be auto-generated from TypeScript/OpenAPI where possible.

### Security & Compliance

- No secrets or credentials are hardcoded. All sensitive config must be injected at runtime.
- API clients must sanitize all inputs/outputs and handle errors gracefully.
- License the SDK under Mixcore Community License (MCL) or compatible OSS license with clear attribution.

### Success Criteria

- All SDK code is TypeScript, framework-agnostic, and well-documented.
- 90%+ test coverage for all core packages.
- All public APIs are typed, documented, and auto-generated from source/OpenAPI.
- SDK is extensible via plugins/adapters.
- Legacy code is fully deprecated in consuming projects.
- CI/CD is green and releases are automated.