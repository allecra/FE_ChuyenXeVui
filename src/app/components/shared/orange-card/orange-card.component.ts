import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card viền cam tái sử dụng cho: Tuyến đường, Nhà xe, Bến xe.
 *
 * - Tuyến đường: layout='text-first', cardHeight=250, có subtitle, titleColor #28A745, subtitleColor #800080
 * - Nhà xe / Bến xe: layout='image-first', cardHeight=219, chỉ title, titleColor #00613D
 *
 * Chung: cardWidth=260, imageHeight=170, viền cam #FF9900, nền #FBFFEC
 */
@Component({
  selector: 'app-orange-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orange-card.component.html',
  styleUrls: ['./orange-card.component.scss']
})
export class OrangeCardComponent {
  /** 'text-first' = chữ trước ảnh sau (tuyến đường); 'image-first' = ảnh trước chữ sau (nhà xe, bến xe) */
  @Input() layout: 'text-first' | 'image-first' = 'image-first';

  @Input() cardWidth: number = 260;
  /** 250 cho tuyến đường, 219 cho nhà xe / bến xe */
  @Input() cardHeight: number = 219;
  /** Chiều cao khung ảnh, mặc định 170 */
  @Input() imageHeight: number = 170;

  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() imageAlt: string = '';
  /** Phụ đề (vd. giá tuyến đường), chỉ hiện khi có và thường dùng với text-first */
  @Input() subtitle: string = '';
  /** Màu title, mặc định #00613D; tuyến đường dùng #28A745 */
  @Input() titleColor: string = '#00613D';
  /** Màu subtitle, mặc định #800080 (tuyến đường) */
  @Input() subtitleColor: string = '#800080';

  get isTextFirst(): boolean {
    return this.layout === 'text-first';
  }
}
