# ViTrainer — Cẩm Nang Toàn Diện Về Chiêu Thức (Moves)

Tài liệu chi tiết về toàn bộ hệ thống chiêu thức trong **ViTrainer**, bao gồm phân loại chuẩn Pokémon, cơ chế chiêu thức độc quyền và hệ thống tiến hóa 3 nấc.

---

## 1. Cơ Chế Cốt Lõi Của Chiêu Thức

### 1.1. Phân loại Chuẩn Sát Thương: Vật Lý (Physical) vs Đặc Biệt (Special)
ViTrainer tuân thủ chuẩn xác 100% hệ thống phân chia sát thương từ Pokémon chính thức (Game Freak / Bulbapedia):
- **Sát thương Vật Lý (`physical`)**: Tính toán dựa trên chỉ số **Tấn Công (Atk / pa)** của Pokémon bạn và bị giảm trừ bởi **Phòng Thủ (Def / df)** của đối phương cùng **Giáp Vật Lý (`pdefReduce`)** của người chơi.
- **Sát thương Đặc Biệt (`special`)**: Tính toán dựa trên chỉ số **Tấn Công Đặc Biệt (Sp. Atk / sa)** và bị giảm trừ bởi **Phòng Thủ Đặc Biệt (Sp. Def / sd)** cùng **Giáp Phép (`sdefReduce`)**.

### 1.2. Thể loại Thi triển (Move Kinds)
- **Melee (Cận chiến)**: Quét hình cung hoặc vòng tròn cận thân, gây choáng/đẩy lùi. Giảm 25% sát thương nhận vào khi đang áp sát chiến đấu.
- **Continuous Beam (Chùm tia liên tục)**: Tự động khóa mục tiêu sống (Continuous Lock-on Tracking), chiếu đốt liên tục cho đến khi mục tiêu chết rồi lập tức chuyển mục tiêu mới. Chỉ số Giảm hồi chiêu (CDR) chuyển hóa thành tốc độ đốt (Tick Rate).
- **Projectile & Homing (Đạn bay & Đạn tầm nhiệt)**: Bắn các viên đạn nguyên tố hoặc truy đuổi mục tiêu với độ cơ động cao.
- **Quake & Shockwave (Địa chấn & Chấn động)**: Tạo sóng địa chấn mặt đất đánh ngã hoặc xuyên thấu hàng loạt quái.
- **Dash (Lướt càn quét)**: Lao thẳng về phía trước, bất tử trong thoáng chốc và để lại vệt năng lượng thiêu đốt.
- **Vortex (Xoáy kéo)**: Tạo lốc xoáy hoặc hố đen hút quái vào trung tâm và đốt máu theo thời gian.
- **Nova (Tỏa đạn 360 độ)**: Bắn bão đạn đa hướng bảo vệ toàn diện.
- **Orbit (Quả cầu bay quanh)**: Các vệ tinh hộ thể xoay tròn quanh người chơi càn quét kẻ địch tiếp cận.
- **Turret (Vật thể triệu hồi)**: Triệu hồi búp bê/ngọn lửa tự động bắn hỗ trợ độc lập.

---

## 2. Hệ Thống Tiến Hóa Chiêu Thức 3 Nấc (Tier +, ++, +++)

Mỗi chiêu thức trong ViTrainer có thể tiến hóa qua 3 cảnh giới tối thượng:

### Nấc 1: Rạng Cấp Phổ Thông (`+`)
- **Điều kiện**: Nâng cấp chiêu thức lên cấp tối đa (Level Max) và sở hữu ít nhất 1 thẻ nâng cấp Chỉ số (Stat Card) tương ứng trong trận.
- **Hiệu ứng**: Tăng ~80% sát thương, gia tăng số lượng đạn, bán kính và mở rộng hiệu ứng khống chế.

