import { useMemo, useState } from 'react'
import { fmt, matMul, matVec, transpose, dot, norm, solveLinear, identity } from '../../lib/matrix'
import VectorCanvas from './VectorCanvas'

function MatrixView({ data }: { data: number[][] }) {
  return (
    <span className="matrix-display" style={{ gridTemplateColumns: `repeat(${data[0].length}, 46px)` }}>
      {data.map((row, i) => row.map((v, j) => <span key={`${i}-${j}`} className="cell">{fmt(v)}</span>))}
    </span>
  )
}

export function MatrixSpacesLab() {
  const [A, setA] = useState([[1, 2, 3], [4, 5, 6]])
  const cols = [0, 1, 2].map((j) => [A[0][j], A[1][j]])
  const pair = (i: number, j: number) => cols[i][0] * cols[j][1] - cols[i][1] * cols[j][0]
  const rank = Math.abs(pair(0, 1)) > 1e-9 || Math.abs(pair(0, 2)) > 1e-9 || Math.abs(pair(1, 2)) > 1e-9 ? 2 : (cols.some((c) => c[0] || c[1]) ? 1 : 0)
  const nullity = 3 - rank
  const rowRank = rank
  const setCell = (i: number, j: number, val: number) => setA((p) => p.map((r, ri) => ri === i ? r.map((c, ci) => ci === j ? val : c) : r))
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>四个基本子空间速览</h3><p>编辑 2×3 矩阵，观察秩与零空间维数。</p></div></div>
      <div className="panel-body">
        <div className="matrix-input" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 58px)', gap: 4 }}>
          {cols.map((_, j) => (
            <div key={j} style={{ display: 'grid', gap: 4 }}>
              <input type="number" value={A[0][j]} onChange={(e) => setCell(0, j, Number(e.target.value))} />
              <input type="number" value={A[1][j]} onChange={(e) => setCell(1, j, Number(e.target.value))} />
            </div>
          ))}
        </div>
        <div className="readout">
          <div className="stat"><span>C(A) 维数</span><strong>{rank}</strong></div>
          <div className="stat"><span>C(Aᵀ) 维数</span><strong>{rowRank}</strong></div>
          <div className="stat"><span>N(A) 维数</span><strong>{nullity}</strong></div>
          <div className="stat"><span>N(Aᵀ) 维数</span><strong>{2 - rowRank}</strong></div>
        </div>
        <div className="status-line">m=2, n=3, r={rank}；N(A) 维数 n-r={nullity}，N(Aᵀ) 维数 m-r={2 - rowRank}。</div>
      </div>
    </div>
  )
}

export function ProjectionLab() {
  const [a, setA] = useState([2, 1])
  const [b, setB] = useState([1, 3])
  const coeff = useMemo(() => {
    const aa = dot(a, a)
    return aa === 0 ? 0 : dot(b, a) / aa
  }, [a, b])
  const p = a.map((x) => x * coeff)
  const e = b.map((x, i) => x - p[i])
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>向直线作正交投影</h3><p>改变方向 a 和点 b，观察投影 p 与误差 e=b-p。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>a₁</span><input type="range" min={-4} max={4} step={0.2} value={a[0]} onChange={(e) => setA([Number(e.target.value), a[1]])} /></label>
          <label className="control"><span>a₂</span><input type="range" min={-4} max={4} step={0.2} value={a[1]} onChange={(e) => setA([a[0], Number(e.target.value)])} /></label>
          <label className="control"><span>b₁</span><input type="range" min={-4} max={4} step={0.2} value={b[0]} onChange={(e) => setB([Number(e.target.value), b[1]])} /></label>
          <label className="control"><span>b₂</span><input type="range" min={-4} max={4} step={0.2} value={b[1]} onChange={(e) => setB([b[0], Number(e.target.value)])} /></label>
        </div>
        <VectorCanvas arrows={[{ x: a[0], y: a[1], color: '#2563eb', label: 'a' }, { x: b[0], y: b[1], color: '#0f172a', label: 'b' }, { x: p[0], y: p[1], color: '#e56b35', label: 'p' }, { x: e[0], y: e[1], color: '#059669', label: 'e', dash: true }]} />
        <div className="status-line">投影 p = ({fmt(p[0])}, {fmt(p[1])})；误差 e = b-p = ({fmt(e[0])}, {fmt(e[1])})；e·a = {fmt(dot(e, a))}。</div>
      </div>
    </div>
  )
}

