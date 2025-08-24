## Konwencje i standardy

### Struktura katalogów
```
src/
  app/
    providers/
    routes/
    theme/
  pages/
    Home/
  components/
  features/
  shared/
    hooks/
    utils/
    state/
  assets/
public/
tests/
```

### Importy i aliasy
- Alias `@/` wskazuje na `src/` (konfiguracja w `tsconfig.json` i `vite.config.ts`).
- Preferuj importy absolutne z `@/` zamiast ścieżek względnych.

### React i TypeScript
- Komponenty funkcyjne, typowane (FC tylko gdy przydatne), propsy z interfejsami TS.
- Eksporty nazwane; unikaj eksportów domyślnych dla komponentów/utility.
- Hooks w `shared/hooks` lub wewnątrz `features`.
- Unikaj zagnieżdżeń > 2-3 poziomy; stosuj wczesne zwroty.

### Stylowanie i MUI
- MUI v5 + Emotion. Dla prostych przypadków używaj `sx`; dla reużywalnych – `styled` i theme.
- Globalnie włącz `CssBaseline`.
- Motyw z obsługą jasny/ciemny: osobne palety i wspólne tokeny typografii/spacing.

### Stan aplikacji
- Client state: Zustand – trzymać w `shared/state` lub w `features/<feature>/state` jeśli domenowe.
- Server state: React Query – jeden `QueryClient` w providerach aplikacji.

### Routing
- `react-router-dom` v6; konfiguracja w `app/routes`.
- Strony w `pages/`, komponenty reużywalne w `components/`.

### i18n
- `i18next` + `react-i18next`; klucze w notacji kropkowej, np. `home.title`.
- Zasoby trzymane w `src/assets/locales/<lang>/<namespace>.json` (na start jeden namespace: `common`).

### Testy
- Vitest + RTL. Test pliku obok implementacji: `Home.test.tsx`.
- Nazewnictwo: `*.test.tsx/ts`.

### Jakość i formatowanie
- ESLint + Prettier. Lint: TS, React, hooks, importy.
- Pre-commit: Husky + lint-staged (lint, format, test --passWithNoTests).

### Commit i PR
- Conventional Commits (feat, fix, chore, docs, refactor, test, ci, build, perf, style).
- Małe, logiczne PR-y; opisy rzeczowe, checklisty.

### Dokumentacja
- Markdown w `docs/`. Główny Plan w `docs/workflow_state.md`.


