## Proponowany stos technologiczny

### Core
- Yarn v4 (z `nodeLinker: node-modules`) – szeroka kompatybilność narzędziowa.
- React 18 + TypeScript 4.9.
- CRA (react-scripts 5) z CRACO do aliasów.

### UI i stylowanie
- Material UI v5 (`@mui/material`) + Emotion (`@emotion/react`, `@emotion/styled`).
- `@mui/icons-material` dla ikon.
- Dedykowany motyw: paleta, typografia, spacing, breakpoints.

### Routing
- `react-router-dom` v6+.

### Stan
- Client state: `zustand` (lekki, elastyczny, mało boilerplate).
- Server state: `@tanstack/react-query` (cache, refetch, synchronizacja).

### Formularze i walidacja
- `react-hook-form` (+ `zod` i `@hookform/resolvers` w kolejnych iteracjach).

### i18n
- `i18next` + `react-i18next`; zasoby EN/PL, detection z przeglądarki (opcjonalnie).

### Testy
- Jest (react-scripts) + `@testing-library/react` + `@testing-library/jest-dom`.

### Jakość i DX
- ESLint (TS, React, hooks, import), Prettier, Husky + lint-staged.
- Aliasy: `@/*` → `src/*` w `tsconfig.json`, CRACO (`craco.config.js`) i w Jest (`moduleNameMapper`).
- Zmienne środowiskowe przez pliki `.env` (prefiks `REACT_APP_`).

### Alternatywy (jeśli preferowane)
- Redux Toolkit zamiast Zustand przy złożonej domenie i ścisłej kontroli przepływu.
- Styled Components zamiast Emotion (mniej spójne z MUI, więc odradzane).

### Wersje rekomendowane (MVP)
- Node: 20.x LTS
- Yarn: 4.x (nodeLinker: node-modules)
- react-scripts: 5.0.1
- React/React DOM: 18.2.x
- TypeScript: ^4.9
- @mui/material + @mui/icons-material: ^5.15; Emotion: ^11.11
- react-router-dom: ^6.22
- zustand: ^4.5; @tanstack/react-query: ^5.0
- i18next: ^23.0; react-i18next: ^13.0
- react-hook-form: ^7.50
- Jest (react-scripts) + RTL: ^14.0; jest-dom: ^5.17
- eslint: ^8.57; prettier: ^3.2


