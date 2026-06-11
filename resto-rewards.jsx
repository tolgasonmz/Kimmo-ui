// resto-rewards.jsx — Restoran Ödüller & Meydan Okumalar view
const { Icon, Badge, money, MetricCard } = window;

const RESTO_CHALLENGES = {
  daily: [
    { id: 'rd_o50',      icon: 'bag',    title: 'Günlük 50 Sipariş',    desc: 'Bugün 50 ve üzeri sipariş al',             target: 50,    current: 47,    unit: 'sipariş', reward: 500,  status: 'active'    },
    { id: 'rd_rev15k',   icon: 'wallet', title: '₺15.000 Ciro',         desc: 'Bugün ₺15.000 ciro yap',                  target: 15000, current: 12480, unit: '₺',       reward: 750,  status: 'active'    },
    { id: 'rd_nocancel', icon: 'check',  title: 'Sıfır İptal',          desc: 'Bugün hiçbir siparişi iptal etme',         target: 1,     current: 1,     unit: '',        reward: 200,  status: 'completed' },
    { id: 'rd_rating',   icon: 'star',   title: '4.8+ Puan Koru',       desc: 'Bugün 4.8 ve üzeri müşteri puanı',        target: 4.8,   current: 4.8,   unit: '★',       reward: 300,  status: 'completed' },
    { id: 'rd_speed',    icon: 'clock',  title: 'Hızlı Hazırlık',       desc: 'Ortalama hazırlık süresini 20 dk altında tut', target: 20, current: 18, unit: 'dk',      reward: 250,  status: 'completed' },
  ],
  weekly: [
    { id: 'rw_o300',     icon: 'bag',    title: 'Haftalık 300 Sipariş', desc: 'Bu hafta 300 sipariş al',                 target: 300,   current: 247,   unit: 'sipariş', reward: 2000, status: 'active'    },
    { id: 'rw_rev80k',   icon: 'wallet', title: '₺80.000 Ciro',         desc: 'Bu hafta ₺80.000 ciro yap',               target: 80000, current: 65200, unit: '₺',       reward: 3500, status: 'active'    },
    { id: 'rw_newcust',  icon: 'user',   title: '30 Yeni Müşteri',      desc: 'Bu hafta 30 yeni müşteri kazan',          target: 30,    current: 22,    unit: 'müşteri', reward: 1000, status: 'active'    },
    { id: 'rw_reply',    icon: 'msg',    title: 'Yorumları Yanıtla',    desc: 'Bu hafta gelen tüm yorumları yanıtla',    target: 10,    current: 10,    unit: 'yanıt',   reward: 500,  status: 'completed' },
  ],
};

const RESTO_REWARD_HISTORY = [
  { date: 'Bugün',  title: 'Sıfır İptal',             amount: 200  },
  { date: 'Bugün',  title: '4.8+ Puan Koru',           amount: 300  },
  { date: 'Bugün',  title: 'Hızlı Hazırlık',           amount: 250  },
  { date: 'Dün',    title: 'Günlük 50 Sipariş',        amount: 500  },
  { date: '10 Haz', title: 'Yorumları Yanıtla',        amount: 500  },
  { date: '9 Haz',  title: 'Haftalık 300 Sipariş',     amount: 2000 },
  { date: '8 Haz',  title: '₺80.000 Ciro',             amount: 3500 },
];

const RESTO_TIER = {
  name: 'Altın Restoran', level: 3, maxLevel: 4, nextTier: 'Platin Restoran',
  points: 2840, nextPoints: 4000, monthEarned: 7200, totalEarned: 18750,
};

