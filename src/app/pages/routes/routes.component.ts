import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { OrangeCardComponent } from '../../components/shared/orange-card/orange-card.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { RoutesService, BusRoute } from '../../services/routes.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule, OrangeCardComponent, PaginationComponent],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  routes: BusRoute[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 0;
  isLoading = false;

  constructor(
    public routesService: RoutesService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.setPageMetadata();
    this.loadRoutes();
  }

  private setPageMetadata() {
    this.titleService.setTitle('Tuyến đường - ChuyenXeVui');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Danh sách các tuyến đường xe khách phổ biến. Đặt vé xe trực tuyến với giá tốt nhất.' 
    });
  }

  loadRoutes() {
    this.isLoading = true;
    // Simulate loading delay for better UX
    setTimeout(() => {
      const result = this.routesService.getRoutesPaginated(this.currentPage, this.itemsPerPage);
      this.routes = result.routes;
      this.totalPages = result.totalPages;
      this.isLoading = false;
    }, 300);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && !this.isLoading) {
      this.currentPage = page;
      this.loadRoutes();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}