# CGGS 2027 — Agent Orientation

**Start here:** [`00_CGGS_2027_Project_Knowledge_Base.md`](00_CGGS_2027_Project_Knowledge_Base.md)

**Active task:** [`current_task.md`](current_task.md)

## Phase 1 Constraints

- UI prototype only — no backend, auth, APIs, or database
- Mock data via service layer (`src/services/` → `public/mock-data/`)
- Navy / White / Gold design — premium government summit aesthetic

## Project Rules

Cursor rules in [`.cursor/rules/`](.cursor/rules/):

- `cggs-core.mdc` — scope, architecture, code quality (always applied)
- `cggs-design-system.mdc` — visual identity for `.tsx` / `.css` files
- `cggs-data-layer.mdc` — data access patterns for `.ts` / `.tsx` files

## Page Building

Use the project skill `.cursor/skills/cggs-page-builder/` when implementing routes, pages, or portal screens.

## Key Docs

| Doc | Purpose |
|-----|---------|
| `02_DESIGN_SYSTEM.md` | Full visual design spec |
| `03_DATA_MODELS.md` | JSON schemas & service layer |
| `04_APPLICATION_STRUCTURE.md` | Sitemap & user flows |
| `about_cggs.md` | Domain & historical context |
