import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { ProductDetailsDialogComponent } from './components/product-details-dialog/product-details-dialog.component';

@NgModule({
  declarations: [
    UserComponent,
    SingleProductComponent,
    CategoriesComponent,
    UserProductsComponent,
    ProductDetailsDialogComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
