import { ProductDetailsDialogComponent } from './../product-details-dialog/product-details-dialog.component';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent {
  @Input() product: Product | undefined;

  constructor(private _router: Router, public _dialog: MatDialog) {}

  goToSingleCategory(name: string) {
    console.log(name);
    this._router.navigate([`/categories/${name}`]);
  }

  openProductDetails(product: Product) {
    const dialogRef = this._dialog.open(ProductDetailsDialogComponent, {
      width: '760px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
