import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public _visible = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router) {
    this._router?.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.show();
      });

    this._router?.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            event instanceof NavigationError ||
            event instanceof NavigationCancel
        )
      )
      .subscribe(() => {
        this.hide();
      });
  }

  show(): void {
    this._visible.next(true);
  }

  hide(): void {
    this._visible.next(false);
  }
}
