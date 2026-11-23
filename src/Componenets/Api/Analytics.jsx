import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Eye, MousePointer2, UserRoundPlus, Users } from 'lucide-react';
import './WorkspacePages.css';

const analytics = {
  '7 days': {
    cards: [
      { label: 'Visitors', value: '8,420', change: '+12.8%', positive: true, icon: Users },
      { label: 'Page views', value: '24,681', change: '+8.4%', positive: true, icon: Eye },
      { label: 'Conversions', value: '1,284', change: '+5.2%', positive: true, icon: UserRoundPlus },
      { label: 'Bounce rate', value: '32.6%', change: '-2.1%', positive: true, icon: MousePointer2 },
    ],
    series: [
      { name: 'Visitors', color: '#7658e8', values: [38, 48, 42, 63, 54, 72, 65, 81, 69, 87, 77, 94] },
      { name: 'Page views', color: '#29b77a', values: [28, 35, 44, 37, 51, 45, 59, 52, 67, 59, 73, 69] },
      { name: 'Conversions', color: '#3992e8', values: [17, 24, 21, 33, 28, 40, 35, 47, 42, 54, 49, 62] },
    ],
  },
  '30 days': {
    cards: [
      { label: 'Visitors', value: '34,820', change: '+18.6%', positive: true, icon: Users },
      { label: 'Page views', value: '108,493', change: '+11.2%', positive: true, icon: Eye },
      { label: 'Conversions', value: '5,274', change: '+7.8%', positive: true, icon: UserRoundPlus },
      { label: 'Bounce rate', value: '36.4%', change: '+1.4%', positive: false, icon: MousePointer2 },
    ],
    series: [
      { name: 'Visitors', color: '#7658e8', values: [34, 45, 39, 58, 51, 69, 63, 78, 70, 85, 76, 93] },
      { name: 'Page views', color: '#29b77a', values: [23, 31, 40, 35, 48, 43, 56, 50, 64, 57, 72, 68] },
      { name: 'Conversions', color: '#3992e8', values: [15, 20, 19, 29, 26, 37, 34, 44, 39, 52, 46, 60] },
    ],
  },
  '90 days': {
    cards: [
      { label: 'Visitors', value: '98,240', change: '+24.1%', positive: true, icon: Users },
      { label: 'Page views', value: '302,618', change: '+16.5%', positive: true, icon: Eye },
      { label: 'Conversions', value: '14,036', change: '+9.3%', positive: true, icon: UserRoundPlus },
      { label: 'Bounce rate', value: '34.1%', change: '-3.7%', positive: true, icon: MousePointer2 },
    ],
    series: [
      { name: 'Visitors', color: '#7658e8', values: [28, 41, 36, 55, 48, 64, 60, 74, 67, 84, 76, 94] },
      { name: 'Page views', color: '#29b77a', values: [19, 29, 37, 32, 45, 42, 53, 48, 61, 55, 69, 66] },
      { name: 'Conversions', color: '#3992e8', values: [12, 19, 17, 27, 24, 35, 31, 42, 37, 49, 44, 58] },
    ],
  },
};

const chartLabels = ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23'];
const pointX = (index) => 54 + index * 54;
const pointY = (value) => 204 - (value / 100) * 160;

function Analytics() {
  const [period, setPeriod] = useState('30 days');
  const currentAnalytics = analytics[period];

  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <div>
          <p className="workspace-eyebrow">PERFORMANCE</p>
          <h1>Analytics</h1>
          <p className="workspace-subtitle">A clear view of how your workspace is performing.</p>
        </div>
        <label className="workspace-select-label">
          <span className="workspace-visually-hidden">Analytics date range</span>
          <select value={period} onChange={(event) => setPeriod(event.target.value)}>
            {Object.keys(analytics).map((range) => <option key={range}>{range}</option>)}
          </select>
        </label>
      </header>

      <section className="analytics-metrics" aria-label="Analytics summary">
        {currentAnalytics.cards.map(({ label, value, change, positive, icon: Icon }) => (
          <article className="analytics-metric" key={label}>
            <div className="analytics-metric-top">
              <span>{label}</span>
              <Icon size={17} />
            </div>
            <strong>{value}</strong>
            <span className={`analytics-change${positive ? ' is-positive' : ' is-negative'}`}>
              {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {change} <span>vs. previous period</span>
            </span>
          </article>
        ))}
      </section>

      <section className="workspace-panel analytics-chart-panel">
        <div className="workspace-panel-heading">
          <div>
            <h2>Traffic overview</h2>
            <p>Visitors, page views, and conversions over time</p>
          </div>
          <span className="analytics-live"><span /> Live data</span>
        </div>
        <svg
          className="analytics-chart"
          viewBox="0 0 720 250"
          role="img"
          aria-label={`Traffic overview for the last ${period}`}
        >
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = pointY(tick);
            return (
              <g key={tick}>
                <line x1="48" y1={y} x2="680" y2={y} stroke="#edf0f5" />
                <text x="8" y={y + 4} fill="#959cac" fontSize="11">{tick}</text>
              </g>
            );
          })}
          {currentAnalytics.series.map((series) => (
            <g key={series.name}>
              <polyline
                points={series.values.map((value, index) => `${pointX(index)},${pointY(value)}`).join(' ')}
                fill="none"
                stroke={series.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {series.values.map((value, index) => (
                <circle
                  key={`${series.name}-${index}`}
                  cx={pointX(index)}
                  cy={pointY(value)}
                  r="3"
                  fill="#fff"
                  stroke={series.color}
                  strokeWidth="2"
                />
              ))}
            </g>
          ))}
          {chartLabels.map((label, index) => (
            <text key={label} x={pointX(index)} y="229" textAnchor="middle" fill="#959cac" fontSize="10">
              {label}
            </text>
          ))}
        </svg>
        <div className="analytics-legend">
          {currentAnalytics.series.map((series) => (
            <span key={series.name}><i style={{ backgroundColor: series.color }} />{series.name}</span>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Analytics;
