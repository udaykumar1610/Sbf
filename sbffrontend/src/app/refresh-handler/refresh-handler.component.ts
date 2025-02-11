import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-refresh-handler',
  standalone: true,
  imports: [],
  templateUrl: './refresh-handler.component.html',
  styleUrl: './refresh-handler.component.css'
})
export class RefreshHandlerComponent {

  constructor(private authService:AuthService){}


  ngOnInit(){
    this.authService.isAuthenticated();
  }

}
