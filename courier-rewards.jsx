// courier-rewards.jsx — Ödüller & Meydan Okumalar ekranı
const { Icon, Badge, money } = window;

const COURIER_CHALLENGES = {
  daily: [
    { id: 'd_km100', icon: 'scooter', title: 'Günlük 100 km',   desc: 'Bugün toplamda 100 km süreç',         target: 100,  current: 67,   unit: 'km',        reward: 150, status: 'active'    },
    { id: 'd_h3',   icon: 'clock',   title: '3 Saat Çalış',     desc: 'Bugün en az 3 saat aktif ol',          target: 3,    current: 3,    unit: 'sa',        reward: 30,  status: 'completed' },
    { id: 'd_h6',   icon: 'clock',   title: '6 Saat Çalış',     desc: 'Bugün en az 6 saat aktif ol',          target: 6,    current: 5.2,  unit: 'sa',        reward: 70,  status: 'active'    },
    { id: 'd_h9',   icon: 'clock',   title: '9 Saat Çalış',     desc: 'Bugün en az 9 saat aktif ol',          target: 9,    current: 5.2,  unit: 'sa',        reward: 120, status: 'active'    },
    { id: 'd_h12',  icon: 'clock',   title: '12 Saat Çalış',    desc: 'Bugün en az 12 saat aktif ol',         target: 12,   current: 5.2,  unit: 'sa',        reward: 200, status: 'active'    },
    { id: 'd_t10',  icon: 'bag',     title: '10 Teslimat',      desc: 'Bugün 10 teslimat tamamla',            target: 10,   current: 8,    unit: 'teslimat',  reward: 80,  status: 'active'    },
  ],
  weekly: [
    { id: 'w_km500', icon: 'scooter', title: 'Haftalık 500 km', desc: 'Bu hafta 500 km süreç',               target: 500,  current: 312,  unit: 'km',        reward: 500, status: 'active'    },
    { id: 'w_h40',   icon: 'clock',   title: 'Haftalık 40 Saat',desc: 'Bu hafta 40 saat çalış',              target: 40,   current: 31,   unit: 'sa',        reward: 400, status: 'active'    },
    { id: 'w_t50',   icon: 'bag',     title: '50 Teslimat',     desc: 'Bu hafta 50 teslimat tamamla',        target: 50,   current: 42,   unit: 'teslimat',  reward: 350, status: 'active'    },
    { id: 'w_star',  icon: 'star',    title: '4.8+ Puan Koru',  desc: 'Bu hafta 4.8 ve üzeri puan tut',     target: 4.8,  current: 4.92, unit: '★',         reward: 150, status: 'completed' },
  ],
};

const COURIER_REWARD_HISTORY = [
  { date: 'Bugün',  title: '3 Saat Çalış',      amount: 30  },
  { date: 'Dün',    title: '10 Teslimat',        amount: 80  },
  { date: 'Dün',    title: '6 Saat Çalış',       amount: 70  },
  { date: '9 Haz',  title: 'Haftalık 500 km',    amount: 500 },
  { date: '8 Haz',  title: 'Günlük 100 km',      amount: 150 },
  { date: '7 Haz',  title: '4.8+ Puan Koru',     amount: 150 },
  { date: '6 Haz',  title: '50 Teslimat',        amount: 350 },
];

