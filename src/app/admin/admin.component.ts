import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiOptions } from '../shared/interfaces/api-options.interface';
import { Product } from '../shared/interfaces/product.interface';
import { ApiService } from '../shared/services/api.service';
import { HelperService } from '../shared/services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductDialogComponent } from './components/add-edit-product-dialog/add-edit-product-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  canLoadMore: boolean = true;
  categories: string[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _api: ApiService,
    private _helper: HelperService,
    public _dialog: MatDialog
  ) {}

  ngOnInit() {
    this.products = this._route.snapshot.data['products'];
  }

  loadMoreProducts() {
    const options: ApiOptions = {
      method: 'get',
      endpoint: 'products?limit=5',
    };

    this._api.call(options).subscribe((res) => {
      if (res?.length > 0) {
        res = res.map((product: Product) => ({
          ...product,
          originalTitle: product.title,
          title: this._helper.truncate(product.title, 30),
        }));
        this.products.push(...res);
        this.canLoadMore = false;
      }
    });
  }

  openProductDialog(product?: Product) {
    this.getCategories().subscribe((categories) => {
      if (categories?.length > 0) {
        this.categories = categories;

        const dialogRef = this._dialog.open(AddEditProductDialogComponent, {
          width: '560px',
          data: { product, categories: this.categories },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result?.type === 'add') {
            this.products.push(result.product);
          } else {
            this.products = this.products.map((p) =>
              p?.id === result.product?.id ? result.product : p
            );
          }
        });
      }
    });
  }

  getCategories(): Observable<string[]> {
    const options: ApiOptions = {
      method: 'get',
      endpoint: 'products/categories',
    };

    return this._api.call(options);
  }

  deleteProduct(id: number) {
    const options: ApiOptions = {
      method: 'delete',
      endpoint: `products/${id}`,
    };

    this._api.call(options).subscribe((res) => {
      if (res?.id) {
        this.products = this.products.filter((p) => p.id !== id);
      }
    });
  }
}
