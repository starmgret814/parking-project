import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class AppCompanySettingsComponent {
  companyForm: FormGroup;
  logoPreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      name: ['Empresa de Parqueadero S.A.C'],
      ruc: ['123456789-0'],
      address: ['Calle 123 #45-67, Ciudad'],
      tolerance: ['00:15'],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    console.log('Datos guardados:', this.companyForm.value);
  }

  resetForm(): void {
    this.companyForm.reset({
      name: '',
      ruc: '',
      address: '',
      tolerance: '',
    });
    this.logoPreview = null;
  }
}
