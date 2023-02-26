import { HelperService } from './../shared/services/helper.service';
import { ApiOptions } from './../shared/interfaces/api-options.interface';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product } from '../shared/interfaces/product.interface';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminResolver implements Resolve<Product[]> {
  constructor(private _api: ApiService, private _helper: HelperService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    const options: ApiOptions = {
      method: 'get',
      endpoint: 'products?limit=10',
    };
    return this._api.call(options).pipe(
      map((products) =>
        products.map((product: Product) => ({
          ...product,
          originalTitle: product.title,
          title: this._helper.truncate(product.title, 30),
        }))
      )
    );
  }
}