### Nấc 2: Rạng Cấp Tinh Thông (`++`)
- **Điều kiện**: Đã đạt Rạng `+` và hoàn thành **Nhiệm Vụ Tinh Thông (Mastery Quest)** của chiêu thức đó:
  - Các chiêu gây sát thương: Gây tối thiểu **200,000 damage**.
  - Các chiêu có hiệu ứng khống chế: Gây choáng/làm chậm/đóng băng thành công **15 lần**.
- **Hiệu ứng**: Tăng thêm `+40%` sát thương, giảm `15%` thời gian hồi chiêu, `+1` đạn hoặc `+20%` bán kính.

### Nấc 3: Rạng Cấp Tối Thượng (`+++` / Dominio Supremo)
- **Điều kiện**: Chính chiêu thức đó đã đạt Rạng `++` và trong bộ 4 chiêu thức của bạn có **ít nhất 1 chiêu thức đồng đội khác đạt Rạng `+` trở lên**.
- **Hiệu ứng**: Đột phá sức mạnh thần thánh: Nhân đôi sát thương (`+100%`), `+2` đạn/xuyên thấu, mở khóa cơ chế độc quyền đặc biệt quét sạch toàn màn hình.

---

## 3. Danh Mục Chiêu Thức Độc Quyền (Signature Moves)

Các chiêu thức tối thượng chỉ cấp cho đúng loài Pokémon sở hữu (Exclusive Moves):

