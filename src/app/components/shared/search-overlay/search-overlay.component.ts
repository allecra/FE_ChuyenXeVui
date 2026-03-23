import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.scss']
})
export class SearchOverlayComponent implements OnInit, OnDestroy {
  isSearchExpanded = false;
  expandedSearchQuery = '';
  private searchSubscription?: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchSubscription = this.searchService.searchOverlay$.subscribe(
      (shouldOpen) => {
        if (shouldOpen) {
          this.openExpandedSearch();
        } else {
          this.closeExpandedSearch();
        }
      }
    );
  }

  // Mở tìm kiếm mở rộng
  openExpandedSearch() {
    this.isSearchExpanded = true;
    document.body.style.overflow = 'hidden';
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
    // Notify service
    this.searchService.closeSearchOverlay();
  }

  // Xử lý tìm kiếm mở rộng
  onExpandedSearch() {
    if (this.expandedSearchQuery.trim()) {
      // TODO: Thực hiện logic tìm kiếm (ví dụ: điều hướng tới trang kết quả)
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
    // Unsubscribe để tránh memory leak
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
