# Quy Trình Biên Dịch, Kiểm Thử & Xuất Bản — ViTrainer

Tài liệu quy chuẩn bắt buộc của chủ sở hữu dự án (**ViTeam**) về quy trình phát triển, biên dịch, kiểm thử tự động và xuất bản trò chơi **ViTrainer**.

---

## 1. Các Quy Tắc Bất Khả Xâm Phạm (STRICT RULES)

1. **Tuyệt đối KHÔNG chỉnh sửa trực tiếp `index.html`**:
   - `index.html` là tệp tin được sinh ra tự động từ `tools/build.js` thông qua quá trình nén Terser và Javascript Obfuscator. Mọi chỉnh sửa thủ công vào `index.html` sẽ bị ghi đè và biến mất hoàn toàn.
   - Luôn luôn chỉnh sửa trên file nguồn gốc: **[`dev.html`](file:///e:/GameMaking/pokesurvivor/dev.html)**.
2. **Cấu trúc phân vùng file mã nguồn**:
   - Giao diện HTML và bố cục khung: `dev.html`.
   - Dữ liệu tĩnh: Thư mục `js/data/` (`moves.js`, `pokedex.js`, `megas.js`, `items.js`, `enemies.js`, `lang-*.js`).
   - Động cơ thực thể: Thư mục `js/entities/` (`player.js`, `enemy.js`...).
   - Động cơ hệ thống: Thư mục `js/systems/` (`combat.js`, `levelup.js`, `rift.js`, `judgment.js`, `hazards.js`...).
   - Giao diện người dùng: Thư mục `js/ui/` (`menu.js`, `settings-ui.js`, `login.js`, `run-ui.js`...).
   - Kết nối mạng: Thư mục `js/net/` (`coop.js`, `net-codec.js`...).
3. **Tuyệt đối KHÔNG đính kèm chữ ký AI**:
   - Không đưa "Co-Authored-By", AI watermark, hay bất kỳ nội dung nhận diện AI nào vào git commit message.
4. **Bảo toàn cơ chế tự động cập nhật của người chơi**:
   - Không được sửa đổi hoặc xóa `js/core/updater.js` và logic ghi mã phiên bản `version.json` trong `tools/build.js`.

---

## 2. Chuỗi Pipeline Biên Dịch Đóng Gói (Build Pipeline)

Sau khi hoàn tất chỉnh sửa mã nguồn hoặc dữ liệu, lập trình viên/Agent **BẮT BUỘC** phải chạy toàn bộ lệnh sau theo thứ tự:

```bash
node tools/build.js && node tools/export_data.js && python tools/make_seo_pages.py
```

### Chức năng của từng bước:
1. **`node tools/build.js`**:
   - Gộp toàn bộ 88 scripts từ `dev.html`.
   - Nén mã nguồn bằng Terser.
   - Xáo trộn bảo vệ mã (Javascript Obfuscator) tạo thành `js/app.min.js`.
   - Đóng gói toàn diện ra `index.html`.
   - Sinh mã băm phiên bản mới và ghi vào `version.json` (ví dụ: `v=533bbb059e`).
2. **`node tools/export_data.js`**:
   - Đồng bộ dữ liệu tĩnh: 1021 Pokémon, 139 chiêu thức, 21 vật phẩm trang bị, 139 thành tựu, 18 đấu trường và hơn 1900 bản dịch.
3. **`python tools/make_seo_pages.py`**:
   - Tự động đồng bộ và sinh mới 20 trang SEO tĩnh, phiên bản tiếng Anh tại thư mục `en/`, trang lỗi 404, file `robots.txt` và sơ đồ trang web `sitemap.xml`.

---

## 3. Quy Trình Kiểm Thử Bắt Buộc Trước Khi Commit (Pre-Commit Testing)

Toàn bộ các bộ kiểm thử tự động phải vượt qua (pass) 100%:

```bash
node --test tests/i18n.test.cjs tests/buffs.test.cjs tests/net.test.cjs
```

- **`tests/i18n.test.cjs`**: Kiểm tra tính toàn vẹn của từ điển Tiếng Việt, Tiếng Anh, các tham số placeholder và bộ đệm Canvas.
- **`tests/buffs.test.cjs`**: Kiểm tra tính chính xác của các chỉ số buff/debuff, hiệu ứng trang bị Assault Vest, Eviolite và cơ chế cộng dồn giáp.
- **`tests/net.test.cjs`**: Kiểm tra 38 bài test giao thức mạng nhị phân WebRTC, xử lý gói tin, kết nối lại khi mất mạng và đồng bộ Co-op 8 người.

---

## 4. Cơ Chế Tự Động Cập Nhật Cho Người Chơi (Live Updater)

- Module `js/core/updater.js` kiểm tra file `version.json` theo chu kỳ mỗi **5 phút**:
  - **Ở ngoài trận đấu (Sảnh chính / Menu / Phòng chờ Co-op 8 người)**: Khi có bản build mới, hệ thống sẽ hiển thị thanh thông báo đếm ngược 5 giây và trang web tự động tải lại phiên bản mới nhất mà không làm mất dữ liệu tài khoản hay tiến trình của người chơi.
  - **Khi đang trong trận đấu**: Hệ thống hoàn toàn không can thiệp để tránh làm gián đoạn trải nghiệm của người chơi. Quá trình cập nhật sẽ diễn ra ngay sau khi trận đấu kết thúc.
