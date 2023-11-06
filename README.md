# Next-shop

Clothing shop written in SSR framework Next.js.

## Screenshots

![App Screenshot](/screenshot.png?raw=true)

## Demo

https://next-shop-dev.vercel.app/

## Main features

- User authentication (credentials or Github provider)
- Checkout handling with Stripe
- Bilingual internationalization (PL/EN)
- Currency selection (USD or PLN) used during checkout and for product presentation
- User can write reviews for products and rate them
- Auth forms and review modal validation
- Typesafety is maintained by tRPC and Zod
- Data is stored in PostgreSQL and user actions are persisted in local storage
- Design loosely inspired by Zalando (https://zalando.pl) and Nayzak Design Store (https://nayzak.design/figma-e-commerce-builder-and-templates)

## TODOs

- Add product search functionality
- Expandable header menu (product category links)
- Working coupon codes during checkout process
- User profile page

## Tech Stack

- Typescript
- Next.js 13
- tRPC
- Prisma
- Stripe
- Tailwind CSS
- TanStack Query
- NextAuth
- next-intl
- Zustand
- React Hook Form
- Zod

## Installation

How to run project locally:

1. Clone repository:

```bash
  git clone git@github.com:E1-XP/Next-shop.git
```

2. Move inside project directory:

```bash
  cd Next-shop
```

3. Install dependencies:

```bash
  npm install
```

4. Run development server:

```bash
  npm run dev
```