function RestaurantRewardsView() {
  const [tab, setTab] = React.useState('daily');
  const [claimed, setClaimed] = React.useState(new Set());

  const challenges = RESTO_CHALLENGES[tab] || [];
  const allChallenges = [...RESTO_CHALLENGES.daily, ...RESTO_CHALLENGES.weekly];
  const pendingAmount = allChallenges
    .filter(c => c.status === 'completed' && !claimed.has(c.id))
    .reduce((s, c) => s + c.reward, 0);
  const completedCount = allChallenges.filter(c => c.status === 'completed').length;

  const claim = (id) => setClaimed(prev => new Set([...prev, id]));
  const t = RESTO_TIER;
  const tierPct = (t.points / t.nextPoints) * 100;

  return (
    <div style={{ padding: '24px' }}>
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Ödüller &amp; Meydan Okumalar</div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 3 }}>Hedefleri tamamla, restoran seviyeni yükselt, para kazan</div>
        </div>
        {pendingAmount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--success-50)', border: '1.5px solid color-mix(in srgb, var(--success-500) 35%, transparent)', borderRadius: 999, padding: '10px 20px', flex: 'none' }}>
            <Icon name="trophy" size={16} color="var(--success-600)" />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--success-700)' }}>{money(pendingAmount)} bekleyen ödül</span>
          </div>
        )}
      </div>

      {/* Metric cards */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Bu ay kazanılan"     value={money(t.monthEarned)}  change="%34" changeUp icon="wallet" />
        <MetricCard label="Toplam kazanılan"    value={money(t.totalEarned)}               icon="trophy" />
        <MetricCard label="Tamamlanan görevler" value={`${completedCount} görev`} change="%15" changeUp icon="check" />
        <MetricCard label="Bekleyen ödül"       value={money(pendingAmount)}               icon="star" />
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>

        {/* Left: challenge panel */}
        <div>
          <div style={{ display: 'flex', gap: 2, padding: 4, background: 'var(--bg-sunken)', borderRadius: 999, marginBottom: 16, width: 'fit-content' }}>
            {[['daily', 'Günlük'], ['weekly', 'Haftalık'], ['history', 'Geçmiş']].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                padding: '8px 22px', borderRadius: 999, fontSize: 13, fontWeight: 700,
                background: tab === k ? 'var(--bg-surface)' : 'transparent',
                color: tab === k ? 'var(--text-primary)' : 'var(--text-tertiary)',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
                boxShadow: tab === k ? 'var(--shadow-sm)' : 'none', transition: 'all .15s ease',
              }}>{l}</button>
            ))}
          </div>

          {tab !== 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {challenges.map(c => {
                const isDone = c.status === 'completed';
                const isClaimed = claimed.has(c.id);
                let pct;
                if (c.unit === '') pct = 100;
                else pct = Math.min((c.current / c.target) * 100, 100);
                return <RestoChallengeCard key={c.id} c={c} pct={pct} isDone={isDone} isClaimed={isClaimed} onClaim={() => claim(c.id)} />;
              })}
            </div>
          )}

          {tab === 'history' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {RESTO_REWARD_HISTORY.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < RESTO_REWARD_HISTORY.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <Icon name="trophy" size={18} color="var(--success-600)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{r.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--success-600)' }}>+{money(r.amount)}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>Ödendi</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: tier + benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Tier card */}
          <div style={{ background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: '22px 20px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -24, top: -24, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ position: 'absolute', right: 16, bottom: -16, width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}></div>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Mevcut Seviyeniz</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 2 }}>🏆 {t.name}</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 18 }}>Seviye {t.level} / {t.maxLevel}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ opacity: 0.8 }}>{t.points.toLocaleString('tr-TR')} puan</span>
                <span style={{ opacity: 0.8 }}>{t.nextPoints.toLocaleString('tr-TR')} puan</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
                <div style={{ width: `${tierPct}%`, height: '100%', borderRadius: 999, background: '#fff' }}></div>
              </div>
              <div style={{ fontSize: 12, marginTop: 8, opacity: 0.75 }}>Sonraki: {t.nextTier}</div>
            </div>
          </div>

          {/* Tier levels reference */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Seviye Sistemi</div>
            {[
              { tier: 'Bronz',  pts: '0',    icon: '🥉', active: false },
              { tier: 'Gümüş', pts: '1.000', icon: '🥈', active: false },
              { tier: 'Altın',  pts: '2.000', icon: '🏆', active: true  },
              { tier: 'Platin', pts: '4.000', icon: '💎', active: false },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none', opacity: s.active ? 1 : 0.5 }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: s.active ? 700 : 500, color: 'var(--text-primary)' }}>{s.tier} Restoran</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.pts}+ puan</div>
                </div>
                {s.active && <Badge tone="brand" style={{ fontSize: 11 }}>Aktif</Badge>}
              </div>
            ))}
          </div>

          {/* Active benefits */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>Altın Avantajları</div>
            {[
              ['wallet', 'Komisyon indirimi',        '%2'],
              ['star',   'Öncelikli kurye atama',    'Aktif'],
              ['tag',    'Kampanya bonusu',           '+%15'],
              ['flame',  'Yoğun saat önceliği',      'Aktif'],
            ].map(([ic, label, val], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <Icon name={ic} size={14} color="var(--brand-600)" />
                </div>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-600)' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Upcoming */}
          <div style={{ background: 'var(--warning-50)', border: '1px solid color-mix(in srgb, var(--warning-500) 22%, transparent)', borderRadius: 'var(--radius-lg)', padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Icon name="flame" size={17} color="var(--warning-600)" />
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>Yaklaşan Fırsat</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Yarın özel meydan okuma:<br />
              <strong style={{ color: 'var(--text-primary)' }}>₺20.000 Ciro Bonusu — ₺1.500 ödül</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestoChallengeCard({ c, pct, isDone, isClaimed, onClaim }) {
  return (
    <div style={{
      background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: 18,
      border: `1.5px solid ${isDone && !isClaimed ? 'color-mix(in srgb, var(--success-500) 40%, transparent)' : 'var(--border-subtle)'}`,
      opacity: isClaimed ? 0.65 : 1, transition: 'opacity .2s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: isDone ? 'var(--success-50)' : 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
          <Icon name={c.icon} size={22} color={isDone ? 'var(--success-600)' : 'var(--brand-600)'} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{c.title}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{c.desc}</div>
        </div>
        <div style={{ textAlign: 'right', flex: 'none' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: isDone ? 'var(--success-600)' : 'var(--brand-600)' }}>{money(c.reward)}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>ödül</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
        <span style={{ color: 'var(--text-secondary)' }}>
          {c.unit === ''  ? 'Bugün iptal yok ✓' :
           c.unit === '₺' ? `${money(c.current)} / ${money(c.target)}` :
           `${c.current} / ${c.target} ${c.unit}`}
        </span>
        <span style={{ color: isDone ? 'var(--success-600)' : 'var(--brand-600)' }}>
          {isDone ? '✓ Tamamlandı' : `%${Math.round(pct)}`}
        </span>
      </div>
      <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: isDone ? 'var(--success-500)' : 'var(--brand-500)', transition: 'width .5s cubic-bezier(0.22,1,0.36,1)' }}></div>
      </div>

      {isDone && !isClaimed && (
        <button onClick={onClaim} style={{
          width: '100%', padding: '11px 0', marginTop: 14, borderRadius: 999,
          background: 'var(--success-500)', color: '#fff', border: 'none',
          fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)',
          boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
        }}>🎉 {money(c.reward)} Ödülü Talep Et</button>
      )}
      {isDone && isClaimed && (
        <div style={{ marginTop: 14, textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--success-600)' }}>
          ✓ Ödül hesabına eklendi
        </div>
      )}
    </div>
  );
}

Object.assign(window, { RestaurantRewardsView, RestoChallengeCard, RESTO_CHALLENGES, RESTO_REWARD_HISTORY, RESTO_TIER });
