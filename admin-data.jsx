// admin-data.jsx — Mock data and primitives for Super Admin Dashboard
const { Icon, Badge, money } = window;

// ============ PLATFORM-WIDE KPIs ============
const PLATFORM_STATS = {
  totalOrders: 48250, ordersToday: 1842, revenue: 12480000, revenueToday: 486200,
  restaurants: 342, activeRestaurants: 318, couriers: 580, activeCouriers: 412,
  customers: 86400, newCustomersToday: 234, avgRating: 4.72,
  gmv: 48250000, commission: 5790000, disputes: 23, fraudAlerts: 4,
};

const HEALTH = [
  { label: 'API Uptime', value: '99.97%', status: 'ok' },
  { label: 'Ort. Yanıt Süresi', value: '124ms', status: 'ok' },
  { label: 'Aktif Sipariş', value: '186', status: 'ok' },
  { label: 'Hata Oranı', value: '0.03%', status: 'ok' },
  { label: 'Ödeme Başarı', value: '99.2%', status: 'warn' },
  { label: 'Destek Kuyruğu', value: '12', status: 'warn' },
];

const MONTHLY_REVENUE = [
  { m: 'Oca', val: 8.2 }, { m: 'Şub', val: 9.4 }, { m: 'Mar', val: 11.1 },
  { m: 'Nis', val: 10.8 }, { m: 'May', val: 13.6 }, { m: 'Haz', val: 12.5 },
];

const RESTAURANTS_LIST = [
  { id: 'R001', name: 'Köşe Ocakbaşı', branch: 'Kadıköy', plan: 'Yıllık', selected: true, rating: 4.8, orders: 1240, revenue: 185000, status: 'active', joined: '2024-01' },
  { id: 'R002', name: 'Napoli Pizzeria', branch: 'Beşiktaş', plan: 'Yıllık', selected: false, rating: 4.7, orders: 860, revenue: 142000, status: 'active', joined: '2024-02' },
  { id: 'R003', name: 'Burger Atölyesi', branch: 'Şişli', plan: 'Aylık', selected: false, rating: 4.6, orders: 2100, revenue: 310000, status: 'active', joined: '2023-11' },
  { id: 'R004', name: 'Yeşil Kâse', branch: 'Kadıköy', plan: 'Yıllık', selected: true, rating: 4.9, orders: 540, revenue: 78000, status: 'active', joined: '2024-03' },
  { id: 'R005', name: 'Tatlıcı Hacı', branch: 'Üsküdar', plan: 'Aylık', selected: false, rating: 4.8, orders: 1530, revenue: 198000, status: 'suspended', joined: '2023-09' },
  { id: 'R006', name: 'Deniz Balık', branch: 'Beykoz', plan: 'Aylık', selected: false, rating: 4.5, orders: 320, revenue: 96000, status: 'pending', joined: '2024-06' },
];

const CUSTOMERS_LIST = [
  { id: 'C001', name: 'Elif Yılmaz', email: 'elif@gmail.com', orders: 47, spent: 6800, plan: 'Kimoo+', status: 'active', joined: '2024-01' },
  { id: 'C002', name: 'Can Berk', email: 'can@gmail.com', orders: 32, spent: 4200, plan: 'Ücretsiz', status: 'active', joined: '2024-02' },
  { id: 'C003', name: 'Zeynep Arslan', email: 'zeynep@gmail.com', orders: 18, spent: 2400, plan: 'Kimoo+', status: 'active', joined: '2024-03' },
  { id: 'C004', name: 'Mehmet Tok', email: 'mehmet@gmail.com', orders: 5, spent: 680, plan: 'Ücretsiz', status: 'flagged', joined: '2024-05' },
  { id: 'C005', name: 'Ayşe Kara', email: 'ayse@gmail.com', orders: 62, spent: 9200, plan: 'Kimoo+', status: 'active', joined: '2023-10' },
];

