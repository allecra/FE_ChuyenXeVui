import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination" *ngIf="totalPages > 1 && !isLoading">
      <!-- First page button -->
      <button 
        class="pagination-btn first-btn" 
        [disabled]="currentPage === 1 || isLoading"
        (click)="onPageChange(1)">
        ≪
      </button>
      
      <!-- Previous page button -->
      <button 
        class="pagination-btn prev-btn" 
        [disabled]="!canGoPrev || isLoading"
        (click)="onPageChange(currentPage - 1)">
        ‹
      </button>
      
      <!-- Page numbers -->
      <div class="page-numbers">
        <button 
          *ngFor="let page of getVisiblePages()"
          class="page-number"
          [class.active]="page === currentPage"
          [class.ellipsis]="page === -1"
          [disabled]="isLoading || page === -1"
          (click)="page !== -1 && onPageChange(page)">
          {{ page === -1 ? '...' : page }}
        </button>
      </div>
      
      <!-- Next page button -->
      <button 
        class="pagination-btn next-btn"
        [disabled]="!canGoNext || isLoading"
        (click)="onPageChange(currentPage + 1)">
        ›
      </button>
      
      <!-- Last page button -->
      <button 
        class="pagination-btn last-btn"
        [disabled]="currentPage === totalPages || isLoading"
        (click)="onPageChange(totalPages)">
        ≫
      </button>
    </div>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() isLoading: boolean = false;
  
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && !this.isLoading) {
      this.pageChange.emit(page);
    }
  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const maxVisible = 7; // Số trang hiển thị tối đa (không tính ellipsis)
    
    if (this.totalPages <= maxVisible) {
      // Nếu tổng số trang ít, hiển thị tất cả
      for (let i = 1; i <= this.totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Logic phức tạp hơn với ellipsis
      if (this.currentPage <= 4) {
        // Đầu danh sách: 1 2 3 4 5 ... 10
        for (let i = 1; i <= 5; i++) {
          visiblePages.push(i);
        }
        visiblePages.push(-1); // ellipsis
        visiblePages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 3) {
        // Cuối danh sách: 1 ... 6 7 8 9 10
        visiblePages.push(1);
        visiblePages.push(-1); // ellipsis
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        // Giữa danh sách: 1 ... 4 5 6 ... 10
        visiblePages.push(1);
        visiblePages.push(-1); // ellipsis
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          visiblePages.push(i);
        }
        visiblePages.push(-1); // ellipsis
        visiblePages.push(this.totalPages);
      }
    }
    
    return visiblePages;
  }

  get canGoPrev(): boolean {
    return this.currentPage > 1;
  }

  get canGoNext(): boolean {
    return this.currentPage < this.totalPages;
  }
}