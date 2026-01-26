import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  NewPasswordRequest,
  ApiResponse,
  AuthResponse
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(loginRequest: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, loginRequest, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setUser(response.data);
        }
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/register`, registerRequest);
  }

  logout(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.clearUser();
        this.router.navigate(['/login']);
      })
    );
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/forgot-password`, request);
  }

  verifyOtp(request: VerifyOtpRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/verify-otp`, request);
  }

  setNewPassword(request: NewPasswordRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/set-new-password`, request);
  }

  getCurrentUser(): Observable<ApiResponse<AuthResponse['user']>> {
    return this.http.get<ApiResponse<AuthResponse['user']>>(`${this.apiUrl}/me`, {
      withCredentials: true
    });
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/refresh`, {}, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setUser(response.data);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getUserRoles(): string[] {
    const user = this.currentUserSubject.value;
    return user?.roles || [];
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN');
  }

  isUser(): boolean {
    return this.hasRole('ROLE_USER');
  }

  getCurrentUserValue(): any {
    return this.currentUserSubject.value;
  }

  private setUser(authResponse: AuthResponse): void {
    if (authResponse.accessToken) {
      localStorage.setItem('accessToken', authResponse.accessToken);
    }
    if (authResponse.user) {
      localStorage.setItem('user', JSON.stringify(authResponse.user));
      this.currentUserSubject.next(authResponse.user);
    }
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (e) {
        this.clearUser();
      }
    }
  }

  clearUser(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
