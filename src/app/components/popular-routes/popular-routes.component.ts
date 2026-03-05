import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrangeCardComponent } from '../shared/orange-card/orange-card.component';
import { SliderSectionComponent } from '../shared/slider-section/slider-section.component';
import { RoutesService, BusRoute } from '../../services/routes.service';

@Component({
  selector: 'app-popular-routes',
  standalone: true,
  imports: [CommonModule, OrangeCardComponent, SliderSectionComponent],
  templateUrl: './popular-routes.component.html',
  styleUrls: ['./popular-routes.component.scss']
})
export class PopularRoutesComponent {
  currentPage = 0;
  itemsPerPage = 4;
  isMobile = false;
  routes: BusRoute[] = [];

  constructor(
    private routesService: RoutesService,
    private router: Router
  ) {
    this.routes = this.routesService.getPopularRoutes();
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  get currentRoutes() {
    // Trên mobile hiển thị tất cả, trên desktop phân trang
    if (this.isMobile) {
      return this.routes;
    }
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.routes.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.routes.length / this.itemsPerPage);
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
      console.log('Previous page:', this.currentPage);
    }
  }

  onNextClick() {
    if (this.canGoNext) {
      this.currentPage++;
      console.log('Next page:', this.currentPage);
    }
  }

  navigateToRoutes() {
    this.router.navigate(['/routes']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}