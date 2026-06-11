// kimoo-shared.jsx — icons, UI primitives, and mock data for the Kimoo customer app
// All exported to window for use across script files.

// ---------------- ICONS (24px grid, 2px stroke) ----------------
const I = {
  home:    'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5',
  search:  'M10 10m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0M21 21l-5-5',
  bag:     'M5 7h14l-1.1 11.2a2 2 0 0 1-2 1.8H8.1a2 2 0 0 1-2-1.8L5 7ZM9 7a3 3 0 0 1 6 0',
  heart:   'M12 20s-7-4.5-9.5-9A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z',
  user:    'M12 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M4 20c0-4 3.5-6 8-6s8 2 8 6',
  pin:     'M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11ZM12 10m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0',
  star:    'M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z',
  clock:   'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0M12 7v5l3.5 2',
  chevR:   'M9 5l7 7-7 7',
  chevL:   'M15 5l-7 7 7 7',
  chevD:   'M5 9l7 7 7-7',
  plus:    'M12 5v14M5 12h14',
  minus:   'M5 12h14',
  check:   'M4 11l5 5 11-11',
  close:   'M6 6l12 12M18 6L6 18',
  filter:  'M3 5h18M6 12h12M10 19h4',
  scooter: 'M5 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0M19 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0M7.5 18h6l-2-7H5m6.5 7 1.5-9h3',
  flame:   'M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 2 2c1.5 0 1.5-2 1.5-3 0-2-1.5-4.5 0.5-6Z',
  wallet:  'M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM16 12h3M16 12a1.5 1.5 0 0 0 0 3h4v-3Z',
  tag:     'M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9ZM7.5 7.5h.01',
  ticket:  'M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4 2 2 0 0 1 0-4Z',
  phone:   'M5 4h4l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  msg:     'M4 5h16v11H8l-4 3V5Z',
  back:    'M15 5l-7 7 7 7',
  trophy:  'M5 3h14v7a7 7 0 0 1-14 0ZM9 22h6M12 16v6M5 7H2M19 7h3',
  link:    'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  send:    'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z',
};

function Icon({ name, size = 22, color = 'currentColor', strokeWidth = 2, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: 'none', ...style }}>
      {I[name].split('M').filter(Boolean).map((d, i) => <path key={i} d={'M' + d} />)}
    </svg>
  );
}

// ---------------- PRIMITIVES ----------------
function Pill({ children, active, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
      padding: '9px 16px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
      border: active ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)',
      background: active ? 'var(--brand-500)' : 'var(--bg-surface)',
      color: active ? '#fff' : 'var(--text-secondary)',
      transition: 'all .15s ease', flex: 'none', ...style,
    }}>{children}</button>
  );
}

function MediaBox({ h = 150, label = '', radius = 'var(--radius-md)', children, style = {} }) {
  return (
    <div style={{
      height: h, borderRadius: radius, position: 'relative', overflow: 'hidden',
      backgroundImage: 'repeating-linear-gradient(135deg, var(--neutral-100) 0 12px, var(--neutral-50) 12px 24px)',
      ...style,
    }}>
      {label && <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>}
      {children}
    </div>
  );
}

function Badge({ children, tone = 'brand', solid, style = {} }) {
  const map = {
    brand: ['var(--brand-50)', 'var(--brand-700)'],
    success: ['var(--success-50)', 'var(--success-600)'],
    warning: ['var(--warning-50)', 'var(--warning-600)'],
    error: ['var(--error-50)', 'var(--error-600)'],
    info: ['var(--info-50)', 'var(--info-600)'],
    neutral: ['var(--bg-sunken)', 'var(--text-secondary)'],
  };
  const [bg, fg] = map[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 9px',
      borderRadius: 999, fontSize: 12, fontWeight: 700, lineHeight: 1,
      background: solid ? 'var(--brand-500)' : bg, color: solid ? '#fff' : fg, ...style,
    }}>{children}</span>
  );
}

function PrimaryBtn({ children, onClick, disabled, full = true, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, color: '#fff',
      background: 'var(--brand-500)', border: 'none', borderRadius: 999,
      padding: '15px 22px', cursor: disabled ? 'not-allowed' : 'pointer',
      width: full ? '100%' : 'auto', opacity: disabled ? 0.45 : 1,
      boxShadow: disabled ? 'none' : 'var(--shadow-brand)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'all .15s ease', ...style,
    }}>{children}</button>
  );
}

