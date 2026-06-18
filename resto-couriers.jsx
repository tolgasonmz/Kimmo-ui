// resto-couriers.jsx — Kurye Bul + Kuryelerim
// Kurye Bul: yakındaki kuryeleri görüntüle + paket bakiyesi ve satın al (gömülü)
// Kuryelerim: işletmenin kendi (kayıtlı) kuryelerinin listesi
const { Icon, Badge, money, MetricCard, TableHeader, TableRow } = window;
const CPAD = '24px';

// Restoranın paket bakiyesi — sidebar etiketi de buradan gelir
window.COURIER_PACKETS_LEFT = 64;

const NEARBY_COURIERS = [
  { id: 'C001', name: 'Mehmet A.', vehicle: 'Motosiklet', distance: '0.4 km', eta: '3 dk', rating: 4.92, deliveries: 1243, status: 'idle' },
  { id: 'C002', name: 'Ali Y.',    vehicle: 'Motosiklet', distance: '0.8 km', eta: '5 dk', rating: 4.86, deliveries: 980,  status: 'idle' },
  { id: 'C003', name: 'Cem Ö.',    vehicle: 'Bisiklet',   distance: '1.2 km', eta: '8 dk', rating: 4.78, deliveries: 612,  status: 'busy' },
  { id: 'C004', name: 'Burak T.',  vehicle: 'Motosiklet', distance: '1.5 km', eta: '9 dk', rating: 4.95, deliveries: 1450, status: 'idle' },
];

const MY_COURIERS = [
  { id: 'B001', name: 'Hakan Y.',  phone: '+90 532 111 22 33', vehicle: 'Motosiklet', deliveries: 348, rating: 4.91, status: 'active', earnings: 41850 },
  { id: 'B002', name: 'Murat Ş.',  phone: '+90 533 222 33 44', vehicle: 'Motosiklet', deliveries: 215, rating: 4.84, status: 'active', earnings: 25800 },
  { id: 'B003', name: 'Serkan K.', phone: '+90 534 333 44 55', vehicle: 'Bisiklet',   deliveries: 142, rating: 4.78, status: 'offduty', earnings: 17040 },
];

const PACKET_OPTIONS = [
  { count: 25,  price: 2400, perUnit: 96, popular: false },
  { count: 100, price: 8900, perUnit: 89, popular: true },
  { count: 250, price: 21000, perUnit: 84, popular: false },
];

