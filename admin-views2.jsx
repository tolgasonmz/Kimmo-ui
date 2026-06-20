// admin-views2.jsx — Finance, Campaigns, Notifications, Roles, Audit, Config, Reports
const { Icon, Badge, money,
  FINANCE_DATA, AUDIT_LOGS, ROLES, PLATFORM_STATS, USER_REPORTS,
  MetricCard, TableHeader, TableRow, Chip, MiniBtn } = window;

const AP = '24px';

// ============ FINANCE ============
function AdminFinance() {
  const f = FINANCE_DATA;
  const dStatusMap = { open: ['Açık', 'warning'], resolved: ['Çözüldü', 'success'] };

  return (
    <div style={{ padding: AP }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Finans & Ödeme</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>Platform gelir ve ödeme yönetimi</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Toplam GMV" value={'₺' + (f.totalGMV / 1000000).toFixed(1) + 'M'} change="%22" changeUp icon="wallet" />
        <MetricCard label="Abonelik & paket geliri" value={'₺' + (f.commission / 1000000).toFixed(1) + 'M'} change="%18" changeUp icon="tag" />
        <MetricCard label="Yapılan ödemeler" value={'₺' + (f.payouts / 1000000).toFixed(1) + 'M'} icon="check" />
        <MetricCard label="Bekleyen ödeme" value={'₺' + (f.pending / 1000000).toFixed(1) + 'M'} icon="clock" />
      </div>

      {/* Disputes */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>İtiraz Yönetimi</div>
          <Badge tone="warning" style={{ fontSize: 12 }}>{f.disputes.filter(d => d.status === 'open').length} açık</Badge>
        </div>
        <TableHeader>
          <span style={{ flex: '0 0 70px' }}>ID</span>
          <span style={{ flex: 1 }}>Müşteri</span>
          <span style={{ flex: 1 }}>Restoran</span>
          <span style={{ flex: '0 0 80px' }}>Tutar</span>
          <span style={{ flex: 1 }}>Sebep</span>
          <span style={{ flex: '0 0 80px' }}>Durum</span>
          <span style={{ flex: '0 0 70px' }}>Tarih</span>
          <span style={{ flex: '0 0 60px' }}></span>
        </TableHeader>
        {f.disputes.map(d => {
          const [sLabel, sTone] = dStatusMap[d.status] || ['—', 'neutral'];
          return (
            <TableRow key={d.id}>
              <span style={{ flex: '0 0 70px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--text-tertiary)' }}>{d.id}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{d.customer}</span>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{d.restaurant}</span>
              <span style={{ flex: '0 0 80px', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{money(d.amount)}</span>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{d.reason}</span>
              <span style={{ flex: '0 0 80px' }}><Badge tone={sTone} style={{ fontSize: 11 }}>{sLabel}</Badge></span>
              <span style={{ flex: '0 0 70px', fontSize: 12, color: 'var(--text-tertiary)' }}>{d.date}</span>
              <span style={{ flex: '0 0 60px', display: 'flex', justifyContent: 'flex-end' }}>{d.status === 'open' && <MiniBtn icon="check" title="Çöz" accent />}</span>
            </TableRow>
          );
        })}
      </div>

      {/* Fraud detection */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Dolandırıcılık Tespiti</div>
          <Badge tone="error" style={{ fontSize: 12 }}>{f.fraud.length} uyarı</Badge>
        </div>
        {f.fraud.map((fr, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < f.fraud.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, flex: 'none', display: 'grid', placeItems: 'center',
              background: fr.risk === 'high' ? 'var(--error-50)' : 'var(--warning-50)' }}>
              <Icon name="close" size={20} color={fr.risk === 'high' ? 'var(--error-500)' : 'var(--warning-500)'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{fr.type}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{fr.detail}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Badge tone={fr.risk === 'high' ? 'error' : 'warning'} style={{ fontSize: 11 }}>{fr.risk === 'high' ? 'Yüksek risk' : 'Orta risk'}</Badge>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{fr.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CAMPAIGNS (Admin-level) ============
function AdminCampaigns() {
  const campaigns = [
    { name: 'Yaz Kampanyası — %30 İndirim', scope: 'Tüm platform', status: 'active', reach: '86.4K', conversions: 4200, spend: 126000 },
    { name: 'Kadıköy Özel — Ücretsiz Teslimat', scope: 'Kadıköy bölgesi', status: 'active', reach: '12.8K', conversions: 890, spend: 24000 },
    { name: 'Kimoo+ Tanıtım', scope: 'Yeni müşteriler', status: 'scheduled', reach: '—', conversions: 0, spend: 50000 },
    { name: 'Ramazan Kampanyası', scope: 'Tüm platform', status: 'ended', reach: '64K', conversions: 8400, spend: 310000 },
  ];

  return (
    <div style={{ padding: AP }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Kampanya Yönetimi</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>Platform geneli kampanyalar, öne çıkarma, reklam</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>
          <Icon name="plus" size={18} color="#fff" />Yeni kampanya
        </button>
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
        <MetricCard label="Aktif kampanya" value="2" icon="tag" />
        <MetricCard label="Toplam erişim" value="163K" icon="user" />
        <MetricCard label="Dönüşüm" value="13.5K" change="%32" changeUp icon="check" />
        <MetricCard label="Harcama" value="₺510K" icon="wallet" />
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: 1 }}>Kampanya</span>
          <span style={{ flex: '0 0 130px' }}>Kapsam</span>
          <span style={{ flex: '0 0 80px' }}>Erişim</span>
          <span style={{ flex: '0 0 90px' }}>Dönüşüm</span>
          <span style={{ flex: '0 0 100px' }}>Bütçe</span>
          <span style={{ flex: '0 0 100px' }}>Durum</span>
        </TableHeader>
        {campaigns.map((c, i) => {
          const sMap = { active: ['Aktif', 'success'], scheduled: ['Planlandı', 'info'], ended: ['Bitti', 'neutral'] };
          const [sl, st] = sMap[c.status] || ['—', 'neutral'];
          return (
            <TableRow key={i}>
              <span style={{ flex: 1, fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{c.name}</span>
              <span style={{ flex: '0 0 130px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.scope}</span>
              <span style={{ flex: '0 0 80px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.reach}</span>
              <span style={{ flex: '0 0 90px', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{c.conversions > 0 ? c.conversions.toLocaleString('tr-TR') : '—'}</span>
              <span style={{ flex: '0 0 100px', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{money(c.spend)}</span>
              <span style={{ flex: '0 0 100px' }}><Badge tone={st} style={{ fontSize: 11 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: st === 'success' ? 'var(--success-500)' : st === 'info' ? 'var(--info-500)' : 'var(--text-muted)' }}></span>{sl}</Badge></span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

// ============ NOTIFICATIONS ============
function AdminNotifications() {
  const notifs = [
    { title: 'Yaz Kampanyası Başladı!', body: 'Tüm siparişlerde %30 indirim.', audience: 'Tüm müşteriler', sent: '86.4K', date: '10 Haz', type: 'push' },
    { title: 'Yeni bölge: Beykoz', body: 'Beykoz bölgesi artık aktif.', audience: 'Beykoz müşterileri', sent: '2.1K', date: '8 Haz', type: 'push' },
    { title: 'Kurye bonusu aktif', body: '20-22 arası +₺15 bonus.', audience: 'Tüm kuryeler', sent: '580', date: '7 Haz', type: 'in-app' },
  ];

  return (
    <div style={{ padding: AP }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Bildirim Yönetimi</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>Push, in-app, e-posta ve SMS bildirimleri</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>
          <Icon name="plus" size={18} color="#fff" />Bildirim gönder
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notifs.map((n, i) => (
          <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <Icon name="msg" size={22} color="var(--brand-600)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{n.body}</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>
                <span>📤 {n.sent} gönderildi</span>
                <span>👥 {n.audience}</span>
                <span>📅 {n.date}</span>
              </div>
            </div>
            <Badge tone={n.type === 'push' ? 'brand' : 'neutral'} style={{ fontSize: 11 }}>{n.type === 'push' ? 'Push' : 'In-app'}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ ROLES ============
function AdminRoles() {
  return (
    <div style={{ padding: AP }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Rol & Yetki Yönetimi</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>Rol tabanlı erişim kontrolü (RBAC)</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-brand)' }}>
          <Icon name="plus" size={18} color="#fff" />Yeni rol
        </button>
      </div>

      {/* v8: V1 tek admin rolu + 2FA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 'var(--radius-lg)', background: 'var(--info-50)', border: '1px solid color-mix(in srgb, var(--info-500) 20%, transparent)', marginBottom: 16 }}>
        <div style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--info-500)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="user" size={19} color="#fff" /></div>
        <div style={{ flex: 1, fontSize: 13.5, color: 'var(--info-600)', lineHeight: 1.45 }}>V1'de tek <strong>Süper Admin</strong> rolü aktiftir; alana göre ayrışma ilerleyen süreçte açılacaktır. Aşağıdaki roller planlanan yapıdır. Admin paneline erişim <strong>2FA</strong> ile korunur (Sprint 1'den zorunlu).</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ROLES.map((r, i) => (
          <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: i === 0 ? 'var(--brand-500)' : 'var(--bg-sunken)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <Icon name="user" size={20} color={i === 0 ? '#fff' : 'var(--text-tertiary)'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{r.perms}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{r.users}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>kullanıcı</div>
            </div>
            <MiniBtn icon="chevR" title="Düzenle" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ AUDIT LOGS ============
function AdminAudit() {
  const levelColor = { warning: 'var(--warning-500)', info: 'var(--info-500)', success: 'var(--success-500)' };
  return (
    <div style={{ padding: AP }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Denetim Kayıtları</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>Tüm yönetici işlemleri — gerçek zamanlı</div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: '0 0 60px' }}>Saat</span>
          <span style={{ flex: '0 0 160px' }}>Kullanıcı</span>
          <span style={{ flex: 1 }}>İşlem</span>
          <span style={{ flex: 1 }}>Hedef</span>
          <span style={{ flex: '0 0 60px' }}>Seviye</span>
        </TableHeader>
        {AUDIT_LOGS.map((l, i) => (
          <TableRow key={i}>
            <span style={{ flex: '0 0 60px', fontFamily: 'var(--font-mono, monospace)', fontSize: 13, color: 'var(--text-tertiary)' }}>{l.time}</span>
            <span style={{ flex: '0 0 160px', fontSize: 13, color: 'var(--text-secondary)' }}>{l.user}</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{l.action}</span>
            <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{l.target}</span>
            <span style={{ flex: '0 0 60px' }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: levelColor[l.level] || 'var(--text-muted)', display: 'inline-block' }}></span>
            </span>
          </TableRow>
        ))}
      </div>
    </div>
  );
}

// ============ SYSTEM CONFIG ============
function AdminConfig() {
  const groups = [
    { title: 'Görünüm', items: [
      { label: 'Tema', value: '__theme__', desc: 'Açık veya koyu mod arasında geç' },
    ]},
    { title: 'Abonelik & Seçili Restoran', items: [
      { label: 'Aylık abonelik', value: '4.400 TL/ay', desc: 'İlk ay ücretsiz · taahhütsüz' },
      { label: 'Yıllık abonelik', value: '3.900 TL/ay', desc: '10 ay öde, 12 ay kullan · 2 ay ücretsiz' },
      { label: 'Seçili Restoran ek ücreti', value: '900 TL/ay', desc: 'Standart aboneliğin üzerine eklenir' },
      { label: 'Seçili Restoran aktivasyon', value: '%95 profil', desc: '%95 profil tamamlanma + ücret ödemesi zorunlu' },
    ]},
    { title: 'Kimoo Puanı', items: [
      { label: 'Kazanım oranı', value: '%5 · maks 25 TL', desc: 'Yalnızca Seçili Restoran online siparişlerinde' },
      { label: 'Minimum sipariş (kazanım/kullanım)', value: '250 TL', desc: 'KDV dahil yemek tutarı baz alınır' },
      { label: 'Kullanım oranı', value: '%20 · maks 100 TL', desc: 'Sipariş tutarının en fazla %20\'si' },
      { label: 'Birikim tavanı', value: '400 TL', desc: 'Hesapta en fazla biriken Kimoo Puanı' },
      { label: 'Aylık kullanım tavanı', value: '300 TL', desc: 'Bir ayda kullanılabilecek en fazla puan' },
      { label: 'Ay sonu devir tavanı', value: '100 TL', desc: 'Sonraki aya devreden en fazla puan' },
    ]},
    { title: 'Kurye & Teslimat', items: [
      { label: 'Havuz kurye net kazancı', value: '97,5 TL', desc: 'Her teslimat için KDV dahil net' },
      { label: '"Teslimat kodu alınamadı" limiti', value: '2 / gün', desc: 'Kurye başına günlük; arka planda izlenir' },
      { label: 'Eskalasyon başlangıcı', value: '45 dk', desc: 'Teslim edilmezse chat → arama akışı başlar' },
      { label: 'Kurye bahşiş limiti', value: '200 TL', desc: 'Tek siparişte verilebilecek maksimum bahşiş' },
    ]},
    { title: 'Güvenlik & Onay', items: [
      { label: 'Admin 2FA', value: 'Zorunlu', desc: 'Sprint 1\'den itibaren zorunludur' },
      { label: 'İşletme onay SLA', value: '24 saat', desc: 'Admin takvim günü içinde inceler ve karar verir' },
      { label: 'Şikayet değerlendirme', value: '1-7 iş günü', desc: 'Finansal işlemler muhasebe onayı ile' },
      { label: 'Nakit ödeme ön koşulu', value: '1 online sipariş', desc: 'En az 1 tamamlanmış online sipariş gerekir' },
      { label: 'SMS brute force', value: '3 → 5 dk', desc: '3 yanlış giriş sonrası 5 dk bekleme + rate limiting' },
    ]},
  ];

  return (
    <div style={{ padding: AP }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Sistem Ayarları</div>
      <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>Platform geneli politika ve konfigürasyon (v8)</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {groups.map((g, gi) => (
          <div key={gi}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{g.title}</div>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {g.items.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '15px 20px', borderBottom: i < g.items.length - 1 ? '1px solid var(--border-subtle)' : 'none', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{c.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{c.desc}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--brand-600)', minWidth: 120, textAlign: 'right' }}>
                    {c.value === '__theme__' ? <window.ThemeSelector size="sm" /> : c.value}
                  </div>
                  {c.value !== '__theme__' && <MiniBtn icon="chevR" title="Düzenle" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ REPORTS MANAGEMENT ============
function AdminReports() {
  const [filter, setFilter] = React.useState('all');
  const [selected, setSelected] = React.useState(null);
  const filtered = filter === 'all' ? USER_REPORTS : USER_REPORTS.filter(r => r.status === filter);
  const statusMap = { open: ['Açık', 'warning'], investigating: ['İnceleniyor', 'info'], resolved: ['Çözüldü', 'success'] };
  const priorityMap = { high: ['Yüksek', 'error'], medium: ['Orta', 'warning'], low: ['Düşük', 'neutral'] };

  if (selected) {
    const r = USER_REPORTS.find(x => x.id === selected);
    const [sLabel, sTone] = statusMap[r.status] || ['—', 'neutral'];
    const [pLabel, pTone] = priorityMap[r.priority] || ['—', 'neutral'];
    return (
      <div style={{ padding: AP }}>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginBottom: 18 }}>
          <Icon name="back" size={18} color="var(--text-tertiary)" /> Raporlara dön
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{r.id}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge tone={sTone} style={{ fontSize: 12, padding: '5px 12px' }}>{sLabel}</Badge>
                <Badge tone={pTone} style={{ fontSize: 12, padding: '5px 12px' }}>Öncelik: {pLabel}</Badge>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
              {[['Bildiren', r.reporter + ' (' + (r.reporterType === 'customer' ? 'Müşteri' : 'Kurye') + ')', 'user'],
                ['Hedef', r.target, 'close'],
                ['Sipariş', r.order, 'bag'],
                ['Tarih', r.date, 'clock']].map(([l, v, ic], i) => (
                <div key={i} style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: 14, textAlign: 'center' }}>
                  <Icon name={ic} size={16} color="var(--brand-500)" style={{ display: 'block', margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Sebep</div>
            <Badge tone="warning" style={{ fontSize: 13, padding: '5px 14px', marginBottom: 16 }}>{r.reason}</Badge>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Açıklama</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, padding: 16, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)' }}>{r.detail}</div>
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {r.status === 'open' && (
              <>
                <ActionAdminBtn label="İncelemeye al" icon="clock" color="var(--info-500)" />
                <ActionAdminBtn label="Çözüldü olarak işaretle" icon="check" color="var(--success-500)" />
              </>
            )}
            {r.status === 'investigating' && (
              <ActionAdminBtn label="Çözüldü olarak işaretle" icon="check" color="var(--success-500)" />
            )}
            <ActionAdminBtn label="Hedefe uyarı gönder" icon="msg" color="var(--warning-500)" />
            <ActionAdminBtn label="Hesabı askıya al" icon="close" color="var(--error-500)" />
            <ActionAdminBtn label="Bildireni ara" icon="phone" outline />
            <ActionAdminBtn label="Sipariş detayı" icon="bag" outline />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: AP }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Kullanıcı Raporları</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 2 }}>Müşteri ve kurye bildirimleri — inceleme merkezi</div>
        </div>
        <Badge tone="warning" style={{ fontSize: 13, padding: '6px 16px' }}>{USER_REPORTS.filter(r => r.status === 'open').length} açık rapor</Badge>
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
        <MetricCard label="Toplam rapor" value={USER_REPORTS.length} icon="close" />
        <MetricCard label="Açık" value={USER_REPORTS.filter(r => r.status === 'open').length} icon="clock" />
        <MetricCard label="İnceleniyor" value={USER_REPORTS.filter(r => r.status === 'investigating').length} icon="msg" />
        <MetricCard label="Çözülen" value={USER_REPORTS.filter(r => r.status === 'resolved').length} change="Bu hafta" changeUp icon="check" />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[['all', 'Tümü'], ['open', 'Açık'], ['investigating', 'İnceleniyor'], ['resolved', 'Çözüldü']].map(([k, l]) => (
          <Chip key={k} active={filter === k} onClick={() => setFilter(k)}>{l} ({k === 'all' ? USER_REPORTS.length : USER_REPORTS.filter(r => r.status === k).length})</Chip>
        ))}
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <TableHeader>
          <span style={{ flex: '0 0 90px' }}>ID</span>
          <span style={{ flex: 1 }}>Bildiren</span>
          <span style={{ flex: 1 }}>Hedef</span>
          <span style={{ flex: '0 0 140px' }}>Sebep</span>
          <span style={{ flex: '0 0 80px' }}>Öncelik</span>
          <span style={{ flex: '0 0 100px' }}>Durum</span>
          <span style={{ flex: '0 0 70px' }}>Tarih</span>
        </TableHeader>
        {filtered.map(r => {
          const [sLabel, sTone] = statusMap[r.status] || ['—', 'neutral'];
          const [pLabel, pTone] = priorityMap[r.priority] || ['—', 'neutral'];
          return (
            <TableRow key={r.id} onClick={() => setSelected(r.id)}>
              <span style={{ flex: '0 0 90px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--text-tertiary)' }}>{r.id}</span>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: r.reporterType === 'customer' ? 'var(--brand-50)' : 'var(--success-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <Icon name={r.reporterType === 'customer' ? 'user' : 'scooter'} size={14} color={r.reporterType === 'customer' ? 'var(--brand-600)' : 'var(--success-600)'} />
                </div>
                <div><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{r.reporter}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.reporterType === 'customer' ? 'Müşteri' : 'Kurye'}</div></div>
              </span>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{r.target}</span>
              <span style={{ flex: '0 0 140px', fontSize: 13, color: 'var(--text-secondary)' }}>{r.reason}</span>
              <span style={{ flex: '0 0 80px' }}><Badge tone={pTone} style={{ fontSize: 10 }}>{pLabel}</Badge></span>
              <span style={{ flex: '0 0 100px' }}><Badge tone={sTone} style={{ fontSize: 11 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: sTone === 'success' ? 'var(--success-500)' : sTone === 'warning' ? 'var(--warning-500)' : 'var(--info-500)' }}></span>{sLabel}</Badge></span>
              <span style={{ flex: '0 0 70px', fontSize: 12, color: 'var(--text-tertiary)' }}>{r.date}</span>
            </TableRow>
          );
        })}
      </div>
    </div>
  );
}

function ActionAdminBtn({ label, icon, color, outline }) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, cursor: 'pointer', width: '100%',
      background: outline ? 'var(--bg-surface)' : color, color: outline ? 'var(--text-primary)' : '#fff',
      border: outline ? '1.5px solid var(--border-default)' : 'none',
      boxShadow: outline ? 'none' : '0 4px 12px ' + (color || 'var(--brand-500)') + '44',
    }}>
      <Icon name={icon} size={18} color={outline ? color || 'var(--text-secondary)' : '#fff'} />{label}
    </button>
  );
}

Object.assign(window, { AdminFinance, AdminCampaigns, AdminNotifications, AdminRoles, AdminAudit, AdminConfig, AdminReports });
