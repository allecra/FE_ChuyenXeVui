import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { OrangeCardComponent } from '../../components/shared/orange-card/orange-card.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { BusStationsService, BusStation } from '../../services/bus-stations.service';

@Component({
  selector: 'app-bus-stations',
  standalone: true,
  imports: [CommonModule, OrangeCardComponent, PaginationComponent],
  templateUrl: './bus-stations.component.html',
  styleUrls: ['./bus-stations.component.scss']
})
export class BusStationsComponent implements OnInit {
  stations: BusStation[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 0;
  isLoading = false;

  constructor(
    public busStationsService: BusStationsService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.setPageMetadata();
    this.loadStations();
  }

  private setPageMetadata() {
    this.titleService.setTitle('Thông tin bến xe - ChuyenXeVui');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Danh sách các bến xe trên toàn quốc. Tìm hiểu thông tin chi tiết về các bến xe, vị trí và dịch vụ.' 
    });
  }

  loadStations() {
    this.isLoading = true;
    // Simulate loading delay for better UX
    setTimeout(() => {
      const result = this.busStationsService.getStationsPaginated(this.currentPage, this.itemsPerPage);
      this.stations = result.stations;
      this.totalPages = result.totalPages;
      this.isLoading = false;
    }, 300);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && !this.isLoading) {
      this.currentPage = page;
      this.loadStations();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}