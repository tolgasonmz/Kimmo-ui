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

// ============ LIVE CHAT ============
function ChatScreen({ go }) {
  const [msgs, setMsgs] = React.useState([
    { from: 'bot', text: 'Merhaba! Kimoo destek ekibine hoş geldiniz. Size nasıl yardımcı olabilirim?', time: '20:30' },
  ]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const bottomRef = React.useRef(null);

  const BOT_REPLIES = [
    'Anladım, hemen kontrol ediyorum.',
    'Siparişinizle ilgili bilgi güncellendi. Başka bir konuda yardımcı olabilir miyim?',
    'Tabii ki! Restoran ile iletişime geçtim, en kısa sürede dönüş yapılacaktır.',
    'İade talebiniz oluşturuldu. 24 saat içinde cüzdanınıza yansıyacaktır.',
  ];
  const [replyIdx, setReplyIdx] = React.useState(0);

  React.useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date(); const t = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
    setMsgs(m => [...m, { from: 'user', text: input, time: t }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { from: 'bot', text: BOT_REPLIES[replyIdx % BOT_REPLIES.length], time: t }]);
      setReplyIdx(i => i + 1);
    }, 1400);
  };

  const QUICK = ['Siparişim nerede?', 'İade istiyorum', 'Kurye ile iletişim'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-app)' }}>
      <ScreenHeader title="Canlı Destek" onBack={() => go('profile')}
        right={<Badge tone="success" style={{ fontSize: 11 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--success-500)' }}></span>Çevrimiçi</Badge>} />

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
            {m.from === 'bot' && (
              <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', marginRight: 8, flex: 'none', alignSelf: 'flex-end' }}>
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>k</span>
              </div>
            )}
            <div style={{
              maxWidth: '75%', padding: '12px 16px', borderRadius: 18,
              background: m.from === 'user' ? 'var(--brand-500)' : 'var(--bg-surface)',
              color: m.from === 'user' ? '#fff' : 'var(--text-primary)',
              border: m.from === 'bot' ? '1px solid var(--border-subtle)' : 'none',
              borderBottomRightRadius: m.from === 'user' ? 4 : 18,
              borderBottomLeftRadius: m.from === 'bot' ? 4 : 18,
            }}>
              <div style={{ fontSize: 15, lineHeight: 1.45 }}>{m.text}</div>
              <div style={{ fontSize: 11, marginTop: 4, opacity: 0.6, textAlign: 'right' }}>{m.time}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>k</span>
            </div>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: '12px 18px', display: 'flex', gap: 5 }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--text-muted)', animation: `typeDot .9s ${i * 0.15}s infinite` }}></span>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* quick replies */}
      {msgs.length <= 2 && (
        <div style={{ display: 'flex', gap: 8, padding: '0 16px 10px', overflow: 'auto' }}>
          {QUICK.map(q => (
            <button key={q} onClick={() => { setInput(q); setTimeout(send, 50); }} style={{
              flex: 'none', padding: '9px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
              border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)',
              color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap',
            }}>{q}</button>
          ))}
        </div>
      )}

      {/* input */}
      <div style={{ padding: '10px 16px 32px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Mesajınızı yazın..." style={{
            flex: 1, border: '1.5px solid var(--border-default)', borderRadius: 999, padding: '13px 16px',
            fontSize: 15, fontFamily: 'var(--font-sans)', outline: 'none', background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
          }} />
        <button onClick={send} disabled={!input.trim()} style={{
          width: 46, height: 46, borderRadius: 999, border: 'none', flex: 'none',
          background: input.trim() ? 'var(--brand-500)' : 'var(--bg-sunken)',
          display: 'grid', placeItems: 'center', cursor: input.trim() ? 'pointer' : 'default',
          transition: 'all .15s ease',
        }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>
        </button>
      </div>
      <style>{`@keyframes typeDot{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}`}</style>
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

Object.assign(window, { ReviewScreen, RestaurantReviewsScreen, ChatScreen, ReferralScreen, StarRow });
