import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { RoleManagementDialogComponent } from '../role-management-dialog/role-management-dialog.component';
import { PermissionsDialogComponent } from '../permissions-dialog/permissions-dialog.component';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, MatTooltipModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppUsersManagementComponent implements OnInit {
  users: {
    name: string;
    paternalLastName?: string;
    maternalLastName?: string;
    email?: string;
    role?: string;
    shift?: string;
  }[] = [
    {
      name: 'Juan',
      paternalLastName: 'Pérez',
      maternalLastName: 'García',
      email: 'juan@example.com',
      role: 'Administrador',
      shift: 'Mañana',
    },
    {
      name: 'Ana',
      paternalLastName: 'López',
      maternalLastName: 'Ramírez',
      email: 'ana@example.com',
      role: 'Usuario',
      shift: 'Tarde',
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '35vw',
      maxWidth: '35vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //Agrega el nuevo usuario devuelto por el modal
        this.users.push(result);
      }
    });
  }

  openRoleDialog(): void {
    const dialogRef = this.dialog.open(RoleManagementDialogComponent, {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Rol creado:', result);
      }
    });
  }

  openPermissionsDialog(user: any): void {
    const dialogRef = this.dialog.open(PermissionsDialogComponent, {
      width: '500px',
      autoFocus: false,
      data: { user }, //ENVÍA el user como data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Permisos guardados:', result.permissions);
      }
    });
  }
}
