# TÀI LIỆU TOÀN DIỆN HỆ THỐNG POKÉSURVIVOR
*(PokéSurvivor Master Documentation Hub)*

Chào mừng bạn và các Agent đến với trung tâm tài liệu kỹ thuật và gameplay của dự án **PokéSurvivor**. Bộ tài liệu này được biên soạn đầy đủ, chi tiết và có cấu trúc khép kín để bất kỳ ai hoặc bất kỳ Agent nào đọc toàn bộ các file `.md` trong thư mục này đều hiểu rõ 100% cách hoạt động, luật chơi, nội dung chi tiết, giao diện UI/UX và kiến trúc kỹ thuật của toàn bộ dự án mà không cần phải đọc trực tiếp mã nguồn.

---

## 📚 MỤC LỤC TÀI LIỆU CHÍNH (DOCUMENTATION INDEX)

1. **[Cẩm Nang Gameplay & Cơ Chế Hoạt Động (GAMEPLAY_MANUAL.md)](./GAMEPLAY_MANUAL.md)**:
   - Tổng quan trò chơi & Phong cách Mystery Dungeon Rogue-lite.
   - Vòng lặp Core Loop chi tiết từ lúc chọn Pokémon đến khi đối mặt Arceus.
   - Hệ thống điều khiển (Bàn phím, Chuột, Touch Virtual Joystick, Gamepad).
   - Pokédex 1.021 loài, Hệ thống Độ hiếm (1 sao đến 5 sao), Chỉ số (HP, PA, SA, DF, SD, SPD), Thiên hướng Vật lý/Đặc biệt, Thưởng Đơn hệ (+20%).
   - Cơ chế Tiến hóa Giai đoạn (Lv 15, Lv 30), Thức tỉnh Ngôi sao (Despertar I), Vương miện Apex (+), Mảnh Gacha trùng lặp.
   - Toàn bộ 78 dạng Mega Evolution, Primal Reversion, Battle forms và Biến thể Vùng miền (Alolan, Galarian, Hisuian, Paldean).
   - Hệ thống 116 đòn đánh chuẩn canon, phân loại đòn (Melee, Beam, Projectile, Aura, Buff, Stun) và Biểu tượng Kiểu đòn (Kind Badges) trên HUD.
   - Đột phá đòn đánh Đa tầng (+ / ++ / +++), điều kiện kết hợp trang bị và hoàn thành nhiệm vụ thực chiến.
   - Kẻ địch, Boss Slots (scale máu x25+), Cơ chế Đại Boss Đa Phase (Phase 1 $\rightarrow$ Phase 2 Cuồng nộ $\rightarrow$ Phase 3 Thức tỉnh Mega/Primal).
   - 18 Đấu trường Vết Nứt (Rifts) và Trận chiến Thẩm Phán Arceus (Sentencia phút 30+).
   - Kinh tế (Vàng, Shop Kecleon, Talents vĩnh viễn), Gacha Banners, Hệ thống Nhiệm vụ Ngày/Tuần và Thành tựu trọn đời.
   - Chế độ Chơi Hợp tác Đa người (Multiplayer Co-op 4 người).

2. **[Kiến Trúc Kỹ Thuật & Cấu Trúc Mã Nguồn (ARCHITECTURE_AND_SYSTEMS.md)](./ARCHITECTURE_AND_SYSTEMS.md)**:
   - Bản đồ cấu trúc thư mục toàn dự án (`assets/`, `js/`, `css/`, `tools/`, `tests/`).
   - Vòng đời trò chơi (Game Lifecycle), Fixed Timestep 60fps & Decoupled Render Loop.
   - Thiết kế các Module Dữ liệu tĩnh (`pokedex.js`, `evolutions.js`, `moves.js`, `megas.js`, `enemies.js`...).
   - Động cơ Chiến đấu & Công thức tính toán Sát thương, Tương khắc 18 hệ (`typeMod`).
   - Động cơ Kẻ địch & Logic xử lý chuyển Phase Đại Boss (`advanceBossPhase`).
   - Hệ thống Lưu trữ Dữ liệu (`db.js`), Cấu trúc Save Object và Cơ chế Chống mất dữ liệu.
   - Giao thức Mạng WebRTC P2P không độ trễ qua Google STUN & Bộ nén nhị phân `net-codec.js` (>30% savings).
   - Quy trình Phát triển & Xuất bản theo chuẩn `AGENTS.md` (`dev.html`, `tools/build.js`, `tools/export_data.js`, `python tools/make_seo_pages.py`, `version.json`, `updater.js`).

3. **[Thiết Kế Giao Diện, Trải Nghiệm & Âm Thanh (UI_UX_AND_AUDIO.md)](./UI_UX_AND_AUDIO.md)**:
   - Triết lý thị giác: Retro 16-bit Pixel Art kết hợp Modern Dark Mode & Điểm nhấn Vàng Kim Hoàng Gia.
   - Cấu trúc HUD trong trận: Thanh máu đổi màu, Khay 6 chiêu thức kèm Kind Badges 10x10, Thanh máu Boss Đa Phase, Vùng cảnh báo nguy hiểm (Telegraphed Hazards).
   - Giao diện Pokédex Grid ảo vô tận (Infinite Virtual Scrolling) và Bảng Chi tiết Pokémon cho phép Xem trước (Preview) toàn diện mọi chỉ số, chiêu thức kể cả khi chưa sở hữu.
   - Cây Tiến hóa Trực quan: Hiển thị liên kết chuỗi chính, node Mega/Primal rực rỡ và hàng Biến thể Vùng miền (Regional Variants) cho phép nhấp vào để preview tức thì.
   - Giao diện Gacha Banner, Cửa hàng Kecleon Shop.
   - Hệ thống Âm thanh Web Audio API: Nhạc nền BGM theo từng bối cảnh và Bộ hiệu ứng âm thanh SFX phong phú.

4. **Các Tài Liệu Kỹ Thuật Chuyên Biệt Khác**:
   - `MULTIPLAYER_PROTOCOL.md`: Đặc tả chi tiết giao thức nhị phân và trao đổi gói tin WebRTC Co-op.
   - `LOCALIZATION.md`: Quy chuẩn và công cụ dịch thuật đa ngôn ngữ (i18n).
   - `PUBLICAR.md`: Hướng dẫn vận hành và quy chuẩn phát hành phiên bản mới.
   - `SEO.md`: Cấu hình SEO và sinh trang tĩnh tự động cho bộ máy tìm kiếm.
   - `DOMINIO.md`: Cấu hình tên miền và DNS miễn phí trên Cloudflare.
