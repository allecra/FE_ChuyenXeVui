# Ứng Dụng Đặt Vé Xe Bus - Angular

Ứng dụng web đặt vé xe bus được phát triển bằng Angular 17 với standalone components.

## Cấu Trúc Dự Án

```
src/
├── app/
│   ├── components/
│   │   ├── header/                 # Header với menu điều hướng
│   │   ├── hero-section/           # Phần tìm kiếm chuyến xe
│   │   ├── popular-routes/         # Tuyến đường phổ biến
│   │   ├── promotions/             # Banner khuyến mãi
│   │   ├── popular-companies/      # Nhà xe phổ biến
│   │   ├── popular-stations/       # Bến xe phổ biến
│   │   ├── reviews/                # Đánh giá và reviews
│   │   ├── features/               # Tính năng nổi bật
│   │   └── footer/                 # Footer
│   ├── app.component.ts            # Component chính
│   ├── app.component.html          # Template chính
│   └── app.component.scss          # Styles chính
├── assets/
│   └── img/                        # Thư mục chứa hình ảnh
├── index.html                      # File HTML chính
├── main.ts                         # Bootstrap file
└── styles.scss                     # Global styles

```

## Cài Đặt và Chạy

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Copy hình ảnh:**
   - Copy tất cả hình ảnh từ Figma export vào thư mục `src/assets/img/`
   - Đảm bảo tên file giống như trong code

3. **Chạy ứng dụng:**
   ```bash
   npm start
   ```
   
   Ứng dụng sẽ chạy tại: http://localhost:4200

## Tính Năng

- ✅ **Responsive Design**: Layout tương thích với thiết kế Figma
- ✅ **Angular 17**: Sử dụng standalone components
- ✅ **SCSS Support**: Hỗ trợ SCSS cho styling
- ✅ **Component Architecture**: Chia nhỏ thành các components logic
- ✅ **Asset Management**: Quản lý hình ảnh qua thư mục assets

## Components

### 1. HeaderComponent
- Menu điều hướng
- Thông tin liên hệ
- Logo

### 2. HeroSectionComponent  
- Form tìm kiếm chuyến xe
- Background image
- Các trường: Điểm khởi hành, Điểm đến, Ngày khởi hành

### 3. PopularRoutesComponent
- Hiển thị các tuyến đường phổ biến
- Card layout với hình ảnh và giá

### 4. PromotionsComponent
- Banner khuyến mãi
- Slider với navigation arrows

### 5. PopularCompaniesComponent
- Danh sách nhà xe phổ biến
- Card layout với logo nhà xe

### 6. PopularStationsComponent
- Danh sách bến xe phổ biến
- Card layout với hình ảnh bến xe

### 7. ReviewsComponent
- Reviews và đánh giá theo địa điểm
- Grid layout với background images

### 8. FeaturesComponent
- Tính năng nổi bật của platform
- Icons và mô tả

### 9. FooterComponent
- Footer với thông tin liên hệ

## Hình Ảnh Placeholder

✅ **Đã tạo sẵn tất cả hình ảnh placeholder!** 

Tất cả hình ảnh cần thiết đã được tạo sẵn trong `src/assets/img/` bao gồm:

### Icons & UI Elements:
- `logo.svg` - Logo chính của ứng dụng
- `image-2.png` - Icon nhỏ trong header
- `vector-3.svg` - Icon email
- `vector.svg` - Icon điện thoại
- `calendar.svg` - Icon lịch
- `search.svg` - Icon tìm kiếm
- `arrow-circle-left.svg` & `arrow-circle-right.svg` - Navigation arrows

### Background Images:
- `image-3.png` - Background hero section
- `uudainoibat.jpg` - Banner khuyến mãi

### Route & Company Images:
- `nha-xe-an-hoa-hiep-ca-mau-kon-tum-jpg-3.png` - Sài Gòn - Vũng Tàu
- `nha-xe-an-hoa-hiep-ca-mau-kon-tum-jpg.png` - Sài Gòn - Mũi Né  
- `image.png` - Sài Gòn - Nha Trang
- `nha-xe-an-hoa-hiep-ca-mau-kon-tum-jpg-2.png` - Nha Trang - Đà Lạt

### Station Images:
- `BX-1-jpg.png` - Bến xe Miền Đông Mới
- `be-CC-81n-jpg.png` - Bến xe Miền Tây
- `ben-giap-bat-1-jpg.png` - Bến xe Giáp Bát
- `my-dinh-2-jpg.png` - Bến xe Mỹ Đình

### Review Backgrounds:
- `background-2.png` đến `background-8.png` - Các background cho reviews
- `link.jpg` - Main review image

### Feature Icons:
- `satisfaction-png.svg` - Icon hài lòng
- `ribbon-png.png` - Icon đảm bảo
- `cooperate-png.png` - Icon cam kết
- `telephone-png.png` - Icon hỗ trợ

### Footer:
- `footer.png` - Footer image

**Bạn có thể chạy ứng dụng ngay lập tức!** Sau đó thay thế bằng hình ảnh thật từ thiết kế của bạn.

## Customization

- **Colors**: Chỉnh sửa màu sắc trong các file SCSS
- **Fonts**: Font được sử dụng: Segoe UI, Acme
- **Layout**: Giữ nguyên absolute positioning như thiết kế Figma
- **Components**: Có thể thêm logic TypeScript vào các components

## Build Production

```bash
npm run build
```

Files build sẽ được tạo trong thư mục `dist/`

## Lưu Ý

- Layout sử dụng absolute positioning để giữ nguyên thiết kế Figma
- Tất cả class names được giữ nguyên từ Figma export
- Responsive design có thể cần điều chỉnh thêm cho mobile
- Cần copy đầy đủ hình ảnh để hiển thị chính xác