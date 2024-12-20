import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

interface Picture {
  main: string;
  small: string[];
  category: string;
  quantity: string;
}

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './collections.component.html'
})
export class CollectionsComponent {

  pictures: Picture[] = [
    {
      'main': '/assets/collections/main/street.jpg',
      'small': [
        '/assets/collections/small/woman.jpg',
        '/assets/collections/small/woman2.jpg',
        '/assets/collections/small/woman3.jpg'
      ],
      'category': 'People',
      'quantity': '144'
    },
    {
      'main': '/assets/collections/main/view.jpg',
      'small': [
        '/assets/collections/small/view2.jpg',
        '/assets/collections/small/view3.jpg',
        '/assets/collections/small/view4.jpg'
      ],
      'category': 'Nature',
      'quantity': '7k'
    },
    {
      'main': '/assets/collections/main/city.jpg',
      'small': [
        '/assets/collections/small/city2.jpg',
        '/assets/collections/small/city3.jpg',
        '/assets/collections/small/city4.jpg'
      ],
      'category': 'City',
      'quantity': '431'
    },
    {
      'main': '/assets/collections/main/fashion.jpg',
      'small': [
        '/assets/collections/small/fashion2.jpg',
        '/assets/collections/small/fashion3.jpg',
        '/assets/collections/small/fashion4.jpg'
      ],
      'category': 'Fashion',
      'quantity': '12k'
    },
    {
      'main': '/assets/main/people.jpg',
      'small': [
        '/assets/small/people2.jpg',
        '/assets/small/people3.jpg',
        '/assets/small/people4.jpg'
      ],
      'category': 'People',
      'quantity': '11'
    },
    {
      'main': '/assets/main/nature.jpg',
      'small': [
        '/assets/small/nature2.jpg',
        '/assets/small/nature3.jpg',
        '/assets/small/nature4.jpg'
      ],
      'category': 'Nature',
      'quantity': '827'
    }
  ];

  categories: string[] = [];
  filteredPictures: Picture[] = [];
  selectedCategory: string = 'All';
  selectedModalPicture: Picture | null = null;
  selectedMainImage: string = '';
  showModal: boolean = false;
  selectedPicture: Picture | null = null;

  ngOnInit() {
    this.categories = ['All', ...new Set(this.pictures.map(pic => pic.category))];
    this.filterPictures('All');
  }

  filterPictures(category: string) {
    this.selectedCategory = category;
    this.filteredPictures = category === 'All' 
      ? this.pictures 
      : this.pictures.filter(pic => pic.category === category);
    this.filteredPictures = this.filteredPictures.slice(0, 3);
  }

  openModal(picture: Picture) {
    this.selectedPicture = picture;
    this.selectedMainImage = picture.main;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedModalPicture = null;
  }

  updateMainImage(imageUrl: string) {
    this.selectedMainImage = imageUrl;
  }
}
