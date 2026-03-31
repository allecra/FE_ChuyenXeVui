import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  created_at: any;
  createdAt: any;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api/admin/users';

  users: User[] = [];
  loading = false;
  keyword = '';
  currentPage = 0;
  pageSize = 20;
  totalElements = 0;
  totalPages = 0;

  private search$ = new Subject<string>();

  showEditModal = false;
  editingUser: User | null = null;
  editForm: FormGroup;
  saving = false;
  editError = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      phone:     ['']
    });
  }

  ngOnInit() {
    this.search$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(kw => { this.currentPage = 0; this.loadUsers(kw); });
    this.loadUsers();
  }

  loadUsers(kw = this.keyword) {
    this.loading = true;
    const url = kw.trim()
      ? `${this.API}/search?keyword=${encodeURIComponent(kw)}&page=${this.currentPage}&size=${this.pageSize}`
      : `${this.API}?page=${this.currentPage}&size=${this.pageSize}`;

    this.http.get<any>(url, { withCredentials: true }).subscribe({
      next: (res) => {
        const data = res?.data;
        this.users = data?.content || [];
        this.totalElements = data?.total_elements || data?.totalElements || 0;
        this.totalPages = data?.total_pages || data?.totalPages || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch() { this.search$.next(this.keyword); }

  goToPage(p: number) {
    if (p < 0 || p >= this.totalPages) return;
    this.currentPage = p;
    this.loadUsers();
  }

  openEdit(u: User) {
    this.editingUser = u;
    const fn = u.first_name || u.firstName || '';
    const ln = u.last_name || u.lastName || '';
    this.editForm.patchValue({ firstName: fn, lastName: ln, email: u.email, phone: u.phone || '' });
    this.editError = '';
    this.showEditModal = true;
  }

  closeEdit() { this.showEditModal = false; this.editingUser = null; }

  saveEdit() {
    if (this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }
    if (!this.editingUser) return;
    this.saving = true;
    this.editError = '';
    const v = this.editForm.value;
    // Gửi cả camelCase và snake_case để BE nhận được
    const payload = {
      firstName: v.firstName,
      lastName: v.lastName,
      first_name: v.firstName,
      last_name: v.lastName,
      email: v.email,
      phone: v.phone || null
    };
    this.http.put<any>(`${this.API}/${this.editingUser.id}`, payload, { withCredentials: true })
      .subscribe({
        next: () => { this.saving = false; this.showEditModal = false; this.loadUsers(); },
        error: (err) => { this.editError = err?.error?.message || 'Lỗi khi cập nhật.'; this.saving = false; }
      });
  }

  blockUser(user: User) {
    const action = user.status === 'ACTIVE' ? 'block' : 'unblock';
    this.http.put<any>(`${this.API}/${user.id}/${action}`, {}, { withCredentials: true })
      .subscribe({ next: () => this.loadUsers() });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'badge--active', INACTIVE: 'badge--inactive', BLOCKED: 'badge--blocked'
    };
    return map[status] || 'badge--inactive';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'Hoạt động', INACTIVE: 'Ngừng', BLOCKED: 'Đã khóa'
    };
    return map[status] || status;
  }

  getInitials(name: string): string {
    if (!name) return '?';
    const clean = name.replace(/null|undefined/g, '').trim();
    if (!clean) return '?';
    return clean.split(' ').filter(Boolean).map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
  }

  getDisplayName(u: User): string {
    const full = (u.full_name || u.fullName || '').replace(/null|undefined/g, '').trim();
    if (full) return full;
    const fn = (u.first_name || u.firstName || '').replace(/null|undefined/g, '').trim();
    const ln = (u.last_name || u.lastName || '').replace(/null|undefined/g, '').trim();
    const combined = (fn + ' ' + ln).trim();
    if (combined) return combined;
    return u.email || `User #${u.id}`;
  }

  padId(id: number): string {
    return String(id).padStart(3, '0');
  }

  formatDate(val: any): string {
    if (!val) return '—';
    if (Array.isArray(val)) {
      const [y, m, d] = val;
      return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
    }
    try { return new Date(val).toLocaleDateString('vi-VN'); } catch { return '—'; }
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
