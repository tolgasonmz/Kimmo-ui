// resto-views.jsx — Dashboard, Orders, Menu views
const { Icon, Badge, money,
  RESTO_INFO, TODAY_STATS, WEEKLY_REVENUE, LIVE_ORDERS, ORDER_STATUSES,
  MENU_CATEGORIES, MENU_ITEMS,
  MetricCard, TableHeader, TableRow } = window;

const PAD = '24px';

// ============ DASHBOARD ============
function DashboardView() {
  const s = TODAY_STATS;
  const maxRev = Math.max(...WEEKLY_REVENUE.map(d => d.val));

  return (
    <div style={{ padding: PAD }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Genel Bakış</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>Bugün · {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--success-500)' }}></span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--success-600)' }}>Restoran açık</span>
        </div>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Bugünkü sipariş" value={s.orders} change="%12" changeUp icon="bag" />
        <MetricCard label="Bugünkü ciro" value={money(s.revenue)} change="%18" changeUp icon="wallet" />
        <MetricCard label="Ort. sipariş" value={money(s.avgOrder)} change="%5" changeUp icon="tag" />
        <MetricCard label="Aktif sipariş" value={s.activeOrders} icon="clock" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        {/* Revenue chart */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 18 }}>Haftalık ciro</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
            {WEEKLY_REVENUE.map((d, i) => {
              const pct = (d.val / maxRev) * 100;
              const isToday = i === WEEKLY_REVENUE.length - 1;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)' }}>{(d.val / 1000).toFixed(1)}k</span>
                  <div style={{ width: '100%', height: pct + '%', minHeight: 6, borderRadius: 'var(--radius-xs)',
                    background: isToday ? 'var(--brand-500)' : 'var(--brand-100)', transition: 'height .3s ease' }}></div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: isToday ? 'var(--brand-600)' : 'var(--text-muted)' }}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance mini */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>Performans</div>
          {[
            ['Müşteri puanı', '★ ' + s.rating, 96, 'var(--warning-500)'],
            ['Ort. hazırlık', s.avgPrepTime, 82, 'var(--brand-500)'],
            ['İptal oranı', '%' + s.cancelRate, 96, 'var(--success-500)'],
          ].map(([label, val, pct, color], i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{val}</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden' }}>
                <div style={{ width: pct + '%', height: '100%', borderRadius: 999, background: color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live orders preview */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Son siparişler</div>
          <Badge tone="brand" style={{ fontSize: 12 }}>{LIVE_ORDERS.filter(o => o.status === 'new').length} yeni</Badge>
        </div>
        <OrdersTable orders={LIVE_ORDERS.slice(0, 4)} compact />
      </div>
    </div>
  );
}

// ============ ORDERS ============
function OrdersView() {
  const [filter, setFilter] = React.useState('all');
  const [selected, setSelected] = React.useState(null);
  const filtered = filter === 'all' ? LIVE_ORDERS : LIVE_ORDERS.filter(o => o.status === filter);

  if (selected) {
    const o = LIVE_ORDERS.find(x => x.id === selected);
    const st = ORDER_STATUSES[o.status];
    return (
      <div style={{ padding: PAD }}>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginBottom: 18 }}>
          <Icon name="back" size={18} color="var(--text-tertiary)" /> Siparişlere dön
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>#{o.id}</div>
              <Badge tone={st.tone} style={{ fontSize: 13, padding: '5px 14px' }}><span style={{ width: 7, height: 7, borderRadius: 999, background: st.dotColor }}></span>{st.label}</Badge>
            </div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
              {[['Müşteri', o.customer, 'user'], ['Zaman', o.time, 'clock'], ['Toplam', money(o.total), 'wallet']].map(([l, v, ic], i) => (
                <div key={i} style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 14, textAlign: 'center' }}>
                  <Icon name={ic} size={18} color="var(--brand-500)" style={{ margin: '0 auto 6px', display: 'block' }} />
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{l}</div>
                </div>
              ))}
            </div>
            {/* Items */}
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Ürünler</div>
            {o.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 14 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
            {o.note && (
              <div style={{ marginTop: 16, padding: 14, background: 'var(--warning-50)', borderRadius: 'var(--radius-md)', fontSize: 14, color: 'var(--warning-600)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icon name="msg" size={18} color="var(--warning-600)" /><strong>Not:</strong> {o.note}
              </div>
            )}
          </div>
          {/* Actions sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {o.status === 'new' && <>
              <ActionBtn label="Siparişi kabul et" icon="check" color="var(--success-500)" />
              <ActionBtn label="Reddet" icon="close" color="var(--error-500)" outline />
            </>}
            {o.status === 'preparing' && <ActionBtn label="Hazır — kuryeye bildir" icon="check" color="var(--brand-500)" />}
            <ActionBtn label="Müşteriyi ara" icon="phone" outline />
            <ActionBtn label="Yazdır" icon="bag" outline />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: PAD }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Siparişler</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 18 }}>Canlı sipariş yönetimi</div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {[['all', 'Tümü'], ['new', 'Yeni'], ['preparing', 'Hazırlanıyor'], ['ready', 'Hazır'], ['picked', 'Kuryede'], ['delivered', 'Teslim']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            background: filter === k ? 'var(--brand-500)' : 'var(--bg-surface)',
            color: filter === k ? '#fff' : 'var(--text-secondary)',
            border: filter === k ? 'none' : '1.5px solid var(--border-default)',
            fontFamily: 'var(--font-sans)',
          }}>{l} {k !== 'all' && <span style={{ opacity: 0.7 }}>({LIVE_ORDERS.filter(o => k === 'all' || o.status === k).length})</span>}</button>
        ))}
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <OrdersTable orders={filtered} onSelect={setSelected} />
      </div>
    </div>
  );
}

function OrdersTable({ orders, onSelect, compact }) {
  return (
    <div>
      <TableHeader>
        <span style={{ flex: '0 0 90px' }}>Sipariş</span>
        <span style={{ flex: 1 }}>Müşteri</span>
        <span style={{ flex: 1 }}>Ürünler</span>
        <span style={{ flex: '0 0 80px' }}>Tutar</span>
        <span style={{ flex: '0 0 100px' }}>Durum</span>
        <span style={{ flex: '0 0 80px' }}>Zaman</span>
      </TableHeader>
      {orders.map(o => {
        const st = ORDER_STATUSES[o.status];
        return (
          <TableRow key={o.id} onClick={onSelect ? () => onSelect(o.id) : undefined}>
            <span style={{ flex: '0 0 90px', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono, monospace)', color: 'var(--text-primary)' }}>{o.id}</span>
            <span style={{ flex: 1, fontWeight: 600, color: 'var(--text-primary)' }}>{o.customer}</span>
            <span style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.items.join(', ')}</span>
            <span style={{ flex: '0 0 80px', fontWeight: 700, color: 'var(--text-primary)' }}>{money(o.total)}</span>
            <span style={{ flex: '0 0 100px' }}><Badge tone={st.tone} style={{ fontSize: 11 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: st.dotColor }}></span>{st.label}</Badge></span>
            <span style={{ flex: '0 0 80px', color: 'var(--text-tertiary)', fontSize: 13 }}>{o.time}</span>
          </TableRow>
        );
      })}
    </div>
  );
}

function ActionBtn({ label, icon, color, outline }) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%',
      background: outline ? 'var(--bg-surface)' : color,
      color: outline ? 'var(--text-primary)' : '#fff',
      border: outline ? '1.5px solid var(--border-default)' : 'none',
      boxShadow: outline ? 'none' : '0 4px 12px ' + (color || 'var(--brand-500)') + '44',
    }}>
      <Icon name={icon} size={20} color={outline ? color || 'var(--text-secondary)' : '#fff'} />{label}
    </button>
  );
}

// ============ MENU MANAGEMENT ============
function MenuView() {
  const [items, setItems] = React.useState(MENU_ITEMS);
  const [activeCat, setActiveCat] = React.useState('all');
  const filtered = activeCat === 'all' ? items : items.filter(i => i.cat === activeCat);

  const toggleItem = (id) => setItems(its => its.map(i => i.id === id ? { ...i, active: !i.active } : i));
  const toggleStock = (id) => setItems(its => its.map(i => i.id === id ? { ...i, stock: !i.stock } : i));

  return (
    <div style={{ padding: PAD }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Menü Yönetimi</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>{items.length} ürün · {MENU_CATEGORIES.length} kategori</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>
          <Icon name="plus" size={18} color="#fff" />Ürün ekle
        </button>
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <button onClick={() => setActiveCat('all')} style={catChip(activeCat === 'all')}>Tümü ({items.length})</button>
        {MENU_CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setActiveCat(c.id)} style={catChip(activeCat === c.id)}>{c.name} ({c.count})</button>
        ))}
      </div>

      {/* Product table */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: 1 }}>Ürün</span>
          <span style={{ flex: '0 0 100px' }}>Kategori</span>
          <span style={{ flex: '0 0 80px' }}>Fiyat</span>
          <span style={{ flex: '0 0 80px' }}>Stok</span>
          <span style={{ flex: '0 0 80px' }}>Durum</span>
          <span style={{ flex: '0 0 60px' }}></span>
        </TableHeader>
        {filtered.map(item => (
          <TableRow key={item.id}>
            <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', flex: 'none', display: 'grid', placeItems: 'center' }}>
                <Icon name="flame" size={16} color="var(--text-muted)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{item.name}</div>
                {item.popular && <Badge tone="brand" style={{ fontSize: 10, padding: '2px 7px', marginTop: 2 }}>Popüler</Badge>}
              </div>
            </span>
            <span style={{ flex: '0 0 100px', fontSize: 13, color: 'var(--text-secondary)' }}>{MENU_CATEGORIES.find(c => c.id === item.cat)?.name}</span>
            <span style={{ flex: '0 0 80px', fontWeight: 700, color: 'var(--text-primary)' }}>{money(item.price)}</span>
            <span style={{ flex: '0 0 80px' }}>
              <SwitchSmall on={item.stock} onClick={() => toggleStock(item.id)} />
            </span>
            <span style={{ flex: '0 0 80px' }}>
              <SwitchSmall on={item.active} onClick={() => toggleItem(item.id)} />
            </span>
            <span style={{ flex: '0 0 60px', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                <Icon name="chevR" size={16} color="var(--text-tertiary)" />
              </button>
            </span>
          </TableRow>
        ))}
      </div>
    </div>
  );
}

function SwitchSmall({ on, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 24, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative',
      background: on ? 'var(--success-500)' : 'var(--border-default)', transition: 'background .2s ease',
    }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 19 : 3, width: 18, height: 18, borderRadius: 999,
        background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease',
      }}></span>
    </button>
  );
}

function catChip(active) {
  return {
    padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
    background: active ? 'var(--brand-500)' : 'var(--bg-surface)', color: active ? '#fff' : 'var(--text-secondary)',
    border: active ? 'none' : '1.5px solid var(--border-default)', fontFamily: 'var(--font-sans)',
  };
}

Object.assign(window, { DashboardView, OrdersView, MenuView });
