// kimoo-theme.jsx — paylaşılan tema kalıcılığı + ayar ekran kontrolü
// Kullanım:
//   1) App() içinde: useKimooTheme(t.dark, v => setTweak('dark', v));
//   2) Ayarlar ekranlarında: <ThemeSelector /> veya <ThemeRow />

const { Icon } = window;

// Tweak ile localStorage arasında çift yönlü senkron + global API
function useKimooTheme(dark, setDark) {
  // İlk açılışta localStorage'dan oku
  React.useEffect(() => {
    try {
      const v = localStorage.getItem('kimoo-theme');
      if (v === 'dark' && !dark) setDark(true);
      else if (v === 'light' && dark) setDark(false);
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Değişimi localStorage'a yaz + global'e expose et + event yayınla
  React.useEffect(() => {
    try { localStorage.setItem('kimoo-theme', dark ? 'dark' : 'light'); } catch (e) {}
    window.__kimooDark = dark;
    window.__kimooSetDark = setDark;
    window.dispatchEvent(new CustomEvent('kimoo-theme', { detail: { dark } }));
  }, [dark, setDark]);
}

// Ayar ekranı segmented control — Açık / Koyu
function ThemeSelector({ size = 'md' }) {
  const [dark, setLocal] = React.useState(() => {
    if (typeof window !== 'undefined' && '__kimooDark' in window) return !!window.__kimooDark;
    try { return localStorage.getItem('kimoo-theme') === 'dark'; } catch (e) { return false; }
  });
  React.useEffect(() => {
    const h = (e) => setLocal(!!e.detail.dark);
    window.addEventListener('kimoo-theme', h);
    const tmr = setTimeout(() => { if ('__kimooDark' in window) setLocal(!!window.__kimooDark); }, 50);
    return () => { window.removeEventListener('kimoo-theme', h); clearTimeout(tmr); };
  }, []);
  const setDark = (v) => window.__kimooSetDark && window.__kimooSetDark(v);
  const pad = size === 'sm' ? '8px 14px' : '10px 16px';
  const fs = size === 'sm' ? 13 : 14;
  const opts = [
    { id: false, label: 'Açık',  icon: 'sun' },
    { id: true,  label: 'Koyu',  icon: 'moon' },
  ];
  return (
    <div style={{ display: 'inline-flex', padding: 4, borderRadius: 999, background: 'var(--bg-sunken)', gap: 4 }}>
      {opts.map(o => {
        const on = dark === o.id;
        return (
          <button key={String(o.id)} onClick={() => setDark(o.id)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, padding: pad, borderRadius: 999,
            border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: fs, fontWeight: 700,
            background: on ? 'var(--bg-surface)' : 'transparent',
            color: on ? 'var(--text-primary)' : 'var(--text-tertiary)',
            boxShadow: on ? 'var(--shadow-xs)' : 'none', transition: 'background .15s ease, color .15s ease',
          }}>
            <ThemeIcon name={o.icon} size={fs + 2} color={on ? 'var(--brand-600)' : 'var(--text-muted)'} />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// Liste içinde tek satırlık satır (ör. Müşteri Hesap Ayarları)
function ThemeRow({ title = 'Görünüm', subtitle = 'Açık veya koyu tema' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
      <div style={{ width: 38, height: 38, borderRadius: 999, background: 'var(--bg-sunken)', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <ThemeIcon name="moon" size={18} color="var(--brand-600)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</div>
      </div>
      <ThemeSelector size="sm" />
    </div>
  );
}

// Web Platform / mini buton — header'a koymak için
function ThemeIconButton() {
  const [dark, setLocal] = React.useState(() => {
    if (typeof window !== 'undefined' && '__kimooDark' in window) return !!window.__kimooDark;
    try { return localStorage.getItem('kimoo-theme') === 'dark'; } catch (e) { return false; }
  });
  React.useEffect(() => {
    const h = (e) => setLocal(!!e.detail.dark);
    window.addEventListener('kimoo-theme', h);
    // Açılışta global hazır olana kadar bir tur bekle
    const tmr = setTimeout(() => {
      if ('__kimooDark' in window) setLocal(!!window.__kimooDark);
    }, 50);
    return () => { window.removeEventListener('kimoo-theme', h); clearTimeout(tmr); };
  }, []);
  const toggle = () => {
    const cur = window.__kimooDark ?? dark;
    window.__kimooSetDark && window.__kimooSetDark(!cur);
  };
  return (
    <button onClick={toggle} title={dark ? 'Açık moda geç' : 'Koyu moda geç'} style={{
      width: 38, height: 38, borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'var(--bg-surface)',
      display: 'grid', placeItems: 'center', cursor: 'pointer', flex: 'none',
    }}>
      <ThemeIcon name={dark ? 'sun' : 'moon'} size={18} color="var(--text-primary)" />
    </button>
  );
}

// Küçük inline sun/moon ikonu — Icon set'inde yok, lokal çiziyoruz
function ThemeIcon({ name, size = 16, color = 'currentColor' }) {
  if (name === 'sun') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
    </svg>
  );
  // moon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
}

Object.assign(window, { useKimooTheme, ThemeSelector, ThemeRow, ThemeIconButton, ThemeIcon });
