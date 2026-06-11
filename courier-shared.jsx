// courier-shared.jsx — icons, data & primitives for the courier app
// Reuses Icon from kimoo-shared.jsx + adds courier-specific helpers

const { Icon, Badge, money } = window;

// ============ COURIER-SPECIFIC DATA ============
const COURIER_PROFILE = {
  name: 'Mehmet Arslan', initials: 'MA', phone: '+90 532 456 7890',
  rating: 4.92, totalDeliveries: 1243, memberSince: 'Ocak 2024',
  level: 'Altın Kurye', vehicle: 'Motosiklet',
};

const EARNINGS_DATA = {
  today: { deliveries: 8, hours: 5.2, gross: 640, tip: 95, bonus: 50 },
  week: { deliveries: 42, hours: 31, gross: 3480, tip: 520, bonus: 200 },
  month: { deliveries: 168, hours: 124, gross: 14200, tip: 2100, bonus: 800 },
};

const DAILY_CHART = [
  { day: 'Pzt', val: 580 }, { day: 'Sal', val: 720 }, { day: 'Çar', val: 650 },
  { day: 'Per', val: 810 }, { day: 'Cum', val: 920 }, { day: 'Cmt', val: 1100 },
  { day: 'Paz', val: 700 },
];

const INCOMING_ORDER = {
  id: 'KM-4833', restaurant: 'Köşe Ocakbaşı', restaurantAddr: 'Moda Cad. No:45, Kadıköy',
  customer: 'Elif Y.', customerAddr: 'Caferağa Mah. Bahariye No:12 D:5',
  items: 3, distance: 2.4, estTime: '12 dk', earnings: 42, tip: 10,
};

const ACTIVE_ORDERS = [
  { id: 'KM-4831', restaurant: 'Napoli Pizzeria', customer: 'Can B.', status: 'pickup', items: 2, distance: 1.8, earnings: 35 },
  { id: 'KM-4833', restaurant: 'Köşe Ocakbaşı', customer: 'Elif Y.', status: 'delivering', items: 3, distance: 2.4, earnings: 42 },
];

const PAST_DELIVERIES = [
  { id: 'KM-4828', restaurant: 'Burger Atölyesi', time: '18:45', earnings: 38, tip: 15, rating: 5 },
  { id: 'KM-4825', restaurant: 'Yeşil Kâse', time: '17:20', earnings: 32, tip: 10, rating: 5 },
  { id: 'KM-4820', restaurant: 'Napoli Pizzeria', time: '15:50', earnings: 35, tip: 0, rating: 4 },
  { id: 'KM-4815', restaurant: 'Köşe Ocakbaşı', time: '14:10', earnings: 42, tip: 20, rating: 5 },
  { id: 'KM-4810', restaurant: 'Tatlıcı Hacı', time: '12:30', earnings: 28, tip: 5, rating: 5 },
];

const NOTIFICATIONS = [
  { title: 'Yoğun saat bonusu aktif!', desc: '20:00-22:00 arası teslimat başına +₺15 bonus', time: '5 dk', type: 'bonus' },
  { title: 'Haftalık özetim hazır', desc: '42 teslimat, ₺4.200 kazanç', time: '2 sa', type: 'info' },
  { title: 'Performans puanın yükseldi', desc: '4.88 → 4.92 ★', time: '1 gün', type: 'success' },
];

// ============ COURIER PRIMITIVES ============
function CourierHeader({ title, subtitle, right, dark }) {
  return (
    <div style={{ paddingTop: 56, padding: '56px 20px 14px', background: 'var(--bg-surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{subtitle}</div>}
        </div>
        {right}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '14px 12px', textAlign: 'center' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: accent || 'var(--text-primary)', letterSpacing: '-0.02em' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function OnlineToggle({ online, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px',
      borderRadius: 999, border: 'none', cursor: 'pointer',
      background: online ? 'var(--success-500)' : 'var(--bg-sunken)',
      color: online ? '#fff' : 'var(--text-secondary)',
      fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
      boxShadow: online ? '0 4px 14px rgba(22,163,74,0.35)' : 'none',
      transition: 'all .25s ease',
    }}>
      <span style={{ width: 10, height: 10, borderRadius: 999, background: online ? '#fff' : 'var(--text-muted)', transition: 'background .2s ease' }}></span>
      {online ? 'Çevrimiçi' : 'Çevrimdışı'}
    </button>
  );
}

function OrderActionBtn({ children, onClick, variant = 'primary', style = {} }) {
  const isPrimary = variant === 'primary';
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, color: isPrimary ? '#fff' : 'var(--text-primary)',
      background: isPrimary ? 'var(--brand-500)' : 'var(--bg-surface)',
      border: isPrimary ? 'none' : '1.5px solid var(--border-default)',
      borderRadius: 999, padding: '15px 22px', cursor: 'pointer', width: '100%',
      boxShadow: isPrimary ? 'var(--shadow-brand)' : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'all .15s ease', ...style,
    }}>{children}</button>
  );
}

Object.assign(window, {
  COURIER_PROFILE, EARNINGS_DATA, DAILY_CHART, INCOMING_ORDER, ACTIVE_ORDERS, PAST_DELIVERIES, NOTIFICATIONS,
  CourierHeader, StatCard, OnlineToggle, OrderActionBtn,
});
