import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Payment {
  id: number;
  transactionId: string;
  transaction_id: string;
  provider: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  paidAt: any;
  paid_at: any;
  createdAt: any;
  created_at: any;
  userId: number;
  user_id: number;
  ticketId: number;
  ticket_id: number;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api/api/payment/admin';

  payments: Payment[] = [];
  loading = false;
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  filterStatus = '';

  // Stats
  totalRevenue = 0;
  totalCount = 0;
  pendingCount = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
    this.loadReport();
  }

  load() {
    this.loading = true;
    let url = `${this.API}/payments?page=${this.currentPage}&size=${this.pageSize}`;
    if (this.filterStatus) {
      url = `${this.API}/payments/status/${this.filterStatus}?page=${this.currentPage}&size=${this.pageSize}`;
    }
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const data = res?.data;
        const content: Payment[] = data?.content || [];
        // Áp dụng status override từ localStorage
        content.forEach(p => {
          const override = localStorage.getItem(`payment_status_${p.id}`);
          if (override) p.status = override;
        });
        this.payments = content;
        this.totalElements = data?.total_elements || data?.totalElements || 0;
        this.totalPages = data?.total_pages || data?.totalPages || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  loadReport() {
    this.http.get<any>(`${this.API}/payments?page=0&size=200`).subscribe({
      next: (res) => {
        const all: any[] = res?.data?.content || [];
        this.totalCount = res?.data?.total_elements || res?.data?.totalElements || all.length;

        // Tính doanh thu từ COMPLETED (kể cả localStorage overrides)
        let revenue = 0;
        let pending = 0;
        all.forEach(p => {
          const override = localStorage.getItem(`payment_status_${p.id}`);
          const status = override || p.status;
          if (status === 'COMPLETED') {
            revenue += Number(p.amount || 0);
          }
          if (status === 'PENDING') pending++;
        });
        this.totalRevenue = revenue;
        this.pendingCount = pending;
      },
      error: () => {}
    });
  }

  openDropdownId: number | null = null;

  statusOptions = [
    { value: 'PENDING',   label: 'Chờ xử lý',  color: '#f59e0b' },
    { value: 'COMPLETED', label: 'Thành công',  color: '#22c55e' },
    { value: 'FAILED',    label: 'Thất bại',    color: '#ef4444' },
    { value: 'REFUNDED',  label: 'Đã hoàn',     color: '#8b5cf6' },
    { value: 'CANCELLED', label: 'Đã hủy',      color: '#6b7280' },
  ];

  toggleDropdown(id: number) {
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }
  onFilterChange() { this.currentPage = 0; this.load(); }
  goToPage(p: number) { if (p < 0 || p >= this.totalPages) return; this.currentPage = p; this.load(); }

  updateStatus(p: Payment, newStatus: string) {
    if (newStatus === p.status) { this.openDropdownId = null; return; }
    localStorage.setItem(`payment_status_${p.id}`, newStatus);
    p.status = newStatus;
    this.openDropdownId = null;

    // Cập nhật lại doanh thu
    this.loadReport();

    if (newStatus === 'REFUNDED') {
      const txnId = this.getField(p, 'transactionId', 'transaction_id');
      this.http.post<any>('http://localhost:8080/api/payment/refund',
        { transactionId: txnId, reason: 'Admin manual refund' },
        { withCredentials: true }
      ).subscribe({ next: () => {}, error: () => {} });
    }
  }

  getField(p: any, camel: string, snake: string): any {
    return p[camel] ?? p[snake];
  }

  formatCurrency(val: number): string {
    if (!val) return '0đ';
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  }

  formatDate(val: any): string {
    if (!val) return '—';
    if (Array.isArray(val)) {
      const [y, m, d] = val;
      return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;
    }
    try { return new Date(val).toLocaleDateString('vi-VN'); } catch { return '—'; }
  }

  getStatusClass(s: string): string {
    const m: Record<string, string> = {
      COMPLETED: 'badge--active', PENDING: 'badge--pending',
      FAILED: 'badge--blocked', REFUNDED: 'badge--refunded', CANCELLED: 'badge--blocked'
    };
    return m[s] || 'badge--pending';
  }

  getStatusLabel(s: string): string {
    const m: Record<string, string> = {
      COMPLETED: 'Thành công', PENDING: 'Chờ xử lý',
      FAILED: 'Thất bại', REFUNDED: 'Đã hoàn', CANCELLED: 'Đã hủy'
    };
    return m[s] || s;
  }

  get pages(): number[] {
    const total = this.totalPages;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    const cur = this.currentPage;
    const result: number[] = [0];
    if (cur > 2) result.push(-1);
    for (let i = Math.max(1, cur - 1); i <= Math.min(total - 2, cur + 1); i++) result.push(i);
    if (cur < total - 3) result.push(-1);
    result.push(total - 1);
    return result;
  }
}
