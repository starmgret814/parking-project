import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  CategoryService,
  Category,
  Rate,
} from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';
import {
  RateEditDialogComponent,
  RateDialogData,
} from '../rate-category-dialog/rate-category-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { forkJoin } from 'rxjs';

interface RateSimplificada {
  id_tarifa: number;
  id_turno: number;
  monto_por_hora: number;
  nombre_turno: string;
}

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppCategoryManagementComponent implements OnInit {
  nuevaCategoria: string = '';
  categorias: Category[] = [];
  categoriasOriginal: Category[] = [];
  rates: Rate[] = [];
  tarifas: RateSimplificada[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categorias = data;
      this.categoriasOriginal = data;
    });
  }

  filtrarCategorias(event: Event) {
    const input = event.target as HTMLInputElement;
    const filtro = input.value.trim().toLowerCase();

    this.categorias = this.categoriasOriginal.filter((cat) =>
      cat.nombre.toLowerCase().includes(filtro)
    );
  }

  agregarCategoria() {
    const nombre = this.nuevaCategoria.trim();
    if (!nombre) return;

    const capitalizado =
      nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    const nuevaCat = { nombre: capitalizado, estado: true };

    this.categoryService.addCategory(nuevaCat).subscribe({
      next: () => {
        this.snackBar.open('Categoría creada con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
        this.nuevaCategoria = '';
        this.cargarCategorias();
      },
      error: (err) => {
        if (err.error && err.error.errors) {
          err.error.errors.forEach((e: any) => {});

          const mensaje = err.error.errors[0].msg;
          this.snackBar.open(mensaje, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        } else {
          console.error('Error desconocido:', err);
          this.snackBar.open('Ocurrió un error inesperado', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        }
      },
    });
  }

  seleccionarCategoriaParaEditar(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '350px',
      data: { id: category.id, nombre: category.nombre },
    });

    dialogRef.afterClosed().subscribe((result: Category | undefined) => {
      if (result) {
        this.actualizarCategoriaDesdeDialog(result);
      }
    });
  }

  actualizarCategoriaDesdeDialog(catActualizada: Category) {
    const nombre = catActualizada.nombre.trim();
    if (nombre && catActualizada.id) {
      const capitalizado =
        nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

      // Buscar la categoría original
      const original = this.categorias.find((c) => c.id === catActualizada.id);

      if (
        (original?.nombre ?? '').toLowerCase() === capitalizado.toLowerCase()
      ) {
        return;
      }

      const payload = {
        nombre: capitalizado,
        estado: catActualizada.estado,
      };

      this.categoryService
        .updateCategory(catActualizada.id.toString(), payload)
        .subscribe({
          next: (actualizada) => {
            const index = this.categorias.findIndex(
              (c) => c.id === actualizada.id
            );
            if (index !== -1) {
              this.categorias[index] = actualizada;
            }
            this.cargarCategorias();
            this.snackBar.open('Categoría guardada con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['custom-snackbar'],
            });
          },
          error: (err) => {
            if (err.error && err.error.errors) {
              err.error.errors.forEach((e: any) => {});

              const mensaje = err.error.errors[0].msg;
              this.snackBar.open(mensaje, 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['custom-snackbar'],
              });
            } else {
              console.error('Error desconocido:', err);
              this.snackBar.open('Ocurrió un error inesperado', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['custom-snackbar'],
              });
            }
          },
        });
    }
  }

  openTarifaDialog(category: Category) {
    this.categoryService.getRatesByVehicleType(category.id).subscribe({
      next: (response: any) => {
        const tarifasSimplificadas: RateSimplificada[] = response.data.map(
          (rate: any) => ({
            id_tarifa: rate.id,
            id_turno: rate.id_turno,
            monto_por_hora: rate.monto_por_hora,
            nombre_turno: rate.turno_tarifa.nombre_turno,
          })
        );

        const dialogRef = this.dialog.open(RateEditDialogComponent, {
          width: '350px',
          data: {
            id_tipo_vehiculo: category.id,
            nombreTipoVehiculo: category.nombre,
            tarifas: tarifasSimplificadas,
          },
        });

        dialogRef.afterClosed().subscribe((result: any | undefined) => {
          if (result) {
            console.log('Tarifas editadas:', result);

            const tarifasParaActualizar = result.tarifas.filter(
              (tarifaEditada: any) => {
                const tarifaOriginal = tarifasSimplificadas.find(
                  (t: RateSimplificada) =>
                    t.id_tarifa === tarifaEditada.id_tarifa
                );
                return (
                  tarifaOriginal &&
                  (tarifaOriginal.monto_por_hora !==
                    tarifaEditada.monto_por_hora ||
                    tarifaOriginal.id_turno !== tarifaEditada.id_turno)
                );
              }
            );

            if (tarifasParaActualizar.length === 0) {
              return;
            }

            const updateObservables = tarifasParaActualizar.map(
              (tarifaEditada: any) =>
                this.categoryService.updateRate(tarifaEditada.id_tarifa, {
                  monto_por_hora: tarifaEditada.monto_por_hora,
                  id_turno: tarifaEditada.id_turno,
                  id_tipo_vehiculo: result.id_tipo_vehiculo,
                })
            );

            forkJoin(updateObservables).subscribe({
              next: () => {
                this.snackBar.open('Tarifas guardadas con éxito', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'bottom',
                  panelClass: ['custom-snackbar'],
                });
              },
              error: (err) => {
                if (err.error && err.error.errors) {
                  err.error.errors.forEach((e: any) => {});

                  const mensaje = err.error.errors[0].msg;
                  this.snackBar.open(mensaje, 'Cerrar', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['custom-snackbar'],
                  });
                } else {
                  console.error('Error desconocido:', err);
                  this.snackBar.open('Ocurrió un error inesperado', 'Cerrar', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['custom-snackbar'],
                  });
                }
              },
            });
          }
        });
      },
      error: (err) => {
        if (err.error && err.error.errors) {
          err.error.errors.forEach((e: any) => {});

          const mensaje = err.error.errors[0].msg;
          this.snackBar.open(mensaje, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        } else {
          console.error('Error desconocido:', err);
          this.snackBar.open('Ocurrió un error inesperado', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        }
      },
    });
  }

  eliminarCategoria(categoryId: number) {
    this.categoryService.deleteCategory(categoryId.toString()).subscribe({
      next: () => {
        this.categorias = this.categorias.filter((c) => c.id !== categoryId);
        this.snackBar.open('Categoría eliminada con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
      },
      error: (err) => {
        if (err.error && err.error.errors) {
          err.error.errors.forEach((e: any) => {});

          const mensaje = err.error.errors[0].msg;
          this.snackBar.open(mensaje, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        } else {
          console.error('Error desconocido:', err);
          this.snackBar.open('Ocurrió un error inesperado', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        }
      },
    });
  }
}
