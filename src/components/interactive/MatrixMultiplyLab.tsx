import { useMemo, useState } from 'react'
import { matMul, inverse2, det2, fmt } from '../../lib/matrix'
import MathTex from '../MathTex'

type Mat = number[][]

const B: Mat = [
  [1, 0],
  [0, 1],
  [1, 1]
]

function computeCR(A: Mat): { C: Mat | null; R: Mat | null; rank: number } {
  const cols = [0, 1, 2].map((j) => [A[0][j], A[1][j]])
  const nonzero = cols.some((c) => Math.abs(c[0]) + Math.abs(c[1]) > 1e-9)
  if (!nonzero) return { C: null, R: null, rank: 0 }
  const pair = (i: number, j: number) => cols[i][0] * cols[j][1] - cols[i][1] * cols[j][0]
  if (Math.abs(pair(0, 1)) > 1e-9) {
    const C = [cols[0], cols[1]]
    const inv = inverse2(C)!
    const R = [0, 1, 2].map((j) => {
      const r = matMul(inv, [[cols[j][0]], [cols[j][1]]])
      return [r[0][0], r[1][0]]
    })
    return { C: [cols[0], cols[1]], R, rank: 2 }
  }
  // rank 1: use first nonzero column
  const ci = cols.findIndex((c) => Math.abs(c[0]) + Math.abs(c[1]) > 1e-9)
  const c = cols[ci]
  const C = [[c[0]], [c[1]]]
  const scale = Math.abs(c[0]) > 1e-9 ? 1 / c[0] : 1 / c[1]
  const R = [cols.map((col) => (Math.abs(c[0]) > 1e-9 ? col[0] * scale : col[1] * scale))]
  return { C, R, rank: 1 }
}

export default function MatrixMultiplyLab() {
  const [A, setA] = useState<Mat>([
    [1, 2, 3],
    [4, 5, 6]
  ])
  const [view, setView] = useState('columns')

  const AB = useMemo(() => matMul(A, B), [A])
  const cr = useMemo(() => computeCR(A), [A])

  const setCell = (i: number, j: number, val: number) => {
    setA((prev) => prev.map((row, r) => (r === i ? row.map((c, ci) => (ci === j ? val : c)) : row)))
  }

  const Matrix = ({ data, highlight }: { data: Mat; highlight?: (i: number, j: number) => boolean }) => (
    <span className="matrix-display" style={{ gridTemplateColumns: `repeat(${data[0].length}, 42px)` }}>
      {data.map((row, i) => row.map((val, j) => (
        <span key={`${i}-${j}`} className={`cell${highlight?.(i, j) ? ' pivot' : ''}`}>{fmt(val)}</span>
      )))}
    </span>
  )

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>矩阵乘法四视图</h3>
          <p>编辑 A，观察 AB 的四种理解方式，并查看 A=CR 分解。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <div className="control">
            <span>A（2×3）</span>
            <div className="matrix-input" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 58px)', gap: 4 }}>
              {[0, 1, 2].map((j) => (
                <div key={j} style={{ display: 'grid', gap: 4 }}>
                  <input type="number" value={A[0][j]} onChange={(e) => setCell(0, j, Number(e.target.value))} />
                  <input type="number" value={A[1][j]} onChange={(e) => setCell(1, j, Number(e.target.value))} />
                </div>
              ))}
            </div>
          </div>
          <div className="control">
            <span>B（3×2，固定）</span>
            <Matrix data={B} />
          </div>
          <div className="control">
            <span>AB（2×2）</span>
            <Matrix data={AB} />
          </div>
        </div>

        <div className="btn-row">
          {[
            ['columns', '列组合'],
            ['rows', '行组合'],
            ['entries', '行×列点积'],
            ['outer', '列×行外积']
          ].map(([k, label]) => (
            <button key={k} className={`button ${view === k ? '' : 'secondary'}`} onClick={() => setView(k)}>{label}</button>
          ))}
        </div>

        <div className="status-line">
          {view === 'columns' && <>AB 的第 j 列 = A 的列以 B 第 j 列为系数组合：第 1 列 = a₁+0·a₂+1·a₃ = ({AB[0][0]}, {AB[1][0]})。</>}
          {view === 'rows' && <>AB 的第 i 行 = B 的行以 A 第 i 行为系数组合：第 1 行 = 1·row₁(B)+2·row₂(B)+3·row₃(B) = ({AB[0][0]}, {AB[0][1]})。</>}
          {view === 'entries' && <>每个元素是 A 的行与 B 的列做点积：(AB)₁₁ = 1·1+2·0+3·1 = {AB[0][0]}。</>}
          {view === 'outer' && <>AB = Σ A 的列 × B 的行：第一项 a₁·row₁(B) = [[1,0],[4,0]]，逐项求和得到 AB。</>}
        </div>

        <div className="matrix-group">
          <div>
            <div className="matrix-caption">C（独立列，秩 {cr.rank}）</div>
            {cr.C ? <Matrix data={cr.C} /> : <span>—</span>}
          </div>
          <div>
            <div className="matrix-caption">R（列依赖关系）</div>
            {cr.R ? <Matrix data={cr.R} /> : <span>—</span>}
          </div>
          <div className="status-line">
            {cr.rank === 2 ? 'A 的秩为 2，前两列独立，R 记录第三列的系数。' : 'A 的秩为 1，所有列共线。'}
          </div>
        </div>
      </div>
    </div>
  )
}

