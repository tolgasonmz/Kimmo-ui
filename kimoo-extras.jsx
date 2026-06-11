// kimoo-extras.jsx — Reviews, Live Chat, Referral screens
const { Icon, PrimaryBtn, Badge, MediaBox, ScreenHeader, money } = window;

// ============ REVIEW ORDER ============
function ReviewScreen({ go }) {
  const [stars, setStars] = React.useState(0);
  const [foodStars, setFoodStars] = React.useState(0);
  const [deliveryStars, setDeliveryStars] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);

  const TAGS = ['Lezzetli', 'Hızlı teslimat', 'Paketleme güzel', 'Sıcak geldi', 'Porsiyon bol', 'Kurye nazik'];
  const toggleTag = (t) => setTags(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);

  if (submitted) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
            <Icon name="check" size={40} color="var(--success-500)" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Teşekkürler!</div>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '28ch' }}>Değerlendirmen hem restorana hem de diğer kullanıcılara çok yardımcı olacak.</div>
        </div>
        <div style={{ padding: '16px 24px 40px' }}>
          <PrimaryBtn onClick={() => go('home')}>Anasayfaya dön</PrimaryBtn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Değerlendir" onBack={() => go('orders')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 20px 20px' }}>
        {/* Order info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <MediaBox h={56} radius="var(--radius-sm)" style={{ width: 56, flex: 'none' }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Köşe Ocakbaşı</div>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>#KM-4821 · 2 ürün · ₺290</div>
          </div>
        </div>

        {/* Overall rating */}
        <div style={{ textAlign: 'center', padding: '28px 0 8px' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Genel deneyimin nasıldı?</div>
          <StarRow count={stars} setCount={setStars} size={42} />
        </div>

        {/* Sub-ratings */}
        <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
          <div style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Yemek kalitesi</div>
            <StarRow count={foodStars} setCount={setFoodStars} size={26} />
          </div>
          <div style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Teslimat</div>
            <StarRow count={deliveryStars} setCount={setDeliveryStars} size={26} />
          </div>
        </div>

        {/* Quick tags */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Ne beğendin?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TAGS.map(tag => {
              const on = tags.includes(tag);
              return (
                <button key={tag} onClick={() => toggleTag(tag)} style={{
                  padding: '9px 14px', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  background: on ? 'var(--brand-500)' : 'var(--bg-surface)',
                  color: on ? '#fff' : 'var(--text-secondary)',
                  border: on ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)',
                  fontFamily: 'var(--font-sans)', transition: 'all .12s ease',
                }}>{tag}</button>
              );
            })}
          </div>
        </div>

        {/* Comment */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Yorum ekle (isteğe bağlı)</div>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Deneyimini paylaş..." rows={3} style={{
            width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-md)',
            padding: 14, fontSize: 15, fontFamily: 'var(--font-sans)', resize: 'none', outline: 'none',
            background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box',
          }} />
        </div>
      </div>

      <div style={{ padding: '14px 20px 36px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
        <PrimaryBtn onClick={() => setSubmitted(true)} disabled={stars === 0}>Gönder</PrimaryBtn>
      </div>
    </div>
  );
}

