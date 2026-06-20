// kimoo-detail-screens.jsx — Address, Wallet, Coupons, Notifications, Account Settings
const { Icon, Badge, PrimaryBtn, ScreenHeader, money, KIMOO_PUAN } = window;

// ============ ADDRESSES ============
function AddressScreen({ go }) {
  const [addresses, setAddresses] = React.useState([
    { id: 1, label: 'Ev', addr: 'Bahariye Cad. No:12 D:5, Kadıköy, İstanbul', default: true },
    { id: 2, label: 'İş', addr: 'Bağdat Cad. No:84 K:3, Kadıköy, İstanbul', default: false },
  ]);
  const [showAdd, setShowAdd] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState('');
  const [newAddr, setNewAddr] = React.useState('');

  const setDefault = (id) => setAddresses(a => a.map(x => ({ ...x, default: x.id === id })));

  if (showAdd) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ScreenHeader title="Yeni Adres" onBack={() => setShowAdd(false)} />
        <div style={{ flex: 1, padding: '12px 20px' }}>
          {/* Map placeholder */}
          <div style={{ height: 200, borderRadius: 'var(--radius-lg)', background: 'var(--bg-sunken)', backgroundImage: 'repeating-linear-gradient(0deg, var(--border-subtle) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, var(--border-subtle) 0 1px, transparent 1px 44px)', display: 'grid', placeItems: 'center', marginBottom: 20, position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <Icon name="pin" size={32} color="var(--brand-500)" style={{ display: 'block', margin: '0 auto 8px' }} />
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono, monospace)' }}>konumu sürükleyerek seç</span>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Adres Etiketi</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
              {['Ev', 'İş', 'Diğer'].map(l => (
                <button key={l} onClick={() => setNewLabel(l)} style={{ padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: '1.5px solid', borderColor: newLabel === l ? 'var(--brand-500)' : 'var(--border-default)', background: newLabel === l ? 'var(--brand-50)' : 'var(--bg-surface)', color: newLabel === l ? 'var(--brand-700)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Tam Adres</label>
            <textarea value={newAddr} onChange={e => setNewAddr(e.target.value)} placeholder="Sokak, bina no, daire..." rows={3} style={{ width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 12, fontSize: 15, fontFamily: 'var(--font-sans)', resize: 'none', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Tarif (isteğe bağlı)</label>
            <input placeholder="Bina girişi sola dönünce..." style={{ width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '12px 14px', fontSize: 15, fontFamily: 'var(--font-sans)', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ padding: '14px 20px 36px', borderTop: '1px solid var(--border-subtle)' }}>
          <PrimaryBtn onClick={() => { setAddresses(a => [...a, { id: Date.now(), label: newLabel || 'Diğer', addr: newAddr, default: false }]); setShowAdd(false); }} disabled={!newAddr.trim()}>Kaydet</PrimaryBtn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Adreslerim" onBack={() => go('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 24px' }}>
        {addresses.map((a, i) => (
          <div key={a.id} style={{ background: 'var(--bg-surface)', border: a.default ? '1.5px solid var(--brand-500)' : '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: a.default ? 'var(--brand-50)' : 'var(--bg-sunken)', display: 'grid', placeItems: 'center' }}>
                <Icon name="pin" size={18} color={a.default ? 'var(--brand-500)' : 'var(--text-tertiary)'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{a.label}</span>
                  {a.default && <Badge tone="brand" style={{ fontSize: 10, padding: '2px 8px' }}>Varsayılan</Badge>}
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <Icon name="close" size={16} color="var(--text-muted)" />
              </button>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{a.addr}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {!a.default && <button onClick={() => setDefault(a.id)} style={{ flex: 1, padding: '9px 0', borderRadius: 999, fontSize: 13, fontWeight: 600, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Varsayılan yap</button>}
              <button style={{ flex: 1, padding: '9px 0', borderRadius: 999, fontSize: 13, fontWeight: 600, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Düzenle</button>
            </div>
          </div>
        ))}
        <button onClick={() => setShowAdd(true)} style={{ width: '100%', padding: '16px 0', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--border-default)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: 'var(--brand-600)', cursor: 'pointer', fontFamily: 'var(--font-sans)', marginTop: 6 }}>
          <Icon name="plus" size={18} color="var(--brand-600)" /> Yeni adres ekle
        </button>
      </div>
    </div>
  );
}

// ============ KIMOO PUANI (v8 — kapalı döngü, "bakiye" değil) ============
function WalletScreen({ go }) {
  const P = KIMOO_PUAN;
  // Kimoo Puani hareketleri: kazanım (teslimat onayında), kullanım, iade. Hepsi Seçili Restoran.
  const TRANSACTIONS = [
    { label: 'Köşe Ocakbaşı siparişi', sub: 'Teslimat onaylandı · ₺480 sipariş', date: '10 Haz', amount: +25, type: 'earn' },
    { label: 'Köşe Ocakbaşı siparişi', sub: 'Kimoo Puanı kullanıldı', date: '9 Haz', amount: -60, type: 'use' },
    { label: 'Yeşil Kâse siparişi', sub: 'Teslimat onaylandı · ₺320 sipariş', date: '7 Haz', amount: +16, type: 'earn' },
    { label: 'Sushi Tokyo iadesi', sub: 'İptal — kullanılan puan iade edildi', date: '5 Haz', amount: +40, type: 'refund' },
    { label: 'Yeşil Kâse siparişi', sub: 'Teslimat onaylandı · ₺250 sipariş', date: '3 Haz', amount: +12, type: 'earn' },
  ];
  const iconFor = { earn: 'plus', refund: 'repeat', use: 'bag' };
  const monthlyLeft = Math.max(0, P.monthlyCap - P.monthlyUsed);
  const balancePct = Math.min(100, (P.balance / P.balanceCap) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Kimoo Puanı" onBack={() => go('profile')} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Puan card */}
        <div style={{ margin: '16px 16px 14px', background: 'var(--brand-500)', borderRadius: 'var(--radius-xl)', padding: '22px 20px', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-brand)' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, opacity: 0.9, marginBottom: 8 }}>
            <Icon name="star" size={15} color="#fff" strokeWidth={0} style={{ fill: '#fff' }} /> Kimoo Puanı
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em' }}>{P.balance} <span style={{ fontSize: 20, fontWeight: 700, opacity: 0.85 }}>TL</span></div>
          {/* cap progress */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.9, marginBottom: 5 }}>
              <span>Birikim tavanı</span><span>{P.balance} / {P.balanceCap} TL</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
              <div style={{ width: balancePct + '%', height: '100%', borderRadius: 999, background: '#fff' }}></div>
            </div>
          </div>
        </div>

        {/* Bu ay kullanım + devir */}
        <div style={{ display: 'flex', gap: 10, padding: '0 16px', marginBottom: 18 }}>
          <div style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 3 }}>Bu ay kullanılabilir</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{monthlyLeft} TL</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Aylık tavan {P.monthlyCap} TL</div>
          </div>
          <div style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 3 }}>Bu ay kullanılan</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{P.monthlyUsed} TL</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Devir maks {P.carryoverCap} TL</div>
          </div>
        </div>

        {/* Nasıl çalışır */}
        <div style={{ padding: '0 16px', marginBottom: 18 }}>
          <div style={{ background: 'var(--brand-50)', borderRadius: 'var(--radius-md)', padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--brand-700)', marginBottom: 12 }}>Kimoo Puanı nasıl çalışır?</div>
            {[
              ['plus', `Seçili Restoran siparişlerinde %5 puan kazan (maks ${P.earnCap} TL). ${P.minOrder} TL altı siparişte kazanım yok.`],
              ['bag', `Seçili Restoran'da sipariş tutarının %20'sine kadar (maks ${P.useCap} TL) puan kullan.`],
              ['wallet', `Yalnızca online ödemeli (kart) siparişlerde geçerli. Nakit ve yemek kartında kazanılmaz/kullanılmaz.`],
              ['close', `Hiçbir şekilde nakde çevrilemez. Ay sonunda en fazla ${P.carryoverCap} TL bir sonraki aya devreder.`],
            ].map(([ic, txt], i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < 3 ? 10 : 0 }}>
                <div style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', flex: 'none', marginTop: 1 }}>
                  <Icon name={ic} size={13} color="var(--brand-600)" />
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--brand-700)', lineHeight: 1.5 }}>{txt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hareketler */}
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Puan hareketleri</div>
          {TRANSACTIONS.map((t, i) => {
            const credit = t.amount > 0;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, flex: 'none', display: 'grid', placeItems: 'center', background: credit ? 'var(--success-50)' : 'var(--bg-sunken)' }}>
                  <Icon name={iconFor[t.type]} size={18} color={credit ? 'var(--success-500)' : 'var(--text-tertiary)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{t.sub} · {t.date}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: credit ? 'var(--success-600)' : 'var(--text-primary)' }}>
                  {credit ? '+' : '−'}{Math.abs(t.amount)} TL
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ COUPONS ============
function CouponsScreen({ go }) {
  const [input, setInput] = React.useState('');
  const [applied, setApplied] = React.useState(null);
  const [error, setError] = React.useState('');
  const VALID = { 'HOSGELDIN': { desc: 'İlk sipariş %30 indirim', discount: '30%' }, 'YAZ2024': { desc: 'Yaz kampanyası %20', discount: '20%' } };
  const MY_COUPONS = [
    { code: 'HOSGELDIN', desc: 'İlk sipariş %30 indirim', expiry: '30 Haz 2024', used: false },
    { code: 'KIMOOPLUS', desc: 'Kimoo+ üyelik hediyesi', expiry: '15 Tem 2024', used: false },
    { code: 'DAVET50', desc: 'Davet bonusu ₺50', expiry: '31 Tem 2024', used: true },
  ];

  const tryApply = () => {
    const k = input.trim().toUpperCase();
    if (VALID[k]) { setApplied({ code: k, ...VALID[k] }); setError(''); }
    else { setError('Kupon bulunamadı veya süresi dolmuş.'); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Kuponlarım" onBack={() => go('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 24px' }}>
        {/* Code input */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Kupon kodu gir</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => { setInput(e.target.value); setError(''); setApplied(null); }}
              placeholder="Örn: HOSGELDIN" style={{ flex: 1, border: applied ? '1.5px solid var(--success-500)' : error ? '1.5px solid var(--error-500)' : '1.5px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '11px 12px', fontSize: 15, fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, letterSpacing: '0.04em', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)', textTransform: 'uppercase' }} />
            <button onClick={tryApply} style={{ padding: '0 18px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', flexShrink: 0 }}>Uygula</button>
          </div>
          {applied && <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--success-50)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--success-600)', fontWeight: 600 }}>✓ {applied.desc} uygulandı!</div>}
          {error && <div style={{ marginTop: 8, fontSize: 13, color: 'var(--error-600)' }}>{error}</div>}
        </div>

        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Kuponlarım</div>
        {MY_COUPONS.map((c, i) => (
          <div key={i} style={{ border: c.used ? '1px solid var(--border-subtle)' : '1.5px dashed var(--brand-500)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 10, opacity: c.used ? 0.5 : 1, background: c.used ? 'var(--bg-sunken)' : 'var(--brand-50)', position: 'relative', overflow: 'hidden' }}>
            {!c.used && <div style={{ position: 'absolute', right: -12, top: -12, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,90,60,0.08)' }}></div>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 800, fontSize: 16, color: 'var(--brand-700)', letterSpacing: '0.04em' }}>{c.code}</span>
              {c.used ? <Badge tone="neutral" style={{ fontSize: 10 }}>Kullanıldı</Badge> : <Badge tone="success" style={{ fontSize: 10 }}>Aktif</Badge>}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.desc}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Son kullanım: {c.expiry}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ NOTIFICATIONS ============
function NotificationsScreen({ go }) {
  const [notifs, setNotifs] = React.useState([
    { id: 1, title: 'Siparişin yola çıktı!', body: 'Kurye Mehmet A. siparişini almak için Köşe Ocakbaşı\'na gidiyor.', time: '5 dk', icon: 'scooter', tone: 'brand', read: false },
    { id: 2, title: 'Yaz kampanyası başladı 🎉', body: 'Bu hafta tüm siparişlerde ücretsiz teslimat! Sadece Kimoo\'da.', time: '2 sa', icon: 'tag', tone: 'warning', read: false },
    { id: 3, title: 'Davet bonusu kazandın!', body: 'Zeynep A. senin davet kodunu kullandı. ₺50 cüzdanına eklendi.', time: '1 gün', icon: 'heart', tone: 'success', read: true },
    { id: 4, title: 'Siparişin teslim edildi', body: 'Napoli Pizzeria siparişin başarıyla teslim edildi. Afiyet olsun!', time: '2 gün', icon: 'check', tone: 'success', read: true },
    { id: 5, title: 'Kimoo+ üyeliğin yenilendi', body: '₺49.90 cüzdanından düşüldü. Sınırsız ücretsiz teslimat devam ediyor!', time: '5 gün', icon: 'star', tone: 'brand', read: true },
  ]);

  const markRead = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  const markAll = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })));
  const unread = notifs.filter(n => !n.read).length;

  const toneColors = { brand: ['var(--brand-50)', 'var(--brand-600)'], warning: ['var(--warning-50)', 'var(--warning-600)'], success: ['var(--success-50)', 'var(--success-600)'] };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Bildirimler" onBack={() => go('profile')}
        right={unread > 0 && <button onClick={markAll} style={{ background: 'none', border: 'none', color: 'var(--brand-600)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Tümünü oku</button>} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {notifs.map(n => {
          const [bg, fg] = toneColors[n.tone] || toneColors.brand;
          return (
            <div key={n.id} onClick={() => markRead(n.id)} style={{ display: 'flex', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', background: n.read ? 'transparent' : 'var(--brand-50)', cursor: 'pointer', transition: 'background .15s ease' }}>
              <div style={{ width: 44, height: 44, borderRadius: 999, background: bg, display: 'grid', placeItems: 'center', flex: 'none' }}>
                <Icon name={n.icon} size={22} color={fg} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: n.read ? 600 : 800, color: 'var(--text-primary)' }}>{n.title}</div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', flex: 'none' }}>{n.time}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.45, marginTop: 3 }}>{n.body}</div>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--brand-500)', flex: 'none', marginTop: 6 }}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ ACCOUNT SETTINGS ============
function AccountSettingsScreen({ go }) {
  const [name, setName] = React.useState('Elif Yılmaz');
  const [email, setEmail] = React.useState('elif@gmail.com');
  const [pushOn, setPushOn] = React.useState(true);
  const [smsOn, setSmsOn] = React.useState(false);
  const [emailOn, setEmailOn] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Hesap Ayarları" onBack={() => go('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 24px' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0 24px' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 32, fontWeight: 800, marginBottom: 10, boxShadow: 'var(--shadow-brand)' }}>E</div>
          <button style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-600)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Fotoğraf değiştir</button>
        </div>

        {/* Görünüm (v8: koyu mod) */}
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Görünüm</div>
        <div style={{ marginBottom: 20 }}>
          <window.ThemeRow subtitle="Açık veya koyu tema arasında geç" />
        </div>

        {/* Personal info */}
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Kişisel Bilgiler</div>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 20 }}>
          {[['Ad Soyad', name, setName, 'text'], ['E-posta', email, setEmail, 'email']].map(([label, val, setter, type], i) => (
            <div key={i} style={{ padding: '14px 16px', borderBottom: i === 0 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4 }}>{label}</div>
              <input type={type} value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: 15, fontWeight: 600, background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', padding: 0 }} />
            </div>
          ))}
          <div style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4 }}>Telefon</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)' }}>+90 555 123 4567</div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Bildirim Tercihleri</div>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 24 }}>
          {[[pushOn, setPushOn, 'Push Bildirimleri', 'Sipariş ve kampanya'],
            [smsOn, setSmsOn, 'SMS Bildirimleri', 'Doğrulama kodları'],
            [emailOn, setEmailOn, 'E-posta Bildirimleri', 'Fatura ve özetler']].map(([val, setter, label, desc], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{desc}</div>
              </div>
              <button onClick={() => setter(v => !v)} style={{ width: 46, height: 28, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative', background: val ? 'var(--brand-500)' : 'var(--border-default)', transition: 'background .2s ease' }}>
                <span style={{ position: 'absolute', top: 3, left: val ? 21 : 3, width: 22, height: 22, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease' }}></span>
              </button>
            </div>
          ))}
        </div>

        {/* Danger */}
        <div style={{ background: 'var(--error-50)', border: '1px solid color-mix(in srgb, var(--error-500) 20%, transparent)', borderRadius: 'var(--radius-md)', padding: 16, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <Icon name="close" size={20} color="var(--error-500)" />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--error-600)' }}>Hesabı sil</span>
        </div>
      </div>
      <div style={{ padding: '14px 16px 36px', borderTop: '1px solid var(--border-subtle)' }}>
        <PrimaryBtn onClick={save}>{saved ? '✓ Kaydedildi!' : 'Değişiklikleri kaydet'}</PrimaryBtn>
      </div>
    </div>
  );
}

Object.assign(window, { AddressScreen, WalletScreen, CouponsScreen, NotificationsScreen, AccountSettingsScreen });
