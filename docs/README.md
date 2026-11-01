# TÀI LIỆU TOÀN DIỆN HỆ THỐNG VITRAINER
*(ViTrainer Master Documentation Hub)*

Chào mừng bạn và các Agent đến với trung tâm tài liệu kỹ thuật và gameplay của dự án **ViTrainer** (ViTeam). Bộ tài liệu này được biên soạn đầy đủ, chi tiết và có cấu trúc khép kín để bất kỳ ai hoặc bất kỳ Agent nào đọc toàn bộ các file `.md` trong thư mục này đều hiểu rõ 100% cách hoạt động, luật chơi, nội dung chi tiết, giao diện UI/UX và kiến trúc kỹ thuật của toàn bộ dự án mà không cần phải đọc trực tiếp mã nguồn.

> [!IMPORTANT]
> **DÀNH CHO AGENT & LẬP TRÌNH VIÊN: ĐỌC ĐẦU TIÊN KHI BẮT ĐẦU TASK**
> Luôn luôn đọc file **[`docs/QUICK_REFERENCE.md`](./QUICK_REFERENCE.md)** đầu tiên! File này chứa bảng ánh xạ toàn bộ tính năng vào đúng file nguồn, danh sách các bug phổ biến (crash, desync co-op, kẹt tiến hóa, đè HUD, lỗi cuộn Pokédex) cùng cách sửa nhanh nhất mà không cần phải đọc dò từng dòng code.

---

## 📚 MỤC LỤC TÀI LIỆU CHÍNH (DOCUMENTATION INDEX)

### 1. Hệ Thống Dữ Liệu Chuyên Sâu (Deep System Manuals)
- **[Hệ Thống Chiêu Thức & Dung Hợp (moves.md)](./moves.md)**:
  - Bảng tra cứu 139 chiêu thức chuẩn canon Pokémon: Phân loại Hệ, Thể loại (Vật lý vs Đặc biệt), Sát thương, Thời gian hồi, Tầm ảnh hưởng.
  - Cơ chế Chiêu Thức Độc Quyền (Signature Moves) của các thần thú huyền thoại: Chùm tia duy trì (Continuous Beam), Hút máu (Lifesteal), Triệu hồi sấm sét (Chain Lightning), Choáng & Hất văng (Stun & Knockback).
  - Hệ thống Dung Hợp Chiêu Thức (Bond System, tối đa 4 chiêu trong 1 slot).
  - Cơ chế Tiến Hóa Chiêu 3 Nấc (+, ++, +++).
- **[Hệ Thống Nội Tại Pokémon (abilities.md)](./abilities.md)**:
  - Bảng tra cứu đầy đủ các Ability trong game, phân loại theo nhóm hiệu ứng thực tế (Tăng sát thương, Phòng ngự & Hộ mệnh, Hồi máu & Hút sinh lực, Thời tiết & Địa hình, Tiện ích & Cơ động).
- **[Hệ Thống Pokémon & Tiến Hóa (pokemons.md)](./pokemons.md)**:
  - Cấu trúc cây tiến hóa Pokémon: Chuỗi 3 bậc (`3stage`), 2 bậc (`2stage`), đơn bậc (`single`), phân nhánh (`branch`).
  - Quy chuẩn cân bằng chỉ số 3 bậc: Buff dạng 1 (+35% Atk, +35% HP, +8% Spd), Dạng 2 (+28% Atk, +25% HP, +10% Spd, ngang single-stage), Dạng 3 (+45% Atk, +45% HP, +20% Spd).
  - Các mốc cấp độ tiến hóa trong trận (Level 15, Level 30), Hồi phục 50% HP khi tiến hóa.
  - Hình thái Mega, Primal Reversion, Ultra Burst, Hợp thể Kyurem/Necrozma và Hào quang Thần Năng (Mega Aura).
  - Dòng tiến hóa thần thoại Zygarde (10% $\rightarrow$ 50% $\rightarrow$ 100% $\rightarrow$ Mega).
- **[Hệ Thống Trang Bị Giữ (items.md)](./items.md)**:
  - Danh mục 21 Trang Bị Giữ (Held Items) trong `js/data/items.js`: Tên, icon, mô tả, nội tại `on(pl)` và `off(pl)`.
  - Tương tác giữa trang bị và hệ thống phòng thủ (Assault Vest giảm thêm 20% sát thương độc lập với trần 70% của thẻ Giáp; Eviolite tăng 40% giáp cho loài chưa tiến hóa hết).
