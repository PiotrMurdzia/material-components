## Decyzje (ADR) – Iteracja MVP

Status: zaakceptowane przez właściciela (na potrzeby BLUEPRINT). Wejście w życie po zatwierdzeniu planu.

1. Nazwa produktu: "Material Components App".
2. Urządzenia docelowe: desktop + mobile (RWD z breakpoints MUI).
3. Języki startowe: EN (domyślny) + PL.
4. Branding startowy: neutralny motyw; logo później.
5. Wersja Node: 20 LTS; repo zawiera `.nvmrc`.
6. Package manager: Yarn v4 z `nodeLinker: node-modules`.
7. Build/dev server: CRA (react-scripts 5).
8. Alias importów: `@/` → `src/`.
9. UI: Material UI v5 + Emotion; `@mui/icons-material`.
10. Motyw: przygotowany na jasny/ciemny (domyślnie jasny; bez UI przełącznika w MVP).
11. Typografia: domyślna MUI, drobne korekty później.
12. Ikony: `@mui/icons-material`.
13. Accessibility: cel WCAG AA.
14. Router: React Router v6+.
15. Trasy na start: tylko `/` (Home).
16. Globalny stan (client state): Zustand.
17. Server state: @tanstack/react-query.
18. Formularze: React Hook Form (Zod opcjonalnie później).
19. i18n: i18next + react-i18next.
20. Język domyślny/fallback: EN.
21. Lokalizacja dat/liczb: Intl API przeglądarki.
22. Linter/format: ESLint + Prettier.
23. Testy: Jest (react-scripts) + RTL.
24. Pokrycie: brak progu w MVP.
25. CI: po MVP (na PR: lint + test).
26. Secrets: brak obsługi secrets (MVP wyłącznie lokalnie, bez przechowywania w repo).
27. CSP/CORS: do rozważenia po MVP.
28. Analiza bundle: po MVP.
29. Aliasy/absolute imports: tak (`@/*`).
30. Pre-commit hooks: Husky + lint-staged.
31. Hosting: tylko lokalnie (brak deployu produkcyjnego w MVP).
32. Base path: `/`.
33. Konwencja commitów: Conventional Commits.
34. Licencja: MIT.
35. Język dokumentacji: PL (fragmenty EN w kodzie/bibliotekach).


