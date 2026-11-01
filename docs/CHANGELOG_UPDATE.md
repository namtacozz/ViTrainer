# Nhật Ký Cập Nhật: Master Plan 2.0 — Chiều Sâu Build, Nhịp Trận Đấu & Cân Bằng

## Phiên Bản: 1.0 (01/11/2026)

### 1. Hệ Thống Sự Kiện Sinh Tồn Trong Trận (In-Run World Events)
- **Chu kỳ Ngày / Đêm & Thời Tiết Toàn Cục**:
  - 0:00 - 6:00: Ban Ngày (Hoang Dã)
  - 6:00 - 12:00: Hoàng Hôn (Căng Thẳng)
  - 12:00 - 18:00: Ban Đêm (+20% tỉ lệ sinh quái hệ Ma/Bóng Tối)
  - 18:00 - 24:00: Bão Tố (+20% sát thương chiêu Điện/Nước, giảm tầm nhìn)
  - 24:00 - 30:00: Hư Không Vũ Trụ
- **Quái Đầu Đàn Alpha (Noble/Alpha Pokémon)**: Xuất hiện xen kẽ các mốc Boss lớn (phút 1:30, 4:30, 7:30...), sở hữu kích thước lớn hơn 45%, mắt đỏ rực và lượng máu tương đương 25% Boss. Tiêu diệt nhận lượng lớn EXP và ngọc.
- **Shiny Tẩu Thoát (Fleeing Shiny)**: Tỉ lệ xuất hiện ngẫu nhiên với hào quang sao lấp lánh, di chuyển tốc độ cao tránh xa người chơi. Tiêu diệt trước khi tẩu thoát rơi Rương Huyền Bí hoặc Thẻ Kỹ Năng Hoàng Kim.
- **Bụi Quả Mọng Tự Nhiên (Berry Bushes)**: Sinh Sitrus Berry (hồi 25% Máu), Lum Berry (giải debuff + 4s kháng khống chế) và Salac Berry (+35% tốc độ chạy trong 8s).
- **Căn Nhà Quái Vật (Monster House)**: Vòng chắn năng lượng giam chân người chơi trong bán kính 300px trong 45s trước đợt quái dồn dập. Sống sót thành công mở khóa Rương Trang Bị Vàng.
- **Đoàn Phục Kích Team Rocket (Rocket Ambush)**: Meowth cướp 30% tiền vàng trong trận; người chơi có 30s truy đuổi để thu hồi 200% tiền. Nội tại *Sticky Hold* miễn nhiễm cướp tiền.
- **Quả Cầu Poké Viện Trợ (Assist Poké Ball)**: Triệu hồi đồng minh ngẫu nhiên (Lucario, Gardevoir, Snorlax, Gengar) chiến đấu bên cạnh người chơi trong 45s.
- **Thương Nhân Kecleon Lang Thang (Wandering Kecleon Shop)**: Dựng sạp hàng dã chiến tại phút 8, 16 và 24 cho phép mua Reroll, đổi trang bị giữ hoặc bình hồi máu khẩn cấp.
- **Hợp Đồng Thợ Săn (In-Run Bounty Contracts)**: Lựa chọn hợp đồng săn bắn đầu trận để nhận phần thưởng tức thì khi hoàn thành.
- **Khiên Tinh Thể Tera Shield Cho Boss Phase 2**: Boss mang lớp khiên nguyên tố hấp thụ 80% sát thương thông thường. Đòn đánh khắc hệ gây gấp 3 lần sát thương lên khiên; khiên vỡ đưa Boss vào trạng thái Choáng (Stagger) 3.0 giây.
- **Chế Độ Vô Tận: Thế Giới Đảo Lộn Giratina (Distortion Realm)**: Mở khóa sau khi đánh bại Arceus ở phút 30 với cơ chế Entropy tăng tiến (+15% chỉ số quái mỗi 60s).

### 2. Đại Tu Cân Bằng & Bảng 21 Trang Bị Giữ
- **Choice Band**: Giảm buff sát thương xuống +30%, khóa 100% học chiêu mới hoặc đổi chiêu khi thăng cấp.
- **Leftovers**: Điều chỉnh hồi 1.0% HP/s trong combat và 2.0% HP/s khi thoát khỏi giao tranh 3s.
- **Keystone**: Trước Lv30 chỉ mở 50% chỉ số thưởng Mega; đạt Lv30 mở khóa 100% thần năng.
- **Life Orb**: Tiêu hao cố định 1.5% Máu hiện tại mỗi chiêu tung ra, tăng thêm +10% tỉ lệ chí mạng.
- **Focus Sash**: Giữ 1 HP khi dính đòn chí tử, ban 1.2s bất tử và xóa sạch bẫy sàn xung quanh.
- **Trang bị Khóa Loài Độc Quyền**: Bổ sung *Deep Sea Scale* (+55% Def. Đặc Biệt cho Clamperl lines) bên cạnh *Deep Sea Tooth*, *Light Ball*, *Thick Club*, *Leek*, *Metal Powder*, *Lucky Punch*.
- **Kinh tế & Cân bằng loài**:
  - *Thuế Huyền Thoại*: Pokémon độ hiếm 5 yêu cầu +20% EXP thăng cấp và Boss có thêm +8% HP.
  - *Đặc Quyền Hắc Mã*: Pokémon độ hiếm 1-3 nhận thêm +25% Tiền Vàng cuối trận và tặng 01 lượt Reroll miễn phí mỗi khi hạ Đại Boss.

### 3. Nền Tảng Kỹ Thuật & Mạng Co-op
- Bổ sung định dạng nhị phân `0x07 EVENT_WORLD` trong `G.NetCodec` hỗ trợ đồng bộ trạng thái thế giới WebRTC 8 người chơi.
- Bổ sung Cửa Sổ Thở (Breathing Window 20s) và cơ chế khóa chống trùng lặp sự kiện lớn trong `G.Director`.
- Hoàn thiện bộ 7 tệp kiểm thử tự động với 58 kịch bản kiểm tra toàn diện, 100% vượt qua.
