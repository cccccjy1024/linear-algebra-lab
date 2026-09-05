import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Bookmark, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { chapters, allSections, getSection, getChapterBySection } from '../content/chapters'
import MathTex from '../components/MathTex'
import QuizBlock from '../components/QuizBlock'
import LinearComboLab from '../components/interactive/LinearComboLab'
import DotProductLab from '../components/interactive/DotProductLab'
import ColumnSpaceLab from '../components/interactive/ColumnSpaceLab'
import MatrixMultiplyLab from '../components/interactive/MatrixMultiplyLab'
import EliminationLab from '../components/interactive/EliminationLab'
import InverseLab from '../components/interactive/InverseLab'
import LULab from '../components/interactive/LULab'
import PermutationLab from '../components/interactive/PermutationLab'
import EmbeddingDemo from '../components/interactive/EmbeddingDemo'
import LayerDemo from '../components/interactive/LayerDemo'
import ForceDemo from '../components/interactive/ForceDemo'
import LinearFitDemo from '../components/interactive/LinearFitDemo'
import CircuitDemo from '../components/interactive/CircuitDemo'
import TrafficFlowDemo from '../components/interactive/TrafficFlowDemo'
import { MatrixSpacesLab, ProjectionLab, LeastSquaresLab, GramSchmidtLab, DeterminantLab, EigenLab, DiffeqLab, SVDLab, ChangeBasisLab, MinimizeLab, GradientDescentLab, LagrangeLab, LPLab, PiecewiseLab, ExperimentLab, CovarianceLab } from '../components/interactive/AdvancedLabs'
import { loadProgress, markComplete, unmarkComplete, toggleBookmark } from '../lib/progress'

const interactions: Record<string, () => JSX.Element> = {
  'linear-combo': LinearComboLab,
  'dot-product': DotProductLab,
  'column-space': ColumnSpaceLab,
  'matrix-multiply': MatrixMultiplyLab,
  elimination: EliminationLab,
  inverse: InverseLab,
  lu: LULab,
  permutation: PermutationLab,
  embedding: EmbeddingDemo,
  layer: LayerDemo,
  force: ForceDemo,
  'linear-fit': LinearFitDemo,
  circuit: CircuitDemo,
  traffic: TrafficFlowDemo,
  'matrix-spaces': MatrixSpacesLab,
  projection: ProjectionLab,
  'least-squares': LeastSquaresLab,
  'gram-schmidt': GramSchmidtLab,
  determinant: DeterminantLab,
  eigen: EigenLab,
  diffeq: DiffeqLab,
  'qr-eigen': EigenLab,
  svd: SVDLab,
  'linear-map': LayerDemo,
  'change-basis': ChangeBasisLab,
  minimize: MinimizeLab,
  'gradient-descent': GradientDescentLab,
  lagrange: LagrangeLab,
  lp: LPLab,
  piecewise: PiecewiseLab,
  experiment: ExperimentLab,
  covariance: CovarianceLab
}

const kindLabels = { knowledge: '知识', ai: 'AI 应用', engineering: '工科应用' }

