# BẢNG TRA CỨU NHANH HỆ THỐNG & SỬA LỖI (QUICK REFERENCE & CHEAT SHEET)
*(Dành cho Nhà phát triển và AI Agent: Đọc file này TRƯỚC TIÊN để nắm ngay vị trí code và cách xử lý, không cần dò tìm từng file)*

---

## 1. BẢN ĐỒ TẬP TRUNG: TÍNH NĂNG Ở FILE NÀO? (SYSTEM TO FILE MAP)

| Tính Năng / Cơ Chế | File Chịu Trách Nhiệm | Hàm / Đối Tượng Trọng Tâm |
| :--- | :--- | :--- |
| **Vòng lặp chính & Trạng thái game** | `js/game.js` | `step()`, `state`, `offerEvo()`, `offerItem()`, `syncTeam()`, `afterLevelUp()` |
| **Tiến hóa giữa trận (In-Run Evo)** | `js/entities/player.js` | `checkInRunEvo()`, `evolveTo()`, `megaEvolve()`, `activateApex()`, `activateAwakening()` |
| **Đồng bộ Co-op (Tối đa 8 người)** | `js/net/coop.js` | `myState()`, `syncTeam()`, `broadcastEvo()`, `broadcastMega()`, `broadcastBossPhase()` |
| **Sự kiện ngẫu nhiên trong trận** | `js/systems/inrun-events.js` | `G.InRunEvents`: `startZoneCapture()`, `startScavenger()`, `startPursuit()`, `update()`, `drawHUD()` |
| **Quản lý quái & Boss đa phase** | `js/entities/enemy.js` | `EnemyMgr.all()`, `EnemyMgr.add()`, `EnemyMgr.remove()`, `advanceBossPhase()`, `Enemy.update()` |
| **Sinh quái theo nhịp (Director)** | `js/systems/spawner.js` | `G.Spawner.update()`, tín dụng theo giây, nhịp thở 60s, hành lang thoát hiểm $\ge 60^\circ$ |
| **Thanh tiến trình & HUD trên cùng** | `js/ui/hud.js` | `drawTopCenter()`, `drawTimelineBar()`, `drawBossBar()`, `drawEventStatus()` |
| **Chọn thẻ lên cấp & Tương thích** | `js/systems/levelup.js` | `candidates()`, `fitNote()` (cảnh báo giảm hiệu suất sát thương) |
| **Bộ sưu tập Pokédex & Xem trước** | `js/ui/menu.js` | `openDex()`, `showDetail()`, `renderGrid()`, `renderEvoLine()` |
| **Nhiệm vụ ngày / tuần & Thành tựu** | `js/systems/progress.js` | `G.Progress.event()`, 8 nhiệm vụ ngày, 4 nhiệm vụ tuần, mở khóa |
| **Từ điển & Đa ngôn ngữ (i18n)** | `js/data/lang-*.js`, `js/core/i18n.js` | `G.T()`, `G.I18n.add()`, quy tắc tên chiêu thức giữ nguyên tiếng Anh |
| **Giao thức mạng nén WebRTC** | `js/net/net-codec.js`, `js/net/net.js` | Nén nhị phân `0x50 0x53 0x01`, Direct Google STUN |
| **Quy trình Build & Đóng gói** | `tools/build.js`, `dev.html` | Sinh `index.html`, `js/app.min.js`, `version.json` |

---

## 2. DANH MỤC LỖI THƯỜNG GẶP & GIẢI PHÁP SỬA NHANH (COMMON BUGS & INSTANT FIXES)

### 🚨 Lỗi 1: Văng game / Ngắt kết nối giữa trận (Game Crash / Loop Halt)
* **Triệu chứng**: Trò chơi đột ngột dừng chuyển động giữa chừng, mất FPS về 0 hoặc ngắt kết nối.
* **Nguyên nhân cốt lõi**:
  - Truy cập thuộc tính hoặc phương thức không tồn tại trên `EnemyMgr` trong các file sự kiện/quái. Ví dụ: gọi `G.EnemyMgr.remove()` khi `EnemyMgr` chưa export method `remove`, hoặc cố push vào `G.EnemyMgr.enemies.push()` (enemies là biến nội bộ trong closure).
* **Quy tắc vàng**:
  - Luôn dùng `G.EnemyMgr.add(enemy)` để thêm quái/boss.
  - Luôn dùng `G.EnemyMgr.remove(enemy, died)` để xóa quái.
  - Lấy danh sách quái thông qua `G.EnemyMgr.all()` (trả về bản sao mảng an toàn) hoặc `G.EnemyMgr.enemies`.

---

