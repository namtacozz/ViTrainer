# CẨM NANG TOÀN TẬP VỀ GAMEPLAY & CƠ CHẾ POKÉSURVIVOR
*(PokéSurvivor Comprehensive Gameplay & Systems Manual)*

---

## 1. TỔNG QUAN DỰ ÁN (GAME OVERVIEW)

**PokéSurvivor** là một tựa game hành động sinh tồn rogue-lite kết hợp phong cách *Pokémon Mystery Dungeon* và lối chơi cuốn hút của dòng *Survivor*. Người chơi điều khiển một chú Pokémon bạn đồng hành (Partner Pokémon), di chuyển trên một bản đồ mở rộng lớn, đối đầu với hàng ngàn quái thú hoang dã tràn ngập màn hình, thu thập hạt kinh nghiệm (EXP), lên cấp, lựa chọn và kết hợp các đòn đánh huyền thoại, tiến hóa qua từng giai đoạn, kích hoạt dạng Mega/Primal tối thượng, tham gia các sự kiện tuần tự gay cấn, chinh phục các Đấu trường Vết Nứt (Rifts) và đối mặt với Thẩm Phán Tối Cao Arceus ở phút thứ 30.

Game chạy trực tiếp trên trình duyệt Web (HTML5 Canvas), hỗ trợ đa nền tảng (PC, Mobile, Tablet) với khả năng chơi đơn (Single Player) hoặc chơi hợp tác mạng trực tiếp (Co-op Multiplayer lên tới 8 người) qua giao thức WebRTC P2P không độ trễ.

---

## 2. VÒNG LẶP CHƠI CỐT LÕI (CORE GAMEPLAY LOOP)

```
[Chọn Bạn Đồng Hành & Bản Đồ] 
           │
           ▼
[Vào Trận: Di Chuyển & Tự Động Tấn Công] 
           │
           ▼
[Thu Nhặt Hạt EXP, Pha Lê & Pokémonedas (Vàng)] 
           │
           ▼
[Lên Cấp: Chọn / Nâng Cấp Chiêu Thức & Vật Phẩm] 
           │
           ▼
[Tiến Hóa Cấp Độ: Giai đoạn 2 (Lv15) ➔ Giai đoạn 3 / Mega (Lv30)] 
           │
           ▼
[Tham Gia Sự Kiện Tuần Tự: Chiếm Cờ, Nhặt Đá, Chạy Trốn Tử Thần]
           │
           ▼
[Sống Sót Qua Các Làn Sóng Quái & Đánh Bại Boss Đa Phase] 
           │
           ▼
[Chinh Phục Đấu Trường Vết Nứt (Rifts - 18 Hệ)] 
           │
           ▼
[Phút 30: Đối Mặt Với Thẩm Phán Arceus (Judgment)] 
           │
           ▼
[Kết Thúc Trận: Nhận Thưởng, Mở Gacha, Nâng Cấp Vĩnh Viễn]
```

---

## 3. ĐIỀU KHIỂN & GIAO DIỆN TƯƠNG TÁC (CONTROLS & INPUT)

Game hỗ trợ mượt mà mọi loại thiết bị đầu vào:
1. **Bàn phím & Chuột (PC)**:
   - **Chế độ Bàn phím chuẩn**: Phím `W`, `A`, `S`, `D` hoặc 4 phím Mũi tên để di chuyển.
   - **Chế độ Di chuyển Theo Con Trỏ Chuột (Mouse Follower)**: Bật trong Cài đặt (Settings), Pokémon sẽ tự động lướt bám theo vị trí con trỏ chuột trên màn hình, giúp chơi thoải mái nhiều giờ không mỏi tay.
   - Tương tác / Nhặt đồ / Chọn thẻ nâng cấp: Chuột trái hoặc phím `Space` / `Enter` (phím số `1`, `2`, `3` để chọn thẻ nhanh).
   - Dùng Túi Cứu Cứu (Orbs): Phím số hoặc click trực tiếp vào ô vật phẩm trên màn hình.
   - Tạm dừng (Pause): Phím `Escape` hoặc nút Pause góc trên.
2. **Màn hình cảm ứng (Mobile / Tablet)**:
   - Cần điều khiển ảo (Virtual Joystick): Hỗ trợ cả 2 chế độ:
     + *Floating Joystick (Mặc định)*: Chạm bất cứ đâu trên màn hình để tạo tâm di chuyển linh hoạt.
     + *Anchored Joystick*: Cần gạt cố định góc dưới màn hình.
   - Chọn thẻ và kích hoạt Orb bằng thao tác chạm (Touch Tap) trực quan, có cơ chế chống chạm nhầm khi kéo ngón tay.
