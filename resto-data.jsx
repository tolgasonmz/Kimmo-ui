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
  scheduled: { label: 'Planlı', tone: 'info', dotColor: 'var(--info-500)' },
};

const MENU_CATEGORIES = [
  { id: 'kebap',  name: 'Kebap & Izgara',  count: 6, active: true },
  { id: 'tatli',  name: 'Tatlılar',         count: 3, active: true },
  { id: 'icecek', name: 'İçecekler',        count: 3, active: true },
  { id: 'meze',   name: 'Mezeler',          count: 2, active: true },
];

const ALLERGENS = ['gluten', 'süt', 'yumurta', 'fındık', 'balık', 'soya', 'susam'];

const MENU_ITEMS = [
  { id:'p1',  name:'Adana Dürüm',        cat:'kebap',  price:145, active:true,  popular:true,  stock:true,  desc:'El açması ince lavaş, acılı Adana kebap, közlenmiş biber ve soğan',              calories:480, prepTime:12, allergens:['gluten'],           orderCount:156, revenue:22620, options:['Acılı','Acısız','Ekstra acı'], ingredients:['Kıyma','Lavaş','Közlenmiş biber','Soğan','Maydanoz','Sumak'], productOptions:[{label:'Porsiyon',type:'radio',required:true,items:[{label:'Tek (1 dürüm)',price:0},{label:'Duble (çift et)',price:55}]},{label:'Acı Seviyesi',type:'radio',required:true,items:[{label:'Acısız',price:0},{label:'Az acılı',price:0},{label:'Bol acılı',price:0}]},{label:'Ekstralar',type:'check',required:false,items:[{label:'Ekstra peynir',price:25},{label:'Patates kızartması',price:40},{label:'Soğan halkası',price:30}]}] },
  { id:'p2',  name:'Urfa Kebap',         cat:'kebap',  price:220, active:true,  popular:true,  stock:true,  desc:'Tatlı baharatlı Urfa kebap, pide üzerinde, közlenmiş domates ile',               calories:560, prepTime:15, allergens:['gluten'],           orderCount:98,  revenue:21560, options:['Tek porsiyon','Çift porsiyon'], ingredients:['Urfa kebap eti','Pide','Közlenmiş domates','Biber','Yoğurt'] },
  { id:'p3',  name:'Karışık Izgara',     cat:'kebap',  price:480, active:true,  popular:false, stock:true,  desc:'Adana, tavuk şiş, kanat ve köfte; yanında pilav ve közlenmiş sebze',            calories:920, prepTime:20, allergens:['gluten'],           orderCount:72,  revenue:34560, options:['2 kişilik','4 kişilik'], ingredients:['Adana kebap','Tavuk şiş','Kanat','Köfte','Pilav','Közlenmiş sebze'] },
  { id:'p4',  name:'İçli Köfte (3 adet)',cat:'kebap',  price:95,  active:true,  popular:false, stock:true,  desc:'Bulgur hamurundan el yapımı, içi kıymalı ve fıstıklı köfte',                    calories:310, prepTime:8,  allergens:['gluten','fındık'],  orderCount:64,  revenue:6080,  options:['3 adet','6 adet'] },
  { id:'p5',  name:'Patlıcan Kebap',     cat:'kebap',  price:195, active:true,  popular:false, stock:true,  desc:'Közlenmiş patlıcan üzerinde Adana kebap, sarımsaklı yoğurt ile',                 calories:520, prepTime:18, allergens:['gluten','süt'],     orderCount:45,  revenue:8775,  options:['Acılı','Acısız'] },
  { id:'p6',  name:'Lahmacun (2 adet)',  cat:'kebap',  price:80,  active:true,  popular:true,  stock:true,  desc:'İnce hamur üzerinde kıymalı iç harç, limon ve maydanoz ile servis',              calories:380, prepTime:10, allergens:['gluten'],           orderCount:88,  revenue:7040,  options:['Kıymalı','Kıymasız'] },
  { id:'p7',  name:'Künefe',             cat:'tatli',  price:110, active:true,  popular:true,  stock:true,  desc:'Tel kadayıf arasında Hatay peyniri, şeker şurubuna batırılmış',                 calories:420, prepTime:15, allergens:['gluten','süt'],     orderCount:89,  revenue:9790,  options:['Fıstıklı','Fıstıksız'], ingredients:['Tel kadayıf','Hatay peyniri','Şeker şurubu','Antep fıstığı','Tereyağı'] },
  { id:'p8',  name:'Sütlaç',             cat:'tatli',  price:65,  active:true,  popular:false, stock:false, desc:'Fırında pişirilmiş geleneksel Türk sütlacı, tarçın tozu ile',                   calories:280, prepTime:5,  allergens:['süt'],              orderCount:34,  revenue:2210  },
  { id:'p9',  name:'Baklava (3 adet)',   cat:'tatli',  price:85,  active:true,  popular:false, stock:true,  desc:'Tereyağlı yufka arasında antep fıstığı, şerbetlenmiş, soğuk servis',            calories:390, prepTime:3,  allergens:['gluten','fındık','süt'], orderCount:52, revenue:4420 },
  { id:'p10', name:'Ayran',              cat:'icecek', price:35,  active:true,  popular:false, stock:true,  desc:'Ev yapımı taze yayık ayranı, tuzlu',                                            calories:60,  prepTime:2,  allergens:['süt'],              orderCount:210, revenue:7350  },
  { id:'p11', name:'Şalgam',             cat:'icecek', price:40,  active:true,  popular:false, stock:true,  desc:'Doğal fermente şalgam suyu, acı veya tatlı seçeneği ile',                       calories:25,  prepTime:2,  allergens:[],                   orderCount:140, revenue:5600,  options:['Acı','Tatlı'] },
  { id:'p12', name:'Limonata',           cat:'icecek', price:45,  active:true,  popular:true,  stock:true,  desc:'Taze sıkılmış limon, nane ve şeker şurubu, bol buz ile',                        calories:90,  prepTime:3,  allergens:[],                   orderCount:95,  revenue:4275  },
  { id:'p13', name:'Cacık',              cat:'meze',   price:55,  active:true,  popular:false, stock:true,  desc:'Yoğurt, salatalık, sarımsak ve dereotu, zeytinyağı gezdirilmiş',                calories:120, prepTime:5,  allergens:['süt'],              orderCount:60,  revenue:3300  },
  { id:'p14', name:'Humus',              cat:'meze',   price:65,  active:true,  popular:false, stock:true,  desc:'Nohut ezmesi, tahin, limon ve sarımsak, zeytinyağı ile',                        calories:160, prepTime:5,  allergens:['susam'],            orderCount:45,  revenue:2925  },
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
      { id: 'dashboard',    icon: 'home',    label: 'Genel Bakış' },
      { id: 'orders',       icon: 'bag',     label: 'Siparişler' },
      { id: 'menu',         icon: 'flame',   label: 'Menü Yönetimi' },
      { id: 'integrations', icon: 'link',    label: 'Entegrasyonlar' },
    ]},
    { label: 'MÜŞTERİ', items: [
      { id: 'messages',  icon: 'msg',   label: 'Müşteri Mesajları', badge: '3' },
    ]},
    { label: 'ANALİTİK', items: [
      { id: 'analytics', icon: 'star',  label: 'Raporlar' },
      { id: 'campaigns', icon: 'tag',   label: 'Kampanyalar' },
      { id: 'reviews',   icon: 'heart', label: 'Yorumlar' },
    ]},
    { label: 'ÖDÜLLER', items: [
      { id: 'rewards', icon: 'trophy', label: 'Ödüller & Görevler', badge: '3' },
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
                  {item.badge && !collapsed && (
                    <span style={{ marginLeft: 'auto', background: 'var(--success-500)', color: '#fff', fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 999 }}>{item.badge}</span>
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

const SCHEDULED_ORDERS = [
  { id: 'KM-4840', customer: 'Ayşe D.', items: ['Karışık Izgara', 'Ayran x2'], total: 550, time: 'Bugün 19:30', status: 'scheduled', note: 'Doğum günü için hazırlansın', scheduledTime: 'Bugün 19:30' },
  { id: 'KM-4841', customer: 'Burak K.', items: ['Adana Dürüm x4', 'İçli Köfte x6'], total: 1150, time: 'Bugün 20:00', status: 'scheduled', note: '', scheduledTime: 'Bugün 20:00' },
  { id: 'KM-4842', customer: 'Selin M.', items: ['Künefe x2', 'Baklava x3'], total: 475, time: 'Yarın 12:30', status: 'scheduled', note: 'Ofise teslimat, resepsiyon', scheduledTime: 'Yarın 12:30' },
  { id: 'KM-4843', customer: 'Emre T.', items: ['Urfa Kebap x2', 'Cacık', 'Ayran x2'], total: 575, time: 'Yarın 19:00', status: 'scheduled', note: '', scheduledTime: 'Yarın 19:00' },
];

Object.assign(window, {
  RESTO_INFO, TODAY_STATS, WEEKLY_REVENUE, LIVE_ORDERS, ORDER_STATUSES, SCHEDULED_ORDERS,
  MENU_CATEGORIES, MENU_ITEMS, ALLERGENS, CAMPAIGNS, RECENT_REVIEWS, HOURLY_ORDERS, TOP_ITEMS,
  MetricCard, TableHeader, TableRow, SideNav,
});
