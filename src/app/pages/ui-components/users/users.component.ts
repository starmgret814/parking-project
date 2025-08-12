import { Component, ViewEncapsulation} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppUsersManagementComponent } from 'src/app/components/component-users/users-management/users-management.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [MatCardModule, AppUsersManagementComponent],
  encapsulation: ViewEncapsulation.None,
})
export class AppUsersComponent {}