3. **Tay cầm chơi game (Gamepad)**:
   - Cần analog trái (D-Pad): Di chuyển nhân vật.
   - Nút `A` / `Cross`: Xác nhận lựa chọn thẻ nâng cấp.
   - Cò `L1`/`R1` hoặc `X`/`Y`: Sử dụng các Quả cầu Phép thuật (Orbs).

---

## 4. HỆ THỐNG POKÉDEX, ĐỘ HIẾM & CHỈ SỐ

### 4.1. Quy mô Pokédex
- Game sở hữu kho dữ liệu đồ sộ với **hơn 1.022 Pokémon** trải dài từ Thế hệ 1 (Kanto) đến Thế hệ 9 (Paldea).
- Bao gồm đầy đủ các Pokémon Khởi đầu (Starters), Pokémon thường, Bán huyền thoại (Pseudo-legendaries), Pokémon Huyền thoại (Legendaries), Thần thoại (Mythicals), và các dạng Biến thể Khu vực (Alolan, Galarian, Hisuian, Paldean).

### 4.2. Hệ thống Độ hiếm (Rarity Tiers)
1. **★ Común (Common - 1 sao)**: Pokémon cơ bản cấp 1 (ví dụ: Caterpie, Pidgey, Slakoth, Rattata). Tỷ lệ xuất hiện cao trong Gacha.
2. **★★ Poco Común (Uncommon - 2 sao)**: Pokémon giai đoạn 2 hoặc Pokémon đơn giai đoạn chỉ số trung bình (ví dụ: Pidgeotto, Vigoroth, Nidorino).
3. **★★★ Rara (Rare - 3 sao)**: Pokémon giai đoạn 3 thông thường (như Pidgeot, Slaking, Butterfree) hoặc các Pokémon có chỉ số tốt.
4. **★★★★ Épica (Epic - 4 sao)**: Pokémon tiến hóa mạnh mẽ, Pokémon dạng đặc biệt hoặc Pseudo-legendary giai đoạn 2 (ví dụ: Alakazam, Gengar, Machamp, Dragonair).
5. **★★★★★ Legendaria (Legendary - 5 sao)**: Dành riêng cho Pokémon Huyền thoại, Thần thoại và Siêu huyền thoại (Mewtwo, Rayquaza, Dialga, Arceus, Zacian, Koraidon, Miraidon...).

### 4.3. Các Chỉ số Cơ bản & Thiên hướng
- **HP (Máu)**, **PA (Tấn công Vật lý)**, **SA (Tấn công Đặc biệt)**, **DF (Phòng thủ Vật lý)**, **SD (Phòng thủ Đặc biệt)**, **SPD (Tốc độ)**.
- **Thiên hướng**: Pokémon có `PA > SA` sẽ tối ưu hơn khi học các đòn Physical; ngược lại sẽ mạnh hơn với đòn Special.
  * Khi lên cấp, nếu người chơi chọn một chiêu thức không khớp thiên hướng (ví dụ Mud Shot Đặc biệt trên Zygarde Vật lý), trò chơi sẽ hiển thị cảnh báo rõ ràng:  
    `⚠ (Giảm hiệu suất còn 92%: Pokémon này đánh mạnh hơn bằng chiêu vật lý)`
- **Thưởng Đơn hệ (Monotype Bonus)**: Pokémon chỉ mang duy nhất 1 hệ nguyên tố sẽ nhận thêm **+20% sát thương** vĩnh viễn cho tất cả các chiêu thức cùng hệ đó.

---

## 5. HỆ THỐNG TIẾN HÓA TRONG TRẬN (IN-RUN EVOLUTION)

### 5.1. Các Mốc Tiến Hóa Chuẩn Chỉ
Tiến hóa trong trận là quyền lợi gameplay cốt lõi của người chơi trong chế độ sinh tồn:
1. **Dòng 3 Giai đoạn (3-Stage Family)**:
   - *Level 15*: Tự động hiện bảng tiến hóa lên Giai đoạn 2.
   - *Level 30*: Tự động hiện bảng tiến hóa lên Giai đoạn 3 (hoặc kích hoạt dạng Mega nếu loài đó có Mega ở bậc cuối, ví dụ Charizard X/Y).
   - Nếu tăng cấp nhảy vọt (ví dụ từ cấp 14 lên cấp 33 trong co-op): Sau khi chọn xong dạng 2, game lập tức kích hoạt tiếp bảng chọn dạng 3/Mega mà không bỏ sót.
