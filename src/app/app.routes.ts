import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { PermissionsGuard } from './auth/permissions.guard';
import { PaginaNoAutorizadoComponent } from './pages/pagina-no-autorizada/pagina-no-autorizada.component';
import { PaginaNoEncontradaComponent } from './pages/pagina-no-encontrada/pagina-no-encontrada.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [PermissionsGuard],
        data: { permiso: 'Inicio' },
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
        canActivate: [PermissionsGuard],
        data: { permiso: 'Extra' },
      },
      {
        path: 'pagina-no-autorizada',
        component: PaginaNoAutorizadoComponent,
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  { path: 'pagina-no-encontrada', component: PaginaNoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-no-encontrada' },
];
