import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  activeTab: 'general' | 'account' | 'notification' | 'system' = 'general';

  // General
  appName = 'ChuyenXeVui';
  appDesc = 'Nền tảng đặt vé xe khách trực tuyến uy tín hàng đầu Việt Nam.';
  hotline = '1900 1234';
  supportEmail = 'support@chuyenxevui.vn';
  address = 'Hà Nội, Việt Nam';

  // Account
  adminName = 'Nguyễn Quản Trị';
  adminEmail = 'admin@ckdatveexe.com';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  // Notifications
  notifyNewCompany = true;
  notifyNewReview = true;
  notifyNewUser = false;
  notifyPayment = true;

  // System info (readonly)
  systemInfo = [
    { label: 'Phiên bản', value: '1.0.0' },
    { label: 'Framework', value: 'Spring Boot 3.2.1 + Angular 17' },
    { label: 'Database', value: 'TiDB Cloud (MySQL)' },
    { label: 'Môi trường', value: 'Development' },
  ];

  saved = false;

  saveGeneral() {
    this.saved = true;
    setTimeout(() => this.saved = false, 2000);
  }

  saveAccount() {
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }
    this.saved = true;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    setTimeout(() => this.saved = false, 2000);
  }

  saveNotifications() {
    this.saved = true;
    setTimeout(() => this.saved = false, 2000);
  }
}
