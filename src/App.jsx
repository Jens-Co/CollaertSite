import { useState, useEffect } from 'react';
import './App.css';

const business = {
  name: 'Jens Collaert IT Services',
  shortName: 'Jens Collaert',
  address: 'Statiestraat 26, 1570 Pajottegem, België',
  kbo: '1025.363.838',
  phone: '+32 472 45 25 11',
  email: 'jenscollaert@hotmail.com',
};

const socials = [
  { name: 'GitHub', url: 'https://github.com/MCCORG', icon: 'fab fa-github' },
  { name: 'LinkedIn', url: 'https://be.linkedin.com/in/jens-collaert-a02525137', icon: 'fab fa-linkedin-in' },
  { name: 'E-mail', url: `mailto:${business.email}`, icon: 'fas fa-envelope' },
];

const mcc = {
  url: 'https://mccompanion.net',
  features: [
    { icon: 'fas fa-magnifying-glass', title: 'Player Lookup', text: 'Look up any player’s profile and details in seconds.' },
    { icon: 'fas fa-palette', title: 'Skin Workshop', text: 'Browse, edit and apply Minecraft skins with a built-in editor.' },
    { icon: 'fas fa-box-open', title: 'Resource Pack Editor', text: 'Create and fine-tune resource packs on the go.' },
    { icon: 'fas fa-chart-line', title: 'Server Metrics', text: 'Live dashboards to keep an eye on your server.' },
    { icon: 'fas fa-terminal', title: 'Console Connector', text: 'Connect to and manage your server console remotely.' },
    { icon: 'fas fa-language', title: '16 Languages', text: 'Fully localized for a worldwide community.' },
  ],
  platforms: [
    { name: 'Windows', icon: 'fab fa-windows' },
    { name: 'macOS', icon: 'fab fa-apple' },
    { name: 'iOS', icon: 'fab fa-app-store-ios' },
    { name: 'Android', icon: 'fab fa-google-play' },
  ],
};

const brickBreak = {
  name: 'Brick Break Swipe',
  tagline: 'Draw a line. Bounce the ball. Break every brick.',
  description:
    'A fresh take on the brick breaker: swipe to draw lines that steer the ball, chain combos into Fever, grab power-ups and clear the board. Built from scratch in Flutter with the Flame engine.',
  status: 'In development',
  platforms: [
    { name: 'iOS', icon: 'fab fa-app-store-ios' },
    { name: 'Android', icon: 'fab fa-google-play' },
  ],
  stats: [
    { value: '100', label: 'Handcrafted levels' },
    { value: '6', label: 'Power-ups' },
    { value: '3', label: 'Game modes' },
  ],
  features: [
    { icon: 'fas fa-pen-nib', title: 'Draw to play', text: 'Swipe to draw lines and bounce the ball exactly where you want it.' },
    { icon: 'fas fa-layer-group', title: '100 levels', text: 'Hand-designed levels with stars and unlock progression.' },
    { icon: 'fas fa-bolt', title: 'Rush & Daily', text: 'Endless survival plus a daily seeded run everyone shares.' },
    { icon: 'fas fa-wand-magic-sparkles', title: 'Power-ups & combos', text: 'Multiball, Fireball, Slow-mo, Nuke and Fever streaks.' },
    { icon: 'fas fa-trophy', title: 'Leaderboards & friends', text: 'Chase high scores and add friends with friend codes.' },
    { icon: 'fas fa-cloud', title: 'Play anywhere', text: 'Fully offline by default, with Sign in with Apple to sync across devices.' },
  ],
  skins: [
    { name: 'Classic', color: '#e2e8f0' },
    { name: 'Comet', color: '#4de1ff' },
    { name: 'Ghost', color: '#b18cff' },
    { name: 'Void', color: '#0f172a' },
    { name: 'Star', color: '#ffd166' },
    { name: 'Rainbow', color: 'linear-gradient(90deg,#ff6b6b,#ffd166,#4de1ff,#b18cff)' },
  ],
};

const services = [
  { icon: 'fas fa-code', title: 'Custom Software', text: 'Reliable applications and backends built around your exact needs, from first prototype to production.' },
  { icon: 'fas fa-mobile-screen', title: 'Cross-platform Apps', text: 'One codebase, every platform. Native-feeling apps for desktop, iOS and Android with Flutter.' },
  { icon: 'fas fa-server', title: 'Servers & Infrastructure', text: 'Minecraft plugins, hosting and scalable infrastructure for communities and networks.' },
  { icon: 'fas fa-robot', title: 'Bots & Automation', text: 'Discord bots, integrations and automation that save your team hours every week.' },
];

const stats = [
  { value: '4', label: 'Platforms supported' },
  { value: '16', label: 'Languages' },
  { value: '100%', label: 'Free to use' },
];

const navLinks = [
  { label: 'MCCompanion', href: '#mccompanion' },
  { label: 'Brick Break', href: '#brickbreak' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
];

function Eyebrow({ children }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 mb-3">
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`max-w-2xl mb-14 ${center ? 'mx-auto text-center' : ''}`} data-reveal>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-500 leading-relaxed text-lg">{subtitle}</p>}
    </div>
  );
}

