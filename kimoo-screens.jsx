// kimoo-screens.jsx — customer app screens. Depends on kimoo-shared.jsx globals.
const { Icon, Pill, MediaBox, Badge, PrimaryBtn, ScreenHeader, money,
  CATEGORIES, RESTAURANTS, MENU, PRODUCT_OPTIONS, PAYMENT_LABELS,
  STORIES, PAST_ORDERS, FLASH_DEALS, RESTAURANT_MENU_CATS } = window;

const PAD = 16;
const CONTENT_BOTTOM = 120;

// =============== SECTION HEADER ===============
function SectionHead({ title, action, onAction, small }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: small ? 8 : 12 }}>
      <span style={{ fontSize: small ? 15 : 17, fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{title}</span>
      {action && <button onClick={onAction} style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-600)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 3 }}>{action}<Icon name="chevR" size={14} color="var(--brand-600)" /></button>}
    </div>
  );
}

// =============== SORT/FILTER ===============
const MOBILE_SORT = [
  { id: 'recommended', label: 'Önerilen' },
  { id: 'rating',      label: 'En İyi Puan' },
  { id: 'fastest',     label: 'En Hızlı' },
  { id: 'nearest',     label: 'En Yakın' },
];

// ============================ HOME ============================
function HomeScreen({ go, openRestaurant, cartCount }) {
  const [cat, setCat] = React.useState('all');
  const [sort, setSort] = React.useState('recommended');
  const [freeOnly, setFreeOnly] = React.useState(false);
  const [maxEta, setMaxEta] = React.useState(null);
  const [minRating, setMinRating] = React.useState(null);
  const [payFilter, setPayFilter] = React.useState(null);
  const [showFilters, setShowFilters] = React.useState(false);
  const [storyOpen, setStoryOpen] = React.useState(null);

  const activeFilterCount = [freeOnly, maxEta, minRating, payFilter].filter(Boolean).length;
  const clearAll = () => { setFreeOnly(false); setMaxEta(null); setMinRating(null); setPayFilter(null); };

  let list = RESTAURANTS
    .filter(r => cat === 'all' || r.tags.includes(cat))
    .filter(r => !freeOnly || r.fee === 0)
    .filter(r => !maxEta || (parseInt(r.eta) <= maxEta))
    .filter(r => !minRating || r.rating >= minRating)
    .filter(r => !payFilter || r.payments?.includes(payFilter));
  if (sort === 'rating')  list = [...list].sort((a,b) => b.rating - a.rating);
  if (sort === 'fastest') list = [...list].sort((a,b) => parseInt(a.eta) - parseInt(b.eta));
  if (sort === 'nearest') list = [...list].sort((a,b) => parseFloat(a.distance) - parseFloat(b.distance));

  const FChip = ({ active, onClick, children, color }) => (
    <button onClick={onClick} style={{ padding: '7px 13px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', background: active ? (color || 'var(--brand-500)') : 'var(--bg-sunken)', color: active ? '#fff' : 'var(--text-secondary)', border: 'none', transition: 'all .15s ease', display: 'flex', alignItems: 'center', gap: 5 }}>{children}</button>
  );
  const FilterLabel = ({ children }) => (
    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{children}</div>
  );

  return (
    <div style={{ paddingBottom: CONTENT_BOTTOM }}>
      {/* ---- Location header ---- */}
      <div style={{ paddingTop: 60, padding: '60px 16px 10px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>TESLİMAT ADRESİ</div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              <Icon name="pin" size={17} color="var(--brand-500)" />
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Kadıköy, İstanbul</span>
              <Icon name="chevD" size={15} color="var(--text-tertiary)" />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => go('notifications')} style={{ width: 40, height: 40, borderRadius: 999, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer', position: 'relative' }}>
              <Icon name="msg" size={19} color="var(--text-primary)" />
              <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 999, background: 'var(--brand-500)', border: '2px solid var(--bg-surface)' }} />
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', cursor: 'pointer', border: 'none', boxShadow: 'var(--shadow-brand)' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>E</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---- Search ---- */}
      <div style={{ padding: '4px 16px 8px', background: 'var(--bg-surface)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div onClick={() => go('search')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}>
          <Icon name="search" size={19} color="var(--text-muted)" />
          <span style={{ color: 'var(--text-muted)', fontSize: 14, flex: 1 }}>Restoran veya yemek ara</span>
          <div style={{ width: 1, height: 20, background: 'var(--border-default)' }} />
          <Icon name="filter" size={17} color="var(--text-muted)" />
        </div>
      </div>

      {/* ---- Stories ---- */}
      <div style={{ padding: '8px 0 4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', gap: 12, padding: '0 16px' }}>
          {STORIES.map(s => (
            <div key={s.id} onClick={() => setStoryOpen(s.id === storyOpen ? null : s.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 'none', cursor: 'pointer' }}>
              <div style={{ width: 64, height: 64, borderRadius: 999, background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})`, padding: 2.5, transition: 'transform .15s', transform: storyOpen === s.id ? 'scale(1.08)' : 'none' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: 999, background: 'var(--bg-surface)', display: 'grid', placeItems: 'center' }}>
                  <span style={{ fontSize: 24 }}>{s.emoji}</span>
                </div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', maxWidth: 64, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Kimoo+ banner ---- */}
      <div style={{ padding: '6px 16px 0' }}>
        <div style={{ background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: '12px 14px', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-brand)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'absolute', right: -16, top: -16, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <Icon name="bolt" size={22} color="#fff" />
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 2 }}>Kimoo+ ile ücretsiz teslimat</div>
            <div style={{ fontSize: 12, opacity: 0.88 }}>Ayda ₺49 · İlk ay hediye</div>
          </div>
          <Icon name="chevR" size={18} color="rgba(255,255,255,0.7)" />
        </div>
      </div>

      {/* ---- Quick Reorder ---- */}
      <div style={{ padding: '14px 16px 0' }}>
        <SectionHead title="Tekrar sipariş ver" action="Tümü" small />
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -16px', padding: '0 16px 4px' }}>
          {PAST_ORDERS.map((o, i) => (
            <div key={i} onClick={() => { const r = RESTAURANTS.find(x => x.id === o.restId); if (r) openRestaurant(r); }} style={{ flex: 'none', width: 210, padding: 12, background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', transition: 'box-shadow .15s' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontSize: 20, flex: 'none' }}>{o.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.restaurant}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.items}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand-600)' }}>{money(o.total)}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{o.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Flash Deals ---- */}
      <div style={{ padding: '14px 0 0' }}>
        <div style={{ padding: '0 16px' }}><SectionHead title="Fırsatlar" action="Tümü" small /></div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', padding: '0 16px 4px' }}>
          {FLASH_DEALS.map((d, i) => (
            <div key={i} style={{ flex: 'none', width: 180, padding: '14px 14px 12px', borderRadius: 'var(--radius-lg)', background: d.gradient, color: '#fff', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -10, bottom: -10, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ fontSize: 22, marginBottom: 6 }}>{d.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.2, marginBottom: 3 }}>{d.title}</div>
              <div style={{ fontSize: 11, opacity: 0.88, lineHeight: 1.35 }}>{d.sub}</div>
              <div style={{ marginTop: 8, padding: '3px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: 999, display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>{d.code}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Categories ---- */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '12px 16px 2px', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', flex: 'none' }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', fontSize: 22,
              background: cat === c.id ? 'var(--brand-500)' : 'var(--bg-sunken)',
              border: cat === c.id ? '2px solid var(--brand-500)' : '2px solid transparent', transition: 'all .15s ease' }}>{c.icon}</div>
            <span style={{ fontSize: 11, fontWeight: 600, color: cat === c.id ? 'var(--brand-600)' : 'var(--text-tertiary)' }}>{c.label}</span>
          </button>
        ))}
      </div>

      {/* ---- Filter bar ---- */}
      <div style={{ padding: '6px 16px 4px', display: 'flex', gap: 6, alignItems: 'center' }}>
        <button onClick={() => setShowFilters(f => !f)} style={{
          display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 999,
          background: (showFilters || activeFilterCount > 0) ? 'var(--brand-500)' : 'var(--bg-surface)',
          color: (showFilters || activeFilterCount > 0) ? '#fff' : 'var(--text-secondary)',
          border: (showFilters || activeFilterCount > 0) ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)',
          fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', flex: 'none',
        }}>
          <Icon name="filter" size={13} color={(showFilters || activeFilterCount > 0) ? '#fff' : 'var(--text-muted)'} />
          Filtre{activeFilterCount > 0 && <span style={{ minWidth: 16, height: 16, borderRadius: 999, background: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 800, display: 'grid', placeItems: 'center' }}>{activeFilterCount}</span>}
        </button>
        <div style={{ width: 1, height: 18, background: 'var(--border-subtle)', flex: 'none' }} />
        <div style={{ flex: 1, overflowX: 'auto', display: 'flex', gap: 5, scrollbarWidth: 'none' }}>
          {MOBILE_SORT.map(s => (
            <button key={s.id} onClick={() => setSort(s.id)} style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', flex: 'none',
              background: sort === s.id ? 'var(--brand-50)' : 'transparent',
              color: sort === s.id ? 'var(--brand-700)' : 'var(--text-muted)',
              border: sort === s.id ? '1.5px solid color-mix(in srgb, var(--brand-500) 30%, transparent)' : '1.5px solid transparent',
              cursor: 'pointer', fontFamily: 'var(--font-sans)',
            }}>{s.label}</button>
          ))}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} style={{ width: 26, height: 26, borderRadius: 999, border: 'none', background: 'var(--error-50)', display: 'grid', placeItems: 'center', cursor: 'pointer', flex: 'none' }}>
            <Icon name="close" size={12} color="var(--error-500)" />
          </button>
        )}
      </div>

      {/* ---- Expanded filters ---- */}
      {showFilters && (
        <div style={{ padding: '0 16px 8px' }}>
          <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: 14, boxShadow: 'var(--shadow-md)' }}>
            <div style={{ marginBottom: 14 }}>
              <FilterLabel>Teslimat ücreti</FilterLabel>
              <div style={{ display: 'flex', gap: 6 }}><FChip active={freeOnly} onClick={() => setFreeOnly(v => !v)}>Ücretsiz teslimat</FChip></div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <FilterLabel>Minimum puan</FilterLabel>
              <div style={{ display: 'flex', gap: 6 }}>
                {[[4.0,'4.0+'],[4.5,'4.5+'],[4.8,'4.8+']].map(([val,label]) => (
                  <FChip key={val} active={minRating===val} onClick={() => setMinRating(v => v===val ? null : val)} color="var(--warning-500)"><Icon name="star" size={11} color={minRating===val ? '#fff' : 'var(--warning-500)'} />{label}</FChip>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <FilterLabel>Teslimat süresi</FilterLabel>
              <div style={{ display: 'flex', gap: 6 }}>
                {[[20,'20 dk'],[30,'30 dk'],[45,'45 dk']].map(([val,label]) => (
                  <FChip key={val} active={maxEta===val} onClick={() => setMaxEta(v => v===val ? null : val)}><Icon name="clock" size={11} color={maxEta===val ? '#fff' : 'var(--text-muted)'} />{label}</FChip>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>{list.length}</strong> restoran</span>
              {activeFilterCount > 0 && <button onClick={clearAll} style={{ fontSize: 12, fontWeight: 700, color: 'var(--error-600)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Temizle</button>}
            </div>
          </div>
        </div>
      )}

      {/* ---- Featured Horizontal ---- */}
      <div style={{ padding: '8px 0 0' }}>
        <div style={{ padding: '0 16px' }}><SectionHead title="Öne çıkanlar" small /></div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', padding: '0 16px 4px' }}>
          {RESTAURANTS.filter(r => r.open && r.discount).map(r => (
            <div key={r.id} onClick={() => openRestaurant(r)} style={{ flex: 'none', width: 260, cursor: 'pointer', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
              <MediaBox h={120} label="restoran görseli" radius="0">
                {r.discount && <Badge solid style={{ position: 'absolute', top: 10, left: 10, fontSize: 11 }}>{r.discount}</Badge>}
                {r.free && <Badge style={{ position: 'absolute', top: 10, right: 10, background: 'var(--bg-surface)', color: 'var(--success-600)', fontSize: 10 }}>Ücretsiz teslimat</Badge>}
              </MediaBox>
              <div style={{ padding: '10px 12px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Icon name="star" size={13} color="var(--warning-500)" strokeWidth={0} style={{ fill: 'var(--warning-500)' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{r.rating}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{r.eta} · {r.distance} · {r.fee === 0 ? 'Ücretsiz teslimat' : money(r.fee)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Restaurant list ---- */}
      <div style={{ padding: '10px 16px 0' }}>
        <SectionHead title="Yakınındaki restoranlar" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {list.map(r => <RestaurantCard key={r.id} r={r} onClick={() => openRestaurant(r)} />)}
        </div>
      </div>
    </div>
  );
}

function RestaurantCard({ r, onClick }) {
  return (
    <div onClick={r.open ? onClick : undefined} style={{ cursor: r.open ? 'pointer' : 'default', opacity: r.open ? 1 : 0.55 }}>
      <MediaBox h={138} label="restoran görseli" radius="var(--radius-lg)">
        {r.discount && <Badge solid style={{ position: 'absolute', top: 10, left: 10 }}>{r.discount}</Badge>}
        {r.free && <Badge style={{ position: 'absolute', top: 10, right: 10, background: 'var(--bg-surface)', color: 'var(--success-600)', fontSize: 11 }}>Ücretsiz teslimat</Badge>}
        {!r.open && <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,23,20,0.5)', display: 'grid', placeItems: 'center' }}><Badge tone="neutral" style={{ background: 'var(--bg-surface)', fontSize: 13, padding: '7px 14px' }}>Yarın 10:00'da açılır</Badge></div>}
        {/* order count badge */}
        {r.orderCount && r.open && <div style={{ position: 'absolute', bottom: 10, left: 10, padding: '3px 8px', borderRadius: 999, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', fontSize: 11, fontWeight: 600, color: '#fff' }}>{r.orderCount} sipariş</div>}
      </MediaBox>
      <div style={{ paddingTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 'none', background: 'var(--bg-sunken)', padding: '3px 8px', borderRadius: 999 }}>
            <Icon name="star" size={13} color="var(--warning-500)" strokeWidth={0} style={{ fill: 'var(--warning-500)' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{r.rating}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>({r.reviews > 999 ? (r.reviews / 1000).toFixed(1) + 'B' : r.reviews})</span>
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{r.cuisine}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
          <InfoChip icon="clock" text={r.eta} />
          {r.distance && <InfoChip icon="pin" text={r.distance} />}
          <InfoChip icon="scooter" text={r.fee === 0 ? 'Ücretsiz' : money(r.fee)} highlight={r.fee === 0} />
          <InfoChip icon="tag" text={'Min ' + money(r.minOrder)} />
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon, text, highlight }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 500, color: highlight ? 'var(--success-600)' : 'var(--text-tertiary)', padding: '2px 0' }}>
      <Icon name={icon} size={13} color={highlight ? 'var(--success-500)' : 'var(--text-muted)'} />{text}
      <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>·</span>
    </span>
  );
}

// ============================ RESTAURANT ============================
function RestaurantScreen({ restaurant, go, openProduct, addQuick, openReviews }) {
  const menu = MENU[restaurant.id] || MENU.r1;
  const [menuCat, setMenuCat] = React.useState('all');
  const filtered = menuCat === 'all' ? menu : menu.filter(m => m.cat === menuCat);

  return (
    <div style={{ paddingBottom: CONTENT_BOTTOM }}>
      <div style={{ position: 'relative' }}>
        <MediaBox h={200} label="restoran kapak görseli" radius="0">
          <button onClick={() => go('home')} style={{ position: 'absolute', top: 58, left: 16, width: 38, height: 38, borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Icon name="back" size={19} color="#1A1714" /></button>
          <button style={{ position: 'absolute', top: 58, right: 16, width: 38, height: 38, borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Icon name="heart" size={19} color="#1A1714" /></button>
          {/* Order count */}
          {restaurant.orderCount && <div style={{ position: 'absolute', bottom: 32, left: 16, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.55)', fontSize: 12, fontWeight: 600, color: '#fff' }}>{restaurant.orderCount} sipariş</div>}
        </MediaBox>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '20px 20px 0 0', marginTop: -20, position: 'relative', padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{restaurant.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{restaurant.cuisine} · {restaurant.price}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'var(--bg-sunken)', padding: '4px 10px', borderRadius: 999, flex: 'none' }}>
            <Icon name="star" size={14} color="var(--warning-500)" strokeWidth={0} style={{ fill: 'var(--warning-500)' }} />
            <span style={{ fontSize: 14, fontWeight: 700 }}>{restaurant.rating}</span>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          {[['clock', restaurant.eta, 'Teslimat'], ['pin', restaurant.distance || '—', 'Mesafe'], ['scooter', restaurant.fee === 0 ? 'Ücretsiz' : money(restaurant.fee), 'Teslimat ücreti']].map(([ic, v, l], i) => (
            <div key={i} style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '10px 8px', textAlign: 'center' }}>
              <Icon name={ic} size={17} color="var(--brand-500)" style={{ margin: '0 auto 3px' }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Reviews link */}
        <button onClick={openReviews} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', marginTop: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
          <Icon name="star" size={18} color="var(--warning-500)" />
          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left' }}>{restaurant.rating} · {restaurant.reviews} yorum</span>
          <Icon name="chevR" size={16} color="var(--text-muted)" />
        </button>

        {/* Payment methods */}
        {restaurant.payments && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {restaurant.payments.map(p => (
                <span key={p} style={{ fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 999, background: 'var(--bg-sunken)', color: 'var(--text-muted)' }}>{PAYMENT_LABELS[p]}</span>
              ))}
            </div>
          </div>
        )}

        {/* ---- Menu category tabs ---- */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', margin: '16px -16px 0', padding: '0 16px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
          {RESTAURANT_MENU_CATS.map(c => (
            <button key={c.id} onClick={() => setMenuCat(c.id)} style={{
              padding: '7px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', flex: 'none',
              background: menuCat === c.id ? 'var(--brand-500)' : 'transparent',
              color: menuCat === c.id ? '#fff' : 'var(--text-tertiary)',
              border: menuCat === c.id ? 'none' : '1.5px solid var(--border-default)',
              cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all .15s ease',
            }}>{c.label} <span style={{ fontSize: 11, opacity: 0.7 }}>({(menuCat === c.id && c.id === 'all') ? menu.length : menu.filter(m => c.id === 'all' || m.cat === c.id).length})</span></button>
          ))}
        </div>

        {/* Menu items */}
        <div>
          {filtered.map(m => <FoodRow key={m.id} m={m} onClick={() => openProduct(m)} onAdd={() => addQuick(m)} />)}
          {filtered.length === 0 && (
            <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>Bu kategoride ürün yok</div>
          )}
        </div>
      </div>
    </div>
  );
}

function FoodRow({ m, onClick, onAdd }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }} onClick={onClick}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</span>
          {m.popular && <Badge tone="brand" style={{ fontSize: 10, padding: '2px 6px' }}><Icon name="flame" size={10} color="var(--brand-700)" />Popüler</Badge>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{m.desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--brand-600)' }}>{money(m.price)}</span>
          {m.cal && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>· {m.cal} kcal</span>}
        </div>
      </div>
      <div style={{ position: 'relative', flex: 'none' }}>
        <MediaBox h={84} radius="var(--radius-md)" style={{ width: 84 }} />
        <button onClick={(e) => { e.stopPropagation(); onAdd(); }} style={{ position: 'absolute', bottom: -6, right: -6, width: 32, height: 32, borderRadius: 999, background: 'var(--brand-500)', border: '2.5px solid var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <Icon name="plus" size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.RestaurantScreen = RestaurantScreen;
