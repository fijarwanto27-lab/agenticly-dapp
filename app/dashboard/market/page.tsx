'use client'
import { useState } from 'react'

const LISTINGS = [
  { name: 'Alpha Scalper Pro', creator: '0x4a2...f8c', type: 'Bot', price: '0.5 ETH', rating: 4.8, users: 234, pnl: '+18.4%', chain: 'Base' },
  { name: 'Grid Bot Ultimate', creator: '0xb91...33e', type: 'Bot', price: '0.3 ETH', rating: 4.6, users: 182, pnl: '+11.2%', chain: 'ETH' },
  { name: 'Sentiment Oracle',  creator: '0x7f0...a12', type: 'Signal', price: '0.1 ETH', rating: 4.5, users: 98,  pnl: '+9.8%',  chain: 'Base' },
  { name: 'Arb Master v2',     creator: '0x3c4...d55', type: 'Bot', price: '0.8 ETH', rating: 4.9, users: 311, pnl: '+22.1%', chain: 'SOL' },
  { name: 'DCA Optimizer',     creator: '0xab8...e7f', type: 'Strategy', price: 'Free', rating: 4.3, users: 521, pnl: '+6.3%',  chain: 'Base' },
  { name: 'RSI Signal Bot',    creator: '0x9d1...c2a', type: 'Signal', price: '0.2 ETH', rating: 4.4, users: 143, pnl: '+13.5%', chain: 'ETH' },
]

const TYPES = ['All','Bot','Signal','Strategy']

export default function MarketPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? LISTINGS : LISTINGS.filter(l => l.type === filter)

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1400 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>Agent Marketplace</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Buy, sell, and rent AI trading strategies on-chain</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px' }}>+ List Your Agent</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {TYPES.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: filter === t ? 'var(--accent-primary)' : 'var(--glass-1)',
            color: filter === t ? '#fff' : 'var(--text-secondary)',
            border: `1px solid ${filter === t ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map((l, i) => (
          <div key={i} className="glass-card" style={{ padding: '22px', cursor: 'pointer', transition: 'border-color 0.15s, transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,82,255,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{l.name}</h3>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{l.creator}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, background: 'rgba(0,82,255,0.12)', color: 'var(--accent-primary)', padding: '3px 8px', borderRadius: 100, border: '1px solid rgba(0,82,255,0.2)' }}>{l.type}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[['7d PnL', l.pnl, 'var(--accent-success)'], ['Users', l.users.toString(), 'var(--text-primary)'], ['Chain', l.chain, 'var(--accent-cyan)']].map(([label, val, color]) => (
                <div key={label} style={{ background: 'var(--glass-1)', borderRadius: 8, padding: '8px 10px', border: '1px solid var(--glass-border)' }}>
                  <p style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: color as string }}>{val}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#F5A623', fontSize: 13 }}>★</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{l.rating}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: l.price === 'Free' ? 'var(--accent-mint)' : '#fff' }}>{l.price}</span>
                <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 12 }}>Get →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}