# Cấu Hình Tên Miền, GitHub Pages & Hạ Tầng Mạng — ViTrainer

Tài liệu kỹ thuật về hạ tầng tên miền, hosting GitHub Pages và chính sách không tốn chi phí (**Zero-Cost Policy**) của trò chơi **ViTrainer** (ViTeam).

---

## 1. Hiện Trạng Hạ Tầng & Tên Miền (Cập nhật 2026)

- **Địa chỉ web chính thức (Production Web)**: `https://namtaccozz.github.io/ViTrainer/`
- **Mã nguồn chính thức (Official Repository)**: `https://github.com/namtacozz/ViTrainer`
- **Chính sách hạ tầng miễn phí (Zero Cost Policy)**:
  - **Hosting**: GitHub Pages phục vụ toàn bộ mã nguồn tĩnh và tài nguyên (`HTML/CSS/JS/Audio/Sprites`).
  - **DNS & CDN**: Quản lý qua Cloudflare (khi gắn tên miền tùy chỉnh), kích hoạt SSL/TLS miễn phí, chống DDoS và bộ nhớ đệm Cache Rules tối ưu.
  - **Backend Dữ liệu & Lưu trữ đám mây**: Firebase Spark Plan (miễn phí 100%), bao gồm Cloud Firestore, Firebase Realtime Database và Firebase Authentication.
  - **Mạng Chơi Hợp Tác (Multiplayer Co-op 8 người)**: Sử dụng kết nối mạng ngang hàng WebRTC qua máy chủ STUN miễn phí của Google (`stun.l.google.com:19302`), không dùng máy chủ TURN trả phí.

---

## 2. Cấu Hình Tên Miền Tùy Chỉnh Trên Cloudflare (Khi Áp Dụng Custom Domain)

Nếu triển khai tên miền riêng (ví dụ: `vitrainer.com` hoặc tên miền phụ), quy trình cấu hình chuẩn được thiết lập như sau:

### 2.1. Cấu hình bản ghi DNS (DNS Records)
Trong bảng điều khiển Cloudflare DNS:
- **Bản ghi Apex / Root (@)**:
  - Loại `A` $\rightarrow$ `185.199.108.153` (Bật Proxy đám mây màu cam)
  - Loại `A` $\rightarrow$ `185.199.109.153` (Bật Proxy đám mây màu cam)
  - Loại `A` $\rightarrow$ `185.199.110.153` (Bật Proxy đám mây màu cam)
  - Loại `A` $\rightarrow$ `185.199.111.153` (Bật Proxy đám mây màu cam)
- **Bản ghi Tên miền phụ (`www`)**:
  - Loại `CNAME` $\rightarrow$ `namtaccozz.github.io` (Bật Proxy đám mây màu cam)

### 2.2. Thiết lập SSL/TLS & Bảo Mật
- **Chế độ mã hóa SSL/TLS**: Chọn **Full** (hoặc *Full (strict)*) để đảm bảo toàn bộ luồng truyền giữa người chơi, Cloudflare và GitHub Pages luôn được mã hóa HTTPS 100%.
- **Luôn sử dụng HTTPS (Always Use HTTPS)**: Bật kích hoạt (`ON`).
- **Tự động viết lại HTTPS (Automatic HTTPS Rewrites)**: Bật kích hoạt (`ON`).
- **Phiên bản TLS tối thiểu**: Chọn `TLS 1.2` hoặc `TLS 1.3`.

---

## 3. Quy Chuẩn Bộ Nhớ Đệm & Cập Nhật Phiên Bản (Caching & Versioning)

Để đảm bảo người chơi luôn trải nghiệm phiên bản mới nhất ngay khi ViTeam xuất bản mà không bị kẹt cache trình duyệt:

1. **Cơ chế Hash Version (`version.json`)**:
   - Mỗi lần chạy pipeline `node tools/build.js`, file `version.json` sẽ được tạo mới với mã băm SHA ngẫu nhiên của bản build (ví dụ: `v=533bbb059e`).
   - Script `js/core/updater.js` tự động kiểm tra `version.json` mỗi 5 phút ngoài trận đấu. Nếu phát hiện phiên bản mới, trò chơi hiển thị thông báo đếm ngược 5 giây và tải lại trang tự động.
2. **Quy tắc Cache cho Cloudflare / Nginx (Cache Rules)**:
   - **Tài nguyên tĩnh có băm phiên bản (`js/app.min.js?v=...`, sprites, audio)**: Đặt thời gian lưu cache trình duyệt dài (Cache Everything, TTL 1 tháng).
   - **File cấu trúc và định danh (`index.html`, `version.json`, `robots.txt`, `sitemap.xml`)**: Đặt `Cache-Control: no-cache, no-store, must-revalidate` để trình duyệt luôn kiểm tra phiên bản mới từ máy chủ gốc.
3. **Service Worker (`sw.js`)**:
   - Quản lý bộ nhớ đệm ngoại tuyến (Offline Storage) cho các tài nguyên hình ảnh và âm thanh đã tải, giải phóng băng thông cho người chơi di động.

---

## 4. Xác Thực Tên Miền Trong Firebase Authentication

Khi người chơi đăng nhập bằng Google hoặc Tên tài khoản:
- Truy cập vào **Firebase Console $\rightarrow$ Authentication $\rightarrow$ Settings $\rightarrow$ Authorized Domains**.
- Đảm bảo các tên miền sau đã được thêm vào danh sách cho phép (Authorized Domains):
  - `namtaccozz.github.io` (Web chính thức trên GitHub Pages)
  - `localhost` và `127.0.0.1` (Môi trường kiểm thử nội bộ)
  - Tên miền tùy chỉnh chính thức (nếu có).
