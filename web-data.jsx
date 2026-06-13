// web-data.jsx — Data & shared components for Kimoo Web Platform
const { Icon, Badge, money, RESTAURANTS } = window;

const WEB_CATEGORIES = [
  { id: 'all', name: 'Tümü', emoji: '🔥' },
  { id: 'kebap', name: 'Kebap', emoji: '🥩' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'burger', name: 'Burger', emoji: '🍔' },
  { id: 'salad', name: 'Sağlıklı', emoji: '🥗' },
  { id: 'dessert', name: 'Tatlı', emoji: '🍰' },
  { id: 'coffee', name: 'Kahve', emoji: '☕' },
  { id: 'asian', name: 'Asya', emoji: '🍜' },
];

const WEB_CAMPAIGNS = [
  { title: 'İlk siparişe %30 indirim', code: 'HOSGELDIN', bg: 'linear-gradient(135deg, var(--brand-500), #FF8A6B)', color: '#fff' },
  { title: 'Kimoo+ ile ücretsiz teslimat', code: 'Şimdi dene', bg: 'linear-gradient(135deg, #1A1714, #433D37)', color: '#fff' },
  { title: 'Yaz menüleri burada', code: 'Keşfet', bg: 'linear-gradient(135deg, var(--success-500), #4ADE80)', color: '#fff' },
];

const WEB_RESTAURANTS = [
  { id: 'r1', name: 'Köşe Ocakbaşı',  category: 'Kebap · Türk Mutfağı',    rating: 4.8, reviews: '1.2K', eta: '25-35 dk', etaMin: 25, fee: 0,  img: '🥩', popular: true,  promo: '%30 İndirim', tags: ['kebap'],   payments: ['card','cash','multinet','metropol','ticket'], minOrder: 150 },
  { id: 'r2', name: 'Napoli Pizzeria', category: 'Pizza · İtalyan',           rating: 4.7, reviews: '860',  eta: '20-30 dk', etaMin: 20, fee: 15, img: '🍕', popular: true,  promo: null,         tags: ['pizza'],   payments: ['card','cash','multinet','ticket'],            minOrder: 120 },
  { id: 'r3', name: 'Burger Atölyesi', category: 'Burger · Fast Food',        rating: 4.6, reviews: '2.1K', eta: '15-25 dk', etaMin: 15, fee: 0,  img: '🍔', popular: true,  promo: '2 Al 1 Öde', tags: ['burger'],  payments: ['card','cash','multinet'],                     minOrder: 100 },
  { id: 'r4', name: 'Yeşil Kâse',      category: 'Salata · Sağlıklı',        rating: 4.9, reviews: '540',  eta: '20-30 dk', etaMin: 20, fee: 10, img: '🥗', popular: false, promo: null,         tags: ['salad'],   payments: ['card','multinet','metropol','ticket'],        minOrder: 90  },
  { id: 'r5', name: 'Tatlıcı Hacı',    category: 'Tatlı · Türk',             rating: 4.8, reviews: '1.5K', eta: '15-20 dk', etaMin: 15, fee: 0,  img: '🍰', popular: true,  promo: null,         tags: ['dessert'], payments: ['card','cash'],                                minOrder: 80  },
  { id: 'r6', name: 'Kahve Durağı',    category: 'Kahve · İçecek',           rating: 4.5, reviews: '320',  eta: '10-15 dk', etaMin: 10, fee: 15, img: '☕', popular: false, promo: null,         tags: ['coffee'],  payments: ['card','multinet'],                            minOrder: 50  },
  { id: 'r7', name: 'Dragon Noodle',   category: 'Asya · Noodle',            rating: 4.4, reviews: '280',  eta: '25-35 dk', etaMin: 25, fee: 20, img: '🍜', popular: false, promo: null,         tags: ['asian'],   payments: ['card','cash'],                                minOrder: 110 },
  { id: 'r8', name: 'Deniz Balık',     category: 'Balık · Deniz Ürünleri',  rating: 4.7, reviews: '680',  eta: '30-40 dk', etaMin: 30, fee: 0,  img: '🐟', popular: false, promo: 'Yeni',       tags: ['balık'],   payments: ['card','multinet','metropol'],                 minOrder: 200 },
];

const WEB_PAYMENT_LABELS = {
  card:     '💳 Kredi Kartı',
  cash:     '💵 Kapıda Nakit',
  multinet: 'Multinet',
  metropol: 'Metropol',
  ticket:   'Ticket',
};

const WEB_MENU = {
  categories: ['Popüler', 'Kebap & Izgara', 'Mezeler', 'Tatlılar', 'İçecekler'],
  items: [
    { name: 'Adana Dürüm',           desc: 'El açması lavaş, acılı Adana kebap, közlenmiş biber, soğan', price: 145, cat: 'Kebap & Izgara', popular: true,  cal: 480 },
    { name: 'Urfa Kebap (1 porsiyon)',desc: 'Acısız Urfa kebap, pilav, közlenmiş domates, biber',          price: 220, cat: 'Kebap & Izgara', popular: true,  cal: 560 },
    { name: 'Karışık Izgara',         desc: 'Adana, Urfa, kuşbaşı, kanat, pirzola — 2 kişilik',            price: 480, cat: 'Kebap & Izgara', popular: true,  cal: 920 },
    { name: 'İçli Köfte (3 adet)',    desc: 'Cevizli, baharatlı geleneksel içli köfte',                     price: 95,  cat: 'Mezeler',      popular: false, cal: 310 },
    { name: 'Humus',                  desc: 'Nohut ezmesi, tahin, zeytinyağı, sumak',                       price: 65,  cat: 'Mezeler',      popular: false, cal: 160 },
    { name: 'Künefe',                 desc: 'Hatay usulü, kadayıf, peynir, şerbet, antep fıstığı',          price: 110, cat: 'Tatlılar',      popular: true,  cal: 420 },
    { name: 'Sütlaç',                 desc: 'Fırında pişirilmiş geleneksel sütlaç',                         price: 65,  cat: 'Tatlılar',      popular: false, cal: 280 },
    { name: 'Ayran',                  desc: 'Ev yapımı yoğurttan ayran',                                    price: 35,  cat: 'İçecekler',    popular: false, cal: 60  },
    { name: 'Şalgam',                 desc: 'Acılı Adana şalgam suyu',                                      price: 40,  cat: 'İçecekler',    popular: false, cal: 25  },
  ],
};

Object.assign(window, { WEB_CATEGORIES, WEB_CAMPAIGNS, WEB_RESTAURANTS, WEB_MENU, WEB_PAYMENT_LABELS });
