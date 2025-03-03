import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ScholarlistComponent } from "../../personnelDept/scholar-pers-dept/scholar-pers-dept.component";

@Component({
  selector: 'app-personnel-department-dashboard',
  standalone: true,
  imports: [ScholarlistComponent],
  templateUrl: './personnel-department-dashboard.component.html',
  styleUrl: './personnel-department-dashboard.component.css'
})
export class PersonnelDepartmentDashboardComponent {
   name: string = '';
       
      
        constructor(private authService: AuthService) {}
      
        
        ngOnInit(): void {
          // Check if we are in the browser before using localStorage
          if (this.isBrowser()) {
            this.name = localStorage.getItem('name') || ''; // Fallback to empty string if not found
          }
        }
        private isBrowser(): boolean {
          // Check if window object exists (i.e., we are in the browser environment)
          return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
        }

}
