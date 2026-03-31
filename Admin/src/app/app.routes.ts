import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'bus-companies',
        loadComponent: () => import('./pages/bus-companies/bus-companies.component').then(m => m.BusCompaniesComponent)
      },
      {
        path: 'stations',
        loadComponent: () => import('./pages/stations/stations.component').then(m => m.StationsComponent)
      },
      {
        path: 'discounts',
        loadComponent: () => import('./pages/discounts/discounts.component').then(m => m.DiscountsComponent)
      },
      {
        path: 'reviews',
        loadComponent: () => import('./pages/reviews/reviews.component').then(m => m.ReviewsComponent)
      },
      {
        path: 'banners',
        loadComponent: () => import('./pages/banners/banners.component').then(m => m.BannersComponent)
      },
      {
        path: 'news',
        loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'payments',
        loadComponent: () => import('./pages/payments/payments.component').then(m => m.PaymentsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
