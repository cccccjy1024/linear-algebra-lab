import EmbeddingDemo from '../components/interactive/EmbeddingDemo'
import LayerDemo from '../components/interactive/LayerDemo'

export default function AI() {
  return (
    <>
      <section className="page-hero section-wrap">
        <span className="eyebrow">LINEAR ALGEBRA IN AI</span>
        <h1>线性代数在人工智能中的应用</h1>
        <p>先从两个能动手的例子建立直觉：向量相似度与 Embedding，以及神经网络单层的矩阵乘法 Wx+b。</p>
      </section>
      <section className="section-wrap" style={{ padding: '50px 0 40px' }}>
        <div className="demo-stack">
          <EmbeddingDemo />
          <LayerDemo />
        </div>
      </section>
      <section className="section-wrap" style={{ padding: '0 0 80px' }}>
        <header className="section-heading">
          <div>
            <span className="eyebrow">COMING NEXT</span>
            <h2>后续章节预告</h2>
          </div>
          <p>这些主题将在掌握后续章节后逐步加入：最小二乘回归、PCA/SVD、注意力机制与图像卷积。</p>
        </header>
        <div className="placeholder-grid">
          {['线性回归与最小二乘', '主成分分析 PCA', '奇异值分解 SVD', '卷积与图像特征'].map((t) => (
            <div className="placeholder-card" key={t}><strong>{t}</strong><span>待第 3—7 章知识解锁</span></div>
          ))}
        </div>
      </section>
    </>
  )
}
