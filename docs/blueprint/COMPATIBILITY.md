## Macierz kompatybilności i wersje (MVP)

Poniższe wersje są sprawdzone pod kątem wzajemnej zgodności dla środowiska lokalnego (bez CI/deploy i bez secrets).

### Runtime i narzędzia
- Node: 20.x LTS
- Yarn: 4.x (z `nodeLinker: node-modules`)

### Build/dev i React
- react-scripts: 5.0.1
- React: 18.2.x
- React DOM: 18.2.x
- TypeScript: ^4.9

### UI
- @mui/material: ^5.15
- @mui/icons-material: ^5.15
- @emotion/react: ^11.11
- @emotion/styled: ^11.11

### Routing i stan
- react-router-dom: ^6.22
- zustand: ^4.5
- @tanstack/react-query: ^5.0

### i18n i formularze
- i18next: ^23.0
- react-i18next: ^13.0
- react-hook-form: ^7.50

### Testy i jakość
- Jest (react-scripts)
- @testing-library/react: ^14.0
- @testing-library/user-event: ^14.5
- @testing-library/jest-dom: ^5.17
- eslint: ^8.57
- prettier: ^3.2
- eslint-config-prettier: ^9.1
- @typescript-eslint/parser: ^6.x
- @typescript-eslint/eslint-plugin: ^6.x
- eslint-plugin-react: ^7.34
- eslint-plugin-react-hooks: ^4.6
- eslint-plugin-import: ^2.29

### Uwagi kompatybilności
- CRA (react-scripts 5) wspiera React 18 i TypeScript ^4.9.
- MUI v5 wymaga React 17/18 oraz Emotion v11 – zestaw powyżej jest spójny.
- React Router v6 jest kompatybilny z React 18.
- React Query v5 i Zustand v4 działają poprawnie z React 18 (Concurrent Rendering wspierany).
- Testy przez Jest (wbudowany jsdom) + RTL działają w środowisku CRA.
- ESLint 9 ma istotne zmiany (flat config) – dla stabilności w MVP stosujemy ESLint 8.57.


