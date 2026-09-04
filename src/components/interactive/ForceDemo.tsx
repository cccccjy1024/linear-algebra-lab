import { useMemo, useState } from 'react'
import VectorCanvas from './VectorCanvas'
import { fmt } from '../../lib/matrix'

export default function ForceDemo() {
  const [f1, setF1] = useState(5)
  const [a1, setA1] = useState(40)
  const [f2, setF2] = useState(4)
  const [a2, setA2] = useState(120)

  const v = useMemo(() => [f1 * Math.cos(a1 * Math.PI / 180), f1 * Math.sin(a1 * Math.PI / 180)], [f1, a1])
  const w = useMemo(() => [f2 * Math.cos(a2 * Math.PI / 180), f2 * Math.sin(a2 * Math.PI / 180)], [f2, a2])
  const r = [v[0] + w[0], v[1] + w[1]]
  const mag = Math.sqrt(r[0] ** 2 + r[1] ** 2)
  const dir = Math.atan2(r[1], r[0]) * 180 / Math.PI

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>力的向量合成</h3>
          <p>两个力按平行四边形法则相加，合力就是向量的线性组合 v+w。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>力 F₁ = {f1} N</span><input type="range" min={0} max={10} step={0.5} value={f1} onChange={(e) => setF1(Number(e.target.value))} /></label>
          <label className="control"><span>方向 θ₁ = {a1}°</span><input type="range" min={0} max={360} step={1} value={a1} onChange={(e) => setA1(Number(e.target.value))} /></label>
          <label className="control"><span>力 F₂ = {f2} N</span><input type="range" min={0} max={10} step={0.5} value={f2} onChange={(e) => setF2(Number(e.target.value))} /></label>
          <label className="control"><span>方向 θ₂ = {a2}°</span><input type="range" min={0} max={360} step={1} value={a2} onChange={(e) => setA2(Number(e.target.value))} /></label>
        </div>
        <VectorCanvas arrows={[{ x: v[0], y: v[1], color: '#245d80', label: 'F₁' }, { x: w[0], y: w[1], color: '#3f7565', label: 'F₂' }, { x: r[0], y: r[1], color: '#e56b35', label: '合力' }]} />
        <div className="readout">
          <div className="stat"><span>合力分量</span><strong>({fmt(r[0])}, {fmt(r[1])}) N</strong></div>
          <div className="stat"><span>合力大小</span><strong>{fmt(mag)} N</strong></div>
          <div className="stat"><span>合力方向</span><strong>{fmt(dir, 1)}°</strong></div>
        </div>
        <div className="status-line">工程中的力、速度、位移都可用向量表示；求合力就是把向量相加。</div>
      </div>
    </div>
  )
}
