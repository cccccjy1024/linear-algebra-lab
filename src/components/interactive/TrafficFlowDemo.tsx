import { useMemo, useState } from 'react'
import { solveLinear, fmt } from '../../lib/matrix'

export default function TrafficFlowDemo() {
  const [Ain, setAin] = useState(5)
  const [Bin, setBin] = useState(3)
  const [Cout, setCout] = useState(2)

  const A = useMemo(() => [[1, 1], [1, -1]], [])
  const b = useMemo(() => [Ain + Bin, Cout], [Ain, Bin, Cout])
  const sol = useMemo(() => solveLinear(A, b), [A, b])

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>交通流网络平衡（节点流入=流出）</h3>
          <p>把路口守恒写成 Ax=b，观察流量参数如何决定解是否存在且唯一。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>入口 A = {Ain}</span><input type="range" min={0} max={10} step={1} value={Ain} onChange={(e) => setAin(Number(e.target.value))} /></label>
          <label className="control"><span>入口 B = {Bin}</span><input type="range" min={0} max={10} step={1} value={Bin} onChange={(e) => setBin(Number(e.target.value))} /></label>
          <label className="control"><span>约束 C = {Cout}</span><input type="range" min={-5} max={5} step={1} value={Cout} onChange={(e) => setCout(Number(e.target.value))} /></label>
        </div>
        <div className="status-line">
          方程组：x₁+x₂ = {b[0]}，x₁-x₂ = {b[1]}。
          {sol ? <>解为 x₁ = {fmt(sol[0])}，x₂ = {fmt(sol[1])}；系数矩阵满秩，解唯一。</> : '系数矩阵奇异，约束不满足时无解或有无穷多解。'}
        </div>
      </div>
    </div>
  )
}
