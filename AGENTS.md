# ViTrainer — Hướng dẫn Vận hành & Quy chuẩn Phát triển Dự án

Tài liệu quy chuẩn cốt lõi của chủ sở hữu dự án (**ViTeam**). Luôn luôn đọc file này đầu tiên trước khi thực hiện mọi tác vụ code, build hoặc deploy.

---

## 1. Thông tin Dự án
- **Tên trò chơi**: ViTrainer
- **Đội ngũ phát triển (Team oficial)**: ViTeam
- **Repository chính thức**: `https://github.com/namtacozz/ViTrainer`
- **Địa chỉ web chính thức (GitHub Pages)**: `https://namtaccozz.github.io/ViTrainer/`
- **Icon web chính thức**: `assets/icons/ViTrainer.ico` và `favicon.ico`
- **Ảnh preview mạng xã hội / OpenGraph / Twitter**: `assets/icons/ViTrainer.png`

---

## 2. Quy trình Biên dịch và Xuất bản (MANDATORY)

Mỗi khi thay đổi code hoặc tài nguyên cần triển khai, PHẢI tuân thủ 100% các bước sau:

1. **Chỉnh sửa file nguồn:**
   - Chỉ chỉnh sửa `dev.html` (tuyệt đối **KHÔNG** sửa trực tiếp `index.html` vì `index.html` sẽ bị ghi đè tự động trong quá trình build).
   - Các file dữ liệu nằm trong `js/data/` (`moves.js`, `pokedex.js`, `megas.js`, `starters.js`, `lang-*.js`...).
   - Các hệ thống nằm trong `js/systems/` và giao diện người dùng nằm trong `js/ui/`.

2. **Chạy Pipeline Build:**
   ```bash
   node tools/build.js && node tools/export_data.js && python tools/make_seo_pages.py
   ```
   - `build.js` thực hiện nén Terser, Javascript Obfuscator, tạo `js/app.min.js`, đóng gói `index.html` và sinh `version.json` (mã băm phiên bản mới).
   - `export_data.js` đồng bộ dữ liệu pokédex, move, arena, v.v.
   - `make_seo_pages.py` đồng bộ lại trang chủ, trang tiếng Anh `en/`, 404, robots, sitemap.

3. **Chạy kiểm thử trước khi commit:**
   ```bash
   node --test tests/i18n.test.cjs
   ```
   Tất cả các bài test phải vượt qua (pass) 100%.

4. **Git Commit & Push:**
   - Tuyệt đối **KHÔNG** đính kèm dòng chữ "Co-Authored-By", AI branding hay bất kỳ chữ ký AI nào trong git commit message.
   - Chỉ chạy `git push origin main` khi người dùng yêu cầu hoặc sau khi đã hoàn tất toàn bộ kiểm thử.

---

## 3. Cơ chế Cập nhật Tự động Người chơi (Updater)
- File `js/core/updater.js` định kỳ kiểm tra `version.json` mỗi 5 phút:
  - **Ngoài trận đấu (Menu / Phòng chờ Co-op 8 người)**: Hiện thông báo 5 giây và trang tự động reload phiên bản mới nhất (không làm mất dữ liệu).
  - **Trong trận đấu**: Không can thiệp, chờ người chơi hoàn thành trận đấu xong mới reload.
- **TUYỆT ĐỐI KHÔNG** xóa `updater.js` hoặc cơ chế ghi `version.json` trong `tools/build.js`.

---

## 4. Quy chuẩn Chiêu thức Độc quyền & Tiến hóa
- **Chiêu thức độc quyền (Signature Moves)**:
  - Phải có thuộc tính `exclusive: true`.
  - Cho phép dung hợp / kết hợp (bond) cùng tối đa 3 chiêu khác như các chiêu thông thường (`BOND_MAX = 4`).
  - Phải được gán chính xác theo loài trong `EXCLUSIVE_BY_DEX` tại `js/data/moves.js`.
  - Tuyệt đối **KHÔNG** để lọt vào bể chiêu ngẫu nhiên theo hệ (`POOL[type]`) hoặc bể Normal (`POOL.normal`).
  - Không cho phép chọn sẵn trong danh sách chiêu khởi đầu (`startChoices`).
  - Không cho phép học tự do qua Đĩa dạy chiêu TM (`G.TM_OF`).
- **Dòng tiến hóa Zygarde & Nhiệm vụ đặc biệt**:
  - Dạng 10% (Lvl 1 - 9) $\rightarrow$ Dạng 50% (Lvl 10 - 24) $\rightarrow$ Dạng 100% (Lvl 25+, tặng Core Enforcer) $\rightarrow$ Dạng Mega (Lvl 50 + hoàn thành nhiệm vụ quái).
  - Core Enforcer nâng cấp thành Nihil Light khi đạt dạng Mega.

---

## 5. Quy chuẩn Hạ tầng Miễn phí (Zero Cost Policy)
- **Firebase**: Sử dụng gói miễn phí Spark (Realtime Database & Authentication cơ bản). Tuyệt đối không kích hoạt Identity Platform hoặc các tính năng trả phí.
- **Multiplayer Co-op (tối đa 8 người)**: Sử dụng kết nối mạng ngang hàng WebRTC qua máy chủ STUN miễn phí của Google. Không dùng Worker trả phí hay TURN server tính tiền.
