import { useMemo, useState } from 'react'
import { matVec, fmt } from '../../lib/matrix'

const initialPoints = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]]

export default function LayerDemo() {
  const [W, setW] = useState([[1.2, 0.3], [0.1, 0.8]])
  const [b, setB] = useState([0.2, -0.1])
  const input = [1, 0.5]
  const out = useMemo(() => matVec(W, input).map((v, i) => v + b[i]), [W, b])
  const transformed = useMemo(() => initialPoints.map((p) => {
    const r = matVec(W, p)
    return [r[0] + b[0], r[1] + b[1]]
  }), [W, b])

  const setCell = (i: number, j: number, val: number) => {
    setW((prev) => prev.map((row, r) => (r === i ? row.map((c, cidx) => (cidx === j ? val : c)) : row)))
  }

  const Svg = () => {
    const w = 420
    const h = 260
    const max = 3
    const toX = (x: number) => ((x + max) / (2 * max)) * w
    const toY = (y: number) => ((max - y) / (2 * max)) * h
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="vector-canvas">
        <rect width={w} height={h} fill="#fffdf7" />
        {[-max, -2, -1, 0, 1, 2, max].map((g) => (
          <line key={`v${g}`} x1={toX(g)} y1={0} x2={toX(g)} y2={h} stroke="#193044" strokeOpacity={0.06} />
        ))}
        {[-max, -2, -1, 0, 1, 2, max].map((g) => (
          <line key={`h${g}`} x1={0} y1={toY(g)} x2={w} y2={toY(g)} stroke="#193044" strokeOpacity={0.06} />
        ))}
        <line x1={0} y1={toY(0)} x2={w} y2={toY(0)} stroke="#193044" strokeOpacity={0.5} />
        <line x1={toX(0)} y1={0} x2={toX(0)} y2={h} stroke="#193044" strokeOpacity={0.5} />
        {initialPoints.map((p, i) => <circle key={`o${i}`} cx={toX(p[0])} cy={toY(p[1])} r={4} fill="#245d80" opacity={0.55} />)}
        {transformed.map((p, i) => <circle key={`t${i}`} cx={toX(p[0])} cy={toY(p[1])} r={4} fill="#e56b35" opacity={0.8} />)}
      </svg>
    )
  }

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>神经网络单层 = Wx+b</h3>
          <p>调节权重矩阵 W，观察 9 个输入点如何被线性变换；蓝色为输入，橙色为输出。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <div className="control">
            <span>权重矩阵 W</span>
            <div className="matrix-input" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 58px)', gap: 4 }}>
              {[0, 1].map((j) => (
                <div key={j} style={{ display: 'grid', gap: 4 }}>
                  <input type="number" step={0.1} value={W[0][j]} onChange={(e) => setCell(0, j, Number(e.target.value))} />
                  <input type="number" step={0.1} value={W[1][j]} onChange={(e) => setCell(1, j, Number(e.target.value))} />
                </div>
              ))}
            </div>
          </div>
          <label className="control">
            <span>b₁</span>
            <input type="number" step={0.1} value={b[0]} onChange={(e) => setB([Number(e.target.value), b[1]])} />
          </label>
          <label className="control">
            <span>b₂</span>
            <input type="number" step={0.1} value={b[1]} onChange={(e) => setB([b[0], Number(e.target.value)])} />
          </label>
        </div>
        <Svg />
        <div className="status-line">
          输入 x = (1, 0.5)，输出 Wx+b = ({fmt(out[0])}, {fmt(out[1])})。每个输出都是输入特征与偏置的线性组合，这正是矩阵乘法的意义。
        </div>
      </div>
    </div>
  )
}
