// courier-screens2.jsx — Earnings, Performance, Profile, Support
const { Icon, Badge, money, ScreenHeader,
  COURIER_PROFILE, EARNINGS_DATA, DAILY_CHART, PAST_DELIVERIES, NOTIFICATIONS,
  CourierHeader, StatCard, OrderActionBtn } = window;

// ============ EARNINGS ============
function EarningsScreen({ go }) {
  const [period, setPeriod] = React.useState('today');
  const data = EARNINGS_DATA[period];
  const max = Math.max(...DAILY_CHART.map(d => d.val));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Kazançlarım" onBack={() => go('home')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 24px' }}>
        {/* Period tabs */}
        <div style={{ display: 'flex', gap: 2, padding: 4, background: 'var(--bg-sunken)', borderRadius: 999, marginTop: 14, marginBottom: 20 }}>
          {[['today', 'Bugün'], ['week', 'Hafta'], ['month', 'Ay']].map(([k, l]) => (
            <button key={k} onClick={() => setPeriod(k)} style={{
              flex: 1, padding: '9px 0', borderRadius: 999, fontSize: 13, fontWeight: 700,
              background: period === k ? 'var(--bg-surface)' : 'transparent',
              color: period === k ? 'var(--text-primary)' : 'var(--text-tertiary)',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              boxShadow: period === k ? 'var(--shadow-sm)' : 'none', transition: 'all .15s ease',
            }}>{l}</button>
          ))}
        </div>

        {/* Total */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4 }}>Toplam kazanç</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{money(data.gross + data.tip + data.bonus)}</div>
        </div>

        {/* Breakdown */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <StatCard label="Teslimat" value={data.deliveries} />
          <StatCard label="Kazanç" value={money(data.gross)} />
          <StatCard label="Bahşiş" value={money(data.tip)} accent="var(--success-600)" />
          <StatCard label="Bonus" value={money(data.bonus)} accent="var(--warning-600)" />
        </div>

        {/* Chart (week view) */}
        {period === 'week' && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>Günlük dağılım</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, padding: '0 4px' }}>
              {DAILY_CHART.map((d, i) => {
                const pct = (d.val / max) * 100;
                const isToday = i === 5;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)' }}>{money(d.val)}</span>
                    <div style={{ width: '100%', height: pct + '%', minHeight: 8, borderRadius: 'var(--radius-xs)',
                      background: isToday ? 'var(--brand-500)' : 'var(--bg-sunken)', transition: 'height .3s ease' }}></div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: isToday ? 'var(--brand-600)' : 'var(--text-muted)' }}>{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>İstatistikler</div>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {[
              ['Aktif süre', data.hours + ' saat'],
              ['Ort. teslimat başı', money(Math.round(data.gross / data.deliveries))],
              ['Ort. bahşiş', money(Math.round(data.tip / data.deliveries))],
              ['Kabul oranı', '%94'],
            ].map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 16px', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{l}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Teslimat geçmişi</div>
        {PAST_DELIVERIES.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center' }}>
              <Icon name="bag" size={16} color="var(--text-tertiary)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{d.restaurant}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{d.time}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{money(d.earnings + d.tip)}</div>
              <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {[1,2,3,4,5].map(n => (
                  <svg key={n} width={10} height={10} viewBox="0 0 24 24" fill={n <= d.rating ? 'var(--warning-500)' : 'var(--border-default)'} stroke="none">
                    <path d="M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ PROFILE ============
function CourierProfileScreen({ go }) {
  const p = COURIER_PROFILE;
  const items = [
    ['user', 'Kişisel bilgilerim', null],
    ['scooter', 'Araç bilgilerim', null],
    ['wallet', 'Banka hesabım', null],
    ['bag', 'Teslimat geçmişi', 'earnings'],
    ['close', 'Sorun bildir', 'support'],
    ['star', 'Performans', 'performance'],
  ];

  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <div style={{ paddingTop: 56, padding: '56px 20px 24px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 24, fontWeight: 800, boxShadow: 'var(--shadow-brand)' }}>{p.initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Badge tone="brand" style={{ fontSize: 11 }}>{p.level}</Badge>
              <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>★ {p.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <StatCard label="Toplam teslimat" value={p.totalDeliveries.toLocaleString('tr-TR')} />
          <StatCard label="Puan" value={p.rating} accent="var(--warning-600)" />
          <StatCard label="Üyelik" value={p.memberSince.split(' ')[0]} sub={p.memberSince.split(' ')[1]} />
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {items.map(([ic, label, nav], i) => (
            <div key={i} onClick={() => nav && go(nav)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 16px', borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none', cursor: nav ? 'pointer' : 'default' }}>
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

// ============ PERFORMANCE ============
function PerformanceScreen({ go }) {
  const stats = [
    { label: 'Genel puan', value: '4.92', icon: 'star', color: 'var(--warning-600)', target: '4.50+' },
    { label: 'Kabul oranı', value: '%94', icon: 'check', color: 'var(--success-600)', target: '%80+' },
    { label: 'Zamanında teslimat', value: '%97', icon: 'clock', color: 'var(--brand-600)', target: '%90+' },
    { label: 'İptal oranı', value: '%2', icon: 'close', color: 'var(--success-600)', target: '%5 altı' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Performans" onBack={() => go('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 20px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ width: 90, height: 90, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--brand-600)' }}>4.92</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>/ 5.00</div>
            </div>
          </div>
          <Badge tone="brand" style={{ fontSize: 13, padding: '6px 16px' }}>Altın Kurye</Badge>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={s.icon} size={18} color={s.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Hedef</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-tertiary)' }}>{s.target}</div>
                </div>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', borderRadius: 999, background: s.color }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Puanını yükselt</div>
          {[
            'Siparişi zamanında teslim et',
            'Müşteri ile nazik iletişim kur',
            'Paketleri dikkatli taşı',
            'Kabul oranını yüksek tut',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
              <div style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center' }}>
                <Icon name="check" size={13} color="var(--success-600)" />
              </div>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ COURIER REPORT ============
function CourierReportScreen({ go }) {
  const [type, setType] = React.useState(null);
  const [reason, setReason] = React.useState(null);
  const [detail, setDetail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const TYPES = [
    { id: 'restaurant', icon: 'flame', label: 'Restoran hakkında', desc: 'Uzun bekleme, yanlış paket, kapalı restoran' },
    { id: 'customer', icon: 'user', label: 'Müşteri hakkında', desc: 'Ulaşılamıyor, yanlış adres, uygunsuz davranış' },
    { id: 'safety', icon: 'close', label: 'Güvenlik sorunu', desc: 'Kaza, hasar, tehlike bildirimi' },
    { id: 'app', icon: 'msg', label: 'Uygulama / sistem', desc: 'Navigasyon hatası, ödeme sorunu, teknik sorun' },
  ];

  const REASONS = {
    restaurant: ['Sipariş uzun süre hazırlanmadı', 'Yanlış / eksik paket verildi', 'Restoran kapalıydı', 'Restoran çalışanı kaba davrandı', 'Diğer'],
    customer: ['Müşteriye ulaşılamadı', 'Adres yanlış / eksik', 'Müşteri uygunsuz davrandı', 'Kapıyı açmadı', 'Diğer'],
    safety: ['Trafik kazası', 'Araç arızası', 'Paket hasar gördü', 'Kişisel güvenlik tehdidi', 'Diğer'],
    app: ['Navigasyon yanlış yönlendirdi', 'Sipariş bilgisi hatalı', 'Ödeme yansımadı', 'Uygulama çöktü', 'Diğer'],
  };

  if (submitted) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
            <Icon name="check" size={40} color="var(--success-500)" />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Rapor gönderildi</div>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '28ch' }}>Bildirimin yönetici ekibine iletildi. Sonucu bildirimlerinden takip edebilirsin.</div>
          <div style={{ marginTop: 16, padding: '8px 16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', fontSize: 13, color: 'var(--text-tertiary)' }}>Takip: #RPT-{Math.floor(1000 + Math.random() * 9000)}</div>
        </div>
        <div style={{ padding: '16px 24px 40px' }}>
          <button onClick={() => go('home')} style={{ width: '100%', padding: '15px 0', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>Anasayfaya dön</button>
        </div>
      </div>
    );
  }

  const reasons = REASONS[type] || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Sorun Bildir" onBack={() => type && !reason ? setType(null) : reason ? setReason(null) : go('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 20px 20px' }}>
        {/* Step 1 */}
        {!type && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, marginTop: 8 }}>Ne hakkında bildirim yapmak istiyorsun?</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>Bildirimin doğrudan yönetici ekibine iletilecek.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TYPES.map(t => (
                <button key={t.id} onClick={() => setType(t.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: 18, borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', textAlign: 'left',
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 999, background: t.id === 'safety' ? 'var(--error-50)' : 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <Icon name={t.icon} size={22} color={t.id === 'safety' ? 'var(--error-600)' : 'var(--brand-600)'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{t.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{t.desc}</div>
                  </div>
                  <Icon name="chevR" size={18} color="var(--text-tertiary)" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2 */}
        {type && !reason && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, marginTop: 8 }}>Sorun ne ile ilgili?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {reasons.map((r, i) => (
                <button key={i} onClick={() => setReason(r)} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left',
                }}>
                  <span style={{ flex: 1 }}>{r}</span>
                  <Icon name="chevR" size={16} color="var(--text-tertiary)" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 3 */}
        {type && reason && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, marginTop: 8 }}>Detayları ekle</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              <Badge tone="brand" style={{ fontSize: 12 }}>{TYPES.find(t => t.id === type)?.label}</Badge>
              <Badge tone="warning" style={{ fontSize: 12 }}>{reason}</Badge>
            </div>
            <textarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="Yaşadığın sorunu detaylı olarak açıkla..." rows={4} style={{
              width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-md)',
              padding: 14, fontSize: 15, fontFamily: 'var(--font-sans)', resize: 'none', outline: 'none',
              background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box',
            }} />
            <div style={{ marginTop: 16, border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: 18, textAlign: 'center', cursor: 'pointer' }}>
              <Icon name="plus" size={22} color="var(--text-muted)" style={{ margin: '0 auto 6px', display: 'block' }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Fotoğraf ekle</div>
            </div>
            <div style={{ marginTop: 16, padding: 14, background: 'var(--info-50)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--info-600)', lineHeight: 1.5 }}>
              Raporun yönetici ekibine iletilecek ve <strong>24 saat içinde</strong> değerlendirilecektir.
            </div>
          </>
        )}
      </div>
      {type && reason && (
        <div style={{ padding: '14px 20px 36px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
          <button onClick={() => setSubmitted(true)} style={{ width: '100%', padding: '15px 0', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>Rapor gönder</button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { EarningsScreen, CourierProfileScreen, PerformanceScreen, CourierReportScreen });
