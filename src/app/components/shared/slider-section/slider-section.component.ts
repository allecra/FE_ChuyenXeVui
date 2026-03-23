import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Section có tiêu đề + khu vực nội dung + mũi tên trái/phải.
 * Dùng chung cho: Tuyến đường, Ưu đãi nổi bật, Nhà xe, Bến xe.
 * Mũi tên cùng vị trí ngang giữa các phần, sát khung nội dung, style theo ưu đãi nổi bật.
 */
@Component({
  selector: 'app-slider-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-section.component.html',
  styleUrls: ['./slider-section.component.scss']
})
export class SliderSectionComponent {
  @Input() title: string = '';
  /** Màu viền trái thanh tiêu đề: '#40a944' (tuyến đường) hoặc '#ffa901' (ưu đãi, nhà xe, bến xe) */
  @Input() titleBorderColor: string = '#ffa901';
  @Input() titleBgColor: string = 'transparent';
  /** true = phần đầu trang (tuyến đường), margin-top tiêu đề 30px; mặc định 40px */
  @Input() tightTitleTop: boolean = false;
  /** true = sử dụng grid layout cho cards, false = layout tự do (cho promotions) */
  @Input() useGridLayout: boolean = true;
  @Input() canGoPrev: boolean = true;
  @Input() canGoNext: boolean = true;
  /** 'sides' = mũi tên hai bên nội dung; 'bottom' = mũi tên xuống dưới, trên nút (vd. Xem tất cả) */
  @Input() arrowsPosition: 'sides' | 'bottom' = 'sides';
  @Output() prevClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();
}
