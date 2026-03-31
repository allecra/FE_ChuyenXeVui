import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface Review {
  id: number;
  rating: number;
  comment: string;
  status: string;
  createdAt: any;
  userName: string;
  userEmail: string;
  busCompanyName: string;
  routeName: string;
  departureLocation: string;
  arrivalLocation: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api/api/admin/reviews';

  reviews: Review[] = [];
  loading = false;
  keyword = '';
  filterRating = '';
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  avgRating = 0;

  private search$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.search$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => { this.currentPage = 0; this.load(); });
    this.load();
    this.loadStats();
  }

  load() {
    this.loading = true;
    let url = `${this.API}?page=${this.currentPage}&size=${this.pageSize}`;
    if (this.keyword.trim()) url += `&keyword=${encodeURIComponent(this.keyword)}`;
    if (this.filterRating) url += `&rating=${this.filterRating}`;
    this.http.get<any>(url, { withCredentials: true }).subscribe({
      next: (res) => {
        const data = res?.data;
        this.reviews = data?.content || [];
        this.totalElements = data?.total_elements || data?.totalElements || 0;
        this.totalPages = data?.total_pages || data?.totalPages || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  loadStats() {
    this.http.get<any>(`${this.API}/statistics`, { withCredentials: true }).subscribe({
      next: (res) => {
        const d = res?.data;
        if (d && d.totalReviews > 0) {
          // Tính avg từ approved reviews — BE không trả avgRating nên tính từ danh sách
          this.loadAvgRating();
        } else {
          this.avgRating = 0;
        }
      }
    });
  }

  loadAvgRating() {
    // Load tất cả reviews để tính avg
    this.http.get<any>(`${this.API}?page=0&size=100`, { withCredentials: true }).subscribe({
      next: (res) => {
        const reviews = res?.data?.content || [];
        if (reviews.length > 0) {
          const sum = reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
          this.avgRating = Math.round((sum / reviews.length) * 10) / 10;
        } else {
          this.avgRating = 0;
        }
      }
    });
  }

  onSearch() { this.search$.next(); }
  onFilterChange() { this.currentPage = 0; this.load(); }
  goToPage(p: number) { if (p < 0 || p >= this.totalPages) return; this.currentPage = p; this.load(); }

  approve(r: Review) {
    this.http.post<any>(`${this.API}/${r.id}/approve`, {}, { withCredentials: true })
      .subscribe({ next: () => this.load() });
  }

  reject(r: Review) {
    const reason = prompt('Lý do từ chối:');
    if (reason === null) return;
    this.http.post<any>(`${this.API}/${r.id}/reject`, { reason }, { withCredentials: true })
      .subscribe({ next: () => this.load() });
  }

  delete(r: Review) {
    if (!confirm('Xóa đánh giá này?')) return;
    // BE không có delete endpoint — ẩn bằng reject
    this.reject(r);
  }

  getStatusClass(s: string): string {
    const m: Record<string, string> = { APPROVED: 'badge--show', PENDING: 'badge--hide', REJECTED: 'badge--hide' };
    return m[s] || 'badge--hide';
  }

  getStatusLabel(s: string): string {
    const m: Record<string, string> = { APPROVED: 'Hiện', PENDING: 'Chờ', REJECTED: 'Ẩn' };
    return m[s] || s;
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.trim().split(' ').map(w => w[0]).slice(0, 1).join('').toUpperCase();
  }

  stars(rating: number): number[] { return Array.from({ length: 5 }, (_, i) => i + 1); }

  truncate(text: string, len = 30): string {
    if (!text) return '—';
    return text.length > len ? text.substring(0, len) + '...' : text;
  }

  formatDate(val: any): string {
    if (!val) return '—';
    if (Array.isArray(val)) {
      const [y, m, d] = val;
      return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;
    }
    return new Date(val).toLocaleDateString('vi-VN');
  }

  formatTime(val: any): string {
    if (!val) return '';
    if (Array.isArray(val)) {
      const [,, , h=0, min=0] = val;
      return `${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
    }
    return new Date(val).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }

  get pages(): number[] {
    const total = this.totalPages;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    const cur = this.currentPage;
    const pages: number[] = [0];
    if (cur > 2) pages.push(-1);
    for (let i = Math.max(1, cur - 1); i <= Math.min(total - 2, cur + 1); i++) pages.push(i);
    if (cur < total - 3) pages.push(-1);
    pages.push(total - 1);
    return pages;
  }
}
