// courier-screens.jsx — Home, Incoming Order, Active Delivery screens
const { Icon, Badge, PrimaryBtn, MediaBox, ScreenHeader, money,
  COURIER_PROFILE, EARNINGS_DATA, INCOMING_ORDER, ACTIVE_ORDERS, PAST_DELIVERIES, NOTIFICATIONS,
  CourierHeader, StatCard, OnlineToggle, OrderActionBtn } = window;

// ============ INCOMING ORDER CARD (home inline) ============
function IncomingOrderCard({ order, onAccept, onReject }) {
  const o = order;
  const [timer, setTimer] = React.useState(30);
  React.useEffect(() => {
    if (timer <= 0) { onReject(); return; }
    const t = setInterval(() => setTimer(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);
  const timerWarn = timer <= 10;
  return (
    <div style={{ padding: '10px 20px 0' }}>
      <div className="screen-fade" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', border: '2px solid var(--brand-500)', padding: 20, boxShadow: 'var(--shadow-lg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'var(--brand-50)' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, position: 'relative' }}>
          <Badge tone="brand" style={{ fontSize: 13, padding: '5px 14px' }}>Yeni Sipariş!</Badge>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 44, height: 44, borderRadius: 999, background: timerWarn ? 'var(--error-50)' : 'var(--bg-sunken)', justifyContent: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: timerWarn ? 'var(--error-500)' : 'var(--text-primary)', lineHeight: 1 }}>{timer}</span>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600 }}>sn</span>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 14, position: 'relative' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--brand-600)', letterSpacing: '-0.02em' }}>{money(o.earnings + o.tip)}</div>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{money(o.earnings)} kazanç + {money(o.tip)} bahşiş</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, position: 'relative' }}>
          <StatCard label="Mesafe" value={o.distance + ' km'} />
          <StatCard label="Süre" value={o.estTime} />
          <StatCard label="Ürün" value={o.items + ' adet'} />
        </div>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          {[['bag', o.restaurant, o.restaurantAddr, 'var(--brand-500)'],['pin', o.customer, o.customerAddr, 'var(--success-500)']].map(([ic, title, addr, c], i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i === 0 ? 10 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: c, display: 'grid', placeItems: 'center' }}>
                  <Icon name={ic} size={13} color="#fff" />
                </div>
                {i === 0 && <div style={{ width: 2, height: 8, background: 'var(--border-default)', marginTop: 3 }}></div>}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 1 }}>{addr}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
          <OrderActionBtn variant="secondary" onClick={onReject} style={{ flex: 0.35 }}>Reddet</OrderActionBtn>
          <OrderActionBtn onClick={onAccept} style={{ flex: 0.65 }}>Kabul et</OrderActionBtn>
        </div>
      </div>
    </div>
  );
}