const COURIERS_LIST = [
  { id: 'K001', name: 'Mehmet Arslan', rating: 4.92, deliveries: 1243, earnings: 42000, status: 'online', level: 'Altın', zone: 'Kadıköy' },
  { id: 'K002', name: 'Ali Demir', rating: 4.85, deliveries: 980, earnings: 36500, status: 'online', level: 'Altın', zone: 'Beşiktaş' },
  { id: 'K003', name: 'Emre Yıldız', rating: 4.71, deliveries: 650, earnings: 24000, status: 'offline', level: 'Gümüş', zone: 'Şişli' },
  { id: 'K004', name: 'Burak Çelik', rating: 4.45, deliveries: 320, earnings: 12800, status: 'online', level: 'Bronz', zone: 'Üsküdar' },
  { id: 'K005', name: 'Hasan Koç', rating: 3.90, deliveries: 180, earnings: 7200, status: 'suspended', level: 'Bronz', zone: 'Kadıköy' },
];

const FINANCE_DATA = {
  totalGMV: 48250000, commission: 5790000, payouts: 4200000, pending: 1590000,
  disputes: [
    { id: 'D001', customer: 'Mehmet T.', restaurant: 'Burger Atölyesi', amount: 185, reason: 'Eksik ürün', status: 'open', date: '10 Haz' },
    { id: 'D002', customer: 'Ayşe K.', restaurant: 'Napoli Pizzeria', amount: 120, reason: 'Geç teslimat', status: 'resolved', date: '9 Haz' },
    { id: 'D003', customer: 'Can B.', restaurant: 'Köşe Ocakbaşı', amount: 290, reason: 'Yanlış sipariş', status: 'open', date: '8 Haz' },
  ],
  fraud: [
    { id: 'F001', type: 'Şüpheli sipariş', user: 'Mehmet T.', detail: 'Aynı adresten 5 farklı hesapla sipariş', risk: 'high', date: '10 Haz' },
    { id: 'F002', type: 'Kupon kötüye kullanım', user: 'guest_4821', detail: '24 saatte 8 farklı kupon kullanımı', risk: 'medium', date: '9 Haz' },
  ],
};

const AUDIT_LOGS = [
  { time: '20:45', user: 'admin@kimoo.com', action: 'Restoran askıya alındı', target: 'Tatlıcı Hacı (R005)', level: 'warning' },
  { time: '19:30', user: 'ops@kimoo.com', action: 'Rapor incelendi — çözüldü', target: '#RPT-3842', level: 'success' },
  { time: '18:15', user: 'admin@kimoo.com', action: 'Kurye hesabı askıya alındı', target: 'Hasan Koç (K005)', level: 'warning' },
  { time: '16:40', user: 'finance@kimoo.com', action: 'Toplu ödeme başlatıldı', target: '₺4.2M — 318 restoran', level: 'info' },
  { time: '14:20', user: 'admin@kimoo.com', action: 'Yeni restoran onaylandı', target: 'Deniz Balık (R006)', level: 'success' },
];

const USER_REPORTS = [
  { id: 'RPT-3845', reporter: 'Elif Y.', reporterType: 'customer', target: 'Kurye — Hasan Koç', reason: 'Kaba davranış', detail: 'Kurye kapıda bağırdı ve paketi yere bırakıp gitti.', status: 'open', priority: 'high', date: '10 Haz', order: '#KM-4821' },
  { id: 'RPT-3844', reporter: 'Mehmet Arslan', reporterType: 'courier', target: 'Restoran — Tatlıcı Hacı', reason: 'Uzun bekleme', detail: 'Restoranda 40 dk bekletildim, sipariş hâlâ hazır değildi.', status: 'open', priority: 'medium', date: '10 Haz', order: '#KM-4819' },
  { id: 'RPT-3842', reporter: 'Can B.', reporterType: 'customer', target: 'Restoran — Burger Atölyesi', reason: 'Eksik ürün', detail: 'Siparişte 2 burger vardı ama sadece 1 tane geldi.', status: 'resolved', priority: 'medium', date: '9 Haz', order: '#KM-4815' },
  { id: 'RPT-3840', reporter: 'Zeynep A.', reporterType: 'customer', target: 'Kurye — Burak Çelik', reason: 'Paket hasarlı geldi', detail: 'İçecek dökülmüş, yemek ezilmişti.', status: 'resolved', priority: 'low', date: '9 Haz', order: '#KM-4810' },
  { id: 'RPT-3838', reporter: 'Ali Demir', reporterType: 'courier', target: 'Müşteri — Mehmet T.', reason: 'Müşteriye ulaşılamadı', detail: 'Telefon açılmadı, kapı zilini 5 kez çaldım, 20 dk bekledim.', status: 'open', priority: 'low', date: '8 Haz', order: '#KM-4805' },
  { id: 'RPT-3835', reporter: 'Ayşe K.', reporterType: 'customer', target: 'Restoran — Napoli Pizzeria', reason: 'Hijyen sorunu', detail: 'Pizzanın üstünde saç teli vardı.', status: 'investigating', priority: 'high', date: '8 Haz', order: '#KM-4800' },
];

