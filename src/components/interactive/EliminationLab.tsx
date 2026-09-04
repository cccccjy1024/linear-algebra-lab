import { useMemo, useState } from 'react'
import { fmt } from '../../lib/matrix'

const presets: Record<string, { A: number[][]; b: number[] }> = {
  good: {
    A: [[2, 4, -2], [4, 9, -3], [-2, -3, 7]],
    b: [2, 8, 10]
  },
  singular: {
    A: [[1, 2, 3], [2, 4, 6], [3, 6, 9]],
    b: [1, 2, 4]
  }
}

function buildSteps(A: number[][], b: number[]) {
  const n = A.length
  const M = A.map((row, i) => [...row, b[i]])
  const augs: number[][][] = [M.map((r) => [...r])]
  const pivots: number[] = []
  let singular = false
  for (let k = 0; k < n; k++) {
    const p = M[k][k]
    pivots.push(p)
    if (Math.abs(p) < 1e-9) {
      singular = true
      break
    }
    for (let i = k + 1; i < n; i++) {
      const mult = M[i][k] / p
      M[i][k] = 0
      for (let j = k + 1; j <= n; j++) M[i][j] -= mult * M[k][j]
    }
    augs.push(M.map((r) => [...r]))
  }
  return { augs, pivots, singular }
}

function backSub(A: number[][], b: number[]) {
  const n = A.length
  const x = Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(A[i][i]) < 1e-9) return null
    let s = b[i]
    for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]
    x[i] = s / A[i][i]
  }
  return x
}

export default function EliminationLab() {
  const [key, setKey] = useState('good')
  const preset = presets[key]
  const [step, setStep] = useState(0)
  const { augs, pivots, singular } = useMemo(() => buildSteps(preset.A, preset.b), [preset])
  const current = augs[Math.min(step, augs.length - 1)]
  const finalA = current.slice(0, 3).map((r) => r.slice(0, 3))
  const finalB = current.map((r) => r[3])
  const sol = useMemo(() => (singular ? null : backSub(finalA, finalB)), [singular, finalA, finalB])

  const Matrix = ({ data }: { data: number[][] }) => (
    <span className="matrix-display" style={{ gridTemplateColumns: `repeat(${data[0].length}, 46px)` }}>
      {data.map((row, i) => row.map((val, j) => (
        <span key={`${i}-${j}`} className={`cell${j === i && j < 3 ? ' pivot' : ''}`}>{fmt(val)}</span>
      )))}
    </span>
  )

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>消元与回代工作台</h3>
          <p>逐步播放增广矩阵 [A|b] 如何变成上三角形式 [U|c]。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <select className="control" value={key} onChange={(e) => { setKey(e.target.value); setStep(0) }}>
            <option value="good">例题：唯一解</option>
            <option value="singular">失效情形：0 主元</option>
          </select>
          <label className="control">
            <span>消元步骤 {step} / {augs.length - 1}</span>
            <input type="range" min={0} max={augs.length - 1} step={1} value={step} onChange={(e) => setStep(Number(e.target.value))} />
          </label>
        </div>
        <Matrix data={current} />
        <div className="readout">
          <div className="stat"><span>主元</span><strong>{pivots.map((p) => fmt(p)).join(', ')}</strong></div>
          <div className="stat"><span>状态</span><strong>{singular ? '奇异/失效' : '可继续消元'}</strong></div>
          <div className="stat"><span>解 x</span><strong>{sol ? `(${sol.map((v) => fmt(v)).join(', ')})` : '无唯一解'}</strong></div>
        </div>
        <div className="status-line">
          {step === 0 ? '初始增广矩阵。' : `第 ${step} 步消元完成，主元 ${fmt(pivots[step - 1])}。`}
          {singular && ' 当前主元为 0，消元失效；该方程组可能无解或有无穷多解。'}
        </div>
      </div>
    </div>
  )
}
