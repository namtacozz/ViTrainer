# KIẾN TRÚC HỆ THỐNG & KỸ THUẬT POKÉSURVIVOR
*(PokéSurvivor System Architecture, Codebase Design & Technical Reference)*

---

## 1. CẤU TRÚC THƯ MỤC DỰ ÁN (PROJECT REPOSITORY STRUCTURE)

```
pokesurvivor/
├── assets/                  # Tài nguyên đồ họa, âm thanh, sprites
│   ├── audio/               # Nhạc nền (BGM) & Hiệu ứng âm thanh (SFX)
│   ├── icons/               # Biểu tượng UI, bóng quay Pokéball, glyphs
│   └── pokemon/             # Thư mục sprite sheet của hơn 1.021 Pokémon (Idle, Walk, Attack)
├── css/                     # Toàn bộ stylesheet giao diện
│   └── style.css            # CSS cốt lõi, responsive mobile & desktop, khóa cứng overflow Pokédex
├── dev.html                 # FILE NGUỒN GIAO DIỆN CHÍNH (Chỉnh sửa ở đây, không sửa index.html)
├── index.html               # File phân phối chính (Tự động sinh ra bởi tools/build.js)
├── js/                      # Toàn bộ mã nguồn JavaScript ứng dụng
│   ├── core/                # Các thành phần cốt lõi
│   │   ├── audio.js         # Quản lý phát nhạc nền BGM & hiệu ứng SFX
│   │   ├── camera.js        # Hệ thống Camera theo dõi nhân vật, deadzone, screen shake
│   │   ├── db.js            # Lưu trữ LocalStorage, dữ liệu Save, đồng bộ đám mây
│   │   ├── i18n.js          # Hệ thống đa ngôn ngữ (es, en, vi, fr, de, ja, zh...)
│   │   ├── input.js         # Bàn phím, chuột (hỗ trợ di chuột theo con trỏ) & Gamepad API
│   │   ├── sprites.js       # Tải và render sprite sheet canvas hiệu năng cao
│   │   ├── touch.js         # Bộ xử lý điều khiển cảm ứng Virtual Joystick
│   │   └── updater.js       # Bộ tự động kiểm tra phiên bản mới version.json
│   ├── data/                # Dữ liệu tĩnh và định nghĩa trò chơi
│   │   ├── achievements.js  # Danh sách thành tựu, danh hiệu & điều kiện mở khóa
│   │   ├── changelog.js     # Nhật ký thay đổi phiên bản (es & en)
│   │   ├── enemies.js       # Chỉ số quái vật, tính cách AI, Boss slots & thang máu scale
│   │   ├── evolutions.js    # Cây tiến hóa (EVO_CHAINS), bảng ánh xạ baseDex & stages
│   │   ├── gacha.js         # Tỷ lệ gacha, danh sách banner theo gen, hệ thống pity
│   │   ├── items.js         # Vật phẩm trang bị (Held Items), TMs, Berries, Orbs
│   │   ├── megas.js         # 78 dạng Mega/Primal/Battle forms, buff stats & abilities
│   │   ├── missions.js      # Danh sách nhiệm vụ ngày (8 Daily) & tuần (4 Weekly)
│   │   ├── moves.js         # 126 chiêu thức chuẩn canon English, kind badges
│   │   ├── pokedex.js       # 1.021 Pokémon, HP, PA, SA, DF, SD, SPD, Gen, Rarity
│   │   └── upgrades.js      # Danh mục nâng cấp vĩnh viễn (Talents)
│   ├── entities/            # Các thực thể game
│   │   ├── enemy.js         # Lớp Enemy, EnemyMgr (all, add, remove), Multi-phase Boss
│   │   ├── pickup.js        # Hạt kinh nghiệm (EXP orbs), đồng xu (Coins), vật phẩm rơi
│   │   └── player.js        # Lớp Player, trạng thái, chỉ số, checkInRunEvo, evolveTo
│   ├── net/                 # Mạng & Chơi nhiều người (Multiplayer Co-op lên tới 8 người)
│   │   ├── coop.js          # Logic hợp tác 8 người, myState kèm dex & isMega, broadcastBossPhase
│   │   ├── net.js           # Kết nối WebRTC P2P direct qua Google STUN
│   │   ├── net-codec.js     # Bộ mã hóa/giải mã nhị phân nén băng thông (>30% savings)
│   │   └── social.js        # Danh sách phòng, lobby, bạn bè, quản lý kết nối lại (Rejoin)
│   ├── systems/             # Các hệ thống logic gameplay
│   │   ├── combat.js        # Engine tính toán sát thương, va chạm hitboxes, co-op combos
│   │   ├── gacha.js         # Logic quay số, bảo hiểm, trừ vé/vàng
│   │   ├── inrun-events.js  # 3 Sự kiện tuần tự (Zone Capture, Scavenger, Pursuit) & la bàn HUD
│   │   ├── judgment.js      # Sự kiện Phán Quyết của Arceus ở phút 30
│   │   ├── levelup.js       # Xử lý lên cấp, lựa chọn chiêu, cảnh báo tương thích fitNote
│   │   ├── mons.js          # Tính toán chỉ số thực tế sau khi cộng Buff/Natures
│   │   ├── progress.js      # Đón nhận sự kiện Progress.event, tính tiến trình nhiệm vụ
│   │   ├── rift.js          # Quản lý 18 Đấu trường Vết Nứt (Rifts) và Boss Huyền thoại
│   │   ├── spawner.js       # Spawn Director: nhịp thở 60s, hành lang thoát hiểm >= 60°
│   │   └── weather.js       # Hệ thống thời tiết ngẫu nhiên (Mưa, Nắng gắt, Bão tuyết...)
│   ├── ui/                  # Giao diện người dùng
│   │   ├── gacha-ui.js      # Màn hình quay thưởng gacha, mở thẻ, hiệu ứng ngôi sao
│   │   ├── hud.js           # Giao diện HUD: Timeline vô hạn, phân tầng Y chuẩn, la bàn
│   │   ├── icons.js         # Hệ thống vẽ biểu tượng vector / canvas, badges, Pokéball
│   │   ├── lobby-ui.js      # Phòng chờ hợp tác co-op 8 người
│   │   ├── menu.js          # Menu chính, Pokédex Grid, xem trước cây tiến hóa & biến thể
│   │   └── shop-ui.js       # Cửa hàng Kecleon Shop & Upgrades
│   └── game.js              # Vòng lặp chính Game Loop, Quản lý State, offerEvo, syncTeam
├── tools/                   # Các script công cụ phục vụ tự động hóa và Build
│   ├── build.js             # Biên dịch gộp mã nguồn, nén app.min.js & sinh version.json
│   ├── build_langs.js       # Đóng gói từ điển đa ngôn ngữ sang js/lang/<lang>.js
│   ├── export_data.js       # Xuất dữ liệu Pokédex và chỉ số ra JSON phục vụ SEO
│   └── make_seo_pages.py    # Sinh trang tĩnh Pokédex, Moves, Types đa ngôn ngữ
├── tests/                   # Bộ kiểm thử tự động (Unit & Integration tests)
└── version.json             # Dấu vân tay kiểm soát phiên bản tự động cập nhật
```

