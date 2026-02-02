import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { OrangeCardComponent } from '../../components/shared/orange-card/orange-card.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { BusCompaniesService, BusCompany } from '../../services/bus-companies.service';

@Component({
  selector: 'app-bus-companies',
  standalone: true,
  imports: [CommonModule, OrangeCardComponent, PaginationComponent],
  templateUrl: './bus-companies.component.html',
  styleUrls: ['./bus-companies.component.scss']
})
export class BusCompaniesComponent implements OnInit {
  companies: BusCompany[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 0;
  isLoading = false;

  constructor(
    public busCompaniesService: BusCompaniesService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.setPageMetadata();
    this.loadCompanies();
  }

  private setPageMetadata() {
    this.titleService.setTitle('Thông tin nhà xe - ChuyenXeVui');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Danh sách các nhà xe uy tín trên toàn quốc. Tìm hiểu thông tin chi tiết về các nhà xe, đánh giá và số tuyến đường.' 
    });
  }

  loadCompanies() {
    this.isLoading = true;
    // Simulate loading delay for better UX
    setTimeout(() => {
      const result = this.busCompaniesService.getCompaniesPaginated(this.currentPage, this.itemsPerPage);
      this.companies = result.companies;
      this.totalPages = result.totalPages;
      this.isLoading = false;
    }, 300);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && !this.isLoading) {
      this.currentPage = page;
      this.loadCompanies();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}