'use client'
import { useState, useEffect } from 'react'

function Sparkline({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1
  const w = 120, h = height
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

const POSITIONS = [
  { pair: 'BTC/USDT', dir: 'LONG',  entry: 66200, current: 67420, leverage: '10×', pnl: +610,  pnlPct: +1.84 },
  { pair: 'ETH/USDT', dir: 'SHORT', entry: 3620,  current: 3581,  leverage: '5×',  pnl: +78,   pnlPct: +2.14 },
  { pair: 'SOL/USDT', dir: 'LONG',  entry: 190.2, current: 185.4, leverage: '3×',  pnl: -48,   pnlPct: -2.52 },
]

const AGENTS = [
  { name: 'Alpha Scalper', strategy: 'Momentum + RSI', chain: 'Base', status: 'running', pnl7d: +12.4, trades: 892 },
  { name: 'Grid Master',   strategy: 'Grid Trading',   chain: 'ETH',  status: 'running', pnl7d: +5.1,  trades: 341 },
  { name: 'Arb Hunter',    strategy: 'Cross-Chain Arb',chain: 'SOL',  status: 'paused',  pnl7d: -1.2,  trades: 128 },
]

const LEADERBOARD = [
  { rank: 1, addr: '0x4a2...f8c', vol: '$12.4M', roi: '+38.2%', tier: 'Diamond' },
  { rank: 2, addr: '0xb91...33e', vol: '$9.1M',  roi: '+29.5%', tier: 'Diamond' },
  { rank: 3, addr: '0x7f0...a12', vol: '$6.8M',  roi: '+22.1%', tier: 'Gold' },
  { rank: 4, addr: '0x3c4...d55', vol: '$4.2M',  roi: '+18.7%', tier: 'Gold' },
  { rank: 5, addr: '0xab8...e7f', vol: '$3.1M',  roi: '+14.3%', tier: 'Silver' },
  { rank: 6, addr: 'You ⭐',      vol: '$891K',  roi: '+9.6%',  tier: 'Silver' },
]

const COIN_IDS = [
  { id: 'bitcoin',       sym: 'BTC',  name: 'Bitcoin',   logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { id: 'ethereum',      sym: 'ETH',  name: 'Ethereum',  logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { id: 'solana',        sym: 'SOL',  name: 'Solana',    logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { id: 'binancecoin',   sym: 'BNB',  name: 'BNB',       logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { id: 'arbitrum',      sym: 'ARB',  name: 'Arbitrum',  logo: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg' },
  { id: 'optimism',      sym: 'OP',   name: 'Optimism',  logo: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png' },
  { id: 'avalanche-2',   sym: 'AVAX', name: 'Avalanche', logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
  { id: 'matic-network', sym: 'MATIC',name: 'Polygon',   logo: 'https://assets.coingecko.com/coins/images/4713/small/polygon.png' },
  { id: 'chainlink',     sym: 'LINK', name: 'Chainlink', logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
  { id: 'uniswap',       sym: 'UNI',  name: 'Uniswap',   logo: 'https://assets.coingecko.com/coins/images/12504/small/uni.jpg' },
]

const REWARDS = { tier: 'Silver', vol7d: 891243, cashback: 267.4, nextTier: 'Gold', toNext: 108757, progress: 45 }
const TIER_COLORS: Record<string, string> = { Diamond: '#00D4FF', Gold: '#F5A623', Silver: '#8A9DC2', Bronze: '#CD7F32' }
const CHART_PORTFOLIO = [42100,43500,41800,44200,46800,45100,47900,49200,48100,51400,53200,55800]

type MarketData = { sym: string; name: string; logo: string; price: number; ch: number; vol: string; spark: number[] }

function StatCard({ label, value, sub, subColor }: { label: string; value: string; sub?: string; subColor?: string }) {
  return (
    <div className="glass-card-sm" style={{ padding: '18px 20px' }}>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: subColor ?? 'var(--text-secondary)' }}>{sub}</p>}
    </div>
  )
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>{title}</h2>
      {action && <button style={{ fontSize: 12, color: 'var(--text-accent)', background: 'none', border: 'none', cursor: 'pointer' }}>{action} →</button>}
    </div>
  )
}

function formatVol(v: number) {
  if (v >= 1e9) return (v / 1e9).toFixed(1) + 'B'
  if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M'
  if (v >= 1e3) return (v / 1e3).toFixed(1) + 'K'
  return v.toString()
}

export default function DashboardPage() {
  const [chartPeriod, setChartPeriod] = useState('1M')
  const [markets, setMarkets] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchPrices = async () => {
    try {
      const ids = COIN_IDS.map(c => c.id).join(',')
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
        { next: { revalidate: 0 } }
      )
      const data = await res.json()
      const mapped: MarketData[] = COIN_IDS.map(coin => {
        const d = data.find((x: any) => x.id === coin.id)
        if (!d) return null
        return {
          sym: coin.sym, name: coin.name, logo: coin.logo,
          price: d.current_price ?? 0,
          ch: parseFloat(d.price_change_percentage_24h?.toFixed(2) ?? '0'),
          vol: formatVol(d.total_volume),
          spark: (d.sparkline_in_7d?.price ?? []).filter((_: number, i: number) => i % 24 === 0).slice(-7),
        }
      }).filter(Boolean) as MarketData[]
      setMarkets(mapped)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('CoinGecko fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1400 }}>
      {/* TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {lastUpdated && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Updated {lastUpdated.toLocaleTimeString()}</span>}
          <div className="glass-card-sm" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--accent-success)', fontSize: 10 }}>●</span>
            <span style={{ color: 'var(--text-secondary)' }}>Gas:</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>2.1 gwei</span>
          </div>
          <button className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>+ New Trade</button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
        <StatCard label="Portfolio Value" value="$55,841" sub="↑ +12.3% this month" subColor="var(--accent-success)" />
        <StatCard label="Total P&L"       value="+$6,721" sub="↑ +13.7% ROI"        subColor="var(--accent-success)" />
        <StatCard label="Unrealized P&L"  value="+$640"   sub="3 open positions" />
        <StatCard label="7d Volume"       value="$891K"   sub="Silver Tier · 45% to Gold" />
        <StatCard label="Cashback Earned" value="$267.4"  sub="Claimable rewards"   subColor="var(--accent-mint)" />
      </div>

      {/* CHART + POSITIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, marginBottom: 20 }}>
        <div className="glass-card" style={{ padding: '24px 24px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Portfolio Value</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: '#fff' }}>$55,841</p>
              <span className="badge badge-success" style={{ marginTop: 6 }}>↑ +$6,721 (13.7%)</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['1D','1W','1M','3M','ALL'].map(p => (
                <button key={p} onClick={() => setChartPeriod(p)} style={{
                  padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: chartPeriod === p ? 'var(--accent-primary)' : 'var(--glass-2)',
                  color: chartPeriod === p ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${chartPeriod === p ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                  transition: 'all 0.15s',
                }}>{p}</button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 600 160" style={{ width: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0052FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0,40,80,120].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}
            {(() => {
              const data = CHART_PORTFOLIO
              const min = Math.min(...data), max = Math.max(...data), rng = max - min
              const pts = data.map((v, i) => [(i / (data.length - 1)) * 580 + 10, 140 - ((v - min) / rng) * 130] as [number, number])
              const linePts = pts.map(([x, y]) => `${x},${y}`).join(' ')
              const areaPath = `M${pts[0][0]},160 ` + pts.map(([x, y]) => `L${x},${y}`).join(' ') + ` L${pts[pts.length-1][0]},160 Z`
              return <>
                <path d={areaPath} fill="url(#chartGrad)" />
                <polyline points={linePts} fill="none" stroke="#0052FF" strokeWidth="2" strokeLinejoin="round" />
                <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="4" fill="#0052FF" />
                <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="8" fill="#0052FF" fillOpacity="0.2" />
              </>
            })()}
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
              <text key={m} x={(i / 11) * 580 + 10} y="158" fontSize="9" fill="rgba(138,157,194,0.7)" textAnchor="middle">{m}</text>
            ))}
          </svg>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <SectionHeader title="Open Positions" action="View All" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {POSITIONS.map((p) => (
              <div key={p.pair} style={{ background: 'var(--glass-1)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{p.pair}</span>
                    <span className={`badge ${p.dir === 'LONG' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: 10 }}>{p.dir}</span>
                    <span className="badge badge-info" style={{ fontSize: 10 }}>{p.leverage}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: p.pnl >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
                    {p.pnl >= 0 ? '+' : ''}{p.pnl}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {[['Entry', `$${p.entry.toLocaleString()}`], ['Current', `$${p.current.toLocaleString()}`], ['ROI', `${p.pnlPct >= 0 ? '+' : ''}${p.pnlPct}%`]].map(([label, val]) => (
                    <div key={label}>
                      <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: label === 'ROI' ? (p.pnlPct >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)') : 'var(--text-primary)' }}>{val}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  <button style={{ flex: 1, padding: '5px 0', borderRadius: 6, background: 'rgba(255,59,92,0.12)', border: '1px solid rgba(255,59,92,0.2)', color: 'var(--accent-danger)', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>Close</button>
                  <button style={{ flex: 1, padding: '5px 0', borderRadius: 6, background: 'var(--glass-2)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>Edit SL/TP</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI AGENTS + REWARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 20 }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <SectionHeader title="Active AI Agents" action="Manage Agents" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {AGENTS.map((a) => (
              <div key={a.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', alignItems: 'center', gap: 16, background: 'var(--glass-1)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '14px 16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: a.status === 'running' ? 'var(--accent-success)' : 'var(--accent-warning)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</span>
                    <span className="badge badge-info" style={{ fontSize: 10 }}>{a.chain}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.strategy}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>7d P&L</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: a.pnl7d >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)' }}>{a.pnl7d >= 0 ? '+' : ''}{a.pnl7d}%</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>Trades</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{a.trades}</p>
                </div>
                <button style={{ padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: a.status === 'running' ? 'rgba(245,166,35,0.12)' : 'rgba(0,201,122,0.12)', border: `1px solid ${a.status === 'running' ? 'rgba(245,166,35,0.2)' : 'rgba(0,201,122,0.2)'}`, color: a.status === 'running' ? 'var(--accent-warning)' : 'var(--accent-success)' }}>
                  {a.status === 'running' ? '⏸ Pause' : '▶ Resume'}
                </button>
              </div>
            ))}
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>+ Deploy New Agent</button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <SectionHeader title="Velocity Rewards" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Current Tier</p>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: TIER_COLORS[REWARDS.tier] }}>{REWARDS.tier} 🥈</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Cashback Rate</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--accent-mint)' }}>0.03%</p>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
              <span>Progress to {REWARDS.nextTier}</span><span>{REWARDS.progress}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'var(--glass-3)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${REWARDS.progress}%`, borderRadius: 3, background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-cyan))' }} />
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>${REWARDS.toNext.toLocaleString()} more volume needed</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {[{ label: '7d Volume', value: `$${(REWARDS.vol7d/1000).toFixed(0)}K` }, { label: 'Cashback Earned', value: `$${REWARDS.cashback}` }].map(s => (
              <div key={s.label} style={{ background: 'var(--glass-1)', borderRadius: 8, padding: '12px', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{s.value}</p>
              </div>
            ))}
          </div>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Claim $267.4 USDC</button>
          <div style={{ marginTop: 16 }}>
            {[{ name: 'Bronze', vol: '$0', rate: '0.01%', active: false }, { name: 'Silver', vol: '$500K', rate: '0.03%', active: true }, { name: 'Gold', vol: '$1M', rate: '0.06%', active: false }, { name: 'Diamond', vol: '$5M', rate: '0.10%', active: false }].map(t => (
              <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--glass-border)', opacity: t.active ? 1 : 0.55 }}>
                <span style={{ fontSize: 12, fontWeight: t.active ? 700 : 400, color: t.active ? TIER_COLORS[t.name] : 'var(--text-secondary)' }}>{t.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.vol}</span>
                <span style={{ fontSize: 12, color: 'var(--accent-mint)', fontFamily: 'var(--font-mono)' }}>{t.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MARKETS + LEADERBOARD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginBottom: 32 }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>Market Prices</h2>
              {loading && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Loading...</span>}
              {!loading && <span style={{ fontSize: 10, color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-success)', display: 'inline-block' }} />
                Live · Updates every 60s
              </span>}
            </div>
            <button onClick={fetchPrices} style={{ fontSize: 11, color: 'var(--text-accent)', background: 'none', border: 'none', cursor: 'pointer' }}>↻ Refresh</button>
          </div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[...Array(6)].map((_, i) => <div key={i} style={{ height: 52, borderRadius: 8, background: 'var(--glass-1)' }} />)}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead>
                  <tr>
                    {['Asset','Price','24h Change','Volume','7d Chart',''].map(h => (
                      <th key={h} style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 12px 10px 0', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m) => (
                    <tr key={m.sym} style={{ cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img src={m.logo} alt={m.sym} width={32} height={32} style={{ borderRadius: '50%', background: 'var(--glass-3)' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                          <div>
                            <p style={{ fontWeight: 700, fontSize: 14 }}>{m.sym}</p>
                            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.name}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>${(m.price ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: (m.price ?? 0) < 1 ? 6 : 2 })}</span>
                      </td>
                      <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <span className={`badge ${m.ch >= 0 ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: 11 }}>{m.ch >= 0 ? '+' : ''}{m.ch}%</span>
                      </td>
                      <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>${m.vol}</span>
                      </td>
                      <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        {m.spark.length > 0 && <Sparkline data={m.spark} color={m.ch >= 0 ? '#00C97A' : '#FF3B5C'} height={36} />}
                      </td>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <button style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'rgba(0,82,255,0.12)', border: '1px solid rgba(0,82,255,0.25)', color: 'var(--accent-primary)', cursor: 'pointer', whiteSpace: 'nowrap' }}>Trade →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <SectionHeader title="Top Traders by Volume" action="Full Board" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {LEADERBOARD.map((u) => {
              const isUser = u.addr.includes('You')
              const rankColor = u.rank === 1 ? '#F5A623' : u.rank === 2 ? '#C0C0C0' : u.rank === 3 ? '#CD7F32' : 'var(--text-muted)'
              return (
                <div key={u.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, background: isUser ? 'rgba(0,82,255,0.1)' : 'var(--glass-1)', border: `1px solid ${isUser ? 'rgba(0,82,255,0.25)' : 'var(--glass-border)'}` }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: rankColor, minWidth: 20, textAlign: 'center' }}>
                    {u.rank <= 3 ? ['🥇','🥈','🥉'][u.rank-1] : `#${u.rank}`}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: isUser ? 700 : 500, fontFamily: 'var(--font-mono)', color: isUser ? 'var(--accent-cyan)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.addr}</p>
                    <p style={{ fontSize: 10, color: TIER_COLORS[u.tier] }}>{u.tier}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, fontWeight: 600 }}>{u.vol}</p>
                    <p style={{ fontSize: 11, color: 'var(--accent-success)' }}>{u.roi}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="glow-line" style={{ margin: '16px 0 12px' }} />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>Rankings reset every Monday · 00:00 UTC</p>
        </div>
      </div>
    </div>
  )
}