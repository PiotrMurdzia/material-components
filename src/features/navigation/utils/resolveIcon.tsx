import { Icon } from '@iconify/react';
import React from 'react';

export function resolveIcon(iconName?: string): React.ReactNode {
  if (!iconName) return null;
  return <Icon icon={iconName} width={20} height={20} />;
}


