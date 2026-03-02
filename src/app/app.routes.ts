import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BusCompaniesComponent } from './pages/bus-companies/bus-companies.component';
import { BusStationsComponent } from './pages/bus-stations/bus-stations.component';
import { RoutesComponent } from './pages/routes/routes.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'bus-companies', component: BusCompaniesComponent },
  { path: 'bus-stations', component: BusStationsComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: '**', redirectTo: '' }
];