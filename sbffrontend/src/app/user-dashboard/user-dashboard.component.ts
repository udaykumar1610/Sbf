import { Component } from '@angular/core';
import { UserschemsComponent } from "../userschems/userschems.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserschemsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
