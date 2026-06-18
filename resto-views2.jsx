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

// ============ CAMPAIGNS ============
function CampaignsView() {
  return (
    <div style={{ padding: RPAD }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Kampanyalar</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>{CAMPAIGNS.length} kampanya</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>
          <Icon name="plus" size={18} color="#fff" />Kampanya oluştur
        </button>
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Aktif kampanya" value={CAMPAIGNS.filter(c=>c.status==='active').length} icon="tag" />
        <MetricCard label="Kampanya siparişi" value="401" change="%28" changeUp icon="bag" />
        <MetricCard label="Kampanya cirosu" value="₺59.800" change="%34" changeUp icon="wallet" />
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: 1 }}>Kampanya</span>
          <span style={{ flex: '0 0 100px' }}>Tür</span>
          <span style={{ flex: '0 0 120px' }}>Tarih</span>
          <span style={{ flex: '0 0 80px' }}>Sipariş</span>
          <span style={{ flex: '0 0 100px' }}>Ciro</span>
          <span style={{ flex: '0 0 80px' }}>Durum</span>
        </TableHeader>
        {CAMPAIGNS.map(c => (
          <TableRow key={c.id}>
            <span style={{ flex: 1, fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{c.name}</span>
            <span style={{ flex: '0 0 100px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.type}</span>
            <span style={{ flex: '0 0 120px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.startDate} — {c.endDate}</span>
            <span style={{ flex: '0 0 80px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.orders}</span>
            <span style={{ flex: '0 0 100px', fontWeight: 700, color: 'var(--text-primary)' }}>{money(c.revenue)}</span>
            <span style={{ flex: '0 0 80px' }}>
              <Badge tone={c.status === 'active' ? 'success' : 'neutral'} style={{ fontSize: 11 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: c.status === 'active' ? 'var(--success-500)' : 'var(--text-muted)' }}></span>
                {c.status === 'active' ? 'Aktif' : 'Bitti'}
              </Badge>
            </span>
          </TableRow>
        ))}
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
    { id: 'selected', label: 'Seçili Restoran',  icon: 'star' },
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
        </div>
      )}
    </div>
  );
}

Object.assign(window, { AnalyticsView, CampaignsView, ReviewsView, SettingsView });
