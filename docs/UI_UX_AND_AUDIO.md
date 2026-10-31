# THIẾT KẾ GIAO DIỆN, TRẢI NGHIỆM NGƯỜI DÙNG & ÂM THANH
*(PokéSurvivor UI/UX, Visual Design & Audio Documentation)*

---

## 1. TRIẾT LÝ THIẾT KẾ THỊ GIÁC (VISUAL DESIGN PHILOSOPHY)

PokéSurvivor kết hợp hài hòa giữa nét hoài niệm của phong cách đồ họa **Retro 16-bit Pixel Art** (lấy cảm hứng từ series huyền thoại *Pokémon Mystery Dungeon: Explorers of Sky*) với ngôn ngữ thiết kế giao diện hiện đại **Modern Dark Mode** cùng các điểm nhấn màu sắc cao cấp:
- **Tông Màu Chủ Đạo**: Nền tối sâu thẳm (`#0b0e14`, `#121722`) giúp giảm mỏi mắt khi chơi lâu và làm nổi bật các hiệu ứng ánh sáng kỹ năng.
- **Màu Nhấn Vàng Kim Hoàng Gia (`--gold: #ffd23f`)**: Dành riêng cho các thành tựu cao quý, dạng Mega, Vương miện Apex(+) và các chỉ số tối đa.
- **Hệ Thống 18 Màu Nguyên Tố Sống Động**: Mỗi hệ Pokémon (Lửa, Nước, Cỏ, Điện, Băng, Rồng, Tiên...) đều sở hữu mã màu chuẩn mực đồng bộ trên toàn bộ huy hiệu, thanh máu, hào quang và hiệu ứng kỹ năng.

---

## 2. GIAO DIỆN TRONG TRẬN ĐẤU (HUD - HEADS UP DISPLAY)

Màn hình trong trận (`js/ui/hud.js`) được tối ưu hóa để hiển thị thông tin tối đa mà không che khuất tầm nhìn né đòn của người chơi:

1. **Thanh Sinh Mệnh & Kinh Nghiệm (HP & EXP Bar)**:
   - Nằm ở cạnh trên cùng màn hình.
   - Thanh máu đổi màu linh hoạt: Xanh lá tươi khi an toàn, Vàng khi dưới 50%, và Đỏ rực nhấp nháy khi nguy cấp dưới 25%.
   - Thanh EXP hiển thị cấp độ hiện tại và tỷ lệ % tiến đến mốc lên cấp tiếp theo.
2. **Khay Chiêu Thức 6 Ô (6-Slot Move Bar) & Huy Hiệu Hiệu Ứng (Kind Badges)**:
   - Hiển thị 6 kỹ năng đang trang bị kèm cấp độ sao.
   - **Huy Hiệu Nhỏ (Kind Badge 10x10)** ở góc dưới bên phải mỗi ô chiêu thức:
     + Biểu tượng nắm đấm: Chiêu Cận chiến (Melee).
     + Biểu tượng mũi tên: Chiêu Bắn đạn (Projectile).
     + Biểu tượng tia sáng: Chiêu Bắn tia (Beam).
     + Biểu tượng vòng xoay: Chiêu Hào quang bảo vệ (Aura Circle).
     + Biểu tượng chữ thập: Chiêu Hồi phục / Buff (Heal/Buff).
     + Biểu tượng sấm sét: Chiêu Làm choáng / Khống chế (Stun).
3. **Thanh Máu Đại Boss Đa Phase (Boss Multi-Phase Health Bar)**:
   - Xuất hiện uy nghiêm ở cạnh dưới màn hình khi chạm trán Boss.
   - Hiển thị rõ số lượng Phase còn lại (Phase 1/3, Phase 2/3, Phase 3/3).
   - Khi Boss đổi Phase, thanh máu có hiệu ứng hồi sinh rực lửa kèm tên dạng thức mới (ví dụ từ Groudon chuyển thành Primal Groudon).
4. **Vùng Cảnh Báo Nguy Hiểm (Telegraphed Hazards)**:
   - Các đòn đánh hủy diệt của Boss đều hiển thị trước vùng ảnh hưởng màu đỏ bán trong suốt trước 1.0 ~ 1.5 giây, tạo cơ hội cho người chơi lướt né ngoạn mục.

---

## 3. GIAO DIỆN POKÉDEX & CÂY TIẾN HÓA XEM TRƯỚC (POKÉDEX & PREVIEW)

Màn hình Pokédex (`js/ui/menu.js`) là một trong những trung tâm trải nghiệm quan trọng nhất của trò chơi:

### 3.1. Lưới Danh Sách Pokémon (Pokédex Grid)
- Hỗ trợ cuộn vô tận (Infinite Virtual Scrolling) mượt mà với hơn 1.021 loài Pokémon mà không gây giật lag trên thiết bị yếu.
- **Thanh Bộ Lọc Thông Minh**:
  + Lọc theo Thế hệ (Gen 1 đến Gen 9).
  + Lọc theo 18 Hệ nguyên tố.
  + Lọc theo Độ hiếm (1 sao đến 5 sao).
  + Lọc nhanh: Đã sở hữu, Có dạng Shiny, Danh sách Yêu thích (Favorites).

