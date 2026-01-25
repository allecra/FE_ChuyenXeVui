import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent {
  routes = [
    {
      from: 'TP.HCM',
      to: 'Đà Lạt',
      distance: '308 km',
      duration: '6-7 giờ',
      price: '180.000 - 350.000 VNĐ',
      companies: ['Phương Trang', 'Sinh Tourist', 'Hạnh Café'],
      frequency: '30 phút/chuyến',
      popular: true
    },
    {
      from: 'Hà Nội',
      to: 'Hải Phòng',
      distance: '102 km',
      duration: '2-3 giờ',
      price: '80.000 - 150.000 VNĐ',
      companies: ['Hoàng Long', 'Kumho Samco', 'Phương Nam'],
      frequency: '20 phút/chuyến',
      popular: true
    },
    {
      from: 'TP.HCM',
      to: 'Nha Trang',
      distance: '448 km',
      duration: '8-9 giờ',
      price: '250.000 - 450.000 VNĐ',
      companies: ['Phương Trang', 'Hạnh Café', 'Thành Bưởi'],
      frequency: '1 giờ/chuyến',
      popular: true
    },
    {
      from: 'Hà Nội',
      to: 'Sapa',
      distance: '315 km',
      duration: '5-6 giờ',
      price: '200.000 - 300.000 VNĐ',
      companies: ['Sapa Express', 'Eco Sapa', 'Good Morning Sapa'],
      frequency: '2 giờ/chuyến',
      popular: false
    },
    {
      from: 'TP.HCM',
      to: 'Cần Thơ',
      distance: '169 km',
      duration: '3-4 giờ',
      price: '120.000 - 200.000 VNĐ',
      companies: ['Phương Trang', 'Futa', 'Mai Linh'],
      frequency: '30 phút/chuyến',
      popular: true
    },
    {
      from: 'Đà Nẵng',
      to: 'Hội An',
      distance: '30 km',
      duration: '45 phút',
      price: '30.000 - 50.000 VNĐ',
      companies: ['Hội An Express', 'Yellow Bus', 'Local Bus'],
      frequency: '15 phút/chuyến',
      popular: false
    }
  ];
}