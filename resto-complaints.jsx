// resto-complaints.jsx — Şikayet ve İadeler (v8 §10)
const { Icon, Badge, money, MetricCard, TableHeader, TableRow } = window;
const KPAD = '24px';

const COMPLAINTS = [
  { id: 'SK-1042', orderId: 'KM-4820', customer: 'Pelin S.', subject: 'Eksik ürün',          desc: 'Lahmacun 2 adet eksik geldi, kuryede de yoktu.',           amount: 80,  status: 'open',      created: '10 dk önce', tone: 'error' },
  { id: 'SK-1041', orderId: 'YS-9170', customer: 'Onur D.',  subject: 'Geç teslimat',        desc: 'Sipariş 50 dk geç geldi; yemekler soğumuştu.',             amount: null, status: 'review',    created: '1 saat önce', tone: 'warning' },
  { id: 'SK-1040', orderId: 'KM-4815', customer: 'Selin M.', subject: 'Hatalı ürün',         desc: 'Acılı Adana yerine acısız geldi. İade talep ediyorum.',     amount: 145, status: 'review',    created: '3 saat önce', tone: 'warning' },
  { id: 'SK-1039', orderId: 'TY-2188', customer: 'Berk Ö.',  subject: 'Yemek kalitesi',      desc: 'Yemek soğuktu, sunum istediğim gibi değildi.',              amount: null, status: 'resolved',  created: '1 gün önce', tone: 'success' },
  { id: 'SK-1038', orderId: 'KM-4801', customer: 'Ayşe K.',  subject: 'Yanlış teslimat',     desc: 'Sipariş başkasının kapısına bırakılmış; kurye foto yanlış.', amount: 295, status: 'resolved',  created: '2 gün önce', tone: 'success' },
  { id: 'SK-1037', orderId: 'YS-9155', customer: 'Mert K.',  subject: 'Ödeme hatası',        desc: 'Çift çekim oldu. Bankada görünüyor.',                       amount: 215, status: 'escalated', created: '2 gün önce', tone: 'error' },
];

const COMPLAINT_STATUS = {
  open:      { label: 'Açık',          tone: 'error',   dot: 'var(--error-500)' },
  review:    { label: 'İncelemede',    tone: 'warning', dot: 'var(--warning-500)' },
  resolved:  { label: 'Çözüldü',       tone: 'success', dot: 'var(--success-500)' },
  escalated: { label: 'Eskalasyonda',  tone: 'error',   dot: 'var(--error-500)' },
};