export default function Lesson() {
  const { sectionId = '1-1' } = useParams()
  const section = getSection(sectionId)
  const chapter = getChapterBySection(sectionId)
  const [progress, setProgress] = useState(() => loadProgress())

  useEffect(() => {
    setProgress(loadProgress())
  }, [sectionId])

  if (!section || !chapter) {
    return <div className="section-wrap not-found"><h1>未找到该小节</h1><Link to="/learn">返回课程地图</Link></div>
  }

  const Interaction = section.interaction ? interactions[section.interaction] : undefined
  const index = allSections.findIndex((s) => s.id === section.id)
  const prev = allSections[index - 1]
  const next = allSections[index + 1]
  const completed = progress.completedSections.includes(section.id)
  const bookmarked = progress.bookmarks.includes(section.id)
  const total = allSections.length
  const doneCount = progress.completedSections.length

  const refresh = () => setProgress(loadProgress())

  return (
    <div className="section-wrap" style={{ padding: '40px 0 80px' }}>
      <div className="lesson-shell">
        <aside className="lesson-sidebar">
          <span className="side-title">章节模块 · {doneCount}/{total} 完成</span>
          <nav>
            {chapters.map((ch) => (
              <div key={ch.id}>
                <div className="side-title" style={{ margin: '12px 0 4px', color: 'var(--muted)' }}>第 {ch.number} 章 {ch.title}</div>
                {ch.sections.map((s) => (
                  <Link key={s.id} to={`/learn/${s.id}`} className={s.id === section.id ? 'active' : ''}>
                    <span className={progress.completedSections.includes(s.id) ? 'done' : ''}>
                      {progress.completedSections.includes(s.id) ? '✓ ' : ''}
                      {s.number} {s.title}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <div className="progress"><i style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }} /></div>
        </aside>

        <article className="lesson-article">
          <header className="lesson-header">
            <span className="eyebrow">CHAPTER {String(chapter.number).padStart(2, '0')} · {section.number} · {kindLabels[section.kind]}</span>
            <h1>{section.title}</h1>
            <div className="meta">{section.minutes} 分钟 · {section.prerequisites ?? section.description}</div>
            <div className="actions">
              <button className={`button ${completed ? 'secondary' : ''}`} onClick={() => { if (completed) unmarkComplete(section.id); else markComplete(section.id); refresh() }}>
                <CheckCircle2 size={16} /> {completed ? '取消标记' : '标记完成'}
              </button>
              <button className="button secondary" onClick={() => { toggleBookmark(section.id); refresh() }}>
                <Bookmark size={16} /> {bookmarked ? '已加入书签' : '加入书签'}
              </button>
            </div>
          </header>

          {section.kind === 'knowledge' && (
            <>
              {(section.memoryHook || section.rigorousNote) && (
                <div className="block">
                  <div className="block-title">记忆点 + 严谨说明</div>
                  <div className="memory-grid">
                    {section.memoryHook && (
                      <div className="memory-card">
                        <span className="memory-label">直觉记忆</span>
                        <p>{section.memoryHook}</p>
                      </div>
                    )}
                    {section.rigorousNote && (
                      <div className="memory-card rigor">
                        <span className="memory-label">严谨说明</span>
                        <p>{section.rigorousNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(section.metaphor || section.aiExample || section.experiment) && (
                <div className="block">
                  <div className="block-title">由浅入深</div>
                  <div className="memory-grid">
                    {section.metaphor && (
                      <div className="memory-card">
                        <span className="memory-label">生活比喻 · {section.metaphor.title}</span>
                        <p>{section.metaphor.body}</p>
                      </div>
                    )}
                    {section.aiExample && (
                      <div className="memory-card rigor">
                        <span className="memory-label">AI 例子 · {section.aiExample.title}</span>
                        <p>{section.aiExample.body}</p>
                        {section.aiExample.formula && <MathTex tex={section.aiExample.formula} display />}
                      </div>
                    )}
                  </div>
                  {section.experiment && (
                    <div className="status-line" style={{ marginTop: 12 }}>
                      <strong>实验式学习：</strong>先从“{section.experiment.start}”开始，再“{section.experiment.adjust}”，最后“{section.experiment.observe}”。
                    </div>
                  )}
                </div>
              )}

              {section.objectives && (
                <div className="block">
                  <div className="block-title">学习目标</div>
                  <ul className="objective-list">
                    {section.objectives.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </div>
              )}

              {section.concepts && (
                <div className="block">
                  <div className="block-title">核心概念</div>
                  {section.concepts.map((c) => (
                    <div key={c.title}>
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                      {c.formula && <MathTex tex={c.formula} display />}
                    </div>
                  ))}
                </div>
              )}

              {section.workedExample && (
                <div className="block">
                  <div className="block-title">精选例题 · {section.workedExample.source}</div>
                  <h3>{section.workedExample.title}</h3>
                  <p>{section.workedExample.prompt}</p>
                  {section.workedExample.steps.map((step, i) => (
                    <div className="step" key={i}>
                      <h4>{i + 1}. {step.title}</h4>
                      <p>{step.body}</p>
                      {step.formula && <MathTex tex={step.formula} display />}
                    </div>
                  ))}
                  <div className="status-line">答案：{section.workedExample.answer}</div>
                </div>
              )}
            </>
          )}

          {section.kind !== 'knowledge' && (
            <div className="block">
              <div className="block-title">本章应用场景</div>
              <p>{section.description}</p>
            </div>
          )}

          {Interaction && <Interaction />}

          {section.kind === 'knowledge' && section.applications && section.applications.map((app) => {
            const AppInteraction = interactions[app.interaction]
            return (
              <div key={app.id}>
                <div className="block">
                  <div className="block-title">{app.kind === 'ai' ? 'AI 应用连接' : '工科应用连接'}</div>
                  <h3>{app.title}</h3>
                  <p>{app.description}</p>
                </div>
                {AppInteraction && <AppInteraction />}
                <div className="status-line"><strong>应用要点：</strong>{app.keyTakeaway}</div>
              </div>
            )
          })}

          {section.kind === 'knowledge' && section.quiz && (
            <QuizBlock key={section.id} sectionId={section.id} questions={section.quiz} />
          )}

          <div className="key-takeaway">
            <strong>关键认识：</strong>{section.keyTakeaway}
          </div>

          <div className="next-prev">
            {prev ? (
              <Link to={`/learn/${prev.id}`}>
                <span className="dir"><ChevronLeft size={12} /> 上一模块</span>
                <span className="title">{prev.number} {prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/learn/${next.id}`} style={{ textAlign: 'right' }}>
                <span className="dir">下一模块 <ChevronRight size={12} /></span>
                <span className="title">{next.number} {next.title}</span>
              </Link>
            ) : <span />}
          </div>
        </article>
      </div>
    </div>
  )
}
