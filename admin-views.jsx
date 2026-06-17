// admin-views.jsx — Dashboard, Restaurants, Customers, Couriers
const { Icon, Badge, money,
  PLATFORM_STATS, HEALTH, MONTHLY_REVENUE, RESTAURANTS_LIST, CUSTOMERS_LIST, COURIERS_LIST,
  MetricCard, TableHeader, TableRow } = window;

const AP = '24px';

// ============ DASHBOARD ============
function AdminDashboard() {
  const s = PLATFORM_STATS;
  const maxM = Math.max(...MONTHLY_REVENUE.map(d => d.val));

  return (
    <div style={{ padding: AP }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Platform Genel Bakış</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>{new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge tone="success" style={{ fontSize: 12, padding: '5px 12px' }}><span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--success-500)' }}></span>Sistem aktif</Badge>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <MetricCard label="Bugünkü sipariş" value={s.ordersToday.toLocaleString('tr-TR')} change="%14" changeUp icon="bag" />
        <MetricCard label="Bugünkü ciro" value={money(s.revenueToday)} change="%22" changeUp icon="wallet" />
        <MetricCard label="Aktif kurye" value={s.activeCouriers} icon="scooter" />
        <MetricCard label="Yeni müşteri" value={s.newCustomersToday} change="%8" changeUp icon="user" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        {/* Monthly revenue */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>Aylık GMV trendi (milyon ₺)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
            {MONTHLY_REVENUE.map((d, i) => {
              const pct = (d.val / maxM) * 100;
              const last = i === MONTHLY_REVENUE.length - 1;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>{d.val}M</span>
                  <div style={{ width: '100%', height: pct + '%', minHeight: 6, borderRadius: 'var(--radius-xs)', background: last ? 'var(--brand-500)' : 'var(--brand-100)' }}></div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: last ? 'var(--brand-600)' : 'var(--text-muted)' }}>{d.m}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform health */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>Platform Sağlığı</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {HEALTH.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: h.status === 'ok' ? 'var(--success-500)' : 'var(--warning-500)', flex: 'none' }}></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{h.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{h.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <SummaryMini label="Toplam restoran" value={s.restaurants} sub={s.activeRestaurants + ' aktif'} icon="flame" />
        <SummaryMini label="Toplam kurye" value={s.couriers} sub={s.activeCouriers + ' çevrimiçi'} icon="scooter" />
        <SummaryMini label="Toplam müşteri" value={(s.customers / 1000).toFixed(1) + 'K'} sub="Aylık %12 büyüme" icon="user" />
        <SummaryMini label="Platform puanı" value={'★ ' + s.avgRating} sub="Son 30 gün" icon="star" />
      </div>

      {/* Alerts row */}
      <div style={{ display: 'flex', gap: 14 }}>
        <AlertCard title="Açık itirazlar" value={s.disputes} desc="İnceleme bekliyor" tone="warning" icon="msg" />
        <AlertCard title="Dolandırıcılık uyarısı" value={s.fraudAlerts} desc="Yüksek risk tespit edildi" tone="error" icon="close" />
        <AlertCard title="Onay bekleyen restoran" value="1" desc="Deniz Balık — Beykoz" tone="info" icon="check" />
      </div>
    </div>
  );
}

function SummaryMini({ label, value, sub, icon }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '16px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--brand-50)', display: 'grid', placeItems: 'center' }}>
        <Icon name={icon} size={20} color="var(--brand-600)" />
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{label}{sub && <span style={{ color: 'var(--text-muted)' }}> · {sub}</span>}</div>
      </div>
    </div>
  );
}

function AlertCard({ title, value, desc, tone, icon }) {
  const tones = { warning: ['var(--warning-50)', 'var(--warning-600)', 'var(--warning-500)'], error: ['var(--error-50)', 'var(--error-600)', 'var(--error-500)'], info: ['var(--info-50)', 'var(--info-600)', 'var(--info-500)'] };
  const [bg, fg, dot] = tones[tone] || tones.info;
  return (
    <div style={{ flex: 1, background: bg, border: '1px solid color-mix(in srgb, ' + dot + ' 20%, transparent)', borderRadius: 'var(--radius-lg)', padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 999, background: dot, display: 'grid', placeItems: 'center', flex: 'none' }}>
        <Icon name={icon} size={22} color="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: fg }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: fg }}>{value}</div>
    </div>
  );
}

// ============ RESTAURANTS MANAGEMENT ============
function AdminRestaurants() {
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? RESTAURANTS_LIST : RESTAURANTS_LIST.filter(r => r.status === filter);
  const statusMap = { active: ['Aktif', 'success'], suspended: ['Askıda', 'error'], pending: ['Onay bekliyor', 'warning'] };

  return (
    <div style={{ padding: AP }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Restoran Yönetimi</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>{RESTAURANTS_LIST.length} kayıtlı restoran</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[['all', 'Tümü'], ['active', 'Aktif'], ['suspended', 'Askıda'], ['pending', 'Onay Bekliyor']].map(([k, l]) => (
          <Chip key={k} active={filter === k} onClick={() => setFilter(k)}>{l} ({k === 'all' ? RESTAURANTS_LIST.length : RESTAURANTS_LIST.filter(r => r.status === k).length})</Chip>
        ))}
      </div>

      {/* v8: 24 saat onay SLA */}
      {RESTAURANTS_LIST.some(r => r.status === 'pending') && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 'var(--radius-lg)', background: 'var(--info-50)', border: '1px solid color-mix(in srgb, var(--info-500) 20%, transparent)', marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--info-500)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="clock" size={19} color="#fff" /></div>
          <div style={{ flex: 1, fontSize: 13.5, color: 'var(--info-600)', lineHeight: 1.45 }}><strong>Deniz Balık</strong> onay bekliyor · SLA: 24 saat içinde incele ve karar ver. Red durumunda hesap kapanmaz; saha personeli eksik evrak için yönlendirilir.</div>
        </div>
      )}

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: '0 0 70px' }}>ID</span>
          <span style={{ flex: 1 }}>Restoran</span>
          <span style={{ flex: '0 0 80px' }}>Plan</span>
          <span style={{ flex: '0 0 90px' }}>Rozet</span>
          <span style={{ flex: '0 0 60px' }}>Puan</span>
          <span style={{ flex: '0 0 80px' }}>Sipariş</span>
          <span style={{ flex: '0 0 100px' }}>Ciro</span>
          <span style={{ flex: '0 0 100px' }}>Durum</span>
          <span style={{ flex: '0 0 80px' }}></span>
        </TableHeader>
        {filtered.map(r => {
          const [sLabel, sTone] = statusMap[r.status] || ['—', 'neutral'];
          return (
            <TableRow key={r.id}>
              <span style={{ flex: '0 0 70px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--text-tertiary)' }}>{r.id}</span>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12, color: 'var(--text-secondary)', flex: 'none' }}>{r.name.slice(0, 2)}</div>
                <div><div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{r.branch}</div></div>
              </span>
              <span style={{ flex: '0 0 80px' }}><Badge tone={r.plan === 'Yıllık' ? 'brand' : 'neutral'} style={{ fontSize: 11 }}>{r.plan}</Badge></span>
              <span style={{ flex: '0 0 90px' }}>{r.selected ? <Badge tone="brand" style={{ fontSize: 10.5 }}><Icon name="star" size={11} color="var(--brand-600)" strokeWidth={0} style={{ fill: 'var(--brand-600)' }} />Seçili</Badge> : <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>—</span>}</span>
              <span style={{ flex: '0 0 60px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>★ {r.rating}</span>
              <span style={{ flex: '0 0 80px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{r.orders.toLocaleString('tr-TR')}</span>
              <span style={{ flex: '0 0 100px', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{money(r.revenue)}</span>
              <span style={{ flex: '0 0 100px' }}><Badge tone={sTone} style={{ fontSize: 11 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: sTone === 'success' ? 'var(--success-500)' : sTone === 'error' ? 'var(--error-500)' : 'var(--warning-500)' }}></span>{sLabel}</Badge></span>
              <span style={{ flex: '0 0 80px', display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <MiniBtn icon="user" title="Detay" />
                {r.status === 'pending' && <MiniBtn icon="check" title="Onayla" accent />}
              </span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

// ============ CUSTOMERS MANAGEMENT ============
function AdminCustomers() {
  const statusMap = { active: ['Aktif', 'success'], flagged: ['İşaretli', 'warning'] };
  return (
    <div style={{ padding: AP }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Müşteri Yönetimi</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 18 }}>{(PLATFORM_STATS.customers / 1000).toFixed(1)}K kayıtlı müşteri</div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
        <MetricCard label="Toplam müşteri" value={(PLATFORM_STATS.customers / 1000).toFixed(1) + 'K'} icon="user" />
        <MetricCard label="Kimoo+ üyesi" value="12.400" change="%18" changeUp icon="star" />
        <MetricCard label="Bugünkü yeni" value={PLATFORM_STATS.newCustomersToday} change="%8" changeUp icon="heart" />
        <MetricCard label="Ort. sipariş değeri" value={money(265)} icon="bag" />
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: '0 0 60px' }}>ID</span>
          <span style={{ flex: 1 }}>Müşteri</span>
          <span style={{ flex: '0 0 80px' }}>Plan</span>
          <span style={{ flex: '0 0 80px' }}>Sipariş</span>
          <span style={{ flex: '0 0 100px' }}>Harcama</span>
          <span style={{ flex: '0 0 100px' }}>Durum</span>
          <span style={{ flex: '0 0 80px' }}>Kayıt</span>
        </TableHeader>
        {CUSTOMERS_LIST.map(c => {
          const [sLabel, sTone] = statusMap[c.status] || ['—', 'neutral'];
          return (
            <TableRow key={c.id}>
              <span style={{ flex: '0 0 60px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--text-tertiary)' }}>{c.id}</span>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13, color: 'var(--text-secondary)', flex: 'none' }}>{c.name[0]}</div>
                <div><div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{c.email}</div></div>
              </span>
              <span style={{ flex: '0 0 80px' }}><Badge tone={c.plan === 'Kimoo+' ? 'brand' : 'neutral'} style={{ fontSize: 11 }}>{c.plan}</Badge></span>
              <span style={{ flex: '0 0 80px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.orders}</span>
              <span style={{ flex: '0 0 100px', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{money(c.spent)}</span>
              <span style={{ flex: '0 0 100px' }}><Badge tone={sTone} style={{ fontSize: 11 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: sTone === 'success' ? 'var(--success-500)' : 'var(--warning-500)' }}></span>{sLabel}</Badge></span>
              <span style={{ flex: '0 0 80px', fontSize: 13, color: 'var(--text-tertiary)' }}>{c.joined}</span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

// ============ COURIERS MANAGEMENT ============
function AdminCouriers() {
  const statusMap = { online: ['Çevrimiçi', 'success'], offline: ['Çevrimdışı', 'neutral'], suspended: ['Askıda', 'error'] };
  const levelColor = { 'Altın': 'var(--warning-600)', 'Gümüş': 'var(--text-tertiary)', 'Bronz': '#B07339' };

  return (
    <div style={{ padding: AP }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Kurye Yönetimi</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 18 }}>{PLATFORM_STATS.couriers} kurye · {PLATFORM_STATS.activeCouriers} çevrimiçi</div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
        <MetricCard label="Toplam kurye" value={PLATFORM_STATS.couriers} icon="scooter" />
        <MetricCard label="Çevrimiçi" value={PLATFORM_STATS.activeCouriers} icon="check" />
        <MetricCard label="Ort. puan" value="★ 4.57" icon="star" />
        <MetricCard label="Bugünkü teslimat" value="3.420" change="%11" changeUp icon="bag" />
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: '0 0 60px' }}>ID</span>
          <span style={{ flex: 1 }}>Kurye</span>
          <span style={{ flex: '0 0 70px' }}>Seviye</span>
          <span style={{ flex: '0 0 60px' }}>Puan</span>
          <span style={{ flex: '0 0 80px' }}>Teslimat</span>
          <span style={{ flex: '0 0 100px' }}>Kazanç</span>
          <span style={{ flex: '0 0 80px' }}>Bölge</span>
          <span style={{ flex: '0 0 100px' }}>Durum</span>
        </TableHeader>
        {COURIERS_LIST.map(c => {
          const [sLabel, sTone] = statusMap[c.status] || ['—', 'neutral'];
          return (
            <TableRow key={c.id}>
              <span style={{ flex: '0 0 60px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--text-tertiary)' }}>{c.id}</span>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13, color: 'var(--text-secondary)', flex: 'none' }}>{c.name[0]}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div>
              </span>
              <span style={{ flex: '0 0 70px', fontSize: 12, fontWeight: 700, color: levelColor[c.level] || 'var(--text-secondary)' }}>{c.level}</span>
              <span style={{ flex: '0 0 60px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.rating}</span>
              <span style={{ flex: '0 0 80px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.deliveries.toLocaleString('tr-TR')}</span>
              <span style={{ flex: '0 0 100px', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{money(c.earnings)}</span>
              <span style={{ flex: '0 0 80px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.zone}</span>
              <span style={{ flex: '0 0 100px' }}><Badge tone={sTone} style={{ fontSize: 11 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: sTone === 'success' ? 'var(--success-500)' : sTone === 'error' ? 'var(--error-500)' : 'var(--text-muted)' }}></span>{sLabel}</Badge></span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

// ============ SHARED HELPERS ============
function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer',
      background: active ? 'var(--brand-500)' : 'var(--bg-surface)', color: active ? '#fff' : 'var(--text-secondary)',
      border: active ? 'none' : '1.5px solid var(--border-default)', fontFamily: 'var(--font-sans)',
    }}>{children}</button>
  );
}

function MiniBtn({ icon, title, accent }) {
  return (
    <button title={title} style={{
      width: 30, height: 30, borderRadius: 999, display: 'grid', placeItems: 'center', cursor: 'pointer',
      border: accent ? 'none' : '1px solid var(--border-subtle)',
      background: accent ? 'var(--brand-500)' : 'var(--bg-surface)',
    }}>
      <Icon name={icon} size={15} color={accent ? '#fff' : 'var(--text-tertiary)'} />
    </button>
  );
}

Object.assign(window, { AdminDashboard, AdminRestaurants, AdminCustomers, AdminCouriers, Chip, MiniBtn });
