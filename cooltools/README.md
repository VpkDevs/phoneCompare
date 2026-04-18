This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

The repository is organized following Next.js App Router conventions. Below is
an overview of the top-level directories and their purpose:

| Directory / File | Purpose |
|---|---|
| `app/` | Next.js App Router pages, layouts, and global styles |
| `lib/` | Shared utility functions and helpers |
| `server/` | Server-side logic, database schemas, and API handlers |
| `shared/` | Types and constants shared between client and server |
| `public/` | Static assets served at the root URL |
| `cooltools/` | Project documentation and tooling notes |

### Directory tree

```plaintext
phoneCompare/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── (routes)/
│       └── compare/
├── lib/
│   └── utils.ts
├── server/
│   ├── db/
│   │   └── schema.ts
│   └── actions/
├── shared/
│   └── types/
│       └── phone.ts
├── public/
│   └── assets/
├── cooltools/
│   ├── README.md
│   └── TODO.md
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Contributing

1. Fork the repository and create a feature branch.
2. Run `npm install` to install dependencies.
3. Make your changes and run `npm run lint` before opening a pull request.
4. Ensure all existing tests pass with `npm test`.
