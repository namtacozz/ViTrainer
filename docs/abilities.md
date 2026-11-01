# ViTrainer — Cẩm Nang Nội Tại Pokémon (Abilities)

Tài liệu chi tiết về hệ thống Nội Tại (Abilities) trong **ViTrainer**, cách thức hoạt động trong gameplay sinh tồn thời gian thực và danh mục các nhóm hiệu ứng.

---

## 1. Cơ Chế Hoạt Động Trong Game Sinh Tồn

Mỗi Pokémon khi bắt đầu trận đấu đều sở hữu một **Nội Tại (Ability)** đặc trưng dựa theo Pokédex chính thức. Các Nội Tại này được kích hoạt tự động theo các sự kiện thời gian thực (Hooks):

- `start(pl)`: Kích hoạt ngay đầu trận (cộng chỉ số khởi đầu).
- `out(pl, m, e)`: Tăng hệ số sát thương đầu ra của chiêu thức `m` lên kẻ địch `e`.
- `inMul(pl, type, cls)`: Giảm trừ sát thương nhận vào từ hệ `type` và thể loại `cls` ('p' vật lý, 's' phép).
- `absorb`: Hấp thụ hoàn toàn sát thương của một hệ cụ thể và hồi phục lại máu.
- `dodge(pl, type, cls)`: Tỉ lệ né tránh hoàn toàn đòn đánh.
- `contact(pl, e)`: Phản đòn khi kẻ địch va chạm cận chiến vào người chơi.
- `kill(pl, e)`: Kích hoạt khi tiêu diệt được một kẻ địch (nhận buff cộng dồn).
- `speed(pl)`: Tăng tốc độ di chuyển theo điều kiện môi trường hoặc thời tiết.
- `summon`: Tự động gọi thời tiết đặc trưng khi bắt đầu trận và định kỳ mỗi 3 phút.

---

## 2. Phân Nhóm Nội Tại & Hiệu Ứng Chi Tiết

### 2.1. Nhóm Hấp Thụ Hệ & Kháng Nguyên Tố (Absorb & Immune)
- **Levitate (Bay lơ lửng)**: Miễn nhiễm hoàn toàn với sát thương từ hệ Đất, bẫy chông dưới sàn và dung nham.
- **Water Absorb / Dry Skin (Hấp Thụ Nước)**: Đòn đánh hệ Nước không gây sát thương mà hồi `3%` máu tối đa cho người chơi.
- **Volt Absorb / Motor Drive / Lightning Rod (Hấp Thụ Sét)**: Đòn đánh hệ Điện không gây sát thương mà hồi máu hoặc gia tăng tốc độ chạy.
- **Flash Fire (Hấp Thụ Lửa)**: Đòn đánh hệ Lửa không gây sát thương mà hồi máu và cường hóa `20%` sát thương chiêu hệ Lửa.
- **Sap Sipper (Hấp Thụ Cỏ)**: Miễn nhiễm sát thương hệ Cỏ và tăng `20%` sát thương tấn công.
- **Bulletproof (Chống Đạn)**: Miễn nhiễm hoặc giảm `50%` sát thương từ các loại đạn bay (Projectiles / Bomba / Esfera).

### 2.2. Nhóm Tăng Sát Thương Khi Máu Thấp (Pinch Boost - Khởi Đầu Cổ Điển)
- **Overgrow (Tươi Tốt)**: Khi máu dưới 1/3, tăng `+35%` sát thương cho mọi chiêu thức hệ **Cỏ**.
- **Blaze (Bốc Cháy)**: Khi máu dưới 1/3, tăng `+35%` sát thương cho mọi chiêu thức hệ **Lửa**.
- **Torrent (Thác Lũ)**: Khi máu dưới 1/3, tăng `+35%` sát thương cho mọi chiêu thức hệ **Nước**.
- **Swarm (Bầy Côn Trùng)**: Khi máu dưới 1/3, tăng `+35%` sát thương cho mọi chiêu thức hệ **Côn Trùng**.

