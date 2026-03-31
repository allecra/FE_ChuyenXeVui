import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface Station {
  id: number;
  name: string;
  location: string;
  totalBuses: number;
  activeBuses: number;
  createdAt: string;
}

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  private readonly API = 'http://localhost:8080/api/api/admin/stations';

  stations: Station[] = [];
  loading = false;
  keyword = '';
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;

  showModal = false;
  editingStation: Station | null = null;
  saving = false;
  modalError = '';

  form: FormGroup;
  private search$ = new Subject<string>();

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      name:     ['', [Validators.required, Validators.maxLength(255)]],
      location: ['', Validators.required],
      descriptions: ['']
    });
  }

  ngOnInit() {
    this.search$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => { this.currentPage = 0; this.loadStations(); });
    this.loadStations();
  }

  loadStations() {
    this.loading = true;
    const url = `${this.API}?page=${this.currentPage}&size=${this.pageSize}&sortBy=name&sortDirection=asc${this.keyword.trim() ? '&keyword=' + encodeURIComponent(this.keyword) : ''}`;
    this.http.get<any>(url, { withCredentials: true }).subscribe({
      next: (res) => {
        const data = res?.data;
        this.stations = data?.content || [];
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
    this.loadStations();
  }

  openCreate() {
    this.editingStation = null;
    this.form.reset();
    this.modalError = '';
    this.showModal = true;
  }

  openEdit(s: Station) {
    this.editingStation = s;
    this.form.patchValue({ name: s.name, location: s.location });
    this.modalError = '';
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  saveStation() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.modalError = '';
    const payload = this.form.value;

    const req = this.editingStation
      ? this.http.put<any>(`${this.API}/${this.editingStation.id}`, payload, { withCredentials: true })
      : this.http.post<any>(this.API, payload, { withCredentials: true });

    req.subscribe({
      next: () => { this.saving = false; this.showModal = false; this.loadStations(); },
      error: (err) => { this.modalError = err?.error?.message || 'Lỗi khi lưu bến xe.'; this.saving = false; }
    });
  }

  deleteStation(s: Station) {
    if (!confirm(`Xóa bến xe "${s.name}"?`)) return;
    this.http.delete<any>(`${this.API}/${s.id}`, { withCredentials: true, body: { hardDelete: false } })
      .subscribe({ next: () => this.loadStations() });
  }

  padId(id: number): string { return 'BS-' + String(id).padStart(3, '0'); }

  formatDate(val: any): string {
    if (!val) return '—';
    if (Array.isArray(val)) {
      const [y, m, d] = val;
      return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;
    }
    try { return new Date(val).toLocaleDateString('vi-VN'); } catch { return '—'; }
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
