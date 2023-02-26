import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';
import { AddEditProductDialogComponent } from './components/add-edit-product-dialog/add-edit-product-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductComponent,
    AddEditProductDialogComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
