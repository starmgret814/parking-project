import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

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

  constructor() {}

  ngOnInit(): void {
    // inicialización opcional
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
