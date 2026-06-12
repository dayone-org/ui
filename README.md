# DAYONE UI Foundation

Interne UI-Grundlage für DAYONE Tools — shadcn/ui-Komponenten mit DAYONE Design Tokens, Typografie (Roobert) und visueller Playground-Referenz.

## Lokal starten

```bash
npm install
npm run dev
```

- **Landing:** [http://localhost:3000](http://localhost:3000)
- **Playground:** [http://localhost:3000/playground](http://localhost:3000/playground)
- **How to use:** [http://localhost:3000/how-to-use](http://localhost:3000/how-to-use)

## Live

- **Production:** https://dayone-ui.vercel.app
- **Playground:** https://dayone-ui.vercel.app/playground
- **How to use:** https://dayone-ui.vercel.app/how-to-use

## Deploy (Vercel)

```bash
npx vercel --prod
```

## Struktur

- `app/globals.css` — Design Tokens (Primitive, Semantic, Functional)
- `app/playground/` — Komponenten-Referenz mit Sidebar-Navigation
- `components/ui/` — shadcn-Primitives
- `lib/playground-sections.ts` — Navigations-Sektionen
