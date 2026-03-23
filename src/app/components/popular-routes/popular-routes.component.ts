import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SliderSectionComponent } from '../shared/slider-section/slider-section.component';
import { RoutesService, BusRoute } from '../../services/routes.service';

@Component({
  selector: 'app-popular-routes',
  standalone: true,
  imports: [CommonModule, SliderSectionComponent],
  templateUrl: './popular-routes.component.html',
  styleUrls: ['./popular-routes.component.scss']
})
export class PopularRoutesComponent {
  currentPage = 0;
  itemsPerPage = 4;
  isMobile = false;
  isTablet = false;
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
    const w = window.innerWidth;
    this.isMobile = w <= 480;
    this.isTablet = w > 480 && w <= 768;
    this.itemsPerPage = this.isTablet ? 3 : 4;
    if (this.isMobile) {
      this.itemsPerPage = 1;
    }
  }

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
    }
  }

  onNextClick() {
    if (this.canGoNext) {
      this.currentPage++;
    }
  }

  navigateToRoutes() {
    this.router.navigate(['/routes']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}