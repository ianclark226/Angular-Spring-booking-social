import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  standalone: true,
      imports: [CommonModule,
                    RouterModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  @Input() rating : number = 0;
  maxRating: number = 5;

  get fullStars(): number {
    return Math.floor(this.rating);
    }

  get hasHalfStar(): boolean {
    return this.rating % 1 !==0;
    }

  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating);
    }



}
