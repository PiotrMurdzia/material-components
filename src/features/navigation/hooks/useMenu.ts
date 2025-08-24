import type { MenuItem, MenuItemInput, Role } from '@/features/navigation/types';
import { useMemo, useState } from 'react';

import Ajv2020 from 'ajv/dist/2020';
import type { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { buildMenuTree } from '@/features/navigation/utils/buildMenuTree';
import { filterByRoles } from '@/features/navigation/utils/filterByRoles';
import schema from '@/features/navigation/schema/menu.schema.json';

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate: ValidateFunction = ajv.compile(schema as unknown as object);

function translateLabel(name: string, labelKey: string | undefined, locale: string, dict: Record<string, Record<string, string>>): string {
  if (labelKey) {
    const bucket = dict[locale] || {};
    return bucket[labelKey] || name;
  }
  return name;
}

const MOCK_I18N: Record<string, Record<string, string>> = {
  en: {
    'header.menu.dashboard': 'Dashboard',
    'header.menu.clients': 'Clients',
    'header.menu.investments': 'Investments',
    'header.menu.settings': 'Settings',
    'header.menu.admin': 'Admin Panel'
  },
  pl: {
    'header.menu.dashboard': 'Pulpit',
    'header.menu.clients': 'Klienci',
    'header.menu.investments': 'Inwestycje',
    'header.menu.settings': 'Ustawienia',
    'header.menu.admin': 'Panel administracyjny'
  }
};

export interface UseMenuResult {
  menu: MenuItem[];
  isActivePath: (path?: string) => boolean;
  isSectionActive: (id: string) => boolean;
  openState: Record<string, boolean>;
  toggle: (id: string, open?: boolean) => void;
}

export function useMenu(items: MenuItemInput[], roles: Role[], locale: string = 'en', activePath: string): UseMenuResult {
  const [openState, setOpenState] = useState<Record<string, boolean>>({});

  const normalized = useMemo<MenuItem[]>(() => {
    const input = { availableItems: items } as { availableItems: MenuItemInput[] };
    const valid = validate(input);
    if (!valid) {
      const message = (validate.errors || []).map((e) => `${e.instancePath} ${e.message}`).join('; ');
      throw new Error(`SideMenu input invalid: ${message}`);
    }

    const visible = filterByRoles(items, roles);
    const withLabels: MenuItemInput[] = visible.map((item) => ({
      ...item,
      name: translateLabel(item.name, item.labelKey, locale, MOCK_I18N),
      children: item.children?.map((c) => ({
        ...c,
        name: translateLabel(c.name, c.labelKey, locale, MOCK_I18N)
      }))
    }));
    return buildMenuTree(withLabels);
  }, [items, roles, locale]);

  const isActivePath = (path?: string) => Boolean(path && activePath === path);
  const isSectionActive = (id: string) => {
    const section = normalized.find((i) => i.id === id);
    if (!section || !section.children) return false;
    return section.children.some((c) => c.path && activePath.startsWith(c.path));
  };

  const toggle = (id: string, open?: boolean) => {
    setOpenState((prev) => ({ ...prev, [id]: open ?? !prev[id] }));
  };

  return { menu: normalized, isActivePath, isSectionActive, openState, toggle };
}


