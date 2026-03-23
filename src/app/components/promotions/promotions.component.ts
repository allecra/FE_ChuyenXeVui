import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderSectionComponent } from '../shared/slider-section/slider-section.component';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, SliderSectionComponent],
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit, OnDestroy {
  currentBanner = 0;
  private autoSlideInterval: any;
  private autoSlideDelay = 2000; // 2 giây
  
  banners = [
    {
      image: 'uudainoibat.jpg',
      alt: 'Ưu đãi nổi bật 1'
    },
    {
      image: 'uudai.jpg', 
      alt: 'Ưu đãi nổi bật 2'
    },
    {
      image: 'uudainoibat.jpg',
      alt: 'Ưu đãi nổi bật 3'
    }
  ];

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

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

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  nextSlide() {
    if (this.currentBanner < this.totalBanners - 1) {
      this.currentBanner++;
    } else {
      this.currentBanner = 0; // Quay về ảnh đầu tiên
    }
  }

  prevSlide() {
    if (this.currentBanner > 0) {
      this.currentBanner--;
    } else {
      this.currentBanner = this.totalBanners - 1; // Quay về ảnh cuối cùng
    }
  }

  onPrevClick() {
    this.prevSlide();
    this.restartAutoSlide();
  }

  onNextClick() {
    this.nextSlide();
    this.restartAutoSlide();
  }

  onBannerHover() {
    this.stopAutoSlide(); // Dừng auto-slide khi hover
  }

  onBannerLeave() {
    this.startAutoSlide(); // Tiếp tục auto-slide khi rời chuột
  }
}