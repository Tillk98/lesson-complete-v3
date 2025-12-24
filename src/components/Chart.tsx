import React from 'react'
import styles from './Chart.module.css'

const Chart: React.FC = () => {
  // Data points: weekly progression over 4 weeks (30 days)
  // User: 1000 words total, Average: 500 words total
  const weeks = [0, 1, 2, 3, 4] // Week 0 = start, Week 4 = 30 days
  const yourProgress = [0, 200, 450, 750, 1000] // Smooth progression to 1000
  const averageProgress = [0, 100, 200, 350, 500] // Smooth progression to 500

  const chartHeight = 160
  const chartWidth = 347
  const padding = { top: 10, right: 60, bottom: 30, left: 40 }
  const graphWidth = chartWidth - padding.left - padding.right
  const graphHeight = chartHeight - padding.top - padding.bottom
  const maxValue = 1200

  const getY = (value: number) => {
    return padding.top + graphHeight - (value / maxValue) * graphHeight
  }

  const getX = (index: number) => {
    return padding.left + (index / (weeks.length - 1)) * graphWidth
  }

  // Create smooth curve paths using quadratic bezier curves
  const createSmoothPath = (data: number[]) => {
    let path = `M ${getX(0)} ${getY(data[0])}`
    for (let i = 1; i < data.length; i++) {
      const x = getX(i)
      const y = getY(data[i])
      const prevX = getX(i - 1)
      const prevY = getY(data[i - 1])
      const controlX = (prevX + x) / 2
      path += ` Q ${controlX} ${prevY} ${x} ${y}`
    }
    return path
  }

  const yourPath = createSmoothPath(yourProgress)
  const averagePath = createSmoothPath(averageProgress)

  // Area path for gradient fill
  const yourAreaPath = `${yourPath} L ${getX(weeks.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`

  return (
    <div className={styles.container}>
      <svg
        width={chartWidth}
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className={styles.chart}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3160af" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3160af" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 250, 500, 750, 1000].map((value) => {
          const y = getY(value)
          return (
            <g key={value}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#e8ecf0"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                fontSize="11"
                fill="#6d7680"
                textAnchor="end"
                fontFamily="var(--font-family)"
              >
                {value}
              </text>
            </g>
          )
        })}

        {/* X-axis labels */}
        {weeks.map((week, index) => {
          if (index === 0) return null
          const x = getX(index)
          const day = week * 7
          return (
            <g key={week}>
              <line
                x1={x}
                y1={padding.top + graphHeight}
                x2={x}
                y2={padding.top + graphHeight + 4}
                stroke="#6d7680"
                strokeWidth="1"
              />
              <text
                x={x}
                y={chartHeight - 8}
                fontSize="11"
                fill="#6d7680"
                textAnchor="middle"
                fontFamily="var(--font-family)"
              >
                Day {day}
              </text>
            </g>
          )
        })}

        {/* Area under your progress */}
        <path
          d={yourAreaPath}
          fill="url(#chartGradient)"
          className={styles.areaAnimation}
        />

        {/* Average learner line */}
        <path
          d={averagePath}
          stroke="#9ca3af"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="5 5"
          strokeLinecap="round"
          className={styles.averageLine}
        />

        {/* Your progress line */}
        <path
          d={yourPath}
          stroke="#3160af"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.progressLine}
        />

        {/* Data points for your progress */}
        {yourProgress.map((value, index) => (
          <circle
            key={`your-${index}`}
            cx={getX(index)}
            cy={getY(value)}
            r="4"
            fill="#3160af"
            stroke="white"
            strokeWidth="2"
            className={styles.dataPoint}
          />
        ))}

        {/* Data points for average */}
        {averageProgress.map((value, index) => (
          <circle
            key={`avg-${index}`}
            cx={getX(index)}
            cy={getY(value)}
            r="3.5"
            fill="#9ca3af"
            stroke="white"
            strokeWidth="2"
            className={styles.dataPoint}
          />
        ))}

        {/* Final value labels */}
        <g className={styles.finalLabels}>
          <g transform={`translate(${getX(weeks.length - 1) + 8}, ${getY(yourProgress[yourProgress.length - 1])})`}>
            <rect
              x="-2"
              y="-10"
              width="50"
              height="16"
              rx="4"
              fill="#3160af"
              opacity="0.1"
            />
            <text
              x="23"
              y="2"
              fontSize="11"
              fill="#3160af"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="var(--font-family)"
            >
              1,000
            </text>
          </g>
          <g transform={`translate(${getX(weeks.length - 1) + 8}, ${getY(averageProgress[averageProgress.length - 1])})`}>
            <rect
              x="-2"
              y="-10"
              width="45"
              height="16"
              rx="4"
              fill="#9ca3af"
              opacity="0.1"
            />
            <text
              x="20.5"
              y="2"
              fontSize="11"
              fill="#6d7680"
              fontWeight="500"
              textAnchor="middle"
              fontFamily="var(--font-family)"
            >
              500
            </text>
          </g>
        </g>

        {/* Legend */}
        <g transform={`translate(${padding.left}, ${padding.top - 5})`}>
          <g>
            <line x1={0} y1={6} x2={18} y2={6} stroke="#3160af" strokeWidth="3" strokeLinecap="round" />
            <text x={22} y={9} fontSize="11" fill="#3160af" fontWeight="500" fontFamily="var(--font-family)">
              Your Progress
            </text>
          </g>
          <g transform="translate(0, 16)">
            <line x1={0} y1={6} x2={18} y2={6} stroke="#9ca3af" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />
            <text x={22} y={9} fontSize="11" fill="#6d7680" fontWeight="400" fontFamily="var(--font-family)">
              Average Learner
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Chart

