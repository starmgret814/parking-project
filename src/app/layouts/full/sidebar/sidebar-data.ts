import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Menu',
  },
  {
    displayName: 'Inicio',
    iconName: 'home',
    route: '/dashboard',
  },
  {
    displayName: 'Registros',
    iconName: 'car',
    route: '/ui-components/registros',
  },
  {
    displayName: 'Salidas',
    iconName: 'time-check',
    route: '/ui-components/salidas',
  },

  {
    navCap: 'Gestión',
  },
  {
    displayName: 'Categorías',
    iconName: 'chart-tree',
    route: '/ui-components/categorias',
  },
  {
    displayName: 'Usuarios',
    iconName: 'user',
    route: '/ui-components/usuarios',
  },

  {
    navCap: 'Reportes',
  },
  {
    displayName: 'Reportes',
    iconName: 'form',
    route: '/ui-components/reportes',
  },

  {
    navCap: 'Ajustes',
  },
  {
    displayName: 'Ajustes',
    iconName: 'settings',
    route: '/ui-components/ajustes',
  },
];
