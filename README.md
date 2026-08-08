# B2B Sipariş & Bayi Yönetim Sistemi

A B2B dealer portal connecting a factory/head office with its franchise dealers through a unified order, payment, and current-account (cari) management system.

<p align="center">
  <img src="https://img.shields.io/badge/Status-Planning-orange?style=flat-square">
  <img src="https://img.shields.io/badge/Platform-Web-blue?style=flat-square">
  <img src="https://img.shields.io/badge/Tech-Next.js-black?style=flat-square">
  <img src="https://img.shields.io/badge/Database-Neon%20Postgres-00E599?style=flat-square">
  <img src="https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=flat-square">
</p>

## Contents

- [Overview](#overview)
- [Key Capabilities](#key-capabilities)
- [Modules](#modules)
- [Architecture & Documentation](#architecture--documentation)
- [Roadmap](#roadmap)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [License](#license)

## Overview

This platform manages the full order-to-cash cycle between a head office and its franchise dealers: multi-brand product catalogs, configurable checkout/payment flows, standalone current-account (cari) collections, and filterable reporting with export.

It is designed around four constraints that shape most of the architecture:

- **Multi-brand hierarchy** — one head office, several sub-brands, each with its own catalog and stock; dealers are scoped to the brand(s) they're assigned to.
- **Configurable payment flow** — admins choose per dealer/brand whether checkout goes through open account (Cari), cash on delivery, or Virtual POS.
- **Order-independent collections** — dealers can pay down their current-account balance without placing an order; this is tracked separately from order payments but feeds the same ledger.
- **Payment provider isolation** — no live bank/Virtual POS integration in the first phases; a mock provider sits behind the same interface a real one will later use.

## Key Capabilities

- Multiple sub-brands under one head office, each with an isolated catalog and stock
- Dealer accounts scoped to specific brands, with per-dealer/per-brand payment rules
- Order status machine that branches by payment method, with a full audit trail
- Standalone Virtual POS collections against the current-account balance
- Brand/dealer/product/date-filtered reporting, exportable to Excel, CSV, and PDF
- Provider-agnostic payment layer — swapping the mock provider for a live one touches one implementation, not the app

## Modules

| Module | Responsibility |
| --- | --- |
| Brand & Dealer Management | Sub-brand definitions, dealer records, brand assignment, payment method configuration |
| Catalog | Brand-scoped categories, products, packaging, pricing |
| Order & Checkout | Cart, dynamic checkout steps, order status machine, audit history |
| Payments & Current Account | Order payments, standalone collections, ledger entries, balance tracking |
| Reporting | Filterable tables/charts, Excel/CSV/PDF export |

## Architecture & Documentation

The full system architecture — database schema, order/payment state machine, technology rationale, and screen inventory — lives in [`docs/roadmap.md`](docs/roadmap.md).

The same document is also generated as [PDF](docs/output/roadmap.pdf) and [Word](docs/output/roadmap.docx); both are rebuilt from `roadmap.md` via the pipeline described in [`docs/README.md`](docs/README.md), so they never drift from the source.

## Roadmap

| Phase | Goal |
| --- | --- |
| 1 — Core Infrastructure | Neon DB connection, ORM, migrations, auth skeleton |
| 2 — Brand, Dealer & Product Management | Admin CRUD for brands, dealers, catalog, payment method rules |
| 3 — Order & Mock Payment Flow | Cart/checkout, order status machine, `PaymentProvider` interface |
| 4 — Current Account & Standalone Collections | Free-form dealer payments, ledger, balance statements |
| 5 — Reporting & Analytics | Filterable reports, Excel/CSV/PDF export |
| 6 — Live Virtual POS & Hardening | Real payment provider, webhooks, monitoring, load testing |

Exit criteria for each phase are detailed in [`docs/roadmap.md`](docs/roadmap.md#1-fazlandırılmış-yol-haritası).

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend / Backend | Next.js 15 (App Router) + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Data fetching | TanStack Query + Server Actions |
| ORM | Drizzle ORM |
| Database | Neon Postgres |
| Auth | Auth.js (credentials) + role-based middleware |
| Caching | Upstash Redis |
| Export | exceljs, csv-stringify, @react-pdf/renderer |
| Payments | `PaymentProvider` interface + `MockPosProvider` (mock now, real provider later) |
| Hosting | Vercel |

Rationale for each choice is in [`docs/roadmap.md`](docs/roadmap.md#4-önerilen-teknoloji-yığını).

## Repository Structure

```
docs/
  roadmap.md          single source of truth for architecture & roadmap
  output/              generated roadmap.pdf / roadmap.docx
  scripts/             markdown -> PDF/Word build pipeline
```

Application code (the Next.js app) is added starting with Phase 1.

## License

All rights reserved — see [`LICENSE`](LICENSE) ([Turkish translation](LICENSE.tr.md)).

This repository is public for reference and portfolio purposes. Viewing the code does not grant permission to copy, modify, redistribute, or reuse it in another project, in whole or in part, without prior written consent from the copyright holder.

---

**EGMTRG Software and Development** · Developer: **Egemen Turoğlu**
