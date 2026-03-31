import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterMainComponent } from '../../../shared/components/footer-main/footer-main.component';
import { AuthService } from '../../../core/services/auth.service';

const STATUS_MAP: Record<string, { label: string; message: string; cssClass: string }> = {
  PENDING:  { label: 'Đang chờ duyệt', message: 'Hồ sơ đang được xem xét, vui lòng chờ trong 24h làm việc.', cssClass: 'status-badge--pending' },
  APPROVED: { label: 'Đã được duyệt',  message: 'Chúc mừng! Hồ sơ đã được duyệt. Kiểm tra email để nhận thông tin đăng nhập.', cssClass: 'status-badge--approved' },
  REJECTED: { label: 'Bị từ chối',     message: 'Hồ sơ bị từ chối. Kiểm tra email để biết lý do chi tiết.', cssClass: 'status-badge--rejected' }
};

@Component({
  selector: 'app-register-bus-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, HeaderComponent, FooterMainComponent],
  templateUrl: './register-bus-company.component.html',
  styleUrl: './register-bus-company.component.css'
})
export class RegisterBusCompanyComponent {
  form: FormGroup;
  loading = false;
  errorMsg = '';
  submitted = false;

  // File upload
  licenseFile: File | null = null;
  licensePreview: string | null = null;
  licenseUrl: string | null = null;
  isDragOver = false;

  // Check status
  checkEmail = '';
  checkLoading = false;
  statusError = '';
  statusResult: { label: string; message: string; cssClass: string } | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^0\d{9,10}$/)]],
      address: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  get f() { return this.form.controls; }

  // --- File upload ---
  onDragOver(e: DragEvent) { e.preventDefault(); this.isDragOver = true; }
  onDragLeave() { this.isDragOver = false; }
  onDrop(e: DragEvent) { e.preventDefault(); this.isDragOver = false; const f = e.dataTransfer?.files[0]; if (f) this.handleFile(f); }
  onFileChange(e: Event) { const f = (e.target as HTMLInputElement).files?.[0]; if (f) this.handleFile(f); }

  handleFile(file: File) {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) { this.errorMsg = 'Chỉ hỗ trợ JPG, PNG, PDF (tối đa 5MB)'; return; }
    if (file.size > 5 * 1024 * 1024) { this.errorMsg = 'File không được vượt quá 5MB'; return; }
    this.errorMsg = '';
    this.licenseFile = file;
    if (file.type !== 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => { this.licensePreview = reader.result as string; };
      reader.readAsDataURL(file);
    } else { this.licensePreview = null; }
  }

  removeFile() { this.licenseFile = null; this.licensePreview = null; this.licenseUrl = null; }

  // --- Submit form ---
  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMsg = '';
    try {
      await this.authService.registerBusCompany({
        companyName: this.f['companyName'].value,
        email: this.f['email'].value,
        phoneNumber: this.f['phoneNumber'].value,
        address: this.f['address'].value
      }).toPromise();
      this.submitted = true;
      this.form.reset();
      this.removeFile();
    } catch (err: any) {
      this.errorMsg = err?.error?.message || 'Gửi hồ sơ thất bại. Vui lòng thử lại.';
    } finally {
      this.loading = false;
    }
  }

  // --- Check status ---
  checkStatus() {
    if (!this.checkEmail) { this.statusError = 'Vui lòng nhập email'; return; }
    this.checkLoading = true;
    this.statusError = '';
    this.statusResult = null;

    this.authService.checkBusCompanyStatus(this.checkEmail).subscribe({
      next: (res: any) => {
        const status: string = res?.data || '';
        this.statusResult = STATUS_MAP[status] ?? { label: status, message: res?.message || '', cssClass: 'status-badge--pending' };
        this.checkLoading = false;
      },
      error: (err: any) => {
        this.statusError = err?.error?.message || 'Không tìm thấy đơn đăng ký với email này.';
        this.checkLoading = false;
      }
    });
  }
}
