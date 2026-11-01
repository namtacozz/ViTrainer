# Hệ Thống Trang Bị Giữ (Held Items) — ViTrainer

Tài liệu chi tiết về cơ chế vận hành của 21 Trang bị Giữ (**Held Items**) trong **ViTrainer** tại `js/data/items.js`, cách thức thu thập, điều kiện kích hoạt nội tại (`on`/`off`), và tương tác với hệ thống phòng ngự/chiến đấu.

---

## 1. Cơ Chế Thu Thập & Sử Dụng Trang Bị

- **Quy tắc 1 trang bị duy nhất (Single Item Rule)**:
  - Trong mỗi trận đấu, Pokémon của người chơi **chỉ được mang duy nhất 01 Trang Bị Giữ** tại một thời điểm.
  - Khi mở rương báu (Chest / Locked Chest) hoặc hạ gục Boss, nếu nhận được một trang bị mới, người chơi sẽ được lựa chọn: **Giữ lại trang bị hiện tại** hoặc **Thay thế bằng trang bị mới** (Hệ thống sẽ tự động gọi `off(player)` trang bị cũ và kích hoạt `on(player)` trang bị mới).
- **Hệ thống Roll trang bị thông minh (`G.Items.roll`)**:
  - Tự động lọc bỏ trang bị người chơi đang mang để tránh trùng lặp.
  - Các trang bị chuyển dạng đặc biệt (Keystone, DNA Splicers, Ultranecrozium Z, Griseous Orb, Meteorite) chỉ xuất hiện trong bể roll nếu người chơi đang điều khiển đúng Pokémon tương thích hoặc Pokémon có hình thái Mega tương ứng.

---

## 2. Bảng Tra Cứu Toàn Bộ 21 Trang Bị (Held Items)

