import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-divisiondashboard',
  standalone: true,
  imports: [],
  templateUrl: './divisiondashboard.component.html',
  styleUrl: './divisiondashboard.component.css'
})
export class DivisiondashboardComponent {

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
