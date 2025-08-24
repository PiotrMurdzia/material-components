## Workflow State

### State
- Status: NEEDS_PLAN_APPROVAL
- Phase: BLUEPRINT
- Version: 0.4
- Date: 2025-08-24

### Plan

#### Hotfix: Ajv error "no schema with key or ref 'https://json-schema.org/draft/2020-12/schema'"
- Przyczyna: Instancja Ajv została utworzona dla domyślnego draft-07; schemat używa 2020-12, więc brak zarejestrowanego meta-schematu.
- Cel: Użyć dialektu 2020-12 w Ajv i zarejestrować meta-schema tak, aby kompilacja przebiegała poprawnie w przeglądarce.

#### Kroki
1) Zmiana inicjalizacji Ajv w `src/features/navigation/hooks/useMenu.ts`:
   - Import klasy dialektu: `import Ajv2020 from 'ajv/dist/2020'` oraz `import type { ValidateFunction } from 'ajv'`.
   - Utworzenie instancji: `const ajv = new Ajv2020({ allErrors: true, strict: false });`.
   - (Opcjonalnie, dla pełnej jawności) Dodać meta-schema 2020-12: `import meta2020 from 'ajv/dist/refs/json-schema-2020-12.json'; ajv.addMetaSchema(meta2020);`.
   - Pozostawić `addFormats(ajv);` i kompilację schematu bez zmian.
2) Weryfikacja lokalna: uruchomić `yarn dev` i potwierdzić brak błędów w konsoli oraz prawidłowy render SideMenu.
3) Krótka notatka w Log: odnotować naprawę i motywację (dopasowanie dialektu Ajv do 2020-12).

#### Uwagi
- Nie zmieniamy pliku schematu (`$schema` pozostaje 2020-12) i nie upraszczamy go do draft-07, aby zachować zgodność z nowszymi konstrukcjami (`$defs`, `if/then/else`).
- Wersje w `package.json` są kompatybilne: `ajv@^8.12.0`, `ajv-formats@^2.1.1`.

#### Cel (feature)
- Dostarczyć modułowy, responsywny komponent Sitemenu (nawigacja pionowa) w MUI v6, z obsługą RBAC, i18n (labelKey → tłumaczenia, fallback do name), jednym poziomem zagnieżdżenia (dropdown), trybami: collapsed (desktop) i temporary drawer (mobile), kompatybilny z jasnym/ciemnym motywem, z poprawną dostępnością (ARIA + klawiatura), testami (RTL/Jest) i Storybook 8.

#### Zakres (tylko Sitemenu)
- Implementujemy wyłącznie Sitemenu. App Header będzie realizowany w osobnym kroku.
- Moduł samowystarczalny: eksport przez `src/features/navigation/index.ts` i możliwy do skopiowania jako jeden folder.

#### Zmiany w narzędziach/wersjach (plan)
- Upgrade do MUI v6 w całym repo (unikamy mieszania v5 i v6): `@mui/material@^6`, `@mui/icons-material@^6`, `@emotion/react@^11`, `@emotion/styled@^11` – kompatybilne z React 18.
- Dodatki: `@iconify/react`, `ajv`, `ajv-formats`, `storybook@^8` (konfiguracja później; w tej iteracji tylko plik story), pozostajemy przy CRA + Jest + RTL.

#### Struktura plików (docelowo w jednym folderze do łatwego kopiowania)
```
src/features/navigation/
  index.ts
  types.ts
  schema/
    menu.schema.json
  hooks/
    useMenu.ts
  components/
    SideMenu/
      SideMenu.tsx
      SideMenuHeader.tsx
      SideMenuSection.tsx
      SideMenuItem.tsx
      SideMenuDropdown.tsx
      SideMenuFooter.tsx
      styles.ts
  utils/
    buildMenuTree.ts
    filterByRoles.ts
    resolveIcon.tsx
    a11y.ts
  __tests__/
    SideMenu.a11y.test.tsx
    SideMenu.behavior.test.tsx
    useMenu.test.ts
  stories/
    SideMenu.stories.tsx
```

