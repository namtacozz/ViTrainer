# GDD — ViTrainer · Thám Hiểm Hầm Ngục & Sinh Tồn Pokémon

> Tài liệu thiết kế trò chơi (Game Design Document). Phản ánh trạng thái thiết kế và cơ chế hoạt động thực tế của **ViTrainer** (ViTeam).

---

## 1. Khái Niệm Cốt Lõi (Core Concept)

- **Nền tảng**: Trình duyệt web hiện đại (Desktop, Tablet, Mobile). Chạy trực tiếp qua `index.html` hoặc máy chủ web tĩnh, hỗ trợ PWA offline.
- **Thể loại**: Bullet-heaven / Horde Survival + Roguelite + Gacha Thu Thập Nhân Vật.
- **Tác phẩm truyền cảm hứng**: *Survivor.io*, *Vampire Survivors*, *Pokémon Mystery Dungeon*.
- **Phong cách thẩm mỹ**: Pixel art 16-bit cổ điển từ dòng game Pokémon Mystery Dungeon kết hợp giao diện Dark Mode hiện đại với viền chỉ vàng kim hoàng gia.
- **Nhân vật người chơi**: Người chơi nhập vai một Pokémon bạn đồng hành, chiến đấu sinh tồn giữa bầy quái vật hoang dã. Hỗ trợ đầy đủ **1021 Pokémon** từ 9 thế hệ (Gen 1 đến Gen 9).
- **Hạ tầng không chi phí (Zero Cost Architecture)**: Toàn bộ mã nguồn, tài nguyên hình ảnh, âm thanh, lưu trữ đám mây và kết nối mạng đa người chơi vận hành hoàn toàn trên các dịch vụ miễn phí (GitHub Pages, Firebase Spark, Google STUN).

---

## 2. Luồng Màn Hình & Trải Nghiệm Người Chơi (Screen Flow)

```
Đăng Nhập / Tạo Tài Khoản / Chơi Khách (Guest)
        │
        ├─ (Lần đầu) Bài kiểm tra tính cách ─> Gợi ý Pokémon khởi đầu
        │                                        ├─ Nhận bạn đồng hành
        │                                        └─ Tự chọn (29 Pokémon khởi đầu)
        ▼
Sảnh Chính (Menu)  (Bối cảnh thế giới động với Pokémon hoang dã di chuyển)
   ├─ Vào Trận   → Chọn Đấu Trường → Sinh Tồn → Tổng kết (Vàng, Mảnh vé, Shinies)
   ├─ Pokémon    → Bộ sưu tập theo vùng, chọn bạn đồng hành (Thường / Shiny)
   ├─ Nâng Cấp   → Cây tài năng vĩnh viễn (Máu, Công, Thủ, Tốc độ, Hút máu)
   ├─ Chiêu Mộ   → 9 Banner Gacha tương ứng 9 thế hệ vùng đất
   ├─ Bạn Bè     → Thêm bạn bằng biệt danh, tạo phòng Co-op 8 người
   └─ Xếp Hạng   → Bảng vàng thời gian sinh tồn: Đơn / Tổ đội (Ngày, Tuần, Tháng, Mọi thời đại)
```

### 2.1 Hệ Thống Tài Khoản
- Hỗ trợ 3 hình thức: Đăng nhập bằng Tên người dùng + Mật khẩu, Đăng nhập bảo mật qua Google, hoặc Chơi Khách tức thì.
- Dữ liệu tài khoản lưu trữ trên Firebase Realtime Database và Cloud Firestore. Đồng bộ tiến trình tự động giữa máy tính và điện thoại.

### 2.2 Kiểm Tra Tính Cách & Chọn Bạn Khởi Đầu
- 8 câu hỏi tình huống phong cách Mystery Dungeon; điểm số tích lũy xác định bản tính người chơi (Dũng Cảm, Tinh Nghịch, Điềm Tĩnh, v.v.).
- Đề xuất Pokémon bạn đồng hành tương ứng từ danh sách 29 Pokémon khởi đầu (Starters từ Gen 1 đến Gen 9 cộng thêm Psyduck và Slowpoke). Người chơi có thể chấp nhận hoặc tự do chọn loài khác.

### 2.3 Chế Độ Chơi Hợp Tác Online (Multiplayer Co-op Tối Đa 8 Người)
- **Kết nối P2P WebRTC**: Kết nối trực tiếp giữa các trình duyệt thông qua máy chủ STUN miễn phí của Google.
- **Máy chủ điều phối (Host)**: Người tạo phòng điều phối vòng lặp quái vật, vật phẩm nhặt và đồng hồ trận đấu; mỗi người chơi tự tính toán tọa độ, máu và hoạt ảnh của mình.
- **Chia sẻ kinh nghiệm**: Điểm kinh nghiệm nhặt được sẽ đồng đều cho cả đội. Khi có thành viên lên cấp, giao diện chọn thẻ sẽ mở ra và trận đấu tiếp tục mượt mà.
- **Cơ chế hồi sinh**: Khi hết máu, Pokémon ngã xuống; đồng đội đứng cạnh trong vòng 3 giây sẽ hồi sinh họ với 50% lượng máu tối đa.
- **Cân bằng độ khó theo số lượng người chơi**: Tự động điều chỉnh lượng quái vật và máu của Boss tương ứng với số lượng thành viên trong phòng.

