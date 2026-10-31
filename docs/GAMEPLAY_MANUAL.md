# CẨM NANG TOÀN TẬP VỀ GAMEPLAY & CƠ CHẾ POKÉSURVIVOR
*(PokéSurvivor Comprehensive Gameplay & Systems Manual)*

---

## 1. TỔNG QUAN DỰ ÁN (GAME OVERVIEW)

**PokéSurvivor** là một tựa game hành động sinh tồn rogue-lite kết hợp phong cách *Pokémon Mystery Dungeon* và lối chơi cuốn hút của dòng *Survivor*. Người chơi điều khiển một chú Pokémon bạn đồng hành (Partner Pokémon), di chuyển trên một bản đồ mở rộng lớn, đối đầu với hàng ngàn quái thú hoang dã tràn ngập màn hình, thu thập hạt kinh nghiệm (EXP), lên cấp, lựa chọn và kết hợp các đòn đánh huyền thoại, tiến hóa qua từng giai đoạn, kích hoạt dạng Mega/Primal tối thượng, chinh phục các Đấu trường Vết Nứt (Rifts) và đối mặt với Thẩm Phán Tối Cao Arceus ở phút thứ 30.

Game chạy trực tiếp trên trình duyệt Web (HTML5 Canvas), hỗ trợ đa nền tảng (PC, Mobile, Tablet) với khả năng chơi đơn (Single Player) hoặc chơi hợp tác mạng trực tiếp (Co-op Multiplayer lên tới 4 người) qua giao thức WebRTC P2P không độ trễ.

---

## 2. VÒNG LẶP CHƠI CỐT LÕI (CORE GAMEPLAY LOOP)

