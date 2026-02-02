import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnDestroy {
  searchForm = {
    departure: '',
    destination: '',
    departureDate: ''
  };

  isSearchExpanded = false;
  expandedSearchQuery = '';

  onSearch() {
    console.log('Tìm kiếm:', this.searchForm);
    // Thực hiện logic tìm kiếm ở đây
  }

  onDepartureClick() {
    // Logic để mở dropdown chọn điểm khởi hành
    console.log('Chọn điểm khởi hành');
  }

  onDestinationClick() {
    // Logic để mở dropdown chọn điểm đến
    console.log('Chọn điểm đến');
  }

  // Mở tìm kiếm mở rộng
  openExpandedSearch() {
    this.isSearchExpanded = true;
    // Prevent body scroll when overlay is open
    document.body.style.overflow = 'hidden';
    // Focus vào input sau khi mở
    setTimeout(() => {
      const searchInput = document.querySelector('.expanded-search-input') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  }

  // Đóng tìm kiếm mở rộng
  closeExpandedSearch() {
    this.isSearchExpanded = false;
    this.expandedSearchQuery = '';
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Xử lý tìm kiếm mở rộng
  onExpandedSearch() {
    if (this.expandedSearchQuery.trim()) {
      console.log('Tìm kiếm mở rộng:', this.expandedSearchQuery);
      // Thực hiện logic tìm kiếm với từ khóa
      // Có thể redirect đến trang kết quả tìm kiếm
    }
  }

  // Xử lý phím Enter trong tìm kiếm mở rộng
  onExpandedSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onExpandedSearch();
    } else if (event.key === 'Escape') {
      this.closeExpandedSearch();
    }
  }

  // Cleanup khi component bị destroy
  ngOnDestroy() {
    // Restore body scroll nếu overlay đang mở
    if (this.isSearchExpanded) {
      document.body.style.overflow = '';
    }
  }
}