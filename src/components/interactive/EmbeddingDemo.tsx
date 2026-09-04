import { useMemo, useState } from 'react'
import VectorCanvas from './VectorCanvas'
import { cosine, fmt } from '../../lib/matrix'

const words = [
  { name: '猫', v: [3, 1] },
  { name: '狗', v: [2.5, 1.5] },
  { name: '汽车', v: [-1, 3] },
  { name: '香蕉', v: [-2, -1] },
  { name: 'AI', v: [2, 2.5] }
]

export default function EmbeddingDemo() {
  const [a, setA] = useState([3, 1])
  const [b, setB] = useState([2.5, 1.5])
  const [word, setWord] = useState('猫')
  const sim = useMemo(() => cosine(a, b), [a, b])

  const pick = (name: string) => {
    const found = words.find((w) => w.name === name)
    if (found) setA(found.v)
  }

  return (
    <div className="interactive-panel">
      <div className="panel-head">
        <div>
          <h3>向量相似度与 Embedding</h3>
          <p>词义相近的向量方向相近；拖动向量观察余弦相似度的变化。</p>
        </div>
      </div>
      <div className="panel-body">
        <div className="control-row">
          <label className="control">
            <span>选择词 A</span>
            <select className="control" value={word} onChange={(e) => { setWord(e.target.value); pick(e.target.value) }}>
              {words.map((w) => <option key={w.name} value={w.name}>{w.name}</option>)}
            </select>
          </label>
          <label className="control">
            <span>向量 a = ({a.join(', ')})</span>
            <span>a₁ <input type="range" min={-4} max={4} step={0.1} value={a[0]} onChange={(e) => setA([Number(e.target.value), a[1]])} /></span>
            <span>a₂ <input type="range" min={-4} max={4} step={0.1} value={a[1]} onChange={(e) => setA([a[0], Number(e.target.value)])} /></span>
          </label>
          <label className="control">
            <span>向量 b = ({b.join(', ')})</span>
            <span>b₁ <input type="range" min={-4} max={4} step={0.1} value={b[0]} onChange={(e) => setB([Number(e.target.value), b[1]])} /></span>
            <span>b₂ <input type="range" min={-4} max={4} step={0.1} value={b[1]} onChange={(e) => setB([b[0], Number(e.target.value)])} /></span>
          </label>
        </div>
        <VectorCanvas arrows={[{ x: a[0], y: a[1], color: '#245d80', label: 'a' }, { x: b[0], y: b[1], color: '#3f7565', label: 'b' }]} />
        <div className="readout">
          <div className="stat"><span>余弦相似度</span><strong>{fmt(sim)}</strong></div>
          <div className="stat"><span>夹角</span><strong>{fmt(Math.acos(Math.max(-1, Math.min(1, sim))) * 180 / Math.PI, 1)}°</strong></div>
          <div className="stat"><span>含义</span><strong>{sim > 0.5 ? '方向接近' : sim < -0.5 ? '方向相反' : '接近垂直'}</strong></div>
        </div>
        <div className="status-line">AI 中把词、图、用户都表示成向量；点积/余弦相似度用于检索、推荐与注意力机制。</div>
      </div>
    </div>
  )
}