const ROLES = [
  { name: 'Süper Admin', users: 2, perms: 'Tam yetki' },
  { name: 'Operasyon', users: 5, perms: 'Sipariş, restoran, kurye yönetimi' },
  { name: 'Finans', users: 3, perms: 'Ödeme, rapor, itiraz yönetimi' },
  { name: 'Destek', users: 8, perms: 'Müşteri, sipariş destek' },
  { name: 'İçerik', users: 2, perms: 'Kampanya, bildirim, içerik' },
];

// ============ ADMIN SIDEBAR ============
function AdminSideNav({ active, onNav }) {
  const sections = [
    { label: 'GENEL', items: [
      { id: 'dashboard', icon: 'home', label: 'Genel Bakış' },
    ]},
    { label: 'YÖNETİM', items: [
      { id: 'restaurants', icon: 'flame', label: 'Restoranlar', badge: '342' },
      { id: 'customers', icon: 'user', label: 'Müşteriler' },
      { id: 'couriers', icon: 'scooter', label: 'Kuryeler' },
      { id: 'reports', icon: 'close', label: 'Raporlar', badge: '3' },
    ]},
    { label: 'FİNANS', items: [
      { id: 'finance', icon: 'wallet', label: 'Finans & Ödeme' },
    ]},
    { label: 'OPERASYON', items: [
      { id: 'campaigns', icon: 'tag', label: 'Kampanyalar' },
      { id: 'notifications', icon: 'msg', label: 'Bildirimler' },
    ]},
    { label: 'SİSTEM', items: [
      { id: 'roles', icon: 'user', label: 'Rol & Yetki' },
      { id: 'audit', icon: 'clock', label: 'Denetim Kayıtları' },
      { id: 'config', icon: 'filter', label: 'Sistem Ayarları' },
    ]},
  ];

  return (
    <div style={{ width: 240, borderRight: '1px solid var(--border-subtle)', background: 'var(--neutral-950)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', flex: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 17, flex: 'none', boxShadow: 'var(--shadow-brand)' }}>k</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: '#fff', letterSpacing: '-0.01em' }}>Kimoo</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.04em' }}>SUPER ADMIN</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
        {sections.map((s, si) => (
          <div key={si} style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.25)', padding: '12px 20px 6px' }}>{s.label}</div>
            {s.items.map(item => {
              const on = active === item.id;
              return (
                <button key={item.id} onClick={() => onNav(item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 20px',
                  border: 'none', cursor: 'pointer', borderLeft: on ? '3px solid var(--brand-500)' : '3px solid transparent',
                  background: on ? 'rgba(255,90,60,0.12)' : 'transparent',
                  color: on ? '#fff' : 'rgba(255,255,255,0.55)',
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: on ? 700 : 500, transition: 'all .12s ease', textAlign: 'left',
                }}>
                  <Icon name={item.icon} size={18} color={on ? 'var(--brand-500)' : 'rgba(255,255,255,0.35)'} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>{item.badge}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12, color: '#fff' }}>SA</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Super Admin</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>admin@kimoo.com</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PLATFORM_STATS, HEALTH, MONTHLY_REVENUE, RESTAURANTS_LIST, CUSTOMERS_LIST, COURIERS_LIST,
  FINANCE_DATA, AUDIT_LOGS, ROLES, USER_REPORTS, AdminSideNav,
});
