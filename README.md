# The Safe Place 🌙✨

> *A little room where you can put the weight down for a moment.*

Sebuah website interaktif mobile-first bergaya anime sinematik 2.5D di malam berhujan yang dibuat khusus untuk memberikan ketenangan dan pelukan hangat bagi pasangan yang sedang lelah dengan beban pekerjaan.

Di sini tidak ada skor, deadline, target produktivitas, atau formulir. Cukup masuk ke kamar, nikmati alunan musik *Always With Me* (Spirited Away / Ghibli) dan rintik hujan lembut, lalu jelajahi lima objek hangat di dalam kamar.

---

## ✨ Fitur Utama

1. **Cinematic 2.5D Layered Anime Scene:**
   - Ilustrasi kamar anime berkualitas tinggi terinspirasi gaya visual Makoto Shinkai & Studio Ghibli.
   - Pemandangan jendela malam berhujan dengan lampu kota temaram, lampu tidur amber hangat, dan fairy lights.
   - Efek kedalaman 2.5D berlapis (*far background, room, furniture & stitch plush, semantic hotspots, foreground bokeh & dust motes*).

2. **5 Objek Interaktif (Exact 5 Primary Hotspots):**
   - 🛏️ **Kasur (Bed) — Rest Without Guilt:** Menegaskan bahwa istirahat bukan berarti menyerah, dilengkapi tombol interaktif *"kita istirahat yu"* yang memicu animasi selimut hangat.
   - 💌 **Surat (Letter) — A Letter From Me:** Surat kasih sayang bergaris kertas estetik yang mengingatkan bahwa dia dicintai apa adanya, bukan hanya saat produktif (teks HTML murni, nyaman dibaca di layar HP).
   - 🧸 **Boneka Stitch (Plush) — A Hug From Me:** Sahabat empuk di atas kasur yang meminjamkan pelukan virtual dengan tombol interaktif *"Peluk bonekanya"*.
   - 💻 **Laptop — Work Can Wait:** Mengingatkan bahwa pekerjaan boleh menunggu dan nilainya bukan ditentukan dari produktivitas semata.
   - 💡 **Lampu Meja (Lamp) — A Little Light:** Secercah cahaya harapan untuk melewati hari yang berat selangkah demi selangkah, dengan tombol sakelar pengubah suasana cahaya.

3. **Audio Ambience yang Menenangkan:**
   - Lagu latar instrumental *"Always With Me"* (Ghibli) dipadukan dengan sintesis suara rintik hujan lembut (*pink noise filter*) dari Web Audio API.
   - Fitur *autoplay on entry*: Musik mulai mengalun secara otomatis saat menekan tombol *"Masuk ke kamar"* pada layar sambutan awal.
   - Tombol on/off mute selalu tersedia di bilah atas.

4. **Multi-Tier Motion & Gyroscope Engine:**
   - **Tingkat 1 (Gyroscope):** Tersedia tombol eksplisit *"✨ Efek Gerak"* (ramah privasi, mendukung izin iOS 13+ & Android).
   - **Tingkat 2 (Pointer Parallax):** Di laptop/desktop, sudut pandang kamera bergeser lembut mengikuti kursor mouse.
   - **Tingkat 3 (Ambient Breathing):** Saat perangkat ditaruh diam atau sensor mati, scene bernapas halus secara otomatis seperti lukisan anime hidup.
   - **Tingkat 4 (Prefers-Reduced-Motion):** Sepenuhnya menghormati setelan hemat gerak sistem pengguna.

5. **Aksesibilitas & Kerapian Teks:**
   - Touch target $\ge 48 \times 48\text{px}$ yang empuk di jempol layar ponsel.
   - Navigasi keyboard penuh (`Tab`, `Enter`, `Space`, `Escape` untuk menutup dialog).
   - Fokus keyboard otomatis kembali ke objek pemantik saat modal ditutup.
   - Bebas pelacak/analitik, tanpa backend, dan tanpa database.

---

## 📁 Struktur Proyek

```text
a-little-safe-place/
├── index.html               # Halaman utama dengan viewport 2.5D & 5 hotspot
├── README.md                # Dokumentasi proyek & panduan deploy
├── PRD.md                   # Dokumen kebutuhan produk
├── AGENTS.md                # Panduan batasan dan standar teknis
├── assets/
│   ├── images/
│   │   ├── room/            # Artwork kamar tidur anime (WebP & JPG)
│   │   └── objects/         # Aset transparan boneka Stitch (WebP & PNG)
│   ├── sounds/
│   │   └── always with me-ghibli.mp3 # Lagu latar Ghibli
│   ├── ui/
│   │   └── icons.svg        # Sprite ikon SVG
│   └── ASSET_CREDITS.md     # Lisensi, atribusi, dan asal-usul aset
├── src/
│   ├── main.js              # Bootstrap aplikasi, autoplay masuk kamar, & UI handler
│   ├── scene.js             # Koordinator transformasi 2.5D layer
│   ├── interactions.js      # Sistem dialog modal & mikro-interaksi objek
│   ├── motion.js            # Engine sensor gyroscope, pointer, LERP & fallback
│   ├── audio.js             # Audio engine Ghibli & sintesis hujan Web Audio API
│   └── content.js           # Sentralisasi pesan & teks bahasa Indonesia
└── styles/
    ├── main.css             # Desain sistem, warna anime, tipografi, & UI bar
    ├── scene.css            # Komposisi 2.5D, depth layer, & koordinat hotspot
    ├── panels.css           # Glassmorphism modal & kertas surat
    └── motion.css           # Keyframe animasi & kepatuhan prefers-reduced-motion
```

---

## 🚀 Menjalankan Secara Lokal

Karena proyek ini menggunakan modul ES6 modern dan aset statis murni, jalankan menggunakan server HTTP statis lokal sederhana:

### Opsi A — Python
```bash
python -m http.server 8080
```
Buka browser di: `http://localhost:8080`

### Opsi B — Node.js / npx
```bash
npx serve .
```

---

## 🌐 Panduan Deploy ke GitHub Pages

Proyek ini 100% statis dengan path relatif (`./assets/...`, `./src/...`, `./styles/...`), sehingga langsung berfungsi tanpa perlu konfigurasi build tools:

1. **Push ke GitHub Repository:**
   ```bash
   git remote add origin https://github.com/gifts-for-u/a-little-safe-place.git
   git branch -M main
   git push -u origin main
   ```

2. **Aktifkan GitHub Pages:**
   - Buka halaman repositori di GitHub: `https://github.com/gifts-for-u/a-little-safe-place`
   - Masuk ke tab **Settings** $\rightarrow$ **Pages** (di bilah menu sebelah kiri).
   - Pada bagian **Build and deployment**:
     - **Source:** Pilih `Deploy from a branch`.
     - **Branch:** Pilih `main` (atau `master`) dan folder `/ (root)`.
     - Klik **Save**.
   - Tunggu sekitar 1–2 menit, website akan aktif di URL:
     `https://gifts-for-u.github.io/a-little-safe-place/`

---

## 📜 Lisensi & Kredit Aset

Detail lengkap mengenai sumber ilustrasi, lagu, dan karakter Stitch dapat dilihat di [assets/ASSET_CREDITS.md](assets/ASSET_CREDITS.md).
