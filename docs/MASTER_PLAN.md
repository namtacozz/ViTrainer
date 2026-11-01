# Kế Hoạch Đại Cập Nhật ViTrainer: Chiều Sâu Build, Nhịp Trận Đấu & Cân Bằng Toàn Diện

> **Tài liệu Kế hoạch Kỹ thuật & Thiết kế Game (Master Engineering Plan)**  
> **Dự án**: ViTrainer (PokeSurvivor) · **Nhóm phát triển**: ViTeam  
> **Phiên bản**: 2.0 (Hoàn thiện & Hợp nhất toàn diện) · **Ngày lập**: 01/11/2026  
> **Được đúc kết từ**: `Khuôn khổ.md`, `Plan.md` và toàn bộ 15 tài liệu kiến trúc kỹ thuật dự án.

---

## 0. Cách Dùng Tài Liệu Này & Nguyên Tắc Bất Khả Xâm Phạm

### 0.1. Nhãn Độ Tin Cậy Dữ Liệu
- **[CHẮC]**: Dữ liệu lấy trực tiếp từ mã nguồn và tài liệu kiến trúc dự án (`README.md`, `bosses.md`, `items.md`, `moves.md`, `abilities.md`, `pokemons.md`, `GAMEPLAY_MANUAL.md`, `XUAT_BAN.md`, `MULTIPLAYER_PROTOCOL.md`, `LOCALIZATION.md`).
- **[ĐỀ XUẤT]**: Số liệu khởi điểm do bộ kế hoạch đề ra, bắt buộc tinh chỉnh và kiểm chứng qua telemetry và mô phỏng thực tế.
- **[XÁC MINH]**: Nội dung chưa được ghi nhận rõ trong tài liệu, bắt buộc Agent phải đọc mã nguồn hoặc chạy kiểm thử thực tế trước khi sửa đổi, tuyệt đối không suy đoán.

### 0.2. Các Quy Tắc Bất Khả Xâm Phạm (Non-Negotiables)
1. **Quy chuẩn Tệp Nguồn**: Tuyệt đối **KHÔNG** chỉnh sửa trực tiếp `index.html`. Chỉ chỉnh sửa `dev.html`, các tệp trong `js/`, `css/` và `tools/`. Mọi tệp `.js` mới phải được khai báo đúng vị trí trong danh sách script của `dev.html` (được gộp tự động bởi `tools/build.js`).
2. **Bảo tồn Lõi Tiến Hóa & Co-op 8 Người**: Tuyệt đối **KHÔNG** làm thay đổi cấu trúc của hệ tiến hóa (Stage Balance, các mốc Lv15/Lv30, hệ thống Mega, Zygarde Quest, giao diện thẻ tiến hóa) và lõi đồng bộ phòng Co-op 8 người. Được phép đọc dữ liệu và cắm thêm hook sự kiện bên cạnh, giữ nguyên chữ ký hàm cũ và cấu trúc gói tin hiện hành.
3. **Bảo tồn Bộ Cập Nhật Tự Động (Live Updater)**: Tuyệt đối **KHÔNG** xóa hoặc thay đổi hành vi của `js/core/updater.js` và logic sinh mã băm `version.json` trong `tools/build.js`.
4. **Quy chuẩn Git**: Tuyệt đối **KHÔNG** đính kèm chữ ký AI, watermark, "Co-Authored-By" hay bất kỳ dấu vết AI nào trong commit message.
5. **Quy chuẩn Đa Ngôn Ngữ (i18n)**: Mọi chuỗi văn bản giao diện mới phải dùng `G.T('Khóa tiếng Tây Ban Nha')` và khai báo đầy đủ bản dịch trong `js/data/lang-en.js` và `js/data/lang-vi.js`. Tên Pokémon, tên chiêu thức và tên Ability chuẩn Canon giữ nguyên danh pháp quốc tế.
6. **Chi Phí Hạ Tầng Bằng 0 (Zero-Cost Policy)**: Mọi tính năng mới duy trì hoạt động trên GitHub Pages, Firebase Spark và mạng WebRTC P2P qua Google STUN công cộng. Telemetry chỉ ghi nhận cục bộ hoặc tải tệp JSON, không ghi trực tiếp từng frame lên Firebase.
7. **Kiến Trúc Máy Chủ Chủ Quyền (Host-Authoritative)**: Mọi logic phán quyết sự kiện, trạng thái quái và Boss do Host tính toán; Client chỉ nhận dữ liệu hiển thị. Mọi cơ chế mới bắt buộc phải tương thích với phòng Co-op 8 người.

### 0.3. Định Nghĩa Hoàn Thành (Definition of Done - DoD)
Một hạng mục chỉ được tính là HOÀN THÀNH khi đạt đủ 7 tiêu chí:
- `(a)` Có dữ liệu khai báo data-driven rõ ràng, không hardcode `if/else` theo loài.
- `(b)` Có hiệu ứng hình ảnh (VFX Canvas procedural) và âm thanh SFX phù hợp.
- `(c)` Đầy đủ bản dịch i18n cho cả tiếng Tây Ban Nha (gốc), tiếng Anh và tiếng Việt.
- `(d)` Vượt qua 100% bài kiểm thử tự động (`node --test tests/*.test.cjs`).
- `(e)` Đã kiểm tra tính tương thích đồng bộ trong mạng Co-op.
- `(f)` Đã ghi chép nhật ký vào `docs/CHANGELOG_UPDATE.md`.
- `(g)` Không làm tụt quá 10% FPS trên thiết bị di động (giữ ổn định $\ge 50\text{ FPS}$).

---

## 1. Giai Đoạn G0: Khảo Sát Hệ Thống & Kiểm Chứng Mã Nguồn

### 1.1. Ma Trận 13 Điểm Xác Minh Mã Nguồn [XÁC MINH]
Trước khi triển khai mã mới, các câu hỏi sau đã và đang được đối chiếu trực tiếp từ mã nguồn:

