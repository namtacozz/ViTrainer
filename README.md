# ViTrainer · Sinh Tồn Pokémon & Thám Hiểm Hầm Ngục

Trò chơi hành động sinh tồn roguelite (bullet-heaven / horde survival) phong cách **Pokémon Mystery Dungeon**, tích hợp đầy đủ **1021 Pokémon từ cả 9 thế hệ** (từ Kanto đến Paldea), hình thái Mega Evolution, Pokémon Shiny lấp lánh và hệ thống gacha vé chiêu mộ theo từng vùng. Âm nhạc và hiệu ứng âm thanh retro 16-bit sống động được sáng tác riêng cho game.

Xây dựng trên nền tảng HTML5 + Canvas 2D + JavaScript thuần (Vanilla JS), hoàn toàn không cần server dựng sẵn, tải cực nhanh, tương thích mọi trình duyệt hiện đại trên PC, máy tính bảng và điện thoại di động.

> [!IMPORTANT]
> **Thông tin Dự án & Bản quyền (Authorship & Official Info)**
> - **Tên trò chơi chính thức**: ViTrainer
> - **Đội ngũ phát triển chính thức**: ViTeam
> - **Mã nguồn GitHub**: [https://github.com/namtacozz/ViTrainer](https://github.com/namtacozz/ViTrainer)
> - **Trang web chính thức (GitHub Pages)**: [https://namtaccozz.github.io/ViTrainer/](https://namtaccozz.github.io/ViTrainer/)
> - **Tuyên bố phi lợi nhuận & Token**: ViTrainer là fan-game hoàn toàn **MIỄN PHÍ và PHI LỢI NHUẬN**, không có quảng cáo, không nạp tiền, không phát hành bất kỳ đồng tiền ảo (crypto), token hay NFT nào. Mọi hoạt động yêu cầu trả phí nhân danh trò chơi đều là giả mạo.

---

## 🎮 Cách Chơi

Mở trực tiếp liên kết web trên trình duyệt hoặc chạy `index.html`. Tạo tài khoản hoặc chơi ngay dưới chế độ Khách, hoàn thành bài kiểm tra tính cách để nhận bạn đồng hành khởi đầu và bước vào hầm ngục sinh tồn.

### Phím Điều Khiển Trên Máy Tính (PC):

| Phím | Thao tác |
|---|---|
| `W` `A` `S` `D` / Các phím mũi tên | Di chuyển nhân vật |
| `1` `2` `3` `4` | Chọn chiêu thức chiến đấu chủ động |
| `Q` / `E` | Chuyển đổi nhanh giữa các chiêu thức |
| `5` `6` `7` `8` | Kích hoạt Ngọc Thần Bí (Orbs) |
| `Esc` / `P` | Tạm dừng trận đấu (Pause) |

### Trên Thiết Bị Di Động & Máy Tính Bảng (Màn Hình Ngang):
- Chạm và kéo ngón tay bất kỳ đâu trên màn hình để di chuyển (cần điều khiển ảo Joystick xuất hiện tại điểm chạm).
- Nhấp trực tiếp vào biểu tượng chiêu thức bên dưới để kích hoạt, nhấp vào ngọc để sử dụng và nút góc trên cùng bên phải để tạm dừng.
- Có thể cài đặt thành ứng dụng độc lập trên màn hình chính qua tính năng "Thêm vào màn hình chính" (PWA).
- Trong menu **Cài Đặt (Settings)**: Có thể tùy chỉnh âm lượng, chất lượng đồ họa tự động, hiển thị số sát thương, chế độ chống rung màn hình và quản lý tài khoản.

### Kết Hợp Chiêu Thức & Tay Cầm (Gamepad):
- Hỗ trợ đầy đủ tay cầm Xbox, PlayStation và Nintendo Switch: Cần analog hoặc D-pad để di chuyển, `LB`/`RB` đổi chiêu, `X` dùng ngọc, `Y` đổi ngọc, `Start` tạm dừng.
- **Cơ chế Dung Hợp Chiêu Thức (Bond System)**: Mỗi lần đánh bại một Boss Huyền Thoại trong Vết Nứt (Rift), bạn có thể dung hợp tối đa 4 chiêu thức vào cùng 1 ô kỹ năng để cùng kích hoạt một lúc.

---

## 🌟 Tính Năng Nổi Bật

1. **Hệ Thống 1021 Pokémon & Shinies**:
   - Tất cả Pokémon từ Gen 1 đến Gen 9 đều có thể làm bạn đồng hành.
   - Tỷ lệ xuất hiện Shiny 1/4096 ngoài hoang dã và 1/100 trong vòng quay Gacha. Mũi tên định vị sẽ chỉ đường khi có Shiny xuất hiện trên bản đồ.
2. **Cơ Chế Tiến Hóa Cân Bằng**:
   - Tiến hóa trong trận tại Level 15 và Level 30, hồi phục 50% HP.
   - Chuỗi thức tỉnh hình thái Mega, Primal Reversion, Ultra Burst và các chiêu thức độc quyền (Signature Moves).
3. **18 Đấu Trường Vết Nứt Thứ Nguyên (Rifts)**:
   - Các cánh cổng không gian mở ra ngẫu nhiên đưa người chơi vào đấu trường nguyên tố đối đầu các vị thần bảo hộ (Mewtwo, Rayquaza, Dialga, Palkia, Giratina, v.v.).
   - Trận chiến định mệnh Thẩm Phán Arceus xuất hiện tại phút thứ 30.
4. **Hệ Thống Chơi Hợp Tác Online (Co-op Tối Đa 8 Người)**:
   - Kết nối mạng ngang hàng WebRTC qua máy chủ STUN miễn phí của Google.
   - Chia sẻ kinh nghiệm, đồng bộ trận đấu theo thời gian thực và có thể hồi sinh đồng đội khi đứng cạnh trong 3 giây.
5. **Lưu Trữ Đám Mây & Bảng Xếp Hạng (Cloud Save & Rankings)**:
   - Tích hợp Firebase Authentication và Realtime Database hoàn toàn miễn phí.
   - Đồng bộ tiến trình chơi xuyên suốt giữa máy tính và điện thoại.

---

## 🛠️ Quy Chuẩn Phát Triển & Kiến Trúc Dự Án

ViTrainer tuân thủ quy chuẩn phát triển nghiêm ngặt theo **[`AGENTS.md`](AGENTS.md)**:

1. **Chỉ chỉnh sửa `dev.html`**:
   - Tuyệt đối không chỉnh sửa trực tiếp `index.html` (file này được sinh tự động qua quá trình nén Terser và bảo vệ mã).
2. **Chuỗi Pipeline Biên Dịch (Build Pipeline)**:
   ```bash
   node tools/build.js && node tools/export_data.js && python tools/make_seo_pages.py
   ```
3. **Kiểm Thử Trước Khi Commit (Pre-Commit Testing)**:
   ```bash
   node --test tests/i18n.test.cjs tests/buffs.test.cjs tests/net.test.cjs tests/balance.test.cjs tests/abilities.test.cjs tests/moves.test.cjs
   ```
4. **Hạ Tầng Không Chi Phí (Zero Cost Policy)**:
   - GitHub Pages làm hosting tĩnh.
   - Cloudflare CDN & DNS miễn phí.
   - Firebase gói miễn phí Spark.
   - Google STUN server miễn phí cho Co-op WebRTC.

---

## 📚 Trung Tâm Tài Liệu Chi Tiết (Documentation Hub)

Xem chi tiết trong thư mục [`docs/`](docs/):
- **[`docs/QUICK_REFERENCE.md`](docs/QUICK_REFERENCE.md)**: Bảng tra cứu nhanh tính năng và cách sửa lỗi tốc hành.
- **[`docs/MASTER_PLAN.md`](docs/MASTER_PLAN.md)**: Kế hoạch tổng thể và ma trận phát triển toàn diện.
- **[`docs/GAMEPLAY_MANUAL.md`](docs/GAMEPLAY_MANUAL.md)**: Cẩm nang hướng dẫn luật chơi và cơ chế chuyên sâu.
- **[`docs/ARCHITECTURE_AND_SYSTEMS.md`](docs/ARCHITECTURE_AND_SYSTEMS.md)**: Thiết kế kiến trúc mã nguồn và luồng thực thi hệ thống.
- **[`docs/moves.md`](docs/moves.md)**, **[`docs/abilities.md`](docs/abilities.md)**, **[`docs/items.md`](docs/items.md)**, **[`docs/pokemons.md`](docs/pokemons.md)**, **[`docs/bosses.md`](docs/bosses.md)**: Dữ liệu chi tiết từng hệ thống.
- **[`docs/LOCALIZATION.md`](docs/LOCALIZATION.md)**: Hệ thống dịch thuật i18n (Tiếng Việt & Tiếng Anh).
- **[`docs/XUAT_BAN.md`](docs/XUAT_BAN.md)**: Quy trình biên dịch, kiểm thử và xuất bản game.
- **[`docs/TEN_MIEN.md`](docs/TEN_MIEN.md)**: Hướng dẫn cấu hình tên miền và bảo mật HTTPS.

---

## ⚖️ Giấy Phép & Ghi Nhận Công Trạng (License & Credits)

- Sprites nhân vật lấy từ [SpriteCollab](https://github.com/PMDCollab/SpriteCollab) theo giấy phép **CC BY-NC 4.0** (phi thương mại, ghi nhận công trạng đầy đủ trong [`CREDITS.md`](CREDITS.md)).
- Phông chữ Pixelify Sans phát hành theo giấy phép SIL Open Font License (OFL).
- Pokémon và thương hiệu liên quan thuộc quyền sở hữu của **Nintendo**, **Creatures Inc.** và **GAME FREAK**.
- ViTrainer là một dự án fan phi lợi nhuận phục vụ cộng đồng yêu thích thể loại roguelite sinh tồn Pokémon.
