import type { MenuItemInput, Role } from '@/features/navigation/types';

export function filterByRoles(items: MenuItemInput[], roles: Role[]): MenuItemInput[] {
  const hasRole = (allowed?: string[]) =>
    !allowed || allowed.length === 0 || allowed.some((r) => roles.includes(r));

  const filterNode = (node: MenuItemInput): MenuItemInput | null => {
    if (!hasRole(node.allowedRoles)) return null;
    if (node.children && node.children.length > 0) {
      const visibleChildren = node.children
        .map(filterNode)
        .filter(Boolean) as MenuItemInput[];
      if (visibleChildren.length === 0) return null;
      return { ...node, children: visibleChildren };
    }
    return node;
  };

  return items.map(filterNode).filter(Boolean) as MenuItemInput[];
}


