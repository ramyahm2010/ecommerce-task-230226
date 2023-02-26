import { HelperService } from './../../../shared/services/helper.service';
import { Product } from './../../../shared/interfaces/product.interface';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiOptions } from 'src/app/shared/interfaces/api-options.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackService } from 'src/app/shared/services/snack.service';

@Component({
  selector: 'app-add-edit-product-dialog',
  templateUrl: './add-edit-product-dialog.component.html',
  styleUrls: ['./add-edit-product-dialog.component.scss'],
})
export class AddEditProductDialogComponent {
  dialogTitle: string;
  dialogActionLabel: string;
  addEditProductForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    image: new FormControl('https://i.pravatar.cc', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Product; categories: string[] },
    private _api: ApiService,
    private _snack: SnackService,
    private _dialogRef: MatDialogRef<AddEditProductDialogComponent>,
    private _helper: HelperService
  ) {
    const product = this.data.product;
    this.dialogTitle = product?.id ? 'Edit product' : 'Add product';
    this.dialogActionLabel = product?.id ? 'Save changes' : 'Submit';
    this.addEditProductForm.get('title')?.setValue(product?.originalTitle!);
    this.addEditProductForm.get('price')?.setValue(product?.price.toString()!);
    this.addEditProductForm.get('description')?.setValue(product?.description!);
    this.addEditProductForm.get('category')?.setValue(product?.category!);
  }

  onSubmit() {
    const options: ApiOptions = {
      method: this.data.product?.id ? 'put' : 'post',
      endpoint: this.data.product?.id
        ? `products/${this.data.product.id}`
        : 'products',
      data: this.addEditProductForm.value,
    };

    this._api.call(options).subscribe((product) => {
      if (product?.id) {
        this._dialogRef.close({
          product: {
            ...product,
            originalTitle: product.title,
            title: this._helper.truncate(product.title, 30),
          },
          type: this.data.product?.id ? 'edit' : 'add',
        });
        this._snack.show(
          `${
            this.data.product?.id ? 'Updated' : 'Added'
          } product successfully !`,
          'success'
        );
      }
    });
  }
}
