import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { ScholarPCPOComponent } from "../../personnelDept/scholar-pcpo/scholar-pcpo.component";

@Component({
  selector: 'app-pcpodashboard',
  standalone: true,
  imports: [ScholarPCPOComponent],
  templateUrl: './pcpodashboard.component.html',
  styleUrl: './pcpodashboard.component.css'
})
export class PcpodashboardComponent {



  name: string = '';
  private userSubscription: Subscription | undefined;

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
