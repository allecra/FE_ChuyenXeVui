import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ChuyenXeVui';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Kiểm tra và redirect nếu đã đăng nhập
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.authService.isAuthenticated()) {
        const currentUrl = this.router.url;
        // Nếu đang ở trang login/register và đã đăng nhập, redirect
        if (currentUrl === '/login' || currentUrl === '/register') {
          this.redirectBasedOnRole();
        }
      }
    });
  }

  private redirectBasedOnRole(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    } else if (this.authService.isUser()) {
      this.router.navigate(['/home']);
    }
  }
}
