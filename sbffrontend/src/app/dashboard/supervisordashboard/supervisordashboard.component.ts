import { Component } from '@angular/core';
import { ScholarlistComponent } from "../../scholarlist/scholarlist.component";

@Component({
  selector: 'app-supervisordashboard',
  standalone: true,
  imports: [ScholarlistComponent],
  templateUrl: './supervisordashboard.component.html',
  styleUrl: './supervisordashboard.component.css'
})
export class SupervisordashboardComponent {

}
