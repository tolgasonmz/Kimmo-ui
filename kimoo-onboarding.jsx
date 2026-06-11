// kimoo-onboarding.jsx — Splash, Welcome slides, Login, OTP, Location permission
const { Icon, PrimaryBtn, MediaBox } = window;

// ============ SPLASH ============
function SplashScreen({ onDone }) {
  React.useEffect(() => { const t = setTimeout(onDone, 1800); return () => clearTimeout(t); }, []);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--brand-500)', gap: 16 }}>
      <div style={{ width: 88, height: 88, borderRadius: 24, background: 'rgba(255,255,255,0.18)', display: 'grid', placeItems: 'center', animation: 'splashPop .6s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <span style={{ color: '#fff', fontSize: 48, fontWeight: 800 }}>k</span>
      </div>
      <div style={{ color: '#fff', fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em' }}>kimoo</div>
      <style>{`@keyframes splashPop{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
    </div>
  );
}

// ============ WELCOME SLIDES ============
const SLIDES = [
  { title: 'Lezzetler kapında', desc: 'Binlerce restoran, tek uygulama. Favori yemeklerin bir tıkla sana gelsin.', icon: '🍽️', color: 'var(--brand-500)' },
  { title: 'Canlı takip et', desc: 'Siparişini haritadan an be an izle. Kuryen nerede, ne zaman gelecek — hep bileceksin.', icon: '📍', color: 'var(--success-500)' },
  { title: 'Kimoo+ ile tasarruf', desc: 'Sınırsız ücretsiz teslimat, özel indirimler. İlk ay hediye.', icon: '🎁', color: 'var(--brand-500)' },
];

function WelcomeScreen({ onDone }) {
  const [idx, setIdx] = React.useState(0);
  const slide = SLIDES[idx];
  const isLast = idx === SLIDES.length - 1;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)' }}>
      {/* skip */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '62px 20px 0' }}>
        <button onClick={onDone} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Atla</button>
      </div>

      {/* content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', gap: 20 }}>
        <div key={idx} style={{ fontSize: 72, animation: 'slideUp .35s ease' }}>{slide.icon}</div>
        <div key={'t'+idx} style={{ animation: 'slideUp .35s ease' }}>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 10 }}>{slide.title}</div>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.55, maxWidth: '30ch' }}>{slide.desc}</div>
        </div>
      </div>

      {/* dots + button */}
      <div style={{ padding: '0 24px 48px', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {SLIDES.map((_, i) => (
            <div key={i} style={{ width: i === idx ? 28 : 8, height: 8, borderRadius: 999, background: i === idx ? 'var(--brand-500)' : 'var(--border-default)', transition: 'all .3s ease' }} />
          ))}
        </div>
        <PrimaryBtn onClick={() => isLast ? onDone() : setIdx(i => i + 1)}>
          {isLast ? 'Başlayalım' : 'Devam'}
        </PrimaryBtn>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// ============ LOGIN ============
function LoginScreen({ onSubmit }) {
  const [phone, setPhone] = React.useState('');
  const [agree, setAgree] = React.useState(false);
  const valid = phone.replace(/\s/g, '').length >= 10 && agree;

  const formatPhone = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return d.slice(0, 3) + ' ' + d.slice(3);
    return d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)' }}>
      <div style={{ padding: '72px 24px 0', flex: 1 }}>
        {/* brand */}
        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--brand-500)', display: 'grid', placeItems: 'center', marginBottom: 24, boxShadow: 'var(--shadow-brand)' }}>
          <span style={{ color: '#fff', fontSize: 28, fontWeight: 800 }}>k</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 8 }}>Giriş yap</div>
        <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.5 }}>Telefon numaranla devam et. Sana doğrulama kodu göndereceğiz.</div>

        {/* phone field */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>Telefon numarası</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '0 14px', background: 'var(--bg-surface)', transition: 'border-color .15s ease' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)', flex: 'none' }}>🇹🇷 +90</span>
            <div style={{ width: 1, height: 28, background: 'var(--border-subtle)' }}></div>
            <input value={phone} onChange={e => setPhone(formatPhone(e.target.value))} placeholder="555 123 4567" style={{ border: 'none', outline: 'none', background: 'none', fontSize: 17, fontWeight: 600, fontFamily: 'var(--font-sans)', padding: '14px 0', width: '100%', color: 'var(--text-primary)', letterSpacing: '0.02em' }} />
          </div>
        </div>

        {/* agreement */}
        <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setAgree(a => !a)}>
          <span style={{
            width: 22, height: 22, borderRadius: 6, flex: 'none', marginTop: 1,
            border: agree ? '2px solid var(--brand-500)' : '1.5px solid var(--border-strong)',
            background: agree ? 'var(--brand-500)' : 'transparent',
            display: 'grid', placeItems: 'center', transition: 'all .15s ease',
          }}>
            {agree && <Icon name="check" size={14} color="#fff" />}
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Kullanım koşullarını</strong> ve <strong style={{ color: 'var(--text-primary)' }}>gizlilik politikasını</strong> okudum, kabul ediyorum.
          </span>
        </label>

        {/* social */}
        <div style={{ marginTop: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }}></div>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>veya</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }}></div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[['G', 'Google', '#4285F4'], ['A', 'Apple', 'var(--text-primary)']].map(([letter, name, c]) => (
              <button key={name} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px 0', borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: c, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 800 }}>{letter}</span>
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* submit */}
      <div style={{ padding: '16px 24px 48px' }}>
        <PrimaryBtn onClick={() => valid && onSubmit(phone)} disabled={!valid}>Doğrulama kodu gönder</PrimaryBtn>
      </div>
    </div>
  );
}

// ============ OTP ============
function OTPScreen({ phone, onVerify, onBack }) {
  const [digits, setDigits] = React.useState(['', '', '', '', '', '']);
  const [timer, setTimer] = React.useState(59);
  const [verifying, setVerifying] = React.useState(false);
  const [error, setError] = React.useState(false);
  const refs = React.useRef([]);

  React.useEffect(() => {
    if (timer > 0) { const t = setInterval(() => setTimer(s => s - 1), 1000); return () => clearInterval(t); }
  }, [timer]);

  const handleChange = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1);
    const next = [...digits]; next[i] = d; setDigits(next); setError(false);
    if (d && i < 5) refs.current[i + 1]?.focus();
    if (next.every(x => x)) {
      setVerifying(true);
      setTimeout(() => { setVerifying(false); onVerify(); }, 1200);
    }
  };
  const handleKey = (i, e) => { if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus(); };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)' }}>
      <div style={{ padding: '62px 16px 0' }}>
        <button onClick={onBack} style={{ width: 42, height: 42, borderRadius: 999, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer', marginBottom: 24 }}><Icon name="back" size={20} color="var(--text-primary)" /></button>
      </div>
      <div style={{ padding: '0 24px', flex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 8 }}>Doğrulama kodu</div>
        <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 36, lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>+90 {phone}</strong> numarasına 6 haneli kod gönderdik.
        </div>

        {/* OTP inputs */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          {digits.map((d, i) => (
            <input key={i} ref={el => refs.current[i] = el} value={d}
              onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKey(i, e)}
              inputMode="numeric" maxLength={1} autoFocus={i === 0}
              style={{
                width: 50, height: 60, borderRadius: 'var(--radius-md)', textAlign: 'center',
                fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-sans)',
                border: d ? '2px solid var(--brand-500)' : error ? '2px solid var(--error-500)' : '1.5px solid var(--border-default)',
                background: d ? 'var(--brand-50)' : 'var(--bg-surface)',
                color: 'var(--text-primary)', outline: 'none', caretColor: 'var(--brand-500)',
                transition: 'all .15s ease',
              }} />
          ))}
        </div>

        {verifying && (
          <div style={{ textAlign: 'center', color: 'var(--brand-600)', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 18, height: 18, border: '2.5px solid var(--brand-100)', borderTopColor: 'var(--brand-500)', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }}></span>
            Doğrulanıyor...
          </div>
        )}
        {error && <div style={{ textAlign: 'center', color: 'var(--error-600)', fontSize: 14, fontWeight: 600 }}>Kod hatalı, tekrar deneyin</div>}

        {/* resend */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          {timer > 0 ? (
            <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>Tekrar gönder ({timer}s)</span>
          ) : (
            <button onClick={() => setTimer(59)} style={{ background: 'none', border: 'none', color: 'var(--brand-600)', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Kodu tekrar gönder</button>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ============ LOCATION PERMISSION ============
function LocationScreen({ onAllow }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32 }}>
      <div style={{ width: 110, height: 110, borderRadius: 999, background: 'var(--brand-50)', display: 'grid', placeItems: 'center', marginBottom: 28 }}>
        <Icon name="pin" size={48} color="var(--brand-500)" />
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 10 }}>Konumunu paylaş</div>
      <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.55, maxWidth: '30ch', marginBottom: 36 }}>Yakınındaki restoranları gösterebilmemiz ve teslimat süresini doğru hesaplayabilmemiz için konumuna ihtiyacımız var.</div>
      <PrimaryBtn onClick={onAllow} full={true}>Konumu etkinleştir</PrimaryBtn>
      <button onClick={onAllow} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 14, fontFamily: 'var(--font-sans)' }}>Sonra ayarlayacağım</button>
    </div>
  );
}

Object.assign(window, { SplashScreen, WelcomeScreen, LoginScreen, OTPScreen, LocationScreen });
