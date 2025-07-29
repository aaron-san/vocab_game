```bash
pnpm add -D prisma
pnpx prisma init
pnpx prisma generate

# Inspect database
pnpx prisma studio
```

## Prisma

1. Run `prisma dev` to start a local Prisma Postgres server.
2. Define models in the `schema.prisma` file.
3. Run `prisma migrate dev` to migrate your local Prisma Postgres database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and a managed serverless Postgres database. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started

```bash
npx prisma migrate dev --name init
npx prisma migrate dev --name add-last-login-field


```

## Project Tree (VS Code extension)

- Ctrl + Shft + P (Generate to Project Tree)

VocabGame
├─ backend
│ ├─ .vercel
│ │ ├─ cache
│ │ ├─ project.json
│ │ └─ README.txt
│ ├─ api
│ │ ├─ auth
│ │ │ └─ login.js
│ │ ├─ index.js
│ │ ├─ lib
│ │ │ └─ mongodb.js
│ │ ├─ routes
│ │ │ └─ hello.js
│ │ └─ user
│ │ └─ create.js
│ ├─ package-lock.json
│ ├─ package.json
│ ├─ README.md
│ └─ vercel.json
├─ frontend
│ ├─ eslint.config.js
│ ├─ index.html
│ ├─ package.json
│ ├─ pnpm-lock.yaml
│ ├─ postcss.config.js
│ ├─ public
│ │ └─ vite.svg
│ ├─ README.md
│ ├─ src
│ │ ├─ App.css
│ │ ├─ App.tsx
│ │ ├─ assets
│ │ │ └─ react.svg
│ │ ├─ components
│ │ │ └─ Word.tsx
│ │ ├─ index.css
│ │ ├─ lib
│ │ │ └─ fetch.js
│ │ ├─ main.tsx
│ │ ├─ pages
│ │ └─ vite-env.d.ts
│ ├─ tailwind.config.js
│ ├─ tsconfig.app.json
│ ├─ tsconfig.json
│ ├─ tsconfig.node.json
│ └─ vite.config.ts
└─ TODO.md

```

```
