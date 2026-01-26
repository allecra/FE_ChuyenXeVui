import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  stats = [
    { label: 'Tổng người dùng', value: '1,234', icon: '👥', color: '#FF7F00' },
    { label: 'Tổng xe', value: '56', icon: '🚌', color: '#18941D' },
    { label: 'Vé đã bán', value: '8,901', icon: '🎫', color: '#E55E0A' },
    { label: 'Doanh thu', value: '2.5B', icon: '💰', color: '#40A944' }
  ];
}
