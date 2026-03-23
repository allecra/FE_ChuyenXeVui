import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reviews-section">
      <!-- Title với border xanh -->
      <h2 class="reviews-title">top reviews</h2>
      
      <!-- Section 1: Sài Gòn + Vũng Tàu -->
      <div class="reviews-section-1">
        <div class="review-item saigon">
          <div class="review-overlay">
            <h3>Sài Gòn</h3>
            <p>287 bài viết</p>
          </div>
        </div>
        
        <div class="review-item vungtau">
          <div class="review-overlay">
            <h3>Vũng Tàu</h3>
            <p>98 bài viết</p>
          </div>
        </div>
      </div>
      
      <!-- Section 2: Đà Lạt + Quy Nhơn + Hà Nội -->
      <div class="reviews-section-2">
        <div class="section-2-left">
          <div class="review-item dalat">
            <div class="review-overlay">
              <h3>Đà Lạt</h3>
              <p>87 bài viết</p>
            </div>
          </div>
          
          <div class="review-item quynhon">
            <div class="review-overlay">
              <h3>Quy Nhơn</h3>
              <p>81 bài viết</p>
            </div>
          </div>
        </div>
        
        <div class="review-item hanoi">
          <div class="review-overlay">
            <h3>Hà Nội</h3>
            <p>612 bài viết</p>
          </div>
        </div>
      </div>

      <!-- Section 3: Nha Trang + Đà Nẵng + Phan Thiết -->
      <div class="reviews-section-3">
        <div class="review-item nhatrang">
          <div class="review-overlay">
            <h3>Nha Trang</h3>
            <p>156 bài viết</p>
          </div>
        </div>
        
        <div class="section-3-right">
          <div class="review-item danang">
            <div class="review-overlay">
              <h3>Đà Nẵng</h3>
              <p>124 bài viết</p>
            </div>
          </div>
          
          <div class="review-item phanthiet">
            <div class="review-overlay">
              <h3>Phan Thiết</h3>
              <p>89 bài viết</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Reviews Component - Căn thẳng với content-wrapper */
    .reviews-section {
      padding: 0 20px; /* Cùng padding với content-wrapper */
      background: #FAFFE7;
      min-height: 500px;
      width: 100%;
      max-width: 1200px; /* Cùng max-width với content-wrapper */
      margin: 40px auto 0 auto; /* Đồng nhất 40px như các section khác */
    }

    /* Title với border xanh - căn thẳng với các section khác */
    .reviews-title {
      display: inline-flex;
      align-items: center;
      padding: 4px 0 4px 12px;
      margin: 0 0 10px 0; /* Bỏ margin-top để căn thẳng */
      border-left: 4px solid #40a944;
      font-family: "Segoe UI", Helvetica, Arial, sans-serif;
      font-weight: 700;
      color: #000000;
      font-size: 24px;
      letter-spacing: 0;
      line-height: 1.2;
      text-transform: lowercase;
    }

    /* Layout sections - điều chỉnh cho max-width 1200px */
    .reviews-section-1,
    .reviews-section-2,
    .reviews-section-3 {
      display: flex;
      gap: 20px;
      margin: 0 0 20px 0;
      max-width: 1100px; /* Giữ content trong 1100px */
      margin-left: auto;
      margin-right: auto;
    }

    .reviews-section-3 {
      margin-bottom: 0;
    }

    .section-2-left,
    .section-3-right {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 320px;
    }

    /* Review items với background images - không bo tròn */
    .review-item {
      position: relative;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      border-radius: 0; /* Bỏ bo tròn - góc vuông */
      transition: transform 0.3s ease;
    }

    .review-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    /* Specific dimensions và background images */
    .review-item.saigon {
      width: 770px;
      height: 360px;
      background-image: url('/assets/img/home/saigon-review.jpg');
    }

    .review-item.vungtau {
      width: 320px;
      height: 360px;
      background-image: url('/assets/img/home/vungtau-review.jpg');
    }

    .review-item.dalat {
      width: 320px;
      height: 175px;
      background-image: url('/assets/img/home/dalat-review.jpg');
    }

    .review-item.quynhon {
      width: 320px;
      height: 175px;
      background-image: url('/assets/img/home/quynhon-review.jpg');
    }

    .review-item.hanoi {
      width: 770px;
      height: 360px;
      background-image: url('/assets/img/home/hanoi-review.jpg');
    }

    .review-item.nhatrang {
      width: 770px;
      height: 360px;
      background-image: url('/assets/img/home/nhatrang-review.jpg');
    }

    .review-item.danang {
      width: 320px;
      height: 175px;
      background-image: url('/assets/img/home/danang-review.jpg');
    }

    .review-item.phanthiet {
      width: 320px;
      height: 175px;
      background-image: url('/assets/img/home/phanthiet-review.jpg');
    }

    /* Overlay với gradient */
    .review-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      color: white;
      padding: 20px;
      text-align: left;
    }

    .review-overlay h3 {
      font-family: "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.2;
      margin: 0 0 5px 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .review-overlay p {
      font-family: "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.2;
      margin: 0;
      opacity: 0.9;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .reviews-section-1,
      .reviews-section-2,
      .reviews-section-3 {
        flex-direction: column;
        align-items: center;
      }
      
      .section-2-left,
      .section-3-right {
        flex-direction: row;
        width: 100%;
        max-width: 660px;
      }
      
      .review-item {
        width: 100% !important;
        max-width: 320px;
        height: 200px !important;
      }
      
      .saigon,
      .vungtau,
      .hanoi,
      .nhatrang {
        max-width: 100% !important;
        height: 250px !important;
      }
    }

    /* Tablet: 2 cột cân bằng 50-50, không lệch */
    @media (max-width: 768px) {
      .reviews-section {
        padding: 0 16px;
        margin-top: 24px;
        min-height: auto;
      }

      .reviews-title {
        font-size: 20px;
        padding: 2px 0 2px 10px;
        margin-bottom: 8px;
      }

      .reviews-section-1,
      .reviews-section-2,
      .reviews-section-3 {
        flex-direction: row !important;
        align-items: stretch;
        gap: 10px;
        margin-bottom: 10px;
      }

      .section-2-left,
      .section-3-right {
        flex: 1 1 50%;
        min-width: 0;
        max-width: 50%;
        flex-direction: column;
        gap: 10px;
      }

      .review-item.saigon,
      .review-item.vungtau {
        flex: 1 1 50%;
        min-width: 0;
        width: auto !important;
        max-width: 50% !important;
        height: 150px !important;
      }

      .review-item.hanoi,
      .review-item.nhatrang {
        flex: 1 1 50%;
        min-width: 0;
        width: auto !important;
        max-width: 50% !important;
        height: 170px !important;
      }

      .review-item.dalat,
      .review-item.quynhon {
        width: 100% !important;
        max-width: none !important;
        height: 80px !important;
      }

      .review-item.danang,
      .review-item.phanthiet {
        width: 100% !important;
        max-width: none !important;
        height: 80px !important;
      }

      .review-overlay {
        padding: 10px;
      }

      .review-overlay h3 {
        font-size: 16px;
      }

      .review-overlay p {
        font-size: 11px;
      }
    }

    /* Mobile: 50-50 cân bằng, thu nhỏ tương xứng */
    @media (max-width: 480px) {
      .reviews-section {
        padding: 0 12px;
        margin-top: 20px;
      }

      .reviews-title {
        font-size: 18px;
        padding: 2px 0 2px 8px;
        margin-bottom: 6px;
        border-left-width: 3px;
      }

      .reviews-section-1,
      .reviews-section-2,
      .reviews-section-3 {
        gap: 8px;
        margin-bottom: 8px;
      }

      .section-2-left,
      .section-3-right {
        flex: 1 1 50%;
        max-width: 50%;
        gap: 8px;
      }

      .review-item.saigon,
      .review-item.vungtau {
        flex: 1 1 50%;
        max-width: 50% !important;
        height: 120px !important;
      }

      .review-item.hanoi,
      .review-item.nhatrang {
        flex: 1 1 50%;
        max-width: 50% !important;
        height: 130px !important;
      }

      .review-item.dalat,
      .review-item.quynhon,
      .review-item.danang,
      .review-item.phanthiet {
        height: 61px !important;
      }

      .review-overlay {
        padding: 8px;
      }

      .review-overlay h3 {
        font-size: 14px;
      }

      .review-overlay p {
        font-size: 10px;
      }
    }

    /* Mobile nhỏ (390px): 50-50, thu nhỏ thêm */
    @media (max-width: 390px) {
      .reviews-section {
        padding: 0 10px;
        margin-top: 16px;
      }

      .reviews-title {
        font-size: 16px;
        margin-bottom: 6px;
      }

      .reviews-section-1,
      .reviews-section-2,
      .reviews-section-3 {
        gap: 6px;
        margin-bottom: 6px;
      }

      .section-2-left,
      .section-3-right {
        gap: 6px;
      }

      .review-item.saigon,
      .review-item.vungtau {
        height: 100px !important;
      }

      .review-item.hanoi,
      .review-item.nhatrang {
        height: 106px !important;
      }

      .review-item.dalat,
      .review-item.quynhon,
      .review-item.danang,
      .review-item.phanthiet {
        height: 50px !important;
      }

      .review-overlay {
        padding: 6px;
      }

      .review-overlay h3 {
        font-size: 12px;
      }

      .review-overlay p {
        font-size: 9px;
      }
    }
  `]
})
export class ReviewsComponent {}