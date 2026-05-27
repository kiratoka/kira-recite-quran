# Panduan & Prompt SEO-Optimized untuk Pembuatan `robots.ts` (Next.js App Router)

Dokumen ini berisi **prompt berkualitas tinggi dan detail** yang dapat Anda gunakan untuk membuat/mengenerate `robots.ts` di project Next.js Anda (Kira Recite Quran). Selain itu, dokumen ini dilengkapi dengan **pembelajaran (edukasi) mendalam** mengenai optimasi SEO & AI chatbot berdasarkan konfigurasi `.env` Anda yang baru.

---

## 🛠️ Analisis Environment Project Anda

Berdasarkan pemeriksaan file `.env` Anda yang terbaru, kami menemukan variabel penting ini:
```env
NEXT_PUBLIC_SITE_URL=https://kirarecitequran.netlify.app/
```

* **Mengapa ini penting?**  
  File `robots.txt` yang dihasilkan harus merujuk ke URL Sitemap yang valid dan absolut. Dengan menggunakan `NEXT_PUBLIC_SITE_URL` dari `.env`, kita memastikan bahwa tautan Sitemap di dalam `robots.txt` selalu dinamis dan tepat, baik saat berada di environment development, staging, maupun production (`https://kirarecitequran.netlify.app`).

---

## 📚 Edukasi SEO & Chatbot AI (Bahan Belajar)

Ini adalah poin penting mengapa kita **mengizinkan AI Chatbots** untuk merayap website kita:

### 1. Perbedaan antara Search Engine, AI Training, dan AI Live Search
* **Search Engine (Google, Bing, dll.)**: Mengindeks halaman Anda agar muncul di hasil pencarian tradisional.
* **AI Training (GPTBot, Google-Extended, dll.)**: Mengambil konten untuk melatih versi terbaru model AI mereka.
* **AI Live Search/Browsing (ChatGPT, Gemini, Claude)**: Mencari informasi secara real-time di internet untuk menjawab pertanyaan pengguna. 
  * *Contoh*: Jika pengguna bertanya ke ChatGPT, *"Tolong carikan website Al-Quran digital yang bagus untuk membaca dan menghafal"*, AI chatbot akan menjelajahi internet. Jika website Anda **tidak diblokir**, AI dapat membaca, menganalisis, merangkum, dan **mereferensikan website Anda (Kira Recite Quran) lengkap dengan link/tautan sumber!** Ini adalah sumber traffic baru yang sangat potensial di era modern (sering disebut AI Engine Optimization atau AIO).

### 2. Mengapa Kita Mengizinkan Semua Bot dengan `*`?
Jika Anda ingin website Anda dikenal dan dijadikan referensi oleh chatbot AI populer (seperti ChatGPT, Gemini, Claude), maka pendekatan terbaik adalah **tidak memblokir mereka**. 
Dengan aturan `userAgent: "*"`, semua bot—baik Google, Bing, maupun bot AI—diizinkan untuk merayap halaman publik Anda (`/`), sambil tetap menyembunyikan rute internal yang sensitif seperti file build (`/_next/`) dan endpoints API (`/api/`).

---

## 📋 PROMPT DETAIL (Siap Anda Salin & Gunakan)

Berikut adalah prompt sangat detail dalam bahasa Inggris dan Indonesia yang dirancang khusus untuk menghasilkan file `robots.ts` terbaik untuk website Anda:

