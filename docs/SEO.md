# Tối Ưu Hóa Tìm Kiếm (SEO) & Lập Chỉ Mục Tự Động — ViTrainer

Tài liệu kỹ thuật về chiến lược tối ưu hóa công cụ tìm kiếm (**Search Engine Optimization - SEO**), cấu trúc trang tĩnh, và quy chuẩn siêu dữ liệu (Metadata) cho trò chơi **ViTrainer**.

---

## 1. Kiến Trúc Sinh Trang SEO Tĩnh (Static SEO Architecture)

Để đảm bảo hiệu năng tải trang cao nhất (Core Web Vitals điểm số 95+) và khả năng lập chỉ mục hoàn hảo của Google Search Bot, ViTrainer sử dụng kiến trúc sinh trang tĩnh thông qua script:

```bash
python tools/make_seo_pages.py
```

### Các trang được sinh tự động:
1. **Trang chủ chính**: `index.html` (tiếng Việt).
2. **Trang quốc tế**: `en/index.html` (giao diện và nội dung hoàn toàn bằng tiếng Anh).
3. **Các chuyên mục con SEO**:
   - `pokedex/index.html` & `en/pokedex/index.html`: Danh mục 1021 loài Pokémon kèm hình ảnh và chỉ số chi tiết.
   - `chieu-thuc/index.html` & `en/moves/index.html`: Bảng tra cứu 139 chiêu thức chiến đấu.
   - `cam-nang/index.html` & `en/guide/index.html`: Cẩm nang hướng dẫn tân thủ và các mẹo sinh tồn.
   - `tin-tuc/index.html` & `en/news/index.html`: Nhật ký cập nhật phiên bản (Changelog).
   - `quyen-rieng-tu/index.html`: Chính sách quyền riêng tư và điều khoản sử dụng.
   - `404.html`: Trang xử lý lỗi điều hướng thông minh.
   - `sitemap.xml`: Sơ đồ trang web chứa toàn bộ liên kết nội bộ kèm thời gian cập nhật `lastmod`.
   - `robots.txt`: Khai báo quyền lập chỉ mục cho các công cụ tìm kiếm hợp pháp.

---

## 2. Thẻ Siêu Dữ Liệu & Chia Sẻ Mạng Xã Hội (Social Metadata)

Mọi trang tĩnh đều được nhúng đầy đủ các thẻ siêu dữ liệu theo chuẩn quốc tế:
- **Tiêu đề trang (`<title>`)**: `ViTrainer — Roguelite Sinh Tồn Pokémon & Thám Hiểm Hầm Ngục`.
- **Thẻ mô tả (`<meta name="description">`)**: Tóm tắt lối chơi cuốn hút, khả năng chơi trực tiếp trên trình duyệt máy tính và điện thoại, không cần cài đặt.
- **Thẻ Canonical & Hreflang**:
  - `<link rel="canonical" href="https://namtaccozz.github.io/ViTrainer/">`
  - `<link rel="alternate" hreflang="vi" href="...">`
  - `<link rel="alternate" hreflang="en" href="...">`
  - `<link rel="alternate" hreflang="x-default" href="...">`
- **Thẻ OpenGraph & Twitter Card**:
  - `og:image` $\rightarrow$ `https://namtaccozz.github.io/ViTrainer/assets/icons/ViTrainer.png`
  - `og:title`, `og:description`, `og:type = website`
  - `twitter:card = summary_large_image`

---

## 3. Dữ Liệu Có Cấu Trúc (Structured Data — Schema.org)

Các trang được tích hợp mã Schema JSON-LD theo định dạng `VideoGame` nhằm tối ưu hóa hiển thị trên kết quả tìm kiếm Google (Rich Snippets):

```json
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "ViTrainer",
  "url": "https://namtaccozz.github.io/ViTrainer/",
  "description": "Trò chơi hành động sinh tồn roguelite Pokémon phong cách Mystery Dungeon hoàn toàn miễn phí trên trình duyệt.",
  "genre": ["Action", "Roguelite", "Survival", "Multiplayer Co-op"],
  "playMode": ["SinglePlayer", "MultiPlayer", "CoOp"],
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser (Chrome, Safari, Firefox, Edge)",
  "author": {
    "@type": "Organization",
    "name": "ViTeam"
  }
}
```

---

## 4. Tối Ưu Hiệu Năng & Trải Nghiệm Trang (Core Web Vitals)

- **LCP (Largest Contentful Paint)**: Tối ưu dưới 1.2s nhờ tải nén tài nguyên hình ảnh định dạng WebP, nén Terser và sử dụng bộ đệm Canvas.
- **FID / INP (Interaction to Next Paint)**: Tối ưu dưới 50ms nhờ xử lý logic vòng lặp game tách biệt khỏi DOM (Decoupled Render Loop).
- **CLS (Cumulative Layout Shift)**: Bằng 0 tuyệt đối nhờ cố định kích thước khung canvas và vùng hiển thị HUD ngay từ khi tải trang.