| # | Hạng mục khảo sát | Tệp nguồn khảo sát | Kết quả xác minh từ mã nguồn |
|---|---|---|---|
| 1 | Cấu trúc dữ liệu Ability & Hook | `js/data/abilities.js`, `ability-fx.js`, `combat.js` | `G.ABIL` lưu tên đa ngữ, `G.DEX_ABIL` gán ability cho 1.021 loài. Logic xử lý nằm trong `G.AbilityFX.FX`. Nếu thiếu, rơi vào fallback generic `+8% STAB`. |
| 2 | Bể chiêu thức người chơi | `js/data/moves.js`, `js/systems/levelup.js` | 139 chiêu thức chia theo hệ (`POOL[type]`), Normal pool (`POOL.normal`) và chiêu độc quyền (`EXCLUSIVE_BY_DEX`). |
| 3 | Trạng thái bất lợi & Stage debuff | `js/systems/combat.js`, `js/entities/enemy.js` | Hiện có burn, poison, freeze, slow cơ bản; chưa có hệ thống Stage Buff/Debuff ($\pm 3$) thống nhất và chưa có thanh Choáng Boss. |
| 4 | Choice Band có khóa chiêu? | `js/data/items.js`, `levelup.js` | Item `choiceband` tăng `atkMul *= 1.4`. Chưa có ràng buộc cứng khóa chọn chiêu mới ở ô kỹ năng. |
| 5 | Công thức `bossScale(t)` | `js/data/enemies.js` | HP và Dmg Boss nhân với hệ số theo phút. Có hiện tượng máu tăng vọt hàng ngàn lần trong khi sát thương tăng chậm. |
| 6 | Máu & Sát thương người chơi | `js/entities/player.js`, `combat.js` | Máu người chơi đạt từ 100–350+, thẻ Giáp giảm tối đa 70%. Cần trần giảm sát thương tổng 85% và trần hồi máu. |
| 7 | Tỉ lệ Co-op Boss | `js/net/coop.js`, `enemy.js` | Cần chuẩn hóa công thức scale máu theo số người chơi $N$: $\text{HP}_{\text{Coop}} = \text{HP}_{\text{Solo}} \times (1 + 0.6 \times (N - 1))$. |
| 8 | Giới hạn thực thể & VFX | `js/game.js`, `js/entities/fx.js`, `spawner.js` | Cần giới hạn hạt đồng thời $\le 250$ trên PC và $\le 120$ trên Mobile để tránh rớt FPS. |
| 9 | Bộ giải mã nhị phân mạng | `js/net/net-codec.js` | Đang dùng tag từ `0x01` đến `0x06`. Bổ sung `0x07 EVENT_WORLD` để truyền tải sự kiện thế giới mà không phá vỡ tương thích. |
| 10 | Trạng thái thời tiết | `js/systems/weather.js`, `hazards.js` | Quản lý thời tiết hiện tại qua `G.Weather.current`. Sẵn sàng để liên kết với phản ứng nguyên tố và ability. |
| 11 | Kho VFX Canvas & Sprite | `js/core/sprites.js`, `G.FX` | Đã có hệ thống `G.FX.ring`, `G.FX.line`, `G.FX.spark`, đạn projectile và animation PMD xoay hướng. |
| 12 | Hệ thống Shop, Gacha, Achievement | `js/data/shop.js`, `gacha.js`, `achievements.js` | 139 thành tựu sẵn có, lưu dữ liệu tại `G.DB` trong LocalStorage. Dễ dàng mở rộng thêm 20 thành tựu Hắc Mã. |
| 13 | Hành vi di chuyển quái | `js/entities/enemy.js`, `spawner.js` | Đã phân tách rõ các archetype: chase, charger, ranged, zoner. |

### 1.2. Hệ Thống Telemetry Cục Bộ & Công Cụ Đo Lường
- **Telemetry ghi nhận**: Khi bật cờ `?telemetry=1`, hệ thống ghi mỗi 10 giây một bản ghi trạng thái (HP, DPS, Kills, Moves, Item, Ability, Boss TTK, Sát thương nhận theo nguồn) và cho phép tải file JSON từ menu Debug.
- **Báo cáo cân bằng**: Script `tools/balance_report.js` đọc telemetry để xuất biểu đồ phân phối sát thương, kiểm tra sàn/trần và thời gian hạ gục Boss (Target TTK).

---

## 2. Phần I: Nền Tảng Kỹ Thuật Dùng Chung (Phase G1)

### 2.1. Kiến Trúc Tệp Mới & Danh Sách Script
Toàn bộ các tệp kiến trúc mới được đặt tại `js/data/` và `js/systems/`, đồng thời khai báo tuần tự trong `dev.html`:
```
js/systems/balance-caps.js    <!-- Trần & sàn bảo vệ (Damage, Leech, I-frame, Telegraph) -->
js/systems/status-engine.js   <!-- Quản lý trạng thái, Kháng CC, Stage Debuff [-3, +3] -->
js/systems/damage-pipeline.js <!-- Chuỗi tính toán sát thương duy nhất, chống nhân chồng bùng nổ -->
js/data/ability-families.js   <!-- 16 Họ Ability chuẩn hóa theo tham số -->
js/data/abilities-ext.js      <!-- Kho Ability đặc trưng định hình lối chơi -->
js/data/move-traits.js        <!-- Ngữ pháp chiêu thức (Delivery + Canon Trait + Rider) -->
js/data/reactions.js          <!-- Bảng 6 Phản ứng nguyên tố Genshin/Noita -->
```

### 2.2. Hệ Thống Trạng Thái Thống Nhất (Status Engine)
Quản lý tập trung mọi trạng thái cho người chơi, quái thường và Boss:
- **Burn**: Gây 2% sát thương chiêu gốc mỗi 0.5s trong 3s, xóa bỏ trạng thái Freeze.
- **Poison**: Mỗi stack gây 1% Max HP quái thường (tối đa 0.3% Max HP Boss)/giây trong 4s.
- **Toxic (Độc Nặng)**: Như Poison nhưng tự tích lũy +1 stack mỗi giây, tối đa 6 stack.
- **Wet (Ướt)**: Tồn tại 4s, làm môi trường dẫn cho phản ứng Điện và Băng.
- **Slow**: Giảm 30% tốc độ chạy trong 2.5s (Boss giảm 15%).
- **Freeze (Đóng Băng)**: Khống chế cứng 1.5s, nhận thêm +20% sát thương, miễn nhiễm Freeze 4s kế tiếp (Boss chuyển thành Slow -40%).
- **Paralyze / Stun**: Đứng yên 1.0s, miễn nhiễm Stun 3s kế tiếp (Boss chuyển thành Slow -30%).
- **Sleep**: Ngủ 3.0s, tỉnh ngay khi nhận đòn đánh $>10\%\text{ Max HP}$ (Boss miễn nhiễm).
- **Trap (Vòng Xoáy)**: Trói chân trong 2.5s và nhận sát thương theo giây (Boss miễn trói, chỉ nhận sát thương).
- **Marked**: Đòn đánh kế tiếp gây thêm +25% sát thương.

**Quy tắc Kháng CC**: Boss miễn nhiễm hoàn toàn CC cứng trừ khi vừa vỡ Lớp Khiên Phase/Tera hoặc đang trong cửa sổ `VULNERABLE!` 1.5s.  
**Stage Debuff ($\pm 3$)**: Mỗi thực thể có `stages = { def:0, sdef:0, atk:0, spd:0, acc:0 }`, mỗi bậc thay đổi $\pm 12\%$ chỉ số hiệu dụng, tự suy giảm sau 8s, hiển thị chấm màu nhỏ trên đỉnh đầu.

### 2.3. Đường Ống Sát Thương Thống Nhất (Damage Pipeline)
Mọi tương tác chiến đấu phải đi qua đúng 1 chuỗi tuần tự tại `js/systems/damage-pipeline.js`:

