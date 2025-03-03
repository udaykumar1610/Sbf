import { Component } from '@angular/core';
import { ScholarlistComponent } from "../../scholarlist/scholarlist.component";
import { KithkinlistComponent } from "../../List/kithkinlist/kithkinlist.component";
import { AuthService } from '../../auth.service';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
// import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-supervisordashboard',
  standalone: true,
  imports: [ScholarlistComponent, KithkinlistComponent,ToastModule ,RouterOutlet,RouterLink ],
  providers:[MessageService],
 
  templateUrl: './supervisordashboard.component.html',
  styleUrl: './supervisordashboard.component.css'
})
export class SupervisordashboardComponent {

   name: string = '';
       
      
        constructor(private authService: AuthService,private messageService:MessageService) {}
      
        
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



        // showSuccess() {
        //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
        // }
      
        // // Method to show an error toast
        // showError() {
        //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
        // }



}
