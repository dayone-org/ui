# DAYONE UI

Interne Komponentenbibliothek für DAYONE Tools — shadcn/ui-Komponenten mit DAYONE Design Tokens, Typografie (Roobert) und visueller Playground-Referenz.

## Installation via shadcn

Dieses Repository stellt einen shadcn Registry-Eintrag bereit:

```bash
npx shadcn@latest add dayone-org/ui/all
```

Spezifische Primitives koennen einzeln installiert werden:

```bash
npx shadcn@latest add dayone-org/ui/button
npx shadcn@latest add dayone-org/ui/input
```

Der Eintrag `all` installiert:

- alle Komponenten aus `components/ui/`
- `lib/utils.ts`
- `hooks/use-mobile.ts`
- `app/globals.css` mit den DAYONE Primitive- und Semantic-Tokens
- die privaten Roobert-Fontdateien nach `public/fonts/`

Hinweis: Der GitHub-Registry-Shorthand funktioniert laut shadcn nur mit öffentlichen `github.com` Repositories. Für ein privates Repository sollte derselbe `all`-Eintrag über eine authentifizierte shadcn Registry-Namespace-Konfiguration bereitgestellt werden.

## Lokal starten

```bash
npm install
npm run dev
```

- **Landing:** [http://localhost:3000](http://localhost:3000)
- **Playground:** [http://localhost:3000/playground](http://localhost:3000/playground)
- **Setup:** [http://localhost:3000/setup](http://localhost:3000/setup)

## Live

- **Production:** https://dayone-ui.vercel.app
- **Playground:** https://dayone-ui.vercel.app/playground
- **Setup:** https://dayone-ui.vercel.app/setup

## Deploy (Vercel)

```bash
npx vercel --prod
```

## Struktur

- `app/globals.css` — Design Tokens (Primitive, Semantic, Functional)
- `app/playground/` — Komponenten-Referenz mit Sidebar-Navigation
- `components/ui/` — shadcn-Primitives
- `lib/playground-sections.ts` — Navigations-Sektionen