function CourierRewardsScreen({ go }) {
  const [tab, setTab] = React.useState('daily');
  const [claimed, setClaimed] = React.useState(new Set());

  const challenges = COURIER_CHALLENGES[tab] || [];
  const allChallenges = [...COURIER_CHALLENGES.daily, ...COURIER_CHALLENGES.weekly];
  const pendingAmount = allChallenges
    .filter(c => c.status === 'completed' && !claimed.has(c.id))
    .reduce((s, c) => s + c.reward, 0);

  const claim = (id) => setClaimed(prev => new Set([...prev, id]));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-app)' }}>
      {/* Header */}
      <div style={{ paddingTop: 56, padding: '56px 20px 14px', background: 'var(--bg-surface)' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Ödüller</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Meydan okumaları tamamla, ödül kazan</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Hero card */}
        <div style={{ margin: '16px 20px 0', background: 'var(--brand-500)', borderRadius: 'var(--radius-lg)', padding: '20px 20px 18px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -24, top: -24, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ position: 'absolute', right: 30, bottom: -18, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}></div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Bu ay kazandın</div>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em' }}>₺1.240</div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 3 }}>23 meydan okuma tamamlandı</div>
            {pendingAmount > 0 && (
              <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.18)', borderRadius: 'var(--radius-md)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="trophy" size={16} color="#fff" />
                <span style={{ fontSize: 13, fontWeight: 700 }}>{money(pendingAmount)} ödül seni bekliyor!</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 10, padding: '14px 20px 0' }}>
          {[
            { label: 'Bugün', value: '₺30', sub: '1 tamamlandı' },
            { label: 'Bu hafta', value: '₺150', sub: '1 tamamlandı' },
            { label: 'Bu ay', value: '₺1.240', sub: '23 tamamlandı' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)', padding: '12px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', gap: 2, padding: 4, background: 'var(--bg-sunken)', borderRadius: 999 }}>
            {[['daily', 'Günlük'], ['weekly', 'Haftalık'], ['history', 'Geçmiş']].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                flex: 1, padding: '9px 0', borderRadius: 999, fontSize: 13, fontWeight: 700,
                background: tab === k ? 'var(--bg-surface)' : 'transparent',
                color: tab === k ? 'var(--text-primary)' : 'var(--text-tertiary)',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
                boxShadow: tab === k ? 'var(--shadow-sm)' : 'none', transition: 'all .15s ease',
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Challenge cards */}
        {tab !== 'history' && (
          <div style={{ padding: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {challenges.map(c => {
              const isDone = c.status === 'completed';
              const isClaimed = claimed.has(c.id);
              const pct = Math.min((c.current / c.target) * 100, 100);
              return <CourierChallengeCard key={c.id} c={c} pct={pct} isDone={isDone} isClaimed={isClaimed} onClaim={() => claim(c.id)} />;
            })}
          </div>
        )}

        {/* History */}
        {tab === 'history' && (
          <div style={{ padding: '12px 20px 0' }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
              {COURIER_REWARD_HISTORY.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < COURIER_REWARD_HISTORY.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--success-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <Icon name="trophy" size={18} color="var(--success-600)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{r.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--success-600)' }}>+{money(r.amount)}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>Ödendi</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CourierChallengeCard({ c, pct, isDone, isClaimed, onClaim }) {
  return (
    <div style={{
      background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: 16,
      border: `1.5px solid ${isDone && !isClaimed ? 'color-mix(in srgb, var(--success-500) 40%, transparent)' : 'var(--border-subtle)'}`,
      opacity: isClaimed ? 0.6 : 1, transition: 'opacity .2s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: 999, background: isDone ? 'var(--success-50)' : 'var(--brand-50)', display: 'grid', placeItems: 'center', flex: 'none' }}>
          <Icon name={c.icon} size={20} color={isDone ? 'var(--success-600)' : 'var(--brand-600)'} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{c.title}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>{c.desc}</div>
        </div>
        <div style={{ textAlign: 'right', flex: 'none' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: isDone ? 'var(--success-600)' : 'var(--brand-600)' }}>{money(c.reward)}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>ödül</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
        <span style={{ color: 'var(--text-secondary)' }}>{c.current} / {c.target} {c.unit}</span>
        <span style={{ color: isDone ? 'var(--success-600)' : 'var(--brand-600)' }}>
          {isDone ? '✓ Tamamlandı' : `%${Math.round(pct)}`}
        </span>
      </div>
      <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-sunken)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: isDone ? 'var(--success-500)' : 'var(--brand-500)', transition: 'width .5s cubic-bezier(0.22,1,0.36,1)' }}></div>
      </div>

      {isDone && !isClaimed && (
        <button onClick={onClaim} style={{
          width: '100%', marginTop: 12, padding: '11px 0', borderRadius: 999,
          background: 'var(--success-500)', color: '#fff', border: 'none',
          fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)',
          boxShadow: '0 4px 14px rgba(22,163,74,0.32)',
        }}>🎉 {money(c.reward)} Ödülü Talep Et</button>
      )}
      {isDone && isClaimed && (
        <div style={{ marginTop: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--success-600)' }}>
          ✓ Ödül hesabına eklendi
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  CourierRewardsScreen, CourierChallengeCard,
  COURIER_CHALLENGES, COURIER_REWARD_HISTORY,
});
