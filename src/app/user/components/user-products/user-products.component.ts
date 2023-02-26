import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.products = this._route.snapshot.data['products'];
  }
}
