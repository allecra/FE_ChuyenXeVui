import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  @Input() collapsed: boolean = false;

  menuItems = [
    { icon: '🏠', label: 'Trang chủ', route: '/admin/dashboard', active: true },
    { icon: '👥', label: 'Quản lý người dùng', route: '/admin/users' },
    { icon: '🚌', label: 'Quản lý xe', route: '/admin/buses' },
    { icon: '📍', label: 'Quản lý tuyến đường', route: '/admin/routes' },
    { icon: '🎫', label: 'Quản lý vé', route: '/admin/tickets' },
    { icon: '💰', label: 'Quản lý thanh toán', route: '/admin/payments' },
    { icon: '🎟️', label: 'Mã giảm giá', route: '/admin/discounts' },
    { icon: '💬', label: 'Tin nhắn', route: '/admin/messages' },
    { icon: '📰', label: 'Bài viết', route: '/admin/articles' },
    { icon: '⚙️', label: 'Cài đặt', route: '/admin/settings' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
    // Update active state
    this.menuItems.forEach(item => {
      item.active = item.route === route;
    });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
