// resto-views2.jsx — Analytics, Campaigns, Reviews, Settings
const { Icon, Badge, money,
  CAMPAIGNS, RECENT_REVIEWS, HOURLY_ORDERS, TOP_ITEMS, WEEKLY_REVENUE,
  MetricCard, TableHeader, TableRow } = window;
const RPAD = '24px';

// ============ ANALYTICS ============
function AnalyticsView() {
  const maxH = Math.max(...HOURLY_ORDERS.map(d => d.val));
  const maxW = Math.max(...WEEKLY_REVENUE.map(d => d.val));

  return (
    <div style={{ padding: RPAD }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Raporlar & Analitik</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>Son 30 gün</div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Toplam ciro" value="₺86.200" change="%22" changeUp icon="wallet" />
        <MetricCard label="Toplam sipariş" value="342" change="%15" changeUp icon="bag" />
        <MetricCard label="Yeni müşteri" value="89" change="%8" changeUp icon="user" />
        <MetricCard label="Tekrar sipariş" value="%64" icon="heart" />
      </div>

      {/* ── Kimoo Komisyon Avantajı ── */}
      <div style={{ background: 'linear-gradient(135deg, var(--brand-50) 0%, var(--bg-surface) 100%)', border: '1.5px solid color-mix(in srgb, var(--brand-500) 20%, transparent)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'color-mix(in srgb, var(--brand-500) 6%, transparent)' }}></div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center' }}>
              <Icon name="wallet" size={18} color="#fff" />
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Kimoo Avantajı Hesaplayıcı</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>
            Entegrasyon platformlarındaki cironuz Kimoo üzerinden kazanılsaydı, komisyon ödemeyeceğiniz için ne kadar fazla kazanırdınız?
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            {[
              { name: 'Yemeksepeti', short: 'YS', bg: '#FFF0EB', fg: '#C94A17', ciro: 86400, commission: 30 },
              { name: 'Trendyol Yemek', short: 'TY', bg: '#FFF4EB', fg: '#C15E0D', ciro: 52500, commission: 25 },
            ].map(pl => {
              const commissionAmount = Math.round(pl.ciro * pl.commission / 100);
              const net = pl.ciro - commissionAmount;
              return (
                <div key={pl.short} style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: 18, border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: pl.bg, display: 'grid', placeItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: pl.fg }}>{pl.short}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{pl.name}</div>
                  </div>
                  {[
                    ['Aylık ciro', money(pl.ciro), false],
                    [`Komisyon (%${pl.commission})`, '-' + money(commissionAmount), true],
                    ['Net kazancınız', money(net), false],
                  ].map(([l, v, isError], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none', fontSize: 13 }}>
                      <span style={{ color: isError ? 'var(--error-600)' : 'var(--text-secondary)' }}>{l}</span>
                      <span style={{ fontWeight: 700, color: isError ? 'var(--error-600)' : 'var(--text-primary)' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, padding: 10, background: 'var(--success-50)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--success-600)', marginBottom: 2 }}>Kimoo'da kazanırdınız</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--success-600)' }}>{money(pl.ciro)}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--success-600)' }}>+{money(commissionAmount)} ekstra</div>
                  </div>
                </div>
              );
            })}
          </div>

          {(() => {
            const totalCiro = 86400 + 52500;
            const totalCommission = Math.round(86400 * 0.30) + Math.round(52500 * 0.25);
            const totalNet = totalCiro - totalCommission;
            return (
              <>
                <div style={{ background: 'var(--brand-500)', borderRadius: 'var(--radius-md)', padding: 20, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, boxShadow: 'var(--shadow-brand)' }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, marginBottom: 4 }}>Aylık toplam tasarruf</div>
                    <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>{money(totalCommission)}</div>
                    <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>Yıllık: {money(totalCommission * 12)}</div>
                  </div>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'grid', placeItems: 'center' }}>
                    <Icon name="star" size={28} color="#fff" />
                  </div>
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Net kazanç karşılaştırma (aylık)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>3. parti platformlar (net)</span>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{money(totalNet)}</span>
                    </div>
                    <div style={{ height: 24, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', overflow: 'hidden' }}>
                      <div style={{ width: Math.round(totalNet / totalCiro * 100) + '%', height: '100%', borderRadius: 'var(--radius-sm)', background: 'var(--neutral-400)' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: 'var(--brand-600)', fontWeight: 600 }}>Kimoo üzerinden (net)</span>
                      <span style={{ fontWeight: 700, color: 'var(--brand-600)' }}>{money(totalCiro)}</span>
                    </div>
                    <div style={{ height: 24, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-sm)', background: 'var(--brand-500)' }}></div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        {/* Hourly distribution */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>Saatlik sipariş dağılımı</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 130 }}>
            {HOURLY_ORDERS.map((d, i) => {
              const pct = (d.val / maxH) * 100;
              const peak = d.val >= 15;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-muted)' }}>{d.val}</span>
                  <div style={{ width: '100%', height: pct + '%', minHeight: 4, borderRadius: 3,
                    background: peak ? 'var(--brand-500)' : 'var(--brand-100)' }}></div>
                  <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{d.hour}</span>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 12 }}>Yoğun saatler: 12:00-13:00, 19:00-21:00</div>
        </div>

        {/* Weekly trend */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>Haftalık ciro trendi</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 130 }}>
            {WEEKLY_REVENUE.map((d, i) => {
              const pct = (d.val / maxW) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-muted)' }}>{(d.val/1000).toFixed(0)}k</span>
                  <div style={{ width: '100%', height: pct + '%', minHeight: 4, borderRadius: 3, background: 'var(--success-500)' }}></div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top items */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>En çok sipariş edilen ürünler</div>
        {TOP_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < TOP_ITEMS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: i === 0 ? 'var(--brand-500)' : 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 800, color: i === 0 ? '#fff' : 'var(--text-tertiary)' }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.orders} sipariş</div>
            </div>
            <div style={{ width: 140 }}>
              <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden' }}>
                <div style={{ width: item.pct + '%', height: '100%', borderRadius: 999, background: 'var(--brand-500)' }}></div>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right', width: 80 }}>{money(item.revenue)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CAMPAIGNS — Restaurant + Kimoo split, budget-aware ============
const RESTO_CAMPAIGNS = [
  { id: 'r1', name: "₺1500'e ₺300 İndirim",   type: 'cart',     active: true,  desc: 'Min ₺1500 sepet → sepette ₺300 indirim', startDate: '20 Haz', endDate: '20 Tem', used: 28, spent: 8400, budget: 15000 },
  { id: 'r2', name: 'Pizzalarda %15',           type: 'category', active: true,  desc: 'Pizza kategorisi üzerinde maks. %15 indirim',  startDate: 'Süresiz',  endDate: '',         used: 134, spent: 4020, budget: null },
  { id: 'r3', name: 'KOSE50',                   type: 'coupon',   active: true,  desc: '₺50 indirim · min ₺250 · 100 adet · tek kullanım', startDate: '15 Haz', endDate: '15 Tem', used: 34, spent: 1700, budget: 5000, code: true },
];

const KIMOO_CAMPAIGNS = [
  { id: 'k1', name: 'İlk Siparişe ₺100 İndirim', joined: true,  desc: 'Müşterinin bu restorandan ilk siparişinde ₺100 indirim',                gained: 12, spent: 1200, note: 'Kimoo bu kampanyayı katılan tüm restoranlar için müşteri uygulamasında gösterir. İndirim restoran hasılatından düşer.' },
  { id: 'k2', name: 'Hafta Sonu Fırsatı',       joined: false, desc: 'Cumartesi–Pazar siparişlerinde %10 indirim',                              est: '~₺800/hafta' },
  { id: 'k3', name: "₺500'e ₺75 İndirim",       joined: false, desc: 'Tüm kullanıcılar · ₺500+ sepetlerde · Platform geneli',                       est: '~₺1.200/ay' },
];

function CampaignBadge({ children, tone }) {
  const colors = {
    aktif:    ['var(--success-50)',  'var(--success-600)'],
    kimoo:    ['var(--warning-50)',  'var(--warning-600)'],
    kat:      ['var(--brand-50)',    'var(--brand-700)'],
    kupon:    ['var(--bg-sunken)',   'var(--text-secondary)'],
    pasif:    ['var(--bg-sunken)',   'var(--text-muted)'],
  };
  const [bg, fg] = colors[tone] || colors.pasif;
  return <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 8px', borderRadius:6, fontSize:10, fontWeight:700, background:bg, color:fg, letterSpacing:'0.02em' }}>{children}</span>;
}

function RCampaignCard({ c, onToggle }) {
  const typeIcon = c.type === 'coupon' ? 'ticket' : c.type === 'category' ? 'tag' : 'percent';
  return (
    <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', padding:'14px 16px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
          <Icon name={typeIcon} size={15} color="var(--brand-600)" />
          <span style={{ fontSize:14, fontWeight:800, color:'var(--text-primary)', fontFamily: c.code ? 'var(--font-mono, monospace)' : 'var(--font-sans)' }}>{c.name}</span>
          {c.active && <CampaignBadge tone="aktif">Aktif</CampaignBadge>}
          {c.code  && <CampaignBadge tone="kupon">Kupon</CampaignBadge>}
        </div>
        <button onClick={onToggle} style={{ width:34, height:20, borderRadius:999, border:'none', cursor:'pointer', position:'relative', background: c.active ? 'var(--success-500)' : 'var(--border-default)', flex:'none' }}>
          <span style={{ position:'absolute', top:2, left: c.active ? 16 : 2, width:16, height:16, borderRadius:999, background:'#fff', boxShadow:'var(--shadow-xs)' }} />
        </button>
      </div>
      <div style={{ fontSize:12.5, color:'var(--text-tertiary)', marginBottom:8 }}>{c.desc}</div>
      <div style={{ display:'flex', gap:14, fontSize:11.5, color:'var(--text-muted)', marginBottom:8 }}>
        <span>{c.endDate ? `${c.startDate} — ${c.endDate}` : c.startDate}</span>
        <span>{c.used} kullanım</span>
      </div>
      <div style={{ background:'var(--warning-50)', borderRadius:'var(--radius-sm)', padding:'8px 10px', display:'flex', alignItems:'center', gap:8 }}>
        <Icon name="wallet" size={13} color="var(--warning-600)" />
        <span style={{ fontSize:11.5, color:'var(--warning-700)' }}>
          <strong>{money(c.spent)}</strong> harcandı{c.budget ? ` / bütçe ${money(c.budget)}` : ''} · Restoran bütçesinden
        </span>
      </div>
      {c.budget && (
        <div style={{ height:4, borderRadius:999, background:'var(--bg-sunken)', overflow:'hidden', marginTop:6 }}>
          <div style={{ width: Math.min(100, (c.spent / c.budget) * 100) + '%', height:'100%', background:'var(--warning-500)' }} />
        </div>
      )}
    </div>
  );
}

function KCampaignCard({ c, onJoin, onLeave }) {
  return (
    <div style={{ background:'var(--bg-surface)', border: c.joined ? '1px solid color-mix(in srgb, var(--warning-500) 35%, transparent)' : '1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', padding:'14px 16px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
        <Icon name="gift" size={15} color="var(--warning-600)" />
        <span style={{ fontSize:14, fontWeight:800, color:'var(--text-primary)' }}>{c.name}</span>
        <CampaignBadge tone="kimoo">Kimoo</CampaignBadge>
        {c.joined ? <CampaignBadge tone="aktif">Katıldınız</CampaignBadge> : <CampaignBadge tone="pasif">Katılmadınız</CampaignBadge>}
      </div>
      <div style={{ fontSize:12.5, color:'var(--text-tertiary)', marginBottom:8 }}>{c.desc}</div>
      <div style={{ background: c.joined ? 'var(--warning-50)' : 'var(--bg-sunken)', borderRadius:'var(--radius-sm)', padding:'8px 10px', marginBottom:10 }}>
        <div style={{ fontSize:11, color: c.joined ? 'var(--warning-700)' : 'var(--text-secondary)', lineHeight:1.5 }}>
          {c.joined
            ? <><strong>Kazanım:</strong> {c.gained} yeni müşteri · <strong>Maliyet:</strong> {money(c.spent)} (restoran hasılatından)</>
            : <><strong>Tahmini maliyet:</strong> {c.est} · İndirim restoran hasılatından karşılanır</>}
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        {c.joined
          ? <button onClick={onLeave} style={{ fontSize:11.5, padding:'6px 12px', borderRadius:999, border:'1.5px solid color-mix(in srgb, var(--error-500) 35%, transparent)', background:'var(--bg-surface)', color:'var(--error-600)', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)' }}>Ayrıl</button>
          : <button onClick={onJoin}  style={{ fontSize:11.5, padding:'6px 14px', borderRadius:999, background:'var(--warning-500)', color:'#fff', border:'none', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)' }}>Bu kampanyaya katıl</button>}
      </div>
    </div>
  );
}

function CampaignsView() {
  const [resto, setResto] = React.useState(RESTO_CAMPAIGNS);
  const [kimoo, setKimoo] = React.useState(KIMOO_CAMPAIGNS);
  const [showForm, setShowForm] = React.useState(false);

  const toggleResto = id => setResto(arr => arr.map(c => c.id === id ? { ...c, active: !c.active } : c));
  const setJoin = (id, v) => setKimoo(arr => arr.map(c => c.id === id ? { ...c, joined: v } : c));

  const totalSpent = resto.reduce((s, c) => s + c.spent, 0) + kimoo.filter(k => k.joined).reduce((s, c) => s + (c.spent||0), 0);
  const activeCount = resto.filter(c => c.active).length + kimoo.filter(k => k.joined).length;
  const totalUses = resto.reduce((s, c) => s + c.used, 0);

  return (
    <div style={{ padding: RPAD }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Kampanya & Kupon Yönetimi</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>Kendi bütçenizle veya Kimoo kampanyalarına katılarak müşterilerinize teklifler sunun</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 16px', borderRadius:999, background:'var(--warning-500)', color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)' }}>
            <Icon name="gift" size={15} color="#fff" />Kimoo kampanyalarına katıl
          </button>
          <button onClick={() => setShowForm(s => !s)} style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 18px', borderRadius:999, background:'var(--brand-500)', color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)', boxShadow:'var(--shadow-brand)' }}>
            <Icon name="plus" size={15} color="#fff" />Kampanya oluştur
          </button>
        </div>
      </div>

      {/* Sistem notu */}
      <div style={{ background:'var(--brand-50)', border:'1px solid color-mix(in srgb, var(--brand-500) 25%, transparent)', borderRadius:'var(--radius-md)', padding:'12px 16px', marginTop: 18, marginBottom: 18, display:'flex', gap:10, alignItems:'flex-start' }}>
        <Icon name="bolt" size={16} color="var(--brand-600)" style={{ marginTop: 2, flex:'none' }} />
        <div style={{ fontSize:12.5, color:'var(--brand-700)', lineHeight:1.55 }}>
          Kimoo abonelik modeliyle çalışır ve komisyon almaz. Tüm kampanyalar restoran bütçesinden finanse edilir; İndirim tutarı hak edişinizden düşer, Kimoo bu tutardan pay almaz.
        </div>
      </div>

      {/* Metrikler */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Aktif kampanya" value={activeCount} icon="tag" />
        <MetricCard label="Toplam kullanım"  value={totalUses} change="%28" changeUp icon="bag" />
        <MetricCard label="Bu ay harcama"    value={money(totalSpent)} icon="wallet" />
      </div>

      {/* İki sütun */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14, marginBottom: 14 }}>
        {/* Restoran kampanyaları */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <span style={{ width:8, height:8, borderRadius:999, background:'var(--brand-500)' }} />
            <span style={{ fontSize:13, fontWeight:800, color:'var(--brand-700)' }}>Restoran kampanyalarım</span>
            <span style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono, monospace)' }}>funded_by: restaurant</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {resto.map(c => <RCampaignCard key={c.id} c={c} onToggle={() => toggleResto(c.id)} />)}
          </div>
        </div>

        {/* Kimoo kampanyaları */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <span style={{ width:8, height:8, borderRadius:999, background:'var(--warning-500)' }} />
            <span style={{ fontSize:13, fontWeight:800, color:'var(--warning-600)' }}>Kimoo kampanyaları</span>
            <span style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono, monospace)' }}>created_by: kimoo · funded_by: restaurant</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {kimoo.map(c => <KCampaignCard key={c.id} c={c} onJoin={() => setJoin(c.id, true)} onLeave={() => setJoin(c.id, false)} />)}
          </div>
        </div>
      </div>

      {/* Oluşturma formu */}
      {showForm && <CampaignCreateForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

function CampaignCreateForm({ onClose }) {
  const [type, setType] = React.useState('cart');
  const [minBasket, setMinBasket] = React.useState(1500);
  const [discount, setDiscount] = React.useState(300);
  const [budget, setBudget] = React.useState(15000);
  const [usePerPerson, setUsePerPerson] = React.useState(1);
  const [validScope, setValidScope] = React.useState('all');

  const TYPES = [
    { id:'cart',     label:'Sepet indirimi', sub:'₺X al, ₺Y indirim', icon:'wallet' },
    { id:'category', label:'Kategori %',      sub:'Kategoriye % indirim', icon:'tag' },
    { id:'coupon',   label:'Kupon kodu',      sub:'Kod ile indirim', icon:'ticket' },
    { id:'first',    label:'İlk sipariş',     sub:'Yeni müşteriye özel', icon:'gift' },
  ];

  const FieldLabel = ({ children }) => <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{children}</div>;
  const inp = { width:'100%', border:'1.5px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'9px 11px', fontSize:13, fontFamily:'var(--font-sans)', outline:'none', background:'var(--bg-surface)', color:'var(--text-primary)', boxSizing:'border-box' };

  return (
    <div style={{ background:'var(--bg-surface)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:20, marginTop:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <div>
          <div style={{ fontSize:16, fontWeight:800, color:'var(--text-primary)' }}>Yeni Restoran Kampanyası Oluştur</div>
          <div style={{ fontSize:12, color:'var(--text-tertiary)', marginTop:2 }}>Bu kampanyanın maliyeti tamamen size aittir. Kimoo komisyon veya pay almaz.</div>
        </div>
        <button onClick={onClose} style={{ width:30, height:30, borderRadius:999, background:'var(--bg-sunken)', border:'none', cursor:'pointer', display:'grid', placeItems:'center' }}>
          <Icon name="close" size={14} color="var(--text-secondary)" />
        </button>
      </div>

      <FieldLabel>Kampanya tipi</FieldLabel>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, marginBottom:18 }}>
        {TYPES.map(t => {
          const on = type === t.id;
          return (
            <button key={t.id} onClick={() => setType(t.id)} style={{ textAlign:'center', padding:'12px 8px', borderRadius:'var(--radius-md)', cursor:'pointer', fontFamily:'var(--font-sans)', background: on ? 'var(--brand-50)' : 'var(--bg-surface)', border: on ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)' }}>
              <Icon name={t.icon} size={18} color={on ? 'var(--brand-600)' : 'var(--text-tertiary)'} style={{ display:'block', margin:'0 auto 6px' }} />
              <div style={{ fontSize:12, fontWeight:700, color: on ? 'var(--brand-700)' : 'var(--text-primary)' }}>{t.label}</div>
              <div style={{ fontSize:10, color:'var(--text-muted)', marginTop:2 }}>{t.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Form alanları */}
      <div style={{ background:'var(--bg-sunken)', borderRadius:'var(--radius-md)', padding:16, marginBottom:14 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:14 }}>
          <div><FieldLabel>Min. sepet (₺)</FieldLabel><input type="number" value={minBasket} onChange={e => setMinBasket(+e.target.value)} style={inp} /></div>
          <div><FieldLabel>İndirim tutarı (₺)</FieldLabel><input type="number" value={discount} onChange={e => setDiscount(+e.target.value)} style={inp} /></div>
          <div><FieldLabel>Bütçe limiti (₺)</FieldLabel><input type="number" value={budget} onChange={e => setBudget(+e.target.value)} style={inp} /></div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
          <div><FieldLabel>Başlangıç</FieldLabel><div style={inp}>20 Haziran 2026</div></div>
          <div><FieldLabel>Bitiş</FieldLabel><div style={inp}>20 Temmuz 2026</div></div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div>
            <FieldLabel>Kişi başı kullanım</FieldLabel>
            <div style={{ display:'flex', gap:6 }}>
              {[1,3,99].map(n => {
                const on = usePerPerson === n;
                return <button key={n} onClick={() => setUsePerPerson(n)} style={{ flex:1, padding:'8px 0', borderRadius:'var(--radius-sm)', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)', background: on ? 'var(--brand-50)' : 'var(--bg-surface)', color: on ? 'var(--brand-700)' : 'var(--text-secondary)', border: on ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)' }}>{n === 99 ? 'Sınırsız' : `${n} kez`}</button>;
              })}
            </div>
          </div>
          <div>
            <FieldLabel>Geçerli ürünler</FieldLabel>
            <div style={{ display:'flex', gap:6 }}>
              {[['all','Tüm menü'],['cat','Kategori seç']].map(([k,l]) => {
                const on = validScope === k;
                return <button key={k} onClick={() => setValidScope(k)} style={{ flex:1, padding:'8px 0', borderRadius:'var(--radius-sm)', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)', background: on ? 'var(--brand-50)' : 'var(--bg-surface)', color: on ? 'var(--brand-700)' : 'var(--text-secondary)', border: on ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)' }}>{l}</button>;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Maliyet tahmini */}
      <div style={{ background:'var(--warning-50)', border:'1px solid color-mix(in srgb, var(--warning-500) 30%, transparent)', borderRadius:'var(--radius-md)', padding:'14px 16px', marginBottom:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
          <Icon name="wallet" size={15} color="var(--warning-600)" />
          <span style={{ fontSize:12, fontWeight:800, color:'var(--warning-700)', textTransform:'uppercase', letterSpacing:'0.04em' }}>Tahmini maliyet</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, fontSize:12 }}>
          <div><div style={{ color:'var(--text-tertiary)' }}>Kullanım başı</div><div style={{ fontWeight:800, color:'var(--text-primary)', fontSize:14 }}>{money(discount)}</div></div>
          <div><div style={{ color:'var(--text-tertiary)' }}>Günlük ort. uygun sipariş</div><div style={{ fontWeight:800, color:'var(--text-primary)', fontSize:14 }}>8 sipariş</div></div>
          <div><div style={{ color:'var(--text-tertiary)' }}>Tahmini aylık</div><div style={{ fontWeight:800, color:'var(--error-600)', fontSize:14 }}>~{money(discount * 8 * 30 / 1000 * 1000 > budget ? budget : discount * 40)}</div><div style={{ fontSize:10, color:'var(--text-muted)' }}>bütçe limiti: {money(budget)}</div></div>
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
        <button onClick={onClose} style={{ padding:'10px 18px', borderRadius:999, border:'1.5px solid var(--border-default)', background:'var(--bg-surface)', fontSize:13, fontWeight:700, color:'var(--text-primary)', cursor:'pointer', fontFamily:'var(--font-sans)' }}>Taslağı kaydet</button>
        <button onClick={onClose} style={{ padding:'10px 20px', borderRadius:999, background:'var(--brand-500)', color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)', boxShadow:'var(--shadow-brand)' }}>Kampanyayı başlat</button>
      </div>
    </div>
  );
}

// ============ REVIEWS ============
function ReviewsView() {
  const [replyTo, setReplyTo] = React.useState(null);
  return (
    <div style={{ padding: RPAD }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Müşteri Yorumları</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>Son 30 gün · ★ 4.8 ortalama</div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Ortalama puan" value="★ 4.8" icon="star" />
        <MetricCard label="Toplam yorum" value="86" change="%12" changeUp icon="msg" />
        <MetricCard label="Yanıt oranı" value="%78" icon="check" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {RECENT_REVIEWS.map((r, i) => (
          <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontWeight: 700, color: 'var(--text-secondary)' }}>{r.customer[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{r.customer}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{r.date}</div>
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(n => (
                  <svg key={n} width={16} height={16} viewBox="0 0 24 24" fill={n <= r.stars ? 'var(--warning-500)' : 'var(--border-default)'} stroke="none"><path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" /></svg>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: r.reply ? 14 : 0 }}>{r.text}</div>
            {r.reply && (
              <div style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 14, marginTop: 10, display: 'flex', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 800 }}>k</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}><strong style={{ color: 'var(--text-primary)' }}>Köşe Ocakbaşı:</strong> {r.reply}</div>
              </div>
            )}
            {!r.reply && (
              <button style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--brand-600)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', padding: 0 }}>
                <Icon name="msg" size={16} color="var(--brand-600)" />Yanıtla
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ SETTINGS ============
function SetToggle({ on, onClick, locked }) {
  return (
    <button onClick={locked ? undefined : onClick} style={{
      width: 44, height: 26, borderRadius: 999, border: 'none', cursor: locked ? 'not-allowed' : 'pointer', position: 'relative', flex: 'none',
      background: on ? 'var(--success-500)' : 'var(--border-default)', opacity: locked ? 0.7 : 1, transition: 'background .2s ease',
    }}>
      <span style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease' }}></span>
    </button>
  );
}

function SettingsView() {
  const [tab, setTab] = React.useState('profile'); // profile | payments | selected
  const [open, setOpen] = React.useState(true);
  const [plan, setPlan] = React.useState('yearly'); // monthly | yearly
  const [selected, setSelected] = React.useState(true); // Secili Restoran programi
  const [cash, setCash] = React.useState(true);
  const [doorCard, setDoorCard] = React.useState(true);
  const [cards, setCards] = React.useState({ multinet: true, sodexo: true, setcard: false, ticket: true, metropol: true, pluxee: false });
  const MEAL = window.MEAL_CARDS || {};
  const profilePct = 95;

  const HOURS = [
    ['Pazartesi — Cuma', '10:00 — 23:00'],
    ['Cumartesi', '10:00 — 00:00'],
    ['Pazar', '11:00 — 22:00'],
  ];

  const Row = ({ title, sub, children, locked }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 7 }}>{title}{locked && <Badge tone="neutral" style={{ fontSize: 10 }}>Zorunlu</Badge>}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
      </div>
      {children}
    </div>
  );

  const TABS = [
    { id: 'profile',  label: 'Profil',           icon: 'user' },
    { id: 'payments', label: 'Ödeme Yöntemleri', icon: 'wallet' },
    { id: 'selected', label: 'Abonelik',          icon: 'star' },
    { id: 'rozetler', label: 'Rozetler',          icon: 'trophy' },
  ];

  return (
    <div style={{ padding: RPAD }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Ayarlar</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 18 }}>Restoran profili, ödeme yöntemleri ve Seçili Restoran programı</div>

      {/* Üst sekmeler */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--border-subtle)' }}>
        {TABS.map(t => {
          const on = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', border: 'none', background: 'none',
              cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
              color: on ? 'var(--brand-700)' : 'var(--text-tertiary)',
              borderBottom: on ? '2.5px solid var(--brand-500)' : '2.5px solid transparent',
              marginBottom: -1,
            }}>
              <Icon name={t.icon} size={17} color={on ? 'var(--brand-600)' : 'var(--text-muted)'} />{t.label}
            </button>
          );
        })}
      </div>

      {/* TAB: PROFİL */}
      {tab === 'profile' && (
        <>
          {/* Görünüm — v8 koyu mod */}
          <div style={{ marginBottom: 14 }}>
            <window.ThemeRow subtitle="Panel için açık veya koyu tema seç" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 18 }}>Restoran bilgileri</div>
              {[['Restoran adı', 'Köşe Ocakbaşı'], ['Şube (Branch)', 'Kadıköy'], ['Adres', 'Moda Cad. No:45, Kadıköy, İstanbul'], ['Telefon', '+90 216 345 6789'], ['E-posta', 'kadikoy@koseocakbasi.com'], ['Vergi no', '1234567890']].map(([l, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{l}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
              <button style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                <Icon name="user" size={16} color="var(--brand-500)" />Düzenle
              </button>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Çalışma saatleri</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: open ? 'var(--success-600)' : 'var(--text-tertiary)' }}>{open ? 'Açık' : 'Kapalı'}</span>
                  <SetToggle on={open} onClick={() => setOpen(o => !o)} />
                </div>
              </div>
              {HOURS.map(([day, hrs], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{day}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{hrs}</span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 14, padding: '12px 14px', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)' }}>
                <Icon name="clock" size={16} color="var(--text-muted)" style={{ marginTop: 1, flex: 'none' }} />
                <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.45 }}>Çalışma saatleri dışında sistem otomatik kapanır; restoran listede "Şu an kapalı, açılış: HH:MM" olarak görünür.</span>
              </div>
            </div>
          </div>

          {/* Profil tamamlanma */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Profil tamamlanma</div>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand-600)' }}>%{profilePct}</span>
            </div>
            <div style={{ height: 10, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ width: profilePct + '%', height: '100%', borderRadius: 999, background: 'var(--brand-500)' }}></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[['Evrak yükleme', true], ['Görsel ekleme', true], ['Ürün açıklamaları', true], ['Makro bilgileri', false]].map(([l, done], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: done ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                  <span style={{ width: 18, height: 18, borderRadius: 999, flex: 'none', display: 'grid', placeItems: 'center', background: done ? 'var(--success-50)' : 'var(--bg-sunken)' }}>
                    <Icon name={done ? 'check' : 'clock'} size={11} color={done ? 'var(--success-600)' : 'var(--text-muted)'} />
                  </span>
                  {l}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--brand-50)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <Icon name="star" size={16} color="var(--brand-600)" />
              <span style={{ fontSize: 12.5, color: 'var(--brand-700)', lineHeight: 1.4 }}><strong>%95'in altına düşersen</strong> Seçili Restoran rozetin pasifleşir.</span>
            </div>
          </div>
        </>
      )}

      {/* TAB: ÖDEME YÖNTEMLERİ */}
      {tab === 'payments' && (
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Ödeme yöntemleri</div>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 8 }}>Online ödeme her zaman açıktır ve kapatılamaz. Kapıda ödeme yöntemleri tercihinize bağlıdır.</div>
          <Row title="Online kart (Kredi / Banka)" sub="Iyzico/Stripe provision modeli · kapatılamaz" locked><SetToggle on={true} locked /></Row>
          <Row title="Kimoo Puanı" sub="DB rezervasyon ile çalışır · kapatılamaz" locked><SetToggle on={true} locked /></Row>
          <Row title="Kapıda nakit" sub="Kimoo buluşturucu — tahsilat kapıda"><SetToggle on={cash} onClick={() => setCash(c => !c)} /></Row>
          <Row title="Kapıda kredi kartı" sub="Teslimatta kurye POS ile tahsilat"><SetToggle on={doorCard} onClick={() => setDoorCard(d => !d)} /></Row>

          <div style={{ paddingTop: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Yemek kartları</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)', marginBottom: 12 }}>Her kartı tekil olarak aç/kapat. Yalnızca kapıda geçerlidir; müşteri yalnızca aktif ettiklerinizi görür.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.keys(MEAL).map(k => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: cards[k] ? 'var(--bg-surface)' : 'var(--bg-sunken)' }}>
                  <Icon name="ticket" size={18} color={cards[k] ? 'var(--brand-500)' : 'var(--text-muted)'} />
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{MEAL[k]}</span>
                  <SetToggle on={!!cards[k]} onClick={() => setCards(c => ({ ...c, [k]: !c[k] }))} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: SEÇİLİ RESTORAN */}
      {tab === 'selected' && (
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>Abonelik planı</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
            {[
              { id: 'monthly', name: 'Aylık Abonelik', price: '4.400 TL/ay', note: 'İlk ay ücretsiz · taahhütsüz, esnek' },
              { id: 'yearly', name: 'Yıllık Abonelik', price: '3.900 TL/ay', note: '10 ay öde, 12 ay kullan · 2 ay ücretsiz' },
            ].map(p => {
              const on = plan === p.id;
              return (
                <button key={p.id} onClick={() => setPlan(p.id)} style={{ textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-sans)', background: on ? 'var(--brand-50)' : 'var(--bg-surface)', border: on ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>{p.name}</span>
                    {on && <Badge tone="brand" style={{ fontSize: 10 }}>Aktif</Badge>}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: on ? 'var(--brand-700)' : 'var(--text-primary)', letterSpacing: '-0.02em' }}>{p.price}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4, lineHeight: 1.4 }}>{p.note}</div>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 'var(--radius-md)', background: selected ? 'var(--brand-50)' : 'var(--bg-sunken)', border: selected ? '1.5px solid color-mix(in srgb, var(--brand-500) 35%, transparent)' : '1.5px solid var(--border-subtle)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <Icon name="star" size={20} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Seçili Restoran Programı · +900 TL/ay</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.45 }}>Rozet, ana sayfada öne çıkma, Kimoo Puanı döngüsü, ürün bazlı indirim. Aktivasyon için %95 profil tamamlanma + ücret ödemesi gerekir.</div>
            </div>
            <SetToggle on={selected} onClick={() => setSelected(s => !s)} />
          </div>
          {selected && profilePct < 95 && (
            <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--warning-600)', fontWeight: 600 }}>Profil %95'e ulaşmadan program aktifleşmez.</div>
          )}

          {/* Faydalar listesi */}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Program faydaları</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                ['Ana sayfada öne çıkma', 'star'],
                ['"Seçili" rozet ve kategori', 'star'],
                ['Kimoo Puanı kazanım/kullanım', 'wallet'],
                ['Ürün bazlı %5/%10/%15 indirim', 'tag'],
                ['Havuz kurye bakiye dönüşümü', 'scooter'],
                ['Müşteri bağlılığı raporu', 'heart'],
              ].map(([t, ic], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <span style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <Icon name={ic} size={14} color="var(--brand-600)" />
                  </span>{t}
                </div>
              ))}
            </div>
          </div>

          {/* ELİT RESTORAN — üst kademe */}
          <EliteTierCard />
        </div>
      )}

      {/* TAB: ROZETLER */}
      {tab === 'rozetler' && <RozetlerTab />}
    </div>
  );
}

// ============ ELİT RESTORAN KART ============
function EliteTierCard() {
  return (
    <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 999, background: 'linear-gradient(135deg, var(--text-primary), #1a1a2e)', display: 'grid', placeItems: 'center' }}>
          <Icon name="trophy" size={20} color="var(--warning-500)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Elit Restoran <span style={{ fontSize:11, color:'var(--text-muted)', fontWeight:600 }}>· Kimoo'nun en seçkin kategorisi</span></div>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>+2.800 TL/ay · başvuru ve saha değerlendirmesi gerekir</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Katılım şartları</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['4.7+ puan ortalaması',  'Son 90 günlük ortalama müşteri puanı', 'check'],
            ['Kalite değerlendirmesi','Kimoo saha ekibi yerinde ziyaret ve onay', 'check'],
            ['Niş/özgün kategori',    'Her mahallede bulunmayan, fark yaratan mutfak', 'star'],
            ['Aktif Seçili üyelik',    'Elit, Seçili’nin üzerine eklenir', 'star'],
            ['Başvuru süreci',       'Saha ziyareti → komite → sonuç (5-10 iş günü)', 'star'],
            ['Düşük şikayet oranı',  'Son 90 günde geçerli şikayet oranı < %2', 'check'],
          ].map(([t, sub, ic], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Icon name={ic} size={14} color={ic === 'check' ? 'var(--success-500)' : 'var(--warning-500)'} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{t}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>Elit avantajlar <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>(Seçili Restoran’ın üzerine eklenir)</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          ['trophy', 'Elit kategorisinde listeleme', 'Ayrı “Elit Restoranlar” kategorisi · bölgenizde maks 5-10 işletme'],
          ['bolt',   'Öncelikli sipariş yönlendirme',  'Eşit mesafede Elit işletmeler önce gösterilir'],
          ['gift',   'Kimoo kampanyalarında öncelik',   'Platform geneli kampanyalara otomatik dahil edilirsiniz'],
          ['wallet', 'Artırılmış puan kazanımı',         'Seçili Restoran’a göre %50 daha yüksek puan kazanımı'],
          ['user',   'Dedike hesap yöneticisi',          'Sorun çözme, kampanya danışmanlığı, büyüme stratejisi'],
          ['msg',    'Haftalık performans özeti',       'Her Pazartesi detaylı rapor: trend, geri dönüş, bölge'],
        ].map(([ic, t, sub], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 13px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderLeft: '3px solid var(--text-primary)' }}>
            <Icon name={ic} size={16} color="var(--text-secondary)" style={{ flex: 'none', marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-primary)' }}>{t}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.5 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <button style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--text-primary)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Icon name="trophy" size={18} color="var(--warning-500)" /> Elit Restoran’a başvur
      </button>
      <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>Başvuru → Saha ziyareti → Komite değerlendirmesi → Sonuç (5-10 iş günü)</div>
    </div>
  );
}

// ============ ROZETLER TAB ============
const BADGE_CATEGORIES = [
  {
    id: 'status', label: 'Statü Rozetleri', icon: 'trophy',
    color: 'var(--warning-500)', subtitle: 'Üyelik ve resmi statünüzü gösteren prestij rozetleri',
    badges: [
      { name: 'Seçili Restoran', icon: 'star',   earned: true,  desc: 'Kimoo’nun doğrulanmış iş ortağı. Müşteriler sizi güvenle seçer.', state: 'Aktif · Profilinde' },
      { name: 'Elit Restoran',   icon: 'trophy', earned: false, desc: 'Bölgenizde sadece 5-10 işletme. En prestijli kategori.',         state: 'Başvuru yapabilirsiniz' },
      { name: 'Michelin Yıldızlı', icon: 'star', earned: false,  desc: 'Michelin Rehberi tarafından ödüllendirilmiş.',                  state: 'Harici doğrulama gerekli', locked: true },
    ],
  },
  {
    id: 'satisf', label: 'Memnuniyet Rozetleri', icon: 'heart',
    color: 'var(--error-500)', subtitle: 'Müşterileriniz sizi seviyor — bunu kanıtlayın',
    badges: [
      { name: 'Memnuniyet Abidesi', icon: 'heart', earned: true,  desc: '30 gün üst üste %95+ memnuniyet oranı.',               state: '2 kez kazanıldı' },
      { name: 'Yüksek Puanlı',      icon: 'star',  earned: true,  desc: '3 ay boyunca 4.5+ puan ortalaması.',                   state: 'Profile ekle' },
      { name: 'Misafir Favorisi',   icon: 'heart', earned: false, desc: 'Tekrar sipariş oranı bölgede ilk %10’a girer.',          state: '%68 tamamlandı',  progress: 68 },
      { name: 'Kusursuz Deneyim',   icon: 'check', earned: false, desc: '60 gün boyunca geçerli şikayet alınmaması.',              state: '42/60 gün',         progress: 70 },
    ],
  },
  {
    id: 'perf', label: 'Performans Rozetleri', icon: 'bolt',
    color: 'var(--brand-500)', subtitle: 'Hızınız, hacminiz ve operasyonel gücünüzün ispatı',
    badges: [
      { name: 'Paket Şampiyonu',   icon: 'bag',     earned: true,  desc: 'Bölgenizde ayın en çok teslimat yapan restoranısınız.',  state: '3 kez · Profilinde' },
      { name: 'Hız Ustası',         icon: 'bolt',    earned: true,  desc: 'Bölge ortalamasından %20 daha hızlı hazırlama.',           state: 'Profile ekle' },
      { name: 'Ayın Restoranı',    icon: 'trophy',  earned: false, desc: 'Aylık genel sıralamada 1. olmak.',                       state: 'Sıralama: 3.',           progress: 82 },
      { name: 'Bölgenin Favorisi', icon: 'pin',     earned: false, desc: 'Bölgenizde en çok tercih edilen 3 restorandan biri.',   state: 'Bölge sırası: 5.',        progress: 55 },
      { name: 'Yükselen Yıldız',    icon: 'bolt',    earned: false, desc: 'Son 30 günde sipariş hacmi %50+ artan işletmeler.',     state: 'Artış: %32',             progress: 64 },
    ],
  },
  {
    id: 'qual', label: 'Kalite Rozetleri', icon: 'flame',
    color: 'var(--success-500)', subtitle: 'Lezzetiniz ve özgünlüğünüz takdir ediliyor',
    badges: [
      { name: 'Gurme Rozeti',         icon: 'flame', earned: true,  desc: 'Kimoo kalite ekibi yerinde değerlendirmesi.',           state: 'Profile ekle' },
      { name: 'Şefin İmzası',         icon: 'star',  earned: false, desc: 'Menünüzde özgün, başka yerde bulamayacak imza yemekler.', state: 'Başvuru ile kazanılabilir', locked: true },
      { name: 'Yerel Lezzet Ustası', icon: 'star',  earned: false, desc: 'Bölgesel mutfağı özgün ve otantik temsil.',                state: 'Başvuru ile kazanılabilir', locked: true },
      { name: 'Premium Lezzet',      icon: 'flame', earned: false, desc: 'Üst segment malzeme ve sunum kalitesi.',                 state: 'Başvuru ile kazanılabilir', locked: true },
    ],
  },
  {
    id: 'trust', label: 'Güven Rozetleri', icon: 'check',
    color: 'var(--info-500)', subtitle: 'İstikrarınız ve güvenilirliğiniz zamana yayılmış kanıt',
    badges: [
      { name: 'Güvenilir İşletme',    icon: 'check', earned: true,  desc: '6 aydır kesintisiz, istikrarlı hizmet.',               state: 'Profile ekle' },
      { name: 'Kimoo Onaylı',         icon: 'check', earned: true,  desc: 'Kimoo saha ekibi yerinde ziyaret ve onaylı.',           state: 'Profile ekle' },
      { name: 'Kıdemli İş Ortağı',     icon: 'clock', earned: false, desc: '1 yıldır Kimoo’dasınız. Uzun soluklu ortaklık.',         state: '198/365 gün',           progress: 54 },
      { name: 'Topluluk Destekçisi',  icon: 'gift',  earned: false, desc: 'Kimoo kampanyalarına 5+ kez katılım.',                  state: '3/5 katılım',             progress: 60 },
    ],
  },
];

function RozetlerTab() {
  const allBadges = BADGE_CATEGORIES.flatMap(c => c.badges);
  const earned = allBadges.filter(b => b.earned).length;
  const [showcase, setShowcase] = React.useState(['Seçili Restoran', 'Paket Şampiyonu']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Vitrin */}
      <div style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))', borderRadius: 'var(--radius-lg)', padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Rozet vitrininiz</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Müşteriler profilinizde bu 3 rozeti görür</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-sm)', padding: '6px 14px' }}>
            <span style={{ fontSize: 14, color: 'var(--warning-500)', fontWeight: 800 }}>{earned}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}> / {allBadges.length} rozet kazanıldı</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {showcase.map((name, i) => {
            const b = allBadges.find(x => x.name === name);
            if (!b) return null;
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', padding: '20px 12px', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, background: 'linear-gradient(135deg, var(--warning-500), var(--warning-600))', display: 'grid', placeItems: 'center', margin: '0 auto 10px', boxShadow: '0 4px 14px rgba(245,166,35,0.35)' }}>
                  <Icon name={b.icon} size={26} color="#fff" />
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{b.name}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{b.state}</div>
              </div>
            );
          })}
          {showcase.length < 3 && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.18)', borderRadius: 'var(--radius-md)', padding: '20px 12px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', margin: '0 auto 10px' }}>
                <Icon name="plus" size={22} color="rgba(255,255,255,0.4)" />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Rozet yerleştir</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 3 }}>Boş slot</div>
            </div>
          )}
        </div>
      </div>

      {/* Kategoriler */}
      {BADGE_CATEGORIES.map(cat => (
        <BadgeCategory key={cat.id} cat={cat} onPin={name => setShowcase(s => s.length >= 3 ? s : s.includes(name) ? s : [...s, name])} pinned={showcase} />
      ))}
    </div>
  );
}

function BadgeCategory({ cat, onPin, pinned }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: cat.color, display: 'grid', placeItems: 'center', flex: 'none' }}>
          <Icon name={cat.icon} size={16} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>{cat.label}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cat.subtitle}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
        {cat.badges.map((b, i) => <BadgeCard key={i} b={b} color={cat.color} onPin={() => onPin(b.name)} pinned={pinned.includes(b.name)} />)}
      </div>
    </div>
  );
}

