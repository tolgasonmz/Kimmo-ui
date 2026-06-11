// kimoo-tabs.jsx — lightweight tab screens (search, orders, favorites, profile)
const { Icon, MediaBox, Badge, PrimaryBtn, ScreenHeader, money, RESTAURANTS, CATEGORIES } = window;

function SearchScreen({ openRestaurant }) {
  const [q, setQ] = React.useState('');
  const results = q ? RESTAURANTS.filter(r => (r.name + r.cuisine).toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <div style={{ paddingTop: 60, padding: '60px 16px 12px 16px', background: 'var(--bg-surface)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 14, color: 'var(--text-primary)' }}>Ara</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', background: 'var(--bg-sunken)', borderRadius: 999 }}>
          <Icon name="search" size={20} color="var(--text-tertiary)" />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Restoran veya yemek ara" style={{ border: 'none', background: 'none', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 15, width: '100%', color: 'var(--text-primary)' }} />
        </div>
      </div>
      {!q && (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: 'var(--text-primary)' }}>Mutfaklar</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {CATEGORIES.slice(1).map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: 24 }}>{c.icon}</span><span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {q && (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 12 }}>{results.length} sonuç</div>
          {results.map(r => (
            <div key={r.id} onClick={() => r.open && openRestaurant(r)} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
              <MediaBox h={64} radius="var(--radius-md)" style={{ width: 64, flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{r.cuisine} · ★ {r.rating}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{r.eta}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrdersScreen({ go, hasActive, openTracking, openReview }) {
  const past = [
    { id: 'KM-4820', name: 'Napoli Pizzeria', items: '2 ürün', total: 285, date: 'Dün, 19:30', status: 'Teslim edildi' },
    { id: 'KM-4795', name: 'Yeşil Kâse', items: '1 ürün', total: 120, date: '8 Haz, 13:10', status: 'Teslim edildi' },
    { id: 'KM-4760', name: 'Burger Atölyesi', items: '3 ürün', total: 410, date: '5 Haz, 21:05', status: 'Teslim edildi' },
  ];
  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <div style={{ paddingTop: 60, padding: '60px 16px 8px 16px', background: 'var(--bg-surface)' }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Siparişlerim</div>
      </div>
      <div style={{ padding: 16 }}>
        {hasActive && (
          <div onClick={openTracking} style={{ background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: 16, color: '#fff', marginBottom: 18, cursor: 'pointer', boxShadow: 'var(--shadow-brand)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><Icon name="scooter" size={20} color="#fff" /><span style={{ fontWeight: 800 }}>Aktif sipariş</span></div>
            <div style={{ fontSize: 14, opacity: 0.95 }}>Köşe Ocakbaşı · yolda · tahmini 20:45</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 14, fontWeight: 700 }}>Canlı takip et <Icon name="chevR" size={16} color="#fff" /></div>
          </div>
        )}
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 10 }}>Geçmiş</div>
        {past.map(o => (
          <div key={o.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{o.name}</span>
              <Badge tone="success">{o.status}</Badge>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>{o.date} · {o.items}</div>
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{money(o.total)}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openReview && openReview()} style={{ background: 'var(--bg-sunken)', color: 'var(--text-secondary)', border: 'none', borderRadius: 999, padding: '9px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Değerlendir</button>
                <button style={{ background: 'var(--brand-50)', color: 'var(--brand-700)', border: 'none', borderRadius: 999, padding: '9px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Tekrar sipariş</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FavoritesScreen({ openRestaurant }) {
  const favs = RESTAURANTS.slice(0, 3);
  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <div style={{ paddingTop: 60, padding: '60px 16px 8px 16px', background: 'var(--bg-surface)' }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Favoriler</div>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {favs.map(r => (
          <div key={r.id} onClick={() => openRestaurant(r)} style={{ display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'center' }}>
            <MediaBox h={76} radius="var(--radius-md)" style={{ width: 76, flex: 'none' }}>
              <div style={{ position: 'absolute', top: 6, right: 6, width: 26, height: 26, borderRadius: 999, background: 'var(--bg-surface)', display: 'grid', placeItems: 'center' }}><Icon name="heart" size={14} color="var(--brand-500)" strokeWidth={0} style={{ fill: 'var(--brand-500)' }} /></div>
            </MediaBox>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{r.cuisine} · ★ {r.rating}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{r.eta} · {r.fee === 0 ? 'Ücretsiz teslimat' : money(r.fee)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ go }) {
  const items = [
    ['user', 'Hesap bilgilerim', 'settings'], ['pin', 'Adreslerim', 'addresses'], ['wallet', 'Kimoo Cüzdan · ₺250', 'wallet'], ['ticket', 'Kuponlarım', 'coupons'], ['bag', 'Sipariş geçmişi', null], ['close', 'Sorun bildir', 'report'], ['heart', 'Arkadaşını davet et', 'referral'],
  ];
  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <div style={{ paddingTop: 60, padding: '60px 16px 20px 16px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--brand-500)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 26, fontWeight: 800, boxShadow: 'var(--shadow-brand)' }}>E</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>Elif Yılmaz</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>elif@kimoo.com</div>
          </div>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: 18, color: '#fff', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--shadow-brand)' }}>
          <Icon name="scooter" size={28} color="#fff" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Kimoo+ üyesisin</div>
            <div style={{ fontSize: 13, opacity: 0.92 }}>Sınırsız ücretsiz teslimat aktif</div>
          </div>
          <Icon name="chevR" size={20} color="#fff" />
        </div>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {items.map(([ic, label, nav], i) => (
            <div key={i} onClick={() => nav && go && go(nav)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 16px', borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none', cursor: 'pointer' }}>
              <Icon name={ic} size={20} color="var(--brand-500)" />
              <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>
              <Icon name="chevR" size={18} color="var(--text-tertiary)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SearchScreen, OrdersScreen, FavoritesScreen, ProfileScreen });
