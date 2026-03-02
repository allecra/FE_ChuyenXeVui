import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrangeCardComponent } from '../shared/orange-card/orange-card.component';
import { SliderSectionComponent } from '../shared/slider-section/slider-section.component';
import { BusCompaniesService, BusCompany } from '../../services/bus-companies.service';

@Component({
  selector: 'app-popular-companies',
  standalone: true,
  imports: [CommonModule, OrangeCardComponent, SliderSectionComponent],
  templateUrl: './popular-companies.component.html',
  styleUrls: ['./popular-companies.component.scss']
})
export class PopularCompaniesComponent {
  currentPage = 0;
  itemsPerPage = 4;
  isMobile = false;
  companies: BusCompany[] = [];

  constructor(
    private busCompaniesService: BusCompaniesService,
    private router: Router
  ) {
    this.companies = this.busCompaniesService.getPopularCompanies();
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  get currentCompanies() {
    // Trên mobile hiển thị tất cả, trên desktop phân trang
    if (this.isMobile) {
      return this.companies;
    }
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.companies.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.companies.length / this.itemsPerPage);
  }

  get canGoPrev() {
    return !this.isMobile && this.currentPage > 0;
  }

  get canGoNext() {
    return !this.isMobile && this.currentPage < this.totalPages - 1;
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

  navigateToCompanies() {
    this.router.navigate(['/bus-companies']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}