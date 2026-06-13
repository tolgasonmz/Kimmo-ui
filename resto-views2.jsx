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
function SettingsView() {
  const [open, setOpen] = React.useState(true);
  const HOURS = [
    ['Pazartesi — Cuma', '10:00 — 23:00'],
    ['Cumartesi', '10:00 — 00:00'],
    ['Pazar', '11:00 — 22:00'],
  ];

  return (
    <div style={{ padding: RPAD }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20 }}>Ayarlar</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Restaurant info */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 18 }}>Restoran bilgileri</div>
          {[['Restoran adı', 'Köşe Ocakbaşı'], ['Şube', 'Kadıköy'], ['Adres', 'Moda Cad. No:45, Kadıköy, İstanbul'], ['Telefon', '+90 216 345 6789'], ['E-posta', 'kadikoy@koseocakbasi.com']].map(([l, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{l}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
          <button style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
            <Icon name="user" size={16} color="var(--brand-500)" />Düzenle
          </button>
        </div>

        {/* Operating hours */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Çalışma saatleri</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: open ? 'var(--success-600)' : 'var(--text-tertiary)' }}>{open ? 'Açık' : 'Kapalı'}</span>
              <button onClick={() => setOpen(o => !o)} style={{
                width: 44, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative',
                background: open ? 'var(--success-500)' : 'var(--border-default)', transition: 'background .2s ease',
              }}>
                <span style={{ position: 'absolute', top: 3, left: open ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease' }}></span>
              </button>
            </div>
          </div>
          {HOURS.map(([day, hrs], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{day}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{hrs}</span>
            </div>
          ))}

          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Abonelik planı</div>
            <div style={{ background: 'var(--brand-50)', borderRadius: 'var(--radius-md)', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Badge tone="brand" style={{ fontSize: 13, padding: '5px 14px' }}>Profesyonel</Badge>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>₺999/ay · Sınırsız sipariş</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AnalyticsView, CampaignsView, ReviewsView, SettingsView });