export function LeastSquaresLab() {
  const [pts, setPts] = useState([[0, 0.5], [1, 2], [2, 3]])
  const A = pts.map((p) => [p[0], 1])
  const b = pts.map((p) => p[1])
  const sol = useMemo(() => solveLinear(matMul(transpose(A), A), matVec(transpose(A), b)), [pts])
  const lineY = (x: number) => (sol ? sol[0] * x + sol[1] : 0)
  const setPoint = (i: number, j: number, val: number) => setPts((p) => p.map((q, qi) => qi === i ? q.map((v, vi) => vi === j ? val : v) : q))
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>最小二乘直线拟合</h3><p>拖动三个点，观察正规方程给出的最佳直线。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          {pts.map((p, i) => (
            <div key={i} className="control">
              <span>点{i + 1} x={p[0]}</span>
              <input type="range" min={-3} max={6} step={0.2} value={p[0]} onChange={(e) => setPoint(i, 0, Number(e.target.value))} />
              <span>y={fmt(p[1])}</span>
              <input type="range" min={-3} max={6} step={0.2} value={p[1]} onChange={(e) => setPoint(i, 1, Number(e.target.value))} />
            </div>
          ))}
        </div>
        <svg viewBox="0 0 420 260" className="vector-canvas">
          <rect width={420} height={260} fill="#fff" />
          {Array.from({ length: 9 }, (_, i) => i - 3).map((g) => <line key={`v${g}`} x1={(g + 3) * 52} y1={0} x2={(g + 3) * 52} y2={260} stroke="#0f172a" strokeOpacity={0.06} />)}
          {Array.from({ length: 9 }, (_, i) => i - 3).map((g) => <line key={`h${g}`} x1={0} y1={(3 - g) * 52} x2={420} y2={(3 - g) * 52} stroke="#0f172a" strokeOpacity={0.06} />)}
          {sol && <line x1={0} y1={260 - ((lineY(-3) + 3) / 6) * 260} x2={420} y2={260 - ((lineY(6) + 3) / 6) * 260} stroke="#2563eb" strokeWidth={3} />}
          {pts.map((p, i) => <circle key={i} cx={(p[0] + 3) * 52} cy={260 - ((p[1] + 3) / 6) * 260} r={6} fill={i === 0 ? '#2563eb' : i === 1 ? '#0ea5e9' : '#e56b35'} />)}
        </svg>
        <div className="status-line">{sol ? `拟合直线 y = ${fmt(sol[0])} x + ${fmt(sol[1])}；正规方程 AᵀAx=Aᵀb。` : '点共线导致奇异，无法唯一确定直线。'}</div>
      </div>
    </div>
  )
}