#### Sát thương gây ra (Outgoing Damage Pipeline):
1. **Chỉ số công**: $\text{Stat}_{\text{atk}} \times \text{Move}_{\text{base}}$ (phân biệt Physical/Special).
2. **Cấp độ & Stage**: Nhân hệ số Level, Stage Balance (2stage/3stage), Mega Form.
3. **STAB**: $\times 1.2$ nếu trùng hệ Pokémon (Adaptability $\times 1.4$; Protean luôn nhận STAB).
4. **Tương khắc hệ**: Bảng 18 hệ canon ($\times 0.5, \times 1.0, \times 2.0$, miễn nhiễm $\times 0.25$ thay vì 0).
5. **Nhóm khuếch đại cộng dồn**:
   - Nhóm Ability `out()`: Cộng dồn bên trong nhóm, trần tối đa $+60\%$.
   - Nhóm Item `atkMul`: Cộng dồn bên trong nhóm, trần tối đa $+50\%$.
6. **Stage Debuff mục tiêu**: Giảm trừ theo bậc def/sdef của mục tiêu.
7. **Phản ứng nguyên tố**: Cộng hệ số phản ứng (trần $+100\%$).
8. **Chí mạng (Critical Hit)**: $\times 1.5$ (Sniper $\times 2.0$).
9. **Khuếch đại Boss**: Cửa sổ `VULNERABLE!` $\times 1.5$.
10. **Trần sát thương tối đa (Damage Cap)**: Ngăn tràn số hiển thị.

#### Sát thương nhận vào (Incoming Damage Pipeline):
1. **Sát thương thô**: $\text{Raw} \times \text{bossScale}(t)$.
2. **Giáp PDEF / SDEF**: Giảm tối đa $70\%$.
3. **Trang bị phòng thủ**: Assault Vest $-20\%$, Eviolite $+40\%$ giáp.
4. **Nội tại Ability & Mega**: Ability `inMul`, Mega $-20\%$.
5. **Trần giảm sát thương tổng**: Khống chế cứng không vượt quá `DMG_REDUCE_CAP = 85%`.
6. **Hành lang sát thương % Max HP**: Quy chiếu vào khoảng `[HIT_FLOOR_PCT, HIT_CAP_PCT = 40%]`.
7. **Bảo hộ chí tử**: Banda Focus, Sturdy, Disguise chặn đòn kết liễu khi đủ điều kiện.
8. **I-frame bảo vệ**: Kích hoạt 0.6s bất tử nếu đòn đánh lấy đi $>10\%\text{ Max HP}$.

### 2.4. Các Trần Cứng Cân Bằng (Balance Caps)
- `DMG_REDUCE_CAP = 0.85`: Tổng mức giảm sát thương từ mọi nguồn không vượt quá 85%.
- `LEECH_CAP_PER_SEC = 0.04`: Hút máu tối đa 4% Max HP/giây (Shell Bell, Oblivion Wing, Giga Drain). Lượng hút máu vượt trần chuyển thành Khiên Tạm (Overheal Shield) tối đa 15% Max HP trong 4s.
- `HIT_FLOOR_PCT = 0.04` (Boss 1–3) $\rightarrow 0.08$ (Boss 7–9): Sàn sát thương tối thiểu của một đòn đánh Boss.
- `HIT_CAP_PCT = 0.40`: Trần One-Shot Protection (giữ nguyên).
- `IFRAME_AFTER_BIG = 0.6s`: Thời gian bất tử sau khi dính đòn $>10\%\text{ Max HP}$.
- `TELEGRAPH_MIN = 0.6s`: Sàn cảnh báo chiêu thức tối thiểu của Boss.

### 2.5. Giao Thức Mạng: Tag Nhị Phân EVENT_WORLD (0x07)
Mở rộng `js/net/codec.js` với tag `0x07` theo cấu trúc:
`[version:u8][0x07][eventId:u8][op:u8][payload...]`
- `op`: `1=start`, `2=update`, `3=end`, `4=spawn`, `5=despawn`.
- Host tính toán và phát kết quả đồng bộ ở tần số $\le 15\text{ Hz}$.
- Khách (Client) chỉ nhận dữ liệu và kết xuất VFX cục bộ. Các gói tin mang tag lạ được bỏ qua an toàn mà không ngắt kết nối.

---

## 3. Hệ Thống Abilities: 16 Families & Kho Ability Định Hình

### 3.1. Cấu Trúc Khai Báo Data-Driven
```javascript
// Khai báo theo Ability Family
{ id: 'blaze', family: 'pinch', params: { type: 'fire', mult: 1.35, hpBelow: 0.33 } }

// Khai báo Ability Đặc trưng (Unique Shaping Ability)
{
  id: 'intimidate',
  tier: 'shaping',
  desc: 'Debilita a los enemigos cercanos',
  params: { radius: 260, mobDmg: -0.20, mobSpd: -0.10, bossDmg: -0.15, bossDur: 8, bossCd: 20 },
  hooks: { auraTick(pl, dt, ctx) { /* Quét và áp debuff */ } },
  hud: { icon: 'intimidate', kind: 'cooldown' },
  coop: 'ownerOnly'
}
```

### 3.2. Hệ Thống 16 Ability Families (`js/data/ability-families.js`)
Phủ sóng hàng trăm Ability của Pokémon chuẩn Canon chỉ bằng việc truyền tham số:
1. `pinch`: Tăng công khi máu dưới 1/3 (`Overgrow`, `Blaze`, `Torrent`, `Swarm`).
2. `absorb`: Hấp thụ một hệ sát thương để hồi phục hoặc buff (`Water Absorb`, `Volt Absorb`, `Flash Fire`, `Sap Sipper`, `Earth Eater`, `Motor Drive`).
3. `typeBoost`: Tăng sát thương theo hệ (`Steelworker`, `Transistor`, `Dragon's Maw`, `Rocky Payload`).
4. `typeConvert`: Chuyển chiêu Normal sang hệ khác và tăng công (`Pixilate`, `Aerilate`, `Refrigerate`, `Galvanize`).
5. `weatherSpeed`: Tăng 50% tốc chạy dưới thời tiết (`Chlorophyll`, `Swift Swim`, `Slush Rush`, `Sand Rush`).
6. `weatherSummon`: Gọi thời tiết tương ứng khi vào trận và theo chu kỳ (`Drought`, `Drizzle`, `Snow Warning`, `Sand Stream`).
7. `statusReact`: Tăng chỉ số khi dính trạng thái bất lợi (`Guts`, `Flare Boost`, `Toxic Boost`, `Marvel Scale`, `Quick Feet`).
8. `contactTrigger`: Tỉ lệ gây trạng thái khi va chạm cận chiến (`Static`, `Flame Body`, `Poison Point`, `Rough Skin`, `Iron Barbs`).
9. `killStack`: Cộng dồn chỉ số khi hạ quái (`Moxie`, `Beast Boost`, `Chilling Neigh`, `Grim Neigh`).
10. `statStack`: Tích lũy stack chỉ số khi nhận đòn hoặc tung chiêu (`Stamina`, `Weak Armor`, `Defiant`, `Competitive`).
11. `critBoost`: Tăng tỉ lệ hoặc sát thương chí mạng (`Super Luck`, `Sniper`, `Merciless`).
12. `statusImmune`: Miễn nhiễm danh sách trạng thái xấu (`Limber`, `Insomnia`, `Own Tempo`, `Water Veil`).
13. `regen`: Hồi máu theo điều kiện hoặc theo thời gian (`Regenerator`, `Poison Heal`, `Ice Body`, `Rain Dish`).
14. `auraDebuff`: Hào quang giảm chỉ số quái xung quanh (`Intimidate`, `Dazzling`, `Pressure`).
15. `multiHit`: Tối đa hóa số đòn đánh đa kích (`Skill Link`, `Parental Bond`).
16. `defReduceBy`: Giảm sát thương nhận vào từ nhóm chiêu nhất định (`Thick Fat`, `Filter`, `Solid Rock`, `Fluffy`, `Ice Scales`).

