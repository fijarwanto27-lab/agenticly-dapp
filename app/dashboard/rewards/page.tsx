'use client'

const TIER_DATA = [
  { name: 'Bronze',  vol: '$0',    rate: '0.01%', color: '#CD7F32', min: 0,       max: 500000 },
  { name: 'Silver',  vol: '$500K', rate: '0.03%', color: '#8A9DC2', min: 500000,  max: 1000000 },
  { name: 'Gold',    vol: '$1M',   rate: '0.06%', color: '#F5A623', min: 1000000, max: 5000000 },
  { name: 'Diamond', vol: '$5M',   rate: '0.10%', color: '#00D4FF', min: 5000000, max: Infinity },
]
const HISTORY = [
  { date: 'May 20', vol: '$124K', cashback: '$37.2',  status: 'Claimed' },
  { date: 'May 13', vol: '$98K',  cashback: '$29.4',  status: 'Claimed' },
  { date: 'May 6',  vol: '$211K', cashback: '$63.3',  status: 'Claimed' },
  { date: 'Apr 29', vol: '$76K',  cashback: '$22.8',  status: 'Claimed' },
  { date: 'Apr 22', vol: '$183K', cashback: '$54.9',  status: 'Claimed' },
]

export default function RewardsPage() {
  const currentVol = 891243
  const currentTier = TIER_DATA[1]
  const nextTier = TIER_DATA[2]
  const progress = ((currentVol - currentTier.min) / (nextTier.min - currentTier.min)) * 100
  const toNext = nextTier.min - currentVol

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1000 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>Velocity Rewards</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Earn cashback based on your trading volume</p>
      </div>

      {/* Current Status */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: 20, background: 'linear-gradient(135deg, rgba(0,82,255,0.08), rgba(0,212,255,0.04))' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Current Tier</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: currentTier.color }}>Silver 🥈</p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Cashback Rate</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--accent-mint)' }}>0.03%</p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Claimable Now</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#fff' }}>$267.4</p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
            <span style={{ color: currentTier.color, fontWeight: 600 }}>Silver · ${(currentVol/1000).toFixed(0)}K volume</span>
            <span style={{ color: nextTier.color, fontWeight: 600 }}>Gold · $1M</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'var(--glass-3)', overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', width: `${progress}%`, borderRadius: 4, background: `linear-gradient(90deg, ${currentTier.color}, ${nextTier.color})`, transition: 'width 0.6s' }} />
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>${toNext.toLocaleString()} more volume to reach Gold tier (0.06% cashback)</p>
        </div>

        <button className="btn-primary" style={{ marginTop: 20, padding: '12px 32px', fontSize: 14 }}>
          Claim $267.4 USDC →
        </button>
      </div>

      {/* Tier Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {TIER_DATA.map(t => {
          const isActive = t.name === currentTier.name
          return (
            <div key={t.name} className="glass-card" style={{ padding: '20px', border: `1px solid ${isActive ? t.color + '50' : 'var(--glass-border)'}`, background: isActive ? `${t.color}08` : undefined }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>
                {t.name === 'Diamond' ? '💎' : t.name === 'Gold' ? '🥇' : t.name === 'Silver' ? '🥈' : '🥉'}
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: t.color, marginBottom: 4 }}>{t.name}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Min volume: {t.vol}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Cashback Rate</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--accent-mint)' }}>{t.rate}</p>
              {isActive && <div style={{ marginTop: 10, fontSize: 11, color: t.color, fontWeight: 600 }}>✓ Current Tier</div>}
            </div>
          )
        })}
      </div>

      {/* History */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Reward History</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Week','Volume','Cashback','Status'].map(h => (
                <th key={h} style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0 10px', borderBottom: '1px solid var(--glass-border)', textAlign: 'left', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((h, i) => (
              <tr key={i}>
                <td style={{ padding: '12px 0', borderBottom: '1px solid var(--glass-border)', fontSize: 13 }}>{h.date}</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{h.vol}</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-mint)', fontWeight: 600 }}>{h.cashback}</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-success)', background: 'rgba(0,201,122,0.12)', padding: '3px 8px', borderRadius: 100, border: '1px solid rgba(0,201,122,0.2)' }}>{h.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}