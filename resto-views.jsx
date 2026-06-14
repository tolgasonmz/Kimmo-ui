// resto-views.jsx — Dashboard, Orders, Menu views
const { Icon, Badge, money,
  RESTO_INFO, TODAY_STATS, WEEKLY_REVENUE, LIVE_ORDERS, ORDER_STATUSES, SCHEDULED_ORDERS,
  MENU_CATEGORIES, MENU_ITEMS, ALLERGENS,
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
  const filtered = filter === 'all' ? LIVE_ORDERS : filter === 'scheduled' ? (SCHEDULED_ORDERS||[]) : LIVE_ORDERS.filter(o => o.status === filter);

  if (selected) {
    const o = LIVE_ORDERS.find(x => x.id === selected) || (SCHEDULED_ORDERS||[]).find(x => x.id === selected);
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
            {o.status === 'scheduled' && <>
              <div style={{ background: 'var(--info-50)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 4, border: '1px solid color-mix(in srgb, var(--info-500) 20%, transparent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Icon name="clock" size={20} color="var(--info-600)" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--info-600)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Planlı Sipariş</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{o.scheduledTime || o.time}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Bu sipariş belirtilen saatte hazır olmalıdır</div>
              </div>
              <ActionBtn label="Siparişi onayla" icon="check" color="var(--success-500)" />
              <ActionBtn label="İptal et" icon="close" color="var(--error-500)" outline />
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
        {[['all', 'Tümü'], ['new', 'Yeni'], ['preparing', 'Hazırlanıyor'], ['ready', 'Hazır'], ['picked', 'Kuryede'], ['delivered', 'Teslim'], ['scheduled', '📅 Planlı']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            background: filter === k ? 'var(--brand-500)' : 'var(--bg-surface)',
            color: filter === k ? '#fff' : 'var(--text-secondary)',
            border: filter === k ? 'none' : '1.5px solid var(--border-default)',
            fontFamily: 'var(--font-sans)',
          }}>{l} {k !== 'all' && <span style={{ opacity: 0.7 }}>({(k === 'scheduled' ? (SCHEDULED_ORDERS||[]).length : LIVE_ORDERS.filter(o => k === 'all' || o.status === k).length)})</span>}</button>
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

// ============ MENU MANAGEMENT (Enhanced) ============
const menuInputStyle = {
  width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-sm)',
  padding: '7px 10px', fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none',
  background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box',
};

function SwitchSmall({ on, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 38, height: 22, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative', flex: 'none',
      background: on ? 'var(--success-500)' : 'var(--border-default)', transition: 'background .2s ease',
    }}>
      <span style={{ position: 'absolute', top: 3, left: on ? 17 : 3, width: 16, height: 16, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease' }}></span>
    </button>
  );
}

function MenuView() {
  const [items, setItems] = React.useState(MENU_ITEMS);
  const [activeCat, setActiveCat] = React.useState('all');
  const [viewMode, setViewMode] = React.useState('grid');
  const [search, setSearch] = React.useState('');
  const [editId, setEditId] = React.useState(null);
  const [isAdding, setIsAdding] = React.useState(false);

  const filtered = items
    .filter(i => activeCat === 'all' || i.cat === activeCat)
    .filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()));

  const updateItem = (id, patch) => setItems(its => its.map(i => i.id === id ? { ...i, ...patch } : i));
  const editItem = editId ? items.find(i => i.id === editId) : null;
  const toggleEdit = (id) => setEditId(prev => prev === id ? null : id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

      {/* ── Sticky toolbar ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', gap: 12, padding: '13px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginRight: 4, whiteSpace: 'nowrap' }}>Menü Yönetimi</div>
        {/* Search */}
        <div style={{ position: 'relative', width: 220 }}>
          <Icon name="search" size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ürün ara..." style={{ ...menuInputStyle, paddingLeft: 30, height: 34 }} />
        </div>
        {/* View toggle */}
        <div style={{ display: 'flex', background: 'var(--bg-sunken)', borderRadius: 8, padding: 3, gap: 2 }}>
          {[['grid','⊞ Kart'],['list','≡ Liste']].map(([v,l]) => (
            <button key={v} onClick={() => setViewMode(v)} style={{ padding: '5px 11px', borderRadius: 6, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', background: viewMode === v ? 'var(--bg-surface)' : 'transparent', color: viewMode === v ? 'var(--text-primary)' : 'var(--text-tertiary)', boxShadow: viewMode === v ? 'var(--shadow-xs)' : 'none' }}>{l}</button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{filtered.length} ürün</span>
        <div style={{ flex: 1 }} />
        <button onClick={() => { setEditId(null); setIsAdding(true); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>
          <Icon name="plus" size={15} color="#fff" /> Ürün ekle
        </button>
      </div>

      {/* ── 3-panel body ── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Category sidebar */}
        <div style={{ width: 205, flex: 'none', borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', position: 'sticky', top: 55, alignSelf: 'flex-start', maxHeight: 'calc(100vh - 165px)', overflowY: 'auto' }}>
          <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Kategoriler</div>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px', borderRadius: 'var(--radius-sm)', border: '1.5px dashed var(--border-default)', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--brand-600)', fontFamily: 'var(--font-sans)' }}>
              <Icon name="plus" size={13} color="var(--brand-600)" /> Kategori ekle
            </button>
          </div>
          <div>
            {[['all','Tümü', items.length], ...MENU_CATEGORIES.map(c => [c.id, c.name, items.filter(i=>i.cat===c.id).length])].map(([id,name,count]) => {
              const on = activeCat === id;
              return (
                <button key={id} onClick={() => setActiveCat(id)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: on ? 'var(--brand-50)' : 'transparent', borderLeft: `3px solid ${on ? 'var(--brand-500)' : 'transparent'}`, border: 'none', borderLeft: `3px solid ${on ? 'var(--brand-500)' : 'transparent'}`, color: on ? 'var(--brand-700)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: on ? 700 : 400, textAlign: 'left', transition: 'all .12s ease' }}>
                  <span>{name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: on ? 'var(--brand-600)' : 'var(--text-muted)' }}>{count}</span>
                </button>
              );
            })}
          </div>
          <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border-subtle)', fontSize: 11, color: 'var(--text-muted)' }}>{items.length} ürün · {MENU_CATEGORIES.length} kategori</div>
        </div>

        {/* Product area */}
        <div style={{ flex: 1, padding: '18px 20px', minWidth: 0 }}>
          {viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(188px, 1fr))', gap: 14 }}>
              {filtered.map(item => (
                <MenuProductCard key={item.id} item={item} isEditing={editId===item.id}
                  onEdit={() => toggleEdit(item.id)}
                  onToggleActive={() => updateItem(item.id, { active: !item.active })}
                  onToggleStock={() => updateItem(item.id, { stock: !item.stock })} />
              ))}
            </div>
          ) : (
            <MenuProductList items={filtered} editId={editId} onEdit={toggleEdit}
              onToggleActive={id => updateItem(id, { active: !items.find(i=>i.id===id)?.active })}
              onToggleStock={id => updateItem(id, { stock: !items.find(i=>i.id===id)?.stock })} />
          )}
        </div>

        {/* Edit drawer */}
        {editItem && !isAdding && (
          <MenuEditDrawer item={editItem} onClose={() => setEditId(null)} onUpdate={patch => updateItem(editId, patch)} />
        )}
        {isAdding && (
          <MenuEditDrawer item={{ id:'new', name:'', desc:'', price:0, cat: activeCat==='all'?'kebap':activeCat, active:true, stock:true, ingredients:[], productOptions:[], options:[], allergens:[], calories:null, prepTime:null }} isNew onClose={() => setIsAdding(false)} onUpdate={newItem => { setItems(its => [...its, { ...newItem, id:'p'+(its.length+1), orderCount:0, revenue:0 }]); setIsAdding(false); }} />
        )}
      </div>
    </div>
  );
}

function MenuProductCard({ item, isEditing, onEdit, onToggleActive, onToggleStock }) {
  return (
    <div onClick={onEdit} style={{ background: 'var(--bg-surface)', border: `1.5px solid ${isEditing ? 'var(--brand-500)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', transition: 'border-color .15s ease', opacity: item.active ? 1 : 0.7 }}>
      {/* Thumbnail */}
      <div style={{ height: 108, background: 'var(--bg-sunken)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="flame" size={26} color="var(--text-muted)" />
        <div style={{ position: 'absolute', top: 7, left: 7, display: 'flex', gap: 4 }}>
          {item.popular && <Badge tone="brand" style={{ fontSize: 10, padding: '2px 6px' }}>Popüler</Badge>}
        </div>
        <div style={{ position: 'absolute', top: 7, right: 7, display: 'flex', gap: 4 }}>
          {!item.stock && <Badge tone="error" style={{ fontSize: 10, padding: '2px 6px' }}>Tükendi</Badge>}
          {!item.active && <Badge tone="neutral" style={{ fontSize: 10, padding: '2px 6px' }}>Pasif</Badge>}
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: '10px 11px 9px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3, lineHeight: 1.3 }}>{item.name}</div>
        {item.desc && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.4, marginBottom: 7, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.desc}</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>{money(item.price)}</span>
          {item.orderCount && <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{item.orderCount} sipariş</span>}
        </div>
        {item.prepTime && <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>{item.prepTime} dk · {item.calories} kcal</div>}
        <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: '1px solid var(--border-subtle)', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', flex: 1 }}>
            <SwitchSmall on={item.stock} onClick={onToggleStock} />
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>Stok</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', flex: 1 }}>
            <SwitchSmall on={item.active} onClick={onToggleActive} />
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>Aktif</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function MenuProductList({ items, editId, onEdit, onToggleActive, onToggleStock }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <TableHeader>
        <span style={{ flex: 1 }}>Ürün</span>
        <span style={{ flex: '0 0 120px' }}>Kategori</span>
        <span style={{ flex: '0 0 80px' }}>Fiyat</span>
        <span style={{ flex: '0 0 100px' }}>Sipariş / Ciro</span>
        <span style={{ flex: '0 0 56px' }}>Stok</span>
        <span style={{ flex: '0 0 56px' }}>Aktif</span>
        <span style={{ flex: '0 0 36px' }}></span>
      </TableHeader>
      {items.map(item => {
        const isEditing = editId === item.id;
        const meta = [item.prepTime && `${item.prepTime} dk`, item.calories && `${item.calories} kcal`, ...(item.allergens||[])].filter(Boolean).join(' · ');
        return (
          <TableRow key={item.id} onClick={() => onEdit(item.id)}>
            <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', flex: 'none', display: 'grid', placeItems: 'center', border: isEditing ? '2px solid var(--brand-500)' : 'none' }}>
                <Icon name="flame" size={18} color="var(--text-muted)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{item.name}</div>
                {meta && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{meta}</div>}
                <div style={{ display: 'flex', gap: 4, marginTop: 3 }}>
                  {item.popular && <Badge tone="brand" style={{ fontSize: 9, padding: '1px 5px' }}>Popüler</Badge>}
                  {!item.stock && <Badge tone="error" style={{ fontSize: 9, padding: '1px 5px' }}>Tükendi</Badge>}
                  {!item.active && <Badge tone="neutral" style={{ fontSize: 9, padding: '1px 5px' }}>Pasif</Badge>}
                </div>
              </div>
            </span>
            <span style={{ flex: '0 0 120px', fontSize: 13, color: 'var(--text-secondary)' }}>{MENU_CATEGORIES.find(c=>c.id===item.cat)?.name}</span>
            <span style={{ flex: '0 0 80px', fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{money(item.price)}</span>
            <span style={{ flex: '0 0 100px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.orderCount||'—'}</div>
              {item.revenue && <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{money(item.revenue)}</div>}
            </span>
            <span style={{ flex: '0 0 56px' }} onClick={e=>{e.stopPropagation();onToggleStock(item.id);}}><SwitchSmall on={item.stock} onClick={()=>{}} /></span>
            <span style={{ flex: '0 0 56px' }} onClick={e=>{e.stopPropagation();onToggleActive(item.id);}}><SwitchSmall on={item.active} onClick={()=>{}} /></span>
            <span style={{ flex: '0 0 36px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={e=>{e.stopPropagation();onEdit(item.id);}} style={{ width: 26, height: 26, borderRadius: 999, border: `1.5px solid ${isEditing?'var(--brand-500)':'var(--border-subtle)'}`, background: isEditing?'var(--brand-50)':'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                <Icon name="chevR" size={12} color={isEditing?'var(--brand-600)':'var(--text-tertiary)'} />
              </button>
            </span>
          </TableRow>
        );
      })}
    </div>
  );
}

function MenuEditDrawer({ item, isNew, onClose, onUpdate }) {
  const [form, setForm] = React.useState({...item, ingredients: item.ingredients||[], productOptions: item.productOptions||[]});
  const [addingOpt, setAddingOpt] = React.useState(false);
  const [newOpt, setNewOpt] = React.useState('');
  const [addingIngredient, setAddingIngredient] = React.useState(false);
  const [newIngredient, setNewIngredient] = React.useState('');
  React.useEffect(() => { setForm({...item, ingredients: item.ingredients||[], productOptions: item.productOptions||[]}); setAddingOpt(false); setAddingIngredient(false); }, [item.id]);

  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const save = () => { onUpdate(form); onClose(); };
  const toggleAllergen = a => { const c=form.allergens||[]; set('allergens', c.includes(a)?c.filter(x=>x!==a):[...c,a]); };
  const addOpt = () => { if(newOpt.trim()){ set('options',[...(form.options||[]),newOpt.trim()]); setNewOpt(''); } setAddingOpt(false); };

  const FieldLabel = ({children}) => <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{children}</div>;

  return (
    <div style={{ width: 305, flex: 'none', borderLeft: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', position: 'sticky', top: 55, alignSelf: 'flex-start', maxHeight: 'calc(100vh - 165px)', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 2 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>{isNew ? 'Yeni Ürün Ekle' : 'Ürün Düzenle'}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={onClose} style={{ padding: '5px 11px', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'transparent', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>İptal</button>
          <button onClick={save} style={{ padding: '5px 12px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Kaydet</button>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Photo upload placeholder */}
        <div style={{ height: 96, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', marginBottom: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', border: '2px dashed var(--border-default)' }}>
          <Icon name="plus" size={20} color="var(--text-muted)" />
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Fotoğraf yükle</span>
        </div>

        {/* Name */}
        <div style={{ marginBottom: 12 }}><FieldLabel>Ürün Adı</FieldLabel><input value={form.name} onChange={e=>set('name',e.target.value)} style={menuInputStyle} /></div>

        {/* Description */}
        <div style={{ marginBottom: 12 }}><FieldLabel>Açıklama</FieldLabel><textarea value={form.desc||''} onChange={e=>set('desc',e.target.value)} rows={3} style={{...menuInputStyle, resize:'none', lineHeight:1.5}} /></div>

        {/* Price row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          <div><FieldLabel>Fiyat (₺)</FieldLabel><input type="number" value={form.price} onChange={e=>set('price',+e.target.value)} style={menuInputStyle} /></div>
          <div><FieldLabel>İndirimli (₺)</FieldLabel><input type="number" value={form.salePrice||''} onChange={e=>set('salePrice',+e.target.value||undefined)} placeholder="—" style={menuInputStyle} /></div>
        </div>

        {/* Prep + cal row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          <div><FieldLabel>Hazırlık (dk)</FieldLabel><input type="number" value={form.prepTime||''} onChange={e=>set('prepTime',+e.target.value)} style={menuInputStyle} /></div>
          <div><div style={{ display:'flex', alignItems:'center', gap:6 }}><FieldLabel>Kalori</FieldLabel><span style={{ fontSize:9, color:'var(--text-muted)', fontWeight:500, marginBottom:5 }}>opsiyonel</span></div><input type="number" value={form.calories!=null?form.calories:''} onChange={e=>set('calories', e.target.value ? +e.target.value : null)} placeholder="—" style={menuInputStyle} /></div>
        </div>

        {/* Category */}
        <div style={{ marginBottom: 14 }}><FieldLabel>Kategori</FieldLabel>
          <select value={form.cat} onChange={e=>set('cat',e.target.value)} style={{...menuInputStyle,cursor:'pointer'}}>
            {MENU_CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Allergens */}
        <div style={{ marginBottom: 14 }}>
          <FieldLabel>Alerjenler</FieldLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {(ALLERGENS||[]).map(a => {
              const on = (form.allergens||[]).includes(a);
              return (
                <button key={a} onClick={()=>toggleAllergen(a)} style={{ padding:'3px 9px', borderRadius:999, fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-sans)', background:on?'var(--warning-50)':'var(--bg-sunken)', color:on?'var(--warning-700)':'var(--text-secondary)', border:`1.5px solid ${on?'color-mix(in srgb, var(--warning-500) 40%, transparent)':'var(--border-subtle)'}` }}>{a}</button>
              );
            })}
          </div>
        </div>

        {/* Options */}
        <div style={{ marginBottom: 14 }}>
          <FieldLabel>Seçenekler</FieldLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {(form.options||[]).map((o,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:3, padding:'3px 7px 3px 9px', borderRadius:999, background:'var(--brand-50)', border:'1.5px solid color-mix(in srgb, var(--brand-500) 25%, transparent)' }}>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--brand-700)' }}>{o}</span>
                <button onClick={()=>set('options',(form.options||[]).filter((_,j)=>j!==i))} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' }}><Icon name="close" size={10} color="var(--brand-500)" /></button>
              </div>
            ))}
            {addingOpt ? (
              <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                <input autoFocus value={newOpt} onChange={e=>setNewOpt(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addOpt();if(e.key==='Escape')setAddingOpt(false);}} placeholder="Seçenek..." style={{...menuInputStyle,width:100,padding:'3px 7px',height:26,fontSize:12}} />
                <button onClick={addOpt} style={{ padding:'3px 9px', borderRadius:999, background:'var(--brand-500)', color:'#fff', border:'none', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)' }}>✓</button>
              </div>
            ) : (
              <button onClick={()=>setAddingOpt(true)} style={{ padding:'3px 9px', borderRadius:999, border:'1.5px dashed var(--border-default)', background:'none', fontSize:11, fontWeight:600, color:'var(--text-secondary)', cursor:'pointer', display:'flex', alignItems:'center', gap:3, fontFamily:'var(--font-sans)' }}>
                <Icon name="plus" size={11} color="var(--text-secondary)" /> Ekle
              </button>
            )}
          </div>
        </div>

        {/* İçindekiler */}
        <div style={{ marginBottom: 14 }}>
          <FieldLabel>İçindekiler</FieldLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {(form.ingredients||[]).map((ing,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:3, padding:'3px 7px 3px 9px', borderRadius:999, background:'var(--success-50)', border:'1.5px solid color-mix(in srgb, var(--success-500) 25%, transparent)' }}>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--success-700)' }}>{ing}</span>
                <button onClick={()=>set('ingredients',(form.ingredients||[]).filter((_,j)=>j!==i))} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' }}><Icon name="close" size={10} color="var(--success-500)" /></button>
              </div>
            ))}
            {addingIngredient ? (
              <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                <input autoFocus value={newIngredient} onChange={e=>setNewIngredient(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){if(newIngredient.trim()){set('ingredients',[...(form.ingredients||[]),newIngredient.trim()]);setNewIngredient('');}setAddingIngredient(false);}if(e.key==='Escape')setAddingIngredient(false);}} placeholder="Malzeme..." style={{...menuInputStyle,width:100,padding:'3px 7px',height:26,fontSize:12}} />
                <button onClick={()=>{if(newIngredient.trim()){set('ingredients',[...(form.ingredients||[]),newIngredient.trim()]);setNewIngredient('');}setAddingIngredient(false);}} style={{ padding:'3px 9px', borderRadius:999, background:'var(--success-500)', color:'#fff', border:'none', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)' }}>✓</button>
              </div>
            ) : (
              <button onClick={()=>setAddingIngredient(true)} style={{ padding:'3px 9px', borderRadius:999, border:'1.5px dashed var(--border-default)', background:'none', fontSize:11, fontWeight:600, color:'var(--text-secondary)', cursor:'pointer', display:'flex', alignItems:'center', gap:3, fontFamily:'var(--font-sans)' }}>
                <Icon name="plus" size={11} color="var(--text-secondary)" /> Ekle
              </button>
            )}
          </div>
        </div>

        {/* Ürün Seçenekleri (Müşteri ekranı) */}
        <div style={{ marginBottom: 14 }}>
          <FieldLabel>Ürün Seçenekleri</FieldLabel>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.4 }}>Müşterinin sepete eklerken göreceği seçenek grupları</div>
          {(form.productOptions||[]).map((group, gi) => (
            <div key={gi} style={{ border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-sm)', padding:10, marginBottom:8, background:'var(--bg-sunken)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <input value={group.label} onChange={e=>{const po=[...(form.productOptions||[])];po[gi]={...po[gi],label:e.target.value};set('productOptions',po);}} style={{...menuInputStyle,flex:1,padding:'4px 8px',fontSize:12}} placeholder="Grup adı" />
                <select value={group.type} onChange={e=>{const po=[...(form.productOptions||[])];po[gi]={...po[gi],type:e.target.value};set('productOptions',po);}} style={{...menuInputStyle,width:80,padding:'4px 6px',fontSize:11,cursor:'pointer'}}>
                  <option value="radio">Tekli</option>
                  <option value="check">Çoklu</option>
                </select>
                <button onClick={()=>set('productOptions',(form.productOptions||[]).filter((_,j)=>j!==gi))} style={{ background:'none', border:'none', cursor:'pointer', padding:2 }}><Icon name="close" size={12} color="var(--error-500)" /></button>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:8 }}>
                <SwitchSmall on={group.required} onClick={()=>{const po=[...(form.productOptions||[])];po[gi]={...po[gi],required:!po[gi].required};set('productOptions',po);}} />
                <span style={{ fontSize:10, color:'var(--text-muted)', fontWeight:600 }}>Zorunlu</span>
              </div>
              {(group.items||[]).map((gItem, ii) => (
                <div key={ii} style={{ display:'flex', gap:4, marginBottom:4, alignItems:'center' }}>
                  <input value={gItem.label} onChange={e=>{const po=[...(form.productOptions||[])];const items=[...po[gi].items];items[ii]={...items[ii],label:e.target.value};po[gi]={...po[gi],items};set('productOptions',po);}} style={{...menuInputStyle,flex:1,padding:'4px 8px',fontSize:11}} placeholder="Seçenek adı" />
                  <div style={{ position:'relative' }}><span style={{ position:'absolute', left:6, top:'50%', transform:'translateY(-50%)', fontSize:10, color:'var(--text-muted)' }}>₺</span><input type="number" value={gItem.price||0} onChange={e=>{const po=[...(form.productOptions||[])];const items=[...po[gi].items];items[ii]={...items[ii],price:+e.target.value};po[gi]={...po[gi],items};set('productOptions',po);}} style={{...menuInputStyle,width:52,padding:'4px 6px 4px 18px',fontSize:11,textAlign:'right'}} /></div>
                  <button onClick={()=>{const po=[...(form.productOptions||[])];po[gi]={...po[gi],items:po[gi].items.filter((_,j)=>j!==ii)};set('productOptions',po);}} style={{ background:'none', border:'none', cursor:'pointer', padding:1 }}><Icon name="close" size={10} color="var(--text-muted)" /></button>
                </div>
              ))}
              <button onClick={()=>{const po=[...(form.productOptions||[])];po[gi]={...po[gi],items:[...(po[gi].items||[]),{label:'',price:0}]};set('productOptions',po);}} style={{ padding:'2px 8px', borderRadius:999, border:'1px dashed var(--border-default)', background:'none', fontSize:10, fontWeight:600, color:'var(--text-tertiary)', cursor:'pointer', fontFamily:'var(--font-sans)', marginTop:2 }}>+ Seçenek</button>
            </div>
          ))}
          <button onClick={()=>set('productOptions',[...(form.productOptions||[]),{label:'',type:'radio',required:false,items:[{label:'',price:0}]}])} style={{ width:'100%', padding:'7px 0', borderRadius:'var(--radius-sm)', border:'1.5px dashed var(--border-default)', background:'none', fontSize:11, fontWeight:600, color:'var(--brand-600)', cursor:'pointer', fontFamily:'var(--font-sans)', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
            <Icon name="plus" size={12} color="var(--brand-600)" /> Seçenek grubu ekle
          </button>
        </div>

        {/* Status */}
        <div style={{ background:'var(--bg-sunken)', borderRadius:'var(--radius-md)', padding:'12px 14px', marginBottom:14 }}>
          <FieldLabel>Durum</FieldLabel>
          {[['stock','Stok mevcut','Ürün stokta var'],['active','Aktif','Müşterilere göster']].map(([key,label,sub],i) => (
            <div key={key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding: i===0?'0 0 10px':'10px 0 0', borderTop:i===1?'1px solid var(--border-subtle)':'none' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{label}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{sub}</div>
              </div>
              <SwitchSmall on={form[key]} onClick={()=>set(key,!form[key])} />
            </div>
          ))}
        </div>

        {/* Stats */}
        {(item.orderCount||item.revenue) && (
          <div style={{ background:'var(--brand-50)', borderRadius:'var(--radius-md)', padding:'12px 14px' }}>
            <FieldLabel>İstatistikler</FieldLabel>
            <div style={{ display:'flex', gap:8 }}>
              <div style={{ flex:1, textAlign:'center' }}>
                <div style={{ fontSize:20, fontWeight:800, color:'var(--brand-600)' }}>{item.orderCount||0}</div>
                <div style={{ fontSize:11, color:'var(--text-tertiary)' }}>sipariş</div>
              </div>
              <div style={{ width:1, background:'var(--brand-100)' }}></div>
              <div style={{ flex:1, textAlign:'center' }}>
                <div style={{ fontSize:20, fontWeight:800, color:'var(--brand-600)' }}>{money(item.revenue||0)}</div>
                <div style={{ fontSize:11, color:'var(--text-tertiary)' }}>ciro</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { DashboardView, OrdersView, MenuView });
