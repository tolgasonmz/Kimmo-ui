// courier-screens.jsx — Home, Incoming Order, Active Delivery screens
const { Icon, Badge, PrimaryBtn, MediaBox, ScreenHeader, money,
  COURIER_PROFILE, EARNINGS_DATA, INCOMING_ORDER, ACTIVE_ORDERS, PAST_DELIVERIES, NOTIFICATIONS,
  CourierHeader, StatCard, OnlineToggle, OrderActionBtn } = window;

// ============ HOME / DASHBOARD ============
function CourierHome({ go, online, setOnline }) {
  const e = EARNINGS_DATA.today;
  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <CourierHeader
        title={`Merhaba, ${COURIER_PROFILE.name.split(' ')[0]}`}
        subtitle={online ? 'Sipariş bekleniyor...' : 'Çevrimdışısın'}
        right={<OnlineToggle online={online} onToggle={() => setOnline(o => !o)} />}
      />

      {/* Active order banner */}
      {online && (
        <div style={{ padding: '10px 20px 0' }}>
          <div onClick={() => go('active')} style={{
            background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: 18,
            color: '#fff', cursor: 'pointer', boxShadow: 'var(--shadow-brand)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -16, top: -16, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, position: 'relative' }}>
              <Icon name="scooter" size={20} color="#fff" />
              <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.03em' }}>AKTİF TESLİMAT</span>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff', animation: 'kpulse 1.2s infinite', marginLeft: 4 }}></span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, position: 'relative' }}>Köşe Ocakbaşı → Elif Y.</div>
            <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4, position: 'relative' }}>2.4 km · ₺42 kazanç</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, fontSize: 14, fontWeight: 700, position: 'relative' }}>Detaylar <Icon name="chevR" size={16} color="#fff" /></div>
          </div>
        </div>
      )}

      {/* Today stats */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Bugün</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <StatCard label="Teslimat" value={e.deliveries} />
          <StatCard label="Kazanç" value={money(e.gross)} accent="var(--brand-600)" />
          <StatCard label="Bahşiş" value={money(e.tip)} accent="var(--success-600)" />
        </div>
      </div>

      {/* Bonus bar */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ background: 'var(--warning-50)', border: '1px solid color-mix(in srgb, var(--warning-500) 20%, transparent)', borderRadius: 'var(--radius-md)', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 999, background: 'var(--warning-500)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <Icon name="flame" size={22} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Yoğun saat bonusu!</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>20:00-22:00 arası teslimat başına +₺15</div>
          </div>
        </div>
      </div>

      {/* Recent deliveries */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Son teslimatlar</span>
          <button onClick={() => go('earnings')} style={{ background: 'none', border: 'none', color: 'var(--brand-600)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Tümünü gör</button>
        </div>
        {PAST_DELIVERIES.slice(0, 3).map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center' }}>
              <Icon name="bag" size={18} color="var(--text-tertiary)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{d.restaurant}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{d.time} · #{d.id}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{money(d.earnings)}</div>
              {d.tip > 0 && <div style={{ fontSize: 11, color: 'var(--success-600)' }}>+{money(d.tip)} bahşiş</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Notifications preview */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Bildirimler</div>
        {NOTIFICATIONS.slice(0, 2).map((n, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, flex: 'none', display: 'grid', placeItems: 'center',
              background: n.type === 'bonus' ? 'var(--warning-50)' : n.type === 'success' ? 'var(--success-50)' : 'var(--info-50)',
            }}>
              <Icon name={n.type === 'bonus' ? 'flame' : n.type === 'success' ? 'star' : 'msg'} size={18}
                color={n.type === 'bonus' ? 'var(--warning-600)' : n.type === 'success' ? 'var(--success-600)' : 'var(--info-600)'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{n.desc}</div>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', flex: 'none' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ INCOMING ORDER (modal-style) ============
function IncomingOrderScreen({ go, onAccept, onReject }) {
  const o = INCOMING_ORDER;
  const [timer, setTimer] = React.useState(30);
  React.useEffect(() => {
    if (timer <= 0) { onReject(); return; }
    const t = setInterval(() => setTimer(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Map area */}
      <div style={{ position: 'relative', height: 260, flex: 'none' }}>
        <MediaBox h={260} radius="0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, var(--border-subtle) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, var(--border-subtle) 0 1px, transparent 1px 44px)', background: 'var(--bg-sunken)' }} />
        {/* Route visualization */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 402 260" preserveAspectRatio="none">
          <path d="M80 200 C 160 160, 200 100, 320 80" stroke="var(--brand-500)" strokeWidth="4" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', left: 66, top: 184, width: 30, height: 30, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-md)' }}>
          <Icon name="bag" size={15} color="#fff" />
        </div>
        <div style={{ position: 'absolute', left: 306, top: 64, width: 30, height: 30, borderRadius: 999, background: 'var(--success-500)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-md)' }}>
          <Icon name="pin" size={15} color="#fff" />
        </div>
        {/* timer circle */}
        <div style={{ position: 'absolute', top: 60, right: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 999, background: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: timer <= 10 ? 'var(--error-500)' : 'var(--text-primary)' }}>{timer}</span>
            <span style={{ fontSize: 9, color: 'var(--text-tertiary)', fontWeight: 600 }}>sn</span>
          </div>
        </div>
      </div>

      {/* Sheet */}
      <div style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: '22px 22px 0 0', marginTop: -22, position: 'relative', padding: '8px 20px 0', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: 'var(--border-default)', margin: '6px auto 16px' }}></div>

        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <Badge tone="brand" style={{ fontSize: 13, padding: '5px 14px' }}>Yeni sipariş!</Badge>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--brand-600)', letterSpacing: '-0.02em' }}>{money(o.earnings + o.tip)}</div>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{money(o.earnings)} kazanç + {money(o.tip)} bahşiş</div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <StatCard label="Mesafe" value={o.distance + ' km'} />
          <StatCard label="Süre" value={o.estTime} />
          <StatCard label="Ürün" value={o.items} />
        </div>

        {/* Route */}
        <div style={{ flex: 1 }}>
          {[
            ['bag', o.restaurant, o.restaurantAddr, 'var(--brand-500)'],
            ['pin', o.customer, o.customerAddr, 'var(--success-500)'],
          ].map(([ic, title, addr, c], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: c, display: 'grid', placeItems: 'center' }}>
                  <Icon name={ic} size={16} color="#fff" />
                </div>
                {i === 0 && <div style={{ width: 2, height: 16, background: 'var(--border-default)', marginTop: 4 }}></div>}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{addr}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ padding: '14px 0 34px', display: 'flex', gap: 12 }}>
          <OrderActionBtn variant="secondary" onClick={onReject} style={{ flex: 0.4 }}>Reddet</OrderActionBtn>
          <OrderActionBtn onClick={onAccept} style={{ flex: 0.6 }}>Kabul et</OrderActionBtn>
        </div>
      </div>
    </div>
  );
}

// ============ ACTIVE DELIVERY ============
function ActiveDeliveryScreen({ go }) {
  const [step, setStep] = React.useState(0); // 0=going to restaurant, 1=at restaurant, 2=picked up/delivering, 3=arrived, 4=delivered
  const steps = [
    { label: 'Restorana git', desc: 'Köşe Ocakbaşı · Moda Cad. No:45', action: 'Restorana vardım', icon: 'bag' },
    { label: 'Siparişi al', desc: '3 ürün · #KM-4833', action: 'Siparişi aldım', icon: 'check' },
    { label: 'Müşteriye götür', desc: 'Elif Y. · Bahariye No:12 D:5', action: 'Teslim noktasına vardım', icon: 'scooter' },
    { label: 'Teslimat yap', desc: 'Kapıda teslim et', action: 'Teslim ettim', icon: 'check' },
    { label: 'Tamamlandı', desc: '', action: null, icon: 'check' },
  ];
  const s = steps[step];
  const isDone = step >= 4;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Map */}
      <div style={{ position: 'relative', height: 300, flex: 'none' }}>
        <MediaBox h={300} radius="0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, var(--border-subtle) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, var(--border-subtle) 0 1px, transparent 1px 44px)', background: 'var(--bg-sunken)' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 402 300" preserveAspectRatio="none">
          <path d="M70 240 C 150 200, 180 120, 330 80" stroke="var(--brand-500)" strokeWidth="4" fill="none" strokeDasharray={step < 2 ? '2 10' : 'none'} strokeLinecap="round" />
        </svg>
        {/* Courier dot */}
        <div style={{ position: 'absolute', left: step < 2 ? 56 : step < 4 ? 200 : 316, top: step < 2 ? 224 : step < 4 ? 140 : 64,
          width: 36, height: 36, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-md)', transition: 'all .6s ease' }}>
          <Icon name="scooter" size={18} color="#fff" />
        </div>
        {/* Destination pin */}
        <div style={{ position: 'absolute', left: step < 2 ? 56 : 316, top: step < 2 ? 224 : 64, width: 26, height: 26, borderRadius: 999,
          background: step < 2 ? 'var(--brand-50)' : 'var(--success-500)', border: step < 2 ? '2px solid var(--brand-500)' : 'none',
          display: 'grid', placeItems: 'center', transition: 'all .6s ease' }}>
          <Icon name="pin" size={13} color={step < 2 ? 'var(--brand-600)' : '#fff'} />
        </div>

        <button onClick={() => go('home')} style={{ position: 'absolute', top: 58, left: 16, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.95)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <Icon name="back" size={20} color="#1A1714" />
        </button>
      </div>

      {/* Sheet */}
      <div style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: '22px 22px 0 0', marginTop: -22, position: 'relative', padding: '8px 20px 0', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: 'var(--border-default)', margin: '6px auto 16px' }}></div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i <= step ? 'var(--brand-500)' : 'var(--bg-sunken)', transition: 'background .4s ease' }}></div>
          ))}
        </div>

        {isDone ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 14 }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center' }}>
              <Icon name="check" size={38} color="var(--success-500)" />
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Teslim edildi!</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--brand-600)' }}>{money(52)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>₺42 kazanç + ₺10 bahşiş</div>
          </div>
        ) : (
          <>
            {/* Current step */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center' }}>
                <Icon name={s.icon} size={24} color="var(--brand-600)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{s.label}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>

            {/* Contact + order info */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              {step >= 2 && (
                <>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                    <Icon name="phone" size={18} color="var(--brand-500)" />Ara
                  </button>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                    <Icon name="msg" size={18} color="var(--brand-500)" />Mesaj
                  </button>
                </>
              )}
              <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                <Icon name="pin" size={18} color="var(--brand-500)" />Navigasyon
              </button>
            </div>
          </>
        )}

        {/* Action */}
        <div style={{ padding: '14px 0 34px', marginTop: 'auto' }}>
          {isDone ? (
            <OrderActionBtn onClick={() => go('home')}>Anasayfaya dön</OrderActionBtn>
          ) : (
            <OrderActionBtn onClick={() => setStep(s => s + 1)}>
              <Icon name={step < 3 ? 'chevR' : 'check'} size={20} color="#fff" />{s.action}
            </OrderActionBtn>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CourierHome, IncomingOrderScreen, ActiveDeliveryScreen });