| Chiêu Thức | Loài Sở Hữu | Hệ | Loại | Cơ Chế Độc Quyền Đặc Biệt |
| :--- | :--- | :--- | :--- | :--- |
| **Behemoth Blade** | Zacian (Thần Kiếm) | Thép | Physical | **Giant Slayer**: Gây gấp đôi sát thương (x2 damage) lên Boss và Legend. Phóng luồng **Kiếm Khí Hoàng Gia** ánh bạc xuyên thấu bản đồ. Mỗi nhát chém buff `+12% tốc độ` và `+5% chí mạng` (cộng dồn 3 lần). Bậc `+++` phóng bão 3 luồng kiếm khí. |
| **Behemoth Bash** | Zamazenta (Thần Khiên) | Thép | Physical | **Thần Khiên Bất Hoại**: Chặn 100% sát thương nhận vào trong 0.9s - 1.4s, dồn lực giải phóng sóng chấn động hình nón cực mạnh hất tung và gây **Choáng (Stun)** diện rộng. |
| **Roar of Time** | Dialga | Rồng | Special | **Thời Gian Ngưng Đọng**: Đạn thời gian nổ chuỗi làm chậm và đóng băng thời gian toàn bộ kẻ địch trong 2.5s. |
| **Spacial Rend** | Palkia | Rồng | Special | **Không Gian Vết Rách**: Xé toạc không gian tạo vết nứt chân không tồn tại 3s liên tục chém chí mạng và hút quái vào tâm. |
| **Shadow Force** | Giratina | Ma | Physical | **Tan Biến Hư Không**: Giratina tàng hình hoàn toàn vô địch trong 1.2s, tăng 50% tốc chạy rồi chém 360 độ chí mạng càn quét kẻ địch. |
| **Judgment** | Arceus | Normal | Special | **Phán Quyết Sáng Thế**: Mưa ánh sáng thần thánh trút xuống từ bầu trời, mỗi đợt rơi tạo sóng xung kích thanh tẩy mọi kẻ địch. |
| **Dragon Ascent** | Rayquaza | Bay | Physical | **Thiên Hóa Thần Long**: Hóa thân thành phi long ánh sáng bay xuyên bản đồ bất tử, để lại dải thiên thạch nổ liên hoàn. |
| **Origin Pulse** | Kyogre | Nước | Special | **Tam Ngọn Sóng Thần**: Phóng chùm tia ba đợt sóng cực áp liên tục xô đẩy và dập nát kẻ địch. |
| **Precipice Blades** | Groudon | Đất | Physical | **Gươm Nham Thạch**: Hàng loạt phiến đá nham thạch sắc nhọn trồi lên từ lòng đất liên tiếp theo hướng ngắm. |
| **Dark Void** | Darkrai | Bóng Tối | Special | **Hư Vô Ác Mộng**: Hố đen kéo hút quái vật vào tâm, đưa toàn bộ quái vào trạng thái **Ngủ sâu (Sleep 3s)** và thiêu đốt sát thương ác mộng liên tục. |
| **Geomancy** | Xerneas | Tiên | Special | **Thần Mộc Sinh Mệnh**: Hồi ngay `3% HP`, buff `+25% Công` và `-20% Hồi chiêu` trong 6s, đồng thời phóng 8 chùm phấn tiên cầu vồng tầm nhiệt. |
| **Oblivion Wing** | Yveltal | Bay | Special | **Hút Máu Tuyệt Đối (Lifesteal)**: Hút trực tiếp `20%` sát thương gây ra hồi về máu người chơi, đồng thời để lại vệt tử khí thiêu đốt. |
| **Plasma Fists** | Zeraora | Điện | Physical | **Tia Sét Lan Truyền (Chain Lightning)**: Chuỗi đấm siêu tốc phóng sét xích giật liên hoàn giữa 5 mục tiêu gần nhất, gây sốc điện tê liệt (Stun). |
| **Fleur Cannon** | Magearna | Tiên | Special | **Pháo Hoa Linh Hồn**: Khối cầu năng lượng cực đại nổ bung thành 8 chùm đạn pháo hoa mini rực rỡ truy tìm mục tiêu. |
| **Thousand Arrows** | Zygarde | Đất | Physical | **Vạn Tiễn Xuyên Phá**: Bắn rơi lập tức toàn bộ quái vật bay trên không (`flying = false`) và ghim cứng quái xuống đất. |
| **Thousand Waves** | Zygarde | Đất | Physical | **Sóng Địa Chấn Ngàn Trượng**: Tỏa 3 đợt sóng chấn động 360 độ liên hoàn đẩy lùi và cô lập kẻ địch. |
| **Land's Wrath** | Zygarde | Đất | Physical | **Nộ Khí Đất Mẹ**: Khe nứt dung nham nổ liên tiếp theo hình chữ Z. |
| **Core Enforcer** | Zygarde 100% | Rồng | Special | Chùm tia hủy diệt quét hình chữ Z cực rộng, triệt tiêu kháng tính của kẻ địch. |
| **Nihil Light** | Zygarde Mega | Rồng | Special | Chùm ánh sáng hư vô quét sạch màn hình, tạo lỗ đen chân không kéo sụp quái vật tại điểm rơi. |
| **Sunsteel Strike** | Solgaleo | Thép | Physical | Lao vút như thiên thạch mặt trời, bất tử và để lại vệt lửa nóng chảy thiêu đốt. |
| **Moongeist Beam** | Lunala | Ma | Special | Chùm tia nguyệt thực triệu hồi hai lưỡi liềm ma thuật chém xoáy xung quanh mục tiêu. |
| **Glaciate** | Kyurem | Băng | Special | **Hơi Thở 0 Độ K**: Đóng băng cứng (Freeze Stun 2.2s) toàn bộ quái trong vùng và giảm 60% tốc chạy. |
| **Freeze Shock** | Black Kyurem | Băng | Physical | Bão sét băng giá vừa đóng băng vừa giật điện cực mạnh. |
| **Ice Burn** | White Kyurem | Băng | Special | Ngọn lửa băng cực hàn vừa thiêu đốt vừa làm chậm cực đại. |
| **Fusion Flare** | Reshiram | Lửa | Special | Quả cầu lửa hợp nhất phát nổ để lại biển lửa rực cháy. |
| **Fusion Bolt** | Zekrom | Điện | Physical | Quả cầu sấm sét giáng sấm sét kinh thiên động địa tạo điện trường cao thế. |
| **Spectral Thief** | Marshadow | Ma | Physical | Ám sát từ sau lưng cướp 25% sát thương của quái vật. |
| **Gear Grind** | Klinklang | Thép | Physical | Bánh răng thép nghiền nát kẻ thù liên hoàn với tốc độ quay cực đại. |
| **Fiery Dance** | Volcarona | Lửa | Special | Vũ điệu rực lửa thiêu đốt và gia tăng liên tục sức mạnh phép thuật. |