function RepoCard({ repo, badge }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card rounded-2xl border border-slate-200 bg-white p-6 flex flex-col group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition">
          {repo.name}
        </h3>
        <i className="fas fa-arrow-right text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition text-sm mt-1.5" />
      </div>
      <p className="text-sm text-slate-500 leading-relaxed flex-1">{repo.description}</p>
      <div className="flex flex-wrap items-center gap-2 mt-5 text-xs">
        {badge && (
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">{badge}</span>
        )}
        {repo.language && (
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{repo.language}</span>
        )}
        <span className="text-slate-400 flex items-center gap-1 ml-auto">
          <i className="fas fa-star text-amber-400" /> {repo.stars}
        </span>
      </div>
    </a>
  );
}


function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const norm = (r) => ({
          id: r.id,
          name: r.name,
          description: r.description || 'No description provided.',
          url: r.html_url,
          language: r.language,
          stars: r.stargazers_count,
          pushed: r.pushed_at,
          owner: r.owner?.login,
        });

        const [orgRes, userRes] = await Promise.all([
          fetch('https://api.github.com/orgs/MCCORG/repos?sort=pushed&per_page=20'),
          fetch('https://api.github.com/users/Jens-Co/repos?sort=pushed&per_page=20'),
        ]);
        const orgData = (await orgRes.json()).map(norm);
        const userData = (await userRes.json()).filter((r) => !r.fork).map(norm);

        const merged = [...orgData, ...userData]
          .filter((r) => r.name !== '.github')
          .sort((a, b) => new Date(b.pushed) - new Date(a.pushed))
          .slice(0, 6);
        setRepos(merged);
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('js');
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    const safety = setTimeout(() => els.forEach((el) => el.classList.add('in')), 2000);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [repos]);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center font-display font-bold text-white text-sm">
              JC
            </span>
            <span className="font-display font-semibold text-slate-900">{business.shortName}</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-slate-600 hover:text-slate-900 transition">
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition"
          >
            Contact
          </a>
        </div>
      </nav>

      <main id="top" className="flex-1">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 0%, rgba(37,99,235,0.10) 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div className="max-w-4xl mx-auto px-5 pt-24 pb-20 text-center">
            <span
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 mb-7"
              data-reveal
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Independent software company · Belgium
            </span>
            <h1
              className="font-display text-4xl sm:text-6xl font-bold text-slate-900 leading-[1.06]"
              data-reveal
            >
              Software that people
              <br className="hidden sm:block" /> actually{' '}
              <span className="text-blue-600">use every day.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed" data-reveal>
              {business.name} designs, builds and runs software end to end, from cross-platform apps to
              server infrastructure. Home of <span className="font-semibold text-slate-700">MCCompanion</span>,
              the free Minecraft companion app, and the upcoming game{' '}
              <span className="font-semibold text-slate-700">Brick Break Swipe</span>.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3" data-reveal>
              <a
                href="#mccompanion"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
              >
                Discover MCCompanion
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-semibold text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                Work with me
              </a>
            </div>
          </div>
        </section>

        <section id="mccompanion" className="py-24 px-5 bg-slate-50 border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div data-reveal>
                <Eyebrow>Flagship product</Eyebrow>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                  MCCompanion
                </h2>
                <p className="mt-3 text-lg font-medium text-slate-700">
                  Your Minecraft companion. On every platform.
                </p>
                <p className="mt-4 text-slate-500 leading-relaxed">
                  A polished, 100% free companion app for the Minecraft community, packed with tools for
                  players and server owners alike, available on desktop and mobile in 16 languages.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {mcc.platforms.map((p) => (
                    <span
                      key={p.name}
                      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700"
                    >
                      <i className={p.icon} /> {p.name}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={mcc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-700 transition"
                  >
                    Visit mccompanion.net <i className="fas fa-arrow-up-right-from-square ml-1.5 text-xs" />
                  </a>
                  <a
                    href="https://github.com/MCCORG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl font-semibold text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 transition"
                  >
                    <i className="fab fa-github mr-1.5" /> Source
                  </a>
                </div>
                <p className="mt-5 text-sm text-slate-400">
                  <i className="fas fa-user-pen mr-1.5" />
                  Created &amp; maintained by <span className="font-medium text-slate-600">Jens Collaert</span>.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4" data-reveal>
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
                  >
                    <div className="font-display text-3xl sm:text-4xl font-bold text-blue-600">
                      {s.value}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-slate-500 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mcc.features.map((f) => (
                <div key={f.title} className="card rounded-2xl border border-slate-200 bg-white p-6" data-reveal>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-lg mb-4">
                    <i className={f.icon} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-slate-900 mb-1.5">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="brickbreak" className="py-24 px-5 bg-slate-950 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(45% 40% at 15% 0%, rgba(37,99,235,0.22) 0%, rgba(2,6,23,0) 70%), radial-gradient(45% 40% at 90% 20%, rgba(37,99,235,0.14) 0%, rgba(2,6,23,0) 70%)',
            }}
          />
          <div className="max-w-6xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
              <div data-reveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  {brickBreak.status} · Game
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold">{brickBreak.name}</h2>
                <p className="mt-4 text-xl font-medium text-slate-200">{brickBreak.tagline}</p>
                <p className="mt-4 text-slate-400 leading-relaxed max-w-xl">{brickBreak.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {brickBreak.platforms.map((p) => (
                    <span
                      key={p.name}
                      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200"
                    >
                      <i className={p.icon} /> {p.name}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                    <i className="fas fa-feather-pointed" /> Flutter · Flame
                  </span>
                </div>
                <p className="mt-6 text-sm text-slate-400">
                  <i className="fas fa-user-pen mr-1.5" />
                  A new game by <span className="font-medium text-slate-200">Jens Collaert</span>.
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <a
                    href="#/brickbreak/privacy"
                    className="text-slate-400 hover:text-blue-300 transition"
                  >
                    <i className="fas fa-shield-halved mr-1.5" />Privacy Policy
                  </a>
                  <a
                    href="#/brickbreak/terms"
                    className="text-slate-400 hover:text-blue-300 transition"
                  >
                    <i className="fas fa-file-contract mr-1.5" />Terms of Service
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-8" data-reveal>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {brickBreak.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-3xl sm:text-4xl font-bold text-blue-300">
                        {s.value}
                      </div>
                      <div className="mt-1.5 text-xs text-slate-400 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-500 mb-3">Ball skins</div>
                  <div className="flex flex-wrap items-center gap-3">
                    {brickBreak.skins.map((s) => (
                      <div key={s.name} className="flex items-center gap-2" title={s.name}>
                        <span
                          className="w-7 h-7 rounded-full border border-white/20 shadow-inner"
                          style={{ background: s.color }}
                        />
                        <span className="text-sm text-slate-300">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brickBreak.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:bg-white/[0.07] hover:border-white/20 transition"
                  data-reveal
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-white/10 flex items-center justify-center text-blue-300 text-lg mb-4">
                    <i className={f.icon} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-1.5">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-24 px-5">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              eyebrow="What I do"
              title="Services"
              subtitle="Beyond our own products, I take client projects from idea to shipped software, then keep them running."
            />
            <div className="grid sm:grid-cols-2 gap-5">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="card rounded-2xl border border-slate-200 bg-white p-7 flex gap-5"
                  data-reveal
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white text-lg">
                    <i className={s.icon} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-slate-900 mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="py-24 px-5 bg-slate-50 border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              eyebrow="Open source"
              title="Selected work"
              subtitle="A live look at what we've been building lately, straight from GitHub."
            />
            {loading ? (
              <div className="text-center text-slate-400">Loading projects…</div>
            ) : repos.length === 0 ? (
              <div className="text-center text-slate-500">
                See everything on{' '}
                <a href="https://github.com/MCCORG" className="text-blue-600 font-medium hover:underline">
                  GitHub
                </a>
                .
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {repos.map((r) => (
                  <RepoCard key={r.id} repo={r} badge={r.owner === 'MCCORG' ? 'MCCompanion' : undefined} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="about" className="py-24 px-5">
          <div className="max-w-3xl mx-auto text-center" data-reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              A one-person studio with a product mindset
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              {business.name} is an independent software company based in Pajottegem, Belgium. I build
              software the same way I build products: shipped, maintained and genuinely useful. Whether it's
              a companion app for a global community or a tailored tool for a single client, I handle it end
              to end: design, development and operations.
            </p>
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span><i className="fas fa-location-dot mr-2 text-blue-500" />Pajottegem, België</span>
              <span><i className="fas fa-building mr-2 text-blue-500" />KBO {business.kbo}</span>
            </div>
          </div>
        </section>

        <section id="contact" className="pb-24 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl bg-slate-900 px-8 py-14 sm:px-14 text-center relative overflow-hidden" data-reveal>
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(50% 60% at 50% 0%, rgba(37,99,235,0.35) 0%, rgba(15,23,42,0) 70%)' }}
              />
              <div className="relative">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Let's build something great.
                </h2>
                <p className="mt-4 text-slate-300 max-w-lg mx-auto">
                  Have a product idea, a project or a Minecraft network that needs a hand? I'd love to hear
                  about it.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${business.email}`}
                    className="px-6 py-3 rounded-xl font-semibold text-slate-900 bg-white hover:bg-slate-100 transition"
                  >
                    <i className="fas fa-envelope mr-2" /> {business.email}
                  </a>
                  <a
                    href={`tel:${business.phone}`}
                    className="px-6 py-3 rounded-xl font-semibold text-white border border-white/25 hover:bg-white/10 transition"
                  >
                    <i className="fas fa-phone mr-2" /> {business.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center font-display font-bold text-white text-sm">
                JC
              </span>
              <span className="font-display font-semibold text-slate-900">{business.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
            <p>{business.address} · KBO {business.kbo}</p>
            <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
