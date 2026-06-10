// resto-data.jsx — Mock data and shared primitives for Restaurant Portal
const { Icon, Badge, money } = window;

// ============ RESTAURANT DATA ============
const RESTO_INFO = {
  name: 'Köşe Ocakbaşı', branch: 'Kadıköy', plan: 'Profesyonel',
  rating: 4.8, reviews: 1240, openSince: '2019',
};

const TODAY_STATS = {
  orders: 47, revenue: 12480, avgOrder: 265, activeOrders: 5,
  cancelRate: 2.1, avgPrepTime: '18 dk', rating: 4.8,
};

const WEEKLY_REVENUE = [
  { day: 'Pzt', val: 8200 }, { day: 'Sal', val: 9800 }, { day: 'Çar', val: 11400 },
  { day: 'Per', val: 10600 }, { day: 'Cum', val: 14200 }, { day: 'Cmt', val: 18500 },
  { day: 'Paz', val: 12480 },
];

const LIVE_ORDERS = [
  { id: 'KM-4833', customer: 'Elif Y.', items: ['Adana Dürüm x2', 'Ayran x2'], total: 360, time: '2 dk önce', status: 'new', note: 'Acısız olsun' },
  { id: 'KM-4832', customer: 'Can B.', items: ['Karışık Izgara', 'İçli Köfte x3'], total: 765, time: '5 dk önce', status: 'preparing', note: '' },
  { id: 'KM-4831', customer: 'Zeynep A.', items: ['Urfa Kebap', 'Künefe'], total: 330, time: '12 dk önce', status: 'ready', note: '' },
  { id: 'KM-4830', customer: 'Mehmet T.', items: ['Adana Dürüm', 'Patates'], total: 185, time: '18 dk önce', status: 'picked', note: '' },
  { id: 'KM-4829', customer: 'Ayşe K.', items: ['İçli Köfte x6', 'Ayran x3'], total: 295, time: '25 dk önce', status: 'delivered', note: '' },
];

const ORDER_STATUSES = {
  new: { label: 'Yeni', tone: 'brand', dotColor: 'var(--brand-500)' },
  preparing: { label: 'Hazırlanıyor', tone: 'warning', dotColor: 'var(--warning-500)' },
  ready: { label: 'Hazır', tone: 'success', dotColor: 'var(--success-500)' },
  picked: { label: 'Kuryede', tone: 'info', dotColor: 'var(--info-500)' },
  delivered: { label: 'Teslim', tone: 'success', dotColor: 'var(--success-500)' },
  cancelled: { label: 'İptal', tone: 'error', dotColor: 'var(--error-500)' },
};

const MENU_CATEGORIES = [
  { id: 'kebap', name: 'Kebap & Izgara', count: 8, active: true },
  { id: 'tatli', name: 'Tatlılar', count: 4, active: true },
  { id: 'icecek', name: 'İçecekler', count: 6, active: true },
  { id: 'meze', name: 'Mezeler', count: 5, active: false },
];

const MENU_ITEMS = [
  { id: 'p1', name: 'Adana Dürüm', cat: 'kebap', price: 145, active: true, popular: true, stock: true },
  { id: 'p2', name: 'Urfa Kebap (1 porsiyon)', cat: 'kebap', price: 220, active: true, popular: true, stock: true },
  { id: 'p3', name: 'Karışık Izgara', cat: 'kebap', price: 480, active: true, popular: false, stock: true },
  { id: 'p4', name: 'İçli Köfte (3 adet)', cat: 'kebap', price: 95, active: true, popular: false, stock: true },
  { id: 'p5', name: 'Künefe', cat: 'tatli', price: 110, active: true, popular: true, stock: true },
  { id: 'p6', name: 'Sütlaç', cat: 'tatli', price: 65, active: true, popular: false, stock: false },
  { id: 'p7', name: 'Ayran', cat: 'icecek', price: 35, active: true, popular: false, stock: true },
  { id: 'p8', name: 'Şalgam', cat: 'icecek', price: 40, active: true, popular: false, stock: true },
];

const CAMPAIGNS = [
  { id: 'c1', name: '%30 İndirim — İlk Sipariş', type: 'İndirim', status: 'active', startDate: '1 Haz', endDate: '30 Haz', orders: 124, revenue: 18600 },
  { id: 'c2', name: '2 Al 1 Öde — Dürüm', type: 'Promosyon', status: 'active', startDate: '5 Haz', endDate: '15 Haz', orders: 67, revenue: 9700 },
  { id: 'c3', name: 'Ücretsiz Teslimat Haftası', type: 'Teslimat', status: 'ended', startDate: '20 May', endDate: '27 May', orders: 210, revenue: 31500 },
];

const RECENT_REVIEWS = [
  { customer: 'Elif Y.', stars: 5, text: 'Adana dürüm efsane, paketleme de çok güzeldi.', date: '2 saat önce', reply: null },
  { customer: 'Mehmet T.', stars: 4, text: 'Kebaplar çok iyi ama teslimat biraz geç geldi.', date: '5 saat önce', reply: 'Teşekkürler Mehmet Bey! Teslimat süremizi iyileştiriyoruz.' },
  { customer: 'Zeynep A.', stars: 5, text: 'İçli köfte harika! Sıcak servis geldi.', date: '1 gün önce', reply: null },
];

