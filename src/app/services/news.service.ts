import { Injectable } from '@angular/core';

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedDate: Date;
  category: string;
  tags: string[];
  views: number;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private articles: NewsArticle[] = [
    {
      id: 1,
      title: 'Top 10 tuyến xe khách được yêu thích nhất năm 2024',
      excerpt: 'Khám phá những tuyến xe khách phổ biến và được đánh giá cao nhất trong năm qua',
      content: 'Nội dung chi tiết về các tuyến xe khách...',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop',
      author: 'Nguyễn Văn A',
      publishedDate: new Date('2024-01-15'),
      category: 'Tin tức',
      tags: ['xe khách', 'tuyến đường', 'đánh giá'],
      views: 1250
    },
    {
      id: 2,
      title: 'Hướng dẫn đặt vé xe online nhanh chóng và tiện lợi',
      excerpt: 'Cách đặt vé xe khách trực tuyến đơn giản chỉ với vài bước',
      content: 'Nội dung chi tiết về cách đặt vé...',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=500&fit=crop',
      author: 'Trần Thị B',
      publishedDate: new Date('2024-01-20'),
      category: 'Hướng dẫn',
      tags: ['đặt vé', 'online', 'hướng dẫn'],
      views: 980
    },
    {
      id: 3,
      title: 'Kinh nghiệm đi xe khách đường dài an toàn',
      excerpt: 'Những lưu ý quan trọng khi đi xe khách đường dài để đảm bảo an toàn',
      content: 'Nội dung chi tiết về kinh nghiệm...',
      image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&h=500&fit=crop',
      author: 'Lê Văn C',
      publishedDate: new Date('2024-02-01'),
      category: 'Kinh nghiệm',
      tags: ['an toàn', 'đường dài', 'kinh nghiệm'],
      views: 1500
    },
    {
      id: 4,
      title: 'Các nhà xe uy tín tại Sài Gòn năm 2024',
      excerpt: 'Danh sách các nhà xe được đánh giá cao về chất lượng dịch vụ tại Sài Gòn',
      content: 'Nội dung chi tiết về nhà xe...',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop',
      author: 'Phạm Thị D',
      publishedDate: new Date('2024-02-10'),
      category: 'Tin tức',
      tags: ['nhà xe', 'Sài Gòn', 'uy tín'],
      views: 2100
    },
    {
      id: 5,
      title: 'Lịch trình du lịch Đà Lạt bằng xe khách',
      excerpt: 'Gợi ý lịch trình du lịch Đà Lạt 3 ngày 2 đêm di chuyển bằng xe khách',
      content: 'Nội dung chi tiết về lịch trình...',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop',
      author: 'Hoàng Văn E',
      publishedDate: new Date('2024-02-15'),
      category: 'Du lịch',
      tags: ['du lịch', 'Đà Lạt', 'lịch trình'],
      views: 1800
    },
    {
      id: 6,
      title: 'So sánh giá vé xe khách các tuyến phổ biến',
      excerpt: 'Bảng giá vé xe khách cập nhật mới nhất cho các tuyến đường phổ biến',
      content: 'Nội dung chi tiết về giá vé...',
      image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=500&fit=crop',
      author: 'Võ Thị F',
      publishedDate: new Date('2024-02-20'),
      category: 'Tin tức',
      tags: ['giá vé', 'so sánh', 'tuyến đường'],
      views: 1650
    },
    {
      id: 7,
      title: 'Khuyến mãi đặt vé xe tháng 3/2024',
      excerpt: 'Tổng hợp các chương trình khuyến mãi hấp dẫn trong tháng 3',
      content: 'Nội dung chi tiết về khuyến mãi...',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
      author: 'Đặng Văn G',
      publishedDate: new Date('2024-03-01'),
      category: 'Khuyến mãi',
      tags: ['khuyến mãi', 'ưu đãi', 'giảm giá'],
      views: 2500
    },
    {
      id: 8,
      title: 'Đánh giá xe limousine cao cấp',
      excerpt: 'Trải nghiệm dịch vụ xe limousine cao cấp với tiện nghi 5 sao',
      content: 'Nội dung chi tiết về xe limousine...',
      image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=500&fit=crop',
      author: 'Bùi Thị H',
      publishedDate: new Date('2024-03-05'),
      category: 'Đánh giá',
      tags: ['limousine', 'cao cấp', 'đánh giá'],
      views: 1900
    },
    {
      id: 9,
      title: 'Lịch xe tết Nguyên Đán 2025',
      excerpt: 'Thông tin lịch xe và giá vé dịp Tết Nguyên Đán sắp tới',
      content: 'Nội dung chi tiết về lịch xe tết...',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=500&fit=crop',
      author: 'Ngô Văn I',
      publishedDate: new Date('2024-03-10'),
      category: 'Tin tức',
      tags: ['tết', 'lịch xe', 'nguyên đán'],
      views: 3200
    },
    {
      id: 10,
      title: 'Bí quyết chọn chỗ ngồi tốt nhất trên xe',
      excerpt: 'Hướng dẫn chọn vị trí ngồi thoải mái và an toàn nhất khi đi xe khách',
      content: 'Nội dung chi tiết về chọn chỗ ngồi...',
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=500&fit=crop',
      author: 'Dương Thị K',
      publishedDate: new Date('2024-03-15'),
      category: 'Hướng dẫn',
      tags: ['chỗ ngồi', 'hướng dẫn', 'mẹo hay'],
      views: 1400
    }
  ];

  getAllArticles(): NewsArticle[] {
    return this.articles;
  }

  getArticlesPaginated(page: number, itemsPerPage: number): { articles: NewsArticle[], totalPages: number } {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArticles = this.articles.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.articles.length / itemsPerPage);
    
    return {
      articles: paginatedArticles,
      totalPages: totalPages
    };
  }

  getArticleById(id: number): NewsArticle | undefined {
    return this.articles.find(article => article.id === id);
  }

  getArticlesByCategory(category: string): NewsArticle[] {
    return this.articles.filter(article => article.category === category);
  }

  getLatestArticles(count: number = 5): NewsArticle[] {
    return this.articles
      .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
      .slice(0, count);
  }
}
