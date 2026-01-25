import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-stations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-stations.component.html',
  styleUrls: ['./popular-stations.component.scss']
})
export class PopularStationsComponent {
  currentPage = 0;
  itemsPerPage = 4;
  
  stations = [
    {
      name: 'Bến xe Miền Đông Mới',
      image: 'BX-1-jpg.png'
    },
    {
      name: 'Bến xe Miền Tây',
      image: 'be-CC-81n-jpg.png'
    },
    {
      name: 'Bến xe Giáp Bát',
      image: 'ben-giap-bat-1-jpg.png'
    },
    {
      name: 'Bến xe Mỹ Đình',
      image: 'my-dinh-2-jpg.png'
    },
    {
      name: 'Bến xe An Sương',
      image: 'an-suong-station.jpg'
    }
  ];

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
      console.log('Previous stations page:', this.currentPage);
    }
  }

  onNextClick() {
    if (this.canGoNext) {
      this.currentPage++;
      console.log('Next stations page:', this.currentPage);
    }
  }

}