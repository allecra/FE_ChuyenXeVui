import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: string[];
  status: string;
  lastLogin: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: UserInfo;
  loginStatus: string;
  loginTime: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // POST /api/auth/register
  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API}/register`, data, {
      withCredentials: true
    });
  }

  // POST /api/auth/login — token trả về qua HttpOnly Cookie
  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.API}/login`, data, {
      withCredentials: true
    });
  }

  // POST /api/auth/logout
  logout(): Observable<any> {
    return this.http.post(`${this.API}/logout`, {}, {
      withCredentials: true
    });
  }

  // POST /api/auth/refresh
  refreshToken(): Observable<any> {
    return this.http.post(`${this.API}/refresh`, {}, {
      withCredentials: true
    });
  }

  // GET /api/auth/me
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.API}/me`, {
      withCredentials: true
    });
  }

  // POST /api/auth/forgot-password
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.API}/forgot-password`, { email });
  }

  // POST /api/auth/verify-otp
  verifyOtp(otp: string): Observable<any> {
    return this.http.post(`${this.API}/verify-otp`, { otp });
  }

  // POST /api/auth/set-new-password
  setNewPassword(otp: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.API}/set-new-password`, { otp, newPassword });
  }

  // POST /api/public/bus-company/register
  registerBusCompany(data: {
    companyName: string;
    email: string;
    phoneNumber: string;
    address: string;
  }): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/public/bus-company/register',
      data
    );
  }

  // GET /api/public/bus-company/registration-status/{email}
  checkBusCompanyStatus(email: string): Observable<any> {
    return this.http.get(
      `http://localhost:8080/api/public/bus-company/registration-status/${email}`
    );
  }

  uploadFile(file: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post('http://localhost:8080/api/media/upload', fd, {
      withCredentials: true
    });
  }
}
