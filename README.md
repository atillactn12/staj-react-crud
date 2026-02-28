# 🚀 Kullanıcı Yönetim Paneli (React CRUD)

Modern Web Dünyasına Giriş eğitimi bitirme projesi kapsamında geliştirilmiş; uzak API entegrasyonu ve LocalStorage (yerel depolama) özelliklerine sahip profesyonel bir CRUD uygulamasıdır.

## ✨ Proje Özellikleri

- ✅ **API Entegrasyonu:** `JSONPlaceholder` üzerinden çekilen veriler dinamik olarak Türkçe'ye çevrilerek listelenir.
- ✅ **Gelişmiş Form Yönetimi:** Dinamik ülke bayraklı telefon formatlama ve input bazlı görsel doğrulama mevcuttur.
- ✅ **Veri Kaynağı Ayrımı:** Listede API'den gelen veriler ile kullanıcı tarafından yerel eklenen veriler (YEREL/API etiketleri ile) ayırt edilebilir.
- ✅ **Kullanıcı Deneyimi (UX):** İşlem sırasında aktif olan "Yükleniyor" animasyonları ve etkileşimli buton tasarımları.
- ✅ **Tam CRUD Desteği:** Kullanıcı Ekleme, Listeleme, Güncelleme ve Silme işlemleri eksiksiz çalışmaktadır.

## 📁 Proje Klasör Yapısı

Yönergede belirtilen klasörleme kurallarına tam uyum sağlanmıştır:

```text
src/
├── Components/    # UserForm ve UserList bileşenleri
├── Pages/         # Home (Ana Sayfa) tasarımı
├── Interfaces/    # User (Veri Modeli/TypeScript Tip Tanımları)
└── assets/        # Proje görselleri ve statik dosyalar