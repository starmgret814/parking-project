import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface CategoryDialogData {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-edit-category-dialog',
  standalone: true,
  templateUrl: './edit-category-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EditCategoryDialogComponent {
  dialogRef = inject(MatDialogRef<EditCategoryDialogComponent>);
  data = inject<CategoryDialogData>(MAT_DIALOG_DATA);

  nombre: string = this.data?.nombre || '';
  id: number = this.data?.id || 0;

  constructor() {}

  close(): void {
    this.dialogRef.close();
  }

  editCategory(categoryInput: NgModel): void {
    categoryInput.control.markAsTouched();

    if (categoryInput.invalid) {
      return;
    }

    this.dialogRef.close({
      id: this.id,
      nombre: this.nombre.trim(),
    });
  }
}