// ============ KURYE BUL ============
function CourierFindView() {
  const left = window.COURIER_PACKETS_LEFT;
  const [autoCourier, setAutoCourier] = React.useState(true);
  const idle = NEARBY_COURIERS.filter(c => c.status === 'idle').length;

  return (
    <div style={{ padding: CPAD }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Kurye Bul</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>Havuz kuryelerinden çağır veya kayıtlı kuryelerine ata</div>

      {/* Paket bakiyesi + auto-courier — sidebar maddesi yerine burada gömülü */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Havuz kurye paketi</div>
            <Badge tone="brand" style={{ fontSize: 11 }}>{left}/100 adet</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{left}</span>
            <span style={{ fontSize: 14, color: 'var(--text-tertiary)', fontWeight: 600 }}>çağrı kaldı</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ width: (left) + '%', height: '100%', borderRadius: 999, background: 'var(--brand-500)' }}></div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Her havuz kurye çağrısında 1 adet düşer · 97,5 TL net kurye ücreti dahildir</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>Otomatik kurye çağır</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>Sipariş onaylandığında en yakın kurye otomatik atanır</div>
            </div>
            <button onClick={() => setAutoCourier(a => !a)} style={{ width: 44, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative', flex: 'none', background: autoCourier ? 'var(--success-500)' : 'var(--border-default)', transition: 'background .2s ease' }}>
              <span style={{ position: 'absolute', top: 3, left: autoCourier ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease' }}></span>
            </button>
          </div>
        </div>

        {/* Paket satın al */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>Paket satın al</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PACKET_OPTIONS.map(p => (
              <div key={p.count} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 'var(--radius-md)', border: p.popular ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)', background: p.popular ? 'var(--brand-50)' : 'var(--bg-surface)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>{p.count} çağrı</span>
                    {p.popular && <Badge tone="brand" style={{ fontSize: 10 }}>Popüler</Badge>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>Çağrı başına {money(p.perUnit)}</div>
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>{money(p.price)}</div>
                <button style={{ padding: '7px 14px', borderRadius: 999, background: p.popular ? 'var(--brand-500)' : 'var(--bg-surface)', color: p.popular ? '#fff' : 'var(--text-primary)', border: p.popular ? 'none' : '1.5px solid var(--border-default)', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Satın al</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yakındaki kuryeler — havuz */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Yakındaki havuz kuryeleri</div>
          <Badge tone="success" style={{ fontSize: 11 }}>{idle} müsait</Badge>
        </div>
        <TableHeader>
          <span style={{ flex: '0 0 70px' }}>ID</span>
          <span style={{ flex: 1 }}>Kurye</span>
          <span style={{ flex: '0 0 110px' }}>Araç</span>
          <span style={{ flex: '0 0 90px' }}>Uzaklık</span>
          <span style={{ flex: '0 0 80px' }}>ETA</span>
          <span style={{ flex: '0 0 90px' }}>Puan</span>
          <span style={{ flex: '0 0 100px' }}>Durum</span>
          <span style={{ flex: '0 0 100px', textAlign: 'right' }}>Eylem</span>
        </TableHeader>
        {NEARBY_COURIERS.map(c => {
          const busy = c.status === 'busy';
          return (
            <TableRow key={c.id}>
              <span style={{ flex: '0 0 70px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--text-tertiary)' }}>{c.id}</span>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>{c.name.split(' ').map(s=>s[0]).join('')}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{c.deliveries} teslimat</div>
                </div>
              </span>
              <span style={{ flex: '0 0 110px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.vehicle}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{c.distance}</span>
              <span style={{ flex: '0 0 80px', fontSize: 13, fontWeight: 700, color: 'var(--brand-600)' }}>{c.eta}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>★ {c.rating}</span>
              <span style={{ flex: '0 0 100px' }}>{busy ? <Badge tone="warning" style={{ fontSize: 10 }}>Meşgul</Badge> : <Badge tone="success" style={{ fontSize: 10 }}>Müsait</Badge>}</span>
              <span style={{ flex: '0 0 100px', display: 'flex', justifyContent: 'flex-end' }}>
                <button disabled={busy} style={{ padding: '6px 12px', borderRadius: 999, background: busy ? 'var(--bg-sunken)' : 'var(--brand-500)', color: busy ? 'var(--text-muted)' : '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: busy ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)' }}>Çağır</button>
              </span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

// ============ KURYELERİM ============
function MyCouriersView() {
  const active = MY_COURIERS.filter(c => c.status === 'active').length;
  const totalDeliveries = MY_COURIERS.reduce((s, c) => s + c.deliveries, 0);
  const totalEarnings = MY_COURIERS.reduce((s, c) => s + c.earnings, 0);

  return (
    <div style={{ padding: CPAD }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Kuryelerim</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>İşletmenin kayıtlı (özel) kuryeleri</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}><Icon name="plus" size={16} color="#fff" />Kurye ekle</button>
      </div>

      <div style={{ display: 'flex', gap: 14, margin: '20px 0 22px' }}>
        <MetricCard label="Aktif kurye"      value={active + ' / ' + MY_COURIERS.length} icon="user" />
        <MetricCard label="Toplam teslimat"  value={totalDeliveries.toLocaleString('tr-TR')} icon="scooter" />
        <MetricCard label="Bu ay ödenen"     value={money(totalEarnings)} icon="wallet" />
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: '0 0 70px' }}>ID</span>
          <span style={{ flex: 1 }}>Kurye</span>
          <span style={{ flex: '0 0 150px' }}>Telefon</span>
          <span style={{ flex: '0 0 110px' }}>Araç</span>
          <span style={{ flex: '0 0 90px' }}>Teslimat</span>
          <span style={{ flex: '0 0 80px' }}>Puan</span>
          <span style={{ flex: '0 0 110px' }}>Bu ay</span>
          <span style={{ flex: '0 0 100px' }}>Durum</span>
          <span style={{ flex: '0 0 70px', textAlign: 'right' }}></span>
        </TableHeader>
        {MY_COURIERS.map(c => {
          const on = c.status === 'active';
          return (
            <TableRow key={c.id}>
              <span style={{ flex: '0 0 70px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--text-tertiary)' }}>{c.id}</span>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>{c.name.split(' ').map(s=>s[0]).join('')}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div>
              </span>
              <span style={{ flex: '0 0 150px', fontSize: 12.5, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono, monospace)' }}>{c.phone}</span>
              <span style={{ flex: '0 0 110px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.vehicle}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{c.deliveries}</span>
              <span style={{ flex: '0 0 80px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>★ {c.rating}</span>
              <span style={{ flex: '0 0 110px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{money(c.earnings)}</span>
              <span style={{ flex: '0 0 100px' }}>{on ? <Badge tone="success" style={{ fontSize: 10 }}>Aktif</Badge> : <Badge tone="neutral" style={{ fontSize: 10 }}>İzinli</Badge>}</span>
              <span style={{ flex: '0 0 70px', display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ padding: '6px 10px', borderRadius: 999, background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1.5px solid var(--border-default)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Detay</button>
              </span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { CourierFindView, MyCouriersView });
