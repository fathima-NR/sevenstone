import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import OrderBar from './components/OrderBar'
import { OrderProvider } from './order'
import { RouterProvider, useRouter } from './router'
import { useRevealAll } from './hooks/useReveal'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const ROUTES = {
  '/': Home,
  '/menu': MenuPage,
  '/about': About,
  '/gallery': Gallery,
  '/contact': Contact,
}

function Pages() {
  const { path } = useRouter()
  const Page = ROUTES[path] || NotFound
  useRevealAll(path)

  // Move focus to the new page for keyboard and screen-reader users
  useEffect(() => {
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [path])

  return (
    <main
      id="main"
      tabIndex={-1}
      className={typeof document !== 'undefined' && document.startViewTransition ? undefined : 'page'}
      key={path}
      style={{ outline: 'none' }}
    >
      <Page />
    </main>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <OrderProvider>
        <a
          href="#main"
          className="skip-link"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('main')?.focus()
          }}
        >
          Skip to content
        </a>
        <Header />
        <Pages />
        <Footer />
        <OrderBar />
      </OrderProvider>
    </RouterProvider>
  )
}