### 🚨 Lỗi 2: Kẹt tiến hóa ở Client trong phòng Co-op (Co-op Evolution Lock)
* **Triệu chứng**: Chơi nhiều người, đạt cấp 15 hoặc 30 (thậm chí cấp 33) nhưng không hiện bảng chọn tiến hóa, dưới thanh máu hiện `(33/15)` không lên dạng.
* **Nguyên nhân cốt lõi**:
  - Trong co-op, host nhận EXP và đồng bộ sang client qua gói `syncTeam(t)`.
  - Hàm `checkInRunEvo()` trước đây chỉ được gọi bên trong `gainXp()`, nên máy client nhận cấp mới nhưng KHÔNG BAO GIỜ kích hoạt kiểm tra tiến hóa!
* **Quy tắc vàng**:
  - Trong `js/game.js` tại hàm `syncTeam(t)`:
    ```javascript
    if (t.level > oldLevel && pl.checkInRunEvo) pl.checkInRunEvo();
    ```
  - Trong `js/entities/player.js`: Nếu nhân vật đang bận mở modal khác (`scr-levelup`, `scr-item`, `scr-pause`) hoặc đã gục, lưu vào `pl.pendingEvoModal` và gọi lại ngay khi đóng modal hoặc hồi sinh.
  - Chuỗi 3 bậc (`Froakie` $\rightarrow$ `Frogadier` $\rightarrow$ `Greninja`): Khi lên cấp $\ge 30$, sau khi tiến hóa lên bậc 2 phải gọi tiếp `promptEvo()` lên bậc 3 hoặc Mega ngay lập tức.

---

### 🚨 Lỗi 3: Đồng đội nhìn thấy mình vẫn ở dạng cũ (Form / Sprite Desync in Co-op)
* **Triệu chứng**: Bạn đã tiến hóa thành Greninja hoặc Mega Lucario, nhưng người chơi khác trong phòng vẫn thấy bạn là Froakie / Riolu.
* **Nguyên nhân cốt lõi**:
  - Gói trạng thái định kỳ `myState()` trước đây chỉ gửi tọa độ `x, y, vx, vy, hp`, còn sự kiện `evo` gửi qua kênh tin nhắn một lần (fire-and-forget). Nếu gói tin bị trễ hoặc rớt mạng nhẹ, đồng đội sẽ vĩnh viễn không cập nhật sprite mới.
* **Quy tắc vàng**:
  - Đưa trực tiếp `dex` và `isMega` vào hàm `myState()` trong `js/net/coop.js`:
    ```javascript
    myState() {
      return { ..., dex: pl.dex, isMega: pl.isMega ? 1 : 0 };
    }
    ```
  - Khi nhận gói trạng thái của puppet, nếu `puppet.dex !== st.dex` hoặc trạng thái Mega khác nhau, lập tức gọi `applyMateEvo(puppet, st.dex, st.isMega)`.

---

### 🚨 Lỗi 4: Boss bất tử quá lâu sau khi đổi Phase (Permanent Boss Invulnerability)
* **Triệu chứng**: Đánh hết thanh máu đầu tiên của Boss, Boss phát nổ sóng xung kích rồi đứng im bất tử, đánh không nhận sát thương trong thời gian rất dài.
* **Nguyên nhân cốt lõi**:
  - `this.invuln` gán giá trị thời gian miễn nhiễm nhưng trong `Enemy.update(dt)` thiếu dòng trừ dần `if (this.invuln > 0) this.invuln -= dt;`.
  - Thời gian miễn nhiễm đổi phase mặc định quá cao (1.5s - 5.0s).
* **Quy tắc vàng**:
  - Luôn đảm bảo `this.invuln` giảm dần theo `dt` trong mọi nhánh update của `Enemy`.
  - Giới hạn thời gian bất tử đổi phase tối đa **0.8 giây**.
  - Giới hạn thời gian kháng hiệu ứng khống chế (Tenacity / CC Immune) tối đa **2.0 giây**.
  - Host phải phát sóng `broadcastBossPhase` để tất cả client đồng bộ thanh máu và phase của Boss cùng lúc.

---

### 🚨 Lỗi 5: Đè chữ và lệch giao diện trên HUD đỉnh màn hình (HUD Collision)
* **Triệu chứng**: Đồng hồ `8:10`, tên khu vực, thanh tiến trình Timeline vô hạn và thanh máu Boss/thông báo sự kiện nằm đè lên nhau ở giữa màn hình.
* **Tọa độ Y chuẩn mực trong `js/ui/hud.js`**:
  - `y = 26`: Đồng hồ trận đấu (`font: 20px Pixelify`, căn giữa).
  - `y = 40`: Thông tin Khu vực & Số quái hạ gục (`font: 11px`, màu mờ).
  - `y = 48`: Thanh tiến trình vô hạn Timeline (`barY = 48, barH = 14`, độ rộng 380px).
  - `y = 68`: Thanh máu Boss đa phase (`bY = 68, bH = 14`, độ rộng 300px).
  - `y = 71` (không có boss) hoặc `y = 88` (khi có boss): Dòng thông báo sự kiện (Chiếm cờ, Nhặt pha lê, Thoát thân).
  - **Ký hiệu tiến độ tiến hóa**: Thay thế hoàn toàn `🔒` thành `✦ `, tiến hóa trong trận KHÔNG BỊ KHÓA bởi gacha meta tier.