### Teks Prompt untuk AI Generator:
```text
Role: Anda adalah seorang SEO & AI Engine Optimization (AIO) Expert dan Senior Next.js Developer.

Task:
Buatlah kode TypeScript untuk file `app/robots.ts` yang kompatibel dengan Next.js App Router (Next.js 13/14/15) untuk website Al-Quran digital bernama "Kira Recite Quran" dengan URL utama: "https://kirarecitequran.netlify.app/".

Persyaratan Kode:
1. Impor tipe data `MetadataRoute` dari "next".
2. Gunakan environment variable `process.env.NEXT_PUBLIC_SITE_URL` untuk menentukan base URL secara dinamis. Berikan nilai fallback ke "https://kirarecitequran.netlify.app" apabila environment variable tidak terdefinisi. Hapus trailing slash '/' di ujung URL agar format tautan sitemap rapi.
3. Aturan Crawling (Rules):
   - Gunakan aturan tunggal untuk semua bot (User-Agent: '*') agar mencakup mesin pencari tradisional (Google, Bing) dan juga AI Chatbots (ChatGPT, Gemini, Claude, dll.).
   - Izinkan akses ke seluruh halaman ('/'), namun batasi/disallow akses ke rute internal Next.js (`/_next/`), folder API (`/api/`), dan halaman admin/private jika ada (`/private/`).
   - Tujuan dari aturan ini adalah agar website kita mudah ditemukan oleh mesin pencari organik sekaligus dapat dirujuk (cited/referenced) oleh AI Chatbot saat menjawab pertanyaan user.
4. Integrasikan Sitemap secara dinamis dengan mengarahkan ke `${baseUrl}/sitemap.xml`.
5. Tuliskan komentar penjelas yang bersih (clean code) dalam bahasa Indonesia di dalam kode agar mudah dipelajari oleh developer.

Tolong berikan kode TypeScript yang lengkap, tanpa placeholder, dan siap pakai.
```

---

## 💻 Hasil Implementasi `robots.ts` (Siap Pakai)

Berdasarkan prompt detail di atas, berikut adalah kode `robots.ts` paling optimal yang telah diimplementasikan ke dalam proyek Anda:

```typescript
import type { MetadataRoute } from "next";

/**
 * Fungsi robots() mengembalikan konfigurasi robots.txt dinamis.
 * Next.js secara otomatis mendeteksi file ini di folder `app/` dan
 * menyediakannya di endpoint `/robots.txt`.
 */
export default function robots(): MetadataRoute.Robots {
  // 1. Mengambil Base URL dari environment variable dengan aman.
  //    Menghapus slash akhir (trailing slash) jika ada agar format URL Sitemap konsisten.
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 
    "https://kirarecitequran.netlify.app"
  ).replace(/\/$/, "");

  return {
    rules: [
      {
        // ATURAN UTAMA: MENGIZINKAN SEMUA BOT (SEARCH ENGINE & AI CHATBOTS)
        // Menggunakan '*' agar semua bot—baik Google/Bing maupun chatbot AI (seperti ChatGPT,
        // Gemini, Claude)—bisa merayap dan mengindeks website Anda. Ini memungkinkan website Anda
        // dikenal, dirangkum, dan direferensikan/dijadikan sumber referensi oleh AI chatbot.
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",     // Folder internal Next.js build
          "/api/",       // Folder endpoint API lokal jika ada
          "/private/",   // Rute rahasia atau admin jika ada di masa depan
        ],
      },
    ],
    // 2. Mendaftarkan Sitemap Anda secara dinamis agar semua bot bisa menemukan daftar surah Anda yang ada di `/sitemap.xml`
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

### Penjelasan Detail Tiap Baris untuk Pembelajaran Anda:

1. **`import type { MetadataRoute } from "next";`**  
   Kita mengimpor tipe data bawaan Next.js untuk memastikan kode kita memiliki *type safety* yang kuat sesuai standar TypeScript. Jika ada kesalahan pengetikan properti, editor (seperti VS Code) akan langsung memberi tahu kita.

2. **`const baseUrl = ...replace(/\/$/, "");`**  
   Fungsi regex `.replace(/\/$/, "")` berguna untuk membuang slash di ujung URL `.env` Anda agar saat digabungkan dengan `/sitemap.xml`, hasilnya menjadi `https://kirarecitequran.netlify.app/sitemap.xml` (tidak double slash).

3. **`userAgent: "*"`**  
   Simbol bintang (`*`) mewakili semua robot/crawler di internet. Ini mencakup robot pencari tradisional (Googlebot, Bingbot) serta robot AI (seperti GPTBot, ClaudeBot, dll.). Dengan memberikan `allow: "/"`, website Anda dapat diakses dan dikenal oleh semuanya.

4. **`disallow: ["/_next/", "/api/", "/private/"]`**  
   Ini membatasi bot agar tidak membuang resource dengan merayap file kompilasi internal, API, atau rute privat yang tidak ditujukan untuk konsumsi publik.

5. **`sitemap: ...`**  
   Memberitahu Google, Bing, dan Chatbot AI di mana letak peta situs Anda secara instan agar mereka dapat mendata seluruh surah Al-Quran di website Anda dengan sangat cepat.