const HOURLY_ORDERS = [
  { hour: '10', val: 3 }, { hour: '11', val: 5 }, { hour: '12', val: 12 },
  { hour: '13', val: 15 }, { hour: '14', val: 8 }, { hour: '15', val: 4 },
  { hour: '16', val: 3 }, { hour: '17', val: 6 }, { hour: '18', val: 14 },
  { hour: '19', val: 18 }, { hour: '20', val: 22 }, { hour: '21', val: 16 },
  { hour: '22', val: 8 },
];

const TOP_ITEMS = [
  { name: 'Adana Dürüm', orders: 156, revenue: 22620, pct: 100 },
  { name: 'Urfa Kebap', orders: 98, revenue: 21560, pct: 63 },
  { name: 'Karışık Izgara', orders: 72, revenue: 34560, pct: 46 },
  { name: 'Künefe', orders: 89, revenue: 9790, pct: 57 },
  { name: 'İçli Köfte', orders: 64, revenue: 6080, pct: 41 },
];

// ============ SHARED LAYOUT PRIMITIVES ============
function MetricCard({ label, value, change, changeUp, icon, color }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px 18px', flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: color || 'var(--brand-50)', display: 'grid', placeItems: 'center' }}>
          <Icon name={icon} size={20} color={color ? '#fff' : 'var(--brand-600)'} />
        </div>
        {change && (
          <span style={{ fontSize: 12, fontWeight: 700, color: changeUp ? 'var(--success-600)' : 'var(--error-600)', display: 'flex', alignItems: 'center', gap: 2 }}>
            {changeUp ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function TableHeader({ children }) {
  return <div style={{ display: 'flex', padding: '10px 16px', borderBottom: '1px solid var(--border-subtle)', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', gap: 12 }}>{children}</div>;
}

function TableRow({ children, onClick }) {
  return <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', fontSize: 14, gap: 12, cursor: onClick ? 'pointer' : 'default', transition: 'background .1s ease' }} onMouseOver={e => { if(onClick) e.currentTarget.style.background='var(--bg-surface-2)'; }} onMouseOut={e => e.currentTarget.style.background='transparent'}>{children}</div>;
}

function SideNav({ active, onNav, collapsed }) {
  const sections = [
    { label: 'ANA MENÜ', items: [
      { id: 'dashboard', icon: 'home', label: 'Genel Bakış' },
      { id: 'orders', icon: 'bag', label: 'Siparişler' },
      { id: 'menu', icon: 'flame', label: 'Menü Yönetimi' },
    ]},
    { label: 'ANALİTİK', items: [
      { id: 'analytics', icon: 'star', label: 'Raporlar' },
      { id: 'campaigns', icon: 'tag', label: 'Kampanyalar' },
      { id: 'reviews', icon: 'msg', label: 'Yorumlar' },
    ]},
    { label: 'AYARLAR', items: [
      { id: 'settings', icon: 'user', label: 'Ayarlar' },
    ]},
  ];

  return (
    <div style={{ width: collapsed ? 64 : 230, borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', transition: 'width .2s ease', flex: 'none' }}>
      {/* brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '18px 16px' : '18px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 17, flex: 'none', boxShadow: 'var(--shadow-brand)' }}>k</div>
        {!collapsed && <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>Kimoo<span style={{ color: 'var(--text-muted)', fontWeight: 500 }}> İşletme</span></div>}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '10px 0' }}>
        {sections.map((s, si) => (
          <div key={si} style={{ marginBottom: 8 }}>
            {!collapsed && <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', padding: '12px 20px 6px' }}>{s.label}</div>}
            {s.items.map(item => {
              const on = active === item.id;
              return (
                <button key={item.id} onClick={() => onNav(item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: collapsed ? '10px 20px' : '10px 20px',
                  borderRadius: 0, border: 'none', cursor: 'pointer',
                  background: on ? 'var(--brand-50)' : 'transparent',
                  borderLeft: on ? '3px solid var(--brand-500)' : '3px solid transparent',
                  color: on ? 'var(--brand-700)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: on ? 700 : 500,
                  transition: 'all .12s ease', textAlign: 'left',
                }}>
                  <Icon name={item.icon} size={20} color={on ? 'var(--brand-600)' : 'var(--text-tertiary)'} />
                  {!collapsed && <span>{item.label}</span>}
                  {item.id === 'orders' && !collapsed && (
                    <span style={{ marginLeft: 'auto', background: 'var(--brand-500)', color: '#fff', fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 999 }}>5</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* restaurant info */}
      {!collapsed && (
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13, color: 'var(--text-secondary)' }}>KO</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Köşe Ocakbaşı</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Kadıköy Şubesi</div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  RESTO_INFO, TODAY_STATS, WEEKLY_REVENUE, LIVE_ORDERS, ORDER_STATUSES,
  MENU_CATEGORIES, MENU_ITEMS, CAMPAIGNS, RECENT_REVIEWS, HOURLY_ORDERS, TOP_ITEMS,
  MetricCard, TableHeader, TableRow, SideNav,
});
