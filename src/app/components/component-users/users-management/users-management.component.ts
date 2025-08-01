import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, MatTooltipModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppUsersManagementComponent implements OnInit {
  users: { fullName: string; email?: string; role?: string; shift?: string }[] =
    [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Optional: load existing users or initialize data
    this.users = [];
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '40vw',
      maxWidth: '40vw',
      height: '94vh',
      maxHeight: '94vh',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.users.push(result);
      }
    });
  }
}
