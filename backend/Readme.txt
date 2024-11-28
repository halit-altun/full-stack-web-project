backend/ - Ana backend klasörü
1. controllers/ - İş mantığının yürütüldüğü kontrolcü dosyaları

authController.js: Kimlik doğrulama işlemleri (giriş, kayıt, şifre sıfırlama)
productController.js: Ürün işlemleri (ekleme, listeleme, güncelleme, silme)
orderController.js: Sipariş işlemleri yönetimi
userController.js: Kullanıcı profil yönetimi
categoryController.js: Ürün kategorileri yönetimi

2. models/ - Veritabanı şema ve modellerinin tanımlandığı dosyalar

User.js: Kullanıcı veri modeli
Product.js: Ürün veri modeli
Order.js: Sipariş veri modeli
Category.js: Kategori veri modeli
Review.js: Ürün değerlendirme veri modeli
Address.js: Adres veri modeli

3. routes/ - API endpoint'lerinin tanımlandığı rota dosyaları

authRoutes.js: Kimlik doğrulama rotaları
productRoutes.js: Ürün rotaları
orderRoutes.js: Sipariş rotaları
userRoutes.js: Kullanıcı rotaları
categoryRoutes.js: Kategori rotaları

4. middlewares/ - Ara yazılım fonksiyonları

authMiddleware.js: Kimlik doğrulama kontrolleri
errorMiddleware.js: Hata yakalama ve işleme
validationMiddleware.js: Veri doğrulama kontrolleri
adminMiddleware.js: Yönetici yetki kontrolleri

5. config/ - Yapılandırma dosyaları

db.js: Veritabanı bağlantı ayarları
environment.js: Ortam değişkenleri yapılandırması
multerConfig.js: Dosya yükleme yapılandırması

6. utils/ - Yardımcı fonksiyonlar

passwordUtils.js: Şifre işlemleri (hash, kontrol)
tokenUtils.js: JWT token işlemleri
emailUtils.js: E-posta gönderme fonksiyonları
uploadUtils.js: Dosya yükleme yardımcı fonksiyonları