export function GramSchmidtLab() {
  const [u, setU] = useState([2, 1])
  const [v, setV] = useState([1, 2])
  const q1 = useMemo(() => {
    const n = norm(u)
    return n === 0 ? [1, 0] : u.map((x) => x / n)
  }, [u])
  const q2 = useMemo(() => {
    const proj = q1.map((x) => x * dot(v, q1))
    const w = v.map((x, i) => x - proj[i])
    const n = norm(w)
    return n === 0 ? [0, 0] : w.map((x) => x / n)
  }, [v, q1])
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>Gram-Schmidt 正交化</h3><p>从 u、v 得到标准正交基 q₁、q₂。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>u = ({u.join(', ')})</span><input type="range" min={-4} max={4} step={0.2} value={u[0]} onChange={(e) => setU([Number(e.target.value), u[1]])} /><input type="range" min={-4} max={4} step={0.2} value={u[1]} onChange={(e) => setU([u[0], Number(e.target.value)])} /></label>
          <label className="control"><span>v = ({v.join(', ')})</span><input type="range" min={-4} max={4} step={0.2} value={v[0]} onChange={(e) => setV([Number(e.target.value), v[1]])} /><input type="range" min={-4} max={4} step={0.2} value={v[1]} onChange={(e) => setV([v[0], Number(e.target.value)])} /></label>
        </div>
        <VectorCanvas arrows={[{ x: u[0], y: u[1], color: '#2563eb', label: 'u' }, { x: v[0], y: v[1], color: '#e56b35', label: 'v' }, { x: q1[0], y: q1[1], color: '#059669', label: 'q₁' }, { x: q2[0], y: q2[1], color: '#7c3aed', label: 'q₂' }]} />
        <div className="readout">
          <div className="stat"><span>q₁·q₂</span><strong>{fmt(dot(q1, q2))}</strong></div>
          <div className="stat"><span>|q₁|</span><strong>{fmt(norm(q1))}</strong></div>
          <div className="stat"><span>|q₂|</span><strong>{fmt(norm(q2))}</strong></div>
        </div>
      </div>
    </div>
  )
}

export function DeterminantLab() {
  const [A, setA] = useState([[2, 1], [0, 3]])
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0]
  const setCell = (i: number, j: number, val: number) => setA((p) => p.map((r, ri) => ri === i ? r.map((c, ci) => ci === j ? val : c) : r))
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>行列式与面积</h3><p>编辑 2×2 矩阵，观察行列式和列向量张成的平行四边形面积。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <div className="matrix-input" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 58px)', gap: 4 }}>
            {[0, 1].map((j) => <div key={j} style={{ display: 'grid', gap: 4 }}><input type="number" value={A[0][j]} onChange={(e) => setCell(0, j, Number(e.target.value))} /><input type="number" value={A[1][j]} onChange={(e) => setCell(1, j, Number(e.target.value))} /></div>)}
          </div>
        </div>
        <VectorCanvas arrows={[{ x: A[0][0], y: A[1][0], color: '#2563eb', label: 'a₁' }, { x: A[0][1], y: A[1][1], color: '#e56b35', label: 'a₂' }]} />
        <div className="readout">
          <div className="stat"><span>det A</span><strong>{fmt(det)}</strong></div>
          <div className="stat"><span>面积</span><strong>{fmt(Math.abs(det))}</strong></div>
          <div className="stat"><span>可逆性</span><strong>{Math.abs(det) > 1e-9 ? '可逆' : '奇异'}</strong></div>
        </div>
      </div>
    </div>
  )
}

export function EigenLab() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(0.5)
  const [d, setD] = useState(3)
  const tr = a + d
  const det = a * d - b * b
  const disc = Math.sqrt(Math.max(0, tr * tr - 4 * det))
  const l1 = (tr + disc) / 2
  const l2 = (tr - disc) / 2
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>2×2 对称矩阵特征值</h3><p>调节矩阵元素，观察迹、行列式与特征值。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>a = {a}</span><input type="range" min={-4} max={6} step={0.1} value={a} onChange={(e) => setA(Number(e.target.value))} /></label>
          <label className="control"><span>b = {fmt(b)}</span><input type="range" min={-4} max={4} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} /></label>
          <label className="control"><span>d = {d}</span><input type="range" min={-4} max={6} step={0.1} value={d} onChange={(e) => setD(Number(e.target.value))} /></label>
        </div>
        <MatrixView data={[[a, b], [b, d]]} />
        <div className="readout">
          <div className="stat"><span>迹</span><strong>{fmt(tr)}</strong></div>
          <div className="stat"><span>det</span><strong>{fmt(det)}</strong></div>
          <div className="stat"><span>λ₁</span><strong>{fmt(l1)}</strong></div>
          <div className="stat"><span>λ₂</span><strong>{fmt(l2)}</strong></div>
        </div>
        <div className="status-line">det(A-λI)=λ²-({fmt(tr)})λ+({fmt(det)})；特征值 {fmt(l1)} 和 {fmt(l2)}。</div>
      </div>
    </div>
  )
}

