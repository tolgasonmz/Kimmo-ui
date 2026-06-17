// kimoo-screens2.jsx — product, cart, checkout, tracking. Depends on shared globals.
const { Icon, MediaBox, Badge, PrimaryBtn, ScreenHeader, money, PRODUCT_OPTIONS, MEAL_CARDS, KIMOO_PUAN, puanUsable, puanEarn } = window;
const PAD2 = 16;

// ============================ PRODUCT CUSTOMIZE ============================
function ProductScreen({ product, go, addToCart }) {
  const [sel, setSel] = React.useState({ size: 'tek', extras: [], spice: 'az' });
  const [qty, setQty] = React.useState(1);
  const [note, setNote] = React.useState('');

  const extra = (groupKey, item) => {
    const g = PRODUCT_OPTIONS[groupKey];
    if (g.type === 'radio') setSel(s => ({ ...s, [groupKey]: item.id }));
    else setSel(s => ({ ...s, [groupKey]: s[groupKey].includes(item.id) ? s[groupKey].filter(x => x !== item.id) : [...s[groupKey], item.id] }));
  };
  const isSel = (groupKey, id) => PRODUCT_OPTIONS[groupKey].type === 'radio' ? sel[groupKey] === id : sel[groupKey].includes(id);

  const addOnTotal = Object.entries(PRODUCT_OPTIONS).reduce((sum, [k, g]) => {
    return sum + g.items.filter(i => isSel(k, i.id)).reduce((s, i) => s + i.price, 0);
  }, 0);
  const unit = product.price + addOnTotal;
  const total = unit * qty;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ position: 'relative' }}>
          <MediaBox h={230} label="ürün görseli" radius="0">
            <button onClick={() => go('restaurant')} style={{ position: 'absolute', top: 58, left: 16, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Icon name="back" size={20} color="#1A1714" /></button>
          </MediaBox>
        </div>
        <div style={{ padding: '20px 16px 24px', background: 'var(--bg-surface)' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>{product.name}</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>{product.desc}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--brand-600)', marginTop: 12 }}>{money(product.price)}</div>

          {/* Allergen / calorie info */}
          {product.cal && (
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <div style={{ padding: '8px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="flame" size={16} color="var(--warning-500)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{product.cal} kcal</span>
              </div>
              <div style={{ padding: '8px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="clock" size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>15-20 dk</span>
              </div>
            </div>
          )}

          {Object.entries(PRODUCT_OPTIONS).map(([key, g]) => (
            <div key={key} style={{ marginTop: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{g.label}</span>
                {g.required ? <Badge tone="neutral" style={{ fontSize: 10 }}>Zorunlu</Badge> : <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>İsteğe bağlı</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {g.items.map(item => {
                  const on = isSel(key, item.id);
                  return (
                    <button key={item.id} onClick={() => extra(key, item)} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                      background: on ? 'var(--brand-50)' : 'var(--bg-surface)', border: on ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-subtle)', transition: 'all .12s ease', textAlign: 'left',
                    }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: g.type === 'radio' ? '50%' : 6, flex: 'none',
                        border: on ? '2px solid var(--brand-500)' : '1.5px solid var(--border-strong)',
                        background: on && g.type === 'check' ? 'var(--brand-500)' : 'transparent',
                        display: 'grid', placeItems: 'center',
                      }}>
                        {on && g.type === 'radio' && <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--brand-500)' }} />}
                        {on && g.type === 'check' && <Icon name="check" size={14} color="#fff" />}
                      </span>
                      <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{item.label}</span>
                      {item.price > 0 && <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>+{money(item.price)}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {/* Kitchen note */}
          <div style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Mutfağa not</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>İsteğe bağlı</span>
            </div>
            <textarea value={note} onChange={e => setNote(e.target.value.slice(0, 200))} placeholder="Ör: Acısız olsun, soğansız hazırlayın..." rows={3} style={{ width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '12px 14px', fontSize: 14, fontFamily: 'var(--font-sans)', resize: 'none', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)', boxSizing: 'border-box', lineHeight: 1.5 }} />
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, textAlign: 'right' }}>{note.length}/200</div>
          </div>

          {/* Related suggestion */}
          <div style={{ marginTop: 20, padding: '14px', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Bununla da güzel gider</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{name:'Ayran', price:35, emoji:'🥛'}, {name:'Şalgam', price:25, emoji:'🍷'}].map((s,i) => (
                <div key={i} style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                  <span style={{ fontSize: 20 }}>{s.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-600)' }}>{money(s.price)}</div>
                  </div>
                  <div style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center' }}>
                    <Icon name="plus" size={14} color="var(--brand-600)" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* sticky action bar */}
      <div style={{ padding: '14px 16px 30px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 6px', border: '1.5px solid var(--border-default)', borderRadius: 999, flex: 'none' }}>
          <button onClick={() => setQty(q => Math.max(1, q - 1))} style={qbtn}><Icon name="minus" size={18} color="var(--text-primary)" /></button>
          <span style={{ fontSize: 17, fontWeight: 700, minWidth: 18, textAlign: 'center', color: 'var(--text-primary)' }}>{qty}</span>
          <button onClick={() => setQty(q => q + 1)} style={qbtn}><Icon name="plus" size={18} color="var(--text-primary)" /></button>
        </div>
        <PrimaryBtn onClick={() => addToCart(product, sel, qty, unit)} style={{ flex: 1 }}>
          <span>Sepete ekle</span><span style={{ fontWeight: 800 }}>{money(total)}</span>
        </PrimaryBtn>
      </div>
    </div>
  );
}
const qbtn = { width: 32, height: 32, borderRadius: 999, border: 'none', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', cursor: 'pointer' };

// ============================ CART ============================
function CartScreen({ cart, go, updateQty, removeItem, restaurant }) {
  const subtotal = cart.reduce((s, i) => s + i.unit * i.qty, 0);
  const [coupon, setCoupon] = React.useState(false);
  const fee = restaurant?.fee ?? 0;
  const discount = coupon ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal + fee - discount;

  if (!cart.length) {
    return (
      <div>
        <ScreenHeader title="Sepetim" onBack={() => go('home')} />
        <div style={{ padding: '80px 32px', textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}><Icon name="bag" size={38} color="var(--text-muted)" /></div>
          <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)' }}>Sepetin boş</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '8px 0 24px' }}>Hadi lezzetli bir şeyler ekleyelim.</div>
          <PrimaryBtn full={false} onClick={() => go('home')} style={{ margin: '0 auto' }}>Keşfet</PrimaryBtn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Sepetim" onBack={() => go('restaurant')} />
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 16 }}>
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
          <Icon name="bag" size={18} color="var(--brand-500)" />{restaurant?.name || 'Köşe Ocakbaşı'}
        </div>
        <div style={{ padding: '0 16px' }}>
          {cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <MediaBox h={64} radius="var(--radius-sm)" style={{ width: 64, flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 3 }}>{item.optLabel}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 6 }}>{money(item.unit * item.qty)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 4px', border: '1.5px solid var(--border-default)', borderRadius: 999, height: 'fit-content', alignSelf: 'center' }}>
                <button onClick={() => item.qty === 1 ? removeItem(i) : updateQty(i, -1)} style={qbtn2}>{item.qty === 1 ? <Icon name="close" size={15} color="var(--error-500)" /> : <Icon name="minus" size={15} color="var(--text-primary)" />}</button>
                <span style={{ fontSize: 14, fontWeight: 700, minWidth: 14, textAlign: 'center', color: 'var(--text-primary)' }}>{item.qty}</span>
                <button onClick={() => updateQty(i, 1)} style={qbtn2}><Icon name="plus" size={15} color="var(--text-primary)" /></button>
              </div>
            </div>
          ))}
        </div>

        {/* coupon */}
        <div style={{ padding: '20px 16px 0' }}>
          <button onClick={() => setCoupon(c => !c)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--radius-md)', border: coupon ? '1.5px solid var(--success-500)' : '1.5px dashed var(--border-strong)', background: coupon ? 'var(--success-50)' : 'var(--bg-surface)', cursor: 'pointer' }}>
            <Icon name="ticket" size={20} color={coupon ? 'var(--success-600)' : 'var(--brand-500)'} />
            <span style={{ flex: 1, textAlign: 'left', fontSize: 15, fontWeight: 600, color: coupon ? 'var(--success-600)' : 'var(--text-primary)' }}>{coupon ? 'KIMOO15 uygulandı (%15)' : 'Kupon kodu ekle'}</span>
            {coupon ? <Icon name="check" size={20} color="var(--success-600)" /> : <Icon name="chevR" size={18} color="var(--text-tertiary)" />}
          </button>
        </div>

        {/* summary */}
        <div style={{ padding: '20px 16px 0' }}>
          <SummaryRow label="Ara toplam" value={money(subtotal)} />
          <SummaryRow label="Teslimat ücreti" value={fee === 0 ? 'Ücretsiz' : money(fee)} accent={fee === 0} />
          {discount > 0 && <SummaryRow label="İndirim" value={'-' + money(discount)} accent />}
        </div>
      </div>

      <div style={{ padding: '14px 16px 30px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <PrimaryBtn onClick={() => go('checkout')}>
          <span style={{ flex: 1, textAlign: 'left' }}>Ödemeye geç</span><span style={{ fontWeight: 800 }}>{money(total)}</span>
        </PrimaryBtn>
      </div>
    </div>
  );
}
const qbtn2 = { width: 28, height: 28, borderRadius: 999, border: 'none', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', cursor: 'pointer' };

function SummaryRow({ label, value, accent, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: bold ? 17 : 14 }}>
      <span style={{ color: bold ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: bold ? 800 : 500 }}>{label}</span>
      <span style={{ fontWeight: bold ? 800 : 600, color: accent ? 'var(--success-600)' : 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

// ============================ CHECKOUT ============================
function CheckoutScreen({ cart, go, restaurant, placeOrder, hasOnlineHistory = true }) {
  const [pay, setPay] = React.useState('online');
  const [mealCard, setMealCard] = React.useState(null);
  const [usePuan, setUsePuan] = React.useState(false);
  const [contactless, setContactless] = React.useState(false);
  const [tip, setTip] = React.useState(10);
  const [deliveryTime, setDeliveryTime] = React.useState('now');
  const [scheduleDate, setScheduleDate] = React.useState('today');
  const [scheduleTime, setScheduleTime] = React.useState('19:00');
  const subtotal = cart.reduce((s, i) => s + i.unit * i.qty, 0);
  const fee = restaurant?.fee ?? 0;

  const isOnline = pay === 'online';
  // v8: Kimoo Puani yalnizca Secili Restoran + online odeme + min 250 TL siparislerde kullanilabilir
  const puanEligible = !!restaurant?.selected && isOnline && subtotal >= KIMOO_PUAN.minOrder;
  const puanAvail = puanEligible ? puanUsable(subtotal, restaurant) : 0;
  const puanApplied = usePuan && puanEligible ? puanAvail : 0;
  // v8: Kimoo Puani kullanilan sipariste puan kazanilmaz
  const willEarn = isOnline && puanApplied === 0 ? puanEarn(subtotal, restaurant) : 0;
  const total = subtotal + fee + tip - puanApplied;

  // Temassiz teslimat yalnizca online odemede gosterilir; baska yonteme gecince kapanir
  React.useEffect(() => { if (!isOnline) { setContactless(false); setUsePuan(false); } }, [isOnline]);

  // v8 odeme yontemleri: online kart her zaman; nakit/kapida-kart/yemek-karti restoran tercihine gore
  const cashEnabled = !!restaurant?.pay?.cash;
  const doorEnabled = !!restaurant?.pay?.doorCard;
  const cards = restaurant?.pay?.mealCards || [];
  const methods = [
    { id: 'online', label: 'Online kart', sub: 'Kayıtlı kart · **** 4567', ic: 'wallet', show: true },
    { id: 'doorcard', label: 'Kapıda kredi kartı', sub: 'Teslimatta kurye POS', ic: 'wallet', show: doorEnabled },
    { id: 'mealcard', label: 'Yemek kartı', sub: 'Teslimatta okutulur', ic: 'ticket', show: cards.length > 0 },
    { id: 'cash', label: 'Kapıda nakit', sub: 'Teslimatta öde', ic: 'tag', show: cashEnabled, locked: cashEnabled && !hasOnlineHistory },
  ].filter(m => m.show);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Ödeme" onBack={() => go('cart')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px 16px' }}>
        {/* address — v8: siparis olusturulduktan sonra degistirilemez */}
        <Section title="Teslimat adresi">
          <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
            <Icon name="pin" size={22} color="var(--brand-500)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Ev · Kadıköy, İstanbul</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>Caferağa Mah. Moda Cad. No:12 D:5</div>
            </div>
            <button style={editBtn}>Değiştir</button>
          </div>
          <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
            <Icon name="pin" size={14} color="var(--text-muted)" style={{ marginTop: 1 }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.45 }}>Adres siparişi onayladıktan sonra değiştirilemez.</span>
          </div>
        </Section>

        <Section title="Teslimat zamanı">
          <div style={{ display: 'flex', gap: 10 }}>
            <TimeChip active={deliveryTime==='now'} onClick={()=>setDeliveryTime('now')} label="Standart" sub={restaurant?.eta || '25-35 dk'} />
            <TimeChip active={deliveryTime==='scheduled'} onClick={()=>setDeliveryTime('scheduled')} label="Planla" sub={deliveryTime==='scheduled' ? (scheduleDate==='today' ? 'Bugün ' : 'Yarın ') + scheduleTime : 'Saat seç'} />
          </div>
          {deliveryTime === 'scheduled' && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Tarih</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {[['today','Bugün'],['tomorrow','Yarın']].map(([k,l]) => (
                  <button key={k} onClick={() => setScheduleDate(k)} style={{ flex:1, padding:'10px 0', borderRadius:'var(--radius-sm)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-sans)', background: scheduleDate===k ? 'var(--brand-50)' : 'var(--bg-surface)', color: scheduleDate===k ? 'var(--brand-700)' : 'var(--text-secondary)', border: scheduleDate===k ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)' }}>{l}</button>
                ))}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Saat</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {['11:00','11:30','12:00','12:30','13:00','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t => (
                  <button key={t} onClick={() => setScheduleTime(t)} style={{ padding:'9px 0', borderRadius:'var(--radius-sm)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-sans)', background: scheduleTime===t ? 'var(--brand-500)' : 'var(--bg-surface)', color: scheduleTime===t ? '#fff' : 'var(--text-secondary)', border: scheduleTime===t ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)' }}>{t}</button>
                ))}
              </div>
            </div>
          )}
        </Section>

        <Section title="Ödeme yöntemi">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {methods.map(m => {
              const on = pay === m.id;
              if (m.locked) {
                // v8: nakit on kosulu — en az 1 tamamlanmis online siparis gerekir
                return (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '13px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', border: '1.5px solid var(--border-subtle)', opacity: 0.9 }}>
                    <Icon name="tag" size={20} color="var(--text-muted)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-tertiary)' }}>Kapıda nakit · kilitli</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.45 }}>İlk siparişini online ver, sonraki siparişlerde nakit ödeme seçeneği açılır.</div>
                    </div>
                  </div>
                );
              }
              return (
                <button key={m.id} onClick={() => setPay(m.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left',
                  background: on ? 'var(--brand-50)' : 'var(--bg-surface)', border: on ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-subtle)' }}>
                  <Icon name={m.ic} size={20} color={on ? 'var(--brand-600)' : 'var(--text-secondary)'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{m.sub}</div>
                  </div>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: on ? '2px solid var(--brand-500)' : '1.5px solid var(--border-strong)', display: 'grid', placeItems: 'center', flex: 'none' }}>{on && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--brand-500)' }} />}</span>
                </button>
              );
            })}
            {pay === 'mealcard' && (
              <div style={{ padding: '10px 14px', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', marginTop: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Restoranın kabul ettiği yemek kartları</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {cards.map(c => {
                    const on = mealCard === c;
                    return (
                      <button key={c} onClick={() => setMealCard(c)} style={{ padding: '7px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, border: on ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)', background: on ? 'var(--brand-50)' : 'var(--bg-surface)', color: on ? 'var(--brand-700)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>{MEAL_CARDS[c]}</button>
                    );
                  })}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.4 }}>Yemek kartları yalnızca kapıda geçerlidir; teslimatta kurye okutur.</div>
              </div>
            )}
          </div>
        </Section>

        {/* Kimoo Puani kullan — yalnizca Secili Restoran + online + min 250 TL */}
        {restaurant?.selected && isOnline && (
          subtotal >= KIMOO_PUAN.minOrder ? (
            <Section title="Kimoo Puanı">
              <button onClick={() => setUsePuan(v => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <Icon name="star" size={18} color="var(--brand-600)" strokeWidth={0} style={{ fill: 'var(--brand-600)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{puanAvail} TL Kimoo Puanı kullan</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 1 }}>{KIMOO_PUAN.balance} TL puanın var · maks %20 / {KIMOO_PUAN.useCap} TL</div>
                </div>
                <span style={{ width: 46, height: 28, borderRadius: 999, flex: 'none', position: 'relative', background: usePuan ? 'var(--brand-500)' : 'var(--border-default)', transition: 'background .2s ease' }}>
                  <span style={{ position: 'absolute', top: 3, left: usePuan ? 21 : 3, width: 22, height: 22, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease' }} />
                </span>
              </button>
              {usePuan && <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.45 }}>Puan kullanılan siparişte yeni puan kazanılmaz.</div>}
            </Section>
          ) : null
        )}
        {restaurant?.selected && isOnline && subtotal < KIMOO_PUAN.minOrder && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 14, padding: '12px 14px', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)' }}>
            <Icon name="star" size={16} color="var(--text-muted)" style={{ marginTop: 1 }} />
            <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.45 }}>Kimoo Puanı kullanımı için sepet en az {KIMOO_PUAN.minOrder} TL olmalı.</span>
          </div>
        )}

        {/* Temassiz teslimat — yalnizca online odemede gosterilir */}
        {isOnline && (
          <Section title="Teslimat tercihi">
            <button onClick={() => setContactless(v => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
              <div style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <Icon name="home" size={18} color="var(--brand-600)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Temassız teslimat</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 1 }}>Kurye kapıya bırakır, fotoğraf çeker. Kod gerekmez.</div>
              </div>
              <span style={{ width: 46, height: 28, borderRadius: 999, flex: 'none', position: 'relative', background: contactless ? 'var(--brand-500)' : 'var(--border-default)', transition: 'background .2s ease' }}>
                <span style={{ position: 'absolute', top: 3, left: contactless ? 21 : 3, width: 22, height: 22, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease' }} />
              </span>
            </button>
          </Section>
        )}

        <Section title="Kuryeye bahşiş">
          <div style={{ display: 'flex', gap: 8 }}>
            {[0, 10, 20, 30].map(t => (
              <button key={t} onClick={() => setTip(t)} style={{ flex: 1, padding: '11px 0', borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                background: tip === t ? 'var(--brand-500)' : 'var(--bg-surface)', color: tip === t ? '#fff' : 'var(--text-secondary)', border: tip === t ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)' }}>{t === 0 ? 'Yok' : money(t)}</button>
            ))}
          </div>
        </Section>

        <div style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginTop: 18 }}>
          <SummaryRow label="Ara toplam" value={money(subtotal)} />
          <SummaryRow label="Teslimat" value={fee === 0 ? 'Ücretsiz' : money(fee)} accent={fee === 0} />
          <SummaryRow label="Bahşiş" value={money(tip)} />
          {puanApplied > 0 && <SummaryRow label="Kimoo Puanı" value={'−' + money(puanApplied)} accent />}
          <div style={{ height: 1, background: 'var(--border-default)', margin: '8px 0' }} />
          <SummaryRow label="Toplam" value={money(total)} bold />
          {willEarn > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12.5, fontWeight: 700, color: 'var(--brand-600)' }}>
              <Icon name="star" size={14} color="var(--brand-600)" strokeWidth={0} style={{ fill: 'var(--brand-600)' }} />
              Bu siparişten +{willEarn} TL Kimoo Puanı kazanacaksın
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '14px 16px 30px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <PrimaryBtn onClick={() => placeOrder({ contactless, pay, puanApplied, willEarn })}><span style={{ flex: 1, textAlign: 'left' }}>Siparişi onayla</span><span style={{ fontWeight: 800 }}>{money(total)}</span></PrimaryBtn>
      </div>
    </div>
  );
}
const editBtn = { background: 'none', border: 'none', color: 'var(--brand-600)', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' };
function Section({ title, children }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>{title}</div>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 16 }}>{children}</div>
    </div>
  );
}
function TimeChip({ active, label, sub, onClick }) {
  return (
    <div onClick={onClick} style={{ flex: 1, padding: '12px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
      background: active ? 'var(--brand-50)' : 'var(--bg-surface)', border: active ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)' }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: active ? 'var(--brand-700)' : 'var(--text-primary)' }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

// ============================ ORDER TRACKING ============================
function TrackingScreen({ go, restaurant, total, contactless = false, code = '4827' }) {
  const [step, setStep] = React.useState(0);
  const steps = [
    { t: 'Sipariş onaylandı', d: 'Restoran siparişini aldı' },
    { t: 'Hazırlanıyor', d: 'Şef mutfakta 👨‍🍳' },
    { t: 'Yola çıktı', d: 'Kurye sana doğru geliyor' },
    { t: contactless ? 'Kapına bırakıldı' : 'Teslim edildi', d: contactless ? 'Fotoğraf yüklendi · Afiyet olsun!' : 'Afiyet olsun!' },
  ];
  React.useEffect(() => {
    if (step >= steps.length - 1) return;
    const tmr = setTimeout(() => setStep(s => s + 1), 2600);
    return () => clearTimeout(tmr);
  }, [step]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* map */}
      <div style={{ position: 'relative', height: 300, flex: 'none' }}>
        <MediaBox h={300} radius="0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, var(--neutral-100) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, var(--neutral-100) 0 1px, transparent 1px 40px)', background: 'var(--bg-sunken)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, var(--border-subtle) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, var(--border-subtle) 0 1px, transparent 1px 44px)' }} />
        {/* route */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 402 300" preserveAspectRatio="none">
          <path d="M70 230 C 140 200, 130 120, 220 110 S 320 90, 330 70" stroke="var(--brand-500)" strokeWidth="4" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', left: 56, top: 214, width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-surface)', border: '3px solid var(--brand-500)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-md)' }}><Icon name="scooter" size={16} color="var(--brand-600)" /></div>
        <div style={{ position: 'absolute', left: 316, top: 56, width: 30, height: 30, borderRadius: '50%', background: 'var(--brand-500)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-md)' }}><Icon name="home" size={15} color="#fff" /></div>
        <button onClick={() => go('home')} style={{ position: 'absolute', top: 58, left: 16, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.95)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Icon name="close" size={20} color="#1A1714" /></button>
      </div>

      {/* sheet */}
      <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-surface)', borderRadius: '22px 22px 0 0', marginTop: -22, position: 'relative', padding: '8px 16px 30px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: 'var(--border-default)', margin: '6px auto 16px' }} />
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tahmini teslimat</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{step >= 3 ? (contactless ? 'Kapına bırakıldı ✓' : 'Teslim edildi ✓') : '20:45'}</div>
        </div>

        {/* progress bar */}
        <div style={{ display: 'flex', gap: 6, margin: '16px 0 20px' }}>
          {steps.map((_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i <= step ? 'var(--brand-500)' : 'var(--bg-sunken)', transition: 'background .4s ease' }} />)}
        </div>

        {/* Teslimat kodu / Temassiz teslimat — v8 */}
        {step < 3 ? (
          contactless ? (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--bg-sunken)', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="home" size={20} color="var(--brand-600)" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>Temassız teslimat</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.4 }}>Kurye paketi kapına bırakıp fotoğraf yükleyecek. Kod gerekmez.</div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 16, borderRadius: 'var(--radius-md)', background: 'var(--brand-50)', marginBottom: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-700)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Teslimat kodu</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
                {code.split('').map((d, i) => (
                  <span key={i} style={{ width: 44, height: 54, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', border: '1.5px solid var(--brand-500)', display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 800, color: 'var(--brand-700)' }}>{d}</span>
                ))}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--brand-700)', lineHeight: 1.4 }}>Kuryeye bu kodu göster. Kurye kodu girince sipariş tamamlanır.</div>
            </div>
          )
        ) : null}

        {/* current status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 18 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', opacity: i <= step ? 1 : 0.4, transition: 'opacity .4s ease' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', flex: 'none', display: 'grid', placeItems: 'center', background: i < step ? 'var(--success-500)' : i === step ? 'var(--brand-500)' : 'var(--bg-sunken)' }}>
                {i < step ? <Icon name="check" size={16} color="#fff" /> : <span style={{ width: 9, height: 9, borderRadius: '50%', background: i === step ? '#fff' : 'var(--text-muted)' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{s.t}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.d}</div>
              </div>
              {i === step && i < 3 && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-500)', animation: 'kpulse 1.2s infinite' }} />}
            </div>
          ))}
        </div>

        {/* contactless photo proof on delivered */}
        {step >= 3 && contactless && (
          <div style={{ marginBottom: 16 }}>
            <MediaBox h={150} label="kurye teslimat fotoğrafı" radius="var(--radius-md)" />
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 8, textAlign: 'center' }}>Paketiniz kapınıza bırakıldı 📷</div>
          </div>
        )}

        {/* courier */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', fontWeight: 800, color: 'var(--text-secondary)', flex: 'none' }}>MA</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Mehmet A.</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Kuryen · ★ 4.9</div>
          </div>
          <button style={circBtn}><Icon name="msg" size={20} color="var(--brand-600)" /></button>
          <button style={circBtn}><Icon name="phone" size={20} color="var(--brand-600)" /></button>
        </div>
      </div>
    </div>
  );
}
const circBtn = { width: 44, height: 44, borderRadius: 999, border: '1.5px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer' };

Object.assign(window, { ProductScreen, CartScreen, CheckoutScreen, TrackingScreen });