### 3.2. Bảng Chi Tiết Pokémon (Pokémon Detail Card)
- **Xem Trước Toàn Diện Kể Cả Khi Chưa Sở Hữu (Full Locked Preview)**:
  + Người chơi chưa sở hữu một Pokémon vẫn có thể xem được Sprite nguyên bản tuyệt đẹp (không bị che đen kịt), chỉ số cơ bản (HP, ATK, DEF, SPD), hệ nguyên tố, chiêu bắt đầu và toàn bộ bể chiêu có thể học.
- **Sprite Sống Động Đa Góc Nhìn**: Hỗ trợ chuyển đổi mượt mà giữa dạng Thường (Normal) và dạng Lấp Lánh (Shiny).

### 3.3. Cây Tiến Hóa & Dạng Tối Thượng Trực Quan (Interactive Evolution Tree)
- **Chuỗi Tiến Hóa Chính**: Hiển thị rõ ràng các mốc Cấp 1 $\rightarrow$ Cấp 2 (Lv 15) $\rightarrow$ Cấp 3 (Lv 30) kèm trạng thái Vương miện Apex (+).
- **Dạng Mega / Primal / Battle Form**:
  + Hiển thị với huy hiệu màu vàng kim lấp lánh `Mega` / `Primal` / `Form`.
  + Sprite hiển thị sắc nét cho phép xem trước.
  + Khi người chơi chạm/click vào node Mega: Màn hình hiển thị cửa sổ xem trước chi tiết (Tên dạng, Hệ mới, Hệ số tấn công, Phòng thủ, Tốc độ, Khả năng đặc biệt và Hướng dẫn kích hoạt trong trận).
- **Hàng Biến Thể Vùng Miền & Dạng Đặc Biệt (Regional & Special Variants)**:
  + Nằm ngay bên dưới cây tiến hóa chính.
  + Tự động hiển thị các nhánh biến thể khu vực liên quan (Alolan, Galarian, Hisuian, Paldean, Magearna Original...).
  + Click vào bất kỳ biến thể nào trên cây tiến hóa sẽ lập tức chuyển sang xem trước trọn vẹn thông số của biến thể đó!

---

## 4. GIAO DIỆN GACHA & SHOP KECLEON

1. **Màn Hình Gacha Banners**:
   - Thiết kế dạng máy quay may mắn Mystery Dungeon huyền thoại.
   - Chia thành từng Banner theo từng Vùng lục địa.
   - Hiển thị rõ số lượt còn lại để chạm mốc Bảo Hiểm (Pity Counter).
   - Hoạt ảnh mở bóng: Từ Pokéball thường, Greatball, Ultraball đến Masterball rực sáng cùng pháo hoa chào đón Pokémon Huyền thoại hoặc Shiny quý hiếm.
2. **Cửa Hàng Kecleon (Kecleon Shop)**:
   - Giao diện dạng sạp hàng phiêu lưu ấm cúng.
   - Bày bán các đĩa TMs, Quả Cầu Phép Thuật (Orbs) và Trái Mọng (Berries) đổi mới mỗi ngày.

---

## 5. HỆ THỐNG ÂM THANH & NHẠC NỀN (AUDIO SYSTEM)

PokéSurvivor sử dụng nền tảng **Web Audio API** tinh gọn được quản lý tại `js/core/audio.js`:

### 5.1. Nhạc Nền (Background Music - BGM)
- **Nhạc Menu Làng (Village Theme)**: Giai điệu thanh bình, ấm áp, mang đậm phong cách Mystery Dungeon khi người chơi duyệt Pokédex và nâng cấp.
- **Nhạc Sinh Tồn (Survival Battle BGM)**: Nhịp trống dồn dập, hào hùng, tăng dần tiết tấu khi thời gian trôi về những phút cuối.
- **Nhạc Đấu Trường Vết Nứt (Rift Arena BGM)**: Không khí thần bí, căng thẳng khi đối đầu với các Thủ Hộ Huyền Thoại.
- **Nhạc Phán Quyết Arceus (Judgment Theme)**: Thánh ca bi tráng và tráng lệ ở phút 30 khi Đấng Sáng Tạo giáng lâm.

### 5.2. Hiệu Ứng Âm Thanh (Sound Effects - SFX)
- Âm thanh chém trúng đích, tiếng nổ laze, tiếng sấm sét chân thực tương ứng với từng hệ thuộc tính.
- Âm thanh vỡ tung đặc biệt khi Boss bị hạ gục.
- Tiếng gầm uy lực khi kích hoạt Mega Evolution hoặc khi Boss chuyển đổi sang Phase 3.
- Tiếng leng keng vui tai khi hút chuỗi hạt kinh nghiệm và đồng xu vàng.
