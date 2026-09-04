import { useMemo, useState } from 'react'
import VectorCanvas from './VectorCanvas'
import { fmt } from '../../lib/matrix'

type Preset = {
  dim: 2 | 3
  v: number[]
  w: number[]
  b: number[]
  cd: [number, number]
}

const presets: Record<string, Preset> = {
  '2d-plan': { dim: 2, v: [1, 2], w: [3, 1], b: [7, 8], cd: [3.4, 1.2] },
  '2d-line': { dim: 2, v: [1, 2], w: [2, 4], b: [3, 6], cd: [1.5, 0] },
  '3d-plane': { dim: 3, v: [1, 1, 0], w: [0, 1, 1], b: [2, 5, 3], cd: [2, 3] }
}

function project(p: number[]) {
  if (p.length === 2) return { x: p[0], y: p[1] }
  return { x: p[0] + 0.45 * p[2], y: p[1] - 0.3 * p[2] }
}

export default function LinearComboLab() {
  const [key, setKey] = useState('2d-plan')
  const [c, setC] = useState(1.2)
  const [d, setD] = useState(0.8)
  const p = presets[key]

  const sum = useMemo(() => p.v.map((vi, i) => c * vi + d * p.w[i]), [p, c, d])
  const target = project(p.b)
  const vp = project(p.v)
  const wp = project(p.w)
  const sp = project(sum)

  const collinear = p.dim === 2 && Math.abs(p.v[0] * p.w[1] - p.v[1] * p.w[0]) < 1e-9
  const lineDir = collinear ? vp : undefined
  const span = p.dim === 2 ? (collinear ? 'line' : 'plane') : 'plane'

  const arrowColor = (i: number) => (i === 0 ? '#245d80' : '#3f7565')

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>线性组合工作台</h3>
          <p>拖动 c、d，观察 cv+dw 如何落在 v 与 w 张成的图形上。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <select className="control" value={key} onChange={(e) => setKey(e.target.value)}>
            <option value="2d-plan">二维：v 与 w 张成平面</option>
            <option value="2d-line">二维：v 与 w 共线</option>
            <option value="3d-plane">三维：v 与 w 张成平面</option>
          </select>
          <label className="control">
            <span>c = {fmt(c)}</span>
            <input type="range" min={-3} max={3} step={0.1} value={c} onChange={(e) => setC(Number(e.target.value))} />
          </label>
          <label className="control">
            <span>d = {fmt(d)}</span>
            <input type="range" min={-3} max={3} step={0.1} value={d} onChange={(e) => setD(Number(e.target.value))} />
          </label>
        </div>
        <VectorCanvas
          arrows={[
            { x: vp.x, y: vp.y, color: arrowColor(0), label: 'v' },
            { x: wp.x, y: wp.y, color: arrowColor(1), label: 'w' },
            { x: sp.x, y: sp.y, color: '#e56b35', label: 'cv+dw' }
          ]}
          target={{ ...target, color: '#193044', label: 'b' }}
          span={span}
          lineDir={lineDir}
          dim={p.dim}
        />
        <div className="status-line">
          v = ({p.v.join(', ')}), w = ({p.w.join(', ')}), 当前 cv+dw = ({sum.map((x) => fmt(x)).join(', ')})
          ；目标 b = ({p.b.join(', ')}) 的精确系数为 c={fmt(p.cd[0])}, d={fmt(p.cd[1])}。
        </div>
      </div>
    </div>
  )
}
