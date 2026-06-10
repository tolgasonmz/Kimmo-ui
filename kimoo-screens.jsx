// kimoo-screens.jsx — customer app screens. Depends on kimoo-shared.jsx globals.
const { Icon, Pill, MediaBox, Badge, PrimaryBtn, ScreenHeader, money,
  CATEGORIES, RESTAURANTS, MENU, PRODUCT_OPTIONS } = window;

const PAD = 16;
const CONTENT_BOTTOM = 120; // clearance for tab bar / action bar

// ============================ HOME ============================
function HomeScreen({ go, openRestaurant, cartCount }) {
  const [cat, setCat] = React.useState('all');
  const list = cat === 'all' ? RESTAURANTS : RESTAURANTS.filter(r => r.tags.includes(cat));
  return (
    <div style={{ paddingBottom: CONTENT_BOTTOM }}>
      {/* location header */}
      <div style={{ paddingTop: 60, padding: '60px 16px 12px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 2 }}>TESLİMAT ADRESİ</div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              <Icon name="pin" size={18} color="var(--brand-500)" />
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Kadıköy, İstanbul</span>
              <Icon name="chevD" size={16} color="var(--text-tertiary)" />
            </button>
          </div>
          <button style={{ width: 42, height: 42, borderRadius: 999, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <Icon name="user" size={20} color="var(--text-primary)" />
          </button>
        </div>
      </div>

      {/* search */}
      <div style={{ padding: '4px 16px 12px', background: 'var(--bg-surface)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div onClick={() => go('search')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', background: 'var(--bg-sunken)', borderRadius: 999, cursor: 'pointer' }}>
          <Icon name="search" size={20} color="var(--text-tertiary)" />
          <span style={{ color: 'var(--text-muted)', fontSize: 15 }}>Restoran veya yemek ara</span>
        </div>
      </div>

      {/* Kimoo+ banner */}
      <div style={{ padding: '8px 16px 4px' }}>
        <div style={{ background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: 18, color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-brand)' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Icon name="scooter" size={20} color="#fff" />
              <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.04em' }}>KIMOO+</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.15, marginBottom: 4 }}>Sınırsız ücretsiz teslimat</div>
            <div style={{ fontSize: 13, opacity: 0.92 }}>Ayda yalnızca ₺49 · İlk ay ücretsiz</div>
          </div>
        </div>
      </div>

      {/* categories */}
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '14px 16px 6px', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', flex: 'none',
          }}>
            <div style={{ width: 58, height: 58, borderRadius: 'var(--radius-lg)', display: 'grid', placeItems: 'center', fontSize: 26,
              background: cat === c.id ? 'var(--brand-500)' : 'var(--bg-sunken)',
              border: cat === c.id ? '2px solid var(--brand-500)' : '2px solid transparent', transition: 'all .15s ease' }}>{c.icon}</div>
            <span style={{ fontSize: 12, fontWeight: 600, color: cat === c.id ? 'var(--brand-600)' : 'var(--text-secondary)' }}>{c.label}</span>
          </button>
        ))}
      </div>

      {/* restaurant list */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 14, color: 'var(--text-primary)' }}>Sana özel</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {list.map(r => <RestaurantCard key={r.id} r={r} onClick={() => openRestaurant(r)} />)}
        </div>
      </div>
    </div>
  );
}

