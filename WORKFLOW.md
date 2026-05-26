# WORKFLOW.md – Dari Idea ke Realiti (Dengan Bantuan AI Ejen)

> **"Jangan bina istana di awan. Mulakan dengan pelan tindakan yang konkrit."**

Dokumen ini menerangkan langkah-langkah sistematik untuk membawa idea anda menjadi kod yang berfungsi, menggunakan gabungan perancangan AI percuma, penyediaan fail tempatan, dan pembangunan berbantukan ejen AI di dalam IDE.

---

## Aliran Kerja 4 Fasa

### Fasa 1: Idea & Perancangan (Chat AI Percuma)

**Alatan:**  
Gunakan mana-mana chat AI percuma yang menyokong perbualan mendalam. Pilihan yang biasa digunakan (semuanya *free tier*):

| Model | Platform/Capaian | Kekuatan |
|-------|------------------|----------|
| **DeepSeek Instant / Expert (Web/App)** | chat.deepseek.com | Reasoning pantas, analisis teknikal mendalam, percuma tanpa had ketara. Sangat sesuai untuk idea awal dan perancangan. |
| **Gemini Flash-Lite / Flash 3.5 (Free)** | gemini.google.com | Konteks panjang (sehingga 1M token), integrasi Google, sesuai untuk curahan idea dan eksplorasi kompleks. |
| **ChatGPT (Free)** | chat.openai.com | Alternatif dengan keupayaan penaakulan yang baik. |

**Langkah:**
1. **Lontarkan Idea (Draft):**  
   Tulis idea dalam bahasa biasa, berikan sebanyak mungkin konteks.  
   *Contoh:* "Saya nak bina aplikasi inventori kecil untuk kedai runcit. Stok masuk/keluar, laporan ringkas, dan boleh guna offline."

2. **Minta AI Buat Reasoning:**  
   Suruh AI menganalisis keperluan, mencadangkan struktur fail, aliran data, dan teknologi paling ringkas.  
   *Prompt:* "Analisis keperluan teknikal aplikasi inventori ini. Apakah struktur fail paling minima? Cadangkan teknologi yang sesuai dan kenapa."

3. **Jana Pelan Tindakan (Execution Plan):**  
   Dapatkan output dalam bentuk senarai tugas dan struktur folder.  
   *Prompt:* "Hasilkan `tasks.md` dengan senarai tugas ikut keutamaan, dan cadangan struktur folder."

4. **Simpan Hasil Perbualan:**  
   Salin teks penting ke dalam fail tempatan (contoh: `plan/tasks.md`, `plan/architecture-notes.md`). Jika mahu, komit terus ke repo sebagai dokumentasi projek.

> **Petua:** DeepSeek Expert sangat baik untuk analisis teknikal (contoh: "kenapa pilih SQLite berbanding JSON?"). Gemini Flash bagus untuk meneroka idea liar dan melihat gambaran besar.

---

### Fasa 2: Penyediaan Fail Tempatan (Local Setup)
Matlamat: Wujudkan persekitaran projek di komputer sendiri **sebelum** membuka IDE.

**Laluan A: Projek Baru (GitHub)**
1. Buat repositori baru di GitHub.
2. Klon ke mesin tempatan: `git clone <url> && cd <folder>`
3. Salin semua fail blueprint (`SKILL.md`, `DESIGN.md`, dll.) ke dalam repo sebagai rujukan (atau biarkan ia di repo utama blueprint, dan mula projek baru dalam folder berasingan).

**Laluan B: Projek Baru (Local sahaja)**
1. Cipta folder baru: `mkdir my-project && cd my-project`
2. Wujudkan struktur asas mengikut saranan AI tadi (`index.html`, `style.css`, `script.js`, `README.md`).

**Laluan C: Download ZIP dari GitHub**
1. Jika anda ingin gunakan template siap (contohnya dari repositori blueprint ini), pergi ke GitHub repo > Code > Download ZIP.
2. Ekstrak ZIP ke dalam folder projek tempatan.
3. Selepas ekstrak, padam fail `.git` jika ada, untuk mulakan sejarah git baru:  
   `rm -rf .git && git init`