---

### 🚨 Lỗi 6: Pokédex bị khoảng trắng xanh ở bên trái (Pokédex Left Blank Box)
* **Triệu chứng**: Mở Pokédex, bên trái là một mảng xanh rỗng trơn, mất thanh tìm kiếm và danh sách Pokémon, bên phải hiển thị chi tiết nhưng bị đẩy tụt xuống dưới.
* **Nguyên nhân cốt lõi**:
  - Thẻ bao ngoài `.box` có thuộc tính `overflow: auto`, khi render chi tiết hoặc người dùng cuộn chuột, chính thẻ `.box` bị cuộn dọc (`scrollTop > 0`), đẩy toàn bộ header và danh sách bên trái văng lên trên khỏi màn hình.
* **Quy tắc vàng**:
  - Trong `css/style.css`: Khóa cứng `#scr-dex .box { overflow: hidden !important; }` trên cả desktop lẫn mobile ngang (`max-height: 520px`).
  - Trong `js/ui/menu.js`:
    ```javascript
    // Trong openDex():
    const scrDexBox = $('scr-dex') ? $('scr-dex').querySelector('.box') : null;
    if (scrDexBox) scrDexBox.scrollTop = 0;
    
    // Trong showDetail():
    if (!sameMon && d0) d0.scrollTop = 0;
    if (dexModalBox) dexModalBox.scrollTop = 0;
    ```

---

### 🚨 Lỗi 7: Gợi ý chiêu thức hiểu lầm khi Lên Cấp (Misleading Move Fit Note)
* **Triệu chứng**: Pokémon chuyên công Vật lý (như Zygarde) khi ra chiêu Đặc biệt (Mud Shot) lại hiện dòng gợi ý tích cực: *"Với Zygarde đạt 92%: đánh mạnh hơn bằng chiêu vật lý."* làm người chơi tưởng là chiêu được khuyên dùng.
* **Quy tắc vàng**:
  - Nếu chiêu thức bị giảm hiệu suất ($fit < 0.95$), phải hiển thị rõ là cảnh báo phạt sát thương:
    `⚠ (Giảm hiệu suất còn 92%: Pokémon này đánh mạnh hơn bằng chiêu vật lý)`
  - Định dạng chuẩn trong `levelup.js`:
    ```javascript
    const fitNote = (mon, cat) => {
      const f = G.Stats.fit(mon, cat);
      if (f >= 0.95) return '';
      const side = G.Stats.sideOf(mon) === 'special' ? 'especiales' : 'físicos';
      const pct = Math.round(f * 100);
      return ` <span class="fit-low">⚠ ${G.I18n.f('(Eficacia reducida al {x} %: este Pokémon rinde mejor con ataques {x})', pct, side)}</span>`;
    };
    ```

---

### 🚨 Lỗi 8: Ngôn ngữ tên chiêu thức bị dịch lộn xộn
* **Quy tắc bất di bất dịch**:
  - **Tên chiêu thức (Move Name)**: LUÔN LUÔN là tiếng Anh chuẩn canon Pokémon (ví dụ: *Thousand Arrows*, *Plasma Fists*, *Core Enforcer*, *Dragon Ascent*, *Earthquake*...). Tuyệt đối không dịch tên chiêu sang tiếng Việt hay tiếng Tây Ban Nha.
  - **Mô tả chiêu thức (Move Description)**: Dịch đúng 100% theo ngôn ngữ được chọn trong Settings (Tiếng Việt hoặc Tiếng Anh).

---

## 3. QUY TRÌNH BUILD & DEPLOY BẮT BUỘC (BUILD PROTOCOL)

Khi chỉnh sửa bất kỳ logic nào, phải tuân thủ nghiêm ngặt các bước sau theo `AGENTS.md`:

```bash
# 1. Tuyệt đối KHÔNG sửa trực tiếp index.html. Mọi thay đổi HTML phải sửa vào: dev.html

# 2. Cập nhật bản dịch (nếu có thêm key mới):
node tools/build_langs.js

# 3. Chạy chuỗi lệnh build chuẩn của dự án:
node tools/build.js && node tools/export_data.js && python tools/make_seo_pages.py

# 4. Kiểm thử tính toàn vẹn bản dịch và test suite:
node --test tests/i18n.test.cjs

# 5. Cập nhật changelog tại js/data/changelog.js (cả tiếng Tây Ban Nha và tiếng Anh).

# 6. Commit (TUYỆT ĐỐI KHÔNG có Co-Authored-By hay chữ ký AI nào) và push lên origin main khi được yêu cầu:
git add -A
git commit -m "Your clean commit message"
git push origin main
```
