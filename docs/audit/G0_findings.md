# Báo Cáo Khảo Sát Kỹ Thuật G0 (G0 Technical Audit Findings)

> Dự án: ViTrainer (PokeSurvivor) · Ngày khảo sát: 01/11/2026

## 1. Kết quả xác minh 13 câu hỏi mã nguồn

1. **Cấu trúc Ability hiện hành**:
   - `G.ABIL` trong `js/data/abilities.js` định nghĩa tên quốc tế cho các ability.
   - `G.DEX_ABIL` gán `[hability1, ability2, hiddenAbility]` cho 1.021 loài.
   - `G.AbilityFX` trong `js/data/ability-fx.js` định nghĩa logic các hook: `start`, `out`, `hit`, `inMul`, `absorb`, `dodge`, `hurt`, `contact`, `tick`, `kill`, `speed`, `healMul`, `statusCd`, `critMul`, `summon`.
   - Nếu ability chưa có trong `G.AbilityFX.FX`, fallback về hàm `generic(mon)` cộng `+8% STAB`.

2. **Bể chiêu thức người chơi**:
   - Khai báo trong `js/data/moves.js`.
   - 139 chiêu được phân chia vào `POOL[type]` và `POOL.normal`.
   - Chiêu độc quyền khai báo trong `EXCLUSIVE_BY_DEX` với `exclusive: true`.

3. **Hệ thống trạng thái & Stage Debuff**:
   - Trạng thái cơ bản (`burn`, `poison`, `freeze`, `slow`) nằm rải rác trong `combat.js` và `enemy.js`.
   - Chưa có hệ thống Stage Buff/Debuff $[-3, +3]$ tập trung.

4. **Trang bị Choice Band (`choiceband`)**:
   - Trong `js/data/items.js`: `choiceband` tăng `atkMul *= 1.4`. Chưa khóa cứng chọn chiêu tại `levelup.js`.

5. **Công thức `bossScale(t)`**:
   - Trong `js/data/enemies.js`: HP boss scale tăng gấp hàng nghìn lần từ phút 3 đến phút 27, trong khi sát thương chỉ tăng ~37 lần. Boss 5 lên 6 có bước nhảy phẳng về sát thương.

6. **Máu & Sát thương người chơi**:
   - Máu người chơi dao động từ 100 - 350+. Thẻ giáp giảm tối đa 70%. Cần `DMG_REDUCE_CAP = 0.85` và `LEECH_CAP_PER_SEC = 0.04`.

7. **Boss Co-op**:
   - Cần đảm bảo công thức scale chuẩn: `HP_Coop = HP_Solo * (1 + 0.60 * (N - 1))` và One-Shot Protection 40% tính theo từng người.

8. **Hiệu năng & Hạt VFX**:
   - Giới hạn hạt đồng thời: 250 trên PC, 120 trên Mobile.

9. **Bộ giải mã nhị phân**:
   - `js/net/codec.js` sẵn sàng cho tag `0x07 EVENT_WORLD`.

10. **Thời tiết**:
    - Quản lý tập trung trong `G.Weather.current` (`js/systems/weather.js`), tích hợp mượt với phản ứng nguyên tố.

11. **Tài nguyên VFX**:
    - `G.FX` trong `js/entities/fx.js` cung cấp `ring`, `spark`, `line`, đạn projectile, sẵn sàng cho các VFX procedural.

12. **Shop, Thành tựu, Gacha**:
    - `js/data/achievements.js` có 139 thành tựu. Mở rộng lên 159 thành tựu Hắc Mã.

13. **Hành vi quái thường**:
    - `js/entities/enemy.js` đã tách biệt các hành vi: chase, charger, ranged, zoner.