function StarRow({ count, setCount, size = 32 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: size > 30 ? 8 : 4 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => setCount(n)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
          <svg width={size} height={size} viewBox="0 0 24 24" fill={n <= count ? 'var(--warning-500)' : 'none'}
            stroke={n <= count ? 'var(--warning-500)' : 'var(--border-strong)'}
            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

// ============ RESTAURANT REVIEWS ============
function RestaurantReviewsScreen({ go, restaurant }) {
  const REVIEWS = [
    { name: 'Ayşe K.', date: '2 gün önce', stars: 5, text: 'Her şey mükemmeldi. Adana dürüm efsane, paketleme de çok güzeldi. Kesinlikle tekrar sipariş vereceğim.', tags: ['Lezzetli', 'Paketleme güzel'] },
    { name: 'Mehmet T.', date: '5 gün önce', stars: 4, text: 'Kebaplar çok iyi ama teslimat biraz geç geldi. Yemek kalitesi mükemmel.', tags: ['Lezzetli', 'Porsiyon bol'] },
    { name: 'Zeynep A.', date: '1 hafta önce', stars: 5, text: 'İçli köfte harika! Sıcak servis geldi, künefe de çok güzeldi.', tags: ['Sıcak geldi', 'Hızlı teslimat'] },
    { name: 'Can B.', date: '2 hafta önce', stars: 3, text: 'Yemekler fena değil ama beklentimin biraz altındaydı.', tags: [] },
  ];
  const avg = (REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Yorumlar" onBack={() => go('restaurant')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 24px' }}>
        {/* summary */}
        <div style={{ display: 'flex', gap: 20, padding: '20px 0', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{avg}</div>
            <StarRow count={Math.round(avg)} setCount={() => {}} size={18} />
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>{REVIEWS.length} yorum</div>
          </div>
          <div style={{ flex: 1 }}>
            {[5,4,3,2,1].map(n => {
              const cnt = REVIEWS.filter(r => r.stars === n).length;
              const pct = (cnt / REVIEWS.length) * 100;
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)', width: 12, textAlign: 'right' }}>{n}</span>
                  <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden' }}>
                    <div style={{ width: pct + '%', height: '100%', borderRadius: 999, background: 'var(--warning-500)', transition: 'width .3s ease' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border-subtle)', margin: '0 0 8px' }}></div>

        {REVIEWS.map((r, i) => (
          <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14, color: 'var(--text-secondary)' }}>{r.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{r.date}</div>
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(n => (
                  <svg key={n} width={14} height={14} viewBox="0 0 24 24" fill={n <= r.stars ? 'var(--warning-500)' : 'var(--border-default)'} stroke="none"><path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" /></svg>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{r.text}</div>
            {r.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {r.tags.map(t => <Badge key={t} tone="brand" style={{ fontSize: 11, padding: '3px 9px' }}>{t}</Badge>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ REPORT SCREEN ============
function ReportScreen({ go }) {
  const [type, setType] = React.useState(null); // 'courier' | 'restaurant'
  const [reason, setReason] = React.useState(null);
  const [detail, setDetail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const REPORT_TYPES = [
    { id: 'courier', icon: 'scooter', label: 'Kurye hakkında', desc: 'Teslimat sorunu, davranış, hasar' },
    { id: 'restaurant', icon: 'flame', label: 'Restoran hakkında', desc: 'Yemek kalitesi, eksik ürün, hijyen' },
    { id: 'order', icon: 'bag', label: 'Sipariş sorunu', desc: 'Yanlış ürün, gecikme, iptal' },
  ];

  const COURIER_REASONS = ['Kaba davranış', 'Geç teslimat', 'Paket hasarlı geldi', 'Yanlış adrese bıraktı', 'Güvenlik endişesi', 'Diğer'];
  const RESTAURANT_REASONS = ['Eksik ürün', 'Yanlış sipariş', 'Yemek kalitesi düşük', 'Hijyen sorunu', 'Paketleme kötü', 'Diğer'];
  const ORDER_REASONS = ['Sipariş gelmedi', 'Çok geç geldi', 'İade istiyorum', 'Ödeme sorunu', 'Diğer'];

  const reasons = type === 'courier' ? COURIER_REASONS : type === 'restaurant' ? RESTAURANT_REASONS : type === 'order' ? ORDER_REASONS : [];

  if (submitted) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
            <Icon name="check" size={40} color="var(--success-500)" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Bildirim gönderildi</div>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '28ch' }}>Raporun yönetici ekibimize iletildi. En kısa sürede incelenecektir.</div>
          <div style={{ marginTop: 16, padding: '8px 16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', fontSize: 13, color: 'var(--text-tertiary)' }}>Takip numarası: #RPT-{Math.floor(1000 + Math.random() * 9000)}</div>
        </div>
        <div style={{ padding: '16px 24px 40px' }}>
          <PrimaryBtn onClick={() => go('home')}>Anasayfaya dön</PrimaryBtn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Sorun Bildir" onBack={() => type && !reason ? setType(null) : reason ? setReason(null) : go('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 20px 20px' }}>

        {/* Step 1: Select type */}
        {!type && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, marginTop: 8 }}>Ne hakkında bildirim yapmak istiyorsun?</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>Bildirimin doğrudan yönetici ekibimize iletilecek ve en kısa sürede değerlendirilecektir.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {REPORT_TYPES.map(t => (
                <button key={t.id} onClick={() => setType(t.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: 18, borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', textAlign: 'left', transition: 'all .12s ease',
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <Icon name={t.icon} size={24} color="var(--brand-600)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{t.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{t.desc}</div>
                  </div>
                  <Icon name="chevR" size={18} color="var(--text-tertiary)" />
                </button>
              ))}
            </div>

            {/* Recent orders for context */}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10 }}>Son siparişlerinle ilgili mi?</div>
              {[
                { id: '#KM-4821', restaurant: 'Köşe Ocakbaşı', date: 'Bugün, 19:30', items: '2 ürün' },
                { id: '#KM-4818', restaurant: 'Napoli Pizzeria', date: 'Dün, 13:15', items: '1 ürün' },
              ].map((o, i) => (
                <div key={i} onClick={() => setType('order')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center' }}>
                    <Icon name="bag" size={18} color="var(--text-muted)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{o.restaurant}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{o.id} · {o.date} · {o.items}</div>
                  </div>
                  <Icon name="chevR" size={16} color="var(--text-tertiary)" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Select reason */}
        {type && !reason && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, marginTop: 8 }}>Sorun ne ile ilgili?</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>En uygun nedeni seç, detayları bir sonraki adımda ekleyebilirsin.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {reasons.map((r, i) => (
                <button key={i} onClick={() => setReason(r)} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)',
                  textAlign: 'left', transition: 'all .12s ease',
                }}>
                  <span style={{ flex: 1 }}>{r}</span>
                  <Icon name="chevR" size={16} color="var(--text-tertiary)" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 3: Detail + submit */}
        {type && reason && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, marginTop: 8 }}>Detayları ekle</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <Badge tone="brand" style={{ fontSize: 12 }}>{REPORT_TYPES.find(t => t.id === type)?.label}</Badge>
              <Badge tone="warning" style={{ fontSize: 12 }}>{reason}</Badge>
            </div>

            <textarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="Yaşadığın sorunu detaylı olarak açıkla... (isteğe bağlı)" rows={5} style={{
              width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-md)',
              padding: 14, fontSize: 15, fontFamily: 'var(--font-sans)', resize: 'none', outline: 'none',
              background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box',
            }} />

            {/* Photo upload placeholder */}
            <div style={{ marginTop: 16, border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: 20, textAlign: 'center', cursor: 'pointer' }}>
              <Icon name="plus" size={24} color="var(--text-muted)" style={{ margin: '0 auto 8px', display: 'block' }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Fotoğraf ekle</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Kanıt olarak ekran görüntüsü veya fotoğraf</div>
            </div>

            <div style={{ marginTop: 20, padding: 14, background: 'var(--info-50)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Icon name="msg" size={18} color="var(--info-600)" style={{ flex: 'none', marginTop: 2 }} />
              <div style={{ fontSize: 13, color: 'var(--info-600)', lineHeight: 1.5 }}>Raporun yönetici ekibine iletilecek ve <strong>24 saat içinde</strong> değerlendirilecektir. Sonucu bildirimler üzerinden takip edebilirsin.</div>
            </div>
          </>
        )}
      </div>

      {/* Submit button */}
      {type && reason && (
        <div style={{ padding: '14px 20px 36px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
          <PrimaryBtn onClick={() => setSubmitted(true)}>Rapor gönder</PrimaryBtn>
        </div>
      )}
    </div>
  );
}

// ============ REFERRAL ============
function ReferralScreen({ go }) {
  const [copied, setCopied] = React.useState(false);
  const CODE = 'ELIF2024';

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const FRIENDS = [
    { name: 'Zeynep A.', status: 'Kayıt oldu', bonus: 50, done: true },
    { name: 'Can B.', status: 'İlk sipariş verdi', bonus: 50, done: true },
    { name: 'Merve K.', status: 'Davet gönderildi', bonus: 0, done: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Arkadaşını Davet Et" onBack={() => go('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 24px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '24px 0 20px' }}>
          <div style={{ width: 88, height: 88, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}>
            <span style={{ fontSize: 40 }}>🎁</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 8 }}>Hem sen hem arkadaşın kazan</div>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '32ch', margin: '0 auto' }}>
            Arkadaşın ilk siparişini verdiğinde ikiniz de <strong style={{ color: 'var(--brand-600)' }}>₺50 cüzdan bakiyesi</strong> kazanırsınız.
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {[['2', 'Davet edilen'], ['2', 'Sipariş veren'], ['₺100', 'Kazanılan']].map(([v, l], i) => (
            <div key={i} style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Code */}
        <div style={{ background: 'var(--brand-50)', border: '1.5px dashed var(--brand-500)', borderRadius: 'var(--radius-md)', padding: 18, textAlign: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 6 }}>DAVET KODUN</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--brand-600)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono, monospace)' }}>{CODE}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <PrimaryBtn onClick={copy} full={true}>
            {copied ? <><Icon name="check" size={18} color="#fff" /> Kopyalandı!</> : 'Kodu kopyala'}
          </PrimaryBtn>
          <button style={{ flex: 'none', width: 52, height: 52, borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth={2} strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
          </button>
        </div>

        {/* How it works */}
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>Nasıl çalışır?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            ['1', 'Kodunu paylaş', 'Arkadaşınla davet kodunu paylaş'],
            ['2', 'Arkadaşın kayıt olsun', 'Kodu kullanarak Kimoo\'ya üye olsun'],
            ['3', 'İlk sipariş', 'İlk siparişini verdikten sonra ikiniz de ₺50 kazanın'],
          ].map(([n, t, d]) => (
            <div key={n} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 15, color: 'var(--brand-600)', flex: 'none' }}>{n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{t}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Friends */}
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Davet ettiklerin</div>
        {FRIENDS.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: f.done ? 'var(--success-50)' : 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 15, color: f.done ? 'var(--success-600)' : 'var(--text-secondary)' }}>{f.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{f.name}</div>
              <div style={{ fontSize: 13, color: f.done ? 'var(--success-600)' : 'var(--text-tertiary)' }}>{f.status}</div>
            </div>
            {f.done && <Badge tone="success" style={{ fontSize: 12 }}>+{money(f.bonus)}</Badge>}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ReviewScreen, RestaurantReviewsScreen, ReportScreen, ReferralScreen, StarRow });