### 2.3. Nhóm Triệu Hồi & Tương Tác Thời Tiết (Weather Dominance)
- **Drought / Desolate Land (Hạn Hán / Đất Cằn)**: Tự động gọi Thời tiết **Ánh Nắng Gay Gắt (Harsh Sunlight)**: Tăng `+20%` tốc độ và `+20%` sát thương hệ Lửa.
- **Drizzle / Primordial Sea (Mưa Rào / Biển Nguyên Thuỷ)**: Tự động gọi Thời tiết **Mưa To (Rain)**: Tăng `+20%` tốc độ và `+20%` sát thương hệ Nước.
- **Snow Warning (Bão Tuyết)**: Tự động gọi Thời tiết **Mưa Tuyết (Snow)**: Tăng `+20%` sát thương hệ Băng.
- **Sand Stream (Bão Cát)**: Tự động gọi Thời tiết **Bão Cát (Sandstorm)**: Quái vật liên tục nhận sát thương cát bào mòn.
- **Chlorophyll (Diệp Lục)**: Tăng `+50%` tốc độ di chuyển dưới trời Nắng.
- **Swift Swim (Bơi Nhanh)**: Tăng `+50%` tốc độ di chuyển dưới trời Mưa.
- **Slush Rush (Trượt Tuyết)**: Tăng `+50%` tốc độ di chuyển dưới trời Tuyết.
- **Sand Rush (Lướt Cát)**: Tăng `+50%` tốc độ di chuyển trong Bão Cát.

### 2.4. Nhóm Tấn Công Dũng Mãnh & Cộng Dồn (Aggressive & Stacking)
- **Moxie (Tự Tin)**: Mỗi kẻ địch bị tiêu diệt tăng vĩnh viễn `+0.5%` sát thương (tối đa tích lũy `+15%`).
- **Beast Boost (Thúc Đẩy Dị Thú)**: Tiêu diệt mỗi 30 kẻ địch tăng vĩnh viễn chỉ số cao nhất của Pokémon.
- **Huge Power / Pure Power (Lực Lượng Thuần Khiết)**: Nhân đôi chỉ số Tấn Công vật lý cơ bản (`Atk x2`).
- **Adaptability (Thích Nghi)**: Tăng sát thương chiêu thức cùng hệ (STAB) từ `x1.2` lên `x1.4`.
- **Tough Claws (Móng Vuốt Cứng)**: Tăng `+30%` sát thương cho tất cả các chiêu thức cận chiến (Melee).
- **Technician (Kỹ Thuật Viên)**: Tăng `+50%` sát thương cho các chiêu thức có sát thương cơ bản thấp.
- **Super Luck (Siêu May Mắn)**: Tăng thêm `+15%` tỉ lệ đánh đòn Chí Mạng (Critical Hit).
- **Sheer Force (Uy Lực Tuyệt Đối)**: Bỏ qua hiệu ứng phụ để tăng thẳng `+30%` sát thương chiêu thức.

### 2.5. Nhóm Sinh Tồn, Phòng Thủ & Phản Đòn (Defense & Survival)
- **Sturdy (Kiên Cường)**: Chống bị sốc chết một phát: khi nhận đòn chí mạng có thể ngã gục, giữ lại 1 HP và bất tử trong 1.2s (hồi chiêu 90 giây).
- **Static (Tĩnh Điện)**: Kẻ địch va chạm cận chiến có `30%` cơ hội bị Giật Điện tê liệt (Stun 1s).
- **Flame Body (Cơ Thể Lửa)**: Kẻ địch va chạm cận chiến có `30%` cơ hội bị Thiêu Đốt (Burn).
- **Poison Point (Gai Độc)**: Kẻ địch va chạm cận chiến có `30%` cơ hội bị Trúng Độc (Poison).
- **Rough Skin / Iron Barbs (Da Nhám / Gai Sắt)**: Phản lại ngay sát thương vật lý lên bất kỳ kẻ địch nào dám húc vào người chơi.
- **Stamina (Sức Bền)**: Mỗi lần bị đánh trúng lập tức nhận 1 tầng cộng dồn tăng Giáp Thủ (+3% giảm sát thương, tối đa 5 tầng).
- **Weak Armor (Giáp Vỡ)**: Mỗi lần nhận đòn vật lý, giảm nhẹ giáp nhưng bùng nổ `+20%` tốc độ chạy trong 3 giây.
- **Regenerator (Tái Tạo)**: Tăng thêm `+1.5 HP/giây` hồi phục tự nhiên.
- **Magic Guard (Bảo Vệ Ma Thuật)**: Miễn nhiễm với sát thương từ độc, lửa đốt, thời tiết và bẫy sàn (chỉ nhận sát thương từ đòn đánh trực tiếp).