### 3.3. Kho 28+ Ability Đặc Trưng Định Hình Lối Chơi (`js/data/abilities-ext.js`)
- **Intimidate**: Aura 260px giảm 20% sát thương quái thường; giảm 15% sát thương Boss trong 8s mỗi 20s.
- **Speed Boost**: +3% tốc chạy mỗi 10s (tối đa +30%), mất 1 bậc khi trúng đòn Boss.
- **Protean / Libero**: Đổi hệ nhân vật theo chiêu vừa tung, luôn nhận STAB (+20%); xoay đủ 4 hệ nhận thêm +10% sát thương (3 stack).
- **Multiscale**: Giảm 50% sát thương đòn đầu tiên khi HP >90%, hồi lại sau 12s không trúng đòn.
- **Stance Change (Aegislash)**: Khi tung chiêu hóa Dạng Kiếm (+25% công, -30% giáp) trong 1.5s; ngoài ra ở Dạng Khiên (+30% giáp).
- **Disguise (Mimikyu)**: Chặn hoàn toàn 1 đòn đánh mỗi 45s, hiện hiệu ứng "Busted!".
- **Schooling (Wishiwashi)**: Khi có >25 quái trong 300px, hóa Dạng Đàn (+50% công, +30% HP tạm thời).
- **Mold Breaker**: Bỏ qua cửa sổ miễn nhiễm CC 2.0s của Boss Phase 2 và các khiên phòng thủ của Elite.
- **Unaware**: Sát thương của Boss lên người chơi không tính các buff Cuồng Nộ và Stage của Boss.
- **Unburden**: Nhận +40% tốc chạy trong 20s khi đổi hoặc bỏ trang bị giữ.
- **Poison Heal**: Đứng trong vũng độc hoặc dính trạng thái Poison sẽ hồi 2% Max HP/s (vượt trần Leech Cap).
- **Trace / Imposter**: Sao chép kỹ năng/ability của Boss hoặc Elite trong 90s.
- **Serene Grace**: Nhân đôi tỉ lệ hiệu ứng phụ (choáng, bỏng, đóng băng), trần tối đa 60%.
- **Skill Link**: Các chiêu thức bắn nhiều phát (multi-hit) luôn đạt số lượng đạn tối đa.
- **Magnet Pull**: Tăng +50% tầm hút ngọc, kéo quái hệ Thép vào tầm cận chiến.
- **Berserk / Zen Mode**: Máu dưới 50% chuyển đổi hình thái chiến đấu (tăng tốc độ xả đạn hoặc hóa đá thủ vững).
- **Sniper**: Đòn chí mạng ở tầm xa >300px gây thêm +50% sát thương.
- **Contrary**: Đảo ngược mọi debuff thành buff (Leaf Storm, Close Combat cộng chỉ số thay vì trừ).
- **Prankster**: Các kỹ năng hỗ trợ và tạo trạng thái hồi chiêu nhanh hơn 30%.
- **Shadow Tag / Arena Trap**: Quái thường trong 200px không thể tháo chạy, bị giữ chân quanh người chơi.
- **Parental Bond**: Mọi đòn đánh phát ra thêm đòn phụ thứ hai gây 25% sát thương.
- **Supreme Overlord**: Nhận +4% sát thương cho mỗi đồng đội ngã xuống (Co-op) hoặc mỗi Boss phụ đã hạ (Solo).
- **Gale Wings**: Chiêu hệ Bay giảm 25% hồi chiêu khi máu trên 80%.
- **Cursed Body**: 15% tỉ lệ khóa chiêu mạnh nhất của quái tấn công trong 3s.
- **Pressure**: Boss nhắm vào người chơi bị tăng 10% thời gian hồi chiêu.
- **Soul-Heart**: Mỗi kẻ địch bị hạ tăng +0.3% sát thương trong 10s (tối đa +12%).

---

## 4. Phần II: Hệ Thống Chiêu Thức & Phản Ứng Nguyên Tố

### 4.1. Ngữ Pháp Chiêu Thức (Move Grammar)
$$\text{Move} = \text{Delivery} + \text{Canon Trait} + \text{Rider} + \text{Reaction Tag}$$
- **Quy tắc duy nhất**: Mỗi chiêu có ít nhất 1 Canon Trait; không có hai chiêu cùng Hệ trùng tổ hợp (Delivery + Canon Trait).
- **Các Delivery mới**: `charge_beam`, `counter_stance`, `trap_field`, `tether_drain`, `decoy_turret`, `boomerang_arc`.

### 4.2. Danh Mục Nét Canon Cho Chiêu Thức Tiêu Biểu (`js/data/move-traits.js`)
- **Solar Beam**: Tụ năng lượng 1.2s rồi xả chùm tia cực đại; dưới Nắng Gắt (Sun) xả tức thì không cần tụ.
- **Hyper Beam**: Bắn chùm tia hủy diệt diện rộng, sau đó người chơi bị khựng chân 0.8s (turn hồi sức canon).
- **Thunder**: Báo trước vòng sấm sét rồi giáng bão sét ngẫu nhiên; dưới Trời Mưa (Rain) đánh trúng chắc chắn 100%.
- **Magnitude**: Mỗi lần thi triển rút ngẫu nhiên cấp độ 4 đến 10; cấp càng cao chấn động càng rộng và sát thương nhân bội.
- **Sucker Punch**: Chỉ kích hoạt sát thương cực đại khi Boss hoặc quái đang trong trạng thái niệm chiêu (windup/telegraph).
- **Bonemerang**: Xương bay đi và bay về, gây sát thương 2 lần độc lập theo quỹ đạo Boomerang.
- **Outrage**: Lao cuồng loạn 2.5s theo hướng khóa, sau đó bị choáng nhẹ 0.5s do kiệt sức.
- **U-turn**: Lao lên chém mạnh kẻ địch rồi lập tức bật lùi về vị trí xuất phát 150px.
- **Freeze-Dry**: Chiêu hệ Băng nhưng tính sát thương Khắc Hệ ($\times 2.0$) lên toàn bộ quái mang hệ Nước.
- **Toxic**: Áp trạng thái Badly Poisoned cộng dồn sát thương tăng dần theo giây.
- **Giga Drain**: Phóng dây tơ xanh hút máu liên tục từ 3 mục tiêu xung quanh.
- **Aura Sphere**: Đạn cầu năng lượng tự tìm đường (homing), không bao giờ bay trượt mục tiêu.
- **Sand Tomb / Fire Spin**: Khóa quái vật vào tâm vòng xoáy bão cát/lửa giam hãm trong 2.5s.

