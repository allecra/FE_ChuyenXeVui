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
    console.log('Tìm kiếm:', this.searchForm);
    // Thực hiện logic tìm kiếm ở đây
  }

  onDepartureClick() {
    // Logic để mở dropdown chọn điểm khởi hành
    console.log('Chọn điểm khởi hành');
  }

  onDestinationClick() {
    // Logic để mở dropdown chọn điểm đến
    console.log('Chọn điểm đến');
  }
}