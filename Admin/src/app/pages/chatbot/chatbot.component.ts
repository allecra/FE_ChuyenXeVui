import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Scenario {
  id: number;
  name: string;
  keywords: string[];
  status: 'ACTIVE' | 'PAUSED';
  updatedAt: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  keyword = '';
  showModal = false;
  editingScenario: Scenario | null = null;
  form: FormGroup;

  scenarios: Scenario[] = [
    { id: 1,  name: 'Chào mừng khách mới',   keywords: ['xin chào', 'hello', 'hi'],          status: 'ACTIVE', updatedAt: '20/05/2024' },
    { id: 2,  name: 'Hướng dẫn đặt vé',       keywords: ['đặt vé', 'giá vé'],                 status: 'ACTIVE', updatedAt: '18/05/2024' },
    { id: 3,  name: 'Chính sách hoàn tiền',    keywords: ['hủy vé', 'hoàn tiền'],              status: 'PAUSED', updatedAt: '15/05/2024' },
    { id: 4,  name: 'Tra cứu lịch trình',      keywords: ['giờ chạy', 'chuyến xe'],            status: 'ACTIVE', updatedAt: '14/05/2024' },
    { id: 5,  name: 'Liên hệ tổng đài',        keywords: ['hotline', 'gọi điện'],              status: 'ACTIVE', updatedAt: '10/05/2024' },
    { id: 6,  name: 'Khuyến mãi hè',           keywords: ['giảm giá', 'voucher'],              status: 'PAUSED', updatedAt: '05/05/2024' },
    { id: 7,  name: 'Thông tin nhà xe',         keywords: ['địa chỉ', 'văn phòng'],            status: 'ACTIVE', updatedAt: '01/05/2024' },
    { id: 8,  name: 'Gửi hàng hóa',            keywords: ['ký gửi', 'chuyển phát'],           status: 'ACTIVE', updatedAt: '28/04/2024' },
    { id: 9,  name: 'Phản hồi dịch vụ',        keywords: ['khiếu nại', 'góp ý'],              status: 'ACTIVE', updatedAt: '25/04/2024' },
  ];

  currentPage = 0;
  pageSize = 10;
  totalScenarios = 24;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name:     ['', Validators.required],
      keywords: ['', Validators.required],
      response: ['', Validators.required],
      status:   ['ACTIVE']
    });
  }

  get filtered(): Scenario[] {
    const kw = this.keyword.toLowerCase();
    return kw ? this.scenarios.filter(s =>
      s.name.toLowerCase().includes(kw) ||
      s.keywords.some(k => k.toLowerCase().includes(kw))
    ) : this.scenarios;
  }

  get totalPages(): number { return Math.ceil(this.totalScenarios / this.pageSize); }

  get pages(): number[] {
    const total = this.totalPages;
    if (total <= 5) return Array.from({ length: total }, (_, i) => i);
    return [0, 1, 2];
  }

  goToPage(p: number) {
    if (p < 0 || p >= this.totalPages) return;
    this.currentPage = p;
  }

  openCreate() {
    this.editingScenario = null;
    this.form.reset({ status: 'ACTIVE' });
    this.showModal = true;
  }

  openEdit(s: Scenario) {
    this.editingScenario = s;
    this.form.patchValue({ name: s.name, keywords: s.keywords.join(', '), status: s.status });
    this.showModal = true;
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    if (this.editingScenario) {
      const idx = this.scenarios.findIndex(s => s.id === this.editingScenario!.id);
      if (idx > -1) {
        this.scenarios[idx] = { ...this.scenarios[idx], name: v.name, keywords: v.keywords.split(',').map((k: string) => k.trim()), status: v.status, updatedAt: new Date().toLocaleDateString('vi-VN') };
      }
    } else {
      this.scenarios.unshift({ id: Date.now(), name: v.name, keywords: v.keywords.split(',').map((k: string) => k.trim()), status: v.status, updatedAt: new Date().toLocaleDateString('vi-VN') });
    }
    this.showModal = false;
  }

  delete(s: Scenario) {
    if (!confirm(`Xóa kịch bản "${s.name}"?`)) return;
    this.scenarios = this.scenarios.filter(x => x.id !== s.id);
  }
}
