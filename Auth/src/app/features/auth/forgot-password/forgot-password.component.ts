import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterMainComponent } from '../../../shared/components/footer-main/footer-main.component';
import { AuthService } from '../../../core/services/auth.service';

type Step = 'email' | 'otp' | 'newPassword' | 'done';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent, FooterMainComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step: Step = 'email';
  loading = false;
  errorMsg = '';
  submittedEmail = '';

  otpDigits = ['', '', '', '', '', ''];
  otpError = '';

  emailForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.passwordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(g: AbstractControl) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  get ef() { return this.emailForm.controls; }
  get pf() { return this.passwordForm.controls; }
  get otpValue() { return this.otpDigits.join(''); }

  onSubmitEmail() {
    if (this.emailForm.invalid) { this.emailForm.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMsg = '';
    this.authService.forgotPassword(this.ef['email'].value).subscribe({
      next: () => {
        this.submittedEmail = this.ef['email'].value;
        this.step = 'otp';
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Không tìm thấy tài khoản với email này.';
        this.loading = false;
      }
    });
  }

  onOtpInput(e: Event, index: number) {
    const input = e.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1);
    this.otpDigits[index] = val;
    input.value = val;
    if (val && index < 5) {
      (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
    }
  }

  onOtpKeydown(e: KeyboardEvent, index: number) {
    if (e.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      (document.getElementById(`otp-${index - 1}`) as HTMLInputElement)?.focus();
    }
  }

  onOtpPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) || '';
    text.split('').forEach((ch, i) => { this.otpDigits[i] = ch; });
    (document.getElementById(`otp-${Math.min(text.length, 5)}`) as HTMLInputElement)?.focus();
  }

  onSubmitOtp() {
    if (this.otpValue.length < 6) { this.otpError = 'Vui lòng nhập đủ 6 chữ số OTP'; return; }
    this.loading = true;
    this.otpError = '';
    this.authService.verifyOtp(this.otpValue).subscribe({
      next: () => { this.step = 'newPassword'; this.loading = false; },
      error: (err) => {
        this.otpError = err?.error?.message || 'Mã OTP không đúng hoặc đã hết hạn.';
        this.loading = false;
      }
    });
  }

  resendOtp() {
    this.authService.forgotPassword(this.submittedEmail).subscribe();
  }

  onSubmitPassword() {
    if (this.passwordForm.invalid) { this.passwordForm.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMsg = '';
    this.authService.setNewPassword(this.otpValue, this.pf['newPassword'].value).subscribe({
      next: () => { this.step = 'done'; this.loading = false; },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Đặt mật khẩu thất bại. Vui lòng thử lại.';
        this.loading = false;
      }
    });
  }
}