---

## 2. VÒNG ĐỜI VÀ VÒNG LẶP CHÍNH (GAME LIFECYCLE & MAIN LOOP)

Trò chơi vận hành dựa trên kiến trúc **Fixed Timestep Update & Decoupled Render**:
1. **Khởi Động (Boot Sequence)**:
   - File `dev.html` nạp các thư viện CSS và script.
   - `G.DB.ready()`: Khởi tạo và đọc dữ liệu đã lưu từ LocalStorage, đối chiếu tính toàn vẹn.
   - `G.I18n.startDom()`: Dịch toàn bộ cây giao diện DOM sang ngôn ngữ đã lưu của người chơi.
   - `G.Audio.init()`: Đăng ký hệ thống âm thanh Web Audio API, mở khóa âm thanh ngay khi người chơi tương tác đầu tiên (Tap to Start).
   - `G.Game.init()`: Khởi tạo Canvas chính, gắn listeners sự kiện đầu vào.
2. **Trạng Thái Trò Chơi (Game States)**:
   - `ui`: Màn hình Menu chính, Pokédex, Gacha, Upgrades, Cài đặt.
   - `run`: Trong ván đấu sinh tồn thực tế.
   - `choice`: Trạng thái tạm dừng chiến trường cục bộ hoặc tập thể để chọn Thẻ lên cấp, chọn Dạng Tiến hóa, hoặc chọn Nhặt Trang bị.
   - `pause`: Tạm dừng ván đấu (mở bảng trang bị, điều chỉnh âm lượng).
   - `gameover`: Kết thúc ván đấu (gục ngã hoặc hoàn thành Sentencia), tổng kết EXP, vàng và chiến tích.
