import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-main',
  standalone: true,
  templateUrl: './footer-main.component.html',
  styleUrl: './footer-main.component.css'
})
export class FooterMainComponent {
  year = new Date().getFullYear();
}
