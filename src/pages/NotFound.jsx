import { Link, useTitle } from '../router'
import '../styles/pages.css'

export default function NotFound() {
  useTitle('Page not found | Seven Stones Restaurant')
  return (
    <section className="wrap ph nf">
      <h1 className="display display-xl ph-in">
        4<span className="text-saffron">0</span>4
      </h1>
      <p className="lead muted ph-in">This page isn’t on the menu. Try the home page or the full menu instead.</p>
      <div className="nf__actions ph-in">
        <Link to="/" className="btn btn-saffron">
          Go to the home page
        </Link>
        <Link to="/menu" className="btn btn-ghost">
          See the menu
        </Link>
      </div>
    </section>
  )
}