3. **Vòng Lặp Ván Đấu (`G.Game.step`)**:
   - Tần số cập nhật logic cố định (Fixed Update): 60 lần/giây (`dt = 1/60`).
   - Xử lý đầu vào: Đọc tọa độ từ bàn phím, di chuột theo con trỏ chuột, joystick hoặc gamepad $\rightarrow$ Cập nhật vector vận tốc của `Player`.
   - Cập nhật kẻ địch: `EnemyMgr.update(dt)` duyệt qua toàn bộ danh sách quái vật, tính toán steering behavior đuổi theo người chơi, phát hiện và cập nhật trạng thái Boss Đa Phase.
   - Cập nhật sự kiện tuần tự: `InRunEvents.update(dt)` quản lý tiến độ vòng tròn chiếm cờ, đếm hạt pha lê và định vị quái truy sát.
   - Động cơ đòn đánh & va chạm: `Combat.update(dt)` thực hiện phát đòn từ 6 slot chiêu thức, kiểm tra va chạm hitboxes dạng hình tròn / tia / quét góc, áp dụng bảng tương khắc nguyên tố `G.U.typeMod()`.
   - Cập nhật nhặt đồ: `Pickups.update(dt)` hút các hạt EXP và vàng về phía người chơi dựa trên bán kính nhặt đồ (Pickup Radius).
   - Kiểm tra Vết Nứt & Phán Quyết: `Rift.update(dt)` và `Judgment.update(dt)`.
   - Render: Vẽ nền bản đồ (World), vẽ kẻ địch, vẽ hạt hiệu ứng (FX), vẽ các vùng sự kiện `InRunEvents.drawWorld()`, vẽ người chơi và cuối cùng là phủ giao diện HUD lên trên cùng.

---

## 3. CƠ CHẾ TIẾN HÓA GIỮA TRẬN & ĐỒNG BỘ MẠNG (IN-RUN EVOLUTION & SYNC)

### 3.1. Kích Hoạt Mốc Cấp Độ (Level Milestones)
* **Quy tắc mốc tiến hóa**:
  - Loài 3 bậc (ví dụ Froakie $\rightarrow$ Frogadier $\rightarrow$ Greninja): Cấp 15 đạt Bậc 2; Cấp 30 đạt Bậc 3.
  - Loài 2 bậc: Cấp 15 đạt Bậc 2; Cấp 30 kích hoạt Apex (+) hoặc Mega.
  - Loài đơn bậc / Huyền thoại: Cấp 15 kích hoạt Thức Tỉnh I (Despertar I); Cấp 30 kích hoạt Thức Tỉnh II / Apex (+) hoặc Mega/Primal.
  - Dạng Mega / Primal / Battle Forms: Kích hoạt tại cấp 30 cho toàn bộ các loài tương thích.
* **Độc lập hoàn toàn với Gacha Meta Tier**: Tiến hóa giữa trận là cơ chế gameplay cốt lõi của roguelite run; không phụ thuộc vào cấp độ sở hữu trong gacha (`tierUnlocked`). Thanh tiến độ hiển thị `✦ ` thay vì ổ khóa `🔒`.

### 3.2. Cơ Chế Gọi & Hàng Đợi Modal (`pendingEvoModal`)
* Khi nhân vật đạt đủ cấp độ, hàm `promptEvo(options)` gửi các lựa chọn qua `G.Game.offerEvo()`.
* Nếu người chơi đang trong trạng thái gục ngã (`pl.dead`), hoặc đang mở các modal khác (`scr-levelup`, `scr-item`, `scr-bond`, `scr-pause`), modal tiến hóa sẽ được lưu vào hàng đợi an toàn:
  ```javascript
  pl.pendingEvoModal = { options, onPick };
  ```
* Ngay khi đóng modal hiện tại hoặc được đồng đội hồi sinh, `js/game.js` tự động kích hoạt lại modal tiến hóa đang chờ.

