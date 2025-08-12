import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, MatTooltipModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppCategoryManagementComponent implements OnInit {
  nuevaCategoria: string = '';
  categorias: { type: string }[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categorias = data;
    });
  }

  agregarCategoria() {
    const tipo = this.nuevaCategoria.trim();

    if (tipo) {
      const capitalizado =
        tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
      this.categorias.push({ type: capitalizado });
      this.nuevaCategoria = '';
    }
  }
}
