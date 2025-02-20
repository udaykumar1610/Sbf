import { Component } from '@angular/core';
import { ScholarlistComponent } from "../../scholarlist/scholarlist.component";
import { KithkinlistComponent } from "../../List/kithkinlist/kithkinlist.component";
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-supervisordashboard',
  standalone: true,
  imports: [ScholarlistComponent, KithkinlistComponent],
  templateUrl: './supervisordashboard.component.html',
  styleUrl: './supervisordashboard.component.css'
})
export class SupervisordashboardComponent {

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