// ============ HOME / DASHBOARD ============
function CourierHome({ go, online, toggleOnline, orderPhase, onAcceptOrder, onRejectOrder }) {
  const e = EARNINGS_DATA.today;
  return (
    <div style={{ paddingBottom: 120, background: 'var(--bg-app)', minHeight: '100%' }}>
      <CourierHeader
        title={`Merhaba, ${COURIER_PROFILE.name.split(' ')[0]}`}
        subtitle={!online ? 'Çevrimdışısın' : orderPhase === 'active' ? 'Aktif teslimatın var' : orderPhase === 'incoming' ? 'Yeni sipariş geldi!' : 'Sipariş bekleniyor...'}
        right={<OnlineToggle online={online} onToggle={toggleOnline} />}
      />

      {/* ── Dynamic order area ── */}
      {!online && (
        <div style={{ padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 70, height: 70, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', marginBottom: 14 }}>
            <Icon name="scooter" size={32} color="var(--text-muted)" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Çevrimdışısın</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Sipariş almak için çevrimiçi ol</div>
        </div>
      )}

      {online && orderPhase === 'searching' && (
        <div style={{ padding: '28px 20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 14 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '2.5px solid color-mix(in srgb, var(--brand-500) 30%, transparent)', animation: 'radarPulse 2.4s ease-out infinite' }}></div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '2.5px solid color-mix(in srgb, var(--brand-500) 25%, transparent)', animation: 'radarPulse 2.4s ease-out 0.8s infinite' }}></div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '2.5px solid color-mix(in srgb, var(--brand-500) 20%, transparent)', animation: 'radarPulse 2.4s ease-out 1.6s infinite' }}></div>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-brand)' }}>
                <Icon name="scooter" size={24} color="#fff" />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Sipariş aranıyor</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--success-500)', animation: 'kpulse 1.2s infinite' }}></span>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Yakındaki siparişler taranıyor...</span>
          </div>
        </div>
      )}

      {online && orderPhase === 'incoming' && (
        <IncomingOrderCard order={INCOMING_ORDER} onAccept={onAcceptOrder} onReject={onRejectOrder} />
      )}

      {online && orderPhase === 'active' && (
        <div style={{ padding: '10px 20px 0' }}>
          <div onClick={() => go('active')} style={{
            background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: 18,
            color: '#fff', cursor: 'pointer', boxShadow: 'var(--shadow-brand)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -16, top: -16, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, position: 'relative' }}>
              <Icon name="scooter" size={20} color="#fff" />
              <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.03em' }}>AKTİF TESLİMAT</span>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff', animation: 'kpulse 1.2s infinite', marginLeft: 4 }}></span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, position: 'relative' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 2 }}>Restoran</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{INCOMING_ORDER.restaurant}</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 2 }}>Müşteri</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{INCOMING_ORDER.customer}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
              <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                <span>{INCOMING_ORDER.distance} km</span>
                <span>{INCOMING_ORDER.estTime}</span>
                <span style={{ fontWeight: 700 }}>{money(INCOMING_ORDER.earnings + INCOMING_ORDER.tip)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 700 }}>Detaylar <Icon name="chevR" size={16} color="#fff" /></div>
            </div>
          </div>
        </div>
      )}

      {/* Today stats */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>Bugün</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <StatCard label="Teslimat" value={e.deliveries} />
          <StatCard label="Kazanç" value={money(e.gross)} accent="var(--brand-600)" />
          <StatCard label="Bahşiş" value={money(e.tip)} accent="var(--success-600)" />
        </div>
      </div>

      {/* Bonus bar */}
      <div style={{ padding: '14px 20px 0' }}>
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
      <div style={{ padding: '16px 20px 0' }}>
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
      <div style={{ padding: '16px 20px 0' }}>
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
  const order = INCOMING_ORDER;
  const [step, setStep] = React.useState(0); // 0=go to resto,1=pickup,2=go to customer,3=deliver,4=done
  const [code, setCode] = React.useState('');         // teslimat kodu (musteri gosterir)
  const [pickupOk, setPickupOk] = React.useState(false); // siparis dogrulandi
  const [showReport, setShowReport] = React.useState(false);
  const [reported, setReported] = React.useState(null); // 'nocode' | 'nothome'
  const steps = [
    { label: 'Restorana git', desc: order.restaurant + ' · Moda Cad. No:45', action: 'Restorana vardım', icon: 'bag' },
    { label: 'Siparişi al', desc: order.items + ' ürün · #' + order.id, action: 'Siparişi aldım', icon: 'check' },
    { label: 'Müşteriye götür', desc: order.customer + ' · Bahariye No:12 D:5', action: 'Teslim noktasına vardım', icon: 'scooter' },
    { label: order.contactless ? 'Temassız teslimat' : 'Teslimat yap', desc: order.contactless ? 'Kapıya bırak, fotoğraf çek' : 'Müşterinin kodunu gir', action: order.contactless ? 'Fotoğrafı yükle & tamamla' : 'Teslim ettim', icon: 'check' },
    { label: 'Tamamlandı', desc: '', action: null, icon: 'check' },
  ];
  const s = steps[step];
  const isDone = step >= 4;
  // step 3 action gating: standart -> 4 haneli kod; temassiz -> her zaman; rapor edildiyse -> her zaman
  const codeValid = code.length === 4;
  const canAct = step !== 1 ? (step !== 3 ? true : (order.contactless || codeValid || reported)) : pickupOk;

  const next = () => { setStep(p => p + 1); };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Map */}
      <div style={{ position: 'relative', height: 264, flex: 'none' }}>
        <MediaBox h={264} radius="0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, var(--border-subtle) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, var(--border-subtle) 0 1px, transparent 1px 44px)', background: 'var(--bg-sunken)' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 402 264" preserveAspectRatio="none">
          <path d="M70 210 C 150 180, 180 110, 330 70" stroke="var(--brand-500)" strokeWidth="4" fill="none" strokeDasharray={step < 2 ? '2 10' : 'none'} strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', left: step < 2 ? 56 : step < 4 ? 200 : 316, top: step < 2 ? 194 : step < 4 ? 120 : 54,
          width: 36, height: 36, borderRadius: 999, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-md)', transition: 'all .6s ease' }}>
          <Icon name="scooter" size={18} color="#fff" />
        </div>
        <button onClick={() => go('home')} style={{ position: 'absolute', top: 58, left: 16, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.95)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <Icon name="back" size={20} color="#1A1714" />
        </button>
      </div>

      {/* Sheet */}
      <div style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: '22px 22px 0 0', marginTop: -22, position: 'relative', padding: '8px 20px 0', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: 'var(--border-default)', margin: '6px auto 16px' }}></div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i <= step ? 'var(--brand-500)' : 'var(--bg-sunken)', transition: 'background .4s ease' }}></div>
          ))}
        </div>

        {isDone ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12 }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center' }}>
              <Icon name="check" size={38} color="var(--success-500)" />
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>{reported === 'nocode' ? 'Sipariş kapatıldı' : order.contactless ? 'Kapıya bırakıldı!' : 'Teslim edildi!'}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--brand-600)' }}>{money(order.earnings + order.tip)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{money(order.earnings)} net kazanç + {money(order.tip)} bahşiş</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>Her teslimat 97,5 TL KDV dahil · haftalık fatura ile ödenir</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <Icon name={s.icon} size={24} color="var(--brand-600)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{s.label}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>

            {/* contact + nav buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              {step >= 2 && (
                <>
                  <button style={courierMiniBtn}><Icon name="phone" size={18} color="var(--brand-500)" />Ara</button>
                  <button style={courierMiniBtn}><Icon name="msg" size={18} color="var(--brand-500)" />Mesaj</button>
                </>
              )}
              <button style={courierMiniBtn}><Icon name="pin" size={18} color="var(--brand-500)" />Navigasyon</button>
            </div>

            {/* STEP 1 — pickup verification (QR / siparis kodu) */}
            {step === 1 && (
              <div style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Siparişi doğrula</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.45 }}>QR okut veya sipariş numarasını girerek doğru paketi teslim al.</div>
                <button onClick={() => setPickupOk(true)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', borderRadius: 'var(--radius-md)', border: pickupOk ? '1.5px solid var(--success-500)' : '1.5px solid var(--brand-500)', background: pickupOk ? 'var(--success-50)' : 'var(--bg-surface)', color: pickupOk ? 'var(--success-600)' : 'var(--brand-600)', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', marginBottom: 10 }}>
                  <Icon name={pickupOk ? 'check' : 'search'} size={18} color={pickupOk ? 'var(--success-600)' : 'var(--brand-600)'} />{pickupOk ? 'Sipariş doğrulandı · #' + order.id : 'QR kodu okut'}
                </button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={code} onChange={e => { const v = e.target.value.replace(/\D/g,'').slice(0,6); setCode(v); if (v.length >= 4) setPickupOk(true); }} placeholder="Sipariş kodunu gir" inputMode="numeric" style={{ flex: 1, border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '11px 12px', fontSize: 15, fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, letterSpacing: '0.1em', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
                </div>
              </div>
            )}

            {/* STEP 3 — delivery completion */}
            {step === 3 && !reported && (
              order.contactless ? (
                <div style={{ marginBottom: 14 }}>
                  <MediaBox h={140} label="teslimat fotoğrafı çek" radius="var(--radius-md)" />
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 8, textAlign: 'center', lineHeight: 1.45 }}>Paketi kapıya bırak, fotoğraf çek. Kod gerekmez; sipariş otomatik kapanır.</div>
                </div>
              ) : (
                <div style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Teslimat kodu</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.45 }}>Müşterinin gösterdiği 4 haneli kodu gir.</div>
                  <input autoFocus value={code} onChange={e => setCode(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder="– – – –" inputMode="numeric" style={{ width: '100%', textAlign: 'center', border: codeValid ? '1.5px solid var(--success-500)' : '1.5px solid var(--brand-500)', borderRadius: 'var(--radius-md)', padding: '14px 0', fontSize: 28, fontFamily: 'var(--font-mono, monospace)', fontWeight: 800, letterSpacing: '0.4em', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
                  <button onClick={() => setShowReport(v => !v)} style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', padding: 0 }}>
                    <Icon name="msg" size={15} color="var(--text-secondary)" />Kodu alamıyorum · Bildir
                  </button>
                  {showReport && (
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button onClick={() => { setReported('nocode'); }} style={reportOptBtn}>
                        <Icon name="close" size={16} color="var(--warning-600)" /><span style={{ flex: 1, textAlign: 'left' }}>Teslimat kodu alınamadı</span>
                      </button>
                      <button onClick={() => { setReported('nothome'); }} style={reportOptBtn}>
                        <Icon name="msg" size={16} color="var(--info-600)" /><span style={{ flex: 1, textAlign: 'left' }}>Müşteri evde yok — sohbet aç</span>
                      </button>
                    </div>
                  )}
                </div>
              )
            )}

            {/* report acknowledged states */}
            {step === 3 && reported === 'nocode' && (
              <div style={{ background: 'var(--warning-50)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 14, display: 'flex', gap: 10 }}>
                <Icon name="check" size={18} color="var(--warning-600)" style={{ flex: 'none', marginTop: 1 }} />
                <div style={{ fontSize: 13, color: 'var(--warning-700)', lineHeight: 1.45 }}>"Teslimat kodu alınamadı" işaretlendi. Onayla'ya basınca sipariş kapanır.</div>
              </div>
            )}
            {step === 3 && reported === 'nothome' && (
              <div style={{ background: 'var(--info-50)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 14, display: 'flex', gap: 10 }}>
                <Icon name="msg" size={18} color="var(--info-600)" style={{ flex: 'none', marginTop: 1 }} />
                <div style={{ fontSize: 13, color: 'var(--info-600)', lineHeight: 1.45 }}>Müşteriyle sohbet açıldı. Cevap gelmezse sorumluluk müşteridedir; iade yapılmaz, restoran ödemesi gerçekleşir.</div>
              </div>
            )}
          </>
        )}

        {/* Action */}
        <div style={{ padding: '14px 0 34px', marginTop: 'auto' }}>
          {isDone ? (
            <OrderActionBtn onClick={() => go('home')}>Anasayfaya dön</OrderActionBtn>
          ) : (
            <button onClick={canAct ? next : undefined} disabled={!canAct} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, color: '#fff', width: '100%',
              background: 'var(--brand-500)', border: 'none', borderRadius: 999, padding: '15px 22px',
              cursor: canAct ? 'pointer' : 'not-allowed', opacity: canAct ? 1 : 0.45,
              boxShadow: canAct ? 'var(--shadow-brand)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Icon name={step < 3 ? 'chevR' : 'check'} size={20} color="#fff" />{reported === 'nocode' ? 'Siparişi kapat' : s.action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
const courierMiniBtn = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' };
const reportOptBtn = { display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', width: '100%' };

Object.assign(window, { CourierHome, IncomingOrderCard, IncomingOrderScreen, ActiveDeliveryScreen });