---

## 3. Hệ Thống Chiến Đấu & Cơ Chế Trong Trận (In-Run Combat)

- **Cơ chế đánh tự động**: Pokémon tự động kích hoạt chiêu thức chủ động đang được chọn về phía kẻ địch gần nhất hoặc hướng chỉ định.
- **Bộ 4 Chiêu Thức & Dung Hợp (Bond System)**:
  - Người chơi có tối đa 4 slot chiêu thức chiến đấu.
  - Mỗi khi đánh bại một Boss Huyền Thoại trong Vết Nứt (Rift), người chơi được mở khóa cơ chế Dung Hợp (Bond), cho phép kết hợp tối đa 4 chiêu thức vào cùng 1 phím bấm để kích hoạt đồng thời.
- **Tiến Hóa Chiêu Thức 3 Cấp (+, ++, +++)**:
  - Khi một chiêu thức đạt cấp độ tối đa (Level 5), nếu người chơi sở hữu Trang Bị Giữ tương thích, chiêu thức có thể đột phá lên các dạng tiến hóa cấp cao với tầm ảnh hưởng và uy lực vượt trội.
- **Tiến Hóa Pokémon Trong Trận**:
  - **Level 15**: Tiến hóa bậc 2 (ví dụ: Charmander $\rightarrow$ Charmeleon).
  - **Level 30**: Tiến hóa bậc 3 (ví dụ: Charmeleon $\rightarrow$ Charizard), hồi phục ngay 50% HP.
  - **Dạng Mega Evolution / Primal Reversion**: Kích hoạt khi đạt mốc cấp độ cao nhất và trang bị Mega Stone, tỏa hào quang Mega Aura tăng mạnh toàn bộ chỉ số.

---

## 4. Hệ Thống Đấu Trường & Boss Huyền Thoại (Bosses & Rifts)

- **Chu kỳ xuất hiện Boss**: Cứ mỗi 3 phút từ phút thứ 3 đến phút thứ 27, một Boss hùng mạnh sẽ giáng lâm.
- **3 Phase Giai Đoạn Boss**:
  - **Phase 1 (Bình Thường)**: Tung các đòn đánh cơ bản có vệt báo hiệu tối thiểu 0.6 giây.
  - **Phase 2 (Cuồng Nộ - Enrage)**: Tăng 25% tốc độ di chuyển, triệu hồi bầy quái đệ tử hỗ trợ.
  - **Phase 3 (Thức Tỉnh Thần Năng)**: Mở khóa tuyệt kỹ diện rộng (AoE Ultimate).
- **Vết Nứt Thứ Nguyên (Dimensional Rifts)**:
  - Cổng dịch chuyển mở ra ngẫu nhiên đưa người chơi vào 18 Đấu trường Nguyên tố.
  - Hạ gục vị thần bảo hộ (Mewtwo, Rayquaza, Dialga, Palkia, Giratina...) để nhận phần thưởng báu vật và mở khóa Dung hợp chiêu thức.
- **Phút 30 - Thẩm Phán Arceus (Judgement)**: Trận chiến sinh tử quyết định sự sống còn của hầm ngục trước Đấng Sáng Tạo Arceus.

---

## 5. Kinh Tế & Thu Thập (Economy & Progression)

- **Tiền tệ trong game**:
  - **Pokémonedas (Vàng)**: Kiếm được qua mỗi trận đấu, dùng để mua sắm trong Tiệm Kecleon và nâng cấp bảng Tài Năng vĩnh viễn.
  - **Vé Chiêu Mộ (Gacha Tickets)**: Rớt ngẫu nhiên từ quái vật (vé thường) và Boss huyền thoại (vé ×10), dùng để quay gacha mở khóa Pokémon mới.
- **Tiệm Kecleon (Kecleon Shop)**:
  - Cung cấp Mentas (thay đổi Bản Tính), Ability Capsules (thay đổi Nội Tại) và 8 Đĩa Dạy Chiêu TM mới mỗi ngày.
- **Hệ Thống Shiny**:
  - Tỷ lệ bắt gặp Shiny 1/4096 ngoài tự nhiên và 1/100 khi quay Gacha.
  - Hoàn thành Pokédex của một vùng đất sẽ trao tặng Bùa Iris (Shiny Charm), nhân đôi tỷ lệ Shiny của vùng đó.

---

## 6. Ngôn Ngữ & Bản Địa Hóa (Localization Policy)

- Trò chơi hỗ trợ chuẩn mực **Tiếng Việt (`vi`)** và **Tiếng Anh (`en`)**.
- Toàn bộ giao diện người dùng, bảng kỹ năng, mô tả cẩm nang và hướng dẫn đều được dịch thuật chuẩn xác 100%.
- Tên Pokémon và danh pháp chiêu thức chính quy (Canon Moves) được giữ nguyên theo chuẩn quốc tế nhằm bảo đảm tính tương thích với dữ liệu PokeAPI và cộng đồng người chơi toàn cầu.
