import { useMemo, useState } from 'react'
import { solveLinear, fmt } from '../../lib/matrix'

export default function LinearFitDemo() {
  const [x1, setX1] = useState(1)
  const [y1, setY1] = useState(2)
  const [x2, setX2] = useState(4)
  const [y2, setY2] = useState(5)

  const A = useMemo(() => [[x1, 1], [x2, 1]], [x1, x2])
  const b = useMemo(() => [y1, y2], [y1, y2])
  const sol = useMemo(() => solveLinear(A, b), [A, b])

  const lineY = (x: number) => (sol ? sol[0] * x + sol[1] : 0)
  const w = 420
  const h = 260
  const xMin = Math.min(0, x1, x2) - 1
  const xMax = Math.max(0, x1, x2) + 1
  const yMin = Math.min(0, y1, y2, lineY(xMin), lineY(xMax)) - 1
  const yMax = Math.max(0, y1, y2, lineY(xMin), lineY(xMax)) + 1
  const toX = (x: number) => ((x - xMin) / (xMax - xMin)) * w
  const toY = (y: number) => ((yMax - y) / (yMax - yMin)) * h

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>线性模型拟合：两点定直线</h3>
          <p>AI 建模的雏形：把两个数据点代入 y=mx+c，得到一个 2×2 方程组 Ax=b。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>点1 x₁ = {x1}</span><input type="range" min={-3} max={6} step={0.5} value={x1} onChange={(e) => setX1(Number(e.target.value))} /></label>
          <label className="control"><span>点1 y₁ = {y1}</span><input type="range" min={-3} max={8} step={0.5} value={y1} onChange={(e) => setY1(Number(e.target.value))} /></label>
          <label className="control"><span>点2 x₂ = {x2}</span><input type="range" min={-3} max={6} step={0.5} value={x2} onChange={(e) => setX2(Number(e.target.value))} /></label>
          <label className="control"><span>点2 y₂ = {y2}</span><input type="range" min={-3} max={8} step={0.5} value={y2} onChange={(e) => setY2(Number(e.target.value))} /></label>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="vector-canvas">
          <rect width={w} height={h} fill="#fffdf7" />
          {Array.from({ length: 9 }, (_, i) => i - 4).map((g) => (
            <line key={`v${g}`} x1={toX(g)} y1={0} x2={toX(g)} y2={h} stroke="#193044" strokeOpacity={0.06} />
          ))}
          {Array.from({ length: 9 }, (_, i) => i - 4).map((g) => (
            <line key={`h${g}`} x1={0} y1={toY(g)} x2={w} y2={toY(g)} stroke="#193044" strokeOpacity={0.06} />
          ))}
          <line x1={0} y1={toY(0)} x2={w} y2={toY(0)} stroke="#193044" strokeOpacity={0.5} />
          <line x1={toX(0)} y1={0} x2={toX(0)} y2={h} stroke="#193044" strokeOpacity={0.5} />
          {sol && <line x1={toX(xMin)} y1={toY(lineY(xMin))} x2={toX(xMax)} y2={toY(lineY(xMax))} stroke="#e56b35" strokeWidth={3} />}
          <circle cx={toX(x1)} cy={toY(y1)} r={6} fill="#245d80" />
          <circle cx={toX(x2)} cy={toY(y2)} r={6} fill="#3f7565" />
        </svg>
        <div className="status-line">
          {sol
            ? <>方程组：{x1}m + c = {y1}，{x2}m + c = {y2}；解得斜率 m = {fmt(sol[0])}，截距 c = {fmt(sol[1])}。</>
            : '两个点的 x 坐标相同，方程奇异，无法唯一确定直线。'}
        </div>
      </div>
    </div>
  )
}