| ID | Tên Trang Bị | Biểu tượng | Mô tả & Chỉ số cụ thể | Cơ chế Gameplay & Tương tác |
| :--- | :--- | :---: | :--- | :--- |
| `leftovers` | **Restos**<br>*(Thức Ăn Thừa)* | 🍎 | Hồi phục **1.5% Máu tối đa** mỗi giây. | Tự động cộng dồn vào chỉ số hồi phục cố định `regenFlat`. Cực kỳ hữu dụng cho các tank trâu máu như Blissey, Snorlax, Dondozo. |
| `choiceband` | **Cinta Elección**<br>*(Băng Buộc Lựa Chọn)* | 🎗️ | **+40% Tổng sát thương** đầu ra (`atkMul *= 1.4`). | Khóa khả năng đổi chiêu hoặc học chiêu mới, tập trung tối đa hóa hỏa lực cho các lối chơi bạo lực một đòn diệt quái. |
| `quickclaw` | **Garra Rápida**<br>*(Móng Vuốt Nhanh)* | 🐾 | **-20% Thời gian hồi chiêu** cho toàn bộ kỹ năng (`cdMul *= 0.8`). | Nhân với các hệ số giảm hồi chiêu từ thẻ nâng cấp Tốc Độ Đánh, giúp xả chiêu thức liên tục không ngừng nghỉ. |
| `focussash` | **Banda Focus**<br>*(Đai Tập Trung)* | 🥋 | Đòn đánh chí tử sẽ giữ lại người chơi ở **1 Máu** (Hồi chiêu 60 giây). | Chống sốc sát thương từ các đòn Ultimate hoặc dẫm phải bẫy nguy hiểm. Khi kích hoạt sẽ hiển thị hiệu ứng thông báo `¡Banda Focus!`. |
| `shellbell` | **Cascabel Concha**<br>*(Chuông Vỏ Sò)* | 🐚 | **Hút máu (Lifesteal)**: Hồi phục một phần sinh lực tương ứng sát thương gây ra. | Kích hoạt trực tiếp trong vòng lặp gây sát thương của `Player.hasItem('shellbell')`. Rất mạnh khi kết hợp với các chiêu thức diện rộng đốt quái số lượng lớn. |
| `amuletcoin` | **Moneda Amuleto**<br>*(Đồng Xu Bùa Hộ)* | 🪙 | **+50% Tiền xu Pokémoneda** nhận được khi kết thúc trận (`coinMul *= 1.5`). | Trang bị thiết yếu cho các lượt chạy nông trại vàng để mở khóa ngoại trang và nâng cấp cây kỹ năng vĩnh viễn trong sảnh chờ. |
| `luckyegg` | **Huevo Suerte**<br>*(Trứng May Mắn)* | 🥚 | **+30% Điểm kinh nghiệm (EXP)** nhận được từ mọi nguồn (`xpMul *= 1.3`). | Giúp Pokémon nhanh chóng đạt các mốc cấp độ tiến hóa 15, 25, 30 và 50 trước khi Boss xuất hiện. |
| `lifeorb` | **Vidasfera**<br>*(Ngọc Sinh Mệnh)* | 🔮 | **+30% Tổng sát thương**, nhưng mỗi lần tung chiêu tiêu tốn một lượng nhỏ máu. | Trao đổi máu lấy sức mạnh tối thượng. Phù hợp hoàn hảo khi kết hợp với khả năng hút máu từ `Shell Bell` hoặc nội tại hồi phục. |
| `choicescarf` | **Pañuelo Elección**<br>*(Khăn Quàng Lựa Chọn)* | 🧣 | **+35% Tốc độ di chuyển** (`spdMul *= 1.35`). | Tăng khả năng luồn lách né tránh các vùng đòn nguy hiểm (Hazards), bầy quái phi thân và truy đuổi Boss. |
| `rockyhelmet` | **Casco Dentado**<br>*(Mũ Gai Đá)* | 🪖 | Phản sát thương lên quái vật tấn công cận chiến va chạm vào người chơi. | Trừng phạt những bầy quái đuổi đánh dồn dập hoặc quái Charger húc vào nhân vật. |
| `assaultvest` | **Chaleco Asalto**<br>*(Áo Giáp Tấn Công)* | 🦺 | **+20% Giảm sát thương** nhận vào (`p.itemReduce += 0.2`). | **Đặc biệt**: Hệ số giảm 20% này nằm ngoài trần giới hạn 70% của thẻ Giáp (PDEF/SDEF), cho phép nhân vật sinh tồn bền bỉ trước đòn đánh khủng khiếp của Boss. |
| `eviolite` | **Mineral Evolutivo**<br>*(Khoáng Thạch Tiến Hóa)* | 💎 | **+40% Giáp Vật Lý và Phép** (tương đương giảm 28.6% sát thương) nếu chưa đạt dạng cuối. | Kiểm tra `!G.isBaseStage(dex) || stage < maxStage`. Giúp các Pokémon Dạng 1 và Dạng 2 trở nên cực kỳ cứng cáp khi chưa tiến hóa hoàn thiện. |
| `weaknesspolicy` | **Seguro Debilidad**<br>*(Bảo Hiểm Yếu Điểm)* | 📜 | Khi nhận sát thương Khắc Hệ (Super Effective), tăng **+35% Sát thương trong 8 giây**. | Hiển thị hiệu ứng `¡Seguro Debilidad!` kích hoạt thời gian đếm ngược cường hóa hỏa lực phản công chớp nhoáng. |
| `expertbelt` | **Cinta Experto**<br>*(Thắt Lưng Chuyên Gia)* | 🥋 | **+30% Sát thương** khi đánh trúng kẻ địch bằng đòn Khắc Hệ. | Khen thưởng khả năng chọn chiêu thức đa dạng các hệ để khai thác triệt để điểm yếu của kẻ địch. |
| `loadeddice` | **Dado Trucado**<br>*(Xúc Xắc Gian Lận)* | 🎲 | **+2 Viên đạn / Đợt sóng** cho toàn bộ các chiêu thức đa đòn (Multi-hit). | Tăng trực tiếp số lượng tia cho Pin Missile, Bullet Seed, Icicle Spear, Rock Blast, Water Shuriken, v.v. |
| `heavydutyboots` | **Botas Gruesas**<br>*(Ủng Dã Chiến Nặng)* | 👢 | **Miễn nhiễm hoàn toàn** với bãi dung nham, vũng lầy làm chậm và cạm bẫy địa hình. | Giúp người chơi di chuyển tự do qua mọi vùng đất nguy hiểm do quái Zoner hoặc Boss tạo ra. |
| `keystone` | **Mega Aro**<br>*(Vòng Mega Thần Năng)* | 💍 | **+10% Toàn bộ chỉ số**, kích hoạt Mega tức thì và **+15% Sát thương STAB**. | Cho phép Pokémon có thể tiến hóa Mega ngay lập tức tại bất kỳ cấp độ nào mà không cần chờ tới cấp 30. |
| `dnasplicers` | **Punta ADN**<br>*(Ghim Nối Chuỗi ADN)* | 🧬 | **+20% Sát thương Rồng & Băng**. Cho phép Kyurem hợp thể thành Black / White Kyurem. | Kích hoạt biến hình Kyurem và cường hóa các kỹ năng thuộc hệ Rồng và Băng. |
| `ultranecroziumz` | **Ultranecrostal Z**<br>*(Tinh Thể Z Ánh Sáng)* | ✨ | **+25% Sát thương Tâm Linh & Rồng**. Khai mở dạng Ultra Necrozma. | Kích hoạt hào quang ánh sáng tối thượng cho Necrozma ngay khi nhặt được. |
| `griseousorb` | **Griseosfera**<br>*(Ngọc Bạch Kim)* | 🔮 | **+20% Sát thương Ma & Rồng**. Chuyển đổi Giratina sang Dạng Gốc (Origin Forme). | Cường hóa Giratina biến đổi hình hài thành dạng bóng ma bay lơ lửng không chân với chỉ số vượt trội. |
| `meteorite` | **Meteorito Cósmico**<br>*(Mảnh Thiên Thạch Vũ Trụ)* | ☄️ | Cho phép chuyển đổi linh hoạt các dạng của Deoxys (Tấn Công, Phòng Thủ, Tốc Độ). | Mở khóa tùy chọn đổi dạng cho Deoxys để tối ưu hóa chỉ số theo diễn biến trận đấu. |

---

## 3. Tương Tác Giữa Trang Bị & Hệ Thống Giáp Phân Định

Hệ thống phòng thủ của người chơi trong `js/entities/player.js` kết hợp giữa Trang Bị Giữ và Thẻ Giáp:
- **Phòng thủ Vật Lý (`pdefReduce`)** và **Phòng thủ Phép (`sdefReduce`)**: Tăng tối đa 70% từ việc chọn thẻ nâng cấp Giáp (8 cấp độ: mỗi cấp +6.25% - 8%).
- **Assault Vest (`assaultvest`)**: Tăng thêm `+20%` giảm trừ trực tiếp (`itemReduce = 0.20`), được tính độc lập nhân sau cùng:
  $$\text{Damage Received} = \text{Raw Damage} \times (1 - \text{DefReduce}) \times (1 - \text{ItemReduce})$$
  Điều này cho phép một người chơi mang Assault Vest có thể đạt mức giảm sát thương lên tới gần **76% - 80%**, bảo toàn mạng sống trước những đòn vỗ của Boss phút 20+.
- **Eviolite (`eviolite`)**: Tăng trực tiếp 40% phòng thủ cho các loài chưa tiến hóa hết, đóng vai trò như một lớp giáp dày giúp cày cấp an toàn cho các dạng khởi đầu.
