import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  status: string;
  createdBy: string;
  createdAt: any;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api/admin/posts';
  posts: Post[] = [];
  loading = false;
  keyword = '';
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  showModal = false;
  editingPost: Post | null = null;
  saving = false;
  modalError = '';
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      title:     ['', Validators.required],
      content:   ['', Validators.required],
      thumbnail: ['', Validators.required]
    });
  }

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.http.get<any>(`${this.API}?keyword=${encodeURIComponent(this.keyword)}&page=${this.currentPage}&size=${this.pageSize}`, { withCredentials: true }).subscribe({
      next: (res) => {
        const d = res?.data;
        this.posts = d?.content || [];
        this.totalElements = d?.total_elements || d?.totalElements || 0;
        this.totalPages = d?.total_pages || d?.totalPages || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch() { this.currentPage = 0; this.load(); }
  goToPage(p: number) { if (p < 0 || p >= this.totalPages) return; this.currentPage = p; this.load(); }

  openCreate() { this.editingPost = null; this.form.reset(); this.modalError = ''; this.showModal = true; }
  openEdit(p: Post) { this.editingPost = p; this.form.patchValue({ title: p.title, content: p.content, thumbnail: p.thumbnail }); this.modalError = ''; this.showModal = true; }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const req = this.editingPost
      ? this.http.put<any>(`${this.API}/${this.editingPost.id}`, this.form.value, { withCredentials: true })
      : this.http.post<any>(this.API, this.form.value, { withCredentials: true });
    req.subscribe({
      next: () => { this.saving = false; this.showModal = false; this.load(); },
      error: (err) => { this.modalError = err?.error?.message || 'Lỗi.'; this.saving = false; }
    });
  }

  delete(p: Post) {
    if (!confirm(`Xóa "${p.title}"?`)) return;
    this.http.delete(`${this.API}/${p.id}`, { withCredentials: true }).subscribe({ next: () => this.load() });
  }

  approve(p: Post) {
    this.http.put(`${this.API}/${p.id}/approve`, {}, { withCredentials: true }).subscribe({ next: () => this.load() });
  }

  reject(p: Post) {
    const reason = prompt('Lý do từ chối:');
    if (!reason) return;
    this.http.put(`${this.API}/${p.id}/reject?reason=${encodeURIComponent(reason)}`, {}, { withCredentials: true }).subscribe({ next: () => this.load() });
  }

  formatDate(val: any): string {
    if (!val) return '—';
    if (Array.isArray(val)) { const [y, m, d] = val; return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`; }
    try { return new Date(val).toLocaleDateString('vi-VN'); } catch { return '—'; }
  }

  getStatusClass(s: string): string {
    const m: Record<string,string> = { PUBLISHED:'badge--active', DRAFT:'badge--pending', HIDDEN:'badge--blocked', PENDING:'badge--pending', REJECTED:'badge--blocked' };
    return m[s] || 'badge--pending';
  }

  getStatusLabel(s: string): string {
    const m: Record<string,string> = { PUBLISHED:'Đã đăng', DRAFT:'Nháp', HIDDEN:'Ẩn', PENDING:'Chờ duyệt', REJECTED:'Từ chối' };
    return m[s] || s;
  }

  get pages(): number[] {
    const total = this.totalPages;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    const cur = this.currentPage;
    const r: number[] = [0];
    if (cur > 2) r.push(-1);
    for (let i = Math.max(1, cur-1); i <= Math.min(total-2, cur+1); i++) r.push(i);
    if (cur < total-3) r.push(-1);
    r.push(total-1);
    return r;
  }
}