> **Nota:** Sentiasa pastikan semua kebergantungan (contoh: Python `venv`, Node `nvm`) diurus mengikut `SKILL.md`. Gunakan `ls -la`, `htop`, dan `pm2` untuk memastikan persekitaran bersih.

---

### Fasa 3: Bengkel AI-Agent di IDE
Alatan: **VS Code / Antigraviti / mana-mana IDE** + **OpenCode** dengan model **DeepSeek V4 (Flash Free / Nvidia Nemotron)**.

1. **Buka Folder Projek dalam IDE.**  
   Contoh: `code .` (jika guna VS Code CLI).

2. **Pasang OpenCode Extension (atau setara):**  
   Baca dokumentasi OpenCode untuk konfigurasi. Anda perlukan API key (jika guna cloud) atau model tempatan.  
   *Model cadangan:*
   - **DeepSeek V4 Flash (Free Tier):** Lebih besar parameter, percuma setakat ini. Sangat baik untuk reasoning dan penjanaan kod.
   - **Nvidia Nemotron (Free via OpenCode):** Alternatif kukuh, dioptimumkan untuk tugas teknikal.

3. **Gunakan AI-Ejen dalam IDE:**
   - **Chat Panel:** Berkomunikasi dengan ejen, beri arahan seperti "Tambah fitur dark mode ke style.css" atau "Debug kenapa fungsi simpan gagal".
   - **Inline Code Generation:** Tekan `Ctrl+K` (pintasan biasa) dan taip deskripsi kod. Ejen akan tulis kod yang difahami.
   - **Code Review:** Pilih blok kod dan minta ejen semak (contoh: "Review kod ini untuk security issue").
   - **Refactoring:** "Pisahkan fungsi ini kepada dua fungsi yang lebih kecil dan modular."

4. **Uji Setiap Perubahan Secara Manual:**  
   Jalankan aplikasi secara lokal (Live Server, Python `uvicorn`, dll.). Perhatikan `console.log`, `PM2 logs`, atau `terminal output`. Inilah `Proof of Technology` sebenar.

5. **Gunakan Terminal IDE untuk Git dan Pengurusan:**  
   Lakukan commit atomik:  
   ```bash
   git add -p
   git commit -m "feat: implementasi tag system"
   ```

---

### Fasa 4: Ulangan & Refleksi (Iterate)
Aliran kerja ini bukan linear, ia kitaran berterusan:

1. **Bina** (Build) – hasilkan satu ciri.
2. **Uji** (Break) – cuba pecahkan, cari kelemahan.
3. **Baiki** (Fix) – gunakan AI untuk diagnosis, tapi fahami puncanya.
4. **Dokumentasi** (Log) – tulis apa yang dipelajari dalam Log Book (tab di laman suite ini).

---

## Alatan yang Digunakan (Ringkasan)

| Fasa | Alatan | Penerangan |
|------|--------|------------|
| Idea & Rancang | DeepSeek Instant/Expert, Gemini Flash, ChatGPT | Free tier, brainstorming dan analisis teknikal. |
| Fail Tempatan | Git, GitHub, Terminal | Kuasai `git clone`, `wget`, unzip. |
| Bengkel Ejen | VS Code + OpenCode + DeepSeek V4 | AI-ejen dalam IDE, bukan sekadar autocomplete. |
| Pengujian | Live Server, PM2, `htop` | Pantau sumber, pastikan aplikasi sihat. |

> **"Teknologi adalah alat. Kefahaman adalah senjata. Gabungkan kedua-duanya."**
```

Fail ini kini lengkap dan boleh terus disimpan ke dalam repositori anda. Ia bukan sahaja mendokumentasikan aliran kerja, tetapi juga mencerminkan realiti pembangun yang bijak memanfaatkan sumber percuma sebelum beralih kepada alatan yang lebih berkuasa.