// header used on inner screens
function ScreenHeader({ title, onBack, right, dark }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30, paddingTop: 58,
      background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px 14px' }}>
        {onBack && (
          <button onClick={onBack} style={{
            width: 40, height: 40, borderRadius: 999, border: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer', flex: 'none',
          }}><Icon name="back" size={20} color="var(--text-primary)" /></button>
        )}
        <div style={{ flex: 1, fontSize: 19, fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{title}</div>
        {right}
      </div>
    </div>
  );
}

function money(n) { return '₺' + n.toLocaleString('tr-TR'); }

// ---------------- MOCK DATA ----------------
const CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: '🍽️' },
  { id: 'kebap', label: 'Kebap', icon: '🍢' },
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'burger', label: 'Burger', icon: '🍔' },
  { id: 'tatli', label: 'Tatlı', icon: '🍰' },
  { id: 'kahve', label: 'Kahve', icon: '☕' },
  { id: 'vegan', label: 'Vegan', icon: '🥗' },
];

const PAYMENT_LABELS = {
  card:     '💳 Kredi Kartı',
  cash:     '💵 Kapıda Nakit',
  multinet: 'Multinet',
  metropol: 'Metropol',
  ticket:   'Ticket',
};

const RESTAURANTS = [
  {
    id: 'r1', name: 'Köşe Ocakbaşı', cuisine: 'Kebap · Türk', price: '₺₺', rating: 4.8, reviews: 1240,
    eta: '25-35 dk', minOrder: 150, fee: 0, discount: '%30', tags: ['kebap'], open: true, free: true,
    payments: ['card','cash','multinet','metropol','ticket'],
  },
  {
    id: 'r2', name: 'Napoli Pizzeria', cuisine: 'Pizza · İtalyan', price: '₺₺', rating: 4.7, reviews: 860,
    eta: '30-40 dk', minOrder: 120, fee: 19, discount: null, tags: ['pizza'], open: true,
    payments: ['card','cash','multinet','ticket'],
  },
  {
    id: 'r3', name: 'Burger Atölyesi', cuisine: 'Burger · Fast Food', price: '₺₺', rating: 4.6, reviews: 2100,
    eta: '20-30 dk', minOrder: 100, fee: 15, discount: '2 Al 1 Öde', tags: ['burger'], open: true,
    payments: ['card','cash','multinet'],
  },
  {
    id: 'r4', name: 'Yeşil Kâse', cuisine: 'Vegan · Salata', price: '₺₺', rating: 4.9, reviews: 540,
    eta: '15-25 dk', minOrder: 90, fee: 0, discount: null, tags: ['vegan'], open: true, free: true,
    payments: ['card','multinet','metropol','ticket'],
  },
  {
    id: 'r5', name: 'Tatlıcı Hacı', cuisine: 'Tatlı · Baklava', price: '₺₺₺', rating: 4.8, reviews: 1530,
    eta: '35-45 dk', minOrder: 80, fee: 25, discount: null, tags: ['tatli'], open: false,
    payments: ['card','cash'],
  },
];

const MENU = {
  r1: [
    { id: 'm1', name: 'Adana Dürüm',            desc: 'Acılı kıyma, lavash, közlenmiş biber & soğan',  price: 145, popular: true, cal: 480 },
    { id: 'm2', name: 'Urfa Kebap (1 porsiyon)', desc: 'Acısız, közde, pilav & salata ile',               price: 220, popular: true, cal: 560 },
    { id: 'm3', name: 'Karışık Izgara',          desc: 'Adana, kanat, pirzola, köfte — 2 kişilik',       price: 480,              cal: 920 },
    { id: 'm4', name: 'İçli Köfte (3 adet)',     desc: 'El yapımı, bol cevizli',                          price: 95,               cal: 310 },
    { id: 'm5', name: 'Künefe',                  desc: 'Antep fıstıklı, sıcak servis',                    price: 110,              cal: 420 },
    { id: 'm6', name: 'Ayran',                   desc: 'Ev yapımı, köpüklü',                              price: 35,               cal: 60  },
  ],
};

// add-on groups for product customization
const PRODUCT_OPTIONS = {
  size: { label: 'Porsiyon', required: true, type: 'radio', items: [
    { id: 'tek', label: 'Tek (1 dürüm)', price: 0 },
    { id: 'duble', label: 'Duble (çift et)', price: 55 },
  ]},
  extras: { label: 'Ekstralar', required: false, type: 'check', items: [
    { id: 'peynir', label: 'Ekstra peynir', price: 25 },
    { id: 'patates', label: 'Patates kızartması', price: 40 },
    { id: 'sogan', label: 'Soğan halkası', price: 30 },
  ]},
  spice: { label: 'Acı seviyesi', required: true, type: 'radio', items: [
    { id: 'acisiz', label: 'Acısız', price: 0 },
    { id: 'az', label: 'Az acılı', price: 0 },
    { id: 'cok', label: 'Bol acılı', price: 0 },
  ]},
};

Object.assign(window, {
  Icon, Pill, MediaBox, Badge, PrimaryBtn, ScreenHeader, money,
  CATEGORIES, RESTAURANTS, MENU, PRODUCT_OPTIONS, PAYMENT_LABELS,
});
