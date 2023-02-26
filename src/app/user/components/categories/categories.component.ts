import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  products: Product[] = [];

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.products = this._route.snapshot.data['categoryProducts'];
  }
}
