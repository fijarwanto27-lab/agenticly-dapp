'use client'
import { useState } from 'react'

const PAIRS = ['BTC/USDT','ETH/USDT','SOL/USDT','BNB/USDT','LINK/USDT','UNI/USDT']
const ORDERBOOK_ASKS = [
  { price: 67480, size: 0.42, total: 28341 },
  { price: 67460, size: 0.81, total: 54542 },
  { price: 67445, size: 1.20, total: 80934 },
  { price: 67432, size: 0.55, total: 37088 },
  { price: 67425, size: 2.10, total: 141592 },
]
const ORDERBOOK_BIDS = [
  { price: 67420, size: 1.85, total: 124727 },
  { price: 67410, size: 0.63, total: 42468 },
  { price: 67395, size: 1.10, total: 74134 },
  { price: 67380, size: 0.90, total: 60642 },
  { price: 67360, size: 2.30, total: 154928 },
]
const HISTORY = [
  { price: 67420, size: 0.12, time: '14:32:01', dir: 'buy' },
  { price: 67415, size: 0.55, time: '14:31:58', dir: 'sell' },
  { price: 67430, size: 0.08, time: '14:31:55', dir: 'buy' },
  { price: 67418, size: 1.20, time: '14:31:52', dir: 'buy' },
  { price: 67410, size: 0.33, time: '14:31:49', dir: 'sell' },
  { price: 67405, size: 0.77, time: '14:31:46', dir: 'sell' },
]

export default function SpotPage() {
  const [pair, setPair] = useState('BTC/USDT')
  const [tab, setTab] = useState<'Buy'|'Sell'>('Buy')
  const [orderType, setOrderType] = useState<'Market'|'Limit'>('Market')
  const [amount, setAmount] = useState('')

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1400 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>Spot Trading</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Multi-chain spot market — best price routing</p>
      </div>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px 280px', gap: 16 }}>

        {/* Chart */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>$67,420</span>
              <span className="badge badge-success" style={{ marginLeft: 10 }}>+2.31%</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['5m','15m','1h','4h','1D'].map(t => (
                <button key={t} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: t === '1h' ? 'var(--accent-primary)' : 'var(--glass-2)', color: t === '1h' ? '#fff' : 'var(--text-muted)', border: '1px solid var(--glass-border)', fontWeight: 600 }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ height: 280, background: 'var(--glass-1)', borderRadius: 10, border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 500 260" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00C97A" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#00C97A" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[0,65,130,195].map(y => <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
              <polyline points="0,200 60,180 120,190 180,160 240,140 300,150 360,120 420,100 500,80"
                fill="none" stroke="#00C97A" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M0,260 L0,200 60,180 120,190 180,160 240,140 300,150 360,120 420,100 500,80 L500,260 Z" fill="url(#sg)"/>
            </svg>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
            {[['24h High','$68,200'],['24h Low','$65,800'],['24h Vol','$28.4B'],['Spread','0.01%']].map(([l,v]) => (
              <div key={l}>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>{l}</p>
                <p style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Book */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Order Book</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.05em' }}>
            <span>PRICE</span><span style={{ textAlign: 'right' }}>SIZE</span>
          </div>
          {ORDERBOOK_ASKS.slice().reverse().map((a, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '3px 0', position: 'relative' }}>
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, background: 'rgba(255,59,92,0.08)', width: `${(a.total/160000)*100}%` }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-danger)', zIndex: 1 }}>{a.price.toLocaleString()}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'right', zIndex: 1 }}>{a.size}</span>
            </div>
          ))}
          <div style={{ textAlign: 'center', padding: '8px 0', fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 800, color: 'var(--accent-success)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', margin: '6px 0' }}>
            $67,420
          </div>
          {ORDERBOOK_BIDS.map((b, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '3px 0', position: 'relative' }}>
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, background: 'rgba(0,201,122,0.08)', width: `${(b.total/160000)*100}%` }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-success)', zIndex: 1 }}>{b.price.toLocaleString()}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'right', zIndex: 1 }}>{b.size}</span>
            </div>
          ))}
        </div>

        {/* Order Panel */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {(['Buy','Sell'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: tab === t ? (t === 'Buy' ? 'rgba(0,201,122,0.2)' : 'rgba(255,59,92,0.2)') : 'var(--glass-1)',
                color: tab === t ? (t === 'Buy' ? 'var(--accent-success)' : 'var(--accent-danger)') : 'var(--text-muted)',
                border: `1px solid ${tab === t ? (t === 'Buy' ? 'rgba(0,201,122,0.4)' : 'rgba(255,59,92,0.4)') : 'var(--glass-border)'}`,
              }}>{t}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {(['Market','Limit'] as const).map(o => (
              <button key={o} onClick={() => setOrderType(o)} style={{
                flex: 1, padding: '6px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: orderType === o ? 'var(--glass-3)' : 'transparent',
                color: orderType === o ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${orderType === o ? 'var(--glass-border)' : 'transparent'}`,
              }}>{o}</button>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Available Balance</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--accent-mint)' }}>$12,450.00 USDT</p>
          </div>
          {orderType === 'Limit' && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Price (USDT)</p>
              <input placeholder="67,420.00" style={{ width: '100%', background: 'var(--glass-1)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Amount (USDT)</p>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
              style={{ width: '100%', background: 'var(--glass-1)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              {['25%','50%','75%','100%'].map(p => (
                <button key={p} style={{ flex: 1, padding: '5px 0', borderRadius: 6, fontSize: 11, background: 'var(--glass-2)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', cursor: 'pointer' }}>{p}</button>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--glass-1)', borderRadius: 8, padding: '10px 12px', marginBottom: 14, border: '1px solid var(--glass-border)' }}>
            {[['Est. Receive','0.00000 BTC'],['Fee (0.1%)','$0.00'],['Price Impact','~0.00%']].map(([l,v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>{v}</span>
              </div>
            ))}
          </div>
          <button style={{
            width: '100%', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer',
            background: tab === 'Buy' ? 'linear-gradient(135deg, #00C97A, #00A865)' : 'linear-gradient(135deg, #FF3B5C, #CC2244)',
            border: 'none', color: '#fff',
          }}>{tab} {pair.split('/')[0]}</button>

          {/* Trade History */}
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recent Trades</p>
            {HISTORY.map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: h.dir === 'buy' ? 'var(--accent-success)' : 'var(--accent-danger)' }}>{h.price.toLocaleString()}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{h.size}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}