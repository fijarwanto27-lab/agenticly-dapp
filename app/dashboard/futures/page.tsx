'use client'
import { useState } from 'react'

const PAIRS = ['BTC/USDT','ETH/USDT','SOL/USDT','BNB/USDT','ARB/USDT','OP/USDT']
const ORDERS = [
  { pair: 'BTC/USDT', dir: 'LONG',  size: '0.12 BTC', entry: 67420, liq: 61200, leverage: '10×', pnl: +610,  pnlPct: +1.84, margin: 809 },
  { pair: 'ETH/USDT', dir: 'SHORT', size: '1.5 ETH',  entry: 3620,  liq: 3980,  leverage: '5×',  pnl: +78,   pnlPct: +2.14, margin: 1086 },
  { pair: 'SOL/USDT', dir: 'LONG',  size: '10 SOL',   entry: 190.2, liq: 172.1, leverage: '3×',  pnl: -48,   pnlPct: -2.52, margin: 634 },
]

export default function FuturesPage() {
  const [pair, setPair] = useState('BTC/USDT')
  const [dir, setDir] = useState<'LONG'|'SHORT'>('LONG')
  const [orderType, setOrderType] = useState<'Market'|'Limit'>('Market')
  const [leverage, setLeverage] = useState(10)
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1400 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>Futures Trading</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Leveraged perpetual contracts on Base Chain</p>
      </div>

      {/* Pair Selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {PAIRS.map(p => (
          <button key={p} onClick={() => setPair(p)} style={{
            padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: pair === p ? 'var(--accent-primary)' : 'var(--glass-1)',
            color: pair === p ? '#fff' : 'var(--text-secondary)',
            border: `1px solid ${pair === p ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
            transition: 'all 0.15s',
          }}>{p}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 20 }}>

        {/* Chart Placeholder */}
        <div className="glass-card" style={{ padding: '20px', minHeight: 400 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>$67,420</span>
              <span className="badge badge-success" style={{ marginLeft: 10, fontSize: 12 }}>+2.31%</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['1m','5m','15m','1h','4h','1D'].map(t => (
                <button key={t} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: t === '1h' ? 'var(--accent-primary)' : 'var(--glass-2)', color: t === '1h' ? '#fff' : 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>{t}</button>
              ))}
            </div>
          </div>
          {/* Fake chart area */}
          <div style={{ height: 300, background: 'var(--glass-1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 600 280" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0052FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0,70,140,210].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
              <polyline points="0,220 50,200 100,210 150,180 200,160 250,170 300,140 350,120 400,130 450,100 500,80 550,60 600,50"
                fill="none" stroke="#0052FF" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M0,280 L0,220 50,200 100,210 150,180 200,160 250,170 300,140 350,120 400,130 450,100 500,80 550,60 600,50 L600,280 Z"
                fill="url(#cg)"/>
            </svg>
            <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 11, color: 'var(--text-muted)' }}>
              TradingView chart integration coming soon
            </div>
          </div>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
            {[['24h High','$68,200'],['24h Low','$65,800'],['24h Vol','$28.4B'],['Open Interest','$4.2B'],['Funding','0.01%']].map(([l,v]) => (
              <div key={l}>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>{l}</p>
                <p style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Panel */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {(['LONG','SHORT'] as const).map(d => (
              <button key={d} onClick={() => setDir(d)} style={{
                flex: 1, padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: dir === d ? (d === 'LONG' ? 'rgba(0,201,122,0.2)' : 'rgba(255,59,92,0.2)') : 'var(--glass-1)',
                color: dir === d ? (d === 'LONG' ? 'var(--accent-success)' : 'var(--accent-danger)') : 'var(--text-muted)',
                border: `1px solid ${dir === d ? (d === 'LONG' ? 'rgba(0,201,122,0.4)' : 'rgba(255,59,92,0.4)') : 'var(--glass-border)'}`,
                transition: 'all 0.15s',
              }}>{d}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {(['Market','Limit'] as const).map(o => (
              <button key={o} onClick={() => setOrderType(o)} style={{
                flex: 1, padding: '7px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: orderType === o ? 'var(--glass-3)' : 'transparent',
                color: orderType === o ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${orderType === o ? 'var(--glass-border)' : 'transparent'}`,
              }}>{o}</button>
            ))}
          </div>

          {/* Leverage */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Leverage</p>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>{leverage}×</span>
            </div>
            <input type="range" min={1} max={50} value={leverage} onChange={e => setLeverage(+e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
              {[1,5,10,20,50].map(l => (
                <button key={l} onClick={() => setLeverage(l)} style={{ background: 'none', border: 'none', color: leverage === l ? 'var(--accent-primary)' : 'var(--text-muted)', cursor: 'pointer', fontSize: 10, fontWeight: leverage === l ? 700 : 400 }}>{l}×</button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          {orderType === 'Limit' && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Price (USDT)</p>
              <input value={price} onChange={e => setPrice(e.target.value)} placeholder="67,420.00"
                style={{ width: '100%', background: 'var(--glass-1)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Size (USDT)</p>
            <input value={size} onChange={e => setSize(e.target.value)} placeholder="0.00"
              style={{ width: '100%', background: 'var(--glass-1)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              {['25%','50%','75%','100%'].map(p => (
                <button key={p} style={{ flex: 1, padding: '5px 0', borderRadius: 6, fontSize: 11, background: 'var(--glass-2)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', cursor: 'pointer' }}>{p}</button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: 'var(--glass-1)', borderRadius: 8, padding: '12px', marginBottom: 16, border: '1px solid var(--glass-border)' }}>
            {[['Est. Margin','$809.00'],['Est. Liq. Price','$61,200'],['Trading Fee','$0.12'],['Max Profit','Unlimited']].map(([l,v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#fff' }}>{v}</span>
              </div>
            ))}
          </div>

          <button style={{
            width: '100%', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer',
            background: dir === 'LONG' ? 'linear-gradient(135deg, #00C97A, #00A865)' : 'linear-gradient(135deg, #FF3B5C, #CC2244)',
            border: 'none', color: '#fff', transition: 'opacity 0.15s',
          }}>
            {dir === 'LONG' ? '↑ Open Long' : '↓ Open Short'} {pair}
          </button>
        </div>
      </div>

      {/* Open Positions */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Open Positions</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr>
                {['Pair','Direction','Size','Entry Price','Liq. Price','Leverage','P&L','Margin','Actions'].map(h => (
                  <th key={h} style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 12px 10px 0', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map(o => (
                <tr key={o.pair}>
                  <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)', fontWeight: 700, fontSize: 14 }}>{o.pair}</td>
                  <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                    <span className={`badge ${o.dir === 'LONG' ? 'badge-success' : 'badge-danger'}`}>{o.dir}</span>
                  </td>
                  <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{o.size}</td>
                  <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>${o.entry.toLocaleString()}</td>
                  <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-danger)' }}>${o.liq.toLocaleString()}</td>
                  <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                    <span className="badge badge-info">{o.leverage}</span>
                  </td>
                  <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: o.pnl >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
                    {o.pnl >= 0 ? '+' : ''}${o.pnl} ({o.pnlPct >= 0 ? '+' : ''}{o.pnlPct}%)
                  </td>
                  <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>${o.margin}</td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'rgba(255,59,92,0.12)', border: '1px solid rgba(255,59,92,0.2)', color: 'var(--accent-danger)', cursor: 'pointer' }}>Close</button>
                      <button style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'var(--glass-2)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>SL/TP</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}