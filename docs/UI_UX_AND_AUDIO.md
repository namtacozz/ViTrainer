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

Màn hình trong trận (`js/ui/hud.js`) được thiết kế với phân tầng hình học chuẩn mực, đảm bảo mọi thông số quan trọng đều rõ nét mà không đè lẫn nhau:

```
+-------------------------------------------------------------+
|                      [  8:10  ]                   (Y = 26)   |  <- Đồng hồ trận đấu
|           Khu Rừng U Ám · 1485 Hạ Gục · 1627 Xu   (Y = 40)   |  <- Khu vực / Thống kê
|      [======(Boss)==========(Rift)=======(Event)======] (Y = 48)  <- Timeline trượt vô hạn
|                 [==== UMBREON (FASE 2) ====]      (Y = 68)   |  <- Thanh máu Boss đa phase
|                   Chạy trốn tử thần: 41s          (Y = 88)   |  <- Trạng thái Sự kiện
+-------------------------------------------------------------+
```

### 2.1. Phân Tầng Tọa Độ Y Đỉnh Màn Hình (HUD Top Hierarchy)
1. **Đồng Hồ Ván Đấu ($Y = 26$)**:
   - Font Pixelify kích thước 20px, viền bóng đen, hiển thị phút và giây (`mm:ss`).
2. **Khu Vực & Thống Kê ($Y = 40$)**:
   - Font 11px màu trắng mờ (`rgba(255,255,255,0.7)`), hiển thị tên Biome hiện tại, số quái đã hạ gục và số tiền vàng/kẹo thu thập được.
3. **Thanh Tiến Trình Timeline Vô Hạn ($Y = 48$, chiều cao 14px, độ rộng 380px)**:
   - Tự động trượt liên tục từ phải sang trái theo tiến trình ván đấu vô hạn.
   - Hiển thị trực quan các mốc sắp tới bằng biểu tượng vector canvas sắc nét (không dùng emoji):
     + **Biểu tượng Boss**: Hình đầu lâu viền đỏ rực.
     + **Biểu tượng Rift (Vết nứt)**: Xoáy năng lượng không gian tím huyền bí.
     + **Biểu tượng Sự kiện (Event)**: Ngôi sao vàng tỏa sáng cho các sự kiện Chiếm cờ, Nhặt pha lê, Thoát thân.
4. **Thanh Máu Đại Boss Đa Phase ($Y = 68$, chiều cao 14px, độ rộng 300px)**:
   - Hiển thị lượng HP hiện tại, tên Boss và nhãn giai đoạn (ví dụ `[FASE 2]`).
   - Tự động lọc bỏ các boss phụ hoặc boss sự kiện pursuit để thanh máu chính luôn thuộc về Boss bản đồ.
5. **Dòng Trạng Thái Nhiệm Vụ Sự Kiện ($Y = 71$ khi không có boss, $Y = 88$ khi có boss)**:
   - Hiển thị thông báo mục tiêu sự kiện (ví dụ: *"Chiếm cứ điểm: 65%"*, *"Thu thập pha lê: 8/12"*, *"Chạy trốn tử thần: 41s"*).

### 2.2. Thanh Tiến Độ Tiến Hóa (Mastery / Evolution Bar)
- Nằm ngay dưới thanh máu nhân vật ở góc trên bên trái.
- Hiển thị mốc cấp độ tiếp theo: `✦ Fase 2 (14/15)` $\rightarrow$ `✦ Fase 3 (28/30)` $\rightarrow$ `✦ Apex+ (Lv.30)` hoặc `FORMA MEGA`.
- **Tuyệt đối không dùng ký hiệu ổ khóa `🔒`**: Tiến hóa trong trận là quyền lợi cơ bản khi đủ cấp độ, không bị khóa bởi gacha meta tier.

### 2.3. La Bàn Điều Hướng & Cột Sáng Thiên Không (Event HUD Compass)
- Khi các sự kiện nằm ngoài tầm nhìn camera:
  + Mép màn hình tự động hiển thị **Mũi tên la bàn điều hướng** nhọn, đổi màu theo sự kiện (Vàng: Chiếm cờ; Xanh ngọc: Pha lê; Đỏ: Boss truy sát).
  + Kèm theo khoảng cách đo bằng mét (ví dụ: `52 m`, `160 m`).
  + Tại vị trí mục tiêu trên bản đồ có **Cột sáng thiên không (Beacon Beam)** vươn thẳng lên bầu trời, giúp định hướng tức thì mà không cần bản đồ thu nhỏ che tầm nhìn.

