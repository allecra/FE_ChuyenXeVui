import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrangeCardComponent } from '../shared/orange-card/orange-card.component';
import { SliderSectionComponent } from '../shared/slider-section/slider-section.component';
import { BusStationsService, BusStation } from '../../services/bus-stations.service';

@Component({
  selector: 'app-popular-stations',
  standalone: true,
  imports: [CommonModule, OrangeCardComponent, SliderSectionComponent],
  templateUrl: './popular-stations.component.html',
  styleUrls: ['./popular-stations.component.scss']
})
export class PopularStationsComponent {
  currentPage = 0;
  itemsPerPage = 4;
  isMobile = false;
  isTablet = false;
  stations: BusStation[] = [];

  constructor(
    private busStationsService: BusStationsService,
    private router: Router
  ) {
    this.stations = this.busStationsService.getPopularStations();
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

  get currentStations() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.stations.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.stations.length / this.itemsPerPage);
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

  navigateToStations() {
    this.router.navigate(['/bus-stations']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}