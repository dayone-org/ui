# DAYONE UI Foundation

Interne UI-Grundlage für DAYONE Tools — shadcn/ui-Komponenten mit DAYONE Design Tokens, Typografie (Roobert) und visueller Playground-Referenz.

## Lokal starten

```bash
npm install
npm run dev
```

- **Landing:** [http://localhost:3000](http://localhost:3000)
- **Playground:** [http://localhost:3000/playground](http://localhost:3000/playground)

## Deploy (Vercel)

```bash
npx vercel --prod
```

Oder: Repo auf GitHub pushen und auf [vercel.com/new](https://vercel.com/new) importieren.

## Struktur

- `app/globals.css` — Design Tokens (Primitive, Semantic, Functional)
- `app/playground/` — Komponenten-Referenz mit Sidebar-Navigation
- `components/ui/` — shadcn-Primitives
- `lib/playground-sections.ts` — Navigations-Sektionen
