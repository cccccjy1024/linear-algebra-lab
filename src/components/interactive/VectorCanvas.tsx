export interface ArrowSpec {
  x: number
  y: number
  color: string
  label?: string
  dash?: boolean
}

interface Props {
  arrows: ArrowSpec[]
  target?: { x: number; y: number; color: string; label?: string }
  span?: 'line' | 'plane'
  lineDir?: { x: number; y: number }
  width?: number
  height?: number
  dim?: 2 | 3
}

function axisBounds(arrows: ArrowSpec[], target?: Props['target']) {
  let max = 3
  for (const a of arrows) max = Math.max(max, Math.abs(a.x), Math.abs(a.y))
  if (target) max = Math.max(max, Math.abs(target.x), Math.abs(target.y))
  max = Math.min(Math.max(max * 1.25, 3), 24)
  return max
}

function project3(p: number[]) {
  if (p.length >= 3) return { x: p[0] + 0.45 * p[2], y: p[1] - 0.3 * p[2] }
  return { x: p[0], y: p[1] }
}

export default function VectorCanvas({ arrows, target, span, lineDir, width = 480, height = 320, dim = 2 }: Props) {
  const max = axisBounds(arrows, target)
  const xmin = -max
  const xmax = max
  const ymin = -max * (height / width)
  const ymax = max * (height / width)
  const toX = (x: number) => ((x - xmin) / (xmax - xmin)) * width
  const toY = (y: number) => ((ymax - y) / (ymax - ymin)) * height

  const axisSpecs =
    dim === 3
      ? [
          { key: 'x', vec: [max, 0, 0], color: '#0f172a' },
          { key: 'y', vec: [0, max, 0], color: '#0f172a' },
          { key: 'z', vec: [0, 0, max], color: '#0f172a' }
        ]
      : [
          { key: 'x', vec: [max, 0], color: '#0f172a' },
          { key: 'y', vec: [0, max], color: '#0f172a' }
        ]

  return (
    <svg
      className="vector-canvas"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="向量图"
    >
      <rect x="0" y="0" width={width} height={height} fill="#fff" />
      {/* grid */}
      {Array.from({ length: Math.floor(max) * 2 + 1 }, (_, i) => i - Math.floor(max)).map((g) => (
        <line key={`gx${g}`} x1={toX(g)} y1={toY(ymin)} x2={toX(g)} y2={toY(ymax)} stroke="#0f172a" strokeOpacity={0.06} strokeWidth={1} />
      ))}
      {Array.from({ length: Math.floor(max) * 2 + 1 }, (_, i) => i - Math.floor(max)).map((g) => (
        <line key={`gy${g}`} x1={toX(xmin)} y1={toY(g)} x2={toX(xmax)} y2={toY(g)} stroke="#0f172a" strokeOpacity={0.06} strokeWidth={1} />
      ))}

      {/* coordinate axes */}
      {axisSpecs.map((axis) => {
        const pos = project3(axis.vec)
        const neg = project3(axis.vec.map((v) => -v))
        const x1 = toX(neg.x)
        const y1 = toY(neg.y)
        const x2 = toX(pos.x)
        const y2 = toY(pos.y)
        return (
          <g key={axis.key}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={axis.color} strokeOpacity={0.45} strokeWidth={1.4} />
            <polygon
              points={`${x2},${y2} ${x2 - 7},${y2 - 4} ${x2 - 4},${y2 - 7}`}
              fill={axis.color}
              fillOpacity={0.7}
              transform={`rotate(${Math.atan2(pos.y, pos.x) * 180 / Math.PI} ${x2} ${y2})`}
            />
            <text x={x2 + 7} y={y2 - 7} fontSize={12} fill="#0f172a" fontWeight={700}>{axis.key}</text>
          </g>
        )
      })}

      {span === 'line' && lineDir && (
        <line x1={toX(-lineDir.x * max)} y1={toY(-lineDir.y * max)} x2={toX(lineDir.x * max)} y2={toY(lineDir.y * max)} stroke="#e56b35" strokeWidth={8} strokeOpacity={0.08} />
      )}
      {span === 'plane' && (
        <rect x={0} y={0} width={width} height={height} fill="#3f7565" opacity={0.06} />
      )}

      {arrows.map((a, i) => {
        const x1 = toX(0)
        const y1 = toY(0)
        const x2 = toX(a.x)
        const y2 = toY(a.y)
        return (
          <g key={`${i}-${a.label}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={a.color} strokeWidth={2.2} strokeDasharray={a.dash ? '5 4' : undefined} />
            <polygon
              points={`${x2},${y2} ${x2 - 7},${y2 - 4} ${x2 - 4},${y2 - 7}`}
              fill={a.color}
              transform={`rotate(${Math.atan2(a.y, a.x) * 180 / Math.PI} ${x2} ${y2})`}
            />
            {a.label && (
              <text x={x2 + 8} y={y2 - 6} fontSize={12} fill={a.color} fontWeight={700}>{a.label}</text>
            )}
          </g>
        )
      })}

      {target && (
        <g>
          <circle cx={toX(target.x)} cy={toY(target.y)} r={4.5} fill={target.color} stroke="#fff" strokeWidth={1.5} />
          {target.label && <text x={toX(target.x) + 9} y={toY(target.y) - 6} fontSize={12} fill={target.color} fontWeight={700}>{target.label}</text>}
        </g>
      )}
    </svg>
  )
}
