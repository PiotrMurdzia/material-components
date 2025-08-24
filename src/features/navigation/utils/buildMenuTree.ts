import type { MenuItem, MenuItemInput } from '@/features/navigation/types';

export function buildMenuTree(items: MenuItemInput[]): MenuItem[] {
  const ids = new Set<string>();

  const ensureUnique = (id: string) => {
    if (ids.has(id)) throw new Error(`Duplicate menu id: ${id}`);
    ids.add(id);
  };

  const mapNode = (node: MenuItemInput): MenuItem => {
    ensureUnique(node.id);
    const label = node.name; // właściwa translacja w hooku useMenu
    if (node.children && node.children.length > 0) {
      const children = node.children.map((c) => {
        ensureUnique(c.id);
        return { id: c.id, label: c.name, path: c.path, icon: c.icon };
      });
      return { id: node.id, label, icon: node.icon, children };
    }
    if (!node.path) throw new Error(`Menu item without path or children: ${node.id}`);
    return { id: node.id, label, path: node.path, icon: node.icon };
  };

  return items.map(mapNode);
}


