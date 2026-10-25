import { business, waLink } from '../data/business'
import { Link } from '../router'
import { pages } from './Header'
import { SocialIcons } from './Social'

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div className="ftr__brand">
          <img src="/img/logo.webp" width="512" height="512" alt="Seven Stones Restaurant logo" loading="lazy" />
          <p className="muted">
            {business.address.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </div>

        <nav className="ftr__col" aria-label="Footer">
          <p className="ftr__head">Pages</p>
          {pages.map((p) => (
            <Link key={p.to} to={p.to}>
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="ftr__col">
          <p className="ftr__head">Order</p>
          {business.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`}>
              Call {p.display}
            </a>
          ))}
          {business.whatsapp.map((w) => (
            <a key={w.number} href={waLink(w.number)} target="_blank" rel="noopener noreferrer">
              WhatsApp {w.display}
            </a>
          ))}
        </div>
      </div>

      <div className="wrap ftr__follow">
        <p className="ftr__head">Follow us</p>
        <SocialIcons />
      </div>

      <div className="ftr__word" aria-hidden="true">
        Seven Stones
      </div>

      <div className="wrap ftr__base">
        <p>
          Copyright © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
