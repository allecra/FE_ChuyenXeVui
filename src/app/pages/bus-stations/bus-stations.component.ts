import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus-stations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-stations.component.html',
  styleUrls: ['./bus-stations.component.scss']
})
export class BusStationsComponent {
  stations = [
    {
      name: 'Bến xe Miền Đông Mới',
      image: 'assets/img/BX-1-jpg.png',
      address: 'Đường Võ Nguyên Giáp, Quận 9, TP.HCM',
      phone: '028 3717 0000',
      routes: 'Các tuyến đi miền Đông, Tây Nguyên',
      facilities: ['Nhà hàng', 'Cửa hàng tiện lợi', 'ATM', 'Wifi miễn phí'],
      operatingHours: '24/7'
    },
    {
      name: 'Bến xe Miền Tây',
      image: 'assets/img/be-CC-81n-jpg.png',
      address: '395 Kinh Dương Vương, Quận 6, TP.HCM',
      phone: '028 3877 4444',
      routes: 'Các tuyến đi miền Tây Nam Bộ',
      facilities: ['Nhà hàng', 'Phòng chờ VIP', 'Bãi đỗ xe', 'Dịch vụ y tế'],
      operatingHours: '4:30 - 22:00'
    },
    {
      name: 'Bến xe Giáp Bát',
      image: 'assets/img/ben-giap-bat-1-jpg.png',
      address: 'Đường Giải Phóng, Hoàng Mai, Hà Nội',
      phone: '024 3864 1467',
      routes: 'Các tuyến đi Nam Định, Thái Bình, Hải Phòng',
      facilities: ['Nhà hàng', 'Cửa hàng', 'Phòng chờ', 'Bãi giữ xe'],
      operatingHours: '5:00 - 21:00'
    },
    {
      name: 'Bến xe Mỹ Đình',
      image: 'assets/img/my-dinh-2-jpg.png',
      address: 'Phạm Hùng, Nam Từ Liêm, Hà Nội',
      phone: '024 3768 5549',
      routes: 'Các tuyến đi Tây Bắc, Tây Nguyên',
      facilities: ['Trung tâm thương mại', 'Nhà hàng', 'ATM', 'Wifi'],
      operatingHours: '24/7'
    }
  ];
}