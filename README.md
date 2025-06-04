# 🛍️ sanglq1255.id.vn - Website Thời Trang TMĐT

**Thời gian phát triển:** 15/12/2024 – 18/01/2025  
**Vai trò:** Lập trình viên Fullstack  

Website thương mại điện tử thời trang với đầy đủ tính năng quản lý sản phẩm, đơn hàng và tích hợp thanh toán trực tuyến.

## 🚀 Công nghệ sử dụng

### Frontend
- React.js + Vite
- Redux Toolkit (Quản lý state)
- Tailwind CSS (Styling)
- React Hook Form (Xác thực form)
- Axios (Giao tiếp API)

### Backend
- Node.js + Express.js
- MongoDB (Cơ sở dữ liệu)
- Mongoose (ODM)
- JWT (Xác thực)
- Bcryptjs (Mã hóa mật khẩu)
- Stripe API (Cổng thanh toán)

## 🔑 Tính năng chính

### Quản lý sản phẩm
- Thêm/sửa/xóa/xem sản phẩm
- Phân loại theo danh mục, màu sắc
- Bộ lọc theo giá, đánh giá

### Hệ thống người dùng
- Đăng ký/đăng nhập với JWT
- Phân quyền Admin/User
- Quản lý thông tin cá nhân

### Giỏ hàng & Thanh toán
- Giỏ hàng thời gian thực
- Tích hợp Stripe (chế độ test)
- Lưu lịch sử giao dịch

## 🛠️ Cài đặt

```bash
# Clone dự án
git clone https://github.com/sanglq1255/webbanhang
cd webbanhang

# Cài đặt backend
cd backend
npm install
cp .env.example .env
npm run dev

# Cài đặt frontend (terminal mới)
cd ../frontend
npm install
npm run dev
💳 Thông tin thanh toán test
Loại thẻ	Số thẻ	CVC	Hết hạn
Visa	4242 4242 4242 4242	123	12/34
Lưu ý: Chỉ dùng được trong chế độ test
```
## 📸 Hình ảnh demo
# Trang chủ
![Ảnh chụp màn hình 2025-06-04 143411](https://github.com/user-attachments/assets/9445a657-08fe-4ad2-af99-b13ff8a2729b)

# Trang quản trị
Tài khoản demo:
- 📧 Email: admin@gmail.com
- 🔑 Mật khẩu: admin123
![Ảnh chụp màn hình 2025-06-04 143452](https://github.com/user-attachments/assets/24b37965-93a8-4e98-818f-add035ae585a)
