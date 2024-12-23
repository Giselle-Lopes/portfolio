import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Carousel } from 'primeng/carousel';

interface Challenges {
  route: string;
  preview: string;
  name: string;
}

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [Carousel, NgFor, RouterLink],
  templateUrl: './challenges.component.html'
})
export class ChallengesComponent {
  challenges: Challenges[] = [
    {
      'name': 'Calculator',
      'preview': '/assets/challenges/calculator.png',
      'route': '/challenges/calculator'
    },
    {
      'name': 'Calendar',
      'preview': '/assets/challenges/calendar.png',
      'route': '/challenges/calendar'
    },
    {
      'name': '404 Error Page',
      'preview': '/assets/challenges/404.png',
      'route': '/challenges/404'
    },
    {
      'name': 'Collections List',
      'preview': '/assets/challenges/collections.png',
      'route': '/challenges/collections'
    }
  ];

  constructor(private router: Router) {}

  responsiveOptions: any[] | undefined;

  navigateToChallenge(route: string) {
    this.router.navigate([route]);
  };
}
