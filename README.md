# ChuyenXeVui Frontend

Frontend Angular application cho hệ thống đặt vé xe khách ChuyenXeVui.

## Cấu trúc Project

```
FE_ChuyenXeVui/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/          # Component đăng nhập
│   │   │   ├── register/       # Component đăng ký
│   │   │   └── forgot-password/ # Component quên mật khẩu
│   │   ├── services/
│   │   │   └── auth.service.ts # Service xử lý authentication
│   │   ├── models/
│   │   │   └── auth.models.ts  # Models/Interfaces cho auth
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts # HTTP Interceptor cho JWT
│   │   ├── app.module.ts       # Root module
│   │   └── app.component.*     # Root component
│   ├── styles.css              # Global styles
│   └── index.html
├── angular.json
├── package.json
└── proxy.conf.json             # Proxy config cho API
```

## Tính năng

### 1. Đăng Nhập (Login)
- Form đăng nhập với email và mật khẩu
- Validation đầy đủ
- Xử lý lỗi và thông báo
- Tự động chuyển hướng sau khi đăng nhập thành công

### 2. Đăng Ký (Register)
- Form đăng ký với các trường:
  - Họ và tên
  - Email
  - Mật khẩu (tối thiểu 6 ký tự)
  - Số điện thoại (tùy chọn)
- Validation đầy đủ
- Tự động chuyển đến trang đăng nhập sau khi đăng ký thành công

### 3. Quên Mật Khẩu (Forgot Password)
- **Bước 1**: Nhập email để nhận mã OTP
- **Bước 2**: Xác thực mã OTP (6 chữ số)
- **Bước 3**: Đặt mật khẩu mới
- Có tính năng gửi lại mã OTP
- Validation mật khẩu và xác nhận mật khẩu

## Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình API Backend

File `proxy.conf.json` đã được cấu hình để proxy các request đến backend tại `http://localhost:8080`. Nếu backend chạy ở port khác, vui lòng cập nhật.

### 3. Chạy ứng dụng

```bash
npm start
# hoặc
ng serve
```

Ứng dụng sẽ chạy tại `http://localhost:4200`

## API Endpoints được sử dụng

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/verify-otp` - Xác thực OTP
- `POST /api/auth/set-new-password` - Đặt mật khẩu mới
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `POST /api/auth/refresh` - Refresh access token

## Lưu ý

1. Backend phải đang chạy tại `http://localhost:8080` (hoặc cập nhật proxy.conf.json)
2. Backend cần hỗ trợ CORS và cookies để authentication hoạt động đúng
3. JWT tokens được lưu trong localStorage
4. HTTP Interceptor tự động thêm Bearer token vào các request API

## Technologies

- Angular 17
- TypeScript
- RxJS
- Angular Forms (Reactive Forms)
- Angular Router
- Angular HTTP Client

## Development

### Build cho production

```bash
ng build --configuration production
```

### Chạy tests

```bash
ng test
```
