import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngFor
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recreation-amusement',
  standalone: true, // Standalone component
  imports: [CommonModule], // Import CommonModule for common Angular features
  templateUrl: './recreation-amusement.component.html',
  styleUrls: ['./recreation-amusement.component.css']
})
export class RecreationAmusementComponent {

  isAuthenticated: boolean = false; 
      constructor(private router:Router,private authService:AuthService) {}
    
      ngOnInit(): void {
        this.authService.isAuthenticated$.subscribe((status) => {
          this.isAuthenticated = status;
        });
         // Fetch sickness schemes when component initializes
      }
  // Data for camps
  recreationAmusement = [
    { title: 'Recreation & amusement', eligible: '1	Employees / Divyang / Children’s ', priceOfCamp: 'Rs. 4,00,000/- per camp ' }
   
  ];


  apply(){
    if(this.isAuthenticated){
      this.router.navigate(['/user-dashboard']);
      console.log(this.isAuthenticated);
    }else{

      this.router.navigate(['/login']);
    }
  }
}
