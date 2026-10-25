import { useEffect, useState } from 'react'
import { business, waLink } from '../data/business'
import { Link, useRouter } from '../router'
import { useOrder } from '../order'
import { SocialIcons } from './Social'
import { ArrowIcon, BagIcon, CloseIcon, MenuIcon, PhoneIcon, ScooterIcon, WhatsAppIcon } from './Icons'

export const pages = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact us' },
]

export default function Header() {
  const { path } = useRouter()
  const { count, setOpen: openOrder } = useOrder()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [path])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const isActive = (to) => (to === '/' ? path === '/' : path.startsWith(to))

  return (
    <>
      <header className="hdr" data-scrolled={scrolled || open}>
        <div className="hdr__pill">
          <Link to="/" className="hdr__brand" aria-label="Seven Stones Restaurant, home">
            <img src="/img/logo.webp" width="512" height="512" alt="" />
          </Link>

          <nav className="hdr__nav" aria-label="Main">
            {pages.map((p) => (
              <Link key={p.to} to={p.to} className="hdr__link" aria-current={isActive(p.to) ? 'page' : undefined}>
                {p.label}
              </Link>
            ))}
          </nav>

          {count > 0 ? (
            <button className="hdr__order" onClick={() => openOrder(true)} aria-haspopup="dialog">
              <BagIcon />
              <span className="hdr__order-label">Your order</span>
              <span className="hdr__count" key={count}>
                {count}
              </span>
            </button>
          ) : (
            <Link to="/menu" className="hdr__order">
              <BagIcon />
              <span className="hdr__order-label">Order now</span>
            </Link>
          )}

          <button
            className="hdr__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </header>

      <div id="mobile-nav" className="mnav" data-open={open} hidden={!open}>
        <p className="mnav__eyebrow">Menu</p>
        <nav aria-label="Mobile">
          {pages.map((p, i) => (
            <Link
              key={p.to}
              to={p.to}
              className="mnav__link"
              style={{ '--i': i }}
              aria-current={isActive(p.to) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="mnav__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="mnav__label">{p.label}</span>
              <ArrowIcon className="mnav__arrow" />
            </Link>
          ))}
        </nav>
        <div className="mnav__foot">
          <p className="mnav__info">
            <ScooterIcon /> Free home delivery · {business.address.lines[1]}
          </p>
          <div className="mnav__actions">
            <a className="btn btn-saffron" href={`tel:${business.phones[0].tel}`}>
              <PhoneIcon /> Call
            </a>
            <a
              className="btn btn-ghost"
              href={waLink(business.whatsapp[0].number, 'Hello Seven Stones, I would like to order:')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
          <SocialIcons className="mnav__social" />
        </div>
      </div>
    </>
  )
}
