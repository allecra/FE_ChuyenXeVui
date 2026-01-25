import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { PopularRoutesComponent } from '../../components/popular-routes/popular-routes.component';
import { PromotionsComponent } from '../../components/promotions/promotions.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { PopularCompaniesComponent } from '../../components/popular-companies/popular-companies.component';
import { PopularStationsComponent } from '../../components/popular-stations/popular-stations.component';
import { FeaturesComponent } from '../../components/features/features.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    PopularRoutesComponent,
    PromotionsComponent,
    ReviewsComponent,
    PopularCompaniesComponent,
    PopularStationsComponent,
    FeaturesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}