### 3.3. Đồng Bộ Khách Co-op (Co-op Client Hook)
* Trong phòng co-op, host nhận EXP và đồng bộ sang máy client qua `syncTeam(t)`.
* Để đảm bảo máy client không bị kẹt ở dạng ban đầu:
  ```javascript
  function syncTeam(t) {
    if (!t || !pl) return;
    const oldLevel = pl.level;
    pl.level = t.level;
    pl.xp = t.xp;
    pl.xpNext = t.xpNext;
    if (t.level > oldLevel && pl.checkInRunEvo) pl.checkInRunEvo();
  }
  ```

### 3.4. Đồng Bộ Ngoại Hình Đồng Đội (Puppet Form Sync)
* Trạng thái định kỳ `myState()` trong `js/net/coop.js` liên tục gửi kèm `dex` và `isMega`:
  ```javascript
  myState() {
    return { ..., dex: pl.dex, isMega: pl.isMega ? 1 : 0 };
  }
  ```
* Khi nhận packet của đồng đội, nếu `puppet.dex !== st.dex` hoặc trạng thái Mega thay đổi, hàm `applyMateEvo(puppet, st.dex, st.isMega)` lập tức cập nhật lại sprite sheet, animation và bán kính va chạm của puppet.

---

## 4. HỆ THỐNG KẺ ĐỊCH, BOSS ĐA PHASE & SPAWNER DIRECTOR

### 4.1. Quản Lý Kẻ Địch An Toàn (`EnemyMgr`)
* Để ngăn chặn hoàn toàn lỗi sập game (`TypeError: EnemyMgr.remove is not a function`), `EnemyMgr` tại `js/entities/enemy.js` cung cấp API chuẩn:
  - `EnemyMgr.all()`: Trả về bản sao mảng danh sách quái vật hiện hữu.
  - `EnemyMgr.enemies`: Getter truy cập trực tiếp mảng quái.
  - `EnemyMgr.add(enemy)`: Thêm quái vật mới vào danh sách.
  - `EnemyMgr.remove(enemy, died = false)`: Loại bỏ quái vật an toàn khỏi danh sách quản lý.

### 4.2. Vòng Đời Bất Tử & Tenacity của Boss
* **Trừ dần thời gian bất tử**: Trong `Enemy.update(dt)`, luôn có:
  ```javascript
  if (this.invuln > 0) this.invuln -= dt;
  ```
* **Chuyển Phase Đa Tầng (`advanceBossPhase`)**:
  - Hồi sinh 100% HP, tăng công (`+35%`), tăng tốc (`+15%`), Phase 3 thức tỉnh Mega/Primal.
  - Thời gian bất tử khi chuyển phase được giới hạn ở **0.8 giây** để tránh trạng thái bất tử kéo dài gây ức chế.
  - Thời gian kháng hiệu ứng khống chế (CC Immune Tenacity) tối đa **2.0 giây**.
  - Host lập tức phát sóng `broadcastBossPhase(bossId, phase, maxHp, dex, name)` qua mạng để toàn bộ máy khách đồng bộ thanh máu và danh xưng `[FASE X]`.

### 4.3. Spawner Director Thông Minh
* `js/systems/spawner.js` quản lý sinh quái theo ngân sách tín dụng (Credits per second).
* Chu kỳ nhịp thở 60 giây: 30 giây tăng dần $\rightarrow$ 15 giây cao trào đỉnh điểm $\rightarrow$ 15 giây nghỉ ngơi thở dốc.
* Luôn đảm bảo góc hành lang thoát hiểm $\ge 60^\circ$ không bị quái bủa vây kín, có gói quái truy sát chống người chơi chạy vòng tròn kite vô tận.

---

## 5. HỆ THỐNG SỰ KIỆN TUẦN TỰ TRONG TRẬN (`js/systems/inrun-events.js`)

Quản lý 3 sự kiện luân phiên ngẫu nhiên trong trận đấu:
1. **Chiếm Cờ (Zone Capture)**:
   - Vòng tròn chiến thuật xuất hiện tại vùng đất trống.
   - Vạch quét bán kính chạy theo chiều kim đồng hồ 360°. Càng nhiều người chơi đứng trong vòng, tiến độ quét càng nhanh.
   - Quái vật spawn dồn dập xung quanh và có xu hướng lao vào người chiếm cờ.
2. **Thu Thập Đá Pha Lê (Scavenger Hunt)**:
   - Các viên pha lê giá trị cao rơi rải rác xung quanh người chơi.
   - Mũi tên la bàn ở mép màn hình HUD hiển thị khoảng cách theo mét hướng thẳng tới từng viên pha lê, kèm cột sáng thẳng đứng lên trời dễ nhận diện từ xa.
