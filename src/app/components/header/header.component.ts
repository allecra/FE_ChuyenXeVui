import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  mobileMenuOpen = false;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {}

  onSearchClick(): void {
    this.searchService.openSearchOverlay();
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  /** Đóng menu và mở overlay tìm kiếm (tablet/mobile) */
  onSearchFromMenu(): void {
    this.closeMobileMenu();
    this.searchService.openSearchOverlay();
  }
}
