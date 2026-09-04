import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { chapters } from '../content/chapters'

const kindLabels = { knowledge: '知识', ai: 'AI 应用', engineering: '工科应用' }

export default function Learn() {
  return (
    <>
      <section className="page-hero section-wrap">
        <span className="eyebrow">CHAPTER MAP</span>
        <h1>线性代数章节模块</h1>
        <p>按《Introduction to Linear Algebra》第6版中文版的顺序学习第 1、2 章；每一章都把 AI 应用与工科应用嵌入到相关知识点之后。</p>
      </section>
      <section className="section-wrap" style={{ padding: '50px 0 80px' }}>
        {chapters.map((ch) => (
          <div key={ch.id} style={{ marginBottom: 50 }}>
            <header className="section-heading">
              <div>
                <span className="eyebrow">CHAPTER {String(ch.number).padStart(2, '0')}</span>
                <h2>{ch.title}</h2>
              </div>
              <p>{ch.subtitle}</p>
            </header>
            <div className="course-atlas">
              {ch.sections.map((s) => (
                <Link className={`chapter-card card-${s.kind}`} key={s.id} to={`/learn/${s.id}`}>
                  <span className="chapter-kicker">{s.number} · {kindLabels[s.kind]}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <div className="meta">
                    <span className="tag">{s.minutes} 分钟</span>
                    <span className="tag">1 个互动</span>
                    <span className="tag">3 道自测</span>
                    {s.applications && s.applications.length > 0 && (
                      <span className="tag">{s.applications.length} 个应用案例</span>
                    )}
                  </div>
                  <span className="arrow-link" style={{ marginTop: 14, color: 'var(--blue)', fontWeight: 700 }}>进入模块 <ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