---

## 4. Bảng Tra Cứu 139 Chiêu Thức Chuẩn Hóa

Toàn bộ các chiêu thức phổ thông theo hệ:

- **Hệ Normal**: Tackle (Physical), Quick Attack (Physical), Body Slam (Physical), Hyper Voice (Special), Hyper Beam (Special), Rapid Spin (Physical), Substitute (Physical).
- **Hệ Lửa (Fire)**: Ember (Special), Flamethrower (Special), Fire Spin (Special), Heat Wave (Special), Flame Wheel (Physical), Flame Charge (Physical), Fire Punch (Physical), Will-O-Wisp (Special).
- **Hệ Nước (Water)**: Water Gun (Special), Bubble (Special), Hydro Pump (Special), Bubble Beam (Special), Whirlpool (Special).
- **Hệ Cỏ (Grass)**: Vine Whip (Physical), Razor Leaf (Physical), Leaf Storm (Special), Giga Drain (Special), Seed Bomb (Physical), Energy Ball (Special), Solar Beam (Special).
- **Hệ Điện (Electric)**: Thunder Shock (Special), Discharge (Special), Thunderbolt (Special), Electro Ball (Special), Thunder Wave (Special), Thunder Punch (Physical).
- **Hệ Băng (Ice)**: Ice Beam (Special), Powder Snow (Special), Ice Shard (Physical), Freeze-Dry (Special), Ice Punch (Physical), Hail (Special).
- **Hệ Giác Đấu (Fighting)**: Karate Chop (Physical), Aura Sphere (Special), Rolling Kick (Physical), Vacuum Wave (Special), Dynamic Punch (Physical), Close Combat (Physical).
- **Hệ Độc (Poison)**: Sludge (Special), Poison Sting (Physical), Toxic (Special), Toxic Spikes (Physical), Acid Spray (Special).
- **Hệ Đất (Ground)**: Mud Shot (Special), Bulldoze (Physical), Sand Tomb (Physical), Magnitude (Physical), Bonemerang (Physical).
- **Hệ Bay (Flying)**: Gust (Special), Wing Attack (Physical), Aerial Ace (Physical), Air Slash (Special), Whirlwind (Special).
- **Hệ Tâm Linh (Psychic)**: Confusion (Special), Psybeam (Special), Psychic (Special), Psycho Cut (Physical), Extrasensory (Special), Mist Ball (Special).
- **Hệ Côn Trùng (Bug)**: Bug Bite (Physical), Bug Buzz (Special), Signal Beam (Special), U-turn (Physical), String Shot (Physical).
- **Hệ Đá (Rock)**: Rock Throw (Physical), Rock Slide (Physical), Rock Tomb (Physical), Ancient Power (Special), Power Gem (Special), Spikes (Physical).
- **Hệ Ma (Ghost)**: Lick (Physical), Shadow Ball (Special), Hex (Special), Shadow Sneak (Physical), Ominous Wind (Special), Night Shade (Special).
- **Hệ Rồng (Dragon)**: Dragon Rage (Special), Dragon Breath (Special), Dragon Claw (Physical), Outrage (Physical).
- **Hệ Thép (Steel)**: Metal Claw (Physical), Flash Cannon (Special), Meteor Mash (Physical), Gyro Ball (Physical), Bullet Punch (Physical), Mirror Shot (Special).
- **Hệ Bóng Tối (Dark)**: Bite (Physical), Dark Pulse (Special), Sucker Punch (Physical), Night Slash (Physical).
- **Hệ Tiên (Fairy)**: Fairy Wind (Special), Dazzling Gleam (Special), Draining Kiss (Special), Play Rough (Physical), Disarming Voice (Special).
