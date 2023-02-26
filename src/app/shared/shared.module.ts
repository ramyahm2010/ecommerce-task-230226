import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackComponent } from './components/snack/snack.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

const matModules = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule,
  MatToolbarModule,
  MatDividerModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
];

@NgModule({
  declarations: [SnackComponent],
  imports: [CommonModule, ...matModules, ReactiveFormsModule],
  exports: [...matModules, ReactiveFormsModule, SnackComponent],
})
export class SharedModule {}
