'use client'
import { useState } from 'react'

const AGENTS = [
  { id: 1, name: 'Alpha Scalper',  strategy: 'Momentum + RSI',    chain: 'Base', status: 'running', pnl7d: +12.4, pnlTotal: +28.1, trades: 892,  winRate: 68, uptime: '14d 3h' },
  { id: 2, name: 'Grid Master',    strategy: 'Grid Trading',       chain: 'ETH',  status: 'running', pnl7d: +5.1,  pnlTotal: +11.4, trades: 341,  winRate: 71, uptime: '7d 12h' },
  { id: 3, name: 'Arb Hunter',     strategy: 'Cross-Chain Arb',    chain: 'SOL',  status: 'paused',  pnl7d: -1.2,  pnlTotal: +4.8,  trades: 128,  winRate: 55, uptime: '2d 6h' },
  { id: 4, name: 'Trend Follower', strategy: 'EMA Crossover',      chain: 'Base', status: 'stopped', pnl7d: 0,     pnlTotal: +6.2,  trades: 210,  winRate: 61, uptime: '0h' },
]

const TEMPLATES = [
  { name: 'DCA Bot',         desc: 'Dollar-cost averaging on any asset',     risk: 'Low',    est: '+4-8%/mo' },
  { name: 'Grid Trading',    desc: 'Profit from sideways markets',            risk: 'Medium', est: '+6-12%/mo' },
  { name: 'Momentum Scalper',desc: 'High-frequency momentum trades',          risk: 'High',   est: '+10-25%/mo' },
  { name: 'Arbitrage Bot',   desc: 'Cross-chain price difference capture',    risk: 'Medium', est: '+3-8%/mo' },
  { name: 'Mean Reversion',  desc: 'Trade back to statistical mean',          risk: 'Medium', est: '+5-10%/mo' },
  { name: 'Sentiment AI',    desc: 'Trade based on social sentiment signals', risk: 'High',   est: '+8-20%/mo' },
]

const RISK_COLOR: Record<string, string> = { Low: '#00C97A', Medium: '#F5A623', High: '#FF3B5C' }
const STATUS_COLOR: Record<string, string> = { running: '#00C97A', paused: '#F5A623', stopped: '#8A9DC2' }

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState<'my'|'deploy'>('my')

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1400 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>AI Trading Agents</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Autonomous strategies running 24/7 on-chain</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px' }}>+ Deploy New Agent</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Active Agents', value: '2', sub: '1 paused, 1 stopped' },
          { label: 'Total Trades', value: '1,571', sub: 'All time' },
          { label: 'Avg Win Rate', value: '63.7%', sub: 'Across all agents', color: 'var(--accent-success)' },
          { label: 'Total P&L', value: '+$2,840', sub: 'All agents combined', color: 'var(--accent-success)' },
        ].map(s => (
          <div key={s.label} className="glass-card-sm" style={{ padding: '18px 20px' }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{s.label}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: s.color ?? '#fff', marginBottom: 4 }}>{s.value}</p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[['my','My Agents'],['deploy','Agent Templates']].map(([k,l]) => (
          <button key={k} onClick={() => setActiveTab(k as 'my'|'deploy')} style={{
            padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: activeTab === k ? 'var(--accent-primary)' : 'var(--glass-1)',
            color: activeTab === k ? '#fff' : 'var(--text-secondary)',
            border: `1px solid ${activeTab === k ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
          }}>{l}</button>
        ))}
      </div>

      {activeTab === 'my' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {AGENTS.map(a => (
            <div key={a.id} className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(5, auto)', alignItems: 'center', gap: 32 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[a.status], boxShadow: a.status === 'running' ? `0 0 8px ${STATUS_COLOR[a.status]}` : 'none' }} />
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{a.name}</span>
                    <span className="badge badge-info" style={{ fontSize: 10 }}>{a.chain}</span>
                    <span style={{ fontSize: 11, color: STATUS_COLOR[a.status], textTransform: 'capitalize' }}>{a.status}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.strategy} · Uptime: {a.uptime}</p>
                </div>
                {[['7d P&L', `${a.pnl7d >= 0 ? '+' : ''}${a.pnl7d}%`, a.pnl7d >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'],
                  ['Total P&L', `+${a.pnlTotal}%`, 'var(--accent-success)'],
                  ['Win Rate', `${a.winRate}%`, 'var(--text-primary)'],
                  ['Trades', a.trades.toString(), 'var(--text-primary)'],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: color as string }}>{val}</p>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 6 }}>
                  {a.status === 'running' && <button style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.25)', color: 'var(--accent-warning)', cursor: 'pointer' }}>⏸ Pause</button>}
                  {a.status === 'paused' && <button style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, background: 'rgba(0,201,122,0.12)', border: '1px solid rgba(0,201,122,0.25)', color: 'var(--accent-success)', cursor: 'pointer' }}>▶ Resume</button>}
                  {a.status === 'stopped' && <button style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, background: 'rgba(0,82,255,0.12)', border: '1px solid rgba(0,82,255,0.25)', color: 'var(--accent-primary)', cursor: 'pointer' }}>▶ Start</button>}
                  <button style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, background: 'var(--glass-2)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>⚙ Config</button>
                  <button style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, background: 'rgba(255,59,92,0.08)', border: '1px solid rgba(255,59,92,0.15)', color: 'var(--accent-danger)', cursor: 'pointer' }}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {TEMPLATES.map(t => (
            <div key={t.name} className="glass-card" style={{ padding: '22px', cursor: 'pointer', transition: 'border-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,82,255,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <h3 style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</h3>
                <span style={{ fontSize: 11, fontWeight: 600, color: RISK_COLOR[t.risk], background: `${RISK_COLOR[t.risk]}18`, padding: '3px 8px', borderRadius: 100, border: `1px solid ${RISK_COLOR[t.risk]}30` }}>{t.risk}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>{t.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>Est. Returns</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-mint)', fontFamily: 'var(--font-mono)' }}>{t.est}</p>
                </div>
                <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>Deploy →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}