// kimoo-tabs.jsx — Search, Orders, Favorites, Profile tab screens
const { Icon, MediaBox, Badge, PrimaryBtn, ScreenHeader, money, RESTAURANTS, CATEGORIES, PAST_ORDERS } = window;

// ======================== SEARCH ========================
function SearchScreen({ openRestaurant }) {
  const [q, setQ] = React.useState('');
  const [recentSearches] = React.useState(['Kebap', 'Pizza', 'Burger', 'Künefe']);
  const results = q ? RESTAURANTS.filter(r => (r.name + r.cuisine).toLowerCase().includes(q.toLowerCase())) : [];

  const POPULAR_ITEMS = [
    { name: 'Adana Dürüm', restaurant: 'Köşe Ocakbaşı', price: 145, emoji: '🌯', restId: 'r1' },
    { name: 'Margherita', restaurant: 'Napoli Pizzeria', price: 135, emoji: '🍕', restId: 'r2' },
    { name: 'Classic Burger', restaurant: 'Burger Atölyesi', price: 155, emoji: '🍔', restId: 'r3' },
    { name: 'Açai Bowl', restaurant: 'Yeşil Kâse', price: 120, emoji: '🥣', restId: 'r4' },
  ];

  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      {/* Header + Search */}
      <div style={{ paddingTop: 60, padding: '60px 16px 12px', background: 'var(--bg-surface)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12, color: 'var(--text-primary)' }}>Ara</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-lg)' }}>
          <Icon name="search" size={19} color="var(--text-muted)" />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Restoran, mutfak veya yemek" style={{ border: 'none', background: 'none', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 15, width: '100%', color: 'var(--text-primary)' }} />
          {q && <button onClick={() => setQ('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flex: 'none' }}><Icon name="close" size={16} color="var(--text-muted)" /></button>}
        </div>
      </div>

      {/* Empty state — browsing */}
      {!q && (
        <div style={{ padding: '8px 16px 0' }}>
          {/* Recent searches */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Son aramalar</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {recentSearches.map((s, i) => (
                <button key={i} onClick={() => setQ(s)} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icon name="clock" size={13} color="var(--text-muted)" />{s}
                </button>
              ))}
            </div>
          </div>

          {/* Categories grid */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Mutfaklar</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {CATEGORIES.slice(1).map(c => (
                <button key={c.id} onClick={() => setQ(c.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '14px 8px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular items */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Popüler yemekler</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {POPULAR_ITEMS.map((item, i) => {
                const r = RESTAURANTS.find(x => x.id === item.restId);
                return (
                  <div key={i} onClick={() => r && openRestaurant(r)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontSize: 20, flex: 'none' }}>{item.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{item.restaurant}</div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-600)' }}>{money(item.price)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Search results */}
      {q && (
        <div style={{ padding: '8px 16px 0' }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>{results.length} sonuç bulundu</div>
          {results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
                <Icon name="search" size={28} color="var(--text-muted)" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Sonuç bulunamadı</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Farklı bir arama yapmayı deneyin</div>
            </div>
          )}
          {results.map(r => (
            <div key={r.id} onClick={() => r.open && openRestaurant(r)} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', cursor: r.open ? 'pointer' : 'default', opacity: r.open ? 1 : 0.5 }}>
              <MediaBox h={68} radius="var(--radius-md)" style={{ width: 68, flex: 'none' }}>
                {r.discount && <Badge solid style={{ position: 'absolute', bottom: 4, left: 4, fontSize: 10, padding: '2px 6px' }}>{r.discount}</Badge>}
              </MediaBox>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'var(--bg-sunken)', padding: '1px 6px', borderRadius: 999 }}>
                    <Icon name="star" size={11} color="var(--warning-500)" strokeWidth={0} style={{ fill: 'var(--warning-500)' }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{r.rating}</span>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{r.cuisine}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="clock" size={12} color="var(--text-muted)" />{r.eta}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="pin" size={12} color="var(--text-muted)" />{r.distance}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="scooter" size={12} color={r.fee === 0 ? 'var(--success-500)' : 'var(--text-muted)'} />{r.fee === 0 ? 'Ücretsiz' : money(r.fee)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ======================== ORDERS ========================
function OrdersScreen({ go, hasActive, openTracking, openReview }) {
  const [activeTab, setActiveTab] = React.useState('all');
  const past = [
    { id: 'KM-4820', name: 'Napoli Pizzeria', items: ['Margherita', 'Cola'], total: 285, date: 'Dün, 19:30', status: 'delivered', emoji: '🍕', rating: null },
    { id: 'KM-4795', name: 'Yeşil Kâse', items: ['Açai Bowl'], total: 120, date: '8 Haz, 13:10', status: 'delivered', emoji: '🥗', rating: 5 },
    { id: 'KM-4760', name: 'Burger Atölyesi', items: ['Classic Burger x2', 'Patates'], total: 410, date: '5 Haz, 21:05', status: 'delivered', emoji: '🍔', rating: 4 },
    { id: 'KM-4722', name: 'Köşe Ocakbaşı', items: ['Adana Dürüm', 'Ayran'], total: 180, date: '2 Haz, 20:15', status: 'delivered', emoji: '🍢', rating: 5 },
    { id: 'KM-4701', name: 'Tatlıcı Hacı', items: ['Künefe', 'Baklava x2'], total: 390, date: '28 May, 19:00', status: 'cancelled', emoji: '🍰', rating: null },
  ];

  const statusLabels = { delivered: 'Teslim edildi', cancelled: 'İptal edildi' };
  const statusTones = { delivered: 'success', cancelled: 'error' };

  const filtered = activeTab === 'all' ? past : past.filter(o => o.status === activeTab);

  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <div style={{ paddingTop: 60, padding: '60px 16px 0', background: 'var(--bg-surface)' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 14 }}>Siparişlerim</div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid var(--border-subtle)', margin: '0 -16px', padding: '0 16px' }}>
          {[['all', 'Tümü'], ['delivered', 'Teslim'], ['cancelled', 'İptal']].map(([k, l]) => (
            <button key={k} onClick={() => setActiveTab(k)} style={{
              padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)',
              background: 'none', border: 'none',
              color: activeTab === k ? 'var(--brand-600)' : 'var(--text-muted)',
              borderBottom: activeTab === k ? '2.5px solid var(--brand-500)' : '2.5px solid transparent',
              marginBottom: -1,
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px 0' }}>
        {/* Active order card */}
        {hasActive && (
          <div onClick={openTracking} style={{ background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', color: '#fff', marginBottom: 14, cursor: 'pointer', boxShadow: 'var(--shadow-brand)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -16, top: -16, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center' }}>
                <Icon name="scooter" size={18} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Aktif sipariş</div>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 1 }}>Köşe Ocakbaşı · Yolda</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>20:45</div>
            </div>
            {/* Progress bar */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
              {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i <= 2 ? '#fff' : 'rgba(255,255,255,0.3)' }} />)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, opacity: 0.85 }}>Hazırlanıyor → Yolda</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700 }}>Takip et <Icon name="chevR" size={14} color="#fff" /></div>
            </div>
          </div>
        )}

        {/* Past orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(o => (
            <div key={o.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 14px 12px' }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontSize: 20, flex: 'none' }}>{o.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{o.name}</span>
                      <Badge tone={statusTones[o.status]} style={{ fontSize: 10, padding: '2px 7px' }}>{statusLabels[o.status]}</Badge>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{o.date} · {o.id}</div>
                  </div>
                </div>
                {/* Items */}
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>{o.items.join(', ')}</div>
                {/* Rating if rated */}
                {o.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 10 }}>
                    {[1,2,3,4,5].map(i => (
                      <Icon key={i} name="star" size={14} color={i <= o.rating ? 'var(--warning-500)' : 'var(--border-default)'} strokeWidth={0} style={{ fill: i <= o.rating ? 'var(--warning-500)' : 'var(--border-default)' }} />
                    ))}
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 4 }}>Değerlendirildi</span>
                  </div>
                )}
                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{money(o.total)}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {o.status === 'delivered' && !o.rating && (
                      <button onClick={(e) => { e.stopPropagation(); openReview && openReview(); }} style={{ background: 'var(--bg-sunken)', color: 'var(--text-secondary)', border: 'none', borderRadius: 999, padding: '7px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icon name="star" size={12} color="var(--text-muted)" />Değerlendir
                      </button>
                    )}
                    {o.status === 'delivered' && (
                      <button style={{ background: 'var(--brand-50)', color: 'var(--brand-700)', border: 'none', borderRadius: 999, padding: '7px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icon name="repeat" size={12} color="var(--brand-600)" />Tekrarla
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ======================== FAVORITES ========================
function FavoritesScreen({ openRestaurant }) {
  const [favTab, setFavTab] = React.useState('restaurants');
  const favRestaurants = RESTAURANTS.filter(r => ['r1','r3','r4','r7'].includes(r.id));
  const favItems = [
    { name: 'Adana Dürüm', restaurant: 'Köşe Ocakbaşı', price: 145, emoji: '🌯', restId: 'r1' },
    { name: 'Classic Burger', restaurant: 'Burger Atölyesi', price: 155, emoji: '🍔', restId: 'r3' },
    { name: 'Açai Bowl', restaurant: 'Yeşil Kâse', price: 120, emoji: '🥣', restId: 'r4' },
    { name: 'Künefe', restaurant: 'Köşe Ocakbaşı', price: 110, emoji: '🍮', restId: 'r1' },
  ];

  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <div style={{ paddingTop: 60, padding: '60px 16px 0', background: 'var(--bg-surface)' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 14 }}>Favoriler</div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid var(--border-subtle)', margin: '0 -16px', padding: '0 16px' }}>
          {[['restaurants', 'Restoranlar'], ['items', 'Yemekler']].map(([k, l]) => (
            <button key={k} onClick={() => setFavTab(k)} style={{
              padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)',
              background: 'none', border: 'none',
              color: favTab === k ? 'var(--brand-600)' : 'var(--text-muted)',
              borderBottom: favTab === k ? '2.5px solid var(--brand-500)' : '2.5px solid transparent',
              marginBottom: -1,
            }}>{l} <span style={{ fontSize: 11, opacity: 0.6 }}>({k === 'restaurants' ? favRestaurants.length : favItems.length})</span></button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px 0' }}>
        {/* Restaurants tab */}
        {favTab === 'restaurants' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {favRestaurants.map(r => (
              <div key={r.id} onClick={() => openRestaurant(r)} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', alignItems: 'center' }}>
                <MediaBox h={72} radius="var(--radius-md)" style={{ width: 72, flex: 'none' }}>
                  {r.discount && <Badge solid style={{ position: 'absolute', bottom: 4, left: 4, fontSize: 9, padding: '2px 5px' }}>{r.discount}</Badge>}
                </MediaBox>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'var(--bg-sunken)', padding: '1px 6px', borderRadius: 999 }}>
                      <Icon name="star" size={11} color="var(--warning-500)" strokeWidth={0} style={{ fill: 'var(--warning-500)' }} />
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{r.rating}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{r.cuisine}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="clock" size={12} color="var(--text-muted)" />{r.eta}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="pin" size={12} color="var(--text-muted)" />{r.distance}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: r.fee === 0 ? 'var(--success-600)' : undefined }}><Icon name="scooter" size={12} color={r.fee === 0 ? 'var(--success-500)' : 'var(--text-muted)'} />{r.fee === 0 ? 'Ücretsiz' : money(r.fee)}</span>
                  </div>
                </div>
                <button style={{ width: 34, height: 34, borderRadius: 999, border: 'none', background: 'var(--brand-50)', display: 'grid', placeItems: 'center', cursor: 'pointer', flex: 'none' }}>
                  <Icon name="heart" size={16} color="var(--brand-500)" strokeWidth={0} style={{ fill: 'var(--brand-500)' }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Items tab */}
        {favTab === 'items' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {favItems.map((item, i) => {
              const r = RESTAURANTS.find(x => x.id === item.restId);
              return (
                <div key={i} onClick={() => r && openRestaurant(r)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontSize: 22, flex: 'none' }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.restaurant}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-600)' }}>{money(item.price)}</span>
                    <button onClick={e => e.stopPropagation()} style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--brand-500)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                      <Icon name="plus" size={14} color="#fff" />
                    </button>
                  </div>
                </div>
              );
            })}
            {/* Empty state hint */}
            <div style={{ textAlign: 'center', padding: '20px 0 0' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Yemek detayında ❤️ ile favorilere ekleyin</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ======================== PROFILE ========================
function ProfileScreen({ go }) {
  const items = [
    ['user', 'Hesap bilgilerim', 'settings'],
    ['pin', 'Adreslerim', 'addresses'],
    ['wallet', 'Kimoo Cüzdan · ₺250', 'wallet'],
    ['ticket', 'Kuponlarım', 'coupons'],
    ['msg', 'Bildirimler', 'notifications'],
    ['bag', 'Sipariş geçmişi', null],
    ['close', 'Sorun bildir', 'report'],
    ['heart', 'Arkadaşını davet et', 'referral'],
  ];
  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <div style={{ paddingTop: 60, padding: '60px 16px 20px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--brand-500)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 24, fontWeight: 800, boxShadow: 'var(--shadow-brand)' }}>E</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Elif Yılmaz</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>elif@kimoo.com</div>
          </div>
          <button onClick={() => go('settings')} style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <Icon name="filter" size={16} color="var(--text-secondary)" />
          </button>
        </div>
      </div>
      <div style={{ padding: '12px 16px 0' }}>
        {/* Kimoo+ card */}
        <div style={{ background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', color: '#fff', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-brand)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', right: -16, top: -16, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <Icon name="bolt" size={20} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>Kimoo+ üyesisin</div>
            <div style={{ fontSize: 12, opacity: 0.88 }}>Sınırsız ücretsiz teslimat</div>
          </div>
          <Icon name="chevR" size={18} color="rgba(255,255,255,0.7)" />
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[['bag', '23', 'Sipariş'], ['star', '4.8', 'Puan'], ['heart', '4', 'Favori']].map(([ic, val, label], i) => (
            <div key={i} style={{ flex: 1, padding: '12px 8px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <Icon name={ic} size={18} color="var(--brand-500)" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{val}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Menu list */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {items.map(([ic, label, nav], i) => (
            <div key={i} onClick={() => nav && go && go(nav)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none', cursor: nav ? 'pointer' : 'default' }}>
              <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <Icon name={ic} size={17} color="var(--brand-500)" />
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>
              {ic === 'msg' && <span style={{ width: 18, height: 18, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', fontSize: 10, fontWeight: 800, display: 'grid', placeItems: 'center' }}>2</span>}
              <Icon name="chevR" size={16} color="var(--text-muted)" />
            </div>
          ))}
        </div>

        {/* Logout */}
        <button style={{ width: '100%', padding: '14px 0', marginTop: 14, borderRadius: 'var(--radius-md)', border: '1px solid color-mix(in srgb, var(--error-500) 20%, transparent)', background: 'var(--error-50)', fontSize: 14, fontWeight: 700, color: 'var(--error-600)', cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Icon name="close" size={16} color="var(--error-500)" />Çıkış yap
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { SearchScreen, OrdersScreen, FavoritesScreen, ProfileScreen });
