import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterMainComponent } from '../../../shared/components/footer-main/footer-main.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent, FooterMainComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  errorMsg = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get f() { return this.form.controls; }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.login({
      email: this.f['identifier'].value,
      password: this.f['password'].value
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('Login response:', JSON.stringify(res));
        const data = res?.data;
        const roles: string[] = data?.user?.roles || [];

        // BE trả về snake_case: access_token
        const token = data?.access_token || data?.accessToken || '';
        const user = data?.user || {};

        if (token) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('user', JSON.stringify(user));
        }

        if (roles.includes('ROLE_ADMIN')) {
          const userEncoded = encodeURIComponent(JSON.stringify(user));
          window.location.href = `http://localhost:4201?token=${token}&user=${userEncoded}`;
        } else if (roles.includes('ROLE_BUS_COMPANY')) {
          window.location.href = 'http://localhost:4202';
        } else {
          window.location.href = 'http://localhost:4200';
        }
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Email hoặc mật khẩu không đúng.';
        this.loading = false;
      }
    });
  }
}
