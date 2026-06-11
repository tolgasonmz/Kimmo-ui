// resto-messages.jsx — Müşteri Mesajları & Anlık Chat
const { Icon, Badge, money } = window;

const INIT_CONVERSATIONS = [
  {
    id: 'c1', customer: 'Elif Y.', orderId: 'KM-4833', avatar: 'EY', unread: 2, time: '2 dk önce', resolved: false,
    lastMsg: 'Siparişimde Ayran unutulmuş, ekleyebilir misiniz?',
    messages: [
      { from: 'customer', text: 'Merhaba, siparişimi verdim ama bir sorum var.', time: '18:32' },
      { from: 'restaurant', text: 'Merhaba! Nasıl yardımcı olabiliriz?', time: '18:33' },
      { from: 'customer', text: 'Siparişimde Ayran unutulmuş, ekleyebilir misiniz?', time: '18:34' },
    ],
  },
  {
    id: 'c2', customer: 'Can B.', orderId: 'KM-4832', avatar: 'CB', unread: 0, time: '5 dk önce', resolved: true,
    lastMsg: 'Teşekkürler, çok yardımcı oldunuz 🙏',
    messages: [
      { from: 'customer', text: 'Adana dürümü acısız istemiştim, acılı geldi.', time: '17:55' },
      { from: 'restaurant', text: 'Özür dileriz! Hemen yeni bir dürüm hazırlayıp gönderiyoruz.', time: '17:57' },
      { from: 'customer', text: 'Teşekkürler, çok yardımcı oldunuz 🙏', time: '18:02' },
    ],
  },
  {
    id: 'c3', customer: 'Zeynep A.', orderId: 'KM-4831', avatar: 'ZA', unread: 1, time: '12 dk önce', resolved: false,
    lastMsg: 'Siparişim ne zaman gelir yaklaşık?',
    messages: [
      { from: 'customer', text: 'Siparişim ne zaman gelir yaklaşık?', time: '17:40' },
    ],
  },
  {
    id: 'c4', customer: 'Mehmet T.', orderId: 'KM-4830', avatar: 'MT', unread: 0, time: '18 dk önce', resolved: true,
    lastMsg: 'Tamam anlıyorum, bekleyelim.',
    messages: [
      { from: 'customer', text: 'Kurye çok geç kaldı, neden bu kadar sürdü?', time: '17:22' },
      { from: 'restaurant', text: 'Özür dileriz, trafik yoğunluğu nedeniyle gecikme yaşandı. Anlayışınız için teşekkürler.', time: '17:24' },
      { from: 'customer', text: 'Tamam anlıyorum, bekleyelim.', time: '17:25' },
    ],
  },
  {
    id: 'c5', customer: 'Ayşe K.', orderId: 'KM-4829', avatar: 'AK', unread: 0, time: '32 dk önce', resolved: false,
    lastMsg: 'Künefe ekstra porsiyonlu olabilir mi?',
    messages: [
      { from: 'customer', text: 'Künefe ekstra porsiyonlu olabilir mi?', time: '17:05' },
      { from: 'restaurant', text: 'Maalesef şu an için ekstra porsiyon imkânımız bulunmuyor, standart porsiyon gönderiyoruz.', time: '17:07' },
    ],
  },
];

const QUICK_REPLIES = [
  'Siparişiniz hazırlanıyor, kısa sürede yola çıkacak.',
  'Özür dileriz, hemen düzeltiyoruz.',
  'Anlayışınız için teşekkür ederiz.',
  'Siparişiniz 10-15 dakika içinde gelecek.',
];

