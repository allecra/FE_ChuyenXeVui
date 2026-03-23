import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  searchForm = {
    departure: '',
    destination: '',
    departureDate: ''
  };

  onSearch() {
    // TODO: Thực hiện logic tìm kiếm (navigate hoặc gọi API)
  }

  onDepartureClick() {
    // TODO: Mở dropdown chọn điểm khởi hành
  }

  onDestinationClick() {
    // TODO: Mở dropdown chọn điểm đến
  }
}