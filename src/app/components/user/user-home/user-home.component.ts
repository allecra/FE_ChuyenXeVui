import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  currentUser: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserValue();
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
