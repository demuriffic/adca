import { NavLink, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()
  const isRecipe = pathname.startsWith('/recipe/')
  return (
    <div className={`app${isRecipe ? ' app-recipe' : ''}`}>
      <header className="topbar no-print">
        <NavLink to="/" className="wordmark">Adca</NavLink>
        <nav className="tabs" aria-label="Main">
          <NavLink to="/" end className="tab">Search</NavLink>
          <NavLink to="/recommend" className="tab">Recommend</NavLink>
        </nav>
        <p className="tagline">Any dish, cook anytime.</p>
        <p className="attribution">
          <span className="attr-long">Recipes by </span><a href="https://spoonacular.com/food-api" target="_blank" rel="noreferrer">Spoonacular</a>
        </p>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
