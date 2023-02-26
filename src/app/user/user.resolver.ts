import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { ApiOptions } from '../shared/interfaces/api-options.interface';
import { Product } from '../shared/interfaces/product.interface';
import { ApiService } from '../shared/services/api.service';
import { HelperService } from '../shared/services/helper.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<Product[]> {
  constructor(private _api: ApiService, private _helper: HelperService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    const options: ApiOptions = {
      method: 'get',
      endpoint: 'products?limit=12',
    };
    return this._api.call(options).pipe(
      map((products) =>
        products.map((product: Product) => ({
          ...product,
          title: this._helper.truncate(product.title, 25),
          description: this._helper.truncate(product.description, 82),
        }))
      )
    );
  }
}
