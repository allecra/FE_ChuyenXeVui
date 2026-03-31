import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  breadcrumb = 'Hệ thống';
  user = { name: 'Admin', role: 'Quản trị viên' };

  private routeMap: Record<string, string> = {
    '/dashboard': 'Tổng quan',
    '/users': 'Quản lý Khách hàng',
    '/bus-companies': 'Quản lý Nhà xe',
    '/stations': 'Quản lý Bến xe',
    '/discounts': 'Quản lý Voucher',
    '/reviews': 'Quản lý Đánh giá',
    '/banners': 'Quản lý Banner',
    '/chatbot': 'Quản lý Chatbot',
    '/news': 'Quản lý Tin tức',
    '/payments': 'Quản lý Thanh toán',
  };

  constructor(private router: Router, private http: HttpClient) {
    // Load user từ localStorage
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        this.user = {
          name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Admin',
          role: 'Quản trị viên cấp cao'
        };
      } catch {}
    }

    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.breadcrumb = this.routeMap[e.urlAfterRedirects] || 'Hệ thống';
      });
  }

  logout() {
    this.http.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true }).subscribe();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = 'http://localhost:4200/login';
  }
}
