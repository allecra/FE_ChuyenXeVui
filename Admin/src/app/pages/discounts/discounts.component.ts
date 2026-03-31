import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface Discount {
  id: number;
  code: string;
  name: string;
  description: string;
  discount_type: string;
  discountType: string;
  discount_value: number;
  discountValue: number;
  start_date: any;
  startDate: any;
  end_date: any;
  endDate: any;
  status: string;
  used_count: number;
  usedCount: number;
  usage_limit: number;
  usageLimit: number;
}

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api/api/admin/discounts';

  discounts: Discount[] = [];
  loading = false;
  keyword = '';
  currentPage = 0;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;

  showModal = false;
  editingDiscount: Discount | null = null;
  saving = false;
  modalError = '';
  form: FormGroup;

  private search$ = new Subject<string>();

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      name:          ['', Validators.required],
      code:          ['', Validators.required],
      discountType:  ['PERCENTAGE', Validators.required],
      discountValue: [null, [Validators.required, Validators.min(1)]],
      usageLimit:    [null, [Validators.required, Validators.min(1)]],
      startDate:     [''],
      endDate:       ['', Validators.required],
      description:   ['']
    });
  }

  ngOnInit() {
    this.search$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => { this.currentPage = 0; this.load(); });
    this.load();
  }

  load() {
    this.loading = true;
    const kw = this.keyword.trim();
    const url = `${this.API}?page=${this.currentPage}&size=${this.pageSize}${kw ? '&keyword=' + encodeURIComponent(kw) : ''}`;
    this.http.get<any>(url, { withCredentials: true }).subscribe({
      next: (res) => {
        const data = res?.data;
        this.discounts = data?.content || [];
        this.totalElements = data?.total_elements || data?.totalElements || 0;
        this.totalPages = data?.total_pages || data?.totalPages || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch() { this.search$.next(this.keyword); }
  goToPage(p: number) { if (p < 0 || p >= this.totalPages) return; this.currentPage = p; this.load(); }

  openCreate() {
    this.editingDiscount = null;
    this.form.reset({ discountType: 'PERCENTAGE' });
    this.modalError = '';
    this.showModal = true;
  }

  openEdit(d: Discount) {
    this.editingDiscount = d;
    this.form.patchValue({
      name: d.name,
      code: d.code,
      discountType: d.discount_type || d.discountType,
      discountValue: d.discount_value || d.discountValue,
      usageLimit: d.usage_limit || d.usageLimit,
      startDate: this.toDateInput((d as any).start_date || (d as any).startDate),
      endDate: this.toDateInput(d.end_date || d.endDate),
      description: (d as any).description || ''
    });
    this.modalError = '';
    this.showModal = true;
  }

  toDateInput(val: any): string {
    if (!val) return '';
    if (Array.isArray(val)) {
      const [y, m, d] = val;
      return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }
    try { return new Date(val).toISOString().substring(0, 10); } catch { return ''; }
  }

  closeModal() { this.showModal = false; }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.modalError = '';
    const v = this.form.value;
    // Gửi dưới dạng string để tránh Jackson type mismatch
    const payload: any = {
      name: String(v.name),
      code: String(v.code).toUpperCase(),
      discountType: String(v.discountType),
      discountValue: v.discountValue,
      usageLimit: Number(v.usageLimit),
      endDate: v.endDate ? `${v.endDate}T23:59:59` : null,
      description: v.description || '',
      scope: 'PLATFORM',
      status: 'ACTIVE',
      usageLimitPerUser: 1
    };

    // Chỉ gửi startDate khi tạo mới hoặc khi có giá trị
    if (!this.editingDiscount && v.startDate) {
      payload.startDate = `${v.startDate}T00:00:01`;
    } else if (v.startDate) {
      payload.startDate = `${v.startDate}T00:00:01`;
    } else if (!this.editingDiscount) {
      // Tạo mới mà không có startDate — dùng ngày mai
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      payload.startDate = tomorrow.toISOString().substring(0, 10) + 'T00:00:01';
    }

    console.log('Sending payload:', JSON.stringify(payload));

    const req = this.editingDiscount
      ? this.http.put<any>(`${this.API}/${this.editingDiscount.id}`, payload, { withCredentials: true })
      : this.http.post<any>(this.API, payload, { withCredentials: true });

    req.subscribe({
      next: () => { this.saving = false; this.showModal = false; this.load(); },
      error: (err) => { this.modalError = err?.error?.message || 'Lỗi khi lưu voucher.'; this.saving = false; }
    });
  }

  delete(d: Discount) {
    if (!confirm(`Xóa voucher "${d.name}"?`)) return;
    this.http.delete<any>(`${this.API}/${d.id}`, { withCredentials: true })
      .subscribe({ next: () => this.load() });
  }

  formatDiscount(d: Discount): string {
    const type = d.discount_type || d.discountType;
    const val = d.discount_value || d.discountValue;
    if (!val) return '—';
    return type === 'PERCENTAGE' ? `${val}%` : `${Number(val).toLocaleString('vi-VN')}đ`;
  }

  formatDate(val: any): string {
    if (!val) return '—';
    if (Array.isArray(val)) {
      const [y, m, d] = val;
      return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;
    }
    return new Date(val).toLocaleDateString('vi-VN');
  }

  getStatusClass(s: string): string {
    const m: Record<string, string> = { ACTIVE: 'badge--active', EXPIRED: 'badge--expired', INACTIVE: 'badge--paused', USED_UP: 'badge--expired' };
    return m[s] || 'badge--paused';
  }

  getStatusLabel(s: string): string {
    const m: Record<string, string> = { ACTIVE: 'Đang hoạt động', EXPIRED: 'Hết hạn', INACTIVE: 'Tạm ngưng', USED_UP: 'Hết lượt' };
    return m[s] || s;
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
