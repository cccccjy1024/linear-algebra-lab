import { useEffect, useState } from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { Home, BookOpen, BookMarked } from 'lucide-react'
import { loadProgress } from '../lib/progress'
import { allSections } from '../content/chapters'

const nav = [
  { to: '/', label: '首页', icon: Home },
  { to: '/learn/1-1', label: '第1章', icon: BookOpen },
  { to: '/learn/2-1', label: '第2章', icon: BookOpen },
  { to: '/glossary', label: '术语表', icon: BookMarked }
]

export default function Layout() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const p = loadProgress()
      const total = allSections.length
      setPct(total ? Math.round((p.completedSections.length / total) * 100) : 0)
    }
    update()
    window.addEventListener('storage', update)
    window.addEventListener('la-progress', update)
    return () => {
      window.removeEventListener('storage', update)
      window.removeEventListener('la-progress', update)
    }
  }, [])

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">线</span>
          <span>
            <strong>线性代数</strong>
            <small>INTERACTIVE LINEAR ALGEBRA LAB</small>
          </span>
        </Link>
        <nav aria-label="主导航">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <span className="header-signal" aria-label="学习进度保存在本地">
            <i />
            LOCAL MEMORY · {pct}%
          </span>
          <Link className="icon-button" aria-label="术语表" to="/glossary">
            <BookMarked />
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <span className="brand-mark">线</span>
          <p>
            <strong>线性代数 · 交互学习实验室</strong>
            <br />
            以章节为模块，把知识、AI 应用与工科应用串成一条学习路径。
          </p>
        </div>
        <div>
          <Link to="/glossary">术语表</Link>
          <Link to="/learn">课程地图</Link>
          <span className="foot-note">内容改编自《Introduction to Linear Algebra》第6版中文版（Strang 著）</span>
        </div>
      </footer>
    </div>
  )
}
