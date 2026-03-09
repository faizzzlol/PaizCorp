# Paiz® Corp

> **The national conglomerate of The Legend of Legiona.**  
> Railways. Construction. Retail. Film. Food.

[![Live Site](https://img.shields.io/badge/Live%20Site-faizzzlol.github.io%2FPaizCorp-2a6647?style=flat-square)](https://faizzzlol.github.io/PaizCorp/)
[![The LoL](https://img.shields.io/badge/The%20LoL-Nation%20Home-161410?style=flat-square)](https://faizzzlol.github.io/thelol/)
[![Server](https://img.shields.io/badge/Server-Skyxion%3A%20Ragnarok-4a5540?style=flat-square)]()

---

## Overview

Paiz® Corp is a multi-division national conglomerate operating within **The Legend of Legiona (The LoL)** — a sovereign Minecraft nation on Skyxion: Ragnarok. Founded by **Faiz4224**, Paiz® Corp oversees five subsidiaries spanning every sector the nation needs: transport, construction, retail, film production, and food.

**Live site →** [faizzzlol.github.io/PaizCorp](https://faizzzlol.github.io/PaizCorp/)

---

## Subsidiaries

### 01 · TL Railways — Transport
The national rail operator of The LoL. Runs 4 lines across Skyxion.

| Line | Type | Status |
|------|------|--------|
| TLSRL (The LoL–Spawn Railway Link) | Intercity Rail | ✅ Operational |
| Monorail | Elevated Rapid Transit | ✅ Operational |
| LRT / MRT | Metro Rail | ✅ Operational |
| HSB Link | High-Speed Boat | ✅ Operational |

**→** [faizzzlol.github.io/thelol/tlr/](https://faizzzlol.github.io/thelol/tlr/)

---

### 02 · Paiz™ Construction — Engineering & Build
The build arm of Paiz® Corp. Responsible for every major structure in The LoL — from the 4,800-block TLSRL track to the TLCC Twin Towers.

**→** [TLSRL Project Brief](https://faizzzlol.github.io/thelol/PaizCorp/tlsrl)

---

### 03 · Paiz Shop — Retail
The official Minecraft item store of The LoL. Buy items with Diamonds. Delivery and pickup available within Skyxion.

**Features:**
- Live product catalogue loaded from `products.json`
- Slide-out cart with quantity controls
- Checkout modal (IGN, Discord, delivery type, location, notes)
- Orders sent as rich embeds to a Discord webhook
- Password-protected admin panel with full CRUD
- Admin actions logged to a separate Discord webhook
- All data stored via GitHub API — no backend required

**→** [faizzzlol.github.io/PaizCorp/PaizShop/](https://faizzzlol.github.io/PaizCorp/PaizShop/)  
**Admin →** [faizzzlol.github.io/PaizCorp/PaizShop/admin/](https://faizzzlol.github.io/PaizCorp/PaizShop/admin/)

---

### 04 · PaizProductions — Film & Media
The cinematic arm of Paiz® Corp. Currently producing **The LoL: The Movie** — a political Minecraft epic documenting the rise, fracture, and reinvention of The Legend of Legiona.

> *"This is not a fantasy. This is a warning."*

**Key Figures:** Faiz4224 · Imii Kun · Dyno · UltraX2020  
**Phases:** Formation → Expansion → Ideological Collapse → Equality Restored

**→** [faizzzlol.github.io/PaizCorp/PaizProductions/thelolmovie](https://faizzzlol.github.io/PaizCorp/PaizProductions/thelolmovie)

---

### 05 · Paiz Chicken — Food & Hospitality
The LoL's virtual food and hospitality brand. Online ordering system for virtual fried chicken and Minecraft food items, with delivery fees calculated by distance within Skyxion.

**→** [faizzzlol.github.io/PaizCorp/PaizChicken/](https://faizzzlol.github.io/PaizCorp/PaizChicken/)

---

## Repository Structure

```
PaizCorp/
├── index.html                  # Paiz® Corp conglomerate homepage
├── README.md                   # This file
│
├── PaizShop/
│   ├── index.html              # Storefront
│   ├── products.json           # Product catalogue (single source of truth)
│   └── admin/
│       └── index.html          # Manager admin panel
│
├── PaizProductions/
│   └── thelolmovie/
│       └── index.html          # The LoL: The Movie page
│
├── PaizChicken/                # Paiz Chicken ordering system
│
└── bdsm/                       # (internal)
```

---

## PaizShop — Setup Guide

PaizShop runs entirely on GitHub Pages with no backend. To configure:

**1. Discord Webhooks**
- Create two webhooks in your Discord server (Settings → Integrations → Webhooks)
- **Orders webhook** → paste into `PaizShop/index.html` at `ORDER_WEBHOOK`
- **Admin log webhook** → configured via the admin panel UI

**2. Admin Panel**
- Navigate to `/PaizCorp/PaizShop/admin/`
- Default password: `PaizAdmin2026` *(change in `admin/index.html` before deploying)*
- Fill in the **Config** panel:
  - GitHub Personal Access Token (needs `repo` scope)
  - Repo: `faizzzlol/PaizCorp`
  - Path: `PaizShop/products.json`
  - Admin Discord webhook URL
- Click **Save Config**

**3. products.json**  
All product data lives in `PaizShop/products.json`. The admin panel reads and writes this file directly via the GitHub API. Each product has:

```json
{
  "id": "shulker_box",
  "name": "Shulker Box",
  "price": 4,
  "unit": "Diamond",
  "stock": 0,
  "image": "img/shulker_box.png",
  "category": "Storage",
  "listed": true,
  "description": "Store and carry items in bulk."
}
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Hosting | GitHub Pages (static) |
| Data persistence | GitHub Contents API (products.json) |
| Order notifications | Discord Webhooks |
| Fonts | Google Fonts (Playfair Display, DM Mono, Outfit) |
| Backend | None |

---

## Links

| | |
|---|---|
| 🌐 Paiz® Corp | [faizzzlol.github.io/PaizCorp](https://faizzzlol.github.io/PaizCorp/) |
| 🛒 Paiz Shop | [faizzzlol.github.io/PaizCorp/PaizShop](https://faizzzlol.github.io/PaizCorp/PaizShop/) |
| 🎬 The LoL Movie | [faizzzlol.github.io/PaizCorp/PaizProductions/thelolmovie](https://faizzzlol.github.io/PaizCorp/PaizProductions/thelolmovie) |
| 🚂 TL Railways | [faizzzlol.github.io/thelol/tlr](https://faizzzlol.github.io/thelol/tlr/) |
| 🏛 The LoL | [faizzzlol.github.io/thelol](https://faizzzlol.github.io/thelol/) |
| 💬 Discord | [discord.gg/TB4T8qwN4R](https://discord.gg/TB4T8qwN4R) |
| ☕ Donate | [sociabuzz.com/faizgg/donate](https://sociabuzz.com/faizgg/donate) |

---

## About

Paiz® Corp is a fictional national conglomerate within **The Legend of Legiona**, a Minecraft nation on the Skyxion: Ragnarok server. All products, services, and infrastructure exist within the Minecraft world.

Founded and maintained by **Faiz4224**.

---

*© 2026 Paiz® Corp — The Legend of Legiona — Skyxion: Ragnarok*
