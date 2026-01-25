import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-companies.component.html',
  styleUrls: ['./popular-companies.component.scss']
})
export class PopularCompaniesComponent {
  currentPage = 0;
  itemsPerPage = 4;
  
  companies = [
    {
      name: 'Nhà xe An Hòa Hiệp',
      image: 'nha-xe-an-hoa-hiep-ca-mau-kon-tum-jpg.png',
      type: 'img'
    },
    {
      name: 'Nhà xe Futa Hà Sơn',
      image: 'image.jpg',
      type: 'img'
    },
    {
      name: 'Nhà xe Vũ Linh',
      image: 'nha-xe-vu-linh-limousine-chat-luong-png.png',
      type: 'bg'
    },
    {
      name: 'Nhà xe Toàn Thắng',
      image: 'nha-xe-toan-thang-vung-tau-jpg.png',
      type: 'bg'
    },
    {
      name: 'Nhà xe Phương Trang',
      image: 'phuong-trang-bus.jpg',
      type: 'img'
    }
  ];

  get currentCompanies() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.companies.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.companies.length / this.itemsPerPage);
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
      console.log('Previous companies page:', this.currentPage);
    }
  }

  onNextClick() {
    if (this.canGoNext) {
      this.currentPage++;
      console.log('Next companies page:', this.currentPage);
    }
  }

}