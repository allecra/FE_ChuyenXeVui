import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Nếu đã đăng nhập, redirect đến trang phù hợp
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }
  }

  private redirectBasedOnRole(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.successMessage = response.message || 'Đăng nhập thành công!';
          
          // Điều hướng dựa trên role
          setTimeout(() => {
            if (response.data && response.data.user) {
              const user = response.data.user;
              if (user.roles && user.roles.length > 0) {
                if (user.roles.includes('ROLE_ADMIN')) {
                  this.router.navigate(['/admin/dashboard']);
                } else {
                  this.router.navigate(['/home']);
                }
              } else {
                this.router.navigate(['/home']);
              }
            } else {
              this.router.navigate(['/home']);
            }
          }, 1000);
        } else {
          this.errorMessage = response.message || 'Đăng nhập thất bại';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Đăng nhập thất bại. Vui lòng thử lại!';
        this.isLoading = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
