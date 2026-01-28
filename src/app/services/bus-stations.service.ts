import { Injectable } from '@angular/core';

export interface BusStation {
  id: number;
  name: string;
  image: string;
  location: string;
  isPopular: boolean;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusStationsService {
  private stations: BusStation[] = [
    {
      id: 1,
      name: 'Bến xe Gia Lâm',
      image: 'BX-dong-moi.jpg',
      location: 'Hà Nội',
      isPopular: true,
      description: 'Bến xe lớn nhất miền Bắc'
    },
    {
      id: 2,
      name: 'Bến xe khách Quảng Bình',
      image: 'BX-giap-bat.jpg',
      location: 'Quảng Bình',
      isPopular: true,
      description: 'Bến xe trung tâm Quảng Bình'
    },
    {
      id: 3,
      name: 'Bến xe Cần Thơ',
      image: 'BX-mien-tay.jpg',
      location: 'Cần Thơ',
      isPopular: true,
      description: 'Bến xe trung tâm miền Tây'
    },
    {
      id: 4,
      name: 'Bến xe Vũng Tàu',
      image: 'BX-my-dinh.jpg',
      location: 'Vũng Tàu',
      isPopular: true,
      description: 'Bến xe du lịch biển'
    },
    {
      id: 5,
      name: 'Bến xe Hà Nội',
      image: 'BX-dong-moi.jpg',
      location: 'Hà Nội',
      isPopular: true,
      description: 'Bến xe trung tâm Hà Nội'
    },
    {
      id: 6,
      name: 'Bến xe Thanh Hóa',
      image: 'BX-giap-bat.jpg',
      location: 'Thanh Hóa',
      isPopular: false,
      description: 'Bến xe tỉnh Thanh Hóa'
    },
    {
      id: 7,
      name: 'Bến xe tiểu biểu hai miền',
      image: 'BX-mien-tay.jpg',
      location: 'TP. Hồ Chí Minh',
      isPopular: false,
      description: 'Bến xe liên tỉnh'
    },
    {
      id: 8,
      name: 'Bến xe Quy Nhơn - Bình Định',
      image: 'BX-my-dinh.jpg',
      location: 'Quy Nhơn',
      isPopular: false,
      description: 'Bến xe miền Trung'
    },
    {
      id: 9,
      name: 'Bến xe Đà Nẵng',
      image: 'BX-dong-moi.jpg',
      location: 'Đà Nẵng',
      isPopular: false,
      description: 'Bến xe trung tâm Đà Nẵng'
    },
    {
      id: 10,
      name: 'Bến xe Nha Trang',
      image: 'BX-giap-bat.jpg',
      location: 'Nha Trang',
      isPopular: false,
      description: 'Bến xe du lịch Nha Trang'
    }
  ];

  getAllStations(): BusStation[] {
    return this.stations;
  }

  getPopularStations(): BusStation[] {
    return this.stations.filter(station => station.isPopular);
  }

  getStationsPaginated(page: number, itemsPerPage: number): { stations: BusStation[], totalPages: number } {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedStations = this.stations.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.stations.length / itemsPerPage);
    
    return {
      stations: paginatedStations,
      totalPages: totalPages
    };
  }

  getStationById(id: number): BusStation | undefined {
    return this.stations.find(station => station.id === id);
  }

  // Method để cập nhật trạng thái phổ biến
  updatePopularStatus(): void {
    // Reset tất cả về false
    this.stations.forEach(station => station.isPopular = false);
    
    // Đánh dấu top 5 đầu tiên là phổ biến
    this.stations.slice(0, 5).forEach(station => {
      station.isPopular = true;
    });
  }

  // Method để thêm bến xe mới
  addStation(station: Omit<BusStation, 'id'>): BusStation {
    const newId = Math.max(...this.stations.map(s => s.id)) + 1;
    const newStation: BusStation = {
      ...station,
      id: newId
    };
    this.stations.push(newStation);
    this.updatePopularStatus();
    return newStation;
  }
}