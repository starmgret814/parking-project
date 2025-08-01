import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppCategoryManagementComponent } from 'src/app/components/component-categories/category-management/category-management.component';

@Component({
  selector: 'app-categorias',
  imports: [MatCardModule, AppCategoryManagementComponent],
  templateUrl: './categories.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppCategoriesComponent {}
