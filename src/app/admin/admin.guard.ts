import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ROLE } from '../shared/enums/role.enum';
import { CanActivate } from '../shared/interfaces/can-activate.interface';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._auth.role === ROLE.ADMIN) {
      return true;
    }

    this._auth.removeUserFromLocal();
    this._router.navigate(['/auth']);
    return false;
  }
}
