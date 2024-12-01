import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  tr: {
    forgotPassword: {
      title: 'Şifre Sıfırlama',
      subtitle: 'Hesabınızla ilişkili e-posta adresini girin',
      continueButton: 'Devam Et',
      sending: 'Gönderiliyor...',
      invalidEmail: 'Lütfen geçerli bir email adresi giriniz',
      noAccount: 'Bu email adresi ile kayıtlı bir hesap bulunmamaktadır',
      emailSent: 'E-posta Gönderildi',
      checkInbox: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.',
      backToLogin: 'Giriş sayfasına dön'
    },
    dashboard: {
      title: 'Hesabım',
      profile: {
        title: 'Profil Bilgilerim',
        description: 'Kişisel bilgilerinizi görüntüleyin ve güncelleyin'
      },
      orders: {
        title: 'Siparişlerim',
        description: 'Siparişlerinizi görüntüleyin ve takip edin',
        noOrders: 'Henüz siparişiniz bulunmamaktadır.',
        startShopping: 'Alışverişe Başla',
        orderDate: 'SİPARİŞ TARİHİ',
        orderNumber: 'SİPARİŞ NO',
        totalAmount: 'TOPLAM',
        status: 'Durum',
        loading: 'Siparişleriniz yükleniyor...',
        error: 'Siparişleriniz yüklenirken bir hata oluştu.',
        firstPage: 'İlk Sayfa',
        previousPage: 'Önceki Sayfa',
        nextPage: 'Sonraki Sayfa',
        lastPage: 'Son Sayfa',
        pageInfo: 'Sayfa {current} / {total}',
        buyAgain: 'Ürünü tekrar al',
        deliveryAddress: 'Teslimat Adresi'
      },
      addresses: {
        title: 'Adreslerim',
        description: 'Kayıtlı adreslerinizi yönetin'
      }, 
      security: {
        title: 'Güvenlik',
        description: 'Şifrenizi değiştirin ve güvenlik ayarlarınızı yönetin'
      },
      changePassword: {
        title: 'Şifre Değiştir',
        currentPassword: 'Mevcut Şifre',
        newPassword: 'Yeni Şifre',
        confirmPassword: 'Yeni Şifreyi Tekrar Girin',
        changeButton: 'Şifreyi Değiştir',
        success: 'Şifreniz başarıyla değiştirildi',
        loginAgain: 'Lütfen yeni şifrenizle tekrar giriş yapın',
        passwordMismatch: 'Yeni şifreler eşleşmiyor',
        changeError: 'Şifre değiştirme işlemi başarısız oldu'
      }
    },
    addresses: {
      pageTitle: 'Adreslerim',
      addNewAddress: 'Yeni Adres Ekle',
      editAddress: 'Adresi Düzenle',
      addressTitle: 'Adres Başlığı',
      fullAddress: 'Açık Adres',
      city: 'Şehir',
      district: 'İlçe',
      postalCode: 'Posta Kodu',
      cancel: 'İptal',
      add: 'Ekle',
      update: 'Güncelle',
      deleteSuccess: 'Adres başarıyla silindi',
      deleteError: 'Adres silinirken bir hata oluştu',
      updateSuccess: 'Adres başarıyla güncellendi',
      addSuccess: 'Adres başarıyla eklendi',
      invalidAddressId: 'Geçersiz adres ID\'si',
      loadError: 'Adresler yüklenirken bir hata oluştu',
      operationError: 'İşlem sırasında bir hata oluştu'
    },
    login: {
      title: 'Giriş Yap',
      email: 'E-posta',
      password: 'Şifre',
      forgotPassword: 'Şifremi Unuttum',
      loginButton: 'Giriş Yap',
      registerPrompt: 'Hesabınız yok mu?',
      register: 'Kayıt Ol',
      loading: 'Giriş yapılıyor...',
      success: 'Giriş başarılı!',
      emailLabel: 'E-posta',
      emailRequired: 'E-posta adresi gerekli',
      emailInvalid: 'Geçerli bir e-posta adresi girin',
      passwordLabel: 'Şifre',
      passwordRequired: 'Şifre gerekli',
      newCustomer: 'Yeni müşteri misiniz?',
      createAccount: 'Hesap oluştur',
      loginError: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.',
      showPassword: 'Şifreyi göster',
      hidePassword: 'Şifreyi gizle',
      greeting: 'Merhaba',
      user: 'Kullanıcı',
      loginGreeting: 'Merhaba, Giriş yapın',
      logoutButton: 'Çıkış Yap'
    },
    footer: {
      backToTop: 'Başa Dön',
      aboutUs: {
        title: 'Hakkımızda',
        career: 'Kariyer',
        blog: 'Blog',
        companyInfo: 'Şirket Bilgileri'
      },
      earnMoney: {
        title: 'Para Kazanın',
        sellProducts: 'Ürünlerinizi Satın',
        becomePartner: 'İş Ortağımız Olun'
      },
      payment: {
        title: 'Ödeme',
        paymentOptions: 'Ödeme Seçenekleri',
        trackShipment: 'Kargo Takibi'
      },
      help: {
        title: 'Yardım',
        covid19: 'COVID-19',
        shippingDelivery: 'Kargo ve Teslimat',
        returnsExchange: 'İade ve Değişim'
      },
      copyright: '© {year} Amazing. Tüm hakları saklıdır.'
    },
    productDetail: {
      addToCart: 'Sepete Ekle',
      buyNow: 'Hemen Al',
      inStock: 'Stokta var',
      seller: 'Satıcı',
      quantity: 'Adet',
      freeShipping: 'KARGO BEDAVA',
      nextDayDelivery: 'Amazing Prime ile yarın teslim',
      selectDeliveryAddress: 'Teslimat adresi seçin',
      rating: 'puan',
      category: 'Kategori',
      fastDelivery: 'Hızlı Teslimat',
      modal: {
        title: 'Teslimat adresinizi girin',
        subtitle: 'Türkiye\'de bir posta kodu girin',
        postalCode: 'Posta Kodu',
        cancel: 'İptal',
        confirm: 'Onayla'
      },
      alert: {
        maxQuantity: 'En fazla {max} adet ekleyebilirsiniz. Sepetinizde zaten {current} adet bulunuyor.'
      }
    },
    homePage: {
      sorting: {
        label: 'Sırala',
        featured: 'Öne Çıkan',
        priceLow: 'Fiyat: Düşükten Yükseğe',
        priceHigh: 'Fiyat: Yüksekten Düşüğe',
        newest: 'En Yeni Gelenler'
      },
      results: {
        showing: '{first}-{last} arası {total} sonuç',
        noResults: 'Sonuç bulunamadı'
      },
      trending: 'Trend Olanlar',
      bestSellers: 'Çok Satanlar',
      newReleases: 'Yeni Çıkanlar',
      digitalContent: 'Dijital İçerik ve Cihazlar',
      shop: 'Alışveriş Yap',
      todaysDeals: 'Günün Fırsatları',
      helpSettings: 'Yardım ve Ayarlar'
    },
    searchResults: {
      noResults: 'Aramanızla eşleşen ürün bulunamadı.',
      tryAgain: 'Lütfen farklı anahtar kelimelerle tekrar deneyin.',
      pleaseSearch: 'Lütfen arama yapınız',
      sorting: {
        label: 'Sırala',
        featured: 'Öne Çıkan',
        priceLow: 'Fiyat: Düşükten Yükseğe',
        priceHigh: 'Fiyat: Yüksekten Düşüğe',
        newest: 'En Yeni Gelenler'
      },
      showing: '{first}-{last} arası {total} sonuç',
      noResultsFor: '"{query}" için sonuç bulunamadı'
    },
    searchBar: {
      placeholder: "Amazing'de Ara",
      allCategories: "Tüm Kategoriler"
    },
    cart: {
      pageTitle: 'Alışveriş Sepeti',
      title: 'Sepet',
      emptyCart: 'Sepetiniz boş',
      continueShopping: 'Alışverişe Devam Et',
      subtotal: 'Ara Toplam',
      items: 'ürün',
      checkout: 'Alışverişi Tamamla',
      processing: 'İşleminiz Gerçekleştiriliyor...',
      deliveryAddress: {
        title: 'Teslimat Adresi',
        selectAddress: 'Teslimat Adresi Seçin',
        addNewAddress: 'Yeni Adres Ekle',
        loginRequired: 'Teslimat adresi seçmek için lütfen giriş yapın.',
        loginButton: 'Giriş Yap',
        noAddresses: 'Kayıtlı adresiniz bulunmamaktadır.',
        addAddress: 'Adres Ekle',
        selectAddressButton: 'Adres Seçin',
        changeAddress: 'Adresi Değiştir',
        modalTitle: 'Teslimat Adresi Seçin',
        noAccount: 'Hesabınız yok mu?',
        registerNow: 'Hemen kaydolun'
      },
      orderSuccess: {
        title: 'Siparişiniz Alındı',
        totalAmount: 'Toplam Tutar',
        confirm: 'Tamam'
      }
    },
    profile: {
      title: 'Profil Bilgilerim',
      firstName: 'Ad',
      lastName: 'Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      editButton: 'Düzenle',
      saveButton: 'Kaydet',
      cancelButton: 'İptal',
      updateSuccess: 'Profil bilgileriniz başarıyla güncellendi',
      updateError: 'Profil güncellenirken bir hata oluştu'
    },
    notFound: {
      title: 'Sayfa Bulunamadı',
      description: 'Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.',
      backToHome: 'Ana Sayfaya Dön'
    },
    authFooter: {
      termsOfUse: 'Kullanım Koşulları',
      privacyNotice: 'Gizlilik Bildirimi',
      help: 'Yardım',
      copyright: '© {year} Amazing. Tüm hakları saklıdır.'
    },
    validation: {
      firstNameRequired: 'Ad alanı zorunludur',
      lastNameRequired: 'Soyad alanı zorunludur',
      emailRequired: 'E-posta alanı zorunludur',
      emailInvalid: 'Geçerli bir e-posta adresi giriniz',
      passwordRequired: 'Şifre alanı zorunludur',
      passwordLength: 'Şifre en az 6 karakter olmalıdır',
      phoneRequired: 'Telefon numarası zorunludur',
      phoneInvalid: 'Geçerli bir telefon numarası giriniz',
      generalError: 'Bir hata oluştu. Lütfen tekrar deneyiniz.'
    },
    errors: {
      emailExists: 'Bu email adresi zaten kayıtlı',
      emailNotRegistered: 'Bu email adresi kayıtlı değil',
      loginFailed: 'Giriş başarısız oldu',
      emailRequired: 'E-posta adresi zorunludur',
      passwordRequired: 'Parola zorunludur',
      invalidPassword: 'Geçersiz parola',
      loginFailed: 'Giriş başarısız oldu'
    },
    register: {
      title: 'Kayıt Ol',
      firstName: 'Ad',
      lastName: 'Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      countryCode: 'Ülke Kodu',
      password: 'Şifre',
      confirmPassword: 'Şifre Tekrar',
      registerButton: 'Kayıt Ol',
      alreadyHaveAccount: 'Zaten hesabınız var mı?',
      login: 'Giriş Yap',
      success: 'Kayıt Başarılı',
      redirecting: 'Yönlendiriliyorsunuz...',
      validation: {
        firstNameRequired: 'Ad alanı zorunludur',
        lastNameRequired: 'Soyad alanı zorunludur',
        emailRequired: 'E-posta alanı zorunludur',
        emailInvalid: 'Geçerli bir e-posta adresi giriniz',
        passwordRequired: 'Şifre alanı zorunludur',
        passwordLength: 'Şifre en az 6 karakter olmalıdır',
        phoneRequired: 'Telefon numarası alanı zorunludur',
        phoneInvalid: 'Geçerli bir telefon numarası giriniz',
        confirmPasswordRequired: 'Şifre tekrar alanı zorunludur',
        passwordMismatch: 'Şifreler eşleşmiyor'
      },
      emailExists: 'Bu e-posta adresi zaten kullanılmaktadır',
      phoneExists: 'Bu telefon numarası zaten kullanılmaktadır',
      registerError: 'Kayıt işlemi başarısız oldu'
    },
    categories: {
      title: 'Kategoriler',
      all: 'Tüm Kategoriler',
      electronics: 'Elektronik',
      homeAndLiving: 'Ev & Yaşam',
      fashion: 'Moda',
      kitchen: 'Mutfak',
      gamesAndHobbies: 'Oyun & Hobi'
    },
    phoneInUse: 'Bu telefon numarası zaten kullanılmaktadır'
  },
  en: {
    forgotPassword: {
      title: 'Password Reset',
      subtitle: 'Enter the email address associated with your account',
      continueButton: 'Continue',
      sending: 'Sending...',
      invalidEmail: 'Please enter a valid email address',
      noAccount: 'No account found with this email address',
      emailSent: 'Email Sent',
      checkInbox: 'Password reset link has been sent to your email address. Please check your inbox.',
      backToLogin: 'Back to login page'
    },
    dashboard: {
      title: 'My Account',
      profile: {
        title: 'My Profile',
        description: 'View and update your personal information'
      },
      orders: {
        title: 'My Orders',
        description: 'View and track your orders',
        noOrders: 'You have no orders yet.',
        startShopping: 'Start Shopping',
        orderDate: 'ORDER DATE',
        orderNumber: 'ORDER NO',
        totalAmount: 'TOTAL',
        status: 'Status',
        loading: 'Loading your orders...',
        error: 'An error occurred while loading your orders.',
        firstPage: 'First Page',
        previousPage: 'Previous Page',
        nextPage: 'Next Page',
        lastPage: 'Last Page',
        pageInfo: 'Page {current} / {total}',
        buyAgain: 'Buy Again',
        deliveryAddress: 'Delivery Address'
      },
      addresses: {
        title: 'My Addresses',
        description: 'Manage your saved addresses'
      },
      security: {
        title: 'Security',
        description: 'Change your password and manage security settings'
      },
      changePassword: {
        title: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm New Password',
        changeButton: 'Change Password',
        success: 'Your password has been changed successfully',
        loginAgain: 'Please login again with your new password',
        passwordMismatch: 'New passwords do not match',
        changeError: 'Failed to change password'
      }
    },
    addresses: {
      pageTitle: 'My Addresses',
      addNewAddress: 'Add New Address',
      editAddress: 'Edit Address',
      addressTitle: 'Address Title',
      fullAddress: 'Full Address',
      city: 'City',
      district: 'District',
      postalCode: 'Postal Code',
      cancel: 'Cancel',
      add: 'Add',
      update: 'Update',
      deleteSuccess: 'Address deleted successfully',
      deleteError: 'An error occurred while deleting the address',
      updateSuccess: 'Address updated successfully',
      addSuccess: 'Address added successfully',
      invalidAddressId: 'Invalid address ID',
      loadError: 'An error occurred while loading addresses',
      operationError: 'An error occurred during the operation'
    },
    login: {
      title: 'Login',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password',
      loginButton: 'Login',
      registerPrompt: "Don't have an account?",
      register: 'Register',
      loading: 'Logging in...',
      success: 'Login successful!',
      emailLabel: 'Email',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      passwordLabel: 'Password',
      passwordRequired: 'Password is required',
      newCustomer: 'New customer?',
      createAccount: 'Create account',
      loginError: 'Login failed. Please check your credentials.',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      greeting: 'Hello',
      user: 'User',
      loginGreeting: 'Hello, Sign in',
      logoutButton: 'Sign Out'
    },
    footer: {
      backToTop: 'Back to Top',
      aboutUs: {
        title: 'About Us',
        career: 'Careers',
        blog: 'Blog',
        companyInfo: 'Company Info'
      },
      earnMoney: {
        title: 'Make Money',
        sellProducts: 'Sell Products',
        becomePartner: 'Become Partner'
      },
      payment: {
        title: 'Payment',
        paymentOptions: 'Payment Options',
        trackShipment: 'Track Shipment'
      },
      help: {
        title: 'Help',
        covid19: 'COVID-19',
        shippingDelivery: 'Shipping & Delivery',
        returnsExchange: 'Returns & Exchange'
      },
      copyright: '© {year} Amazing. All rights reserved.'
    },
    productDetail: {
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      inStock: 'In Stock',
      seller: 'Seller',
      quantity: 'Quantity',
      freeShipping: 'FREE SHIPPING',
      nextDayDelivery: 'Next day delivery with Amazing Prime',
      selectDeliveryAddress: 'Select delivery address',
      rating: 'rating',
      category: 'Category',
      fastDelivery: 'Fast Delivery',
      modal: {
        title: 'Enter your delivery address',
        subtitle: 'Enter a postal code in Turkey',
        postalCode: 'Postal Code',
        cancel: 'Cancel',
        confirm: 'Confirm'
      },
      alert: {
        maxQuantity: 'You can add maximum {max} items. You already have {current} items in your cart.'
      }
    },
    homePage: {
      sorting: {
        label: 'Sort',
        featured: 'Featured',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        newest: 'Newest Arrivals'
      },
      results: {
        showing: 'Showing {first}-{last} of {total} results',
        noResults: 'No results found'
      },
      trending: 'Trending',
      bestSellers: 'Best Sellers',
      newReleases: 'New Releases',
      digitalContent: 'Digital Content & Devices',
      shop: 'Shop',
      todaysDeals: "Today's Deals",
      helpSettings: 'Help & Settings'
    },
    searchResults: {
      noResults: 'No products found matching your search.',
      tryAgain: 'Please try again with different keywords.',
      pleaseSearch: 'Please enter a search term',
      sorting: {
        label: 'Sort',
        featured: 'Featured',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        newest: 'Newest Arrivals'
      },
      showing: 'Showing {first}-{last} of {total} results',
      noResultsFor: 'No results found for "{query}"'
    },
    searchBar: {
      placeholder: "Search on Amazing",
      allCategories: "All Categories"
    },
    cart: {
      pageTitle: 'Shopping Cart',
      title: 'Cart',
      emptyCart: 'Your cart is empty',
      continueShopping: 'Continue Shopping',
      subtotal: 'Subtotal',
      items: 'items',
      checkout: 'Proceed to Checkout',
      processing: 'Processing...',
      deliveryAddress: {
        title: 'Delivery Address',
        selectAddress: 'Select Delivery Address',
        addNewAddress: 'Add New Address',
        loginRequired: 'Please login to select a delivery address.',
        loginButton: 'Login',
        noAddresses: 'No addresses found.',
        addAddress: 'Add Address',
        selectAddressButton: 'Select Address',
        changeAddress: 'Change Address',
        modalTitle: 'Select Delivery Address',
        noAccount: "Don't have an account?",
        registerNow: 'Register now'
      },
      orderSuccess: {
        title: 'Order Received',
        totalAmount: 'Total Amount',
        confirm: 'OK'
      }
    },
    profile: {
      title: 'My Profile',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      editButton: 'Edit',
      saveButton: 'Save',
      cancelButton: 'Cancel',
      updateSuccess: 'Your profile has been updated successfully',
      updateError: 'An error occurred while updating your profile'
    },
    notFound: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist or has been removed.',
      backToHome: 'Back to Home'
    },
    authFooter: {
      termsOfUse: 'Terms of Use',
      privacyNotice: 'Privacy Notice',
      help: 'Help',
      copyright: '© {year} Amazing. All rights reserved.'
    },
    validation: {
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 6 characters',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Please enter a valid phone number',
      phoneExists: 'This phone number is already in use',
      generalError: 'An error occurred. Please try again.'
    },
    errors: {
      emailExists: 'This email address is already registered',
      emailNotRegistered: 'This email address is not registered',
      loginFailed: 'Login failed',
      emailRequired: 'Email address is required',
      passwordRequired: 'Password is required',
      invalidPassword: 'Invalid password',
      loginFailed: 'Login failed',
      phoneExists: 'This phone number is already in use'
    },
    register: {
      title: 'Register',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      countryCode: 'Country Code',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      registerButton: 'Register',
      alreadyHaveAccount: 'Already have an account?',
      login: 'Login',
      success: 'Registration Successful',
      redirecting: 'Redirecting...',
      validation: {
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        passwordRequired: 'Password is required',
        passwordLength: 'Password must be at least 6 characters',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number',
        confirmPasswordRequired: 'Confirm password is required',
        passwordMismatch: 'Passwords do not match'
      },
      emailExists: 'This email is already registered',
      phoneExists: 'This phone number is already in use',
      registerError: 'Registration failed'
    },
    categories: {
      title: 'Categories',
      all: 'All Categories',
      electronics: 'Electronics',
      homeAndLiving: 'Home & Living',
      fashion: 'Fashion',
      kitchen: 'Kitchen',
      gamesAndHobbies: 'Games & Hobbies'
    },
    phoneInUse: 'This phone number is already in use'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'tr';
  });

  const toggleLanguage = () => {
    const newLanguage = language === 'tr' ? 'en' : 'tr';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 