Uwaga: Aby spełnić wymaganie „całość w jednym folderze”, lokujemy Storybook story wewnątrz `src/features/navigation/stories/` zamiast katalogu na poziomie repo.

#### Kontrakt JSON (wejście)
- Wejście: `{ availableItems: MenuItemInput[] }`.
- `MenuItemInput`: `id` (string, wymagane, unikalne), `name` (string), `labelKey?` (string), `path?` (string, regex `^/`), `icon?` (string, np. `"eva:home-outline"`), `allowedRoles?` (string[]), `children?` (MenuItemInput[], tylko 1 poziom; dzieci nie mają własnych `children`).
- Walidacja AJV zgodnie ze schematem w `schema/menu.schema.json` (sprawdzamy: unikalność id na poziomie wejścia, `path` zaczyna się od `/`, brak `children.children`).

#### Typy (w `types.ts`)
- `type Role = string`.
- `interface MenuItemInput` (jak wyżej).
- `interface MenuItem` (po przetworzeniu: dodane pola wyliczone, np. `label`, `isExternal?`, `children?` jako spłaszczona lista tylko 1 poziomu).
- `interface SideMenuProps` zgodnie z API: `items`, `roles`, `locale?`, `activePath`, `collapsed`, `onToggleCollapsed`, `mobileOpen`, `onMobileOpenChange`, `companyLogo`, `companyName?`, `LinkComponent?` lub `linkAdapter?`, `iconResolver?`, `widths?`, `className?`, `sx?`.

#### Utils (w `utils/`)
- `filterByRoles(items, roles)`: zwraca tylko elementy dozwolone dla podanych ról (brak `allowedRoles` → widoczny dla wszystkich).
- `buildMenuTree(items)`: wymusza spójny model: element ma XOR `path` albo `children`; normalizuje `id`, kopiuje tylko 1 poziom dzieci; weryfikuje unikalność `id`.
- `resolveIcon(iconName)`: domyślnie `import { Icon } from '@iconify/react'` i render `Icon` z rozmiarem 20×20; `null` gdy brak.
- `a11y.ts`: pomocniki ARIA i klawiatury (roving tabindex, `getMenuItemAriaProps`, `getDropdownAriaProps`), mapowanie strzałek ↑/↓/→/←, Enter/Space, Esc.

#### Hook (w `hooks/useMenu.ts`)
- `useMenu(items, roles, locale, activePath)`:
  - Waliduje wejście AJV (z `ajv-formats`), rzuca błąd lub zwraca wynik walidacji.
  - Filtruje RBAC, mapuje `labelKey` → tekst (mock `t(key)` na bazie przekazanego `locale` + fallback do `name`).
  - Buduje menu (`MenuItem[]`), udostępnia `menu`, `getActive(id)`, `isSectionActive(id)`, stan otwarcia dropdownów (`openState` + `toggle(id)`), podstawowe handlery klawiatury dla dropdownów.

#### Komponenty (w `components/SideMenu/`)
- `SideMenu.tsx`: główny kontener; renderuje `Drawer` (mobile: `temporary`, desktop: `permanent`), obsługuje `collapsed`/`expanded` z animacjami (`theme.transitions.create(['width','margin','transform'], { duration: 150–200ms })`), nav `aria-label="Primary"`, role="menu".
- `SideMenuHeader.tsx`: obszar logo + `companyName` (ukryj nazwę na breakpoint `<sm`), reaguje na `collapsed` (pokazuj tylko logo).
- `SideMenuSection.tsx`: opcjonalne nagłówki sekcji (jeśli w danych); styl MUI `Typography`/`ListSubheader`.
- `SideMenuItem.tsx`: pojedynczy link (ikona opcjonalna); w `collapsed` pokazuj tylko ikonę + tooltip; `aria-current="page"` gdy aktywny.
- `SideMenuDropdown.tsx`: element z dziećmi (1 poziom) z `Collapse`; w `collapsed` rozwijany inline; klawiatura: `→` otwiera, `←` zamyka.
- `SideMenuFooter.tsx`: slot na avatar/CTA (placeholder minimalny).
- `styles.ts`: stałe stylów (np. `DRAWER_WIDTH_EXPANDED=280`, `DRAWER_WIDTH_COLLAPSED=72`), style aktywnego elementu (tło `alpha(theme.palette.primary.main, 0.12)`), layout headera, obszar scroll (overflow auto).