export function DiffeqLab() {
  const [l1, setL1] = useState(-0.5)
  const [l2, setL2] = useState(-1.5)
  const curve = (l: number) => Array.from({ length: 60 }, (_, i) => {
    const t = i / 10
    return { x: t, y: Math.exp(l * t) }
  })
  const svgX = (x: number) => (x / 6) * 420
  const svgY = (y: number) => 260 - ((y + 0.2) / 1.2) * 260
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>微分方程模态</h3><p>{'观察 e^{λt} 随 λ 的变化。'}</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>λ₁ = {l1}</span><input type="range" min={-3} max={0.5} step={0.1} value={l1} onChange={(e) => setL1(Number(e.target.value))} /></label>
          <label className="control"><span>λ₂ = {l2}</span><input type="range" min={-3} max={0.5} step={0.1} value={l2} onChange={(e) => setL2(Number(e.target.value))} /></label>
        </div>
        <svg viewBox="0 0 420 260" className="vector-canvas">
          <rect width={420} height={260} fill="#fff" />
          <line x1={0} y1={svgY(0)} x2={420} y2={svgY(0)} stroke="#0f172a" strokeOpacity={0.3} />
          <line x1={0} y1={0} x2={0} y2={260} stroke="#0f172a" strokeOpacity={0.3} />
          {curve(l1).map((p, i) => i > 0 ? <line key={`a${i}`} x1={svgX(curve(l1)[i - 1].x)} y1={svgY(curve(l1)[i - 1].y)} x2={svgX(p.x)} y2={svgY(p.y)} stroke="#2563eb" strokeWidth={2} /> : null)}
          {curve(l2).map((p, i) => i > 0 ? <line key={`b${i}`} x1={svgX(curve(l2)[i - 1].x)} y1={svgY(curve(l2)[i - 1].y)} x2={svgX(p.x)} y2={svgY(p.y)} stroke="#e56b35" strokeWidth={2} /> : null)}
        </svg>
        <div className="status-line">{'λ<0 时解衰减到 0；λ>0 时解增长。'}</div>
      </div>
    </div>
  )
}

export function SVDLab() {
  const [A, setA] = useState([[3, 0], [0, 1]])
  const ATA = useMemo(() => matMul(transpose(A), A), [A])
  const tr = ATA[0][0] + ATA[1][1]
  const det = ATA[0][0] * ATA[1][1] - ATA[0][1] * ATA[1][0]
  const disc = Math.sqrt(Math.max(0, tr * tr - 4 * det))
  const s1 = Math.sqrt((tr + disc) / 2)
  const s2 = Math.sqrt(Math.max(0, (tr - disc) / 2))
  const setCell = (i: number, j: number, val: number) => setA((p) => p.map((r, ri) => ri === i ? r.map((c, ci) => ci === j ? val : c) : r))
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>奇异值计算</h3><p>奇异值是 AᵀA 特征值的平方根。</p></div></div>
      <div className="panel-body">
        <div className="matrix-input" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 58px)', gap: 4 }}>
          {[0, 1].map((j) => <div key={j} style={{ display: 'grid', gap: 4 }}><input type="number" value={A[0][j]} onChange={(e) => setCell(0, j, Number(e.target.value))} /><input type="number" value={A[1][j]} onChange={(e) => setCell(1, j, Number(e.target.value))} /></div>)}
        </div>
        <div className="readout">
          <div className="stat"><span>σ₁</span><strong>{fmt(s1)}</strong></div>
          <div className="stat"><span>σ₂</span><strong>{fmt(s2)}</strong></div>
          <div className="stat"><span>AᵀA</span><strong>{fmt(ATA[0][0])}, {fmt(ATA[0][1])} / {fmt(ATA[1][0])}, {fmt(ATA[1][1])}</strong></div>
        </div>
        <div className="status-line">A=UΣVᵀ；奇异值反映矩阵在正交方向上的拉伸倍数。</div>
      </div>
    </div>
  )
}

