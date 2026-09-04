import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="section-wrap not-found">
      <span className="eyebrow">404</span>
      <h1>页面不存在</h1>
      <p>你要找的页面可能已经移动或尚未上线。</p>
      <Link className="button" to="/">返回首页</Link>
    </div>
  )
}
