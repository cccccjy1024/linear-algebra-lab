import { useMemo, useState } from 'react'
import { fmt, inverseGaussJordan } from '../../lib/matrix'

const presets: Record<string, number[][]> = {
  invertible: [[1, 2], [3, 4]],
  singular: [[1, 2], [2, 4]]
}

function buildSteps(A: number[][]) {
  const n = A.length
  const M = A.map((row, i) => [...row, ...(i === 0 ? [1, 0] : [0, 1])])
  const steps: number[][][] = [M.map((r) => [...r])]
  for (let k = 0; k < n; k++) {
    let max = k
    for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[max][k])) max = i
    if (Math.abs(M[max][k]) < 1e-9) break
    if (max !== k) [M[k], M[max]] = [M[max], M[k]]
    const p = M[k][k]
    for (let j = 0; j < 2 * n; j++) M[k][j] /= p
    steps.push(M.map((r) => [...r]))
    for (let i = 0; i < n; i++) {
      if (i === k) continue
      const f = M[i][k]
      if (Math.abs(f) < 1e-12) continue
      for (let j = 0; j < 2 * n; j++) M[i][j] -= f * M[k][j]
    }
    steps.push(M.map((r) => [...r]))
  }
  return steps
}

export default function InverseLab() {
  const [key, setKey] = useState('invertible')
  const A = presets[key]
  const [step, setStep] = useState(0)
  const steps = useMemo(() => buildSteps(A), [A])
  const inv = useMemo(() => inverseGaussJordan(A), [A])
  const current = steps[Math.min(step, steps.length - 1)]

  const Matrix = ({ data, split = 2 }: { data: number[][]; split?: number }) => (
    <span className="matrix-display" style={{ gridTemplateColumns: `repeat(${data[0].length}, 44px)` }}>
      {data.map((row, i) => row.map((val, j) => (
        <span key={`${i}-${j}`} className={`cell${j < split ? '' : ' mult'}`}>{fmt(val)}</span>
      )))}
    </span>
  )

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>高斯-若尔当逆矩阵</h3>
          <p>对 [A|I] 做行变换，把左侧变成 I，右侧就是 A⁻¹。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <select className="control" value={key} onChange={(e) => { setKey(e.target.value); setStep(0) }}>
            <option value="invertible">可逆：A=[[1,2],[3,4]]</option>
            <option value="singular">奇异：A=[[1,2],[2,4]]</option>
          </select>
          <label className="control">
            <span>步骤 {step} / {steps.length - 1}</span>
            <input type="range" min={0} max={steps.length - 1} step={1} value={step} onChange={(e) => setStep(Number(e.target.value))} />
          </label>
        </div>
        <Matrix data={current} split={2} />
        <div className="readout">
          <div className="stat"><span>A⁻¹</span><strong>{inv ? inv.map((r) => `[${r.map((v) => fmt(v)).join(', ')}]`).join(' ') : '不存在'}</strong></div>
        </div>
        <div className="status-line">
          {inv ? '左侧最终变为单位矩阵，右侧即为逆矩阵。' : '矩阵奇异，无法化为单位矩阵，逆矩阵不存在。'}
        </div>
      </div>
    </div>
  )
}
