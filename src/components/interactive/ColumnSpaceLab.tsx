import { useMemo, useState } from 'react'
import VectorCanvas from './VectorCanvas'
import { matVec, fmt } from '../../lib/matrix'

type Mat = number[][]

const initial: Mat = [
  [1, 2, 3],
  [4, 5, 6]
]

function rank2xn(A: Mat) {
  const cols = A[0].map((_, j) => [A[0][j], A[1][j]])
  let nonzero = cols.some((c) => Math.abs(c[0]) + Math.abs(c[1]) > 1e-9)
  if (!nonzero) return 0
  for (let i = 0; i < cols.length; i++) {
    for (let j = i + 1; j < cols.length; j++) {
      const det = cols[i][0] * cols[j][1] - cols[i][1] * cols[j][0]
      if (Math.abs(det) > 1e-9) return 2
    }
  }
  return 1
}

export default function ColumnSpaceLab() {
  const [A, setA] = useState<Mat>(initial)
  const [x, setX] = useState([1, -1, 0.5])
  const [b, setB] = useState([2, 2])

  const Ax = useMemo(() => matVec(A, x), [A, x])
  const rank = useMemo(() => rank2xn(A), [A])
  const augRank = useMemo(() => rank2xn([A[0].concat(b[0]), A[1].concat(b[1])]), [A, b])
  const inSpace = augRank === rank

  const setCell = (i: number, j: number, val: number) => {
    setA((prev) => prev.map((row, r) => (r === i ? row.map((c, cidx) => (cidx === j ? val : c)) : row)))
  }

  const columns = [0, 1, 2].map((j) => ({ x: A[0][j], y: A[1][j] }))

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>列空间与秩观察器</h3>
          <p>编辑矩阵 A，移动 x 观察 Ax 如何由列组合生成，并判断 b 是否在列空间中。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <div className="control">
            <span>A（每列一组输入）</span>
            <div className="matrix-input" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 58px)', gap: 4 }}>
              {[0, 1, 2].map((j) => (
                <div key={j} style={{ display: 'grid', gap: 4 }}>
                  <input type="number" value={A[0][j]} onChange={(e) => setCell(0, j, Number(e.target.value))} />
                  <input type="number" value={A[1][j]} onChange={(e) => setCell(1, j, Number(e.target.value))} />
                </div>
              ))}
            </div>
          </div>
          <label className="control">
            <span>x = ({x.map((v) => fmt(v)).join(', ')})</span>
            {x.map((v, i) => (
              <span key={i}>x{i + 1} <input type="range" min={-3} max={3} step={0.1} value={v} onChange={(e) => setX((prev) => prev.map((z, k) => (k === i ? Number(e.target.value) : z)))} /></span>
            ))}
          </label>
          <label className="control">
            <span>b = ({b.join(', ')})</span>
            <span>b₁ <input type="range" min={-5} max={5} step={0.2} value={b[0]} onChange={(e) => setB([Number(e.target.value), b[1]])} /></span>
            <span>b₂ <input type="range" min={-5} max={5} step={0.2} value={b[1]} onChange={(e) => setB([b[0], Number(e.target.value)])} /></span>
          </label>
        </div>
        <VectorCanvas
          arrows={columns.map((c, i) => ({ x: c.x, y: c.y, color: ['#245d80', '#3f7565', '#6b628d'][i], label: `a${i + 1}` })).concat([{ x: Ax[0], y: Ax[1], color: '#e56b35', label: 'Ax' }])}
          target={{ x: b[0], y: b[1], color: '#193044', label: 'b' }}
          span={rank === 1 && columns.some((c) => c.x || c.y) ? 'line' : undefined}
          lineDir={columns.find((c) => c.x || c.y)}
        />
        <div className="readout">
          <div className="stat"><span>秩</span><strong>{rank}</strong></div>
          <div className="stat"><span>列空间</span><strong>{rank === 0 ? '原点' : rank === 1 ? '直线' : '全平面 R²'}</strong></div>
          <div className="stat"><span>Ax</span><strong>({fmt(Ax[0])}, {fmt(Ax[1])})</strong></div>
          <div className="stat"><span>b ∈ C(A)</span><strong>{inSpace ? '是' : '否'}</strong></div>
        </div>
        <div className="status-line">
          列空间由列向量生成；秩为 {rank}，{rank === 1 ? '所有列共线' : '存在两个独立列'}。当前 b {inSpace ? '在列空间中' : '不在列空间中'}。
        </div>
      </div>
    </div>
  )
}

