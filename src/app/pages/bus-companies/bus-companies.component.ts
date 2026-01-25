import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-companies.component.html',
  styleUrls: ['./bus-companies.component.scss']
})
export class BusCompaniesComponent {
  companies = [
    {
      name: 'Nhà xe Phương Trang',
      image: 'assets/img/nha-xe-an-hoa-hiep-ca-mau-kon-tum-jpg.png',
      routes: 'TP.HCM - Đà Lạt, TP.HCM - Nha Trang',
      rating: 4.5,
      vehicles: 150,
      description: 'Nhà xe uy tín với hơn 20 năm kinh nghiệm, chuyên các tuyến đường dài.'
    },
    {
      name: 'Nhà xe Futa Hà Sơn',
      image: 'assets/img/image.jpg',
      routes: 'TP.HCM - Cần Thơ, TP.HCM - An Giang',
      rating: 4.3,
      vehicles: 120,
      description: 'Dịch vụ chất lượng cao, xe limousine sang trọng.'
    },
    {
      name: 'Nhà xe Vũ Linh',
      image: 'assets/img/nha-xe-vu-linh-limousine-chat-luong-png.png',
      routes: 'Hà Nội - Hải Phòng, Hà Nội - Quảng Ninh',
      rating: 4.4,
      vehicles: 80,
      description: 'Chuyên tuyến Bắc - Nam, dịch vụ limousine cao cấp.'
    },
    {
      name: 'Nhà xe Toàn Thắng',
      image: 'assets/img/nha-xe-toan-thang-vung-tau-jpg.png',
      routes: 'TP.HCM - Vũng Tàu, TP.HCM - Phan Thiết',
      rating: 4.2,
      vehicles: 60,
      description: 'Chuyên tuyến du lịch biển, xe chất lượng cao.'
    }
  ];
}