```
[Chọn Bạn Đồng Hành & Bản Đồ] 
           │
           ▼
[Vào Trận: Di Chuyển & Tự Động Tấn Công] 
           │
           ▼
[Thu Nhặt Hạt EXP & Pokémonedas (Vàng)] 
           │
           ▼
[Lên Cấp: Chọn / Nâng Cấp Chiêu Thức & Vật Phẩm] 
           │
           ▼
[Tiến Hóa Cấp Độ: Giai đoạn 2 (Lv15) ➔ Giai đoạn 3 (Lv30)] 
           │
           ▼
[Kích Hoạt Mega Evolution / Primal / Battle Form]
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
   - Di chuyển: Phím `W`, `A`, `S`, `D` hoặc 4 phím Mũi tên.
   - Tương tác / Nhặt đồ / Chọn thẻ nâng cấp: Chuột trái hoặc phím `Space` / `Enter`.
   - Dùng Túi Cứu Cứu (Orbs): Phím số `1`, `2`, `3` hoặc click trực tiếp vào ô vật phẩm trên màn hình.
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
- Game sở hữu kho dữ liệu đồ sộ với **hơn 1.021 Pokémon** trải dài từ Thế hệ 1 (Kanto) đến Thế hệ 9 (Paldea).
- Bao gồm đầy đủ các Pokémon Khởi đầu (Starters), Pokémon thường, Bán huyền thoại (Pseudo-legendaries), Pokémon Huyền thoại (Legendaries), Thần thoại (Mythicals), và các dạng Biến thể Khu vực (Alolan, Galarian, Hisuian, Paldean).

### 4.2. Hệ thống Độ hiếm (Rarity Tiers)
Độ hiếm phân loại dựa trên Base Stat Total (BST) và phân hạng chuẩn canon:
1. **★ Común (Common - 1 sao)**: Pokémon cơ bản cấp 1 (ví dụ: Caterpie, Pidgey, Slakoth, Rattata). Tỷ lệ xuất hiện cao trong Gacha.
2. **★★ Poco Común (Uncommon - 2 sao)**: Pokémon giai đoạn 2 hoặc Pokémon đơn giai đoạn chỉ số trung bình (ví dụ: Pidgeotto, Vigoroth, Nidorino).
3. **★★★ Rara (Rare - 3 sao)**: Pokémon giai đoạn 3 thông thường (như Pidgeot, Slaking, Butterfree) hoặc các Pokémon có chỉ số tốt.
4. **★★★★ Épica (Epic - 4 sao)**: Pokémon tiến hóa mạnh mẽ, Pokémon dạng đặc biệt hoặc Pseudo-legendary giai đoạn 2 (ví dụ: Alakazam, Gengar, Machamp, Dragonair).
5. **★★★★★ Legendaria (Legendary - 5 sao)**: Dành riêng cho Pokémon Huyền thoại, Thần thoại và Siêu huyền thoại (Mewtwo, Rayquaza, Dialga, Arceus, Zacian, Koraidon, Miraidon...). Kích hoạt hiệu ứng âm thanh và hoạt ảnh đặc biệt khi mở trúng.

### 4.3. Các Chỉ số Cơ bản (Base Stats)
Mỗi Pokémon sở hữu 6 chỉ số tác động trực tiếp vào thực chiến:
- **HP (Máu)**: Lượng sinh mệnh của nhân vật. Khi HP về 0, nhân vật gục ngã.
- **PA (Physical Attack - Tấn công Vật lý)**: Hệ số nhân sát thương cho các chiêu thức hệ vật lý.
- **SA (Special Attack - Tấn công Đặc biệt)**: Hệ số nhân sát thương cho các chiêu thức hệ đặc biệt.
- **DF (Defense - Phòng thủ Vật lý)**: Giảm trừ lượng sát thương vật lý gánh chịu từ quái vật.
- **SD (Special Defense - Phòng thủ Đặc biệt)**: Giảm sát thương từ các đòn bắn ma pháp/năng lượng của kẻ địch.
- **SPD (Speed - Tốc độ di chuyển)**: Tốc độ chạy lướt trên bản đồ, giúp né tránh các vòng vây dày đặc.

### 4.4. Thiên hướng Chiến đấu & Hệ thống Đơn hệ
- **Thiên hướng**: Pokémon có `PA > SA` sẽ tối ưu hơn khi học các đòn Physical; ngược lại sẽ mạnh hơn với đòn Special.
- **Thưởng Đơn hệ (Monotype Bonus)**: Pokémon chỉ mang duy nhất 1 hệ nguyên tố sẽ nhận thêm **+20% sát thương** vĩnh viễn cho tất cả các chiêu thức cùng hệ đó.

---

## 5. HỆ THỐNG TIẾN HÓA & THỨC TỈNH (EVOLUTION & AWAKENING)

### 5.1. Các Giai đoạn Tiến hóa trong Trận đấu
1. **Dòng 3 Giai đoạn (3-Stage Family)**:
   - *Cấp 1*: Dạng cơ bản xuất phát (Level 1).
   - *Cấp 2*: Đạt Level 15 trong trận $\rightarrow$ Tự động tiến hóa lên giai đoạn 2.
   - *Cấp 3*: Đạt Level 30 trong trận $\rightarrow$ Tự động tiến hóa lên dạng hoàn thiện cao nhất.
2. **Dòng 2 Giai đoạn (2-Stage Family)**:
   - *Cấp 1*: Dạng xuất phát (Level 1).
   - *Cấp 2*: Tiến hóa ở Level 18.
   - *Cấp 3 (Apex+)*: Đạt Level 30 sẽ mở khóa trạng thái Vương Miện Apex (+) với hào quang sức mạnh tối thượng.
3. **Dòng Đơn Giai đoạn (Single Stage)**:
   - *Level 15*: Thức tỉnh Giai đoạn I (Despertar I - Ngôi sao).
   - *Level 30*: Thức tỉnh Giai đoạn II (Despertar II / Apex+ - Vương miện hoàng kim).
4. **Tiến hóa Phân Nhánh (Branch Evolution)**:
   - Các loài như Eevee, Gloom, Poliwhirl, Kirlia... có nhiều hướng tiến hóa. Người chơi có thể tự do chọn nhánh mong muốn dựa trên các mảnh trùng lặp mở khóa trong Pokédex.

### 5.2. Mở Khóa Bậc Tiến Hóa Qua Gacha (Duplicate Shards)
- Khi quay trúng bản sao (duplicado) của một Pokémon trong Gacha, người chơi sẽ tích lũy kinh nghiệm tiến hóa để mở khóa vĩnh viễn quyền tiến hóa dạng đó trong mọi trận đấu tiếp theo.

---

## 6. HỆ THỐNG MEGA EVOLUTION, PRIMAL & BIẾN THỂ VÙNG MIỀN

### 6.1. Mega & Primal Forms (78 Dạng Tối Thượng)
- Trò chơi tích hợp đầy đủ **78 dạng Mega Evolution, Primal Reversion và Battle Forms độc quyền**:
  + *Kanto*: Mega Venusaur, Mega Charizard X/Y, Mega Blastoise, Mega Alakazam, Mega Gengar, Mega Mewtwo X/Y...
  + *Hoenn*: Primal Groudon (Desolate Land), Primal Kyogre (Primordial Sea), Mega Rayquaza (Delta Stream), Mega Blaziken, Mega Sceptile, Mega Swampert...
  + *Kalos & Khác*: Ash-Greninja (Battle Bond), Complete Zygarde, Ultra Necrozma...
  + *Galar & Paldea*: Crowned Zacian, Crowned Zamazenta, Eternamax Eternatus, Hero Form Palafin, Bloodmoon Ursaluna, Ogerpon Masks, Stellar Terapagos, Original Magearna, v.v.
- **Hiệu ứng khi kích hoạt**: Tăng vọt chỉ số tấn công (hệ số lên tới x1.30 ~ x1.70), tăng giáp, mở rộng phạm vi chiêu thức và kích hoạt các đặc tính nguyên tố thay đổi trận địa.

### 6.2. Biến Thể Vùng Miền (Regional Variants)
- Bao gồm các dạng: **Alolan**, **Galarian**, **Hisuian**, và **Paldean**.
- Các biến thể này sở hữu bộ thuộc tính hoàn toàn khác biệt (ví dụ: Vulpix Lửa $\rightarrow$ Alolan Vulpix Băng; Zorua Bóng tối $\rightarrow$ Hisuian Zorua Thường/Ma; Wooper Nước/Đất $\rightarrow$ Paldean Wooper Độc/Đất).
- **Giao diện Pokédex Mới**: Cho phép người chơi xem trước (Preview) toàn diện cả sprite, chỉ số, cây tiến hóa và chiêu thức của toàn bộ các dạng biến thể và Mega ngay cả khi chưa sở hữu!

---

## 7. HỆ THỐNG ĐÒN ĐÁNH & TIẾN HÓA CHIÊU THỨC ĐA TẦNG (+ / ++ / +++)

### 7.1. Bể Chiêu Thức Chuẩn Chỉ (116 Moves)
Tất cả 116 chiêu thức trong game được thiết kế tối ưu riêng cho dòng game sinh tồn PokéSurvivor, chia thành các dạng thực thi rõ ràng:
- **Melee (Cận chiến)**: Quét cận thân diện rộng, đẩy lùi kẻ thù (ví dụ: Close Combat, Thunder Punch, Fire Punch).
- **Projectile (Đạn bắn)**: Phóng các luồng đạn ma pháp/vật lý xuyên thấu hoặc nổ lan (ví dụ: Flamethrower, Bullet Punch, Water Pulse).
- **Beam (Tia laze)**: Bắn các chùm tia năng lượng xuyên thẳng toàn màn hình (ví dụ: Hyper Beam, Solar Beam, Oblivion Wing).
- **Circle / Aura (Hào quang xung quanh)**: Tạo vòng xoáy sát thương liên tục bảo vệ người chơi (ví dụ: Discharge, Fiery Dance, Leaf Storm).
- **Buff (Tăng cường)**: Tăng tốc chạy, hồi phục máu, dựng giáp phản đòn (ví dụ: Roost, Agility, Iron Defense).
- **Stun / Control (Khống chế)**: Đóng băng, gây choáng hoặc làm chậm quái vật diện rộng.

### 7.2. Biểu Tượng Kiểu Đòn Đánh Trên HUD (Kind Badges)
Ở góc dưới bên phải mỗi ô chiêu thức trên màn hình giao diện (HUD), một biểu tượng nhỏ 10x10 pixel sẽ hiển thị trực quan phong cách đòn đánh:
- Biểu tượng **Tia Laze (Beam)**: Màu vàng cam rực lửa.
- Biểu tượng **Cận chiến (Melee Fist)**: Nắm đấm sức mạnh.
- Biểu tượng **Đạn bắn (Projectile Arrow)**: Mũi tên tốc độ.
- Biểu tượng **Hào quang (Aura Circle)**: Vòng tròn xoay quanh.
- Biểu tượng **Hồi máu/Hỗ trợ (Buff Cross)**: Chữ thập xanh ngọc.
- Biểu tượng **Choáng (Stun Lightning)**: Tia sét khống chế.

### 7.3. Cơ Chế Tiến Hóa Chiêu Thức Đa Tầng (+ / ++ / +++)
Đây là một trong những tính năng đột phá nhất của game:
1. **Bậc Cơ Bản (Level 1 $\rightarrow$ Level 8)**: Nâng cấp thông thường qua các lần lên cấp, gia tăng sát thương, giảm hồi chiêu, tăng số lượng tia đạn.
2. **Bậc Tiến Hóa Cấp 1 (Bậc +)**:
   - Khi chiêu thức đạt Level 8 và người chơi sở hữu Vật Phẩm Trang Bị (Held Item) tương thích.
   - Chiêu thức biến đổi thành dạng thức tiến hóa hoàn chỉnh với hoạt ảnh và sát thương vượt bậc.
3. **Bậc Cường Hóa Đột Phá (Bậc ++)**:
   - Khi chiêu thức đạt bậc +, người chơi cần hoàn thành nhiệm vụ thực chiến ngay trong trận với chiêu thức đó: gây đủ lượng sát thương mục tiêu, dùng chiêu đủ số lần hoặc làm choáng đủ số kẻ địch.
   - Khi hoàn thành, chiêu thức thăng hoa lên bậc ++ với hiệu ứng phụ độc quyền (ví dụ: tạo sóng xung kích thứ cấp, hút máu, đốt cháy diện rộng).
4. **Bậc Đồng Quy Tối Thượng (Bậc +++)**:
   - Để mở khóa bậc tối thượng +++, người chơi phải đạt điều kiện:
     + Bản thân chiêu thức đó đã đạt **bậc ++**.
     + Người chơi đang sở hữu cùng lúc **ít nhất 3 chiêu thức khác** đều đã tiến hóa lên **bậc +** trở lên.
   - Sức mạnh bậc +++ là đỉnh cao tuyệt đối, kích hoạt hiệu ứng cộng hưởng nguyên tố, xóa sổ mọi làn sóng quái vật trong nháy mắt.

---

## 8. KẺ ĐỊCH, BOSS ĐA PHASE & VÙNG VẾT NỨT (RIFTS)

### 8.1. Các Tầng Lớp Kẻ Địch
- **Lính Thường**: Xuất hiện theo đàn, tăng dần mật độ theo từng phút.
- **Quái Bắn Xa & Phù Thủy**: Núp sau đàn quái để bắn đạn độc hoặc cầu lửa.
- **Hỗ Trợ & Tạo Khiên**: Dựng giáp cho quái xung quanh hoặc hồi máu cho Boss (người chơi bắt buộc phải diệt nhóm này trước).
- **Elite Champions**: Kích thước lớn, có vòng hào quang nguyên tố, mang lượng máu cao và khả năng kháng khống chế.

### 8.2. Hệ Thống Boss Đa Phase (Multi-Phase Raid Bosses)
Nhằm mang lại thử thách xứng tầm cho những người chơi có bộ trang bị cực mạnh:
- **Lượng Máu Quy Mô Lớn (Scale x25+)**: Máu của Boss được điều chỉnh scale cực mạnh từ 60.000 HP đến hơn 1.200.000 HP ở giai đoạn cuối trận.
- **Cơ Chế Hồi Sinh Đổi Dạng (Phases Transition)**:
  + **Phase 1 (Giai đoạn Đầu)**: Boss xuất hiện ở dạng thông thường, sử dụng bộ chiêu thức cơ bản kèm vòng cảnh báo nguy hiểm (Telegraphed Hazards).
  + **Phase 2 (Cuồng Nộ - Enraged)**: Khi cạn cây máu Phase 1, Boss **không chết ngay** mà phát nổ sóng xung kích đẩy lùi người chơi, hồi phục 100% thanh máu, tăng **+35% sát thương** và **+15% tốc độ di chuyển**.
  + **Phase 3 (Dạng Tối Thượng - Mega/Primal)**: Với các Đại Boss có dạng Mega hoặc Primal, Boss sẽ thức tỉnh biến đổi hình dạng tối thượng, hồi đầy cây máu lần thứ ba, triệu hồi bão đạn phủ kín màn hình. Chỉ khi tiêu diệt Phase 3, Boss mới thực sự bị hạ gục và rơi rương kho báu quý hiếm!

### 8.3. Đấu Trường Vết Nứt (The 18 Legendary Rifts)
- Rải rác trên bản đồ sẽ xuất hiện các Cổng Vết Nứt không gian bí ẩn đại diện cho **18 hệ thuộc tính Pokémon**.
- Khi người chơi bước vào Vết Nứt:
  + Thế giới bên ngoài tạm dừng; người chơi bước vào một Đấu trường đóng kín độc lập.
  + Đối đầu trực tiếp với Pokémon Huyền Thoại thủ hộ của hệ đó (ví dụ: Mewtwo ở Rift Tâm Linh, Groudon ở Rift Đất, Kyogre ở Rift Nước, Rayquaza ở Rift Rồng...).
  + Đánh bại Huyền Thoại sẽ nhận Ấn Niêm Phong Hệ (Arena Seal), lượng lớn vé quay Gacha và ghi danh vào Bảng Thành Tựu.

### 8.4. Phán Quyết của Arceus (The Judgment of Arceus - Phút 30+)
- Khi sống sót chạm mốc **30:00**, toàn bộ quái vật thông thường lập tức bị quét sạch.
- Bầu trời chuyển sắc thái thần thánh; Đấng Sáng Tạo **Arceus** giáng lâm thực hiện *Sentencia (Phán Quyết)*.
- Trận chiến vô tận bắt đầu: Arceus liên tục triệu hồi các đợt Boss Huyền Thoại liên hoàn với sức mạnh kinh hoàng.
- Người chơi không thể "thắng" vĩnh viễn trận chiến này; mục tiêu là gây nhiều sát thương nhất có thể lên Arceus và trụ lại từng giây để ghi danh vào Bảng Xếp Hạng Toàn Cầu (Global Hall of Fame).

---

## 9. KINH TẾ, TIẾN TRÌNH & NÂNG CẤP VĨNH VIỄN

1. **Pokémonedas (Tiền vàng)**: Nhặt được khi diệt quái, phá cây, mở rương và hoàn thành nhiệm vụ. Dùng để nâng cấp chỉ số vĩnh viễn trong Cửa hàng Nâng Cấp (Talents) cho từng chú Pokémon.
2. **Tiệm Buôn Bán Kecleon (Kecleon Shop)**: Mở mỗi ngày với các loại Đĩa Dạy Chiêu (TMs), Quả Cầu Phép Thuật (Slumber Orb, Blowback Orb, Freeze Orb) và Kẹo Tăng Cấp.
3. **Vé Quay Gacha (Gacha Tickets)**:
   - Vé đơn (T1) và Vé thập liên (T10).
   - Chia theo từng Banner Thế hệ từ Vùng 1 (Kanto) đến Vùng 9 (Paldea).
   - Hệ thống Bảo Hiểm (Pity System): Quay chắc chắn nhận được Pokémon Épica và Legendaria sau một số lượt nhất định.
4. **Nhiệm Vụ Hàng Ngày & Hàng Tuần (Daily & Weekly Missions)**:
   - Luôn làm mới tự động theo múi giờ quốc tế.
   - Thưởng lượng lớn vàng, vé Gacha và điểm danh vọng.
5. **Thành Tựu & Danh Hiệu (Achievements & Titles)**:
   - Hệ thống hơn 150 huy hiệu thành tựu vinh danh cho các bậc thầy sưu tập, dũng sĩ diệt boss, chuyên gia tiến hóa chiêu thức và những người sống sót kiên cường.

---

## 10. CHẾ ĐỘ CHƠI ĐỒNG ĐỘI (MULTIPLAYER CO-OP)

- Hỗ trợ tối đa **4 người chơi** trong cùng một phòng chơi.
- **Kiến trúc P2P WebRTC Tinh gọn**: Kết nối trực tiếp giữa máy Host và các máy Khách qua STUN server miễn phí của Google, không tiêu tốn tài nguyên máy chủ trung gian.
- **Đồng bộ hóa mượt mà**:
  + Đồng bộ vị trí, đòn đánh, trạng thái quái và thanh máu Boss.
  + Hỗ trợ hồi sinh đồng đội khi bị hạ gục.
  + Quả Cầu Phép Thuật (Orbs) phát huy tác dụng diện rộng cho toàn bộ đồng đội trong phạm vi lân cận.
  + Cơ chế tự động kết nối lại (Reconnection) nếu mạng bị gián đoạn mà không làm mất ván chơi.
