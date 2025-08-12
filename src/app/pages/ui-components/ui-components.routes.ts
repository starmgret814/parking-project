import { Routes } from '@angular/router';

// ui
import { AppEntriesComponent } from './entries/entries.component';
import { AppExitsComponent } from './exits/exits.component';
import { AppCategoriesComponent } from './categories/categories.component';
import { AppUsersComponent } from './users/users.component';
import { AppReportesComponent } from './reports/reports.component';
import { AppAjustesComponent } from './settings/settings.component';
import { PermissionsGuard } from 'src/app/auth/permissions.guard';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registros',
        component: AppEntriesComponent,
        canActivate: [PermissionsGuard],
        data: { permiso: 'Registros' },
      },
      {
        path: 'salidas',
        component: AppExitsComponent,
        canActivate: [PermissionsGuard],
        data: { permiso: 'Salidas' },
      },
      {
        path: 'categorias',
        component: AppCategoriesComponent,
        canActivate: [PermissionsGuard],
        data: { permiso: 'Categorias' },
      },
      {
        path: 'usuarios',
        component: AppUsersComponent,
        canActivate: [PermissionsGuard],
        data: { permiso: 'Usuarios' },
      },
      {
        path: 'reportes',
        component: AppReportesComponent,
        canActivate: [PermissionsGuard],
        data: { permiso: 'Reportes' },
      },
      {
        path: 'ajustes',
        component: AppAjustesComponent,
        canActivate: [PermissionsGuard],
        data: { permiso: 'Ajustes' },
      },
    ],
  },
];