export function ChangeBasisLab() {
  const [coords, setCoords] = useState([2, 1])
  const v1 = [1, 0.3]
  const v2 = [0.2, 1]
  const x = [v1[0] * coords[0] + v2[0] * coords[1], v1[1] * coords[0] + v2[1] * coords[1]]
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>基变换中的坐标</h3><p>同一向量在不同基下坐标不同。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>坐标 c₁ = {coords[0]}</span><input type="range" min={-4} max={4} step={0.1} value={coords[0]} onChange={(e) => setCoords([Number(e.target.value), coords[1]])} /></label>
          <label className="control"><span>坐标 c₂ = {coords[1]}</span><input type="range" min={-4} max={4} step={0.1} value={coords[1]} onChange={(e) => setCoords([coords[0], Number(e.target.value)])} /></label>
        </div>
        <VectorCanvas arrows={[{ x: v1[0], y: v1[1], color: '#2563eb', label: 'b₁' }, { x: v2[0], y: v2[1], color: '#e56b35', label: 'b₂' }, { x: x[0], y: x[1], color: '#059669', label: 'x' }]} />
        <div className="status-line">在基 {v1[0]},{v1[1]} 与 {v2[0]},{v2[1]} 下，坐标 ({coords[0]},{coords[1]}) 表示向量 ({fmt(x[0])},{fmt(x[1])})。</div>
      </div>
    </div>
  )
}

export function MinimizeLab() {
  const [x, setX] = useState(1)
  const f = (x: number) => (x - 1) ** 2
  const grad = 2 * (x - 1)
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>一维最小化</h3><p>移动 x，观察 f 和梯度。</p></div></div>
      <div className="panel-body">
        <label className="control"><span>x = {fmt(x)}</span><input type="range" min={-2} max={4} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} /></label>
        <div className="readout">
          <div className="stat"><span>f(x)</span><strong>{fmt(f(x))}</strong></div>
          <div className="stat"><span>梯度</span><strong>{fmt(grad)}</strong></div>
        </div>
        <div className="status-line">梯度为 0 处是最小值点；当前梯度 {fmt(grad)}。</div>
      </div>
    </div>
  )
}

export function GradientDescentLab() {
  const [x, setX] = useState(2)
  const [lr, setLr] = useState(0.4)
  const [hist, setHist] = useState<number[]>([])
  const f = (x: number) => x * x
  const grad = 2 * x
  const step = () => {
    setHist((h) => [...h, x])
    setX((x) => x - lr * 2 * x)
  }
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>梯度下降演示</h3><p>对 f(x)=x² 沿负梯度迭代。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>x = {fmt(x)}</span><input type="range" min={-3} max={3} step={0.1} value={x} onChange={(e) => { setX(Number(e.target.value)); setHist([]) }} /></label>
          <label className="control"><span>学习率 η = {lr}</span><input type="range" min={0.05} max={1} step={0.05} value={lr} onChange={(e) => setLr(Number(e.target.value))} /></label>
          <button className="button secondary" onClick={step}>一步</button>
          <button className="button secondary" onClick={() => { setX(2); setHist([]) }}>重置</button>
        </div>
        <div className="status-line">迭代路径：{hist.map((h) => fmt(h)).join(' → ')} → {fmt(x)}；梯度 2x={fmt(grad)}。</div>
      </div>
    </div>
  )
}

export function LagrangeLab() {
  const [c, setC] = useState(1)
  const opt = c / 2
  const f = opt ** 2 + opt ** 2
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>约束最小化</h3><p>在 x+y=c 下最小化 x²+y²。</p></div></div>
      <div className="panel-body">
        <label className="control"><span>约束 c = {fmt(c)}</span><input type="range" min={0} max={4} step={0.1} value={c} onChange={(e) => setC(Number(e.target.value))} /></label>
        <div className="status-line">最优解 x=y={fmt(opt)}，最小值 {fmt(f)}；拉格朗日条件 ∇f=λ∇g。</div>
      </div>
    </div>
  )
}

