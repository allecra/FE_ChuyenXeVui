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
    this.isMobile = window.innerWidth <= 768;
  }

  get currentStations() {
    // Trên mobile hiển thị tất cả, trên desktop phân trang
    if (this.isMobile) {
      return this.stations;
    }
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.stations.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.stations.length / this.itemsPerPage);
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
      console.log('Previous stations page:', this.currentPage);
    }
  }

  onNextClick() {
    if (this.canGoNext) {
      this.currentPage++;
      console.log('Next stations page:', this.currentPage);
    }
  }

  navigateToStations() {
    this.router.navigate(['/bus-stations']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}