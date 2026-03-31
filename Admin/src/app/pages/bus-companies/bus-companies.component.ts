import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface BusCompany {
  id: number;
  company_name: string;
  companyName: string;
  descriptions: string;
  image: string;
  created_at: any;
  createdAt: any;
}

interface Registration {
  id: number;
  company_name: string;
  email: string;
  phone_number: string;
  image: string;
  descriptions: string;
  business_license: string;
  address: string;
  status: string;
  admin_notes: string;
  created_at: any;
}

@Component({
  selector: 'app-bus-companies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bus-companies.component.html',
  styleUrls: ['./bus-companies.component.css']
})
export class BusCompaniesComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api/api/admin/bus-companies';

  activeTab: 'all' | 'pending' = 'all';

  companies: any[] = [];
  loadingCompanies = false;
  keyword = '';
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;

  registrations: Registration[] = [];
  loadingRegs = false;
  regPage = 0;
  regTotal = 0;
  regTotalPages = 0;

  totalCompanies = 0;
  pendingCount = 0;
  activeCount = 0;

  showDetailModal = false;
  selectedReg: Registration | null = null;
  showRejectModal = false;
  rejectingId: number | null = null;
  rejectNote = '';
  actionLoading = false;

  private search$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.search$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => { this.currentPage = 0; this.loadCompanies(); });
    this.loadAllRegistrations();
    this.loadCompanies();
  }

  loadAllRegistrations() {
    this.http.get<any>(`${this.API}/registrations?page=0&size=1000`, { withCredentials: true }).subscribe({
      next: (res) => {
        const all: Registration[] = res?.data?.content || [];
        const pending = all.filter(r => r.status === 'PENDING');
        const approved = all.filter(r => r.status === 'APPROVED');
        this.registrations = pending;
        this.pendingCount = pending.length;
        this.activeCount = approved.length;
        this.totalCompanies = all.length;
        this.regTotal = pending.length;
        this.regTotalPages = Math.ceil(pending.length / this.pageSize) || 1;
      }
    });
  }

  loadCompanies() {
    this.loadingCompanies = true;
    // Dùng registrations để có đủ phone/email
    this.http.get<any>(`${this.API}/registrations?page=${this.currentPage}&size=${this.pageSize}`, { withCredentials: true }).subscribe({
      next: (res) => {
        const data = res?.data;
        this.companies = data?.content || [];
        this.totalElements = data?.total_elements || data?.totalElements || 0;
        this.totalPages = data?.total_pages || data?.totalPages || 0;
        this.loadingCompanies = false;
      },
      error: () => { this.loadingCompanies = false; }
    });
  }

  loadRegistrations() {
    this.loadingRegs = true;
    this.http.get<any>(`${this.API}/registrations?page=${this.regPage}&size=${this.pageSize}`, { withCredentials: true }).subscribe({
      next: (res) => {
        const data = res?.data;
        const all: Registration[] = data?.content || [];
        this.registrations = all.filter(r => r.status === 'PENDING');
        this.regTotal = this.registrations.length;
        this.regTotalPages = Math.ceil(this.regTotal / this.pageSize) || 1;
        this.pendingCount = this.registrations.length;
        this.loadingRegs = false;
      },
      error: () => { this.loadingRegs = false; }
    });
  }

  onSearch() { this.search$.next(this.keyword); }

  setTab(tab: 'all' | 'pending') {
    this.activeTab = tab;
    this.currentPage = 0;
    this.keyword = '';
    if (tab === 'all') this.loadCompanies();
    else this.loadRegistrations();
  }

  goToPage(p: number) {
    if (p < 0 || p >= this.totalPages) return;
    this.currentPage = p;
    this.loadCompanies();
  }

  goToRegPage(p: number) {
    if (p < 0 || p >= this.regTotalPages) return;
    this.regPage = p;
    this.loadRegistrations();
  }

  viewDetail(r: Registration) {
    this.selectedReg = r;
    this.showDetailModal = true;
  }

  closeDetail() { this.showDetailModal = false; this.selectedReg = null; }

  approve(r: Registration) {
    if (!confirm(`Duyệt đơn đăng ký của "${r.company_name}"?`)) return;
    this.actionLoading = true;
    this.http.post<any>(`${this.API}/registrations/${r.id}/approve`,
      { status: 'APPROVED', admin_notes: 'Đã duyệt' },
      { withCredentials: true }
    ).subscribe({
      next: () => { this.actionLoading = false; this.loadRegistrations(); this.closeDetail(); },
      error: (err) => { alert(err?.error?.message || 'Lỗi khi duyệt'); this.actionLoading = false; }
    });
  }

  openReject(r: Registration) {
    this.rejectingId = r.id;
    this.rejectNote = '';
    this.showRejectModal = true;
  }

  closeReject() { this.showRejectModal = false; this.rejectingId = null; }

  confirmReject() {
    if (!this.rejectingId) return;
    this.actionLoading = true;
    this.http.post<any>(`${this.API}/registrations/${this.rejectingId}/approve`,
      { status: 'REJECTED', admin_notes: this.rejectNote || 'Không đủ điều kiện' },
      { withCredentials: true }
    ).subscribe({
      next: () => { this.actionLoading = false; this.closeReject(); this.loadRegistrations(); },
      error: (err) => { alert(err?.error?.message || 'Lỗi khi từ chối'); this.actionLoading = false; }
    });
  }

  getCompanyName(c: any): string { return c.company_name || c.companyName || ''; }
  getPhone(c: any): string { return c.phone_number || '—'; }
  getEmail(c: any): string { return c.email || '—'; }
  getStatus(c: any): string { return c.status || ''; }

  getAvatarColor(name: string): string {
    const colors = ['#f97316', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444'];
    if (!name) return colors[0];
    return colors[name.charCodeAt(0) % colors.length];
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.trim().split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }

  // Edit company
  showEditModal = false;
  editingCompany: any = null;
  editCompanyName = '';
  editDescriptions = '';
  savingEdit = false;
  editError = '';

  openEditCompany(c: any) {
    this.editingCompany = c;
    this.editCompanyName = this.getCompanyName(c);
    this.editDescriptions = c.descriptions || '';
    this.editError = '';
    this.showEditModal = true;
  }

  closeEditCompany() { this.showEditModal = false; this.editingCompany = null; }

  saveEditCompany() {
    if (!this.editCompanyName.trim()) { this.editError = 'Tên nhà xe không được để trống'; return; }
    this.savingEdit = true;
    this.editError = '';

    const payload = {
      company_name: this.editCompanyName.trim(),
      descriptions: this.editDescriptions || ''
    };

    this.http.put<any>(`${this.API}/${this.editingCompany.id}`, payload, { withCredentials: true })
      .subscribe({
        next: () => { this.savingEdit = false; this.closeEditCompany(); this.loadCompanies(); },
        error: (err) => { this.editError = err?.error?.message || 'Lỗi khi cập nhật.'; this.savingEdit = false; }
      });
  }

  viewAllAsReg(c: any): Registration { return c as Registration; }

  formatDate(val: any): string {
    if (!val) return '—';
    if (Array.isArray(val)) {
      const [y, m, d] = val;
      return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
    }
    try { return new Date(val).toLocaleDateString('vi-VN'); } catch { return '—'; }
  }

  getStatusClass(status: string): string {
    const m: Record<string, string> = {
      ACTIVE: 'badge--active', INACTIVE: 'badge--inactive',
      PENDING: 'badge--pending', APPROVED: 'badge--active',
      REJECTED: 'badge--blocked', SUSPENDED: 'badge--blocked'
    };
    return m[status?.toUpperCase()] || 'badge--pending';
  }

  getStatusLabel(status: string): string {
    const m: Record<string, string> = {
      ACTIVE: 'Hoạt động', INACTIVE: 'Ngừng', PENDING: 'Chờ duyệt',
      APPROVED: 'Đã duyệt', REJECTED: 'Từ chối', SUSPENDED: 'Đã khóa'
    };
    return m[status?.toUpperCase()] || status;
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

  get regPages(): number[] {
    const total = this.regTotalPages;
    if (total <= 5) return Array.from({ length: total }, (_, i) => i);
    return [0, 1, 2];
  }
}