### 4.3. Bảng 6 Phản Ứng Nguyên Tố (`js/data/reactions.js`)
Lấy cảm hứng từ Genshin Impact & Noita, kết hợp từ các trạng thái sẵn có:
1. **Dẫn Điện (Conductive)**: `Wet + Electric` $\rightarrow$ Phóng sét lan ra 3 mục tiêu lân cận trong bán kính 160px.
2. **Đóng Băng Sâu (Deep Freeze)**: `Wet + Ice` $\rightarrow$ Tăng thời gian đóng băng lên 2.5s và tăng sát thương nhận vào $+35\%$.
3. **Cháy Lan (Wildfire)**: `Grass + Fire` $\rightarrow$ Bùng cháy dữ dội, rải thảm lửa mặt đất trong 3s gây sát thương diện rộng.
4. **Tan Chảy (Melt)**: `Ice + Fire` $\rightarrow$ Gây một vụ nổ hơi nước bộc phát sát thương bằng $150\%$ đòn kích hoạt.
5. **Thủy Tinh Hóa (Glassify)**: `Sand/Ground + Electric` $\rightarrow$ Đúc quái thành thủy tinh, ghim cứng chân tại chỗ 2.0s và giảm $20\%$ giáp.
6. **Nổ Khí Độc (Vapor Explosion)**: `Poison + Fire` $\rightarrow$ Kích nổ toàn bộ lượng độc tồn dư thành đám mây khói lửa hủy diệt.

### 4.4. Công Thức Dung Hợp (Bond Combos) Chuẩn Canon
- **Bộ Ba Khởi Đầu (Pledge Combos)**:
  - `Fire Pledge + Grass Pledge` $\rightarrow$ Biển Lửa (Sea of Fire) thiêu đốt quái theo % máu.
  - `Water Pledge + Grass Pledge` $\rightarrow$ Đầm Lầy (Swamp) làm chậm 50% toàn bộ bãi quái.
  - `Water Pledge + Fire Pledge` $\rightarrow$ Cầu Vồng (Rainbow) nhân đôi tỉ lệ hiệu ứng phụ của cả đội.
- **Hợp Nhất Âm Dương**: `Fusion Flare + Fusion Bolt` $\rightarrow$ Chiêu ra sau được tăng $+50\%$ sát thương và kích thước.
- **Thời Tiết Kết Hợp**: `Rain Dance + Thunder/Hurricane` hoặc `Sunny Day + Solar Beam` $\rightarrow$ Mở khóa bắn tức thời không cần nạp.

---

## 5. Phần III: Nhịp Trận Đấu 30 Phút & Chế Độ Vô Tận

### 5.1. Kiến Trúc Bộ Điều Phối Sự Kiện (Event Director)
Mở rộng hàng đợi sự kiện an toàn tại `js/systems/director.js` và `world-events.js`:
- **Phân cấp ưu tiên**: `BOSS (100)` $\rightarrow$ `RIFT (90)` $\rightarrow$ `MAJOR_ENC (70)` $\rightarrow$ `ELITE (60)` $\rightarrow$ `ENV (50)` $\rightarrow$ `RELIEF (40)`.
- **Nhịp thở Căng – Chùng**: Sau mỗi khi hạ Đại Boss, kích hoạt 20s Nhịp Thở (Relief Window): giảm 35% mật độ quái, sinh Berry, Kecleon hoặc Shiny.
- **Quy tắc Không Chồng Lấn (No-Overlap)**: Tại một thời điểm chỉ có tối đa 01 sự kiện lớn hoạt động. Sự kiện đến lượt sẽ xếp vào hàng đợi chờ kết thúc nhịp thở.

### 5.2. Danh Mục 11 Sự Kiện Thế Giới Mới
1. **Elite Alpha / Noble**: Xuất hiện xen kẽ giữa các Boss (phút 1:30, 4:30...); quái to gấp 1.4 lần, viền đỏ, rơi ngọc EXP lớn và rương trang bị.
2. **Quái Shiny Chạy Trốn**: Xuất hiện 1–2 lần mỗi 6 phút; chạy trốn thần tốc trong 25s; hạ gục rơi mưa xu vàng và trang bị hiếm.
3. **Bụi Cây Berry Tự Nhiên**: Xuất hiện mỗi 45s; đập vỡ nhặt Sitrus (hồi máu), Lum (giải CC), Salac (tăng tốc), Liechi (tăng công).
4. **Chu Kỳ Ngày / Đêm & Thời Tiết**: Đổi pha mỗi 4 phút; đêm sinh quái Ma/Bóng Tối (+20% EXP), ngày sinh Cỏ/Bay; thời tiết kích hoạt phản ứng tự nhiên.
5. **Ổ Quái Vật (Monster House)**: Rương vàng bẫy khóa vòng chắn 380px trong 45s; vượt qua nhận Đại Rương Hoàng Kim.
6. **Team Rocket Phục Kích**: Meowth cướp 15% xu bỏ chạy trong 30s; đuổi kịp đánh bại đoạt lại 200% số xu.
7. **Poké Ball Đồng Minh Hỗ Trợ**: Rơi hiếm từ sự kiện; triệu hồi 1 Pokémon ngẫu nhiên chiến đấu hỗ trợ 45s bằng chiêu canon.
8. **Thương Nhân Kecleon Lang Thang**: Xuất hiện phút 8, 16, 24; đổi xu lấy máu, reroll thẻ hoặc nâng cấp chiêu.
9. **Hợp Đồng Nhiệm Vụ Đầu Trận**: Chọn 1 trong 3 thử thách ở giây thứ 10; hoàn thành thưởng rương trang bị.
10. **Giao Ước Độ Khó (Heat / Pact)**: Bật các nấc tăng độ khó tại phòng chờ để đổi lấy hệ số nhân thưởng Xu và Mastery cuối trận.
11. **Khiên Kết Tinh Tera (Tera Shield)**: Boss từ phút 12 có lớp khiên theo hệ; đòn Khắc Hệ phá vỡ nhanh gấp 2.5 lần và gây Choáng Boss 3.0s.

### 5.3. Biểu Đồ Nhịp Độ 30 Phút (Timeline Pacing) & Quy Chuẩn HUD
- **00:00 – 06:00 (Khởi Hành Hoang Dã)**: Hợp đồng (0:10) $\rightarrow$ Berry & Alpha (1:30) $\rightarrow$ Boss 1 (3:00) $\rightarrow$ Shiny (3:40) $\rightarrow$ Lv15 $\rightarrow$ Boss 2 (6:00).
- **06:00 – 12:00 (Bóng Đêm & Thử Thách)**: Đêm (6:30) $\rightarrow$ Cổng Rift 1 (7:00) $\rightarrow$ Kecleon 1 (8:00) $\rightarrow$ Boss 3 (9:00) $\rightarrow$ Monster House (10:30) $\rightarrow$ Boss 4 Tera Shield (12:00).
- **12:00 – 18:00 (Bão Tố Nguyên Tố)**: Bão tố (12:30) $\rightarrow$ Team Rocket (13:30) $\rightarrow$ Boss 5 (15:00) $\rightarrow$ Kecleon 2 (16:00) $\rightarrow$ Lv30/Mega $\rightarrow$ Boss 6 (18:00).
- **18:00 – 24:00 (Đại Chiến Huyền Thoại)**: Rift liên hoàn $\rightarrow$ Poké Ball hỗ trợ (19:30) $\rightarrow$ Boss 7 (21:00) $\rightarrow$ Alpha đôi (22:30) $\rightarrow$ Boss 8 & Kecleon 3 (24:00).
- **24:00 – 30:00 (Đêm Trước Phán Quyết)**: Chiêu bậc +++ $\rightarrow$ Boss 9 (27:00) $\rightarrow$ Phán Quyết Arceus (30:00).

