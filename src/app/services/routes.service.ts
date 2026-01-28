import { Injectable } from '@angular/core';

export interface BusRoute {
  id: number;
  title: string;
  description: string;
  image: string;
  fromLocation: string;
  toLocation: string;
  isPopular: boolean;
  price?: number;
  duration?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private routes: BusRoute[] = [
    {
      id: 1,
      title: 'Đặt vé xe tuyến Sài Gòn đi Mũi Né',
      description: 'Bạn đang tìm kiếm chuyến xe chất lượng cao từ Sài Gòn đi Mũi Né',
      image: 'saigon-muine-route.jpg',
      fromLocation: 'Sài Gòn',
      toLocation: 'Mũi Né',
      isPopular: true,
      price: 150000,
      duration: '4h 30m'
    },
    {
      id: 2,
      title: 'Đặt vé xe tuyến Sài Gòn đi Nha Trang',
      description: 'Bạn đang tìm kiếm chuyến xe thuận tiện và nhanh chóng giữa Sài Gòn và Nha Trang',
      image: 'saigon-nhatrang-route.jpg',
      fromLocation: 'Sài Gòn',
      toLocation: 'Nha Trang',
      isPopular: true,
      price: 220000,
      duration: '8h 15m'
    },
    {
      id: 3,
      title: 'Tuyến Sài Gòn đi Vũng Tàu',
      description: 'Top 10 nhà xe tuyến Sài Gòn đi Vũng Tàu được đánh giá cao',
      image: 'saigon-vungtau-route.jpg',
      fromLocation: 'Sài Gòn',
      toLocation: 'Vũng Tàu',
      isPopular: true,
      price: 120000,
      duration: '2h 30m'
    },
    {
      id: 4,
      title: 'Đặt vé xe Nha Trang đi Đà Lạt',
      description: 'Bạn đang tìm kiếm chuyến xe chất lượng trên tuyến đường Nha Trang đi Đà Lạt',
      image: 'nhatrang-dalat-route.jpg',
      fromLocation: 'Nha Trang',
      toLocation: 'Đà Lạt',
      isPopular: true,
      price: 180000,
      duration: '4h 45m'
    },
    {
      id: 5,
      title: 'Top 8 nhà xe từ Bắc Ninh đi Hà Nội',
      description: 'Bạn đang tìm kiếm chuyến xe chất lượng cao từ Bắc Ninh đi Hà Nội',
      image: 'bacninh-hanoi-route.jpg',
      fromLocation: 'Bắc Ninh',
      toLocation: 'Hà Nội',
      isPopular: true,
      price: 80000,
      duration: '1h 20m'
    },
    {
      id: 6,
      title: 'Vé xe từ Sài Gòn đi Mũi Né - Phan Thiết',
      description: 'Bạn đang tìm kiếm chuyến xe thuận tiện và nhanh chóng giữa Sài Gòn và Phan Thiết',
      image: 'saigon-muine-route.jpg',
      fromLocation: 'Sài Gòn',
      toLocation: 'Phan Thiết',
      isPopular: false,
      price: 140000,
      duration: '4h 15m'
    },
    {
      id: 7,
      title: 'Đặt vé xe tuyến Hà Nội đi Bắc Ninh',
      description: 'Top 10 nhà xe tuyến Hà Nội đi Bắc Ninh được đánh giá cao',
      image: 'bacninh-hanoi-route.jpg',
      fromLocation: 'Hà Nội',
      toLocation: 'Bắc Ninh',
      isPopular: false,
      price: 75000,
      duration: '1h 15m'
    },
    {
      id: 8,
      title: 'Đặt vé xe từ Vũng Tàu đi Sài Gòn',
      description: 'Bạn đang tìm kiếm chuyến xe chất lượng trên tuyến đường Vũng Tàu đi Sài Gòn',
      image: 'saigon-vungtau-route.jpg',
      fromLocation: 'Vũng Tàu',
      toLocation: 'Sài Gòn',
      isPopular: false,
      price: 115000,
      duration: '2h 20m'
    },
    {
      id: 9,
      title: 'Đặt vé xe tuyến Đà Lạt đi Nha Trang',
      description: 'Bạn đang tìm kiếm chuyến xe thuận tiện từ Đà Lạt đi Nha Trang',
      image: 'nhatrang-dalat-route.jpg',
      fromLocation: 'Đà Lạt',
      toLocation: 'Nha Trang',
      isPopular: false,
      price: 170000,
      duration: '4h 30m'
    },
    {
      id: 10,
      title: 'Đặt vé xe tuyến Nha Trang đi Sài Gòn',
      description: 'Top 10 nhà xe tuyến Nha Trang đi Sài Gòn được đánh giá cao nhất',
      image: 'saigon-nhatrang-route.jpg',
      fromLocation: 'Nha Trang',
      toLocation: 'Sài Gòn',
      isPopular: false,
      price: 210000,
      duration: '8h 00m'
    }
  ];

  getAllRoutes(): BusRoute[] {
    return this.routes;
  }

  getPopularRoutes(): BusRoute[] {
    return this.routes.filter(route => route.isPopular);
  }

  getRoutesPaginated(page: number, itemsPerPage: number): { routes: BusRoute[], totalPages: number } {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRoutes = this.routes.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.routes.length / itemsPerPage);
    
    return {
      routes: paginatedRoutes,
      totalPages: totalPages
    };
  }

  getRouteById(id: number): BusRoute | undefined {
    return this.routes.find(route => route.id === id);
  }

  // Method để cập nhật trạng thái phổ biến
  updatePopularStatus(): void {
    // Reset tất cả về false
    this.routes.forEach(route => route.isPopular = false);
    
    // Đánh dấu top 5 đầu tiên là phổ biến
    this.routes.slice(0, 5).forEach(route => {
      route.isPopular = true;
    });
  }

  // Method để thêm tuyến đường mới
  addRoute(route: Omit<BusRoute, 'id'>): BusRoute {
    const newId = Math.max(...this.routes.map(r => r.id)) + 1;
    const newRoute: BusRoute = {
      ...route,
      id: newId
    };
    this.routes.push(newRoute);
    this.updatePopularStatus();
    return newRoute;
  }
}