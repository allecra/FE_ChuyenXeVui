import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Banner {
  id: number;
  bannerUrl: string;
  position: string;
  status: string;
}

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api/admin/banners';

  banners: Banner[] = [];
  loading = false;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  showModal = false;
  editingBanner: Banner | null = null;
  saving = false;
  uploading = false;
  modalError = '';
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      bannerUrl: ['', Validators.required],
      position:  ['HOME_TOP', Validators.required]
    });
  }

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.http.get<any>(`${this.API}?page=${this.currentPage}&size=${this.pageSize}`, { withCredentials: true }).subscribe({
      next: (res) => {
        const data = res?.data;
        this.banners = (data?.content || []).filter((b: Banner) => b.status !== 'DELETED');
        this.totalElements = data?.total_elements || data?.totalElements || 0;
        this.totalPages = data?.total_pages || data?.totalPages || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  goToPage(p: number) {
    if (p < 0 || p >= this.totalPages) return;
    this.currentPage = p;
    this.load();
  }

  openCreate() {
    this.editingBanner = null;
    this.form.reset({ position: 'HOME_TOP' });
    this.modalError = '';
    this.showModal = true;
  }

  openEdit(b: Banner) {
    this.editingBanner = b;
    this.form.patchValue({ bannerUrl: b.bannerUrl, position: b.position });
    this.modalError = '';
    this.showModal = true;
  }

  uploadImage(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading = true;
    const fd = new FormData();
    fd.append('file', file);
    this.http.post<any>('http://localhost:8080/api/media/upload', fd, { withCredentials: true }).subscribe({
      next: (res: any) => {
        const url = res?.data?.url || res?.url || '';
        if (url) this.form.patchValue({ bannerUrl: url });
        this.uploading = false;
      },
      error: () => { this.uploading = false; alert('Upload thất bại. Hãy nhập URL thủ công.'); }
    });
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.modalError = '';
    const payload = this.form.value;

    const req = this.editingBanner
      ? this.http.put<any>(`${this.API}/${this.editingBanner.id}`, payload, { withCredentials: true })
      : this.http.post<any>(this.API, payload, { withCredentials: true });

    req.subscribe({
      next: () => { this.saving = false; this.showModal = false; this.load(); },
      error: (err: any) => { this.modalError = err?.error?.message || 'Lỗi khi lưu banner.'; this.saving = false; }
    });
  }

  deleteBanner(b: Banner) {
    const newStatus = b.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const label = newStatus === 'INACTIVE' ? 'Dừng hoạt động' : 'Kích hoạt';
    if (!confirm(`${label} banner này?`)) return;
    this.http.put<any>(`${this.API}/${b.id}`,
      { bannerUrl: b.bannerUrl, position: b.position, status: newStatus },
      { withCredentials: true }
    ).subscribe({ next: () => this.load() });
  }

  getStatusClass(s: string): string {
    const m: Record<string, string> = { ACTIVE: 'status--active', INACTIVE: 'status--paused', DELETED: 'status--inactive' };
    return m[s] || 'status--paused';
  }

  getStatusLabel(s: string): string {
    const m: Record<string, string> = { ACTIVE: 'Đang chạy', INACTIVE: 'Tạm dừng', DELETED: 'Đã xóa' };
    return m[s] || s;
  }

  get pages(): number[] {
    if (this.totalPages <= 5) return Array.from({ length: this.totalPages }, (_, i) => i);
    return [0, 1, 2];
  }
}
