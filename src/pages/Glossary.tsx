import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { glossary } from '../content/glossary'

export default function Glossary() {
  return (
    <>
      <section className="page-hero section-wrap">
        <span className="eyebrow">CONCEPT INDEX</span>
        <h1>核心术语速查</h1>
        <p>先抓住概念在系统中的作用，再记住它的名字。</p>
        <div className="btn-row" style={{ marginTop: 18 }}>
          <Link className="button secondary" to="/learn">
            <ArrowLeft size={16} /> 返回课程地图
          </Link>
          <Link className="button secondary" to="/">
            <Home size={16} /> 返回首页
          </Link>
        </div>
      </section>
      <section className="section-wrap" style={{ padding: '40px 0 80px' }}>
        <div className="glossary-grid">
          {glossary.map((g) => (
            <div className="glossary-card" key={g.term}>
              <h3>{g.term}</h3>
              <span className="en">{g.en}</span>
              <p>{g.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
