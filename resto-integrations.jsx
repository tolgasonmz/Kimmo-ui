// resto-integrations.jsx — Multi-platform entegrasyon & birleşik sipariş yönetimi
const { Icon, Badge, money, MetricCard } = window;

const INIT_PLATFORMS = [
  { id: 'yemeksepeti', name: 'Yemeksepeti',   short: 'YS', color: '#FF6B35', bg: '#FFF0EB', fg: '#C94A17', connected: true,  username: 'kose_ocakbasi_kadikoy', ordersToday: 24, revenue: 8640  },
  { id: 'trendyol',    name: 'Trendyol Yemek', short: 'TY', color: '#F27A1A', bg: '#FFF4EB', fg: '#C15E0D', connected: true,  username: 'kose-ocakbasi',         ordersToday: 15, revenue: 5250  },
  { id: 'getir',       name: 'Getir',           short: 'GT', color: '#5C3EBC', bg: '#F0EDFF', fg: '#4A31A0', connected: false },
  { id: 'migros',      name: 'Migros Yemek',   short: 'MG', color: '#E31E24', bg: '#FFEBEB', fg: '#B81419', connected: false },
];

const INIT_ORDERS = [
  { id: 'YS-7821', platform: 'yemeksepeti', customer: 'Ahmet K.',   items: ['Karışık Izgara', 'Ayran x2'],    total: 550, time: '3 dk önce',  status: 'new'       },
  { id: 'TY-3341', platform: 'trendyol',    customer: 'Selin M.',   items: ['Adana Dürüm x2'],                total: 290, time: '5 dk önce',  status: 'new'       },
  { id: 'YS-7820', platform: 'yemeksepeti', customer: 'Burak D.',   items: ['Urfa Kebap', 'Künefe'],          total: 330, time: '11 dk önce', status: 'preparing' },
  { id: 'TY-3340', platform: 'trendyol',    customer: 'Fatma Ş.',   items: ['İçli Köfte x3', 'Ayran'],        total: 320, time: '14 dk önce', status: 'ready'     },
  { id: 'YS-7819', platform: 'yemeksepeti', customer: 'Emre A.',    items: ['Lahmacun x4', 'Şalgam x2'],     total: 380, time: '22 dk önce', status: 'picked'    },
  { id: 'TY-3339', platform: 'trendyol',    customer: 'Gülay T.',   items: ['Karışık Izgara x2'],             total: 960, time: '28 dk önce', status: 'delivered' },
  { id: 'YS-7818', platform: 'yemeksepeti', customer: 'Hasan Y.',   items: ['Adana Dürüm', 'Sütlaç'],        total: 210, time: '35 dk önce', status: 'delivered' },
  { id: 'TY-3338', platform: 'trendyol',    customer: 'Neslihan B.', items: ['Patlıcan Kebap', 'Ayran'],     total: 230, time: '44 dk önce', status: 'delivered' },
];

const STATUS_MAP = {
  new:       { label: 'Yeni',         tone: 'brand',   dot: 'var(--brand-500)'   },
  preparing: { label: 'Hazırlanıyor', tone: 'warning',  dot: 'var(--warning-500)' },
  ready:     { label: 'Hazır',        tone: 'success',  dot: 'var(--success-500)' },
  picked:    { label: 'Kuryede',      tone: 'info',     dot: 'var(--info-500)'    },
  delivered: { label: 'Teslim',       tone: 'success',  dot: 'var(--success-500)' },
};

const STATUS_NEXT = { new: 'preparing', preparing: 'ready' };

