## Workflow State

### State
- Status: IN_PROGRESS
- Phase: CONSTRUCT
- Version: 0.2
- Date: 2025-08-24

### Plan

#### Cele (MVP)
- Uruchomienie aplikacji front-end z minimalnym ekranem startowym.
- Stabilny szkielet: Yarn, React 18, TypeScript 5+, Vite 5, React Router 6+, Material UI 5, i18n, globalny stan, testy, lint/format.
- Skrypty deweloperskie: start, build, test, lint, format.

#### Zakres dostarczenia w tej iteracji
- Tylko strona startowa (Home) + layout, routing, theme, i18n (min. EN/PL), podstawa globalnego stanu.

#### Stos technologiczny (zatwierdzony)
- Package manager: Yarn (preferowane v4, nodeLinker: node-modules dla kompatybilności narzędziowej).
- Build/dev server: CRA (react-scripts 5).
- UI: Material UI v5 + Emotion; `@mui/icons-material`.
- Routing: React Router v6+.
- Globalny stan (client state): Zustand (lekki, prosty) – alternatywnie Redux Toolkit, jeśli przewidywana złożoność domeny jest duża.
- Server state: @tanstack/react-query.
- i18n: i18next + react-i18next.
- Formularze: React Hook Form.
- Testy: Jest (react-scripts) + React Testing Library.
- Jakość: ESLint (TypeScript, React), Prettier, Husky + lint-staged.
- Środowiska: pliki `.env` z prefixem `REACT_APP_` i `process.env`.

#### Kompatybilność i wersje (zatwierdzone)
- Node 20.x LTS; Yarn 4.x z `nodeLinker: node-modules`.
- react-scripts 5.0.1; React/React DOM 18.2.x; TypeScript ^4.9.
- @mui/material ^5.15; Emotion ^11.11; `@mui/icons-material` ^5.15.
- react-router-dom ^6.22; zustand ^4.5; @tanstack/react-query ^5.0.
- i18next ^23.0; react-i18next ^13.0; react-hook-form ^7.50.
- Jest (react-scripts) + @testing-library/react ^14.0; @testing-library/jest-dom ^5.17.
- eslint ^8.57; prettier ^3.2; eslint-config-prettier ^9.1.

#### Struktura katalogów (docelowa)
```
src/
  app/
    providers/        # ThemeProvider, I18nProvider, QueryClientProvider, Router
    routes/           # konfiguracja tras (React Router)
    theme/            # definicja motywu MUI
  pages/
    Home/
      Home.tsx
      Home.test.tsx
  components/
  features/
  shared/
    hooks/
    utils/
  assets/
public/
tests/
```

Alias importów: `@/` → `src/` (konfiguracja `tsconfig.json` + `craco.config.js` oraz Jest `moduleNameMapper`).

#### Kroki implementacji (po akceptacji)
1) Inicjalizacja projektu
- Wymuś Node 20 LTS (`.nvmrc`).
- Yarn v4 (lub v3, jeśli preferowane). Konfiguracja `nodeLinker: node-modules`.
- `npx create-react-app <app> --template typescript` (lub równoważna inicjalizacja w istniejącym repo).

2) Instalacja zależności
- UI/Theme: `@mui/material @emotion/react @emotion/styled @mui/icons-material`
- Routing: `react-router-dom`
- Stan: `zustand @tanstack/react-query`
- i18n: `i18next react-i18next`
- Formularze: `react-hook-form`
- Jakość: `eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks prettier eslint-config-prettier eslint-plugin-import`
- Testy: `vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom`
- Narzędzia: `husky lint-staged cross-env`

3) Konfiguracja narzędzi
- ESLint + Prettier (spójne reguły, integracja z TS, React, importami).
- Husky + lint-staged (pre-commit: lint + format + test --passWithNoTests).
- `tsconfig` (paths `@/*`), alias przez CRACO + Jest `moduleNameMapper`.

4) Warstwa aplikacji (providers, theming, router)
- `ThemeProvider` z niestandardowym `createTheme` (kolory, typografia, spacing).
- `CssBaseline` i globalne style.
- `BrowserRouter` + prosta mapa tras (na start tylko `/`).
- `QueryClientProvider` dla React Query.
- `I18nextProvider` z prekonfigurowanymi zasobami EN/PL.

5) Strona startowa
- `pages/Home/Home.tsx` – prosty ekran z typografią, przyciskiem i tekstem z tłumaczeń.

6) Testy i jakość
- Konfiguracja Jest (react-scripts) + RTL; przykładowy test `Home.test.tsx`.
- Skrypty: `start`, `build`, `test`, `lint`, `format`.

7) Dokumentacja
- Uaktualnij `README.md` + index w `docs/`.

#### Pseudokod (szkic)
```
// src/index.tsx
createRoot(...).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
)

// src/app/providers/AppProviders.tsx
<ThemeProvider theme={theme}>
  <CssBaseline />
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </I18nextProvider>
</ThemeProvider>

// src/app/routes/AppRouter.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>

// src/pages/Home/Home.tsx
<Container>
  <Typography variant="h3">{t('home.title')}</Typography>
  <Button variant="contained">{t('home.cta')}</Button>
</Container>
```

#### Kryteria akceptacji
- `yarn start` uruchamia aplikację; strona `/` renderuje się z motywem MUI i tekstami EN/PL.
- Lint i testy przechodzą na zielono.

### Log
- 2025-08-24: Utworzono BLUEPRINT i pełny Plan. Oczekuje na akceptację.


