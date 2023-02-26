import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ROLE } from '../enums/role.enum';
import { User } from '../interfaces/user.interface';
import { SnackService } from './snack.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = new BehaviorSubject<User | null>(null);
  users: User[];

  constructor(
    private _storage: StorageService,
    private _snack: SnackService,
    private _router: Router
  ) {
    this.users = [
      {
        username: 'user',
        password: 'user',
        role: ROLE.USER,
      },
      {
        username: 'admin',
        password: 'admin',
        role: ROLE.ADMIN,
      },
    ];
  }

  get role(): ROLE | undefined {
    return this.user$?.value?.role;
  }

  login(username: string, password: string) {
    const user = this.users.find(
      (user) => user.username === username && user.password === password
    );
    const role = user?.role;
    if (role) {
      this._storage.set('USER', { username, role });
      this.user$.next({ username, role });
      this._router.navigate([role === ROLE.ADMIN ? `/${role}` : '']);
    } else {
      this._snack.show('Invalid login data !', 'error');
    }
  }

  logout() {
    this.removeUserFromLocal();
    this._router.navigate(['/auth']);
  }

  setUserFromLocal() {
    const user: User = this._storage.get('USER');
    if (user?.role) {
      this.user$.next(user);
    }
  }

  removeUserFromLocal() {
    this.user$.next(null);
    this._storage.remove('USER');
  }
}
