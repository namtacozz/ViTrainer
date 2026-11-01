# Bảng Tra Cứu Nhanh Hệ Thống & Sửa Lỗi Tốc Hành — ViTrainer
*(Dành cho Nhà phát triển và AI Agent: Đọc file này TRƯỚC TIÊN để nắm ngay vị trí code và cách xử lý, không cần dò tìm từng file)*

---

## 1. Bản Đồ Tập Trung: Tính Năng Ở File Nào? (System To File Map)

| Tính Năng / Cơ Chế | Tệp Tin Mã Nguồn Chính | Mô Tả & Lưu Ý Cốt Lõi |
| :--- | :--- | :--- |
| **Vòng lặp trò chơi & Trạng thái** | [`js/game.js`](file:///e:/GameMaking/pokesurvivor/js/game.js) | Khởi tạo engine, State machine (`ui`, `play`, `pause`, `gameover`), Fixed Timestep 60fps. |
| **Thực thể Người Chơi (Player)** | [`js/entities/player.js`](file:///e:/GameMaking/pokesurvivor/js/entities/player.js) | Di chuyển, nhận sát thương, hệ thống PDEF/SDEF, cân bằng chỉ số tiến hóa 3 bậc, dạng Mega/Apex(+), dòng Zygarde. |
| **Thực thể Kẻ Địch & Boss** | [`js/entities/enemy.js`](file:///e:/GameMaking/pokesurvivor/js/entities/enemy.js) | AI di chuyển, hành vi, Boss 3 phase (Thường $\rightarrow$ Cuồng nộ $\rightarrow$ Mega), cửa sổ sơ hở `VULNERABLE!` 1.5s (+50% dmg), One-shot protection (tối đa 40% HP). |
| **Động cơ Chiến Đấu & Chiêu Thức** | [`js/systems/combat.js`](file:///e:/GameMaking/pokesurvivor/js/systems/combat.js) | Bắn chiêu, tính sát thương, cơ chế chiêu độc quyền (Continuous Beam, Lifesteal, Chain Lightning, Sleep Vortex, Stun). |
| **Nâng Cấp Cấp Độ (Level Up)** | [`js/systems/levelup.js`](file:///e:/GameMaking/pokesurvivor/js/systems/levelup.js) | Rút 3 thẻ kỹ năng, lọc bỏ vĩnh viễn các thẻ chỉ số đã đạt MAX (PDEF, SDEF, Tốc chiêu, Tốc chạy, Hút ngọc). |
| **Cổng Không Gian (Rift Queue)** | [`js/systems/rift.js`](file:///e:/GameMaking/pokesurvivor/js/systems/rift.js) | Quản lý timeline mở cổng Rift, hàng đợi an toàn chờ Boss chết mới mở cổng, 3 tầng fallback vị trí mở cổng. |
| **Phán Quyết Arceus (Phút 30+)** | [`js/systems/judgment.js`](file:///e:/GameMaking/pokesurvivor/js/systems/judgment.js) | Trận chiến thẩm phán tối hậu, kết thúc toàn bộ ván đấu tại phút 30. |
| **Liên Kết Tài Khoản & Cơ Sở Dữ Liệu** | [`js/core/db.js`](file:///e:/GameMaking/pokesurvivor/js/core/db.js) | Đăng nhập Google, đăng ký tài khoản, cơ chế `linkPassword` & `linkGoogle` cho phép vào cùng 1 tài khoản linh hoạt. |
| **Chơi Hợp Tác Co-op 8 Người** | [`js/net/coop.js`](file:///e:/GameMaking/pokesurvivor/js/net/coop.js), [`js/net/net-codec.js`](file:///e:/GameMaking/pokesurvivor/js/net/net-codec.js) | WebRTC P2P qua Google STUN, mã hóa nhị phân v1 tiết kiệm >30% băng thông, đồng bộ chuyển phase Boss và tiến hóa. |
| **Giao Diện Cài Đặt (Settings UI)** | [`js/ui/settings-ui.js`](file:///e:/GameMaking/pokesurvivor/js/ui/settings-ui.js) | Tab Tài khoản (Cuenta): quản lý liên kết Google, form liên kết Tên/Mật khẩu thuần, âm thanh, điều khiển, ngôn ngữ. |
| **Dữ Liệu Chiêu Thức (139 Moves)** | [`js/data/moves.js`](file:///e:/GameMaking/pokesurvivor/js/data/moves.js) | Toàn bộ 139 chiêu thức chuẩn canon Physical vs Special, chiêu thức độc quyền (`exclusive: true`), quy chuẩn bể chiêu. |
| **Dữ Liệu Tiến Hóa & Pokédex** | [`js/data/evolutions.js`](file:///e:/GameMaking/pokesurvivor/js/data/evolutions.js), [`pokedex.js`](file:///e:/GameMaking/pokesurvivor/js/data/pokedex.js) | Cây tiến hóa 1021 Pokémon (3stage, 2stage, single, branch), BST, độ hiếm Gacha. |
| **Dữ Liệu Trang Bị (21 Items)** | [`js/data/items.js`](file:///e:/GameMaking/pokesurvivor/js/data/items.js) | Toàn bộ 21 Held Items, nội tại `on(pl)` / `off(pl)` (Assault Vest, Eviolite, Choice Band...). |
| **Dữ Liệu Đa Ngôn Ngữ (i18n)** | [`js/data/lang-en.js`](file:///e:/GameMaking/pokesurvivor/js/data/lang-en.js), [`lang-vi.js`](file:///e:/GameMaking/pokesurvivor/js/data/lang-vi.js) | Từ điển song ngữ Tiếng Việt và Tiếng Anh đồng bộ 100%. |

---

## 2. Danh Mục Khắc Phục Lỗi Nhanh (Common Bugs & Fast Fixes)

### 2.1. Lỗi Thẻ Nâng Cấp Đã Max Vẫn Xuất Hiện Khi Lên Cấp
- **Hiện tượng**: Người chơi đã nâng tối đa Giáp (8/8) hoặc Giảm hồi chiêu (10/10) nhưng thẻ nâng cấp đó vẫn tiếp tục hiện ra làm lãng phí lượt chọn.
- **Vị trí xử lý**: [`js/systems/levelup.js`](file:///e:/GameMaking/pokesurvivor/js/systems/levelup.js) trong hàm `roll()`.
- **Cách sửa**: Lọc điều kiện `!s.max || (pl.statsTaken[s.id] || 0) < s.max` ngay từ bộ lọc đầu tiên cho cả thẻ ngẫu nhiên lẫn thẻ chờ (`waiting`).

### 2.2. Lỗi Cổng Không Gian Rift Bị Trôi Qua Mất Thời Gian Mở
- **Hiện tượng**: Có thông báo sắp tới giờ Rift nhưng đến giờ không thấy cổng đâu do lúc đó đang có Boss chiến đấu.
- **Vị trí xử lý**: [`js/systems/rift.js`](file:///e:/GameMaking/pokesurvivor/js/systems/rift.js) trong hàm `update()`.
- **Cách sửa**: Chuyển sang cơ chế Hàng Đợi (Rift Queue) — nếu có Boss đang sống khi tới mốc Rift, hệ thống kiên nhẫn chờ Boss chết là mở ngay lập tức, kết hợp 3 tầng fallback vị trí mở cổng (xa $\rightarrow$ trung bình $\rightarrow$ gần người chơi).

### 2.3. Lỗi Đồng Bộ Boss Đổi Dạng Trong Phòng Chơi Co-op
- **Hiện tượng**: Chỉ có máy chủ (Host) nhìn thấy Boss chuyển sang dạng Mega/Cuồng nộ, máy khách (Client) vẫn thấy Boss ở dạng thường.
- **Vị trí xử lý**: [`js/net/coop.js`](file:///e:/GameMaking/pokesurvivor/js/net/coop.js) và [`js/entities/enemy.js`](file:///e:/GameMaking/pokesurvivor/js/entities/enemy.js).
- **Cách sửa**: Gửi sự kiện nhị phân `EVENT_BOSS_PHASE` qua WebRTC DataChannel ngay khi `advanceBossPhase` được kích hoạt, đồng bộ sprite và scale trên tất cả máy khách.

### 2.4. Lỗi Đè Chữ & Tràn Khung Trên Giao Diện Đỉnh Màn Hình (HUD)
- **Hiện tượng**: Đồng hồ, tên đấu trường, thanh tiến trình sự kiện và thanh máu Boss đè lên nhau trên màn hình hẹp.
- **Vị trí xử lý**: [`js/ui/run-ui.js`](file:///e:/GameMaking/pokesurvivor/js/ui/run-ui.js).
- **Quy chuẩn tọa độ Y**: Phân tầng rành mạch: Đồng hồ (Y=26), Tên khu vực (Y=40), Timeline trượt (Y=48), Thanh máu Boss / Sự kiện (Y=68+).

---

## 3. Quy Trình Xuất Bản Tiêu Chuẩn ViTeam (Pipeline Checklist)

1. **Sửa file nguồn**: Chỉ chỉnh sửa trên `dev.html` và các file trong `js/`. Tuyệt đối không sửa trực tiếp `index.html`.
2. **Chạy kiểm thử trước**:
   ```bash
   node --test tests/i18n.test.cjs tests/buffs.test.cjs tests/net.test.cjs
   ```
3. **Chạy đóng gói xuất bản**:
   ```bash
   node tools/build.js && node tools/export_data.js && python tools/make_seo_pages.py
   ```
4. **Kiểm tra trạng thái Git**: Đảm bảo thư mục làm việc sạch sẽ, không có file tạm.
