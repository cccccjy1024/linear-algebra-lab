import { useState } from 'react'
import type { QuizQuestion } from '../content/types'
import MathTex from './MathTex'
import { recordQuiz } from '../lib/progress'

export default function QuizBlock({ sectionId, questions }: { sectionId: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [score, setScore] = useState<{ score: number; total: number } | null>(null)

  const allAnswered = questions.every((q) => answers[q.id] !== undefined)

  const submit = () => {
    const next: Record<string, boolean> = {}
    let sc = 0
    for (const q of questions) {
      const ans = answers[q.id]
      const ok = q.type === 'numeric'
        ? Math.abs(Number(ans) - Number(q.correct)) < (q.tolerance ?? 1e-6)
        : String(ans) === String(q.correct)
      if (ok) sc += 1
      next[q.id] = true
    }
    setSubmitted(next)
    const total = questions.length
    setScore({ score: sc, total })
    recordQuiz(sectionId, sc, total)
    window.dispatchEvent(new Event('la-progress'))
  }

  const reset = () => {
    setAnswers({})
    setSubmitted({})
    setScore(null)
  }

  return (
    <div className="block">
      <div className="block-title">随堂检验</div>
      {questions.map((q, qi) => {
        const submittedQ = submitted[q.id]
        const ans = answers[q.id]
        const ok = q.type === 'numeric'
          ? Math.abs(Number(ans) - Number(q.correct)) < (q.tolerance ?? 1e-6)
          : String(ans) === String(q.correct)
        return (
          <div key={q.id} style={{ marginBottom: 22 }}>
            <h3>{qi + 1}. <MathTex tex={q.prompt} /></h3>
            {q.type === 'single' && q.options && (
              <div>
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`quiz-option${answers[q.id] === i ? ' selected' : ''}${submittedQ && ok && String(q.correct) === String(i) ? ' correct' : ''}${submittedQ && answers[q.id] === i && !ok ? ' wrong' : ''}`}
                    onClick={() => !submittedQ && setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                    disabled={submittedQ}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
            )}
            {q.type === 'judge' && (
              <div>
                {['true', 'false'].map((opt) => (
                  <button
                    key={opt}
                    className={`quiz-option${answers[q.id] === opt ? ' selected' : ''}${submittedQ && String(q.correct) === opt ? ' correct' : ''}${submittedQ && answers[q.id] === opt && !ok ? ' wrong' : ''}`}
                    onClick={() => !submittedQ && setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                    disabled={submittedQ}
                  >
                    {opt === 'true' ? '正确' : '错误'}
                  </button>
                ))}
              </div>
            )}
            {q.type === 'numeric' && (
              <input
                className="quiz-input"
                type="number"
                value={ans ?? ''}
                disabled={submittedQ}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: Number(e.target.value) }))}
              />
            )}
            {submittedQ && (
              <div className={`quiz-feedback ${ok ? 'good' : 'bad'}`}>
                {ok ? '✓ 正确。' : `✗ 正确答案：${q.correct}。`} {q.explanation}
              </div>
            )}
          </div>
        )
      })}
      <div className="btn-row">
        {!score ? (
          <button className="button" onClick={submit} disabled={!allAnswered}>提交检验</button>
        ) : (
          <>
            <div className="status-line">得分：{score.score}/{score.total}</div>
            <button className="button secondary" onClick={reset}>重新作答</button>
          </>
        )}
      </div>
    </div>
  )
}
