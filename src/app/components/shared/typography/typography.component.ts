import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="variant">
      <!-- Title variants -->
      <h1 *ngSwitchCase="'h1'" 
          class="typography-element" 
          [ngClass]="getClasses()"
          [style.color]="color"
          [style.font-size.px]="fontSize"
          [style.text-transform]="textTransform">
        <ng-content></ng-content>
      </h1>
      
      <h2 *ngSwitchCase="'h2'" 
          class="typography-element" 
          [ngClass]="getClasses()"
          [style.color]="color"
          [style.font-size.px]="fontSize"
          [style.text-transform]="textTransform">
        <ng-content></ng-content>
      </h2>
      
      <h3 *ngSwitchCase="'h3'" 
          class="typography-element" 
          [ngClass]="getClasses()"
          [style.color]="color"
          [style.font-size.px]="fontSize"
          [style.text-transform]="textTransform">
        <ng-content></ng-content>
      </h3>
      
      <!-- Body text -->
      <p *ngSwitchCase="'body'" 
         class="typography-element" 
         [ngClass]="getClasses()"
         [style.color]="color"
         [style.font-size.px]="fontSize"
         [style.text-transform]="textTransform">
        <ng-content></ng-content>
      </p>
      
      <!-- Span -->
      <span *ngSwitchCase="'span'" 
            class="typography-element" 
            [ngClass]="getClasses()"
            [style.color]="color"
            [style.font-size.px]="fontSize"
            [style.text-transform]="textTransform">
        <ng-content></ng-content>
      </span>
      
      <!-- Default paragraph -->
      <p *ngSwitchDefault 
         class="typography-element" 
         [ngClass]="getClasses()"
         [style.color]="color"
         [style.font-size.px]="fontSize"
         [style.text-transform]="textTransform">
        <ng-content></ng-content>
      </p>
    </ng-container>
  `,
  styleUrls: ['./typography.component.scss']
})
export class TypographyComponent {
  @Input() variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'span' = 'body';
  @Input() weight: 'normal' | 'bold' = 'normal';
  @Input() size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @Input() color: string = '#000000';
  @Input() fontSize?: number;
  @Input() textTransform: 'none' | 'lowercase' | 'uppercase' | 'capitalize' = 'none';
  @Input() customClass: string = '';

  getClasses(): string {
    const classes = [
      `weight-${this.weight}`,
      `size-${this.size}`,
      this.customClass
    ];
    return classes.filter(c => c).join(' ');
  }
}