import { Injectable } from '@angular/core';

export interface BusCompany {
  id: number;
  name: string;
  image: string;
  rating: number;
  routes: number;
  isPopular: boolean;
  description?: string;
  headquarters: string; // Thêm trụ sở chính
}

@Injectable({
  providedIn: 'root'
})
export class BusCompaniesService {
  private companies: BusCompany[] = [
    {
      id: 1,
      name: 'Nhà xe An Hòa Hiệp',
      image: 'nha-xe-an-hoa-hiep-ca-mau-kon-tum.jpg',
      rating: 4.8,
      routes: 25,
      isPopular: true,
      description: 'Nhà xe uy tín với nhiều năm kinh nghiệm',
      headquarters: 'TP. Hồ Chí Minh'
    },
    {
      id: 2,
      name: 'Nhà xe Futa Hà Sơn',
      image: 'nha-xe-futa-ha-son.jpg',
      rating: 4.9,
      routes: 30,
      isPopular: true,
      description: 'Dịch vụ chất lượng cao, xe limousine',
      headquarters: 'Hà Nội'
    },
    {
      id: 3,
      name: 'Nhà xe Toàn Thắng',
      image: 'nha-xe-toan-thang-vung-tau.jpg',
      rating: 4.7,
      routes: 20,
      isPopular: true,
      description: 'Chuyên tuyến Sài Gòn - Vũng Tàu',
      headquarters: 'Vũng Tàu'
    },
    {
      id: 4,
      name: 'Nhà xe Vũ Linh Limousine',
      image: 'nha-xe-vu-linh-limousine-chat-luong.jpg',
      rating: 4.8,
      routes: 15,
      isPopular: true,
      description: 'Xe limousine chất lượng cao',
      headquarters: 'Đà Lạt'
    },
    {
      id: 5,
      name: 'Nhà xe Thành Nhung',
      image: 'thanh-nhung-real-bus.jpg',
      rating: 4.6,
      routes: 18,
      isPopular: true,
      description: 'Dịch vụ đáng tin cậy',
      headquarters: 'Nha Trang'
    },
    {
      id: 6,
      name: 'Nhà xe Sao Việt',
      image: 'nha-xe-an-hoa-hiep-ca-mau-kon-tum.jpg',
      rating: 4.5,
      routes: 22,
      isPopular: false,
      description: 'Nhà xe với mạng lưới rộng khắp',
      headquarters: 'Đà Nẵng'
    },
    {
      id: 7,
      name: 'Nhà xe Hoa Mai',
      image: 'nha-xe-futa-ha-son.jpg',
      rating: 4.4,
      routes: 16,
      isPopular: false,
      description: 'Dịch vụ tận tâm, giá cả hợp lý',
      headquarters: 'Cần Thơ'
    },
    {
      id: 8,
      name: 'Nhà xe Mỹ Long Travel',
      image: 'nha-xe-toan-thang-vung-tau.jpg',
      rating: 4.6,
      routes: 19,
      isPopular: false,
      description: 'Chuyên các tuyến đường dài',
      headquarters: 'An Giang'
    },
    {
      id: 9,
      name: 'Nhà xe Quốc Đạt',
      image: 'nha-xe-vu-linh-limousine-chat-luong.jpg',
      rating: 4.3,
      routes: 14,
      isPopular: false,
      description: 'Nhà xe gia đình với truyền thống lâu đời',
      headquarters: 'Huế'
    },
    {
      id: 10,
      name: 'Nhà xe Thành Bình Xanh',
      image: 'thanh-nhung-real-bus.jpg',
      rating: 4.5,
      routes: 17,
      isPopular: false,
      description: 'Cam kết an toàn và đúng giờ',
      headquarters: 'Quy Nhơn'
    }
  ];

  getAllCompanies(): BusCompany[] {
    return this.companies;
  }

  getPopularCompanies(): BusCompany[] {
    return this.companies.filter(company => company.isPopular);
  }

  getCompaniesPaginated(page: number, itemsPerPage: number): { companies: BusCompany[], totalPages: number } {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCompanies = this.companies.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.companies.length / itemsPerPage);
    
    return {
      companies: paginatedCompanies,
      totalPages: totalPages
    };
  }

  getCompanyById(id: number): BusCompany | undefined {
    return this.companies.find(company => company.id === id);
  }

  // Method để cập nhật trạng thái phổ biến dựa trên rating
  updatePopularStatus(): void {
    // Sắp xếp theo rating và chọn top 5 làm phổ biến
    const sortedByRating = [...this.companies].sort((a, b) => b.rating - a.rating);
    
    // Reset tất cả về false
    this.companies.forEach(company => company.isPopular = false);
    
    // Đánh dấu top 5 là phổ biến
    sortedByRating.slice(0, 5).forEach(company => {
      const originalCompany = this.companies.find(c => c.id === company.id);
      if (originalCompany) {
        originalCompany.isPopular = true;
      }
    });
  }

  // Method để thêm nhà xe mới
  addCompany(company: Omit<BusCompany, 'id'>): BusCompany {
    const newId = Math.max(...this.companies.map(c => c.id)) + 1;
    const newCompany: BusCompany = {
      ...company,
      id: newId
    };
    this.companies.push(newCompany);
    this.updatePopularStatus(); // Cập nhật lại danh sách phổ biến
    return newCompany;
  }
}