**Phân Tầng Trục Y HUD (`run-ui.js`)**:
- $Y = 26$: Đồng hồ trận đấu.
- $Y = 40$: Tên khu vực + Biểu tượng Thời tiết / Ngày Đêm bên phải.
- $Y = 48$: Timeline trượt hiển thị icon sự kiện.
- $Y = 68+$: Thanh máu Boss + Khiên Tera Shield đè trên thanh máu + Thanh Choáng mỏng 3px dưới đáy thanh máu.

### 5.4. Chế Độ Vô Tận: Thế Giới Đảo Lộn (Distortion World — Phút 30:00+)
- Sau khi vượt qua Phán Quyết Arceus tại phút 30:00, xuất hiện hai cánh cổng: Cổng Hoàng Kim (Chiến thắng chuẩn) và Cổng Vết Nứt Đảo Lộn của Giratina.
- **Distortion Entropy**: Mỗi 60s quái tăng +4% tốc độ, +8% số lượng, giảm hồi phục người chơi -3%, và mỗi 120s xuất hiện 2 Boss Thần Thú bóng tối song hành.

---

## 6. Cân Bằng Độ Khó Boss, Người Chơi & Trang Bị

### 6.1. Tái Cấu Trúc Bảng Chỉ Số Boss 1–9 Theo Target TTK
Làm mượt đường cong cấp số nhân ($\times 2.1 - \times 2.6$), loại bỏ bước gãy tại Boss 5 $\rightarrow$ 6:

| Mốc Boss | Thời gian | HP Gốc Đề Xuất | Dmg Gốc Đề Xuất | TTK Mục Tiêu | Sàn – Trần Đòn Thường (% Max HP) |
|---|---|---|---|---|---|
| Boss 1 | 03:00 | 2.600 | 16 | 20 – 25s | 4% – 10% (Đại chiêu: 18%) |
| Boss 2 | 06:00 | 7.200 | 25 | 22 – 28s | 4% – 10% (Đại chiêu: 20%) |
| Boss 3 | 09:00 | 20.000 | 38 | 25 – 30s | 5% – 11% (Đại chiêu: 22%) |
| Boss 4 | 12:00 | 55.000 | 56 | 35 – 42s | 5% – 12% (Đại chiêu: 24%) |
| Boss 5 | 15:00 | 145.000 | 80 | 38 – 45s | 6% – 12% (Đại chiêu: 26%) |
| Boss 6 | 18:00 | 360.000 | 112 | 42 – 50s | 6% – 13% (Đại chiêu: 28%) |
| Boss 7 | 21:00 | 850.000 | 150 | 50 – 58s | 7% – 14% (Đại chiêu: 30%) |
| Boss 8 | 24:00 | 1.900.000 | 195 | 55 – 65s | 8% – 15% (Đại chiêu: 34%) |
| Boss 9 | 27:00 | 4.200.000 | 250 | 60 – 70s | 8% – 16% (Đại chiêu: 38%, Trần 40%) |

- **Khiên Chuyển Phase (Phase Barrier)**: Thay thế việc hồi máu trắng ở Phase 2/3 bằng Lớp Khiên 35% (Phase 2) và 50% (Phase 3) HP gốc. Đánh vỡ khiên kích hoạt Choáng Boss 3.0s (`VULNERABLE!`).
- **Thanh Choáng (Stagger Gauge)**: Tích lũy điểm khi nhận đòn (đặc biệt là cận chiến và đòn Khắc Hệ); đầy thanh gây ngắt chiêu và mở cửa sổ `VULNERABLE!` 3.0s.
- **Soft Enrage**: Sau 75s chưa hạ được Boss, mỗi 5s Boss tăng +4% sát thương và +2% tốc chạy (tối đa $\times 2.0$).
- **Máu Boss Co-op**: $\text{HP}_{\text{Coop}}(N) = \text{HP}_{\text{Solo}} \times (1 + 0.60 \times (N - 1))$.

### 6.2. Cân Bằng Người Chơi & Cơ Chế "Hang On"
- Áp dụng các trần bảo vệ `DMG_REDUCE_CAP = 85%`, `LEECH_CAP_PER_SEC = 4%`, `IFRAME_AFTER_BIG = 0.6s`.
- **Nội tại Hang On (Gồng Mình)**: Một lần duy nhất mỗi chu kỳ Boss (180s), khi máu tụt dưới 25% nhận ngay giảm 50% sát thương trong 3.0s để kịp hồi phục hoặc né đòn.
- **Đường cong EXP**: Chuẩn hóa để người chơi đạt Lv15 ở phút 6–8, Lv30 ở phút 16–18 và Lv50 ở phút 26–28.

### 6.3. Cân Bằng 21 Trang Bị Giữ & Chiêu Độc Quyền
- **Choice Band**: Giữ nguyên sức mạnh nhưng khóa đổi chiêu mới ở ô kỹ năng số 1; hoặc tăng +30% công và +15% hồi chiêu.
- **Leftovers**: Hồi nền 1.0% Max HP/s, tự động tăng lên 1.6% Max HP/s khi không dính đòn trong 3s.
- **Keystone**: Trước Lv30 nhận 60% chỉ số Mega (+30% công, +27% máu) và đạt 100% khi nhân vật đạt Lv30.
- **Assault Vest**: Giữ nguyên +20% giảm sát thương độc lập nhưng chịu trần tổng 85%.
- **Shell Bell**: Hút 6% sát thương gây ra, tuân thủ Leech Cap 4%/s và lượng thừa thành Khiên Tạm 15%.
- **Behemoth Blade (Zacian)**: Đòn Giant Slayer chỉnh thành $\times 1.45$ sát thương thường trực lên Boss, và chỉ đạt $\times 2.0$ khi đánh vào Khiên Phase/Tera hoặc cửa sổ `VULNERABLE!`.
- **Ngân sách Rơi Trang Bị**: Phân nhóm 4 ngân sách (Offensive, Defensive, Sustain/Utility, Economy/Special) để đảm bảo mở rương luôn có sự đánh đổi chiến thuật.

---

## 7. Nâng Đỡ Pokémon Bậc Thấp & Loài Một Dạng (single)

