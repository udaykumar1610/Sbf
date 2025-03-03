

  import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor and other common directives
import { AuthService } from '../auth.service';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-indigenous-system',
  standalone: true,
  imports: [CommonModule,RouterLink], // Import CommonModule for Angular common directives like *ngFor
  templateUrl: './indigenous-system.component.html',
  styleUrls: ['./indigenous-system.component.css'],
})
export class IndigenousSystemComponent {
  // Data for indigenous systems



   isAuthenticated: boolean = false; 
    constructor(private router:Router,private authService:AuthService) {}
  
    ngOnInit(): void {
      this.authService.isAuthenticated$.subscribe((status) => {
        this.isAuthenticated = status;
      });
       // Fetch sickness schemes when component initializes
    }
  systems = [
    {
      title: 'Homeopathic Dispensaries (8 hours )',
      typeOfDispensary: 'Homeopathic Dispensaries',
       location: `•	Central Railwya  Hospital, Lallaguda '\n' •	Railway Health Unit, Kazipet  '\n' •	Divisional Railway Hospital, Vijayawada`,
      
      hoursOfWorking: '8 hours',
    },
    {
      title: 'Homeopathic Dispensaries (4 hours)',
      typeOfDispensary: 'Homeopathic Dispensaries',
      location: '•	Divisional Railway Hospital, Guntur',
      hoursOfWorking: '4 hours',
    },
    {
      title: 'Ayurvedic Dispensaries',
      typeOfDispensary: 'Ayurvedic Dispensaries',
      location: '•	Central  Railway Hospital, Lallaguda',
      hoursOfWorking: '4 hours',
    },
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



