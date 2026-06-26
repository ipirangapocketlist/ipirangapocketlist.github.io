# Ipiranga Pocket List

Guia curado de lugares do bairro do Ipiranga e entorno — comida, cultura, lazer, esporte, compras e saúde.

Site: [https://ipirangapocketlist.github.io](https://ipirangapocketlist.github.io)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Stack

- [Astro](https://astro.build) — site estático
- [Tailwind CSS](https://tailwindcss.com) — estilos
- [React](https://react.dev) — carrosséis, filtros e header interativo
- [Embla Carousel](https://www.embla-carousel.com/) — carrosséis
- [Framer Motion](https://www.framer.com/motion/) — animações do header

## Conteúdo

Os lugares ficam em `src/content/lugares/*.json`. Cada arquivo segue o schema em `src/types/lugar.ts`.

## Deploy

Push na branch `main` dispara o workflow GitHub Actions (`.github/workflows/deploy.yml`).

Configure GitHub Pages: **Settings → Pages → Source: GitHub Actions**.
