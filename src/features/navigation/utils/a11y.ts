import type { HTMLAttributes, KeyboardEvent } from 'react';

export interface MenuItemA11yProps extends HTMLAttributes<HTMLElement> {
  role: 'menuitem';
  tabIndex: number;
  'aria-current'?: 'page' | undefined;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
}

export function getMenuItemAriaProps(options: {
  isActive?: boolean;
  isExpandable?: boolean;
  expanded?: boolean;
  controlsId?: string;
  tabIndex: number;
}): MenuItemA11yProps {
  const { isActive, isExpandable, expanded, controlsId, tabIndex } = options;
  return {
    role: 'menuitem',
    tabIndex,
    'aria-current': isActive ? 'page' : undefined,
    ...(isExpandable
      ? { 'aria-expanded': Boolean(expanded), 'aria-controls': controlsId }
      : {})
  };
}

export type DropdownKeyHandler = (e: KeyboardEvent) => void;

export function createDropdownKeyHandler(options: {
  onOpen: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onActivate: () => void;
  onEscape?: () => void;
}): DropdownKeyHandler {
  const { onOpen, onClose, onNext, onPrev, onActivate, onEscape } = options;
  return (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        onNext();
        break;
      case 'ArrowUp':
        e.preventDefault();
        onPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        onOpen();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onClose();
        break;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        onActivate();
        break;
      case 'Escape':
        onEscape?.();
        break;
      default:
        break;
    }
  };
}