### 7.1. Thức Tỉnh Toàn Diện Cho Loài Đơn Bậc (single)
Giữ nguyên hoàn toàn logic tiến hóa của loài 2 bậc và 3 bậc, chỉ nâng cấp nhánh `evoType === 'single'`:
- **Level 15 — Thức Tỉnh I (Despertar I)**: +25% Max HP, +15% Công cơ bản, +8% Tốc chạy, hồi 50% máu.
- **Level 30 — Thức Tỉnh Tối Thượng (Apex (+))**: +35% Tổng sát thương, +30% Max HP, +12% Tốc chạy, -10% Hồi chiêu, hồi 100% máu.
- **3 Nhánh Thức Tỉnh Chuyên Hóa (Awakening Crests)**: Mở bảng chọn 1 trong 3 nhánh tại Lv15 và Lv30:
  - *Cuồng Chiến (Berserker Crest)*: +15% Chí mạng, phóng kiếm khí theo hệ, sprite rực lửa vàng đỏ.
  - *Pháo Đài (Bastion Crest)*: +20% Giáp, khiên chắn 8% Max HP mỗi 5s và phát sóng đẩy lùi, vòng lục giác kim loại.
  - *Thần Tốc (Tempest Crest)*: +20% Tốc chạy, -15% Hồi chiêu, lướt để lại tàn ảnh gây 30% sát thương, vương miện thiên giới.

### 7.2. Thuật Toán Nén BST (BST Compression Cho Loài Single)
Áp dụng riêng cho các loài single có BST $< 520$:
$$\text{Stat}_{\text{eff}} = \text{Stat}_{\text{base}} \times \left(\frac{520}{\text{BST}}\right)^{0.30}$$
- Farfetch'd (BST 377) $\rightarrow \times 1.102$ (+10.2% Máu và Công gốc).
- Sableye (BST 380) $\rightarrow \times 1.099$ (+9.9%).
- Thần thú single (BST 680) $\rightarrow \times 0.923$ (-7.7%), cân bằng lại nhờ bộ chiêu Độc quyền cực mạnh.

### 7.3. Thuế Huyền Thoại & Thưởng Hắc Mã
- **Thưởng Hắc Mã (Rarity 1–2)**: +30% Xu cuối trận, +15% EXP trong trận, tặng +1 Reroll thẻ mỗi khi hạ Boss lớn (phút 9, 18, 27).
- **Thưởng Rarity 3**: +15% Xu cuối trận và +1 Reroll đầu trận.
- **Thuế Huyền Thoại (Rarity 5)**: Cần thêm +15% EXP mỗi cấp để bù lại sức mạnh vượt trội ngay từ Level 1.
- **Tâm Điểm Chiến Trường Hàng Ngày (Daily Spotlight)**: Mỗi ngày chọn ngẫu nhiên 5 loài Rarity $\le 3$ nhận +50% Xu, +25% EXP và Bùa Hộ Mệnh khởi đầu.

### 7.4. 10 Trang Bị Khóa Theo Loài Biểu Tượng (`js/data/items.js`)
1. **Light Ball (`lightball`)** (Pikachu/Raichu/Pichu): +45% sát thương chiêu Điện, phóng tia sét lan Chain Lightning trúng thêm 2 mục tiêu, mở khóa Volt Tackle bậc +.
2. **Thick Club (`thickclub`)** (Cubone/Marowak): +60% sát thương Vật Lý, Bonemerang bay nhanh hơn 35% và nảy thêm vòng bay khứ hồi thứ hai.
3. **Leek (`leek`)** (Farfetch'd/Sirfetch'd): +35% Tỉ lệ Chí mạng, +40% Sát thương Chí mạng, đòn chém quét kiếm khí rộng gấp đôi.
4. **Metal Powder (`metalpowder`)** (Ditto): +35% Giáp PDEF/SDEF và +25% Max HP kể cả sau khi Imposter biến hình, giảm 20% hồi chiêu sao chép.
5. **Deep Sea Tooth (`deepseatooth`)** (Clamperl/Huntail/Gorebyss): +55% Sát thương Phép, chiêu Nước tạo vòng xoáy hút quái.
6. **Lucky Punch (`luckypunch`)** (Chansey/Blissey/Happiny): Chuyển hóa 8% Max HP thành sát thương cộng thẳng vào mọi chiêu, +20% Chí mạng.
7. **Twisted Spoon (`twistedspoon_alakazam`)** (Dòng Alakazam): +35% Sát thương Tâm Linh, triệu hồi 2 muỗng ma thuật xoay quanh tự bắn đạn tầm nhiệt.
8. **Charcoal (`charcoal_torkoal`)** (Torkoal/Magcargo/Camerupt): +30% diện tích vùng Lửa, đứng trong lửa nhận +25% giáp và hồi 1.5% Max HP/s.
9. **Black Sludge (`blacksludge`)** (Pokémon hệ Độc): Hồi 1.2% Max HP/s, tỏa vệt bùn độc làm chậm 20% quái đuổi theo.
10. **Eviolite+ (`eviolite`)** (Pokémon chưa tiến hóa hết): Giữ +40% Giáp; nếu chọn "Hoãn Tiến Hóa" (giữ nguyên dạng nhỏ ở Lv15/30) được thưởng thêm +35% Tấn công và +20% Tốc chạy.

### 7.5. Nhiệm Vụ Loài In-Run, Thông Thạo Out-Run & Thành Tựu Hắc Mã
- **Nhiệm vụ Loài In-run**: Magikarp sống sót tới phút 5 chưa tiến hóa $\rightarrow$ Lv15 nhận cả Intimidate lẫn Moxie ẩn; Pikachu kích hoạt 150 phản ứng Điện $\rightarrow$ tặng Light Ball; Kén sâu bướm đạt Lv15 sớm $\rightarrow$ bướm nhận +25% tốc bay và miễn bẫy đất.
- **Thông Thạo Loài Out-run (Mastery 5 Cấp)**:
  - Cấp 1 (Đồng): Huy hiệu Đồng + 500 Xu.
  - Cấp 2 (Bạc): Chọn trước Ability Thường 2.
  - Cấp 3 (Vàng): Mở khóa chọn Hidden Ability trước trận.
  - Cấp 4 (Bạch Kim): Xuất trận kèm 1 trang bị khởi đầu cơ bản hoặc item đặc trưng loài.
  - Cấp 5 (Hoàng Kim): Mở skin Shiny lấp lánh và nhận vĩnh viễn +5% chỉ số cơ bản.
- **20 Thành Tựu Hắc Mã**: Mở rộng từ 139 lên 159 thành tựu (thắng bằng Pokémon Rarity 1, thắng với Eviolite không tiến hóa, gây 500k sát thương từ phản ứng nguyên tố, phá 10 Tera Shield...).

---

## 8. Nhiệm Vụ Khảo Sát & Phủ Kín 100% Toàn Diện (Full Coverage Task)

### 8.1. Công Cụ Kiểm Kê Tự Động (`tools/audit_coverage.js`)
Xây dựng script Node.js kiểm tra tự động 5 tiêu chí:
- **Kiểm kê 1.021 loài**: Tìm loài thiếu Ability, chỉ có 1 Ability hoặc thiếu chiêu STAB.
- **Kiểm kê kho Ability**: Quét toàn bộ Ability trong `pokedex.js` và `abilities.js` để đảm bảo 100% có logic xử lý trong game.
- **Kiểm kê Ma trận Chiêu thức**: Kiểm tra không có cặp chiêu nào cùng hệ trùng (Delivery + Canon Trait) và mỗi hệ có ít nhất 6 chiêu.
- **Kiểm kê Loài Single**: Xác định danh sách chính xác các loài single để kích hoạt Nén BST và Nhánh Thức Tỉnh.
- **Kiểm kê i18n**: Xác thực 100% chuỗi mô tả mới có đủ bản dịch `es`, `en`, `vi`.