2. **Dòng 2 Giai đoạn (2-Stage Family)**:
   - *Level 15*: Tiến hóa lên Giai đoạn 2.
   - *Level 30*: Kích hoạt trạng thái Vương Miện Apex (+) với hào quang sức mạnh tối thượng (+20% chỉ số, hồi phục máu) hoặc tiến hóa Mega.
3. **Dòng Đơn Giai đoạn (Single Stage) & Huyền Thoại**:
   - *Level 15*: Thức tỉnh Giai đoạn I (Despertar I) tăng chỉ số cơ bản.
   - *Level 30*: Thức tỉnh Giai đoạn II (Apex+) hoặc đánh thức sức mạnh Nguyên Thủy / Mega.
4. **Tiến hóa Phân Nhánh (Branch Evolution)**:
   - Eevee, Gloom, Poliwhirl, Kirlia...: Mở bảng chọn trực quan với các nhánh tiến hóa tương ứng.

### 5.2. Độc Lập Hoàn Toàn Khỏi Gacha
- Tiến hóa trong ván chơi KHÔNG BỊ KHÓA bởi cấp độ Gacha (`tierUnlocked`). Mọi Pokémon đều tiến hóa đầy đủ khi đạt mốc cấp độ.
- Thanh tiến trình trên HUD hiển thị `✦ ` thể hiện mốc tiến độ rõ ràng.

### 5.3. Hàng Đợi An Toàn & Đồng Bộ Co-op
- Nếu người chơi đang gục ngã hoặc đang mở bảng đồ/tạm dừng, lựa chọn tiến hóa sẽ lưu vào `pendingEvoModal` và tự động bật lại ngay khi đóng menu hoặc được cứu sống.
- Trong Co-op, máy client nhận cấp từ host qua `syncTeam` tự động mở modal tiến hóa tức thì. Sprite mới được đồng bộ thời gian thực tới tất cả đồng đội trong phòng.

---

## 6. CÁC SỰ KIỆN TUẦN TỰ TRONG TRẬN (`inrun-events.js`)

Trong suốt ván đấu, hệ thống sẽ kích hoạt ngẫu nhiên các Sự Kiện Tuần Tự (In-Run Events) mang lại nhịp độ cao trào:
1. **Chiếm Cờ (Zone Capture)**:
   - Một vòng tròn chiến thuật bán kính lớn xuất hiện tại bãi đất trống ngẫu nhiên.
   - Nhiệm vụ: Đứng trong vòng tròn cho đến khi thanh tiến trình quét đủ 360° theo chiều kim đồng hồ.
   - Cơ chế: Càng nhiều đồng đội cùng đứng trong vòng thì tốc độ quét càng nhanh. Quái vật sẽ đổ dồn về vòng và nhắm vào người chiếm giữ.
2. **Thu Thập Đá Pha Lê (Scavenger Hunt)**:
   - Rải các viên pha lê giá trị cao xung quanh khu vực người chơi.
   - Trên viền màn hình xuất hiện các **Mũi tên la bàn điều hướng** hiển thị khoảng cách theo mét hướng về phía từng viên pha lê, đồng thời có cột sáng thiên không vươn thẳng lên trời dễ nhận diện từ xa.
3. **Chạy Trốn Tử Thần (Boss Pursuit)**:
   - Một Boss Pokémon Alpha bất tử cực mạnh xuất hiện ở cự ly an toàn.
   - Người chơi không thể tiêu diệt nó; nhiệm vụ duy nhất là sống sót, luồn lách né tránh các đòn đánh cảnh báo đỏ rực cho đến khi hết thời gian đếm ngược.
4. **Phần Thưởng Hậu Hĩnh**:
   - Hồi sinh ngay lập tức toàn bộ đồng đội đã gục ngã với 50% HP và lá chắn bất tử tạm thời.
   - Tăng vĩnh viễn chỉ số trong trận (+15% sát thương, +8 tốc độ chạy).
   - Rơi cơn mưa tiền vàng, vé quay gacha và hút tự động về nhân vật.
5. **Quy Tắc Cách Ly**:
   - Các sự kiện này tự động bị hoãn khi người chơi đang giao chiến trong Đấu Trường Vết Nứt (Rift Arena) hoặc Trận Chiến Phán Quyết Arceus.

---

## 7. HỆ THỐNG ĐÒN ĐÁNH & TIẾN HÓA CHIÊU THỨC (+ / ++ / +++)

