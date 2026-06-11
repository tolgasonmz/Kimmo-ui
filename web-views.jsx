// web-views.jsx — Home/Discovery, Restaurant Detail, Cart, Checkout, Tracking
const { Icon, Badge, money, WEB_CATEGORIES, WEB_CAMPAIGNS, WEB_RESTAURANTS, WEB_MENU } = window;

// ============ HEADER ============
function WebHeader({ cartCount, onCartClick, onLogoClick }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', padding: '0 clamp(16px, 4vw, 48px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
        {/* logo */}
        <div onClick={onLogoClick} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flex: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 17, boxShadow: 'var(--shadow-brand)' }}>k</div>
          <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>kimoo</span>
        </div>
        {/* address */}
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-sunken)', border: 'none', borderRadius: 999, padding: '8px 14px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          <Icon name="pin" size={16} color="var(--brand-500)" />
          <span className="hide-mobile">Kadıköy, Moda Cad.</span>
          <span className="show-mobile">Kadıköy</span>
          <Icon name="chevR" size={14} color="var(--text-muted)" style={{ transform: 'rotate(90deg)' }} />
        </button>
        {/* search */}
        <div className="web-search" style={{ flex: 1, maxWidth: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'var(--bg-sunken)', borderRadius: 999, border: '1.5px solid transparent', transition: 'all .15s ease' }}>
            <Icon name="search" size={18} color="var(--text-muted)" />
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Restoran veya yemek ara...</span>
          </div>
        </div>
        {/* right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none', marginLeft: 'auto' }}>
          <button className="hide-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
            <Icon name="bag" size={18} color="var(--text-secondary)" />Siparişlerim
          </button>
          <button onClick={onCartClick} style={{ position: 'relative', width: 44, height: 44, borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <Icon name="bag" size={20} color="var(--text-primary)" />
            {cartCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', fontSize: 11, fontWeight: 800, display: 'grid', placeItems: 'center' }}>{cartCount}</span>}
          </button>
          <button className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Giriş yap</button>
        </div>
      </div>
    </header>
  );
}

// ============ HOME / DISCOVERY ============
function WebHome({ onRestaurant }) {
  const [activeCat, setActiveCat] = React.useState('all');

  return (
    <div>
      {/* Campaigns carousel */}
      <div style={{ padding: '24px 0 8px' }}>
        <div className="web-scroll" style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          {WEB_CAMPAIGNS.map((c, i) => (
            <div key={i} style={{ flex: 'none', width: 'clamp(280px, 30vw, 380px)', background: c.bg, borderRadius: 'var(--radius-xl)', padding: '28px 24px', color: c.color, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 8, position: 'relative' }}>{c.title}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.2)', fontSize: 13, fontWeight: 700, position: 'relative' }}>{c.code}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '20px clamp(16px, 4vw, 48px) 0' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {WEB_CATEGORIES.map(cat => {
            const on = activeCat === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 999, flex: 'none',
                background: on ? 'var(--brand-500)' : 'var(--bg-surface)', color: on ? '#fff' : 'var(--text-secondary)',
                border: on ? 'none' : '1.5px solid var(--border-default)', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all .12s ease',
              }}><span>{cat.emoji}</span>{cat.name}</button>
            );
          })}
        </div>
      </div>

      {/* Popular section */}
      <div style={{ padding: '28px clamp(16px, 4vw, 48px) 0' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 16 }}>Popüler restoranlar 🔥</div>
        <div className="web-scroll" style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {WEB_RESTAURANTS.filter(r => r.popular).map(r => (
            <div key={r.id} onClick={() => onRestaurant(r)} style={{ flex: 'none', width: 'clamp(200px, 20vw, 260px)', cursor: 'pointer' }}>
              <div style={{ height: 140, borderRadius: 'var(--radius-lg)', background: 'var(--bg-sunken)', backgroundImage: 'repeating-linear-gradient(135deg, var(--neutral-100) 0 12px, var(--neutral-50) 12px 24px)', display: 'grid', placeItems: 'center', fontSize: 48, position: 'relative', overflow: 'hidden' }}>
                {r.emoji || r.img}
                {r.promo && <span style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', fontSize: 11, fontWeight: 700 }}>{r.promo}</span>}
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>★ {r.rating} · {r.eta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All restaurants grid */}
      <div style={{ padding: '32px clamp(16px, 4vw, 48px) 48px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 16 }}>Yakınındaki restoranlar</div>
        <div className="resto-grid">
          {WEB_RESTAURANTS.map(r => (
            <div key={r.id} onClick={() => onRestaurant(r)} className="resto-card" style={{ cursor: 'pointer', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all .2s ease' }}>
              <div style={{ height: 160, background: 'var(--bg-sunken)', backgroundImage: 'repeating-linear-gradient(135deg, var(--neutral-100) 0 12px, var(--neutral-50) 12px 24px)', display: 'grid', placeItems: 'center', fontSize: 56, position: 'relative' }}>
                {r.img}
                {r.promo && <span style={{ position: 'absolute', top: 12, left: 12, padding: '5px 12px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', fontSize: 12, fontWeight: 700 }}>{r.promo}</span>}
                {r.fee === 0 && <span style={{ position: 'absolute', top: 12, right: 12, padding: '5px 10px', borderRadius: 999, background: 'var(--success-500)', color: '#fff', fontSize: 11, fontWeight: 700 }}>Ücretsiz teslimat</span>}
              </div>
              <div style={{ padding: '14px 16px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-sunken)', padding: '3px 9px', borderRadius: 999 }}>★ {r.rating}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>{r.category}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <span>🕐 {r.eta}</span>
                  <span>{r.fee === 0 ? '✓ Ücretsiz' : '₺' + r.fee + ' teslimat'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ RESTAURANT DETAIL ============
function WebRestaurantDetail({ restaurant, onBack, onAddToCart }) {
  const [activeCat, setActiveCat] = React.useState('Popüler');
  const r = restaurant;
  const items = activeCat === 'Popüler' ? WEB_MENU.items.filter(i => i.popular) : WEB_MENU.items.filter(i => i.cat === activeCat);

  return (
    <div>
      {/* Hero */}
      <div style={{ height: 220, background: 'var(--bg-sunken)', backgroundImage: 'repeating-linear-gradient(135deg, var(--neutral-100) 0 14px, var(--neutral-50) 14px 28px)', display: 'grid', placeItems: 'center', fontSize: 72, position: 'relative' }}>
        {r.img}
        <button onClick={onBack} style={{ position: 'absolute', top: 16, left: 'clamp(16px, 4vw, 48px)', width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.9)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <Icon name="back" size={20} color="var(--text-primary)" />
        </button>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        {/* Info */}
        <div style={{ padding: '24px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{r.name}</div>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 4 }}>{r.category}</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[['★ ' + r.rating, r.reviews + ' yorum'], ['🕐 ' + r.eta, 'teslimat'], [r.fee === 0 ? '✓ Ücretsiz' : '₺' + r.fee, 'teslimat ücreti']].map(([v, l], i) => (
                <div key={i} style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '10px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '16px 0', overflowX: 'auto', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 64, background: 'var(--bg-app)', zIndex: 10 }}>
          {WEB_MENU.categories.map(cat => {
            const on = activeCat === cat;
            return (
              <button key={cat} onClick={() => setActiveCat(cat)} style={{
                padding: '8px 18px', borderRadius: 999, flex: 'none', fontSize: 14, fontWeight: 700,
                background: on ? 'var(--brand-500)' : 'transparent', color: on ? '#fff' : 'var(--text-secondary)',
                border: on ? 'none' : '1.5px solid var(--border-default)', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              }}>{cat}</button>
            );
          })}
        </div>

        {/* Menu items */}
        <div className="menu-grid" style={{ padding: '20px 0 48px' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4, lineHeight: 1.45 }}>{item.desc}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand-600)', marginTop: 8 }}>{money(item.price)}</div>
              </div>
              <div style={{ position: 'relative', width: 110, height: 90, borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', backgroundImage: 'repeating-linear-gradient(135deg, var(--neutral-100) 0 10px, var(--neutral-50) 10px 20px)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <span style={{ fontSize: 32 }}>🍽️</span>
                <button onClick={() => onAddToCart(item)} style={{ position: 'absolute', bottom: -10, right: -6, width: 32, height: 32, borderRadius: 999, background: 'var(--brand-500)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-brand)' }}>
                  <Icon name="plus" size={18} color="#fff" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ CART SIDEBAR ============
function WebCartSidebar({ cart, onClose, onCheckout, updateQty }) {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const fee = total >= 200 ? 0 : 25;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 90 }}></div>
      <div style={{ position: 'fixed', top: 0, right: 0, width: 'clamp(320px, 30vw, 420px)', height: '100%', background: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)', zIndex: 100, display: 'flex', flexDirection: 'column', animation: 'cartIn .25s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Sepetim ({cart.length})</div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 999, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <Icon name="close" size={18} color="var(--text-secondary)" />
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px 20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Sepetiniz boş</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>Lezzetli yemekler sizi bekliyor!</div>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--brand-600)', marginTop: 4 }}>{money(item.price * item.qty)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-sunken)', borderRadius: 999, padding: '4px 6px' }}>
                  <button onClick={() => updateQty(i, -1)} style={{ width: 28, height: 28, borderRadius: 999, border: 'none', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-xs)' }}>
                    <Icon name={item.qty <= 1 ? 'close' : 'minus'} size={14} color={item.qty <= 1 ? 'var(--error-500)' : 'var(--text-primary)'} />
                  </button>
                  <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(i, 1)} style={{ width: 28, height: 28, borderRadius: 999, border: 'none', background: 'var(--brand-500)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                    <Icon name="plus" size={14} color="#fff" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '16px 20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>
              <span>Ara toplam</span><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{money(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>
              <span>Teslimat</span><span style={{ fontWeight: 600, color: fee === 0 ? 'var(--success-600)' : 'var(--text-primary)' }}>{fee === 0 ? 'Ücretsiz' : money(fee)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', padding: '12px 0', borderTop: '1px solid var(--border-subtle)' }}>
              <span>Toplam</span><span>{money(total + fee)}</span>
            </div>
            <button onClick={onCheckout} style={{ width: '100%', padding: '15px 0', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)', marginTop: 8 }}>
              Siparişi tamamla · {money(total + fee)}
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes cartIn{from{transform:translateX(100%)}to{transform:none}}`}</style>
    </>
  );
}

// ============ ORDER TRACKING ============
function WebTracking({ onBack }) {
  const [step, setStep] = React.useState(1);
  React.useEffect(() => {
    const timers = [setTimeout(() => setStep(2), 3000), setTimeout(() => setStep(3), 7000)];
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    { label: 'Sipariş onaylandı', desc: 'Restoran siparişinizi aldı', icon: 'check' },
    { label: 'Hazırlanıyor', desc: 'Yemekleriniz hazırlanıyor', icon: 'flame' },
    { label: 'Yola çıktı', desc: 'Kurye siparişinizi alıp yola çıktı', icon: 'scooter' },
    { label: 'Teslim edildi', desc: 'Afiyet olsun!', icon: 'check' },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px clamp(16px, 4vw, 48px) 48px' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginBottom: 20 }}>
        <Icon name="back" size={18} color="var(--text-tertiary)" />Anasayfaya dön
      </button>

      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 6 }}>Sipariş takibi</div>
      <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 28 }}>Sipariş #KM-4835 · Köşe Ocakbaşı</div>

      {/* Map placeholder */}
      <div style={{ height: 260, borderRadius: 'var(--radius-xl)', background: 'var(--bg-sunken)', backgroundImage: 'repeating-linear-gradient(0deg, var(--border-subtle) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, var(--border-subtle) 0 1px, transparent 1px 44px)', marginBottom: 28, display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 14, color: 'var(--text-muted)' }}>harita alanı</span>
        {step >= 2 && <div style={{ position: 'absolute', left: '30%', top: '50%', width: 36, height: 36, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-md)', transition: 'left 3s ease', ...(step >= 3 ? { left: '65%' } : {}) }}>
          <Icon name="scooter" size={18} color="#fff" />
        </div>}
      </div>

      {/* Steps */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 28 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>Sipariş durumu</div>
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < steps.length - 1 ? 24 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 999, display: 'grid', placeItems: 'center', flex: 'none',
                  background: done ? 'var(--brand-500)' : active ? 'var(--brand-50)' : 'var(--bg-sunken)',
                  border: active ? '2px solid var(--brand-500)' : 'none',
                }}>
                  <Icon name={s.icon} size={18} color={done ? '#fff' : active ? 'var(--brand-600)' : 'var(--text-muted)'} />
                </div>
                {i < steps.length - 1 && <div style={{ width: 2, height: 24, background: done ? 'var(--brand-500)' : 'var(--border-subtle)', marginTop: 4 }}></div>}
              </div>
              <div style={{ paddingTop: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: done || active ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.desc}</div>
                {active && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '5px 12px', borderRadius: 999, background: 'var(--brand-50)', fontSize: 12, fontWeight: 700, color: 'var(--brand-700)' }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--brand-500)', animation: 'kpulse 1.2s infinite' }}></span>Şu an burada
                </span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ FOOTER ============
function WebFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '40px clamp(16px, 4vw, 48px)', background: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14 }}>k</div>
            <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>kimoo</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>Tek platform, sınırsız lezzet. Türkiye'nin yeni nesil yemek sipariş ekosistemi.</div>
        </div>
        {[
          ['Keşfet', ['Restoranlar', 'Kategoriler', 'Kampanyalar', 'Kimoo+']],
          ['Destek', ['Yardım merkezi', 'Canlı destek', 'Sıkça sorulanlar', 'İletişim']],
          ['Kimoo', ['Hakkımızda', 'Kariyer', 'Blog', 'İş ortaklığı']],
        ].map(([title, links], i) => (
          <div key={i}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>{title}</div>
            {links.map(l => <div key={l} style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '4px 0', cursor: 'pointer' }}>{l}</div>)}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1320, margin: '24px auto 0', paddingTop: 20, borderTop: '1px solid var(--border-subtle)', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>© 2024 Kimoo. Tüm hakları saklıdır.</div>
    </footer>
  );
}

Object.assign(window, { WebHeader, WebHome, WebRestaurantDetail, WebCartSidebar, WebTracking, WebFooter });
