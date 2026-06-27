# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on 0.0.0.0 (accessible on LAN)
npm run build     # tsc -b && vite build
npm run preview   # preview production build on 0.0.0.0
```

No test framework is configured.

To add shadcn/ui components: `npx shadcn@latest add <component-name>`

## Architecture

This is a **single-page portfolio** — almost all code lives in two files:

- `src/App.tsx` — the entire site. All section data (skills, experience, projects, education, awards) is defined as inline `const` arrays at the top of this file, then rendered inline in JSX below. Adding or editing content means editing these arrays.
- `src/index.css` — the entire design system. Most styling is **custom CSS classes** (`.bezel`, `.hero`, `.nav-shell`, `.tag-pill`, etc.), not Tailwind utilities. Tailwind is used only for spacing/layout utilities (`wrap`, `block`, `mx-auto`, `px-6`).

The only React component outside `App.tsx` is `src/components/ui/button.tsx` (shadcn/ui Button with a custom `glass` variant).

## Design System

Theme is set via `data-theme` attribute on `<html>` (`"light"` | `"dark"`), persisted in `localStorage`. All colors are CSS custom properties defined in `:root` and `:root[data-theme='dark']` in `index.css`.

Key tokens:
- `--canvas` / `--ink` — page background and primary text
- `--muted-ink` — secondary text, labels
- `--accent-solid` / `--accent-soft` — green accent (light: `#1f4d3f` / `#5a8c7a`, dark: `#7bb29e` / `#365e52`)
- `--hairline` / `--hairline-strong` — 1px borders
- `--glass-shell` / `--glass-core` — frosted-glass backgrounds used by nav and bezels
- `--radius` — `2.25rem` (pill-scale), `--core-radius` is `--radius - 0.4rem`

**Fonts** (loaded from Google Fonts):
- `Instrument Serif` — display headings (`var(--font-display)`)
- `Plus Jakarta Sans` — body text (`var(--font-body)`)
- `JetBrains Mono` — labels, tags, meta (`var(--font-mono)`)

**Core UI patterns:**
- `.bezel` + `.bezel-core` — double-layered frosted card. Used via the `DoubleBezel` React component.
- `.reveal` / `.is-in` — IO-based scroll reveal. `useReveal()` in `App.tsx` sets up an `IntersectionObserver` that adds `is-in` to elements with `.reveal` as they enter the viewport. Skipped entirely when `prefers-reduced-motion` is set.
- `.eyebrow` — small all-caps monospace label pill with `status-dot`.
- `.tag-pill` — monospace technology tag with green tint.
- `.btn-pill` / `.btn-pill-light` — pill CTA buttons (dark and light variants). Rendered via `PillCta` component.
- `.liquid-glass` — backdrop-filter glass used on the nav shell and Button `glass` variant.

## Path Alias

`@/` → `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).
