export type Locale = 'en' | 'fr' | 'ar';

export const locales: Locale[] = ['en', 'fr', 'ar'];

export const translations = {
  en: {
    nav: {
      shop: 'Shop',
      clothing: 'Clothing',
      phones: 'Phones',
      accessories: 'Accessories',
      account: 'Account',
      cart: 'Cart',
      search: 'Search products, categories, brands…'
    },
    hero: {
      title: 'Global luxury essentials, delivered with precision.',
      subtitle: 'Discover curated drops of fashion, mobile innovation, and accessories tailored for a premium lifestyle.',
      ctaPrimary: 'Shop New Arrivals',
      ctaSecondary: 'Explore Collections'
    },
    section: {
      featured: 'Featured Categories',
      bestSellers: 'Best Sellers',
      promo: 'Member Exclusive',
      newsletter: 'Newsletter',
      cart: 'Your Cart',
      checkout: 'Checkout',
      account: 'Account'
    },
    promo: {
      title: 'Elite shipping with white-glove service',
      body: 'Complimentary express delivery on orders over $500 worldwide.'
    },
    newsletter: {
      title: 'Stay ahead of the drop',
      body: 'Receive early access to releases, editorial stories, and private offers.'
    },
    cart: {
      empty: 'Your cart is empty',
      cta: 'Continue shopping'
    },
    checkout: {
      shipping: 'Shipping Address',
      delivery: 'Delivery Options',
      payment: 'Payment',
      placeOrder: 'Place order'
    },
    account: {
      signIn: 'Sign in',
      register: 'Create account'
    }
  },
  fr: {
    nav: {
      shop: 'Boutique',
      clothing: 'Vêtements',
      phones: 'Téléphones',
      accessories: 'Accessoires',
      account: 'Compte',
      cart: 'Panier',
      search: 'Rechercher des produits, catégories, marques…'
    },
    hero: {
      title: 'Essentiels de luxe internationaux livrés avec précision.',
      subtitle: 'Découvrez une sélection de mode, d’innovation mobile et d’accessoires pour un style premium.',
      ctaPrimary: 'Nouveautés',
      ctaSecondary: 'Explorer les collections'
    },
    section: {
      featured: 'Catégories phares',
      bestSellers: 'Meilleures ventes',
      promo: 'Exclusivité membre',
      newsletter: 'Newsletter',
      cart: 'Votre panier',
      checkout: 'Paiement',
      account: 'Compte'
    },
    promo: {
      title: 'Livraison premium avec service personnalisé',
      body: 'Livraison express offerte dès 500 $ d’achat dans le monde.'
    },
    newsletter: {
      title: 'Restez en avance',
      body: 'Accédez aux sorties, éditoriaux et offres privées en priorité.'
    },
    cart: {
      empty: 'Votre panier est vide',
      cta: 'Continuer vos achats'
    },
    checkout: {
      shipping: 'Adresse de livraison',
      delivery: 'Options de livraison',
      payment: 'Paiement',
      placeOrder: 'Passer la commande'
    },
    account: {
      signIn: 'Se connecter',
      register: 'Créer un compte'
    }
  },
  ar: {
    nav: {
      shop: 'المتجر',
      clothing: 'الأزياء',
      phones: 'الهواتف',
      accessories: 'الإكسسوارات',
      account: 'الحساب',
      cart: 'السلة',
      search: 'ابحث عن المنتجات والفئات والعلامات…'
    },
    hero: {
      title: 'أساسيات فاخرة عالمية تُسلَّم بدقة.',
      subtitle: 'اكتشف مجموعات من الموضة والابتكار والأكسسوارات بأسلوب راقٍ.',
      ctaPrimary: 'تسوق الجديد',
      ctaSecondary: 'استكشف المجموعات'
    },
    section: {
      featured: 'الفئات المميزة',
      bestSellers: 'الأكثر مبيعاً',
      promo: 'امتياز الأعضاء',
      newsletter: 'النشرة البريدية',
      cart: 'سلتك',
      checkout: 'الدفع',
      account: 'الحساب'
    },
    promo: {
      title: 'شحن فاخر مع خدمة خاصة',
      body: 'توصيل سريع مجاني للطلبات فوق 500 دولار عالمياً.'
    },
    newsletter: {
      title: 'كن أول من يعلم',
      body: 'احصل على وصول مبكر للإصدارات والقصص التحريرية والعروض الخاصة.'
    },
    cart: {
      empty: 'سلتك فارغة',
      cta: 'متابعة التسوق'
    },
    checkout: {
      shipping: 'عنوان الشحن',
      delivery: 'خيارات التوصيل',
      payment: 'الدفع',
      placeOrder: 'تأكيد الطلب'
    },
    account: {
      signIn: 'تسجيل الدخول',
      register: 'إنشاء حساب'
    }
  }
};

export type TranslationKey = keyof typeof translations.en;
