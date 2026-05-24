# dtrader-template - Deployment Ready

## Quick Start

### Local Development & Preview

```bash
npm run dev
# or
npm start
```

Starts webpack dev server on **https://localhost:8443** with hot module reloading.

### Production Build

```bash
npm run build
```

Builds all packages and outputs to `packages/core/dist/`

### Full Bootstrap (Clean Install)

```bash
npm run bootstrap
```

Installs all dependencies with strict peer dependency checking.

---

## Configuration Files

### `package.json`

- **`dev`**: Starts webpack dev server for local preview
- **`start`**: Alias for `dev` script
- **`build`**: Builds all packages for production
- **`bootstrap`**: Installs dependencies (strict peer deps)

Key scripts used:

- `build:all` - Compiles all workspace packages
- `generate:colors` - Generates color tokens from brand config
- `verify:whitelabel` - Verifies white-label configuration

### `vercel.json`

Deployment configuration for Vercel:

- **buildCommand**: `npm run build:all`
- **outputDirectory**: `packages/core/dist`
- **devCommand**: `npm run dev`
- **Features**:
    - Clean URLs (no trailing slashes)
    - SPA routing (all routes redirect to index.html)
    - No-cache headers to prevent stale content
    - 4GB Node memory allocation for large builds

---

## Deployment Flow

### How Vercel Deploys:

1. Pulls code from repository
2. Runs `npm run build:all` (from vercel.json)
3. Serves files from `packages/core/dist/` directory
4. SPA routing configured to serve index.html for all routes
5. Static assets cached appropriately

### Preview Deployment:

- Push to a branch → Vercel creates automatic preview deployment
- The preview URL will be ready once build completes
- Local dev server test: `npm run dev` → https://localhost:8443

---

## Architecture

**Monorepo Structure:**

```
dtrader-template/
├── packages/
│   ├── core/              # Main trading platform app
│   │   ├── dist/          # Webpack output (deployed)
│   │   └── build/         # Webpack configuration
│   ├── components/        # Reusable UI components
│   ├── trader/            # Trading module
│   ├── reports/           # Reporting module
│   ├── stores/            # MobX state management
│   ├── api/               # API client
│   ├── shared/            # Shared utilities
│   └── utils/             # Helper functions
├── package.json           # Root workspace config
├── vercel.json            # Vercel deployment config
└── brand.config.json      # White-label branding
```

**Build Output:**

- Input: React + TypeScript source files across all packages
- Tool: Webpack 5 with HMR support
- Output: `packages/core/dist/` (optimized JS, CSS, static assets)
- Deployed to: https://dtrader-template-\*.vercel.app/

---

## Environment

- **Node Version**: 20.x (configured in package.json)
- **React**: 18.2.0
- **TypeScript**: 5.0.0
- **Build Tool**: Webpack 5
- **State Management**: MobX
- **Styling**: SCSS with white-label theming

---

## Ready to Deploy

This project is fully configured for:
✅ Local development with hot reload
✅ Production builds
✅ Vercel preview deployments
✅ Automatic builds on git push
✅ SPA routing for client-side navigation
✅ White-label branding system

**Next Steps:**

1. Push code to repository branch
2. Vercel automatically creates preview deployment
3. Visit preview URL to test
4. Create PR to merge changes
5. Deploy to production by merging to main
