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
    console.log('🎯 SearchOverlayComponent initialized');
    // Subscribe vào search service để lắng nghe sự kiện mở search overlay
    this.searchSubscription = this.searchService.searchOverlay$.subscribe(
      (shouldOpen) => {
        console.log('📨 SearchOverlay received event:', shouldOpen);
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
    console.log('🚀 Opening search overlay');
    this.isSearchExpanded = true;
    // Prevent body scroll when overlay is open
    document.body.style.overflow = 'hidden';
    // Focus vào input sau khi mở
    setTimeout(() => {
      const searchInput = document.querySelector('.expanded-search-input') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        console.log('✅ Search input focused');
      } else {
        console.error('❌ Search input not found!');
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
      console.log('Tìm kiếm mở rộng:', this.expandedSearchQuery);
      // TODO: Thực hiện logic tìm kiếm (ví dụ: điều hướng tới trang kết quả)
      // Hiện tại chỉ log lại, giữ nguyên overlay để người dùng không bị thoát ra ngoài
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
