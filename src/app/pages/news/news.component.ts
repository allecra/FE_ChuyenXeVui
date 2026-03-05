import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { OrangeCardComponent } from '../../components/shared/orange-card/orange-card.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { NewsService, NewsArticle } from '../../services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule, OrangeCardComponent, PaginationComponent],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  articles: NewsArticle[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 0;
  isLoading = false;

  constructor(
    public newsService: NewsService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.setPageMetadata();
    this.loadArticles();
  }

  private setPageMetadata() {
    this.titleService.setTitle('Tin tức - ChuyenXeVui');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Tin tức mới nhất về xe khách, du lịch và giao thông. Cập nhật thông tin hữu ích cho hành khách.' 
    });
  }

  loadArticles() {
    this.isLoading = true;
    setTimeout(() => {
      const result = this.newsService.getArticlesPaginated(this.currentPage, this.itemsPerPage);
      this.articles = result.articles;
      this.totalPages = result.totalPages;
      this.isLoading = false;
    }, 300);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && !this.isLoading) {
      this.currentPage = page;
      this.loadArticles();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