#### API i zachowania
- Mobile (xs/sm): Drawer `temporary`, sterowany przez `mobileOpen` i `onMobileOpenChange` (Esc zamyka).
- Desktop (md+): Drawer `permanent` z `collapsed`/`expanded`. W `collapsed` renderuj wyłącznie ikonę + tooltip (label); dropdown działa inline.
- Aktywny stan: exact match dla linku; `startsWith` dla sekcji (gdy dowolne dziecko jest aktywne).
- Link niezależny od routera: `LinkComponent` (komponent z propsem `to`) lub `linkAdapter` (funkcja `(path, children) => ReactNode`).

#### i18n (mock)
- Prosty resolver `t(key, locale)` z mapą lokalizacji (EN/PL) w obrębie modułu; fallback do `name` gdy brak tłumaczenia.

#### A11y i klawiatura
- Struktura: `nav[aria-label="Primary"]` → `List role="menu"` → elementy `role="menuitem"`.
- Ruch klawiaturą: ↑/↓ zmiana fokusowanego elementu; Enter/Space aktywuje; →/← otwieranie/zamykanie dropdown; Esc zamyka dropdown i w trybie mobile cały drawer.
- `aria-expanded`, `aria-controls` dla dropdown; `aria-current="page"` dla aktywnego.
- `prefers-reduced-motion`: wyłącz/ogranicz animacje.

#### Weryfikacja (manualna)
- Przeklikanie w aplikacji i w Storybook: mobile (temporary Drawer), desktop expanded, desktop collapsed, dark mode.
- RBAC: elementy niedozwolone nie są widoczne.
- i18n: `labelKey` tłumaczony, fallback do `name`.
- A11y: focus, role/aria, klawiatura (↑/↓/→/←/Enter/Space/Esc).

#### Storybook (8)
- `stories/SideMenu.stories.tsx`: scenariusze Mobile (xs, drawer otwarty), DesktopExpanded (md+), DesktopCollapsed (md+), DarkMode.
- Story korzysta z przykładowego JSON i mock `LinkComponent`.

#### Pseudokod (wybrane pliki)
```
// types.ts
export interface MenuItemInput { id: string; name: string; labelKey?: string; path?: string; icon?: string; allowedRoles?: string[]; children?: Omit<MenuItemInput, 'children'>[] }
export interface MenuItem { id: string; label: string; path?: string; icon?: string; children?: Omit<MenuItem, 'children'>[] }
export type Role = string;
export interface SideMenuProps { items: MenuItemInput[]; roles: Role[]; locale?: string; activePath: string; collapsed: boolean; onToggleCollapsed: () => void; mobileOpen: boolean; onMobileOpenChange: (open: boolean) => void; companyLogo: React.ReactNode; companyName?: string; LinkComponent?: React.ComponentType<{ to: string; children: React.ReactNode }>; linkAdapter?: (path: string, children: React.ReactNode) => React.ReactNode; iconResolver?: (iconName?: string) => React.ReactNode; widths?: { expanded: number; collapsed: number }; className?: string; sx?: import('@mui/material').SxProps }

// utils/filterByRoles.ts
export const filterByRoles = (items, roles) => /* zwróć widoczne */

// utils/buildMenuTree.ts
export const buildMenuTree = (items) => /* path XOR children; max 1 poziom; unikalne id */

// hooks/useMenu.ts
export function useMenu(items, roles, locale, activePath) {
  // validate via AJV → filterByRoles → map labels via i18n → buildMenuTree
  // provide: menu, isActive(path), isSectionActive(id), dropdown open state, handlers
}

// components/SideMenu/SideMenu.tsx
export function SideMenu(props: SideMenuProps) {
  // choose mobile vs desktop drawer; render header + list + footer; apply a11y + keyboard
}
```

