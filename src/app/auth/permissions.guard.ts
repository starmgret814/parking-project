import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { PermissionsService } from 'src/app/services/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {
  constructor(
    private permissionsService: PermissionsService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    let permisoRequerido = route.data['permiso'];

    if (!permisoRequerido) {
      const deepestChild = this.getDeepestChild(route);
      permisoRequerido = deepestChild.data['permiso'];
    }

    if (!permisoRequerido) {
      return true;
    }

    if (Array.isArray(permisoRequerido)) {
      if (
        permisoRequerido.some((p) => this.permissionsService.tienePermiso(p))
      ) {
        return true;
      }
    } else {
      if (this.permissionsService.tienePermiso(permisoRequerido)) {
        return true;
      }
    }

    return this.router.parseUrl('/pagina-no-autorizada');
  }

  private getDeepestChild(
    route: ActivatedRouteSnapshot
  ): ActivatedRouteSnapshot {
    let deepest = route;
    while (deepest.firstChild) {
      deepest = deepest.firstChild;
    }
    return deepest;
  }
}
