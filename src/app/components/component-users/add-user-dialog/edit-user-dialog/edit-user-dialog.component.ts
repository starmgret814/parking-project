import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { UserService, Rol } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  templateUrl: './edit-user-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
  ],
})
export class EditUserDialogComponent {
  name: string = '';
  paternalLastName: string = '';
  maternalLastName: string = '';
  email: string = '';

  roles: Rol[] = [];
  roleId: number | null = null;

  turnos = [
    { nombre_turno: 'Mañana' },
    { nombre_turno: 'Tarde' },
    { nombre_turno: 'Noche' },
  ];

  shift: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userService.getRol().subscribe((data) => {
      this.roles = data;
    });

    if (this.data) {
      this.name = this.data.nombre;
      this.paternalLastName = this.data.apellido_p;
      this.maternalLastName = this.data.apellido_m;
      this.email = this.data.correo;
      this.roleId = this.data.id_rol;
      this.shift = this.data.turno;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    if (this.roleId === 1) {
      this.shift = 'Administrador';
    }

    if (
      !this.name ||
      !this.paternalLastName ||
      !this.maternalLastName ||
      !this.email ||
      !this.roleId
    ) {
      return;
    }

    this.dialogRef.close({
      nombre: this.name,
      apellido_p: this.paternalLastName,
      apellido_m: this.maternalLastName,
      correo: this.email,
      id_rol: this.roleId,
      turno: this.shift,
    });
  }
}
