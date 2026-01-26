import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step: 'email' | 'otp' | 'newPassword' = 'email';
  
  emailForm: FormGroup;
  otpForm: FormGroup;
  newPasswordForm: FormGroup;
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.newPasswordForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmitEmail(): void {
    if (this.emailForm.invalid) {
      this.markFormGroupTouched(this.emailForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const email = this.emailForm.value.email;
    this.userEmail = email;

    this.authService.forgotPassword({ email }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message || 'Mã OTP đã được gửi đến email của bạn!';
          this.step = 'otp';
          this.isLoading = false;
        } else {
          this.errorMessage = response.message || 'Gửi email thất bại';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Gửi email thất bại. Vui lòng thử lại!';
        this.isLoading = false;
      }
    });
  }

  onSubmitOtp(): void {
    if (this.otpForm.invalid) {
      this.markFormGroupTouched(this.otpForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const otp = this.otpForm.value.otp;

    this.authService.verifyOtp({ otp }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message || 'Mã OTP hợp lệ!';
          this.newPasswordForm.patchValue({ otp: otp });
          this.step = 'newPassword';
          this.isLoading = false;
        } else {
          this.errorMessage = response.message || 'Mã OTP không hợp lệ';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Mã OTP không hợp lệ. Vui lòng thử lại!';
        this.isLoading = false;
      }
    });
  }

  onSubmitNewPassword(): void {
    if (this.newPasswordForm.invalid) {
      this.markFormGroupTouched(this.newPasswordForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { otp, newPassword } = this.newPasswordForm.value;

    this.authService.setNewPassword({ otp, newPassword }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message || 'Đặt mật khẩu mới thành công!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = response.message || 'Đặt mật khẩu thất bại';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Đặt mật khẩu thất bại. Vui lòng thử lại!';
        this.isLoading = false;
      }
    });
  }

  resendOtp(): void {
    this.onSubmitEmail();
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }

  onOtpInput(event: any): void {
    const value = event.target.value;
    // Chỉ cho phép số
    const numericValue = value.replace(/[^0-9]/g, '');
    // Giới hạn 6 chữ số
    const limitedValue = numericValue.slice(0, 6);
    this.otpForm.patchValue({ otp: limitedValue });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  get otp() {
    return this.otpForm.get('otp');
  }

  get newPassword() {
    return this.newPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.newPasswordForm.get('confirmPassword');
  }
}
