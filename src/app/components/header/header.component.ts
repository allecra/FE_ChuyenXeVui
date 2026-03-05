import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentRoute: string = '';

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {
    // Subscribe to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
    
    // Set initial route
    this.currentRoute = this.router.url;
  }

  isActiveRoute(route: string): boolean {
    if (route === '/') {
      // Only return true if exactly on home page
      return this.currentRoute === '/' || this.currentRoute === '/home';
    }
    // For other routes, check exact match first, then startsWith
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  onSearchClick() {
    // Mở search overlay giống nút tìm kiếm màu xanh (sidebar)
    this.searchService.openSearchOverlay();
  }

}