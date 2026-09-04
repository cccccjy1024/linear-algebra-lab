import { useMemo, useState } from 'react'
import { solveLinear, fmt } from '../../lib/matrix'

export default function CircuitDemo() {
  const [V, setV] = useState(12)
  const [r1, setR1] = useState(2)
  const [r2, setR2] = useState(4)
  const [r3, setR3] = useState(6)

  const A = useMemo(() => [[r1 + r2, -r2], [-r2, r2 + r3]], [r1, r2, r3])
  const b = [V, 0]
  const sol = useMemo(() => solveLinear(A, b), [A, V])

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>电路网孔电流（KVL→Ax=b）</h3>
          <p>两网孔电路的基尔霍夫电压方程形成 2×2 线性方程组，用消元法求解。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>电源电压 V = {V}V</span><input type="range" min={3} max={24} step={1} value={V} onChange={(e) => setV(Number(e.target.value))} /></label>
          <label className="control"><span>R₁ = {r1}Ω</span><input type="range" min={1} max={10} step={1} value={r1} onChange={(e) => setR1(Number(e.target.value))} /></label>
          <label className="control"><span>R₂ = {r2}Ω</span><input type="range" min={1} max={10} step={1} value={r2} onChange={(e) => setR2(Number(e.target.value))} /></label>
          <label className="control"><span>R₃ = {r3}Ω</span><input type="range" min={1} max={10} step={1} value={r3} onChange={(e) => setR3(Number(e.target.value))} /></label>
        </div>
        <div className="matrix-group">
          <div>
            <div className="matrix-caption">A = [[R₁+R₂, -R₂],[-R₂, R₂+R₃]]</div>
            <span className="matrix-display" style={{ gridTemplateColumns: 'repeat(2, 54px)' }}>
              {A.flat().map((v, i) => <span key={i} className="cell">{fmt(v)}</span>)}
            </span>
          </div>
          <div className="matrix-caption">b = ({V}, 0)</div>
        </div>
        <div className="status-line">
          {sol ? `解得网孔电流 i₁ = ${fmt(sol[0])} A，i₂ = ${fmt(sol[1])} A。` : '系数矩阵奇异，请调整电阻值。'}
        </div>
      </div>
    </div>
  )
}
