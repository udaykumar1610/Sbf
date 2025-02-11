import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent  {
  slides = [
    { imageUrl: 'https://screccs.com/wp-content/themes/screccs-ind/img/edu-loan.jpg', caption: 'Slide 1' },
    { imageUrl: 'https://via.placeholder.com/800x400/7f7fff/333333?text=Slide+2', caption: 'Slide 2' },
    { imageUrl: 'https://via.placeholder.com/800x400/7fff7f/333333?text=Slide+3', caption: 'Slide 3' },
    { imageUrl: 'https://via.placeholder.com/800x400/ffff7f/333333?text=Slide+4', caption: 'Slide 4' }
  ];
}