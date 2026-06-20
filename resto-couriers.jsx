// resto-couriers.jsx — Kurye Bul + Kuryelerim (v9)
// Kurye Bul: paket bakiyesi, bölge durumu, kurye bekleyen siparişler, aktif teslimatlar, haftalık performans
// Kuryelerim: kurye kartları, shift yönetimi, kurye mesajlaşma, aylık performans raporu
const { Icon, Badge, money, MetricCard, TableHeader, TableRow } = window;
const CPAD = '24px';

window.COURIER_PACKETS_LEFT = 64;

const NEARBY_COURIERS = [
  { id: 'C001', name: 'Mehmet A.', vehicle: 'Motosiklet', distance: '0.4 km', eta: '3 dk', rating: 4.92, deliveries: 1243, status: 'idle' },
  { id: 'C002', name: 'Ali Y.',    vehicle: 'Motosiklet', distance: '0.8 km', eta: '5 dk', rating: 4.86, deliveries: 980,  status: 'idle' },
  { id: 'C003', name: 'Cem Ö.',    vehicle: 'Bisiklet',   distance: '1.2 km', eta: '8 dk', rating: 4.78, deliveries: 612,  status: 'busy' },
  { id: 'C004', name: 'Burak T.',  vehicle: 'Motosiklet', distance: '1.5 km', eta: '9 dk', rating: 4.95, deliveries: 1450, status: 'idle' },
];

const MY_COURIERS = [
  { id: 'B001', name: 'Hakan Y.',  initials: 'HY', phone: '+90 532 111 22 33', vehicle: 'Motosiklet', deliveries: 348, rating: 4.91, status: 'active',  earnings: 41850, jobNote: 'KM-4835 yolda',         efficiency: 94 },
  { id: 'B002', name: 'Murat Ş.',  initials: 'MŞ', phone: '+90 533 222 33 44', vehicle: 'Motosiklet', deliveries: 215, rating: 4.84, status: 'active',  earnings: 25800, jobNote: 'Restorana dönüyor',     efficiency: 86 },
  { id: 'B003', name: 'Serkan K.', initials: 'SK', phone: '+90 534 333 44 55', vehicle: 'Motosiklet', deliveries: 142, rating: 4.78, status: 'idle',    earnings: 17040, jobNote: 'Sipariş bekliyor',       efficiency: 78 },
];

const PACKET_OPTIONS = [
  { count: 25,   price: 3125,   perUnit: 125, popular: false },
  { count: 100,  price: 12000,  perUnit: 120, popular: true  },
  { count: 500,  price: 55000,  perUnit: 110, popular: false },
  { count: 1000, price: 100000, perUnit: 100, popular: false },
];

const WAITING_ORDERS = [
  { id: 'KM-4833', items: 'Adana Dürüm x2, Ayran x2',    total: 360, waiting: '4 dk',  hot: true  },
  { id: 'KM-4832', items: 'Karışık Izgara, İçli Köfte x3', total: 765, waiting: '1 dk',  hot: false },
  { id: 'YS-2104', items: 'Karışık Pide, Ayran',          total: 245, waiting: 'yeni',  hot: false },
];

const ACTIVE_DELIVERIES = [
  { id: 'KM-4831', courier: 'Mehmet A.', initials: 'MA', customer: 'Zeynep A.', items: 'Urfa Kebap, Künefe', status: 'enroute', eta: '~6 dk' },
  { id: 'MY-3321', courier: 'Ali Y.',    initials: 'AY', customer: 'Hakan T.',  items: 'Lahmacun x4',        status: 'arriving', eta: '~1 dk' },
];

const SHIFTS_TODAY = [
  { c: 'HY', name: 'Hakan Y.',  hours: '09:00 – 17:00', status: 'active' },
  { c: 'MŞ', name: 'Murat Ş.',  hours: '11:00 – 22:00', status: 'active' },
  { c: 'SK', name: 'Serkan K.', hours: '16:00 – 23:00', status: 'active' },
];
const SHIFTS_TOMORROW = [
  { c: 'HY', name: 'Hakan Y.',  hours: '09:00 – 17:00', status: 'sched' },
  { c: 'MŞ', name: 'Murat Ş.',  hours: 'Off gün',     status: 'off'   },
  { c: 'SK', name: 'Serkan K.', hours: '10:00 – 20:00', status: 'sched' },
];