3. **Chạy Trốn Tử Thần (Boss Pursuit)**:
   - Boss Pokémon Alpha bất tử cực mạnh spawn ở cự ly an toàn.
   - Người chơi phải né tránh các đòn đánh telegraphed hazards đỏ rực trong thời gian quy định cho đến khi boss rút lui.
4. **Quy Tắc Cách Ly Sự Kiện**:
   - Khi đang giao chiến trong Đấu trường Vết Nứt (`G.Rift.inArena`) hoặc Trận chiến Phán Quyết (`G.Judgment.active`), toàn bộ sự kiện tuần tự bị tạm hoãn, ngăn chặn việc spawn đè lên nhau gây hỗn loạn.

---

## 6. GIAO DIỆN HUD & BỘ SƯU TẬP POKÉDEX

### 6.1. Phân Tầng Tọa Độ Y Trên Đỉnh Màn Hình (HUD Top Hierarchy)
Để ngăn chặn hoàn toàn tình trạng đè chữ giữa đồng hồ, thanh khu vực, thanh timeline vô hạn và thanh máu boss:
- **Y = 26**: Đồng hồ thời gian trận đấu (`font: 20px Pixelify`).
- **Y = 40**: Tên khu vực, quái đã diệt, tiền xu (`font: 11px`).
- **Y = 48**: Thanh tiến trình Timeline vô hạn (`barH = 14`, vẽ biểu tượng vector cho Boss, Rift, Event).
- **Y = 68**: Thanh máu Boss đa phase (`bW = 300, bH = 14`).
- **Y = 71** (khi không có boss) / **Y = 88** (khi có boss): Dòng trạng thái nhiệm vụ sự kiện.

### 6.2. Bộ Sưu Tập Pokédex Chống Lỗi Cuộn
* Container modal `#scr-dex .box` được cố định `overflow: hidden !important;` trong `css/style.css`.
* Cơ chế cuộn được tách rời hoàn toàn: Danh sách lưới bên trái (`#dex-grid`) có thanh cuộn riêng, bảng chi tiết bên phải (`#dex-detail`) có thanh cuộn riêng.
* Khi mở `openDex()` hoặc chọn Pokémon mới trong `showDetail()`, `box.scrollTop` được reset về 0, loại bỏ hoàn toàn lỗi khoảng trắng xanh rỗng.

---

## 7. MẠNG CO-OP 8 NGƯỜI & BỘ NÉN NHỊ PHÂN

* **Hỗ trợ tối đa 8 người chơi** (`MAX_PLAYERS = 8`).
* **Quản lý Tầm nhìn Thích ứng (Adaptive Interest Management)**:
  - Khi phòng có nhiều người chơi, bán kính truyền gói tin quái giới hạn ở 720px, số lượng quái đồng bộ tối đa 50 con/packet, triệt tiêu nghẽn băng thông WebRTC của host.
* **Hồi sinh siêu tốc**: Thời gian hồi sinh đồng đội gục ngã giảm dần theo số lượng người chơi (xuống còn 1.0 giây khi đủ 8 người). Nhiều đồng đội cùng đứng cạnh sẽ tăng tốc độ cứu.
* **Co-op Combos**: Khi 2 người chơi cùng đánh trúng một mục tiêu trong vòng 1.2 giây, kích hoạt vụ nổ sát thương hợp tác `+35%` sát thương kèm hiệu ứng ánh sáng rực rỡ.

---

## 8. QUY TRÌNH BUILD & DEPLOY BẮT BUỘC (BUILD PIPELINE)

Tuân thủ nghiêm ngặt theo `AGENTS.md`:
1. Chỉnh sửa trên `dev.html`, **tuyệt đối không sửa `index.html`**.
2. Quy chuẩn tên chiêu thức: **Luôn giữ nguyên tiếng Anh chuẩn** (không dịch).
3. Biên dịch đầy đủ bằng chuỗi lệnh:
   ```powershell
   node tools/build_langs.js
   node tools/build.js && node tools/export_data.js && python tools/make_seo_pages.py
   ```
4. Chạy kiểm thử:
   ```powershell
   node --test tests/i18n.test.cjs
   ```
5. Cập nhật `js/data/changelog.js` (cả `es` và `en`).
6. Commit sạch (không Co-Authored-By hay chữ ký AI) và push lên `origin main`.