#### Kryteria akceptacji
- Responsywność: mobile = `temporary Drawer`, desktop = `permanent Drawer`; płynne animacje przełączania; respekt `prefers-reduced-motion`.
- Collapsed mode: wyłącznie ikony + tooltip; interakcje klawiaturą zachowane.
- Dropdown (1 poziom): działa myszą i klawiaturą; brak renderu 2. poziomu.
- RBAC: niewłaściwe elementy nie są renderowane.
- i18n: `labelKey` → tłumaczenie, fallback do `name`.
- A11y: role/aria/keyboard zgodne z WCAG 2.2 AA (na poziomie nawigacji).
- Theming: poprawne light/dark; aktywne elementy wyraźne (`alpha(primary, 0.12)`).
- Storybook: wszystkie scenariusze działają.

#### Ograniczenia i konwencje dodatkowe (ważne)
- Rozdziel typy/interfejsy (`types.ts`) i style (`styles.ts`) od logiki komponentów/hooków.
- Limit 400 linii na plik: rozbijaj komponenty/utility na mniejsze moduły, gdy zbliżają się do limitu.
- Zero TODO-ów i placeholderów w kodzie — każdy plik kompletny i działający.

### Otwarte decyzje i rekomendacje (z sugerowanymi odpowiedziami)
1) Lokalizacja pliku Storybook
   - Problem: spec sugeruje `stories/` na root, ale wymaganie „jeden folder do skopiowania”.
   - Rekomendacja: umieścić `stories/` wewnątrz `src/features/navigation/`. 
   - Sugerowana odpowiedź: TAK (story wewnątrz modułu).

2) Upgrade do MUI v6 w całym repo
   - Problem: obecnie repo używa MUI v5; mieszanie wersji jest ryzykowne.
   - Rekomendacja: globalny upgrade do v6 przed implementacją Sitemenu.
   - Sugerowana odpowiedź: TAK (upgrade teraz).

3) Źródło i18n dla labelKey
   - Problem: brak centralnej integracji i18n w module przenaszalnym.
   - Rekomendacja: w module trzymamy prosty mapowany resolver (EN/PL) + fallback do `name`.
   - Sugerowana odpowiedź: TAK (mock w module; możliwość podmiany w przyszłości).

4) RBAC brak `allowedRoles`
   - Rekomendacja: brak `allowedRoles` = element widoczny dla wszystkich.
   - Sugerowana odpowiedź: TAK.

5) Link routera
   - Rekomendacja: `LinkComponent` lub `linkAdapter` jako props, bez twardej zależności.
   - Sugerowana odpowiedź: TAK (zapewnia przenaszalność).

6) Przechowywanie stanu dropdownów
   - Rekomendacja: lokalny stan w komponencie (nie globalny); sterowanie klawiaturą w `a11y.ts`.
   - Sugerowana odpowiedź: TAK.

7) Szerokości drawerów
   - Rekomendacja: domyślnie `expanded=280`, `collapsed=72`, nadpisywalne przez `props.widths`.
   - Sugerowana odpowiedź: TAK.

### Analiza ekspertów (panel)
- Architekt (React/TS): wydzielić `SideMenu*` w osobne pliki, trzymać propsy typowane w `types.ts`; export tylko nazwany z `index.ts` dla tree-shakingu.
- UX/UI (MUI): w trybie collapsed użyć `Tooltip` MUI; zachować stałą szerokość ikon; zadbać o `ListItemIcon` alignment i responsywny `display` nazwy firmy.
- A11y: implementować roving tabindex i poprawne role `menu`/`menuitem`; focus ring widoczny; `aria-expanded`, `aria-controls` na dropdown; Esc domyka.
- i18n: resolver lokalny (EN/PL) z fallbackiem; wspierać `labelKey` i preferować je nad `name`.
- Wydajność: memoizacja list i ikon; unikać rerenderów przez stabilne referencje handlerów; minimalne animacje z `prefers-reduced-motion`.
- Testy: pokryć kluczowe ścieżki (RBAC, active state, keyboard, collapsed tooltip, dropdown behavior); użyć danych z kontraktu JSON.
- Integracja: Link niezależny od routera przez `LinkComponent`/`linkAdapter`; `iconResolver` pozwala zastąpić Iconify.

### Log
- 2025-08-24: Rozpoczęto implementację Sitemenu. Testy wyłączone – weryfikacja manualna + Storybook.


