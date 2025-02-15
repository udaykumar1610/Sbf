import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-formdrop',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './formdrop.component.html',
  styleUrl: './formdrop.component.css'
})
export class FormdropComponent {
  constructor(private router: Router) { }

  // Navigate based on the clicked dropdown item
  navigateToPage(route: string): void {
    this.router.navigate([route]);
  }
}


