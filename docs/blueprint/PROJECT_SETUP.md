## Project setup (po akceptacji planu)

Poniższe kroki wykonujemy po zatwierdzeniu planu.

### 1) Środowisko
- Zainstaluj Node 20 LTS (np. `nvm install 20 && nvm use 20`).
- W repo utwórz `.nvmrc` z wersją `20`.
- Użyj Yarn v4 (Corepack): `corepack enable` i `corepack prepare yarn@stable --activate`.
- Włącz klasyczny layout modułów: `yarn config set nodeLinker node-modules`.

### 2) Inicjalizacja aplikacji
```
npx create-react-app material-components --template typescript
cd material-components
```

### 3) Zależności
```
yarn add react react-dom react-router-dom
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled
yarn add zustand @tanstack/react-query
yarn add i18next react-i18next
yarn add react-hook-form

yarn add -D @types/react @types/react-dom typescript
yarn add -D @craco/craco craco-alias
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import eslint-import-resolver-typescript
yarn add -D prettier eslint-config-prettier
yarn add -D @testing-library/react @testing-library/user-event @testing-library/jest-dom
yarn add -D husky lint-staged cross-env
```

### 4) Konfiguracje
- `tsconfig.json` + `tsconfig.paths.json`: ścieżki `@/*` → `src/*`.
- `craco.config.js`: alias przez `craco-alias` + konfiguracja Jest `moduleNameMapper`.
- ESLint + Prettier: podstawowy config dla TS/React.
- Husky + lint-staged: hook pre-commit (lint, format, test --passWithNoTests).

### 5) Warstwa aplikacji
- Utwórz `AppProviders` (ThemeProvider z trybami light/dark, I18nextProvider, QueryClientProvider).
- Utwórz `AppRouter` (React Router v6, trasa `/`).
- Dodaj `pages/Home` i prosty UI z tłumaczeniami.

### 6) Skrypty
- `dev`, `build`, `preview`, `test`, `lint`, `format` w `package.json`.

Uwaga: MVP działa wyłącznie lokalnie (brak CI/deploy, brak secrets w repo).


