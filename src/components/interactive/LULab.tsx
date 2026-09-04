import { useMemo, useState } from 'react'
import { luNoPivot, matMul, fmt } from '../../lib/matrix'

const presets: Record<string, number[][]> = {
  main: [[2, 1, 1], [4, 3, 3], [8, 7, 9]],
  singular: [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
}

export default function LULab() {
  const [key, setKey] = useState('main')
  const A = presets[key]
  const { L, U, singular } = useMemo(() => luNoPivot(A), [A])
  const check = useMemo(() => matMul(L, U), [L, U])

  const Matrix = ({ data }: { data: number[][] }) => (
    <span className="matrix-display" style={{ gridTemplateColumns: `repeat(${data[0].length}, 48px)` }}>
      {data.map((row, i) => row.map((val, j) => (
        <span key={`${i}-${j}`} className={`cell${i === j ? ' pivot' : i > j ? ' mult' : ''}`}>{fmt(val)}</span>
      )))}
    </span>
  )

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>A=LU 分解器</h3>
          <p>观察消元乘子如何组成 L，以及 L×U 如何恢复 A。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <select className="control" value={key} onChange={(e) => setKey(e.target.value)}>
            <option value="main">例题：A=[[2,1,1],[4,3,3],[8,7,9]]</option>
            <option value="singular">奇异情形：0 主元</option>
          </select>
        </div>
        <div className="matrix-group">
          <div>
            <div className="matrix-caption">A</div>
            <Matrix data={A} />
          </div>
          <div>
            <div className="matrix-caption">L（单位下三角）</div>
            <Matrix data={L} />
          </div>
          <div>
            <div className="matrix-caption">U（上三角）</div>
            <Matrix data={U} />
          </div>
          <div>
            <div className="matrix-caption">L×U 验证</div>
            <Matrix data={check} />
          </div>
        </div>
        <div className="status-line">
          {singular ? '出现 0 主元，无法完成无行交换的 LU 分解；需要置换矩阵 P。' : 'L 对角线全为 1，U 主元位于对角线上；消元计算量约为 n³/3。'}
        </div>
      </div>
    </div>
  )
}
