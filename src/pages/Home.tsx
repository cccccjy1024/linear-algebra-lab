import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { chapters } from '../content/chapters'

const highlightLabs = [
  { id: '1-1', label: '01 · 向量组合', title: '线性组合工作台', desc: '拖动系数，观察两个向量张成直线还是平面。' },
  { id: '1-2', label: '02 · 点积', title: '点积与角度观察器', desc: '改变向量，看长度、夹角与投影联动。' },
  { id: '1-4', label: '03 · 矩阵乘法', title: '矩阵乘法与 CR', desc: '用四种视角理解 AB，并查看 A=CR。' },
  { id: '2-1', label: '04 · 消元', title: '消元与回代工作台', desc: '逐步把 Ax=b 变成上三角并回代求解。' }
]

const kindTag = { knowledge: '知识', ai: 'AI 应用', engineering: '工科应用' }

export default function Home() {
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="edition-label">
              <span>INTERACTIVE EDITION</span>
              <span>2026 · 08</span>
            </div>
            <h1>不是记住<br /><em>公式的名字</em>，<br />而是理解它<br />为何能够计算。</h1>
            <p>以章节为模块学习线性代数：每一章都按“知识 → AI 应用 → 工科应用”组织，让公式在真实场景中落地。</p>
            <div className="hero-actions">
              <Link className="button large" to="/learn/1-1">开始第 1 章 <ArrowRight size={18} /></Link>
              <Link className="button secondary" to="/learn">查看章节地图</Link>
            </div>
            <div className="hero-meta">2 章 · 8 个知识模块 · 6 个应用案例 · 全部本地运行</div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <svg viewBox="0 0 420 280" width="420" height="280">
              <rect width="420" height="280" fill="#fbf8f0" />
              <line x1="30" y1="140" x2="390" y2="140" stroke="#193044" strokeOpacity="0.35" strokeWidth="1.5" />
              <line x1="210" y1="30" x2="210" y2="250" stroke="#193044" strokeOpacity="0.35" strokeWidth="1.5" />
              <g transform="translate(210,140)">
                <line x1="0" y1="0" x2="90" y2="-70" stroke="#245d80" strokeWidth="4" />
                <line x1="0" y1="0" x2="-50" y2="-80" stroke="#3f7565" strokeWidth="4" />
                <line x1="0" y1="0" x2="110" y2="-35" stroke="#e56b35" strokeWidth="4" />
                <circle cx="110" cy="-35" r="6" fill="#193044" stroke="#fff" strokeWidth="2" />
                <text x="96" y="-52" fill="#245d80" fontFamily="serif" fontWeight="700" fontSize="16">v</text>
                <text x="-66" y="-88" fill="#3f7565" fontFamily="serif" fontWeight="700" fontSize="16">w</text>
                <text x="118" y="-42" fill="#e56b35" fontFamily="serif" fontWeight="700" fontSize="16">cv+dw</text>
              </g>
              <text x="20" y="24" fill="#e56b35" fontSize="10" letterSpacing="2">LINEAR COMBINATION</text>
            </svg>
          </div>
        </div>
      </section>

      <section className="course-section" style={{ background: '#ece7da', borderBlock: '1px solid var(--line)' }}>
        <div className="section-wrap">
          <header className="section-heading">
            <div>
              <span className="eyebrow">CHAPTER MODULES</span>
              <h2>按章节融合知识与应用</h2>
            </div>
            <p>每一章按照“知识 → AI 应用 → 工科应用”的顺序推进，不再把应用割裂成孤立页面。</p>
          </header>
          <div className="course-atlas">
            {chapters.map((ch) => (
              <Link className="chapter-card" key={ch.id} to={`/learn/${ch.sections[0].id}`}>
                <span className="chapter-kicker">CHAPTER {String(ch.number).padStart(2, '0')}</span>
                <h3>{ch.title}</h3>
                <p>{ch.description}</p>
                <div className="meta">
                  <span className="tag tag-knowledge">{ch.sections.length} 个知识模块</span>
                  <span className="tag tag-ai">{ch.sections.reduce((n, s) => n + (s.applications?.filter((a) => a.kind === 'ai').length ?? 0), 0)} 个 AI 应用</span>
                  <span className="tag tag-engineering">{ch.sections.reduce((n, s) => n + (s.applications?.filter((a) => a.kind === 'engineering').length ?? 0), 0)} 个工科应用</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap" style={{ padding: '70px 0' }}>
        <header className="section-heading">
          <div>
            <span className="eyebrow">LEARN BY MOVING</span>
            <h2>把公式变成可以推动的东西</h2>
          </div>
          <p>改变参数，观察系统怎样响应。所有计算都在浏览器本地完成。</p>
        </header>
        <div className="lab-grid">
          {highlightLabs.map((lab) => (
            <Link className="lab-card" key={lab.id} to={`/learn/${lab.id}`}>
              <span>{lab.label}</span>
              <h3>{lab.title}</h3>
              <p>{lab.desc}</p>
              <strong>进入模块 <ArrowRight size={14} /></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="closing-quote section-wrap">
        <Sparkles size={28} />
        <blockquote>“理解线性代数，不是背公式；而是看清矩阵怎样组合向量、消元怎样求解系统，以及这些结构如何被 AI 与工程应用验证。”</blockquote>
        <div style={{ minWidth: 120 }} />
      </section>
    </>
  )
}
