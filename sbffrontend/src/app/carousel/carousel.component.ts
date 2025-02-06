import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent implements OnInit {
  currentIndex = 0;  // Track the current slide index
  items = [
    { src: 'https://via.placeholder.com/600x300?text=Slide+1', alt: 'Slide 1' },
    { src: 'https://via.placeholder.com/600x300?text=Slide+2', alt: 'Slide 2' },
    { src: 'https://via.placeholder.com/600x300?text=Slide+3', alt: 'Slide 3' },
    { src: 'https://via.placeholder.com/600x300?text=Slide+4', alt: 'Slide 4' },
  ];

  ngOnInit() {
    this.autoSlide();
  }

  // Automatic slide change
  autoSlide() {
    setInterval(() => {
      this.next();
    }, 3000); // Change slide every 3 seconds
  }

  // Go to the next slide
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  // Go to the previous slide
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  // Go to a specific slide
  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
