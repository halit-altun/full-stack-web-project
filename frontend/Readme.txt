frontend/ - Ana frontend klasörü
1. public/ - Statik dosyalar

index.html: Ana HTML dosyası
favicon.ico: Sekme ikonu

2. src/components/ - Yeniden kullanılabilir UI bileşenleri

Layout/

Header.jsx: Üst başlık bileşeni
Footer.jsx: Alt bilgi bileşeni
Navbar.jsx: Navigasyon menüsü


Product/

ProductCard.jsx: Ürün kartı bileşeni
ProductDetail.jsx: Ürün detay görünümü
ProductList.jsx: Ürün listesi görünümü


Cart/

CartItem.jsx: Sepet ürün öğesi
CartSummary.jsx: Sepet özeti


Auth/

Login.jsx: Giriş formu
Register.jsx: Kayıt formu
Profile.jsx: Profil görünümü


Common/ - Genel kullanılan bileşenler

Button.jsx: Özelleştirilmiş buton
Input.jsx: Özelleştirilmiş input
Modal.jsx: Modal/popup bileşeni



3. pages/ - Sayfa bileşenleri

HomePage.jsx: Ana sayfa
ProductPage.jsx: Ürün sayfası
CartPage.jsx: Sepet sayfası
CheckoutPage.jsx: Ödeme sayfası
UserProfilePage.jsx: Kullanıcı profili
LoginPage.jsx: Giriş sayfası
RegisterPage.jsx: Kayıt sayfası
AdminDashboard.jsx: Yönetici paneli

4. redux/ - State yönetimi

slices/

authSlice.jsx: Kimlik doğrulama state'i
productSlice.jsx: Ürün state'i
cartSlice.jsx: Sepet state'i
orderSlice.jsx: Sipariş state'i


store.jsx: Redux store yapılandırması

5. routes/

AppRoutes.jsx: Uygulama rotaları/yönlendirmeleri

6. services/ - API istekleri

authService.jsx: Kimlik doğrulama istekleri
productService.jsx: Ürün istekleri
cartService.jsx: Sepet işlemleri
orderService.jsx: Sipariş işlemleri

7. utils/ - Yardımcı fonksiyonlar

validation.jsx: Form doğrulama
formatHelper.jsx: Veri formatlama
protectedRoute.jsx: Korumalı rota bileşeni

8. styles/ - Stil dosyaları

card.css: Kart stilleri
button.css: Buton stilleri
global.css: Genel stiller
tailwind.css: Tailwind yapılandırması

9. assets/ - Medya dosyaları

images/: Görseller
icons/: İkonlar

Ana Dosyalar:

App.jsx: Ana uygulama bileşeni
index.jsx: Uygulama giriş noktası