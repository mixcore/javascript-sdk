---
mode: agent
---

# Mixcore JavaScript SDK Extraction & Modularization Specification

## Objective

Extract all "shared", "base", and "apis" JavaScript/TypeScript code from `@mixcore/mix.spa.portal` and refactor them into a new, independent, and future-proof SDK repository: `mixcore/javascript-sdk`. The SDK must be modular, highly reusable, and suitable for internal, external, and third-party consumers (web, Node.js, microfrontends, plugins, etc.).

---

## Directory Structure & Tooling

- Use a monorepo structure with [Nx](https://nx.dev/), [Lerna](https://lerna.js.org/), or [Yarn Workspaces] if multiple packages are expected; otherwise, organize under `src/`.
- Proposed directory structure:
    ```
    mixcore/javascript-sdk/
    ├── packages/
    │   ├── shared/      # Utilities, helpers, constants
    │   ├── base/        # Base classes, abstract models, interfaces
    │   └── apis/        # API clients, endpoint wrappers, schema types
    ├── tests/           # Cross-package/unit/integration tests
    ├── README.md
    ├── package.json
    └── nx.json / lerna.json (if using monorepo tool)
    ```
- Prefer TypeScript for new code; convert JS to TS where feasible.

---

## Extraction & Refactoring Instructions

1. **Audit Source Code**
   - Locate all code in `@mixcore/mix.spa.portal` related to "shared", "base", and "apis".
   - Include all `.js`, `.ts`, type declaration files, and related JSON/configs if directly used by these modules.
   - Exclude SPA-specific or UI-coupled logic.

2. **Migration**
   - Move the identified code into the corresponding packages/folders in `mixcore/javascript-sdk`.
   - Maintain original directory structure as much as possible for clarity.
   - Refactor imports/exports to use package-relative paths.

3. **Decoupling & Configuration**
   - Remove or abstract any SPA-coupled dependencies (e.g., window, document, SPA-specific stores).
   - Externalize configuration (endpoints, tokens, etc.) using environment variables or injectable configs.
   - Ensure all modules are framework-agnostic (no direct Vue/React/Angular dependencies).

4. **Build Outputs**
   - Configure builds for both ESM and CJS outputs for maximal compatibility.
   - Generate TypeScript type declarations (`.d.ts`).

5. **Testing**
   - Write or migrate unit/integration tests for all public APIs.
   - Use a test runner compatible with monorepo (e.g., Jest, Vitest).

6. **Documentation**
   - Document each package/module with clear usage examples.
   - Add migration guides for teams adopting the SDK.

7. **Versioning & Publishing**
   - Use semantic versioning (SemVer) for each package or the overall SDK.
   - Configure CI/CD pipelines for linting, testing, building, and publishing (npm, GitHub Packages, etc.).

8. **Backward Compatibility**
   - Provide clear migration notes for dependent projects.
   - Optionally, maintain compatibility layers or adapters if needed.

---

## Usage Scenarios Supported

- **Web Applications:** Import shared logic/API clients directly.
- **Node.js Backends:** Use SDK for server-side scripting, CLI, automation.
- **Microfrontends:** Share core logic across isolated frontend apps.
- **Third-party Plugins/Extensions:** Allow external devs to build on Mixcore APIs safely.
- **Test Automation:** Leverage SDK’s API clients and types.

---

## Security & Compliance

- No secrets or credentials are hardcoded. All sensitive config must be injected at runtime.
- API clients must sanitize all inputs/outputs and handle errors gracefully.
- License the SDK under Mixcore Community License (MCL) or compatible OSS license with clear attribution.

---

## Example SDK Package Metadata (`package.json`)

```json
{
  "name": "@mixcore/shared",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "license": "SEE LICENSE IN LICENSE",
  "repository": "https://github.com/mixcore/javascript-sdk"
}
```

---

## Deliverables

- Extracted and refactored source code in `mixcore/javascript-sdk`
- Complete documentation and migration guides
- CI/CD configuration for automated testing and publishing
- (Optional) Compatibility adapters for legacy consumers

---

## Reference

- Source: [@mixcore/mix.spa.portal](https://github.com/mixcore/mix.spa.portal)
- Target: [mixcore/javascript-sdk](https://github.com/mixcore/javascript-sdk)
- Platform: [Mixcore CMS Overview](https://github.com/mixcore/mix.core)

---

## Approval

This spec serves as the single source of truth for engineering, QA, and product teams for the extraction and modularization process. All future changes and implementation tasks must align with the requirements above.

# Detailed Context for Extraction of Shared, Base, and API Code

## 1. Extraction Scope and Philosophy

- **Goal:** Create a future-proof, reusable, and framework-agnostic JavaScript/TypeScript SDK that contains all utilities, base models, and API integrations previously coupled to the SPA Portal.
- **Principle:** All code in the SDK must be usable outside the context of any specific frontend framework or application.

---

## 2. What to Extract

- All code (in JavaScript or TypeScript) that is:
  - **Shared:** Utility functions, constants, validators, formatters, date/time helpers, i18n, etc.
  - **Base:** Abstract classes, data models, DTOs, interfaces, inheritance hierarchies.
  - **APIs:** API client classes/functions, HTTP request wrappers, endpoint schema types, authentication handlers, API error types, and response mappers.
- **Include:** All related type definitions, interfaces, enums, and any utility that is referenced by shared/base/api modules.
- **Configuration:** Move any constants or config variables (e.g., API endpoints, keys) to injectable/configurable APIs. Do not hardcode environment details.
- **Tests:** Migrate relevant unit and integration tests. If tests are tightly coupled to SPA, adapt them for SDK context.

---

## 3. What to Exclude

- **UI Components:** Vue/React components, CSS/SCSS, HTML templates, or anything tied to rendering.
- **SPA-specific Logic:** Routing, state management (Vuex, Redux, etc.), DOM manipulation, or browser-only APIs unless polyfilled or abstracted.
- **Build/Deploy Scripts:** Unless they are essential for SDK packaging.

---

## 4. SDK Target Architecture

- **Monorepo Structure:** Use Nx, Lerna, or Yarn Workspaces.
- **Packages:**
  - `@mixcore/shared`: All generic utilities and stateless helpers.
  - `@mixcore/base`: Core abstract models, base classes, reusable interfaces.
  - `@mixcore/apis`: API client implementations, endpoints, HTTP logic, auth, error handling.
- **TypeScript Native:** All new code in TypeScript. Convert existing JavaScript to TypeScript where possible.
- **ESM & CJS Outputs:** Build for both module formats.
- **Typed Exports:** All public APIs must export types/interfaces.
- **Framework Agnostic:** No direct dependency on any frontend framework. If needed, provide adapters in optional peer dependencies.

---

## 5. Refactoring Requirements

- **Decouple from SPA:** Remove any direct SPA dependencies. If logic is reused, create adapters or hooks that remain in the SPA repo.
- **Injectable Configuration:** All endpoints, tokens, and environment-specific values must be configured at runtime or via SDK constructors.
- **Error Handling:** Normalize all API error handling. Provide rich, typed errors.
- **Documentation:** All public APIs, types, and configuration points must have TSDoc/JSDoc comments. Each package must have a README.md with usage examples.

---

## 6. Testing & Automation

- **Unit Tests:** For every exported function/class.
- **Integration Tests:** For API clients, using mock servers where possible.
- **CI/CD:** Lint, type-check, test, and build each package on every commit.
- **Versioning:** Per-package semantic versioning (if using monorepo) or global versioning.

---

## 7. Usage Scenarios

- **Web App:** Import SDK modules for shared logic and API access.
- **Node.js Backend:** Use API clients/types for backend scripting.
- **Microfrontends:** Share SDK across independently deployed frontends.
- **Extensions/Plugins:** Third-party developers can build on top of SDK.
- **Testing:** Use SDK for E2E and integration tests in other projects.

---

## 8. Migration Plan

1. **Inventory:** Audit and list all code to move. Map dependencies (internal/external).
2. **Copy & Adapt:** Move code into new SDK repo, preserving structure. Refactor as required.
3. **Refactor Imports:** Update all internal imports to use relative paths or packages.
4. **Test & Validate:** Ensure all moved code passes tests and works independently.
5. **Document:** Write clear docs for each module/package.
6. **Deprecate in SPA:** Update SPA to use SDK, deprecate old code.

---

## 9. Deliverables

- New SDK repository (`mixcore/javascript-sdk`) with:
  - Modular packages: `shared`, `base`, `apis`
  - Type-safe, framework-agnostic, well-documented code
  - Passing tests and CI
  - Migration/usage documentation

---

## 10. Success Criteria

- All common logic/API code is reusable across Mixcore projects.
- No SPA or UI dependencies in SDK.
- All public APIs are typed, documented, and tested.
- SDK is easy to consume by first- and third-party developers.