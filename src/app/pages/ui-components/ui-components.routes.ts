import { Routes } from '@angular/router';

// ui
import { AppEntriesComponent } from './entries/entries.component';
import { AppExitsComponent } from './exits/exits.component';
import { AppCategoriesComponent } from './categories/categories.component';
import { AppUsersComponent } from './users/users.component';
import { AppReportesComponent } from './reportes/reportes.component';
import { AppAjustesComponent } from './ajustes/ajustes.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registros',
        component: AppEntriesComponent,
      },
      {
        path: 'salidas',
        component: AppExitsComponent,
      },
      {
        path: 'categorias',
        component: AppCategoriesComponent,
      },
      {
        path: 'usuarios',
        component: AppUsersComponent,
      },
      {
        path: 'reportes',
        component: AppReportesComponent,
      },
      {
        path: 'ajustes',
        component: AppAjustesComponent,
      },
    ],
  },
];