export function LPLab() {
  const [obj, setObj] = useState(1)
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>线性规划可行域</h3><p>在 x+y≤1, x,y≥0 下最大化 x+y。</p></div></div>
      <div className="panel-body">
        <svg viewBox="0 0 260 220" className="vector-canvas">
          <rect width={260} height={220} fill="#fff" />
          <polygon points="20,20 200,20 20,200" fill="#2563eb" opacity={0.1} stroke="#2563eb" strokeWidth={2} />
          <line x1={20} y1={20 + obj * 0} x2={20} y2={200} stroke="#e56b35" strokeWidth={2} />
        </svg>
        <div className="status-line">可行域是三角形；线性目标在顶点处取得最优值 1。</div>
      </div>
    </div>
  )
}

export function PiecewiseLab() {
  const [x, setX] = useState(0.5)
  const relu = (v: number) => Math.max(0, v)
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>ReLU 分段线性</h3><p>观察 ReLU 在 x=0 处的分段。</p></div></div>
      <div className="panel-body">
        <label className="control"><span>x = {fmt(x)}</span><input type="range" min={-4} max={4} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} /></label>
        <div className="readout">
          <div className="stat"><span>ReLU(x)</span><strong>{fmt(relu(x))}</strong></div>
        </div>
      </div>
    </div>
  )
}

export function ExperimentLab() {
  const [width, setWidth] = useState(4)
  const [lr, setLr] = useState(0.1)
  const train = 1 - 0.12 * lr * 10 - width * 0.02
  const val = train - 0.05
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>网络容量实验</h3><p>调节宽度与学习率，观察训练/验证误差变化。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>宽度 = {width}</span><input type="range" min={1} max={16} step={1} value={width} onChange={(e) => setWidth(Number(e.target.value))} /></label>
          <label className="control"><span>学习率 = {lr}</span><input type="range" min={0.01} max={0.5} step={0.01} value={lr} onChange={(e) => setLr(Number(e.target.value))} /></label>
        </div>
        <div className="readout">
          <div className="stat"><span>训练误差</span><strong>{fmt(train)}</strong></div>
          <div className="stat"><span>验证误差</span><strong>{fmt(val)}</strong></div>
        </div>
        <div className="status-line">宽度越大容量越高；学习率过大可能震荡。</div>
      </div>
    </div>
  )
}

export function CovarianceLab() {
  const [x, setX] = useState([1, 2, 3])
  const [y, setY] = useState([2, 4, 6])
  const meanX = x.reduce((a, b) => a + b, 0) / x.length
  const meanY = y.reduce((a, b) => a + b, 0) / y.length
  const cov = x.reduce((s, xi, i) => s + (xi - meanX) * (y[i] - meanY), 0) / x.length
  const varX = x.reduce((s, xi) => s + (xi - meanX) ** 2, 0) / x.length
  const varY = y.reduce((s, yi) => s + (yi - meanY) ** 2, 0) / y.length
  return (
    <div className="interactive-panel">
      <div className="panel-head"><div><h3>均值、方差与协方差</h3><p>观察数据如何共同变化。</p></div></div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control"><span>x₁</span><input type="number" value={x[0]} onChange={(e) => setX([Number(e.target.value), x[1], x[2]])} /></label>
          <label className="control"><span>x₂</span><input type="number" value={x[1]} onChange={(e) => setX([x[0], Number(e.target.value), x[2]])} /></label>
          <label className="control"><span>x₃</span><input type="number" value={x[2]} onChange={(e) => setX([x[0], x[1], Number(e.target.value)])} /></label>
        </div>
        <div className="readout">
          <div className="stat"><span>均值 x</span><strong>{fmt(meanX)}</strong></div>
          <div className="stat"><span>方差 x</span><strong>{fmt(varX)}</strong></div>
          <div className="stat"><span>协方差</span><strong>{fmt(cov)}</strong></div>
        </div>
        <div className="status-line">协方差为正表示 x、y 同向变化；为负表示反向变化。</div>
      </div>
    </div>
  )
}
