import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { KithkinsrdpoComponent } from "../../srdpo/kithkinsrdpo/kithkinsrdpo.component";
import { ScholarsrdpoComponent } from "../../srdpo/scholarsrdpo/scholarsrdpo.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-srdpodashboard',
  standalone: true,
  imports: [KithkinsrdpoComponent, ScholarsrdpoComponent,RouterLink,RouterOutlet],
  templateUrl: './srdpodashboard.component.html',
  styleUrl: './srdpodashboard.component.css'
})
export class SrdpodashboardComponent {
  
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
