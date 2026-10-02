# InvoiceFlow

A feature-rich, client-side invoice generator built with Next.js 15, TypeScript, and shadcn/ui. Create professional invoices in the browser with a live preview, multiple templates, automatic calculations, PDF generation, printing, and local-storage persistence — no backend, no sign-up, everything happens on your device.

## Features

- **Invoice builder** — fill in sender/receiver details, invoice number, PO number, dates, and terms.
- **Itemized line items** — add, edit, and remove items with description, quantity, and rate.
- **Real-time calculations** — subtotal, percentage/fixed discounts, and percentage/fixed taxes computed live as you type.
- **6 invoice templates** — classic, modern, creative, formal, minimal, business — switch styles instantly.
- **Live preview** — two-column layout on desktop (form + preview), single-column on mobile.
- **PDF generation & download** — jsPDF + html2canvas produce a clean PDF that mirrors the preview, with a descriptive filename. Includes a fit-to-page check so content never overflows.
- **Print directly** — browser print with optimized invoice formatting.
- **Local storage save/load** — progress auto-saves in the browser; resume where you left off.
- **Reset with confirmation** — clear the invoice safely without accidental data loss.
- **Logo support** — upload your business logo onto the invoice.
- **Multi-currency** — set any currency code for the invoice totals.

## Tech Stack

- **Framework:** Next.js 15 (App Router, statically exported)
- **Language:** TypeScript
- **UI:** shadcn/ui (Radix primitives), Tailwind CSS, Lucide icons
- **PDF:** jsPDF, html2canvas
- **State:** React hooks (`useInvoice`) with localStorage persistence
- **AI (dev-only):** Genkit + Gemini 2.5 Flash flow for PDF fit-checking (not used in the production UI)

## Quick Start

```bash
npm install
npm run dev        # development server (default: http://localhost:9002 --turbopack)
```

Open `http://localhost:9002` in your browser.

## Scripts

| Script          | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start the dev server (turbopack, port 9002) |
| `npm run build` | Production build (static export to `out/`) |
| `npm run start` | Serve the production build        |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |

## Project Structure

```
├── src/
│   ├── app/            # Next.js App Router: layout.tsx, page.tsx, globals.css
│   ├── components/
│   │   ├── ui/         # shadcn/ui primitives
│   │   └── ...         # invoice form, preview, templates
│   ├── hooks/
│   │   └── use-invoice.ts   # single source of truth for invoice state
│   ├── lib/            # utilities
│   ├── types/
│   │   └── invoice.ts  # Invoice / InvoiceItem interfaces
│   └── ai/
│       └── flows/generate-pdf-and-fit-content.ts  # dev-only Genkit flow
├── docs/               # design & feature documentation
├── next.config.ts      # static export (output: "export") for GitHub Pages
├── tailwind.config.ts  # theme: green/teal palette, Inter font
└── components.json     # shadcn/ui config
```

## Environment Variables

None required for the production app — it is fully client-side. The dev-only Genkit flow (`genkit:dev`) needs `GOOGLE_GENAI_API_KEY` if you run AI flows locally.

## Deploy

The app is a static export (Next.js `output: "export"` + `images.unoptimized`), so it deploys to any static host:

- **GitHub Pages** — `npm run build`, push the contents of `out/` to the `main` branch root, enable Pages on that branch.
- **Cloudflare Pages / Netlify** — connect the repo and set the publish directory to `out/`.

## Design Notes

- Primary color `#6AB38D` (professional green), background `#F4F8F6`, accent teal `#439A86`.
- Body and headline font: Inter.

---

Built by Girish Lade — https://ladestack.in
