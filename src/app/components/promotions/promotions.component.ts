import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent {
  currentBanner = 0;
  
  banners = [
    {
      image: 'uudainoibat.jpg',
      alt: 'Ưu đãi nổi bật 1'
    },
    {
      image: 'uudai.jpg', 
      alt: 'Ưu đãi nổi bật 2'
    }
  ];

  get currentBannerData() {
    return this.banners[this.currentBanner];
  }

  get totalBanners() {
    return this.banners.length;
  }

  get canGoPrev() {
    return this.currentBanner > 0;
  }

  get canGoNext() {
    return this.currentBanner < this.totalBanners - 1;
  }

  onPrevClick() {
    if (this.canGoPrev) {
      this.currentBanner--;
      console.log('Previous banner:', this.currentBanner);
    }
  }

  onNextClick() {
    if (this.canGoNext) {
      this.currentBanner++;
      console.log('Next banner:', this.currentBanner);
    }
  }
}