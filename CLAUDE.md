# CLAUDE.md — Bereket Ziraat Frontend Kuralları

## Her Oturumda İlk Yapılacak
- **`frontend-design` skill'ini çağır** — her frontend kodu yazmadan önce, istisnasız.

## Proje Bilgisi
- **Şirket:** Bereket Ziraat
- **Site türü:** Gübre ürünleri showroom (satış yok — sadece tanıtım)
- **Dil:** Türkçe
- **Veritabanı:** MongoDB (NoSQL) — ürün verileri buradan gelecek
- **Admin:** Ayrı bir /admin sayfası ile ürün ekleme/silme/düzenleme yapılacak

## Referans Görseller
- Referans görsel varsa: layout, spacing, tipografi ve rengi birebir taklit et.
- Referans görsel yoksa: aşağıdaki marka kurallarına göre sıfırdan tasarla.
- Çıktıyı screenshot al, referansla karşılaştır, farkları düzelt, tekrar screenshot al.
- En az 2 karşılaştırma turu yap. Görünür fark kalmayınca veya kullanıcı onaylayana kadar dur.

## Yerel Sunucu
- **Her zaman localhost'tan serve et** — file:/// URL'den screenshot alma.
- Dev sunucusunu başlat: `node serve.mjs` (proje kökünü http://localhost:3000'de serve eder)
- serve.mjs proje kökünde bulunur. Screenshot almadan önce arka planda başlat.
- Sunucu zaten çalışıyorsa ikinci instance başlatma.

## Screenshot Workflow
- Puppeteer ve Chrome cache yolları: **CLAUDE.local.md** dosyasına bak (makineye özel, git'e girmez)
- Kurulum için: `CLAUDE.local.md.example` dosyasını kopyala → `CLAUDE.local.md` adıyla kaydet, kendi yollarını gir.
- Screenshot komutu: `node screenshot.mjs http://localhost:3000`
- Kayıt yeri: `./temporary screenshots/screenshot-N.png` (otomatik numaralandırılır)
- Etiketli kayıt: `node screenshot.mjs http://localhost:3000 etiket`
- screenshot.mjs proje kökünde. Olduğu gibi kullan.
- Screenshot sonrası PNG'yi Read tool ile oku ve analiz et.

## Çıktı Varsayılanları
- Tek index.html dosyası, tüm stiller inline — kullanıcı aksini söylemedikçe
- Tailwind CSS CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder görseller: `https://placehold.co/GENISLIKxYUKSEKLIK`
- Gerçek ürün görseli varsa /brand_assets/images/ klasöründen kullan
- Mobile-first responsive tasarım

## Marka Varlıkları (Brand Assets)
- Tasarlamadan önce brand_assets/ klasörünü kontrol et.
- Varlıklar mevcutsa kullan — placeholder kullanma.
- Logo varsa kullan. Renk paleti tanımlıysa o değerleri kullan.

### Bereket Ziraat Renk Paleti
Ana yeşil koyu:   #27500A  (nav, butonlar, başlıklar)
Ana yeşil orta:   #3B6D11  (hover, border)
Ana yeşil açık:   #639922  (ikincil metin, etiketler)
Açık yeşil zemin: #EAF3DE  (ürün görseli arka planı, kartlar)
Yeşil accent:     #97C459  (hover border, vurgu)
Amber altın:      #EF9F27  (Yeni etiketi, vurgu)
Amber koyu:       #BA7517  (amber metin)
Krem:             #fdf8f0  (sayfa genel arka plan)

### Tipografi
- Başlık fontu: Google Fonts'tan Playfair Display veya DM Serif Display
- Gövde fontu: Inter veya DM Sans
- Büyük başlıklarda: letter-spacing -0.03em, line-height 1.15
- Gövde metinde: line-height 1.7

### Ürün Görseli Kuralları
- Arka plan: #EAF3DE (açık yeşil) — her ürün kartı için
- Görsel hizalama: dikey ve yatay orta
- Gerçek görsel yoksa yeşil tonlu placeholder + kategori ikonu

## Anti-Jenerik Kurallar
- Varsayılan Tailwind paletini kullanma (indigo-500, blue-600 vb.). Bereket Ziraat paletini kullan.
- Düz shadow-md kullanma. Katmanlı, renk tonlu, düşük opaklıklı gölgeler kullan.
- Başlık ve gövde için aynı fontu kullanma. Yukarıdaki font çiftini uygula.
- Sadece transform ve opacity animate et. Asla transition-all kullanma.
- Her tıklanabilir element için hover, focus-visible ve active durumu zorunlu.
- Yüzeylerin katmanlama sistemi olsun: base, elevated, floating.

## Sayfa Yapısı
/           Ana showroom (ürün listesi, filtreler, ürün detay popup)
/admin      Admin girişi ve ürün yönetim paneli
/urun/:id   Ürün detay sayfası (opsiyonel)

### Showroom Sayfası Bileşenleri
1. Navbar — Logo sol, Showroom etiketi sağ. Koyu yeşil arka plan.
2. Hero banner — Kısa slogan, istatistik çubuğu. Koyu yeşil zemin.
3. Filtre çubuğu — Kategori filtreleri (Kalsiyum & Bor, Azot & Fosfor, Mikro Elementler, Organik, Sulama, Ekipman)
4. Ürün grid — Kart: yeşil fon + görsel, kategori pill, marka, ad, kısa açıklama, etiketler, ambalaj, Incele butonu
5. Ürün detay modal — Büyük görsel, tam açıklama, garanti içerik tablosu, dozaj, etiketler

### Admin Paneli Bileşenleri
1. Giriş ekranı — Kullanıcı adı + şifre (demo: admin / 1234)
2. Ürün listesi tablosu — Görsel, ad, kategori, stok, düzenle/sil butonları
3. Ürün ekleme formu — Ad, kategori, açıklamalar, içerik tablosu, dozaj, ambalaj, görsel, stok
4. Görsel yükleme — Dosya seç veya sürükle-bırak, yeşil fonda önizleme

## Hard Kurallar
- Referansta olmayan bölüm veya içerik ekleme
- Referans tasarımı geliştirme — eşleştir
- Tek screenshot turunda durma
- transition-all kullanma
- Varsayılan Tailwind mavi/indigo kullanma
- Satış elementi ekleme (fiyat, sepet, satın al) — showroom sitesidir
- Türkçe içerik için İngilizce placeholder kullanma
