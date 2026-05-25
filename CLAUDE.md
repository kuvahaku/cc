# CLAUDE.md

Guidance for AI assistants (Claude Code and others) working in this repo.

## Current state

This repository is in its earliest stage. As of this writing it contains only `README.md` and this file. There is no source code, no build tooling, and no package manifest yet. Sections below describe the intended shape of the project; flag anything here that drifts from reality once code lands.

## Stack

Plain **HTML, CSS, and JavaScript** — no framework, no transpiler, no bundler unless explicitly added later. Author code that runs directly in modern evergreen browsers (latest Chrome, Firefox, Safari, Edge). ES2022+ syntax is fine; no need to target IE or legacy mobile.

Do **not** introduce React, Vue, Svelte, TypeScript, Tailwind, Webpack, Vite, or other tooling without first asking. The point of this stack choice is to keep things minimal and dependency-free.

## Expected layout

Until decided otherwise, prefer this layout:

```
/
├── index.html          # entry point
├── css/
│   └── styles.css      # global styles
├── js/
│   └── main.js         # entry script (type="module")
├── assets/             # images, fonts, icons
└── README.md
```

Keep modules small. Use native ES modules (`<script type="module">`, `import`/`export`) instead of globals or IIFEs. No CommonJS.

## Commands

There is no build or test tooling yet. If the user asks to run the site, serve it with a static server — do **not** open `file://` URLs because ES modules and `fetch` won't work there.

```bash
# Quick local server (any one of these is fine — pick what's available)
python3 -m http.server 8000
# or
npx --yes serve .
```

If a `package.json`, `Makefile`, or task runner is added later, update this section to point at the real commands rather than these fallbacks.

## Conventions

- **HTML**: semantic elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`). Always set `lang` on `<html>`, a `<meta charset="utf-8">`, and a `<meta name="viewport">`. Use `<button>` for actions and `<a>` for navigation — never the reverse.
- **CSS**: prefer custom properties (`--color-fg`, `--space-2`) over hardcoded values. Use modern layout (flexbox, grid). Mobile-first media queries. Avoid `!important`. Class names in kebab-case (e.g. `.site-header`, `.card--featured`); BEM is fine but not required.
- **JavaScript**: `const` by default, `let` when reassigned, never `var`. Strict equality (`===`). Prefer pure functions and small modules over classes. No jQuery, no Lodash — modern JS covers the use cases.
- **Accessibility**: every interactive element must be keyboard-reachable and have a visible focus state. Images need `alt`. Form inputs need associated `<label>`s. Don't remove focus outlines without replacing them.
- **Performance**: defer non-critical scripts (`<script defer>` or `type="module"`). Inline only tiny critical CSS. Lazy-load images with `loading="lazy"`. Avoid large dependencies fetched from CDNs unless justified.
- **Security**: escape any user-supplied strings rendered into the DOM — use `textContent`, not `innerHTML`. Don't `eval`. Set a Content-Security-Policy meta tag if/when the site grows.

## What not to do

- Don't add a `node_modules` directory or `package.json` casually — ask first.
- Don't introduce TypeScript-style annotations in `.js` files; if types are wanted, use JSDoc comments.
- Don't commit minified or generated files alongside sources without a clear build step.
- Don't add tracking scripts, analytics, or third-party widgets without asking — assume privacy-conscious defaults (GDPR territory).

## Git workflow

- Default branch: `main`.
- Feature branches: `claude/<short-slug>` for AI-assisted work, otherwise descriptive kebab-case.
- Commit messages: imperative, present tense ("Add nav component", not "Added" or "Adds"). One logical change per commit.
- Don't push to `main` directly; open a PR.

## When the stack changes

If the project grows beyond plain HTML/CSS/JS (a bundler, framework, or test runner gets added), update this file in the same change so it doesn't drift. A stale CLAUDE.md is worse than none.