function IntegrationsView() {
  const [platforms, setPlatforms] = React.useState(INIT_PLATFORMS);
  const [orders, setOrders] = React.useState(INIT_ORDERS);
  const [activePlatform, setActivePlatform] = React.useState('all');
  const [connecting, setConnecting] = React.useState(null);

  const connected = platforms.filter(p => p.connected);
  const totalOrders = connected.reduce((s, p) => s + (p.ordersToday || 0), 0);
  const totalRevenue = connected.reduce((s, p) => s + (p.revenue || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'new').length;

  const filteredOrders = activePlatform === 'all'
    ? orders
    : orders.filter(o => o.platform === activePlatform);

  const togglePlatform = (id) => {
    const pl = platforms.find(p => p.id === id);
    if (pl.connected) {
      setPlatforms(ps => ps.map(p => p.id === id ? { ...p, connected: false } : p));
    } else {
      setConnecting(id);
      setTimeout(() => {
        setPlatforms(ps => ps.map(p => p.id === id ? { ...p, connected: true, username: 'kose_ocakbasi', ordersToday: 0, revenue: 0 } : p));
        setConnecting(null);
      }, 1400);
    }
  };

  const advanceOrder = (id) => {
    setOrders(os => os.map(o => {
      if (o.id !== id) return o;
      const next = STATUS_NEXT[o.status];
      return next ? { ...o, status: next } : o;
    }));
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Platform Entegrasyonları</div>
        <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 3 }}>Tüm yemek sipariş platformlarını tek panelden takip et ve yönet</div>
      </div>

      {/* Platform cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {platforms.map(p => (
          <PlatformConnectCard key={p.id} p={p} connecting={connecting === p.id} onToggle={() => togglePlatform(p.id)} />
        ))}
      </div>

      {/* Summary metrics — only when connected */}
      {connected.length > 0 && (
        <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
          <MetricCard label="Tüm platformlar bugün" value={`${totalOrders} sipariş`} change="%22" changeUp icon="bag" />
          <MetricCard label="Toplam platform cirosu" value={money(totalRevenue)} change="%18" changeUp icon="wallet" />
          <MetricCard label="Bağlı platform" value={`${connected.length} / ${platforms.length}`} icon="link" />
          <MetricCard label="Onay bekleyen" value={pendingCount} icon="flame" />
        </div>
      )}

      {/* Orders feed */}
      <div>
        {/* Platform filter + title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Tüm Platform Siparişleri</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <PlFilterBtn label={`Tümü (${orders.length})`} active={activePlatform === 'all'} color={null} onClick={() => setActivePlatform('all')} />
            {connected.map(p => (
              <PlFilterBtn key={p.id} label={`${p.name.split(' ')[0]} (${orders.filter(o=>o.platform===p.id).length})`} active={activePlatform === p.id} color={p.color} onClick={() => setActivePlatform(p.id)} />
            ))}
          </div>
        </div>

        {/* Orders table */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {/* Table head */}
          <div style={{ display: 'flex', padding: '10px 16px', borderBottom: '1px solid var(--border-subtle)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', gap: 12 }}>
            <span style={{ flex: '0 0 46px' }}>Platform</span>
            <span style={{ flex: '0 0 96px' }}>Sipariş No</span>
            <span style={{ flex: 1 }}>Müşteri / Ürünler</span>
            <span style={{ flex: '0 0 78px' }}>Tutar</span>
            <span style={{ flex: '0 0 110px' }}>Durum</span>
            <span style={{ flex: '0 0 78px' }}>Zaman</span>
            <span style={{ flex: '0 0 110px' }}></span>
          </div>

          {filteredOrders.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>Bu platformdan henüz sipariş yok</div>
          )}

          {filteredOrders.map(o => {
            const pl = platforms.find(p => p.id === o.platform);
            const st = STATUS_MAP[o.status];
            const nextStatus = STATUS_NEXT[o.status];
            return (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderBottom: '1px solid var(--border-subtle)', fontSize: 14, gap: 12 }}>
                {/* Platform badge */}
                <span style={{ flex: '0 0 46px' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: pl?.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: pl?.fg, letterSpacing: '-0.02em' }}>{pl?.short}</span>
                  </div>
                </span>
                {/* Order ID */}
                <span style={{ flex: '0 0 96px', fontWeight: 700, fontSize: 12, color: 'var(--text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>{o.id}</span>
                {/* Customer + items */}
                <span style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{o.customer}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.items.join(', ')}</div>
                </span>
                {/* Total */}
                <span style={{ flex: '0 0 78px', fontWeight: 700, color: 'var(--text-primary)' }}>{money(o.total)}</span>
                {/* Status */}
                <span style={{ flex: '0 0 110px' }}>
                  <Badge tone={st.tone} style={{ fontSize: 11 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: st.dot }}></span>
                    {st.label}
                  </Badge>
                </span>
                {/* Time */}
                <span style={{ flex: '0 0 78px', color: 'var(--text-tertiary)', fontSize: 12 }}>{o.time}</span>
                {/* Action */}
                <span style={{ flex: '0 0 110px' }}>
                  {nextStatus && (
                    <button onClick={() => advanceOrder(o.id)} style={{ padding: '6px 12px', borderRadius: 999, background: o.status === 'new' ? 'var(--success-500)' : 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}>
                      {o.status === 'new' ? '✓ Kabul et' : '✓ Hazır'}
                    </button>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PlatformConnectCard({ p, connecting, onToggle }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: `1.5px solid ${p.connected ? p.color + '44' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-lg)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14, transition: 'border-color .2s ease' }}>
      {/* Brand row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 46, height: 46, borderRadius: 11, background: p.bg || 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: p.fg || 'var(--text-secondary)', letterSpacing: '-0.02em' }}>{p.short}</span>
        </div>
        {p.connected && <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--success-500)' }}></span>}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }}>{p.name}</div>
        {p.connected ? (
          <>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 10 }}>@{p.username}</div>
            <div style={{ display: 'flex', gap: 14 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{p.ordersToday}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>bugün sipariş</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{money(p.revenue)}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>bugün ciro</div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Hesabını bağla, siparişleri buradan yönet</div>
        )}
      </div>

      {/* Action button */}
      <button onClick={onToggle} disabled={connecting} style={{ width: '100%', padding: '9px 0', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: connecting ? 'wait' : 'pointer', fontFamily: 'var(--font-sans)', border: p.connected ? `1.5px solid color-mix(in srgb, var(--error-500) 40%, transparent)` : 'none', background: connecting ? 'var(--bg-sunken)' : p.connected ? 'transparent' : p.color, color: connecting ? 'var(--text-muted)' : p.connected ? 'var(--error-600)' : '#fff', transition: 'all .2s ease' }}>
        {connecting ? 'Bağlanıyor...' : p.connected ? 'Bağlantıyı kes' : 'Hesabı bağla'}
      </button>
    </div>
  );
}

function PlFilterBtn({ label, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', border: active ? 'none' : '1.5px solid var(--border-default)', background: active ? (color || 'var(--brand-500)') : 'var(--bg-surface)', color: active ? '#fff' : 'var(--text-secondary)', transition: 'all .15s ease' }}>
      {label}
    </button>
  );
}

Object.assign(window, { IntegrationsView, PlatformConnectCard, PlFilterBtn });