- **[Hệ Thống Boss & Cơ Chế Đột Phá (bosses.md)](./bosses.md)**:
  - Bảng chu kỳ xuất hiện Boss (cứ mỗi 3 phút từ phút 3 đến phút 27).
  - Công thức tính máu, sát thương, kinh nghiệm theo thời gian thực (`bossScale(t)`). Cơ chế làm dịu sau phút 20 và bảo vệ chống một đòn hạ gục (không quá 40% Max HP).
  - Cơ chế 3 Phase: Phase 1 Thường $\rightarrow$ Phase 2 Cuồng Nộ (Enrage, tăng tốc, triệu hồi đệ tử) $\rightarrow$ Phase 3 Thức Tỉnh Mega / Thần Năng.
  - Cửa sổ sơ hở phản công (`VULNERABLE!` 1.5s nhận thêm +50% sát thương).
  - Phân định rõ ràng sát thương Vật Lý (Physical) vs Phép (Special) của các tuyệt kỹ Boss và cạm bẫy diện rộng (Hazards).

---

### 2. Cẩm Nang Gameplay & Hướng Dẫn Kỹ Thuật Tổng Thể
0. **[Bảng Tra Cứu Nhanh & Danh Mục Sửa Lỗi Tốc Hành (QUICK_REFERENCE.md)](./QUICK_REFERENCE.md)**:
   - Bản đồ tính năng $\leftrightarrow$ file mã nguồn (`js/game.js`, `player.js`, `coop.js`, `inrun-events.js`, `enemy.js`...).
   - Hướng dẫn sửa nhanh các lỗi chí mạng và quy chuẩn phát triển.
1. **[Cẩm Nang Gameplay & Cơ Chế Hoạt Động (GAMEPLAY_MANUAL.md)](./GAMEPLAY_MANUAL.md)**:
   - Tổng quan trò chơi & Phong cách Mystery Dungeon Rogue-lite.
   - Vòng lặp Core Loop chi tiết từ lúc chọn Pokémon đến khi đối mặt Arceus.
   - Hệ thống điều khiển (Bàn phím, Chuột, Touch Virtual Joystick, Gamepad).
   - 3 Sự kiện Tuần tự Trong Trận (`inrun-events.js`): Chiếm Cờ, Thu Thập Đá Pha Lê, Chạy Trốn Tử Thần.
   - 18 Đấu trường Vết Nứt (Rifts) và Trận chiến Thẩm Phán Arceus (Sentencia phút 30).
   - Kinh tế, Shop Kecleon, Talents, Gacha Banners, Nhiệm vụ và Chế độ Chơi Hợp tác Đa người (Multiplayer Co-op 8 người).
2. **[Kiến Trúc Kỹ Thuật & Cấu Trúc Mã Nguồn (ARCHITECTURE_AND_SYSTEMS.md)](./ARCHITECTURE_AND_SYSTEMS.md)**:
   - Bản đồ cấu trúc thư mục toàn dự án (`assets/`, `js/`, `css/`, `tools/`, `tests/`).
   - Vòng đời trò chơi (Game Lifecycle), Fixed Timestep 60fps & Decoupled Render Loop.
   - Thiết kế các Module Dữ liệu tĩnh, Động cơ Chiến đấu & Công thức tính toán Sát thương, Tương khắc 18 hệ.
   - Giao thức Mạng WebRTC P2P phòng 8 người chơi qua Google STUN & Bộ nén nhị phân `net-codec.js`.
   - Quy trình Phát triển & Xuất bản theo chuẩn `AGENTS.md`.
3. **[Thiết Kế Giao Diện, Trải Nghiệm & Âm Thanh (UI_UX_AND_AUDIO.md)](./UI_UX_AND_AUDIO.md)**:
   - Triết lý thị giác: Retro 16-bit Pixel Art kết hợp Modern Dark Mode & Điểm nhấn Vàng Kim Hoàng Gia.
   - Cấu trúc HUD đỉnh màn hình không đè chữ, khay chiêu thức kèm Kind Badges.
   - Giao diện Pokédex Grid ảo vô tận, Cây Tiến hóa Trực quan, Gacha Banner, Kecleon Shop.
   - Hệ thống Âm thanh Web Audio API: Nhạc nền BGM và Bộ hiệu ứng âm thanh SFX.
4. **Các Tài Liệu Kỹ Thuật Khác**:
   - `MULTIPLAYER_PROTOCOL.md`: Đặc tả chi tiết giao thức nhị phân WebRTC Co-op (tối đa 8 người).
   - `LOCALIZATION.md`: Quy chuẩn và công cụ dịch thuật đa ngôn ngữ (i18n).
   - `XUAT_BAN.md`: Hướng dẫn vận hành và quy chuẩn phát hành phiên bản mới.
   - `SEO.md`: Cấu hình SEO và sinh trang tĩnh tự động cho bộ máy tìm kiếm.
   - `TEN_MIEN.md`: Cấu hình tên miền và DNS miễn phí trên Cloudflare.
