# KIẾN TRÚC HỆ THỐNG & KỸ THUẬT POKÉSURVIVOR
*(PokéSurvivor System Architecture, Codebase Design & Technical Reference)*

---

## 1. CẤU TRÚC THƯ MỤC DỰ ÁN (PROJECT REPOSITORY STRUCTURE)

```
pokesurvivor/
├── assets/                  # Tài nguyên đồ họa, âm thanh, sprites
│   ├── audio/               # Nhạc nền (BGM) & Hiệu ứng âm thanh (SFX)
│   ├── icons/               # Biểu tượng UI, bóng quay Pokéball, glyphs
│   └── pokemon/             # Thư mục sprite sheet của hơn 1021 Pokémon (Idle, Walk, Attack)
├── css/                     # Toàn bộ stylesheet giao diện
│   └── style.css            # CSS cốt lõi, responsive mobile & desktop
├── dev.html                 # FILE NGUỒN GIAO DIỆN CHÍNH (Chỉnh sửa ở đây, không sửa index.html)
├── index.html               # File phân phối chính (Tự động sinh ra bởi tools/build.js)
├── js/                      # Toàn bộ mã nguồn JavaScript ứng dụng
│   ├── core/                # Các thành phần cốt lõi
│   │   ├── audio.js         # Quản lý phát nhạc nền BGM & hiệu ứng SFX
│   │   ├── camera.js        # Hệ thống Camera theo dõi nhân vật, deadzone, screen shake
│   │   ├── db.js            # Lưu trữ LocalStorage, dữ liệu Save, đồng bộ đám mây
│   │   ├── i18n.js          # Hệ thống đa ngôn ngữ (es, en, vi, fr, de, ja, zh...)
│   │   ├── input.js         # Bàn phím, chuột & Gamepad API handler
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
│   │   ├── missions.js      # Danh sách nhiệm vụ ngày (Daily) & tuần (Weekly)
│   │   ├── moves.js         # 116 chiêu thức, tiến hóa chiêu +/++/+++, kind badges
│   │   ├── pokedex.js       # 1021 Pokémon, HP, PA, SA, DF, SD, SPD, Gen, Rarity
│   │   └── upgrades.js      # Danh mục nâng cấp vĩnh viễn (Talents)
│   ├── entities/            # Các thực thể game
│   │   ├── enemy.js         # Lớp Enemy, logic di chuyển, AI, Multi-phase Boss
│   │   ├── pickup.js        # Hạt kinh nghiệm (EXP orbs), đồng xu (Coins), vật phẩm rơi
│   │   └── player.js        # Lớp Player, trạng thái, chỉ số, tiến hóa thực thể
│   ├── net/                 # Mạng & Chơi nhiều người (Multiplayer)
│   │   ├── coop.js          # Logic hợp tác trong trận, đồng bộ vị trí, đòn đánh
│   │   ├── net.js           # Kết nối WebRTC P2P direct qua Google STUN
│   │   ├── net-codec.js     # Bộ mã hóa/giải mã nhị phân nén băng thông (>30% savings)
│   │   └── social.js        # Danh sách phòng, lobby, bạn bè, chat
│   ├── systems/             # Các hệ thống logic gameplay
│   │   ├── combat.js        # Engine tính toán sát thương, va chạm hitboxes, loại đòn đánh
│   │   ├── gacha.js         # Logic quay số, bảo hiểm, trừ vé/vàng
│   │   ├── judgment.js      # Sự kiện Phán Quyết của Arceus ở phút 30
│   │   ├── levelup.js       # Xử lý lên cấp, lựa chọn chiêu, điều kiện tiến hóa +/++/+++
│   │   ├── mons.js          # Tính toán chỉ số thực tế sau khi cộng Buff/Natures
│   │   ├── progress.js      # Đón nhận sự kiện Progress.event, tính tiến trình nhiệm vụ
│   │   ├── rift.js          # Quản lý 18 Đấu trường Vết Nứt (Rifts) và Boss Huyền thoại
│   │   ├── spawner.js       # Bộ sinh quái vật theo thời gian và làn sóng
│   │   └── weather.js       # Hệ thống thời tiết ngẫu nhiên (Mưa, Nắng gắt, Bão tuyết...)
│   ├── ui/                  # Giao diện người dùng
│   │   ├── gacha-ui.js      # Màn hình quay thưởng gacha, mở thẻ, hiệu ứng ngôi sao
│   │   ├── hud.js           # Giao diện trong trận: Thanh máu, thanh exp, 6 slot chiêu thức
│   │   ├── icons.js         # Hệ thống vẽ biểu tượng vector / canvas, badges, Pokéball
│   │   ├── lobby-ui.js      # Phòng chờ hợp tác co-op
│   │   ├── menu.js          # Menu chính, Pokédex Grid, xem trước cây tiến hóa & biến thể
│   │   └── shop-ui.js       # Cửa hàng Kecleon Shop & Upgrades
│   └── game.js              # Vòng lặp chính Game Loop, Quản lý State (Menu/Run/Pause/Over)
├── tools/                   # Các script công cụ phục vụ tự động hóa và Build
│   ├── build.js             # Biên dịch gộp mã nguồn, nén app.min.js & sinh version.json
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
   - `pause`: Tạm dừng ván đấu (mở bảng trang bị, điều chỉnh âm lượng).
   - `gameover`: Kết thúc ván đấu (gục ngã hoặc hoàn thành Sentencia), tổng kết EXP, vàng và chiến tích.
3. **Vòng Lặp Ván Đấu (`G.Game.step`)**:
   - Tần số cập nhật logic cố định (Fixed Update): 60 lần/giây (`dt = 1/60`).
   - Xử lý đầu vào: Đọc tọa độ từ bàn phím, joystick hoặc gamepad $\rightarrow$ Cập nhật vector vận tốc của `Player`.
   - Cập nhật kẻ địch: `EnemyMgr.update(dt)` duyệt qua toàn bộ danh sách quái vật, tính toán steering behavior đuổi theo người chơi, phát hiện và cập nhật trạng thái Boss Đa Phase.
   - Động cơ đòn đánh & va chạm: `Combat.update(dt)` thực hiện phát đòn từ 6 slot chiêu thức, kiểm tra va chạm hitboxes dạng hình tròn / tia / quét góc, áp dụng bảng tương khắc nguyên tố `G.U.typeMod()`.
   - Cập nhật nhặt đồ: `Pickups.update(dt)` hút các hạt EXP và vàng về phía người chơi dựa trên bán kính nhặt đồ (Pickup Radius).
   - Kiểm tra Vết Nứt & Phán Quyết: `Rift.update(dt)` và `Judgment.update(dt)`.
   - Render: Vẽ nền bản đồ (World), vẽ kẻ địch, vẽ hạt hiệu ứng (FX), vẽ người chơi và cuối cùng là phủ giao diện HUD lên trên cùng.

---

## 3. CÁC HỆ THỐNG DỮ LIỆU CỐT LÕI (STATIC DATA ARCHITECTURE)

### 3.1. Dữ liệu Pokémon (`js/data/pokedex.js`)
Mỗi Pokémon được lưu trữ dưới dạng một bản ghi tinh gọn:
```javascript
{
  "dex": 6,
  "name": "Charizard",
  "types": ["fire", "flying"],
  "hp": 115, "spd": 110,
  "atk": 1.25, "pa": 1.05, "sa": 1.35,
  "df": 78, "sd": 85,
  "rarity": 4, "bst": 534,
  "starter": false, "gen": 1
}
```
- `atk`: Hệ số tấn công tổng quát.
- `pa` & `sa`: Trọng số tấn công Vật lý và Đặc biệt.
- `rarity`: 1 đến 5 (tương ứng Común đến Legendaria).

### 3.2. Cây Tiến Hóa (`js/data/evolutions.js`)
Hệ thống sử dụng bảng tra cứu 2 chiều:
- `G.EVO_CHAINS[baseDex]`: Lưu cấu trúc chuỗi hoàn chỉnh (`type`: `'single'`, `'2stage'`, `'3stage'`, `'branch'`).
- `G.EVO_BY_DEX[dex]`: Ánh xạ tức thì bất kỳ Pokémon nào về `baseDex`, cấp độ `stage` (1, 2, 3), và các nhánh tiếp theo (`next`, `prev`).

### 3.3. Dạng Tối Thượng (`js/data/megas.js`)
78 dạng Mega/Primal/Battle forms được lập chỉ mục qua `G.MEGAS` và `G.MEGAS_BY_BASE`:
- Cho phép một Pokémon cơ sở có thể có nhiều nhánh Mega (ví dụ Charizard có cả Mega X và Mega Y; Mewtwo có cả Mega X và Mega Y).
- Lưu trữ chỉ số đột phá, hệ nguyên tố mới và kỹ năng đặc tính (Ability).

---

## 4. HỆ THỐNG CHIẾN ĐẤU & ĐÒN ĐÁNH (COMBAT ENGINE)

### 4.1. Công thức Tính Sát Thương
```
Sát thương Thực tế = Sát thương Chiêu thức × Hệ số Tấn công (PA hoặc SA) × Tương khắc Hệ (Type Mod) × (1 + Thưởng Đơn hệ) × Buff Kỹ năng
```
- **Type Mod (`G.U.typeMod(moveType, targetTypes)`)**:
  + Siêu hiệu quả (Super Effective): `x1.40` (được cân bằng mềm hơn so với game gốc x2.0 để tránh one-shot).
  + Không hiệu quả (Not Very Effective): `x0.75`.
  + Miễn nhiễm (Immune): `x0.50` (thay vì x0 để mọi chiêu thức đều có giá trị đóng góp).
- **Thưởng Đơn hệ (Monotype Bonus)**: Nếu Pokémon chỉ có 1 hệ và dùng chiêu cùng hệ $\rightarrow$ Thưởng thêm `+20%` sát thương.

### 4.2. Quản lý Đòn đánh & Bậc Tiến hóa (+ / ++ / +++)
- `js/data/moves.js` khai báo cấu trúc mỗi chiêu:
  + `pool`: Danh sách các Pokémon có thể học chiêu đó theo lore chuẩn Pokédex.
  + `kind`: `'beam'`, `'melee'`, `'buff'`, `'projectile'`, `'circle'`, `'stun'`.
  + `itemReq`: Vật phẩm trang bị cần thiết để tiến hóa lên bậc +.
  + `questReq`: Nhiệm vụ trong trận để đột phá lên bậc ++ (ví dụ gây 50.000 sát thương bằng chiêu đó).
- Khi thăng cấp, `js/systems/levelup.js` quét toàn bộ kho đồ của người chơi, lọc ra các lựa chọn hợp lệ:
  + Nâng cấp cấp độ thông thường (Lv 1 $\rightarrow$ 8).
  + Tiến hóa lên bậc + nếu có Held Item tương thích.
  + Mở khóa bậc ++ nếu nhiệm vụ đã hoàn thành.
  + Mở khóa bậc +++ nếu bản thân đã là ++ và có ít nhất 3 chiêu thức khác đã đạt bậc +.

---

## 5. HỆ THỐNG KẺ ĐỊCH & BOSS ĐA PHASE (BOSS ENGINE)

1. **Scale Máu Boss (`js/data/enemies.js` & `js/systems/rift.js`)**:
   - Thang máu cơ bản của Boss được tính theo thời gian ván đấu:
     `HP = Base_HP × (1 + minute × 1.25) × Boss_Scale_Multiplier`.
   - Tránh hiện tượng người chơi ở cấp độ cao bắn hạ Boss trong nháy mắt.
2. **Chuyển Phase Đa Tầng (`js/entities/enemy.js: advanceBossPhase`)**:
   - Khi máu của Boss chạm ngưỡng 0:
     + Nếu `currentPhase < maxPhase`:
       * Kích hoạt `advanceBossPhase()`.
       * Xóa sạch trạng thái khống chế (Stun/Freeze).
       * Hồi phục 100% thanh máu.
       * Tăng `atkMult += 0.35` và `spdMult += 0.15`.
       * Nếu bước vào Phase 3: Biến đổi hình thể sang dạng Mega/Primal tương ứng (thay đổi sprite, kích thước và âm thanh gầm thét).
     + Nếu `currentPhase === maxPhase`:
       * Boss chính thức bị tiêu diệt.
       * Rơi rương báu, kích hoạt sự kiện `Progress.event('kill', { boss: true, bossPhase: 3 })`.

---

## 6. LƯU TRỮ DỮ LIỆU & BẢO TOÀN TRẠNG THÁI (STORAGE ARCHITECTURE)

- Quản lý tập trung tại `js/core/db.js`.
- Cấu trúc đối tượng lưu trữ `G.DB.save`:
  + `owned`: Danh sách các Pokémon đã sở hữu và số lượng bản sao.
  + `partner`: Dex của Pokémon đang được chọn làm bạn đồng hành chính.
  + `partnerShiny`: Trạng thái hiển thị Shiny của bạn đồng hành.
  + `upgrades`: Cấp độ nâng cấp vĩnh viễn (Talents) của từng Pokémon.
  + `missions`: Trạng thái nhiệm vụ ngày và tuần, tiến trình, đã nhận thưởng hay chưa.
  + `ach`: Các thành tựu đã mở khóa.
  + `stats`: Thống kê tài khoản trọn đời (tổng số quái diệt, số boss hạ, thời gian trụ lâu nhất...).
- **Cơ chế Chống Xung Đột & Mất Dữ liệu**:
  + Lưu trữ cục bộ thông qua `localStorage` với khóa dự phòng.
  + Tự động kiểm tra phiên bản lưu (Schema Migration) khi nâng cấp game mà không làm hỏng dữ liệu người chơi cũ.

---

## 7. GIAO THỨC MẠNG & CHƠI HỢP TÁC (MULTIPLAYER NETWORKING)

- **Giao thức**: WebRTC DataChannels truyền dữ liệu trực tiếp P2P giữa các trình duyệt.
- **Không Cần Máy Chủ Trung Gian Đắt Đỏ**: Chỉ sử dụng STUN server miễn phí của Google (`stun:stun.l.google.com:19302`) để trao đổi địa chỉ IP/Port ban đầu.
- **Bộ Nén Nhị Phân (`js/net/net-codec.js`)**:
  + Thay vì truyền JSON nguyên bản tốn băng thông, hệ thống mã hóa các gói tin tọa độ, đòn đánh thành chuỗi nhị phân tối giản, giúp giảm hơn 30% dung lượng gói tin và giữ kết nối luôn mượt mà ở tốc độ 60fps.

---

## 8. QUY TRÌNH PHÁT TRIỂN & BUILD (RELEASE PIPELINE)

Tuân thủ nghiêm ngặt theo chỉ thị `AGENTS.md`:
1. **Quy tắc Vàng**: Tuyệt đối **không chỉnh sửa trực tiếp `index.html`** (file này được tự động sinh). Mọi chỉnh sửa giao diện và cấu trúc thẻ script phải thực hiện trên **`dev.html`**.
2. **Lệnh Biên Dịch & Triển Khai**:
   ```powershell
   node tools/build.js && node tools/export_data.js && python tools/make_seo_pages.py
   ```
   - `tools/build.js`: Gộp các file JavaScript, tối ưu hóa thành `js/app.min.js`, sinh `index.html` mới và tạo vân tay phiên bản trong `version.json`.
   - `tools/export_data.js`: Trích xuất dữ liệu Pokémon và Moves phục vụ cho công cụ tạo trang SEO.
   - `python tools/make_seo_pages.py`: Tạo các trang tĩnh hỗ trợ tìm kiếm Google bằng nhiều thứ tiếng.
3. **Cơ chế Cập nhật Tự động (`js/core/updater.js`)**:
   - Trình duyệt người chơi sẽ thăm dò `version.json` mỗi 5 phút một lần.
   - Khi có phiên bản mới phát hành:
     + Nếu người chơi đang ở ngoài trận (Menu, Gacha, Upgrades): Thông báo 5 giây và tự động tải lại phiên bản mới nhất.
     + Nếu người chơi đang trong trận chiến: Không làm gián đoạn; chờ ván đấu kết thúc mới thực hiện cập nhật.