- **Tên Chiêu Thức Chuẩn Canon**: Toàn bộ 133 thức giữ nguyên tên tiếng Anh chuẩn (như *Thousand Arrows*, *Plasma Fists*, *Core Enforcer*, *Dragon Ascent*, *Earthquake*...) giúp nhận diện đồng nhất trên toàn cầu; phần mô tả được dịch chuẩn theo cài đặt ngôn ngữ.
- **Biểu tượng kiểu đòn trên HUD (Kind Badges 10x10)**:
  + Nắm đấm: Cận chiến (Melee).
  + Mũi tên: Bắn đạn (Projectile).
  + Tia sáng: Bắn tia (Beam).
  + Vòng tròn: Hào quang bảo vệ (Aura Circle).
  + Chữ thập: Hồi máu / Buff.
  + Tia sét: Khống chế / Choáng (Stun).
- **Tiến Hóa Chiêu Thức**:
  + Bậc cơ bản: Lv 1 đến Lv 8.
  + Bậc +: Khi đạt Lv 8 và mang theo Held Item tương thích.
  + Bậc ++: Đạt bậc + và hoàn thành nhiệm vụ thực chiến trong trận.
  + Bậc +++: Chiêu đạt bậc ++ kết hợp cùng ít nhất 3 chiêu thức khác đạt bậc +.

---

## 8. KẺ ĐỊCH & ĐẠI BOSS ĐA PHASE

1. **Cân Bằng Máu Boss Hợp Lý**:
   - Boss đầu trận (phút thứ 3) được điều chỉnh thang máu vừa phải (~4.200 HP), giúp trải nghiệm khởi đầu mượt mà, không tạo bức tường máu vô lý.
2. **Cơ Chế Chuyển Phase Đa Tầng**:
   - Phase 1: Boss thông thường với các vùng cảnh báo nguy hiểm telegraphed hazards.
   - Phase 2 (Cuồng nộ): Boss phát nổ sóng xung kích, hồi 100% HP, tăng +35% sát thương và +15% tốc chạy. Thời gian bất tử khi chuyển phase được giới hạn ở **0.8 giây** và khả năng kháng khống chế (Tenacity) tối đa **2.0 giây**.
   - Phase 3: Thức tỉnh dạng Mega / Primal với bộ chiêu thức tối thượng.
3. **Đấu Trường Vết Nứt (18 Rifts) & Arceus (Phút 30+)**:
   - 18 Đấu trường riêng biệt tương ứng 18 hệ để chinh phục các Thủ Hộ Huyền Thoại.
   - Phút 30: Đấng Sáng Tạo Arceus giáng lâm cho trận chiến sinh tử ghi danh Bảng Xếp Hạng.

---

## 9. CHẾ ĐỘ CHƠI ĐỒNG ĐỘI (MULTIPLAYER CO-OP LÊN TỚI 8 NGƯỜI)

- **Phòng chơi tối đa 8 người**: Hỗ trợ tổ đội lớn với khả năng tạo phòng trực tiếp không cần mã mời rườm rà.
- **Hồi Sinh Siêu Tốc**: Thời gian đứng cạnh cứu đồng đội gục ngã giảm dần theo số người trong phòng (xuống chỉ còn **1.0 giây** khi đủ 8 người). Nhiều đồng đội cùng đứng cạnh sẽ cộng dồn tốc độ cứu nhanh gấp bội.
- **Co-op Combos (Combo Đồng Đội)**: Khi 2 người chơi cùng đánh trúng một mục tiêu trong vòng 1.2 giây, một vụ nổ ánh sáng bùng phát gây thêm **+35% sát thương cộng hưởng**.
- **Quản Lý Tầm Nhìn Thích Ứng (Interest Management)**: Giới hạn tầm truyền 720px và 50 quái/packet cho các phòng đông người, bảo đảm host WebRTC không bị giật lag mạng.
- **Đồng Bộ Dạng Tức Thì**: Trạng thái tiến hóa và Mega được phát sóng liên tục, đảm bảo cả 8 người luôn thấy đúng hình ảnh chiến đấu của nhau.

---

## 10. NHIỆM VỤ NGÀY / TUẦN & KINH TẾ

- **8 Nhiệm Vụ Hàng Ngày & 4 Nhiệm Vụ Hàng Tuần**: Bổ sung các thử thách phong phú (hoàn thành sự kiện trong trận, tiến hóa trong trận, nhặt kẹo Halloween, gây sát thương lớn).
- **Kinh Tế Lành Mạnh**: Tiền vàng Pokémonedas, Shop Kecleon mỗi ngày, Vé quay Gacha theo từng banner thế hệ và hơn 140 huy hiệu Thành Tựu.
