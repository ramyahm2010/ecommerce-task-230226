import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../components/snack/snack.component';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private _snackBar: MatSnackBar) {}

  show(message: string, type: 'success' | 'error' | 'info') {
    const options: any = {};
    if (type === 'success') {
      options.icon = 'check_circle';
      options.icon_color = '#00C853';
    } else if (type === 'error') {
      options.icon = 'cancel';
      options.icon_color = '#BF360C';
    } else if (type === 'info') {
      options.icon = 'info';
      options.icon_color = '#2196F3';
    }
    this._snackBar.openFromComponent(SnackComponent, {
      data: {
        message,
        icon: options.icon,
        icon_color: options.icon_color,
        action_icon: 'close',
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000,
    });
  }
}
