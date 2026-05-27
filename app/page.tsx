'use client'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const ParticleCanvas = dynamic(() => import('./components/ParticleCanvas'), { ssr: false })

const STATS = [
  { label: 'Total Volume',   value: '$4.2B+', sub: 'All-time traded' },
  { label: 'Active Traders', value: '84K+',   sub: 'Monthly users' },
  { label: 'AI Agents Live', value: '2,300+', sub: 'Running 24/7' },
  { label: 'Avg APY Earned', value: '34.8%',  sub: 'Via rewards' },
]

const FEATURES = [
  { icon: '⚡', title: 'Perpetual Futures', desc: 'Trade BTC, ETH, SOL, and 100+ assets with up to 50× leverage on Base Chain. Ultra-low fees, lightning settlement.', accent: '#0052FF' },
  { icon: '◈', title: 'AI Trading Agents', desc: 'Deploy autonomous AI agents trained on real market data. Set your strategy, sit back, and let them execute.', accent: '#00D4FF' },
  { icon: '↔', title: 'Multi-Chain Spot', desc: 'Swap assets across Base, Ethereum, Solana, and BSC in one unified interface with best-price routing.', accent: '#00FFC2' },
  { icon: '✦', title: 'Velocity Rewards', desc: 'Earn cashback on every trade. The more volume you generate, the higher your tier and the bigger your rewards.', accent: '#F5A623' },
]

const TICKER_ITEMS = [
  { sym: 'BTC/USD', price: '$67,420', change: '+2.3%', up: true },
  { sym: 'ETH/USD', price: '$3,581',  change: '+1.8%', up: true },
  { sym: 'SOL/USD', price: '$185.4',  change: '-0.9%', up: false },
  { sym: 'BASE',    price: '$2.14',   change: '+5.2%', up: true },
  { sym: 'BNB/USD', price: '$591',    change: '+0.4%', up: true },
  { sym: 'ARB/USD', price: '$1.28',   change: '-1.2%', up: false },
  { sym: 'OP/USD',  price: '$3.45',   change: '+3.1%', up: true },
]

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--base-900)', overflow: 'hidden' }}>
      <ParticleCanvas />
      <div aria-hidden style={{ position: 'fixed', top: '-20vh', left: '-10vw', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,82,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden style={{ position: 'fixed', bottom: '-15vh', right: '-10vw', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* TICKER */}
      <div style={{ position: 'relative', zIndex: 10, background: 'var(--base-800)', borderBottom: '1px solid var(--glass-border)', padding: '8px 0' }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 28px', borderRight: '1px solid var(--glass-border)', whiteSpace: 'nowrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{t.sym}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{t.price}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.up ? 'var(--accent-success)' : 'var(--accent-danger)' }}>{t.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAV */}
      <header style={{ position: 'relative', zIndex: 10, padding: '0 5vw', height: 'var(--header-h)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', background: 'rgba(6,13,30,0.7)', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/AGENTICLY-logo.png" alt="AGENTICLY Logo" width={32} height={32} style={{ borderRadius: 8 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: '-0.01em', background: 'linear-gradient(135deg, #fff 40%, #4D9FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AGENTICLY</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {['Features', 'AI Agents', 'Rewards', 'Docs'].map((l) => (
            <a key={l} href="#" style={{ padding: '6px 14px', fontSize: 14, color: 'var(--text-secondary)', transition: 'color 0.15s', borderRadius: 6 }}
               onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
               onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>{l}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/dashboard" className="btn-ghost" style={{ padding: '8px 18px', fontSize: 14 }}>Dashboard</Link>
          <Link href="/dashboard" className="btn-primary" style={{ padding: '8px 18px', fontSize: 14 }}>Launch App →</Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '100px 5vw 80px' }}>
        <div className="animate-fadeup">
          <span className="badge badge-primary" style={{ marginBottom: 24, fontSize: 12 }}>● Live on Base Chain</span>
        </div>
        <h1 className="animate-fadeup delay-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 auto 28px', maxWidth: '14ch' }}>
          <span style={{ color: 'var(--text-primary)' }}>Trade Smarter</span><br />
          <span style={{ background: 'linear-gradient(135deg, #0052FF 0%, #00D4FF 50%, #00FFC2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>With AI Agents</span>
        </h1>
        <p className="animate-fadeup delay-2" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-secondary)', maxWidth: '54ch', margin: '0 auto 44px', lineHeight: 1.6 }}>
          The all-in-one crypto platform for futures trading, multi-chain spot, and autonomous AI agents — built on Base Chain.
        </p>
        <div className="animate-fadeup delay-3" style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/dashboard" className="btn-primary" style={{ fontSize: 16, padding: '13px 30px' }}>Start Trading →</Link>
          <button className="btn-ghost" style={{ fontSize: 16, padding: '13px 30px' }}>Watch Demo ▶</button>
        </div>
        <div className="animate-fadeup delay-4" style={{ display: 'flex', justifyContent: 'center', marginTop: 80, maxWidth: 700, margin: '80px auto 0' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ flex: 1, padding: '20px 16px', textAlign: 'center', borderRight: i < STATS.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#fff', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position: 'relative', zIndex: 5, padding: '80px 5vw' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>// PLATFORM OVERVIEW</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', textAlign: 'center', marginBottom: 56, letterSpacing: '-0.02em' }}>Everything you need to trade</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="glass-card animate-fadeup" style={{ animationDelay: `${i * 0.1}s`, padding: '28px 24px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: f.accent + '1A', border: `1px solid ${f.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
                <div style={{ marginTop: 20, height: 2, borderRadius: 1, background: `linear-gradient(90deg, ${f.accent}, transparent)`, opacity: 0.6 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', zIndex: 5, padding: '40px 5vw 100px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 48px', borderRadius: 24, textAlign: 'center', background: 'linear-gradient(135deg, rgba(0,82,255,0.15) 0%, rgba(0,212,255,0.08) 100%)', border: '1px solid rgba(0,82,255,0.25)', backdropFilter: 'blur(16px)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3.5vw, 42px)', letterSpacing: '-0.02em', marginBottom: 16 }}>Ready to trade with AI?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 32 }}>Connect your wallet and start in under 60 seconds. No KYC required.</p>
          <Link href="/dashboard" className="btn-primary" style={{ fontSize: 16, padding: '13px 36px' }}>Open Dashboard →</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: 'relative', zIndex: 5, borderTop: '1px solid var(--glass-border)', padding: '24px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', fontSize: 14 }}>AGENTICLY © 2025</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Docs', 'Twitter', 'Discord'].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: 'var(--text-muted)' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}