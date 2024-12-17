import { Component } from '@angular/core';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [Carousel],
  templateUrl: './challenges.component.html'
})
export class ChallengesComponent {
  challenges = [1,2,3,4,5]
}
