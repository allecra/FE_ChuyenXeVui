import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  toggleSidebar(): void {
    this.adminService.toggleSidebar();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Navigation được xử lý trong AuthService
      },
      error: () => {
        // Nếu logout API fail, vẫn clear local và redirect
        this.authService.clearUser();
        window.location.href = '/login';
      }
    });
  }
}
