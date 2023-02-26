import { User } from './../shared/interfaces/user.interface';
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
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._auth.role === ROLE.ADMIN) {
      this._router.navigate(['/admin']);
      return false;
    } else if (this._auth.role === ROLE.USER) {
      this._router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
