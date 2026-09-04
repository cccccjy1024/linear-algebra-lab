import CircuitDemo from '../components/interactive/CircuitDemo'
import TrafficFlowDemo from '../components/interactive/TrafficFlowDemo'

export default function Engineering() {
  return (
    <>
      <section className="page-hero section-wrap">
        <span className="eyebrow">LINEAR ALGEBRA IN ENGINEERING</span>
        <h1>在工科方面的应用</h1>
        <p>工科问题常被写成一个线性方程组 Ax=b。先通过电路与交通流网络，体验消元法如何直接给出工程答案。</p>
      </section>
      <section className="section-wrap" style={{ padding: '50px 0 40px' }}>
        <div className="demo-stack">
          <CircuitDemo />
          <TrafficFlowDemo />
        </div>
      </section>
      <section className="section-wrap" style={{ padding: '0 0 80px' }}>
        <header className="section-heading">
          <div>
            <span className="eyebrow">COMING NEXT</span>
            <h2>后续工程主题预告</h2>
          </div>
          <p>后续章节解锁：结构受力平衡、质量/能量平衡、图像压缩与低秩近似。</p>
        </header>
        <div className="placeholder-grid">
          {['桁架结构受力平衡', '质量与能量平衡', '图像压缩低秩近似', '控制系统状态方程'].map((t) => (
            <div className="placeholder-card" key={t}><strong>{t}</strong><span>待后续章节解锁</span></div>
          ))}
        </div>
      </section>
    </>
  )
}