const COURIER_MSGS = [
  { from: 'me', text: 'Hakan abim siparişe ayran koymayı unutmuşuz, yolda bi bakkala uğrayıp 2 tane ayran alabilir misin?', t: '14:12' },
  { from: 'c',  text: 'Tamam abi şimdi bakkalın önündeyim zaten, alıyorum', t: '14:13' },
  { from: 'me', text: 'Süper, gelince hallederiz parasını', t: '14:13' },
  { from: 'c',  text: 'Aldım 2 tane, müşteriye de söylerim unutulmuş ama yolda aldık diye', t: '14:15' },
  { from: 'me', text: 'Eyvallah Hakan çok sağ ol', t: '14:15' },
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

      {/* Paket bakiyesi + Bölge durumu */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
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
            <div style={{ width: left + '%', height: '100%', borderRadius: 999, background: 'var(--brand-500)' }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>Standart teslimat 1 hak · 5 km üzeri mesafe 1.5 hak düşer · Maks. hizmet alanı 7.5 km</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>Otomatik kurye çağır</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>Sipariş onaylandığında en yakın kurye otomatik atanır</div>
            </div>
            <button onClick={() => setAutoCourier(a => !a)} style={{ width: 44, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative', flex: 'none', background: autoCourier ? 'var(--success-500)' : 'var(--border-default)', transition: 'background .2s ease' }}>
              <span style={{ position: 'absolute', top: 3, left: autoCourier ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: '#fff', boxShadow: 'var(--shadow-xs)', transition: 'left .2s ease' }} />
            </button>
          </div>
        </div>

        {/* Bölge durumu */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>Bölge kurye durumu</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <span style={{ width: 16, height: 16, borderRadius: 999, background: 'var(--success-500)' }} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--success-600)' }}>Müsait</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>Bölgenizde yeterli kurye var</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            <div style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Ort. varış süresi</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>4 dk</div>
            </div>
            <div style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Aktif kurye sayısı</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>7</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Kurye bilgileri gizlidir, sipariş atandığında gösterilir</div>
        </div>
      </div>

      {/* Paket satın al */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>Paket satın al</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {PACKET_OPTIONS.map(p => (
            <div key={p.count} style={{ position: 'relative', textAlign: 'center', borderRadius: 'var(--radius-md)', padding: '14px 10px 12px', border: p.popular ? '1.5px solid var(--brand-500)' : '1.5px solid var(--border-default)', background: p.popular ? 'var(--brand-50)' : 'var(--bg-surface)' }}>
              {p.popular && <span style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', background: 'var(--warning-500)', color: '#fff', fontSize: 10, padding: '2px 9px', borderRadius: 6, fontWeight: 700 }}>Popüler</span>}
              <div style={{ fontSize: 22, fontWeight: 800, color: p.popular ? 'var(--brand-700)' : 'var(--text-primary)', letterSpacing: '-0.02em' }}>{p.count}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>çağrı</div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>birim {money(p.perUnit)}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: p.popular ? 'var(--brand-700)' : 'var(--text-primary)', marginTop: 8 }}>{money(p.price)}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>+KDV</div>
              <button style={{ width: '100%', padding: '7px 0', borderRadius: 999, background: p.popular ? 'var(--brand-500)' : 'var(--bg-surface)', color: p.popular ? '#fff' : 'var(--text-primary)', border: p.popular ? 'none' : '1.5px solid var(--border-default)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Satın al</button>
            </div>
          ))}
        </div>
      </div>

      {/* Kurye bekleyen siparişler */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Kurye bekleyen siparişler</div>
            <Badge tone="warning" style={{ fontSize: 11 }}>{WAITING_ORDERS.length} sipariş</Badge>
          </div>
          <button style={{ padding: '8px 14px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Tümüne kurye çağır</button>
        </div>
        <TableHeader>
          <span style={{ flex: '0 0 90px' }}>Sipariş</span>
          <span style={{ flex: 1 }}>Ürünler</span>
          <span style={{ flex: '0 0 80px' }}>Tutar</span>
          <span style={{ flex: '0 0 80px' }}>Bekliyor</span>
          <span style={{ flex: '0 0 110px', textAlign: 'right' }}>Eylem</span>
        </TableHeader>
        {WAITING_ORDERS.map(o => (
          <TableRow key={o.id}>
            <span style={{ flex: '0 0 90px', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono, monospace)', color: 'var(--text-primary)' }}>{o.id}</span>
            <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{o.items}</span>
            <span style={{ flex: '0 0 80px', fontWeight: 700, color: 'var(--text-primary)' }}>{money(o.total)}</span>
            <span style={{ flex: '0 0 80px', fontSize: 12, fontWeight: 700, color: o.hot ? 'var(--warning-600)' : 'var(--text-tertiary)' }}>{o.waiting}</span>
            <span style={{ flex: '0 0 110px', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ padding: '6px 12px', borderRadius: 999, background: 'var(--warning-500)', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Kurye çağır</button>
            </span>
          </TableRow>
        ))}
      </div>

      {/* Aktif teslimatlar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Aktif teslimatlar</div>
          <Badge tone="info" style={{ fontSize: 11 }}>{ACTIVE_DELIVERIES.length} yolda</Badge>
        </div>
        <TableHeader>
          <span style={{ flex: '0 0 90px' }}>Sipariş</span>
          <span style={{ flex: '0 0 150px' }}>Kurye</span>
          <span style={{ flex: 1 }}>Müşteri / Ürünler</span>
          <span style={{ flex: '0 0 100px' }}>Durum</span>
          <span style={{ flex: '0 0 60px' }}>ETA</span>
          <span style={{ flex: '0 0 90px', textAlign: 'right' }}>Eylem</span>
        </TableHeader>
        {ACTIVE_DELIVERIES.map(d => {
          const tone = d.status === 'enroute' ? 'success' : 'warning';
          const label = d.status === 'enroute' ? 'Yolda' : 'Teslimde';
          const dot = d.status === 'enroute' ? 'var(--success-500)' : 'var(--warning-500)';
          return (
            <TableRow key={d.id}>
              <span style={{ flex: '0 0 90px', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono, monospace)', color: 'var(--text-primary)' }}>{d.id}</span>
              <span style={{ flex: '0 0 150px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 10 }}>{d.initials}</div>
                <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>{d.courier}</span>
              </span>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>{d.customer}</strong> · {d.items}</span>
              <span style={{ flex: '0 0 100px' }}><Badge tone={tone} style={{ fontSize: 10 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: dot }} />{label}</Badge></span>
              <span style={{ flex: '0 0 60px', fontSize: 12.5, color: 'var(--text-tertiary)' }}>{d.eta}</span>
              <span style={{ flex: '0 0 90px', display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ padding: '5px 10px', borderRadius: 999, background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1.5px solid var(--border-default)', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Takip et</button>
              </span>
            </TableRow>
          );
        })}
      </div>

      {/* Haftalık performans */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>Bu hafta kurye performansı</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          <PerfStat label="Toplam teslimat"    value="48"     color="var(--text-primary)" />
          <PerfStat label="Ort. varış süresi"  value="3.8 dk" color="var(--brand-600)" />
          <PerfStat label="Ort. teslimat süresi" value="18 dk"  color="var(--text-primary)" />
          <PerfStat label="Kalan paket"         value={String(left)}   color="var(--warning-600)" sub="~8 günlük" />
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
                <div style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--brand-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>{c.name.split(' ').map(s => s[0]).join('')}</div>
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

function PerfStat({ label, value, color, sub }) {
  return (
    <div style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '14px 12px', textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: color, letterSpacing: '-0.02em' }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  );
}

// ============ KURYELERİM ============
function MyCouriersView() {
  const active = MY_COURIERS.filter(c => c.status === 'active').length;
  const totalDeliveries = MY_COURIERS.reduce((s, c) => s + c.deliveries, 0);
  const [chatTo, setChatTo] = React.useState('HY');
  const [period, setPeriod] = React.useState('Haziran');

  return (
    <div style={{ padding: CPAD }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Kuryelerim</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>İşletmenin kayıtlı (özel) kuryeleri</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>
          <Icon name="plus" size={16} color="#fff" />Kurye ekle
        </button>
      </div>

      <div style={{ display: 'flex', gap: 14, margin: '20px 0 18px' }}>
        <MetricCard label="Aktif kurye"           value={active + ' / ' + MY_COURIERS.length} icon="user" />
        <MetricCard label="Bu ay teslimat"        value={totalDeliveries.toLocaleString('tr-TR')} icon="scooter" />
        <MetricCard label="Ort. teslimat süresi" value="14 dk" icon="clock" />
      </div>

      {/* Kurye kartları */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 14, marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MY_COURIERS.map(c => {
          const isActive = c.status === 'active';
          return (
            <div key={c.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--warning-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 13, flex: 'none' }}>{c.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>{c.name}</span>
                  <Badge tone={isActive ? 'success' : 'neutral'} style={{ fontSize: 10 }}>{isActive ? 'Aktif' : 'Müsait'}</Badge>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.vehicle}</span>
                </div>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--text-tertiary)' }}>
                  <span><Icon name="bag" size={11} color="var(--text-tertiary)" style={{ verticalAlign: 'middle', marginRight: 4 }} />Bu ay: {c.deliveries} teslimat</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>★ {c.rating}</span>
                  <span><Icon name="scooter" size={11} color="var(--text-tertiary)" style={{ verticalAlign: 'middle', marginRight: 4 }} />{c.jobNote}</span>
                </div>
              </div>
              <button style={{ padding: '7px 12px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="pin" size={12} color="#fff" />Canlı takip
              </button>
              <button style={{ padding: '7px 12px', borderRadius: 999, background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1.5px solid var(--border-default)', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Detay</button>
            </div>
          );
        })}
      </div>

      {/* Shift + Mesaj */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        {/* Shift Yönetimi */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Shift Yönetimi</div>
            <button style={{ padding: '6px 12px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>+ Shift oluştur</button>
          </div>

          <ShiftDay label="Bugün — 20 Haziran" shifts={SHIFTS_TODAY} editable={false} />
          <div style={{ height: 10 }} />
          <ShiftDay label="Yarın — 21 Haziran" shifts={SHIFTS_TOMORROW} editable={true} />
        </div>

        {/* Mesajlaşma */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 18, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Kurye Mesajları</div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Alıcı</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[['all', 'Tümü'], ...MY_COURIERS.map(c => [c.initials, c.name])].map(([k, l]) => {
                const on = chatTo === k;
                return (
                  <button key={k} onClick={() => setChatTo(k)} style={{ padding: '5px 11px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: on ? 'var(--brand-50)' : 'var(--bg-surface)', color: on ? 'var(--brand-700)' : 'var(--text-secondary)', border: '1.5px solid ' + (on ? 'var(--brand-500)' : 'var(--border-default)') }}>{l}</button>
                );
              })}
            </div>
          </div>

          <div style={{ background: 'var(--warning-50)', borderRadius: 'var(--radius-sm)', padding: '7px 11px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="scooter" size={14} color="var(--warning-600)" />
            <div style={{ fontSize: 11, color: 'var(--warning-700)' }}>Hakan şu an <strong>KM-4835</strong> taşıyor · Adana Dürüm x2, Ayran x2</div>
          </div>

          <div style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 12, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 180 }}>
            {COURIER_MSGS.map((m, i) => (
              <ChatBubble key={i} mine={m.from === 'me'} text={m.text} t={m.t} />
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <input placeholder="Mesaj yaz..." style={{ flex: 1, background: 'var(--bg-sunken)', border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', fontSize: 12, fontFamily: 'var(--font-sans)', outline: 'none', color: 'var(--text-primary)' }} />
            <button style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon name="send" size={12} color="#fff" />Gönder
            </button>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 5 }}>Mesajlar Kimoo altyapısı üzerinden iletilir. Telefon numaraları paylaşılmaz.</div>
        </div>
      </div>

      {/* Aylık Kurye Raporu */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Aylık Kurye Raporu</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['Haziran', 'Mayıs', 'Nisan'].map(p => {
              const on = period === p;
              return (
                <button key={p} onClick={() => setPeriod(p)} style={{ padding: '5px 14px', borderRadius: 'var(--radius-sm)', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: on ? 'var(--brand-50)' : 'transparent', color: on ? 'var(--brand-700)' : 'var(--text-tertiary)', border: 'none' }}>{p}</button>
              );
            })}
          </div>
        </div>
        <TableHeader>
          <span style={{ flex: 1 }}>Kurye</span>
          <span style={{ flex: '0 0 130px' }}>Aylık teslimat</span>
          <span style={{ flex: '0 0 90px' }}>Ort. süre</span>
          <span style={{ flex: '0 0 80px' }}>Puan</span>
          <span style={{ flex: '0 0 180px' }}>Verimlilik</span>
        </TableHeader>
        {MY_COURIERS.map((c, i) => {
          const barColor = c.efficiency >= 90 ? 'var(--success-500)' : c.efficiency >= 80 ? 'var(--warning-500)' : 'var(--text-muted)';
          const avg = ['12 dk', '15 dk', '18 dk'][i] || '—';
          return (
            <TableRow key={c.id}>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--warning-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 10 }}>{c.initials}</div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</span>
              </span>
              <span style={{ flex: '0 0 130px', fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{c.deliveries}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13, color: 'var(--text-secondary)' }}>{avg}</span>
              <span style={{ flex: '0 0 80px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>★ {c.rating}</span>
              <span style={{ flex: '0 0 180px' }}>
                <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden' }}>
                  <div style={{ width: c.efficiency + '%', height: '100%', borderRadius: 999, background: barColor }} />
                </div>
                <div style={{ fontSize: 10, color: barColor, marginTop: 3, fontWeight: 700 }}>%{c.efficiency}</div>
              </span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

function ShiftDay({ label, shifts, editable }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {shifts.map((s, i) => {
          const off = s.status === 'off';
          const active = s.status === 'active';
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 'var(--radius-sm)',
              background: active ? 'var(--brand-50)' : off ? 'var(--bg-sunken)' : 'var(--bg-sunken)',
              borderLeft: active ? '3px solid var(--brand-500)' : off ? '3px solid var(--border-default)' : '3px solid transparent',
            }}>
              <div style={{ width: 24, height: 24, borderRadius: 999, background: off ? 'var(--border-default)' : 'var(--warning-500)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 10, flex: 'none' }}>{s.c}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: off ? 'var(--text-muted)' : 'var(--text-primary)' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: off ? 'var(--text-muted)' : 'var(--text-tertiary)' }}>{s.hours}</div>
              </div>
              {active && <Badge tone="success" style={{ fontSize: 9.5 }}>Aktif</Badge>}
              {off    && <Badge tone="neutral" style={{ fontSize: 9.5 }}>İzinli</Badge>}
              {editable && !off && (
                <button style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1.5px solid var(--border-default)', fontSize: 10.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Düzenle</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChatBubble({ mine, text, t }) {
  return (
    <div style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '80%', padding: '7px 11px',
        borderRadius: mine ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
        background: mine ? 'var(--brand-500)' : 'var(--bg-surface)',
        border: mine ? 'none' : '1px solid var(--border-subtle)',
      }}>
        <div style={{ fontSize: 12, color: mine ? '#fff' : 'var(--text-primary)', lineHeight: 1.5 }}>{text}</div>
        <div style={{ fontSize: 9, color: mine ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)', marginTop: 3, textAlign: 'right' }}>{t}</div>
      </div>
    </div>
  );
}

Object.assign(window, { CourierFindView, MyCouriersView });
