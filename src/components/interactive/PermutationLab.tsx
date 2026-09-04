import { useMemo, useState } from 'react'
import { permutationMatrices, matMul, transpose, luNoPivot, dot, matVec, fmt } from '../../lib/matrix'

const A = [[0, 1, 1], [1, 1, 1], [1, 2, 3]]

export default function PermutationLab() {
  const ps = useMemo(() => permutationMatrices(3), [])
  const [idx, setIdx] = useState(0)
  const P = ps[idx]
  const PA = useMemo(() => matMul(P, A), [P])
  const { L, U, singular } = useMemo(() => luNoPivot(PA), [PA])
  const AT = useMemo(() => transpose(A), [])
  const S = useMemo(() => {
    const t = transpose(A)
    return A.map((row, i) => row.map((v, j) => (v + t[i][j]) / 2))
  }, [])

  const Matrix = ({ data }: { data: number[][] }) => (
    <span className="matrix-display" style={{ gridTemplateColumns: `repeat(${data[0].length}, 40px)` }}>
      {data.map((row, i) => row.map((val, j) => (
        <span key={`${i}-${j}`} className="cell">{fmt(val)}</span>
      )))}
    </span>
  )

  const x = [1, 2, 3]
  const y = [2, -1, 4]
  const lhs = dot(matVec(A, x), y)
  const rhs = dot(x, matVec(AT, y))

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>置换与转置工作台</h3>
          <p>选择置换矩阵 P，观察 PA=LU、转置 Aᵀ 与对称矩阵 (A+Aᵀ)/2。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control">
            <span>置换矩阵 P（3! = 6 种）</span>
            <select className="control" value={idx} onChange={(e) => setIdx(Number(e.target.value))}>
              {ps.map((p, i) => (
                <option key={i} value={i}>P{i + 1} = [{p.map((row) => `[${row.join(',')}]`).join(' ')}]</option>
              ))}
            </select>
          </label>
        </div>
        <div className="matrix-group">
          <div>
            <div className="matrix-caption">P</div>
            <Matrix data={P} />
          </div>
          <div>
            <div className="matrix-caption">PA</div>
            <Matrix data={PA} />
          </div>
          <div>
            <div className="matrix-caption">L</div>
            <Matrix data={L} />
          </div>
          <div>
            <div className="matrix-caption">U</div>
            <Matrix data={U} />
          </div>
        </div>
        <div className="matrix-group">
          <div>
            <div className="matrix-caption">A</div>
            <Matrix data={A} />
          </div>
          <div>
            <div className="matrix-caption">Aᵀ</div>
            <Matrix data={AT} />
          </div>
          <div>
            <div className="matrix-caption">(A+Aᵀ)/2</div>
            <Matrix data={S} />
          </div>
        </div>
        <div className="status-line">
          {singular ? '当前 PA 首主元为 0，请选择交换首行的置换。' : `当前 PA 可分解为 LU。内积恒等式验证：⟨Ax,y⟩=${fmt(lhs)}，⟨x,Aᵀy⟩=${fmt(rhs)}。`}
        </div>
      </div>
    </div>
  )
}
