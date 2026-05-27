'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Dashboard',   href: '/dashboard',          icon: '⊞' },
  { label: 'Futures',     href: '/dashboard/futures',  icon: '⚡' },
  { label: 'Spot',        href: '/dashboard/spot',     icon: '↔' },
  { label: 'AI Agents',   href: '/dashboard/agents',   icon: '◈' },
  { label: 'Rewards',     href: '/dashboard/rewards',  icon: '✦' },
  { label: 'Marketplace', href: '/dashboard/market',   icon: '⬡' },
]

const CHAINS = [
  { label: 'Base', color: '#0052FF', active: true },
  { label: 'ETH',  color: '#627EEA', active: false },
  { label: 'SOL',  color: '#9945FF', active: false },
  { label: 'BSC',  color: '#F0B90B', active: false },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: 'var(--nav-w)', height: '100vh', position: 'fixed', top: 0, left: 0,
      background: 'var(--base-800)', borderRight: '1px solid var(--glass-border)',
      display: 'flex', flexDirection: 'column', zIndex: 100, overflowY: 'auto',
    }}>
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <Image
          src="/AGENTICLY-logo.png" alt="AGENTICLY" width={32} height={32}
          style={{ borderRadius: 8 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18,
          letterSpacing: '-0.01em',
          background: 'linear-gradient(135deg, #fff 40%, #4D9FFF)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>
          AGENTICLY
        </span>
      </div>

      <nav style={{ padding: '12px', flex: 1 }}>
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: 'var(--text-muted)', textTransform: 'uppercase',
          padding: '0 8px', marginBottom: 8
        }}>Main Menu</p>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 10px', borderRadius: 8, marginBottom: 2,
              background: isActive ? 'rgba(0,82,255,0.15)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(0,82,255,0.3)' : 'transparent'}`,
              color: isActive ? '#fff' : 'var(--text-secondary)',
              fontSize: 14, fontWeight: isActive ? 600 : 400,
              transition: 'all 0.15s', textDecoration: 'none',
            }}>
              <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
              {isActive && (
                <span style={{
                  marginLeft: 'auto', width: 6, height: 6,
                  borderRadius: '50%', background: 'var(--accent-primary)'
                }} />
              )}
            </Link>
          )
        })}

        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: 'var(--text-muted)', textTransform: 'uppercase',
          padding: '0 8px', marginTop: 24, marginBottom: 8
        }}>Active Chains</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 4px' }}>
          {CHAINS.map((c) => (
            <div key={c.label} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 100,
              background: c.active ? `${c.color}22` : 'var(--glass-1)',
              border: `1px solid ${c.active ? c.color + '55' : 'var(--glass-border)'}`,
              color: c.active ? '#fff' : 'var(--text-muted)',
              fontSize: 12, fontWeight: c.active ? 600 : 400,
              cursor: 'pointer',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: c.color,
                boxShadow: c.active ? `0 0 6px ${c.color}` : 'none'
              }} />
              {c.label}
            </div>
          ))}
        </div>
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10,
          background: 'var(--glass-1)', border: '1px solid var(--glass-border)',
          cursor: 'pointer',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0052FF, #9945FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>👤</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Connect Wallet</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Base Chain</div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>⌄</span>
        </div>
      </div>
    </aside>
  )
}