function MessagesView() {
  const [convs, setConvs] = React.useState(INIT_CONVERSATIONS);
  const [activeId, setActiveId] = React.useState('c1');
  const [input, setInput] = React.useState('');
  const [filter, setFilter] = React.useState('all'); // all | unread | resolved
  const msgEndRef = React.useRef(null);

  const active = convs.find(c => c.id === activeId);
  const filtered = convs.filter(c =>
    filter === 'all' ? true :
    filter === 'unread' ? c.unread > 0 :
    filter === 'resolved' ? c.resolved : true
  );
  const totalUnread = convs.reduce((s, c) => s + c.unread, 0);

  const selectConv = (id) => {
    setActiveId(id);
    setConvs(cs => cs.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const send = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    setConvs(cs => cs.map(c => c.id === activeId ? {
      ...c,
      messages: [...c.messages, { from: 'restaurant', text: input.trim(), time: now }],
      lastMsg: input.trim(),
    } : c));
    setInput('');
  };

  const resolve = (id) => setConvs(cs => cs.map(c => c.id === id ? { ...c, resolved: !c.resolved } : c));

  React.useEffect(() => {
    if (msgEndRef.current) msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages?.length]);

  return (
    <div style={{ display: 'flex', height: 660, overflow: 'hidden' }}>

      {/* ── Conversation list ── */}
      <div style={{ width: 290, flex: 'none', borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '18px 18px 12px', borderBottom: '1px solid var(--border-subtle)', flex: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Müşteri Mesajları</div>
            {totalUnread > 0 && (
              <span style={{ background: 'var(--brand-500)', color: '#fff', fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 999 }}>{totalUnread}</span>
            )}
          </div>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 2, padding: 3, background: 'var(--bg-sunken)', borderRadius: 999 }}>
            {[['all', 'Tümü'], ['unread', 'Okunmadı'], ['resolved', 'Çözüldü']].map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k)} style={{ flex: 1, padding: '5px 0', borderRadius: 999, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', background: filter === k ? 'var(--bg-surface)' : 'transparent', color: filter === k ? 'var(--text-primary)' : 'var(--text-tertiary)', boxShadow: filter === k ? 'var(--shadow-sm)' : 'none', transition: 'all .15s ease' }}>{l}</button>
            ))}
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(c => {
            const on = activeId === c.id;
            return (
              <div key={c.id} onClick={() => selectConv(c.id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '13px 16px', cursor: 'pointer', background: on ? 'var(--brand-50)' : 'transparent', borderLeft: `3px solid ${on ? 'var(--brand-500)' : 'transparent'}`, transition: 'all .12s ease' }}>
                {/* Avatar */}
                <div style={{ width: 38, height: 38, borderRadius: 999, background: on ? 'var(--brand-500)' : 'var(--bg-sunken)', color: on ? '#fff' : 'var(--text-secondary)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, flex: 'none', position: 'relative' }}>
                  {c.avatar}
                  {c.unread > 0 && <span style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', fontSize: 10, fontWeight: 800, display: 'grid', placeItems: 'center', border: '2px solid var(--bg-surface)' }}>{c.unread}</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, fontWeight: c.unread > 0 ? 700 : 600, color: 'var(--text-primary)' }}>{c.customer}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', flex: 'none', marginLeft: 4 }}>{c.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono, monospace)' }}>#{c.orderId}</span>
                    {c.resolved && <Badge tone="success" style={{ fontSize: 9, padding: '1px 5px' }}>Çözüldü</Badge>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: c.unread > 0 ? 600 : 400 }}>{c.lastMsg}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Chat panel ── */}
      {active ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-app)', overflow: 'hidden' }}>
          {/* Chat header */}
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800 }}>{active.avatar}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{active.customer}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Sipariş #{active.orderId} · {active.messages.length} mesaj</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 13px', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                <Icon name="phone" size={14} color="var(--brand-500)" /> Ara
              </button>
              <button onClick={() => resolve(activeId)} style={{ padding: '6px 13px', borderRadius: 999, border: `1.5px solid ${active.resolved ? 'var(--border-default)' : 'var(--success-300)'}`, background: active.resolved ? 'var(--bg-surface)' : 'var(--success-50)', fontSize: 12, fontWeight: 700, cursor: 'pointer', color: active.resolved ? 'var(--text-secondary)' : 'var(--success-700)', fontFamily: 'var(--font-sans)', transition: 'all .15s ease' }}>
                {active.resolved ? 'Yeniden Aç' : '✓ Çözüldü'}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {active.messages.map((msg, i) => {
              const isResto = msg.from === 'restaurant';
              return (
                <div key={i} style={{ display: 'flex', justifyContent: isResto ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                  {!isResto && (
                    <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--bg-sunken)', color: 'var(--text-secondary)', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700, flex: 'none' }}>{active.avatar}</div>
                  )}
                  <div style={{ maxWidth: '60%' }}>
                    <div style={{ padding: '10px 14px', borderRadius: isResto ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isResto ? 'var(--brand-500)' : 'var(--bg-surface)', color: isResto ? '#fff' : 'var(--text-primary)', fontSize: 14, lineHeight: 1.55, border: isResto ? 'none' : '1px solid var(--border-subtle)', boxShadow: isResto ? '0 2px 8px rgba(0,0,0,0.12)' : 'var(--shadow-xs)' }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, textAlign: isResto ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                  {isResto && (
                    <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 800, flex: 'none' }}>KO</div>
                  )}
                </div>
              );
            })}
            <div ref={msgEndRef}></div>
          </div>

          {/* Quick replies */}
          <div style={{ padding: '8px 24px 0', display: 'flex', gap: 6, flexWrap: 'wrap', flex: 'none' }}>
            {QUICK_REPLIES.map((r, i) => (
              <button key={i} onClick={() => setInput(r)} style={{ padding: '4px 11px', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', transition: 'all .12s ease' }}>{r}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 20px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', gap: 10, alignItems: 'center', flex: 'none', marginTop: 8 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Mesaj yaz... (Enter ile gönder)"
              style={{ flex: 1, border: '1.5px solid var(--border-default)', borderRadius: 999, padding: '10px 16px', fontSize: 14, fontFamily: 'var(--font-sans)', outline: 'none', background: 'var(--bg-app)', color: 'var(--text-primary)', transition: 'border-color .15s ease' }}
            />
            <button onClick={send} style={{ width: 40, height: 40, borderRadius: 999, background: input.trim() ? 'var(--brand-500)' : 'var(--bg-sunken)', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'grid', placeItems: 'center', transition: 'all .15s ease', flex: 'none' }}>
              <Icon name="send" size={16} color={input.trim() ? '#fff' : 'var(--text-muted)'} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <Icon name="msg" size={40} color="var(--border-default)" style={{ margin: '0 auto 12px', display: 'block' }} />
            <div style={{ fontSize: 14, fontWeight: 600 }}>Bir konuşma seç</div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { MessagesView });
