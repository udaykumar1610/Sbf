import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-spodashboard',
  standalone: true,
  imports: [],
  templateUrl: './spodashboard.component.html',
  styleUrl: './spodashboard.component.css'
})
export class SpodashboardComponent {



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
