import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppUsersManagementComponent } from 'src/app/components/component-users/users-management/users-management.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [MatCardModule, AppUsersManagementComponent],
})
export class AppUsersComponent {}