function ComplaintsView() {
  const [filter, setFilter] = React.useState('all');
  const [selected, setSelected] = React.useState(null);

  const filtered = filter === 'all' ? COMPLAINTS : COMPLAINTS.filter(c => c.status === filter);

  if (selected) {
    const c = COMPLAINTS.find(x => x.id === selected);
    const st = COMPLAINT_STATUS[c.status];
    return (
      <div style={{ padding: KPAD }}>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginBottom: 18 }}>
          <Icon name="back" size={18} color="var(--text-tertiary)" /> Şikayetlere dön
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{c.subject}</div>
              <Badge tone={st.tone} style={{ fontSize: 13, padding: '5px 14px' }}><span style={{ width: 7, height: 7, borderRadius: 999, background: st.dot }}></span>{st.label}</Badge>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 18, fontFamily: 'var(--font-mono, monospace)' }}>#{c.id} · Sipariş #{c.orderId} · {c.created}</div>

            <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
              {[['Müşteri', c.customer, 'user'], ['İade tutarı', c.amount ? money(c.amount) : '—', 'wallet']].map(([l, v, ic], i) => (
                <div key={i} style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 14, textAlign: 'center' }}>
                  <Icon name={ic} size={18} color="var(--brand-500)" style={{ margin: '0 auto 6px', display: 'block' }} />
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Müşteri açıklaması</div>
            <div style={{ padding: 14, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 18 }}>{c.desc}</div>

            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Yanıt yaz</div>
            <textarea placeholder="Müşteriye açıklama, çözüm önerisi..." style={{ width: '100%', minHeight: 96, padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ComplaintAction label="İadeyi onayla" icon="check" color="var(--success-500)" />
            <ComplaintAction label="Kısmi iade öner" icon="repeat" outline />
            <ComplaintAction label="Reddet" icon="close" color="var(--error-500)" outline />
            <ComplaintAction label="Müşteriyi ara" icon="phone" outline />
            <div style={{ marginTop: 6, padding: '12px 14px', background: 'var(--info-50)', borderRadius: 'var(--radius-md)', fontSize: 12.5, color: 'var(--info-600)', lineHeight: 1.45 }}>
              Şikayetler <strong>1-7 iş günü</strong> içinde değerlendirilir. Onaylı iadeler muhasebe sürecine düşer ve müşteriye bir sonraki kapama döneminde yansır.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const counts = {
    all: COMPLAINTS.length,
    open: COMPLAINTS.filter(c => c.status === 'open').length,
    review: COMPLAINTS.filter(c => c.status === 'review').length,
    resolved: COMPLAINTS.filter(c => c.status === 'resolved').length,
    escalated: COMPLAINTS.filter(c => c.status === 'escalated').length,
  };
  const refundTotal = COMPLAINTS.filter(c => c.amount && c.status !== 'resolved').reduce((s, c) => s + c.amount, 0);

  return (
    <div style={{ padding: KPAD }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Şikayet & İadeler</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>Müşteri şikayetlerini ve iade taleplerini yönet · v8 §10</div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
        <MetricCard label="Açık şikayet"        value={counts.open} icon="msg" color="var(--error-500)" />
        <MetricCard label="İncelemede"          value={counts.review} icon="clock" color="var(--warning-500)" />
        <MetricCard label="Bekleyen iade tutarı"value={money(refundTotal)} icon="wallet" />
        <MetricCard label="Bu ay çözülen"       value={counts.resolved} icon="check" color="var(--success-500)" />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {[['all', 'Tümü'], ['open', 'Açık'], ['review', 'İncelemede'], ['resolved', 'Çözüldü'], ['escalated', 'Eskalasyonda']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            background: filter === k ? 'var(--brand-500)' : 'var(--bg-surface)',
            color: filter === k ? '#fff' : 'var(--text-secondary)',
            border: filter === k ? 'none' : '1.5px solid var(--border-default)',
            fontFamily: 'var(--font-sans)',
          }}>{l} <span style={{ opacity: 0.7 }}>({counts[k]})</span></button>
        ))}
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: '0 0 90px' }}>Şikayet</span>
          <span style={{ flex: '0 0 96px' }}>Sipariş</span>
          <span style={{ flex: 1 }}>Müşteri</span>
          <span style={{ flex: 1.3 }}>Konu</span>
          <span style={{ flex: '0 0 100px' }}>İade</span>
          <span style={{ flex: '0 0 130px' }}>Durum</span>
          <span style={{ flex: '0 0 100px' }}>Zaman</span>
          <span style={{ flex: '0 0 76px', textAlign: 'right' }}></span>
        </TableHeader>
        {filtered.map(c => {
          const st = COMPLAINT_STATUS[c.status];
          return (
            <TableRow key={c.id} onClick={() => setSelected(c.id)}>
              <span style={{ flex: '0 0 90px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{c.id}</span>
              <span style={{ flex: '0 0 96px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--text-tertiary)' }}>{c.orderId}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.customer}</span>
              <span style={{ flex: 1.3, fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.subject}</span>
              <span style={{ flex: '0 0 100px', fontSize: 13, fontWeight: 700, color: c.amount ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{c.amount ? money(c.amount) : '—'}</span>
              <span style={{ flex: '0 0 130px' }}><Badge tone={st.tone} style={{ fontSize: 11 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: st.dot }}></span>{st.label}</Badge></span>
              <span style={{ flex: '0 0 100px', fontSize: 12, color: 'var(--text-tertiary)' }}>{c.created}</span>
              <span style={{ flex: '0 0 76px', display: 'flex', justifyContent: 'flex-end' }}><Icon name="chevR" size={16} color="var(--text-muted)" /></span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

function ComplaintAction({ label, icon, color, outline }) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, cursor: 'pointer', width: '100%',
      background: outline ? 'var(--bg-surface)' : (color || 'var(--brand-500)'),
      color: outline ? 'var(--text-primary)' : '#fff',
      border: outline ? '1.5px solid var(--border-default)' : 'none',
    }}>
      <Icon name={icon} size={18} color={outline ? color || 'var(--text-secondary)' : '#fff'} />{label}
    </button>
  );
}

Object.assign(window, { ComplaintsView });