function BadgeCard({ b, color, onPin, pinned }) {
  const earned = b.earned;
  return (
    <div style={{
      padding: 14, borderRadius: 'var(--radius-md)',
      background: earned ? 'color-mix(in srgb, ' + color + ' 8%, var(--bg-surface))' : 'var(--bg-sunken)',
      border: '1px solid ' + (earned ? 'color-mix(in srgb, ' + color + ' 25%, transparent)' : 'var(--border-subtle)'),
      display: 'flex', gap: 11, alignItems: 'flex-start',
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 999, background: earned ? color : 'var(--border-default)', display: 'grid', placeItems: 'center', flex: 'none', opacity: earned ? 1 : 0.45 }}>
        <Icon name={b.icon} size={20} color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: earned ? 'var(--text-primary)' : 'var(--text-muted)' }}>{b.name}</div>
        <div style={{ fontSize: 11, color: earned ? 'var(--text-tertiary)' : 'var(--text-muted)', lineHeight: 1.5, marginTop: 3 }}>{b.desc}</div>
        {b.progress != null && (
          <div style={{ height: 4, background: 'var(--bg-surface)', borderRadius: 999, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ width: b.progress + '%', height: '100%', background: color, opacity: 0.55 }} />
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 7 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: earned ? color : 'var(--text-muted)' }}>{b.locked ? '· ' : earned ? '✓ ' : ''}{b.state}</span>
          {earned && !pinned && (
            <button onClick={onPin} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 800, color: color, fontFamily: 'var(--font-sans)' }}>Vitrine ekle →</button>
          )}
          {pinned && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>Vitrinde</span>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AnalyticsView, CampaignsView, ReviewsView, SettingsView });