### 2.4. Khay Chiêu Thức 6 Ô & Kind Badges 10x10
- Hiển thị 6 ô chiêu thức với huy hiệu nhỏ góc dưới phải:
  + Nắm đấm: Melee.
  + Mũi tên: Projectile.
  + Tia sáng: Beam.
  + Vòng tròn: Aura.
  + Chữ thập: Buff / Heal.
  + Tia sét: Stun.

---

## 3. GIAO DIỆN POKÉDEX & CÂY TIẾN HÓA XEM TRƯỚC (POKÉDEX & PREVIEW)

Màn hình Pokédex (`js/ui/menu.js`) được tái cấu trúc triệt để nhằm đảm bảo không bao giờ bị lỗi giật cuộn hay khoảng trắng rỗng:

### 3.1. Cấu Trúc Khóa Cứng Container (Decoupled Scroll Architecture)
- Thẻ khung `#scr-dex .box` được áp dụng:
  ```css
  #scr-dex .box {
    height: min(88vh, 840px);
    display: flex;
    flex-direction: column;
    overflow: hidden !important;
  }
  ```
- **Tách Rời Thanh Cuộn**:
  + Phần tiêu đề, nút Quay lại, các tab Gen 1 - Gen 9 và thanh tìm kiếm giữ cố định ở trên cùng (`flex: 0 0 auto`).
  + Danh sách Pokémon bên trái (`#dex-grid`) có thanh cuộn độc lập (`overflow-y: auto`).
  + Bảng chi tiết Pokémon bên phải (`#dex-detail`) có thanh cuộn độc lập (`overflow-y: auto`).
- **Reset Cuộn Tự Động**: Khi gọi `openDex()` hoặc chọn Pokémon mới qua `showDetail()`, `box.scrollTop` được gán cứng về 0, đảm bảo giao diện luôn hiển thị đầy đủ từ trên xuống dưới, không bị đẩy trượt mất phần đầu.

### 3.2. Cây Tiến Hóa & Dạng Tối Thượng Trực Quan
- Hiển thị liên kết chuỗi chính (Bậc 1 $\rightarrow$ Bậc 2 $\rightarrow$ Bậc 3 / Apex+).
- Node Mega / Primal / Battle Form lấp lánh cho phép click vào để xem trước thông số chi tiết (BST, Hệ mới, Đặc tính, Hình ảnh Sprite) kể cả khi chưa mở khóa trong bộ sưu tập.
- Hàng biến thể vùng miền (Alolan, Galarian, Hisuian, Paldean) nằm ngay bên dưới cho phép nhấp vào để chuyển đổi xem thông tin tức thì.

---

## 4. GIAO DIỆN LÊN CẤP & CẢNH BÁO TƯƠNG THÍCH (LEVEL-UP CARDS)

- Khi lên cấp, màn hình hiển thị 3 lá thẻ lựa chọn nâng cấp hoặc chiêu thức mới.
- **Cảnh Báo Giảm Hiệu Suất Rõ Ràng**:
  + Nếu một chiêu thức không phù hợp với thiên hướng công của Pokémon (ví dụ: Zygarde công vật lý cao nhưng thẻ ra chiêu Mud Shot hệ Đặc biệt), giao diện sẽ hiển thị phù hiệu cảnh báo màu cam:  
    `⚠ (Giảm hiệu suất còn 92%: Pokémon này đánh mạnh hơn bằng chiêu vật lý)`
  + Tránh việc hiển thị câu văn tích cực gây hiểu lầm là chiêu thức được khuyên chọn.

---

## 5. HỆ THỐNG ÂM THANH & NHẠC NỀN (AUDIO SYSTEM)

Quản lý tập trung tại `js/core/audio.js` trên nền tảng **Web Audio API**:
- **BGM Menu Làng (Village Theme)**: Nhẹ nhàng, êm dịu phong cách Pokémon Mystery Dungeon.
- **BGM Trận Đấu Sinh Tồn**: Tiết tấu dồn dập, tăng dần sự kịch tính.
- **BGM Đấu Trường Vết Nứt (Rifts)**: Căng thẳng, huyền bí khi đấu Boss Thủ Hộ.
- **BGM Phán Quyết (Arceus Judgment)**: Tráng lệ, bi tráng ở phút thứ 30.
- **SFX Độc Quyền**:
  + Tiếng gầm uy lực khi kích hoạt Mega Evolution hoặc khi Boss chuyển đổi sang Phase 3.
  + Tiếng chuông leng keng khi hạt kinh nghiệm và tiền vàng bị hút chuỗi về người chơi.
  + Tiếng nổ sóng xung kích telegraphed hazard.
