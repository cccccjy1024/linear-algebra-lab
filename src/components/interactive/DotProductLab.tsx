import { useMemo, useState } from 'react'
import VectorCanvas from './VectorCanvas'
import { dot, norm, cosine, fmt } from '../../lib/matrix'

export default function DotProductLab() {
  const [u, setU] = useState([2, 1])
  const [v, setV] = useState([-1, 2])
  const [challenge, setChallenge] = useState(false)

  const d = useMemo(() => dot(u, v), [u, v])
  const nu = norm(u)
  const nv = norm(v)
  const cos = cosine(u, v)
  const angle = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI
  const projScalar = nv === 0 ? 0 : d / nv
  const proj = v.map((x) => projScalar * x)

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>点积与角度观察器</h3>
          <p>改变两个向量，看长度、点积、夹角与投影如何联动。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control">
            <span>u = ({u.join(', ')})</span>
            <span>u₁ <input type="range" min={-4} max={4} step={0.5} value={u[0]} onChange={(e) => setU([Number(e.target.value), u[1]])} /></span>
            <span>u₂ <input type="range" min={-4} max={4} step={0.5} value={u[1]} onChange={(e) => setU([u[0], Number(e.target.value)])} /></span>
          </label>
          <label className="control">
            <span>v = ({v.join(', ')})</span>
            <span>v₁ <input type="range" min={-4} max={4} step={0.5} value={v[0]} onChange={(e) => setV([Number(e.target.value), v[1]])} /></span>
            <span>v₂ <input type="range" min={-4} max={4} step={0.5} value={v[1]} onChange={(e) => setV([v[0], Number(e.target.value)])} /></span>
          </label>
          <button className="button secondary" onClick={() => setChallenge((s) => !s)}>
            {challenge ? '隐藏垂直挑战' : '开启垂直挑战'}
          </button>
        </div>
        <VectorCanvas
          arrows={[
            { x: u[0], y: u[1], color: '#245d80', label: 'u' },
            { x: v[0], y: v[1], color: '#3f7565', label: 'v' },
            { x: proj[0], y: proj[1], color: '#e56b35', label: 'proj', dash: true }
          ]}
        />
        <div className="readout">
          <div className="stat"><span>u·v</span><strong>{fmt(d)}</strong></div>
          <div className="stat"><span>|u|</span><strong>{fmt(nu)}</strong></div>
          <div className="stat"><span>|v|</span><strong>{fmt(nv)}</strong></div>
          <div className="stat"><span>cos θ</span><strong>{fmt(cos)}</strong></div>
          <div className="stat"><span>θ</span><strong>{fmt(angle, 1)}°</strong></div>
          <div className="stat"><span>投影标量</span><strong>{fmt(projScalar)}</strong></div>
        </div>
        {challenge && (
          <div className="status-line">
            {Math.abs(d) < 1e-6 ? '✅ 当前 u·v=0，两个向量垂直。' : `当前 u·v=${fmt(d)}，请继续调整直到它为 0。`}
          </div>
        )}
      </div>
    </div>
  )
}
