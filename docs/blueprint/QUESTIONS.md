## Pytania przed implementacją (z rekomendacjami)

Poniżej zestaw pytań do ustalenia. Dla każdego punktu podajemy: dlaczego to ważne, rekomendację oraz sugerowaną odpowiedź (domyślną), którą wdrożymy, jeśli nie wskażesz inaczej.

### Ogólne i zakres
1. Nazwa produktu i domena?  
   - Dlaczego: wpływa na nazewnictwo, metadata, SEO.  
   - Rekomendacja: roboczo używać „Material Components App”.  
   - Sugerowana odpowiedź: "Material Components App".

2. Grupa docelowa i urządzenia?  
   - Dlaczego: breakpoints, dostępność, wydajność.  
   - Rekomendacja: desktop + mobile (responsive, MUI breakpoints).  
   - Sugerowana odpowiedź: desktop i mobile, RWD.

3. Wersje językowe na start?  
   - Dlaczego: konfiguracja i18n, fallback.  
   - Rekomendacja: EN (default) + PL.  
   - Sugerowana odpowiedź: EN + PL.

4. Branding na start (logo, kolory)?  
   - Dlaczego: theme MUI, paleta barw, typografia.  
   - Rekomendacja: prosta paleta z primary/secondary, bez logo.  
   - Sugerowana odpowiedź: użyj neutralnego motywu; logo później.

### Toolchain i konfiguracja
5. Wersja Node i zarządzanie?  
   - Dlaczego: spójne środowiska.  
   - Rekomendacja: Node 20 LTS, `.nvmrc`.  
   - Sugerowana odpowiedź: Node 20 LTS.

6. Yarn v4 czy v3?  
   - Dlaczego: workspace features, plug'n'play vs node-modules.  
   - Rekomendacja: Yarn v4 z `nodeLinker: node-modules`.  
   - Sugerowana odpowiedź: Yarn v4 + node-modules.

7. Vite jako bundler/dev server?  
   - Dlaczego: szybkość, DX.  
   - Rekomendacja: Vite 5.  
   - Sugerowana odpowiedź: Tak, Vite 5.

8. Alias importów `@/` → `src/`?  
   - Dlaczego: czytelniejsze importy.  
   - Rekomendacja: Tak.  
   - Sugerowana odpowiedź: Tak.

### UI/UX i theming
9. Biblioteka UI: MUI v5?  
   - Dlaczego: spójność i szybkość.  
   - Rekomendacja: MUI v5 + Emotion.  
   - Sugerowana odpowiedź: Tak.

10. Motyw: tryb jasny/ciemny?  
    - Dlaczego: UX, dostępność.  
    - Rekomendacja: jasny + przełącznik w przyszłości.  
    - Sugerowana odpowiedź: Na start jasny.

11. Typografia i skala?  
    - Dlaczego: spójność.  
    - Rekomendacja: domyślna MUI z drobnymi korektami.  
    - Sugerowana odpowiedź: Domyślna MUI.

12. Ikony?  
    - Dlaczego: spójny język wizualny.  
    - Rekomendacja: `@mui/icons-material`.  
    - Sugerowana odpowiedź: Tak.

13. Accessibility (a11y) poziom?  
    - Dlaczego: WCAG, keyboard nav.  
    - Rekomendacja: WCAG AA jako standard.  
    - Sugerowana odpowiedź: AA.

### Routing i nawigacja
14. Router: React Router 6+?  
    - Dlaczego: standard w React.  
    - Rekomendacja: Tak.  
    - Sugerowana odpowiedź: Tak.

15. Struktura tras?  
    - Dlaczego: nawigacja i SEO.  
    - Rekomendacja: `/` → Home; dalsze później.  
    - Sugerowana odpowiedź: Na start tylko `/`.

### Stan aplikacji
16. Globalny stan (client state)?  
    - Dlaczego: komunikacja między komponentami.  
    - Rekomendacja: Zustand (lekki).  
    - Sugerowana odpowiedź: Zustand.

