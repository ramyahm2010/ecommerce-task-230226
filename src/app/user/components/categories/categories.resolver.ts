import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { ApiOptions } from 'src/app/shared/interfaces/api-options.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<Product[]> {
  constructor(private _api: ApiService, private _helper: HelperService) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    const options: ApiOptions = {
      method: 'get',
      endpoint: `products/category/${_route.params['name']}`,
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
