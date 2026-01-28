import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-title-wrapper" [ngClass]="wrapperClass">
      <h2 
        class="section-title" 
        [ngClass]="titleClass"
        [style.border-left-color]="borderColor"
        [style.color]="textColor"
        [style.font-size.px]="fontSize"
        [style.margin-top.px]="marginTop"
        [style.margin-bottom.px]="marginBottom"
        [style.text-transform]="textTransform">
        {{ title }}
      </h2>
    </div>
  `,
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {
  @Input() title: string = '';
  @Input() borderColor: string = '#40a944'; // Default green
  @Input() textColor: string = '#000000';
  @Input() fontSize: number = 24;
  @Input() marginTop: number = 40;
  @Input() marginBottom: number = 10;
  @Input() titleClass: string = '';
  @Input() wrapperClass: string = '';
  @Input() textTransform: 'none' | 'lowercase' | 'uppercase' | 'capitalize' = 'none';
}