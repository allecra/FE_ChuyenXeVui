import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-routes.component.html',
  styleUrls: ['./popular-routes.component.scss']
})
export class PopularRoutesComponent {
  currentPage = 0;
  itemsPerPage = 4;
  
  routes = [
    {
      name: 'Sài Gòn – Vũng Tàu',
      price: '150.000đ',
      image: 'saigon-vungtau-route.jpg'
    },
    {
      name: 'Sài Gòn- Mũi Né',
      price: '180.000đ',
      image: 'saigon-muine-route.jpg'
    },
    {
      name: 'Sài Gòn – Nha Trang',
      price: '240.000đ',
      image: 'saigon-nhatrang-route.jpg'
    },
    {
      name: 'Nha Trang – Đà Lạt',
      price: '200.000đ',
      image: 'nhatrang-dalat-route.jpg'
    },
    {
      name: 'Bắc Ninh – Hà Nội',
      price: '80.000đ',
      image: 'bacninh-hanoi-route.jpg'
    }
  ];

  get currentRoutes() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.routes.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.routes.length / this.itemsPerPage);
  }

  get canGoPrev() {
    return this.currentPage > 0;
  }

  get canGoNext() {
    return this.currentPage < this.totalPages - 1;
  }

  onPrevClick() {
    if (this.canGoPrev) {
      this.currentPage--;
      console.log('Previous page:', this.currentPage);
    }
  }

  onNextClick() {
    if (this.canGoNext) {
      this.currentPage++;
      console.log('Next page:', this.currentPage);
    }
  }
}