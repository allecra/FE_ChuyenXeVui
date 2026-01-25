import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  // Contact form data
  contactForm = {
    fullName: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmitContact(): void {
    console.log('📧 Contact form submitted:', this.contactForm);
    
    // Validate form
    if (!this.contactForm.fullName || !this.contactForm.email || !this.contactForm.message) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    // Simulate form submission
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
    
    // Reset form
    this.contactForm = {
      fullName: '',
      email: '',
      phone: '',
      message: ''
    };
  }

}