17. Server state (API, cache)?  
    - Dlaczego: fetching, cache, synchronizacja.  
    - Rekomendacja: React Query.  
    - Sugerowana odpowiedź: React Query.

18. Formy i walidacja?  
    - Dlaczego: ergonomia.  
    - Rekomendacja: React Hook Form + Zod (opcjonalnie).  
    - Sugerowana odpowiedź: RHF; Zod później.

### i18n
19. Framework i18n?  
    - Dlaczego: pluralizacja, namespaces.  
    - Rekomendacja: i18next + react-i18next.  
    - Sugerowana odpowiedź: Tak.

20. Język domyślny i fallback?  
    - Dlaczego: UX.  
    - Rekomendacja: EN jako default, fallback EN.  
    - Sugerowana odpowiedź: EN.

21. Lokalizacja dat/liczb?  
    - Dlaczego: poprawność formatów.  
    - Rekomendacja: Intl API przeglądarki + adapter w razie potrzeby.  
    - Sugerowana odpowiedź: Intl API.

### Jakość, testy i CI
22. Linter i formatowanie?  
    - Dlaczego: spójny kod.  
    - Rekomendacja: ESLint + Prettier.  
    - Sugerowana odpowiedź: Tak.

23. Testy na start?  
    - Dlaczego: regresje.  
    - Rekomendacja: Vitest + RTL + przykładowy test Home.  
    - Sugerowana odpowiedź: Tak.

24. Minimalne pokrycie?  
    - Dlaczego: jakość.  
    - Rekomendacja: brak twardego progu na MVP; później 70%+.  
    - Sugerowana odpowiedź: Na start bez progu.

25. CI (GitHub Actions)?  
    - Dlaczego: automatyzacja.  
    - Rekomendacja: lint + test na PR (opcjonalnie w MVP).  
    - Sugerowana odpowiedź: Po MVP.

### Bezpieczeństwo i dane
26. Zarządzanie secrets/env?  
    - Dlaczego: bezpieczeństwo.  
    - Rekomendacja: `.env.local` gitignored; `import.meta.env` w Vite; brak secrets w repo.  
    - Sugerowana odpowiedź: Tak.

27. Polityka CORS/Content Security Policy?  
    - Dlaczego: bezpieczeństwo.  
    - Rekomendacja: CSP rozważyć przy wdrożeniu produkcyjnym.  
    - Sugerowana odpowiedź: Po MVP.

### Wydajność i DX
28. Analiza bundle (np. rollup-plugin-visualizer)?  
    - Dlaczego: kontrola rozmiaru.  
    - Rekomendacja: opcjonalnie po MVP.  
    - Sugerowana odpowiedź: Po MVP.

29. Aliasy i absolute imports?  
    - Dlaczego: DX.  
    - Rekomendacja: `@/*`.  
    - Sugerowana odpowiedź: Tak.

30. Pre-commit hooks?  
    - Dlaczego: jakość na wejściu.  
    - Rekomendacja: Husky + lint-staged.  
    - Sugerowana odpowiedź: Tak.

### Dostarczanie i hosting (po MVP)
31. Hosting docelowy?  
    - Dlaczego: konfiguracja buildów.  
    - Rekomendacja: Netlify/Vercel/Cloudflare Pages.  
    - Sugerowana odpowiedź: Vercel.

32. Ścieżka bazowa aplikacji (base)?  
    - Dlaczego: deploy do subpath.  
    - Rekomendacja: `/`.  
    - Sugerowana odpowiedź: `/`.

### Konwencje i repo
33. Konwencja commitów?  
    - Dlaczego: czytelna historia.  
    - Rekomendacja: Conventional Commits.  
    - Sugerowana odpowiedź: Tak.

34. Licencja?  
    - Dlaczego: aspekty prawne.  
    - Rekomendacja: MIT (jeśli projekt publiczny).  
    - Sugerowana odpowiedź: MIT.

35. Język dokumentacji?  
    - Dlaczego: spójność.  
    - Rekomendacja: PL + fragmenty EN w kodzie.  
    - Sugerowana odpowiedź: PL.