function RestaurantCard({ r, onClick }) {
  return (
    <div onClick={r.open ? onClick : undefined} style={{ cursor: r.open ? 'pointer' : 'default', opacity: r.open ? 1 : 0.6 }}>
      <MediaBox h={158} label="restoran görseli" radius="var(--radius-lg)">
        {r.discount && <Badge solid style={{ position: 'absolute', top: 12, left: 12 }}>{r.discount}</Badge>}
        {r.free && <Badge style={{ position: 'absolute', top: 12, right: 12, background: 'var(--bg-surface)', color: 'var(--success-600)' }}>Ücretsiz teslimat</Badge>}
        {!r.open && <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,23,20,0.45)', display: 'grid', placeItems: 'center' }}><Badge tone="neutral" style={{ background: 'var(--bg-surface)', fontSize: 13, padding: '7px 14px' }}>Yarın 10:00'da açılır</Badge></div>}
      </MediaBox>
      <div style={{ paddingTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 'none' }}>
            <Icon name="star" size={15} color="var(--warning-500)" strokeWidth={0} style={{ fill: 'var(--warning-500)' }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.rating}</span>
            <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>({r.reviews})</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 13, color: 'var(--text-secondary)' }}>
          <span>{r.cuisine}</span><span>·</span><span>{r.price}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={15} color="var(--text-tertiary)" />{r.eta}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="scooter" size={15} color="var(--text-tertiary)" />{r.fee === 0 ? 'Ücretsiz' : money(r.fee)}</span>
        </div>
      </div>
    </div>
  );
}

// ============================ RESTAURANT ============================
function RestaurantScreen({ restaurant, go, openProduct, addQuick, openReviews }) {
  const menu = MENU[restaurant.id] || MENU.r1;
  return (
    <div style={{ paddingBottom: CONTENT_BOTTOM }}>
      <div style={{ position: 'relative' }}>
        <MediaBox h={220} label="restoran kapak görseli" radius="0">
          <button onClick={() => go('home')} style={{ position: 'absolute', top: 58, left: 16, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Icon name="back" size={20} color="#1A1714" /></button>
          <button style={{ position: 'absolute', top: 58, right: 16, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Icon name="heart" size={20} color="#1A1714" /></button>
        </MediaBox>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '22px 22px 0 0', marginTop: -22, position: 'relative', padding: '20px 16px 0' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{restaurant.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, fontSize: 14, color: 'var(--text-secondary)' }}>
          <span>{restaurant.cuisine}</span><span>·</span><span>{restaurant.price}</span>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {[['star', `${restaurant.rating}`, `${restaurant.reviews} yorum`, openReviews], ['clock', restaurant.eta, 'teslimat', null], ['scooter', restaurant.fee === 0 ? 'Ücretsiz' : money(restaurant.fee), 'teslimat', null]].map(([ic, v, l, action], i) => (
            <div key={i} onClick={action || undefined} style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '12px 10px', textAlign: 'center', cursor: action ? 'pointer' : 'default' }}>
              <Icon name={ic} size={18} color="var(--brand-500)" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 19, fontWeight: 800, margin: '24px 0 4px', color: 'var(--text-primary)' }}>Popüler ürünler</div>
        <div>
          {menu.map(m => <FoodRow key={m.id} m={m} onClick={() => openProduct(m)} onAdd={() => addQuick(m)} />)}
        </div>
      </div>
    </div>
  );
}

function FoodRow({ m, onClick, onAdd }) {
  return (
    <div style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }} onClick={onClick}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</span>
          {m.popular && <Badge tone="brand" style={{ fontSize: 10, padding: '3px 7px' }}><Icon name="flame" size={11} color="var(--brand-700)" />Popüler</Badge>}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 5, lineHeight: 1.45, maxWidth: '92%' }}>{m.desc}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand-600)', marginTop: 8 }}>{money(m.price)}</div>
      </div>
      <div style={{ position: 'relative', flex: 'none' }}>
        <MediaBox h={92} radius="var(--radius-md)" style={{ width: 92 }} />
        <button onClick={(e) => { e.stopPropagation(); onAdd(); }} style={{ position: 'absolute', bottom: -8, right: -8, width: 36, height: 36, borderRadius: 999, background: 'var(--bg-surface)', border: '1.5px solid var(--border-subtle)', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-md)' }}>
          <Icon name="plus" size={20} color="var(--brand-600)" />
        </button>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.RestaurantScreen = RestaurantScreen;
