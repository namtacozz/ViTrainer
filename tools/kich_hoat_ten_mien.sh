#!/usr/bin/env bash
# Bước cuối cùng để kích hoạt tên miền riêng cho ViTrainer (xem docs/TEN_MIEN.md).
#   DRY=1 bash tools/kich_hoat_ten_mien.sh   Chạy thử: chuẩn bị mọi thứ, hiển thị tệp sẽ đẩy và khôi phục trạng thái cũ
#   bash tools/kich_hoat_ten_mien.sh         Chuẩn bị và thực hiện commit (lệnh push và cấu hình GitHub Pages thực hiện riêng)
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=vitrainer.com

# 1. Biên dịch trò chơi với các khối SEO, xuất dữ liệu và tạo trang tĩnh hai ngôn ngữ (vi, en).
node tools/build.js
node tools/export_data.js
python tools/make_seo_pages.py

# 2. Tạo tệp CNAME cho GitHub Pages nếu dùng tên miền tùy chỉnh.
echo "$DOMAIN" > CNAME

FILES=(CNAME .gitignore index.html js/app.min.js 404.html robots.txt sitemap.xml assets/icons/ViTrainer.png
       en cam-nang chieu-thuc huyen-thoai pokedex shinies he-pokemon vat-pham thanh-tuu tin-tuc ung-ho quyen-rieng-tu
       docs/SEO.md docs/TEN_MIEN.md tools/export_data.js tools/make_seo_pages.py tools/kich_hoat_ten_mien.sh)
git add "${FILES[@]}"
echo "--- Danh sách tệp sẽ được đẩy lên:"
git diff --cached --stat | tail -5
git diff --cached --name-only | grep -c . | xargs echo "Tổng số tệp:"

deshacer() { git reset -q; rm -f CNAME; node tools/build.js; }

# Tuyệt đối không để lộ dữ liệu nhạy cảm hoặc cá nhân.
if git diff --cached -- . ':(exclude)tools/kich_hoat_ten_mien.sh' | grep -qiE "jonathanclase78|assesingamerxd|CONTACTOS_CREADORES"; then
  echo "LỖI: Phát hiện dữ liệu không hợp lệ trong bản commit"; deshacer; exit 1
fi

if [ "${DRY:-0}" = "1" ]; then
  deshacer
  echo "--- Chạy thử hoàn tất: Đã khôi phục toàn bộ trạng thái ban đầu"
  exit 0
fi

git commit -q -m "Tên miền và SEO: Đồng bộ trang tĩnh Tiếng Việt và Tiếng Anh, sitemap và CNAME"
echo "--- Đã hoàn tất commit. Tiếp theo: Chạy git push và cấu hình Domain/HTTPS trên GitHub Pages."