### 8.2. Quy Trình 3 Bước Xử Lý Mọi Ability Chưa Có Trong Game
Khi công cụ kiểm kê phát hiện một Ability chưa có logic chuyên biệt, áp dụng cây quyết định 3 bước:
- **Bước 1 — Khớp vào 16 Families**: Nếu cơ chế tương đương 16 Families $\rightarrow$ thêm 1 dòng tham số vào `ability-families.js`.
- **Bước 2 — Thiết kế Cơ chế Đặc trưng**: Nếu là Ability biểu tượng có cơ chế độc nhất (như Imposter, Disguise, Stance Change, Protean) $\rightarrow$ viết hook chuyên biệt vào `abilities-ext.js`.
- **Bước 3 — Phân Nhóm Tiện Ích (Utility-Lite Archetype)**: Các Ability còn lại được map vào các nhóm hiệu ứng hữu ích:
  - Nhóm Thể lực & Né tránh: Tăng 10% né tránh đòn hoặc giảm 15% hiệu lực bẫy.
  - Nhóm Kinh tế & Thu thập: Tăng 20% bán kính hút ngọc hoặc tăng tỉ lệ rơi Berry/Xu.
  - Nhóm Kháng nguyên tố: Giảm 20% sát thương từ 1 hệ nguyên tố cụ thể.
  *Tuyệt đối không để sót bất kỳ Ability nào rơi vào trạng thái generic vô danh.*

### 8.3. Quy Trình Phủ Kín Chiêu Thức & Ma Trận 18 Hệ
- Kiểm tra toàn bộ 18 hệ, mỗi hệ đảm bảo có đủ các phong cách thi triển: 1 Melee/Dash, 1 Projectile/Homing, 1 Beam/Charge, 1 AoE/Nova/Quake, 1 Trap/Field/Vortex.
- Bổ sung nét Canon Trait cho các chiêu thức đang thiếu để mỗi chiêu mang linh hồn riêng như Anime/Game gốc.

### 8.4. Phủ Kín Dữ Liệu Loài Single
Toàn bộ các loài single có BST $< 520$ được tự động gắn cờ `singleCompression: true` để nhận chỉ số nén khi khởi tạo và mở bảng rút Thẻ Thức Tỉnh ở Lv15 và Lv30.

---

## 9. Bộ Kiểm Thử Tự Động Toàn Diện (Automated Testing Suite)

### 9.1. Các Bài Kiểm Thử Mới Bắt Buộc:
1. `tests/balance.test.cjs`:
   - Kiểm tra trần giảm sát thương tổng không vượt quá 85%.
   - Kiểm tra trần hút máu không vượt quá 4% Max HP/giây.
   - Kiểm tra hành lang sát thương đòn đánh Boss (sàn $\ge 4\%$, trần $40\%$).
   - Kiểm tra đường cong HP Boss 1–9 tăng trưởng mượt mà (tỉ lệ giữa 2 Boss liên tiếp nằm trong khoảng $\times 2.1 - \times 2.6$).
   - Kiểm tra sàn báo chiêu $\ge 0.6\text{s}$.
2. `tests/abilities.test.cjs`:
   - Kiểm tra toàn bộ 16 Family có hàm validate hợp lệ.
   - Kiểm tra 1.021 loài đều có ít nhất 1 Ability hợp lệ (không crash).
   - Kiểm tra các ca biên: đổi dạng tiến hóa, chết hồi sinh, aura không chồng lấn.
3. `tests/moves.test.cjs`:
   - Kiểm tra ma trận [18 Hệ $\times$ Delivery $\times$ Canon Trait] không có va chạm trùng lặp cùng hệ.
   - Kiểm tra chiêu độc quyền (Signature Moves) tuân thủ đúng 5 quy tắc tại `AGENTS.md`.
4. `tests/events.test.cjs`:
   - Kiểm tra bộ điều phối Director: không có 2 sự kiện lớn diễn ra đồng thời.
   - Kiểm tra nhịp thở 20s sau Boss.

### 9.2. Duy Trì Các Bộ Kiểm Thử Hồi Quy Sẵn Có:
- `node --test tests/i18n.test.cjs`: Kiểm tra 100% bản dịch đa ngữ.
- `node --test tests/buffs.test.cjs`: Kiểm tra các bùa lợi và item.
- `node --test tests/net.test.cjs`: Kiểm tra mã hóa nhị phân mạng P2P và tag `0x07 EVENT_WORLD`.

---

## 10. Lộ Trình Triển Khai Thực Thi Tối Ưu (Implementation Phases)

| Giai đoạn | Mục tiêu kỹ thuật | Các tệp tác động chính | Tiêu chí hoàn thành (DoD) |
|---|---|---|---|
| **Phase G0** | Hoàn tất xác minh mã nguồn & ghi chép báo cáo | `docs/audit/G0_findings.md`, `tools/balance_report.js` | Trả lời đủ 13 câu hỏi khảo sát thực tế từ mã nguồn. |
| **Phase G1** | Xây dựng Nền tảng Kỹ thuật Dùng Chung | `balance-caps.js`, `status-engine.js`, `damage-pipeline.js`, `ability-families.js`, `reactions.js`, `dev.html` | Khai báo vào `dev.html`, các hằng số và pipeline hoạt động, `tests/balance.test.cjs` xanh. |
| **Phase G2** | Đại Cải Tổ Cân Bằng & Ability/Move Biểu Tượng | `abilities-ext.js`, `ability-fx.js`, `enemies.js`, `player.js`, `items.js`, `moves.js` | Boss mượt đường cong, 28+ Ability định hình hoạt động, Thức tỉnh loài Single, 10 item loài, test xanh. |
| **Phase G3** | Phản Ứng Nguyên Tố & Nhiệm Vụ In-run/Out-run | `combat.js`, `run-quests.js`, `db.js`, `director.js` | 6 phản ứng nguyên tố kích nổ, nhiệm vụ loài in-run và hệ thống Mastery out-run hoạt động. |
| **Phase G4** | Sự Kiện Thế Giới & Chế Độ Vô Tận Đảo Lộn | `world-events.js`, `director.js`, `judgment.js`, `achievements.js` | 11 sự kiện nhịp nhàng, Thế Giới Đảo Lộn sau phút 30, 20 thành tựu Hắc Mã mở khóa. |
| **Phase G5** | Phủ Kín 100% Dữ Liệu & Đóng Gói Xuất Bản | `tools/audit_coverage.js`, `lang-*.js`, `tools/build.js` | Phủ kín 1.021 loài, 100% test pass, build pipeline chạy hoàn hảo và sinh `app.min.js`. |

---
*Kế hoạch này là kim chỉ nam kỹ thuật chính thức. Mọi bước triển khai tiếp theo được thực thi tuần tự, tối ưu và chuẩn xác từng dòng mã.*
