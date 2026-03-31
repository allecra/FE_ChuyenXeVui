import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

interface StatCard { label: string; value: string; change: string; up: boolean; icon: string; color: string; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api';

  stats: StatCard[] = [
    { label: 'TỔNG DOANH THU', value: '...', change: '...', up: true,  icon: '$',  color: '#22c55e' },
    { label: 'TỔNG GIAO DỊCH', value: '...', change: '...', up: true,  icon: '💳', color: '#3b82f6' },
    { label: 'NHÀ XE',         value: '...', change: '...', up: true,  icon: '🚌', color: '#f97316' },
    { label: 'KHÁCH HÀNG',     value: '...', change: '...', up: true,  icon: '👥', color: '#8b5cf6' },
  ];

  recentCompanies: any[] = [];
  recentUsers: any[] = [];
  loadingCompanies = true;
  loadingUsers = true;

  chartDays = ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','CN'];
  revenueByDay: number[] = [0,0,0,0,0,0,0];
  paymentsByDay: number[] = [0,0,0,0,0,0,0];
  revenueMax = 1;
  paymentsMax = 1;
  chartLoading = true;

  providerStats: { name: string; value: number; color: string }[] = [];
  hoveredSlice: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadChartData();
    this.loadRecentCompanies();
    this.loadRecentUsers();
    this.loadPaymentStats();
  }

  loadChartData() {
    this.http.get<any>(`${this.API}/api/payment/admin/reports`, { withCredentials: true })
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        const d = res?.data;
        const totalPmt = Number(d?.totalPayments || d?.total_payments || 0);

        this.http.get<any>(`${this.API}/api/payment/admin/payments?page=0&size=100`, { withCredentials: true })
          .pipe(catchError(() => of(null)))
          .subscribe(pmtRes => {
            const payments: any[] = pmtRes?.data?.content || [];
            let totalRevenue = 0, completedCount = 0;
            payments.forEach(p => {
              const override = localStorage.getItem(`payment_status_${p.id}`);
              const status = override || p.status || p.payment_status;
              if (status === 'COMPLETED') { totalRevenue += Number(p.amount || 0); completedCount++; }
            });
            this.stats[0].value  = this.formatCurrency(totalRevenue);
            this.stats[0].change = completedCount > 0 ? `+${completedCount} thành công` : '—';
            this.stats[0].up     = completedCount > 0;
            this.revenueByDay    = this.mockDistribute(totalRevenue, 7);
            this.paymentsByDay   = this.mockDistribute(totalPmt, 7);
            this.revenueMax      = Math.max(...this.revenueByDay, 1);
            this.paymentsMax     = Math.max(...this.paymentsByDay, 1);
            this.chartLoading    = false;
          });
      });
  }

  mockDistribute(total: number, days: number): number[] {
    if (total === 0) return new Array(days).fill(0);
    const w = [0.1, 0.12, 0.13, 0.15, 0.14, 0.18, 0.18];
    return w.map(x => Math.round(total * x));
  }

  getRevH(val: number): number { return this.revenueMax <= 0 ? 0 : Math.round((val / this.revenueMax) * 150); }
  getPmtH(val: number): number { return this.paymentsMax <= 0 ? 0 : Math.round((val / this.paymentsMax) * 150); }

  get revLinePoints(): string { return this.revenueByDay.map((v,i) => `${i*80},${170-this.getRevH(v)}`).join(' '); }
  get revAreaPath(): string {
    const pts = this.revenueByDay.map((v,i) => `${i*80},${170-this.getRevH(v)}`).join(' L');
    return `M${pts} L${(this.revenueByDay.length-1)*80},180 L0,180 Z`;
  }
  get pmtLinePoints(): string { return this.paymentsByDay.map((v,i) => `${i*80},${170-this.getPmtH(v)}`).join(' '); }

  loadPaymentStats() {
    this.http.get<any>(`${this.API}/api/payment/admin/reports`, { withCredentials: true }).subscribe({
      next: (res) => {
        const d = res?.data;
        const total = Number(d?.totalPayments || d?.total_payments || 0);
        this.stats[1].value  = this.formatNumber(total);
        this.stats[1].change = total > 0 ? '+8.3%' : '—';
        this.stats[1].up     = total > 0;

        let completed = Number(d?.completedPayments || d?.completed_payments || 0);
        let pending   = Number(d?.pendingPayments   || d?.pending_payments   || 0);
        let failed    = Number(d?.failedPayments    || d?.failed_payments    || 0);
        let refunded  = Number(d?.refundedPayments  || d?.refunded_payments  || 0);
        let cancelled = Number(d?.cancelledPayments || d?.cancelled_payments || 0);

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i) || '';
          if (key.startsWith('payment_status_')) {
            const newStatus = localStorage.getItem(key) || '';
            pending = Math.max(0, pending - 1);
            if (newStatus === 'COMPLETED') completed++;
            else if (newStatus === 'FAILED') failed++;
            else if (newStatus === 'REFUNDED') refunded++;
            else if (newStatus === 'CANCELLED') cancelled++;
            else pending++;
          }
        }

        this.providerStats = [
          { name: 'Thành công', value: completed, color: '#22c55e' },
          { name: 'Chờ xử lý', value: pending,   color: '#f59e0b' },
          { name: 'Thất bại',  value: failed,    color: '#ef4444' },
          { name: 'Đã hoàn',   value: refunded,  color: '#8b5cf6' },
          { name: 'Đã hủy',    value: cancelled, color: '#6b7280' },
        ].filter(s => s.value > 0);
      },
      error: () => {}
    });
  }

  get donutTotal(): number { return this.providerStats.reduce((s,x) => s + x.value, 0) || 1; }

  getSlicePct(index: number): number {
    return Math.round((this.providerStats[index].value / this.donutTotal) * 1000) / 10;
  }

  private polarToXY(deg: number, r: number): { x: number; y: number } {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: +(50 + r * Math.cos(rad)).toFixed(3), y: +(50 + r * Math.sin(rad)).toFixed(3) };
  }

  getSlicePath(index: number): string {
    const total = this.donutTotal;
    if (total <= 0) return '';
    const GAP = 1.5, RO = 42, RI = 28;
    let startAngle = 0;
    for (let i = 0; i < index; i++) startAngle += (this.providerStats[i].value / total) * 360;
    const sliceAngle = (this.providerStats[index].value / total) * 360;
    const s = startAngle + GAP / 2;
    const e = startAngle + sliceAngle - GAP / 2;
    if (e <= s) return '';
    const largeArc = (e - s) > 180 ? 1 : 0;
    const o1 = this.polarToXY(s, RO), o2 = this.polarToXY(e, RO);
    const i1 = this.polarToXY(e, RI), i2 = this.polarToXY(s, RI);
    return `M ${o1.x} ${o1.y} A ${RO} ${RO} 0 ${largeArc} 1 ${o2.x} ${o2.y} L ${i1.x} ${i1.y} A ${RI} ${RI} 0 ${largeArc} 0 ${i2.x} ${i2.y} Z`;
  }

  loadRecentCompanies() {
    this.http.get<any>(`${this.API}/api/admin/bus-companies/registrations?page=0&size=5`).subscribe({
      next: (res) => {
        const data = res?.data;
        this.recentCompanies = data?.content || [];
        const total = data?.total_elements || data?.totalElements || 0;
        this.stats[2].value  = this.formatNumber(total);
        this.stats[2].change = total > 0 ? '+5%' : '—';
        this.stats[2].up     = total > 0;
        this.loadingCompanies = false;
      },
      error: () => { this.loadingCompanies = false; }
    });
  }

  loadRecentUsers() {
    this.http.get<any>(`${this.API}/admin/users?page=0&size=5`).subscribe({
      next: (res) => {
        const data = res?.data;
        this.recentUsers = data?.content || [];
        const total = data?.total_elements || data?.totalElements || this.recentUsers.length;
        this.stats[3].value  = this.formatNumber(total);
        this.stats[3].change = total > 0 ? '+12%' : '—';
        this.stats[3].up     = total > 0;
        this.loadingUsers = false;
      },
      error: () => { this.loadingUsers = false; }
    });
  }

  formatCurrency(val: number): string {
    if (!val) return '0đ';
    return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  }

  formatNumber(val: number): string {
    if (!val) return '0';
    return new Intl.NumberFormat('vi-VN').format(val);
  }

  getStatusClass(status: string): string {
    const m: Record<string,string> = { PENDING:'badge--pending', APPROVED:'badge--active', ACTIVE:'badge--active', REJECTED:'badge--blocked', INACTIVE:'badge--blocked' };
    return m[status?.toUpperCase()] || 'badge--pending';
  }

  getStatusLabel(status: string): string {
    const m: Record<string,string> = { PENDING:'Chờ duyệt', APPROVED:'Hoạt động', ACTIVE:'Hoạt động', REJECTED:'Đã khóa', INACTIVE:'Đã khóa' };
    return m[status?.toUpperCase()] || status;
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map((w:string) => w[0]).slice(0,2).join('').toUpperCase();
  }

  formatDate(val: any): string {
    if (!val) return '—';
    if (Array.isArray(val)) { const [y,m,d] = val; return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`; }
    try { return new Date(val).toLocaleDateString('vi-VN'); } catch { return '—'; }
  }
}
