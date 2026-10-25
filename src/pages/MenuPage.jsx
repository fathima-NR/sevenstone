import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { allItems, menu } from '../data/menu'
import { useRouter, useTitle } from '../router'
import Lightbox from '../components/Lightbox'
import MenuItem from '../components/MenuItem'
import NextPage from '../components/NextPage'
import { CloseIcon, SearchIcon, StoneMark } from '../components/Icons'
import '../styles/menu.css'

const normalise = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9 ]/g, ' ')

export default function MenuPage() {
  useTitle('Menu | Seven Stones Restaurant')
  const { query: params } = useRouter()
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)
  const [active, setActive] = useState(params.get('cat') || menu[0].id)
  const [photo, setPhoto] = useState(null)
  const chipsRef = useRef(null)

  const results = useMemo(() => {
    const q = normalise(deferred).trim()
    if (!q) return null
    const terms = q.split(/\s+/)
    return allItems.filter((it) => {
      if (/^\d+$/.test(q)) return String(it.no) === q
      const hay = normalise(`${it.name} ${it.note} ${it.categoryTitle}`)
      return terms.every((t) => hay.includes(t))
    })
  }, [deferred])

  const jump = (id, smooth = true) => {
    const el = document.getElementById(`cat-${id}`)
    if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' })
  }

  // Arriving from another page with ?cat=…
  useEffect(() => {
    const cat = params.get('cat')
    if (cat) requestAnimationFrame(() => jump(cat, false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Highlight the category currently on screen
  useEffect(() => {
    if (results) return
    const sections = menu.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.dataset.cat)
      },
      { rootMargin: '-200px 0px -55% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [results])

  // Keep the active chip in view in the horizontal strip
  useEffect(() => {
    const strip = chipsRef.current
    const el = strip?.querySelector(`[data-cat="${active}"]`)
    if (el && strip)
      strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  const openPhoto = (item) => setPhoto({ name: item.photo, caption: `${item.no}. ${item.name}` })

  return (
    <div className="mp">
      <header className="mp__hero wrap">
        <h1 className="display mp__title">
          <span className="mp__t1">The full</span>
          <span className="mp__t2">
            Menu
            <StoneMark className="mp__o" fill="var(--saffron)" cut="var(--ink)" />
          </span>
        </h1>
        <div className="mp__intro">
          <p className="lead">
            {allItems.length} dishes, each with the same number as our printed menu. Tap{' '}
            <span className="plus-inline">+</span> to build your order, then send it to us on WhatsApp.
          </p>        </div>
      </header>

      <div className="mp__bar">
        <div className="wrap mp__bar-inner">
          <label className="search">
            <SearchIcon />
            <span className="visually-hidden">Search the menu</span>
            <input
              type="search"
              placeholder="Search dishes or a number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              enterKeyHint="search"
            />
            {query && (
              <button className="search__clear" onClick={() => setQuery('')}>
                <CloseIcon />
                <span className="visually-hidden">Clear search</span>
              </button>
            )}
          </label>

          <nav className="chips" ref={chipsRef} aria-label="Menu sections" hidden={!!results}>
            {menu.map((c) => (
              <button
                key={c.id}
                data-cat={c.id}
                className="chip"
                aria-current={active === c.id ? 'true' : undefined}
                onClick={() => {
                  setActive(c.id)
                  jump(c.id)
                }}
              >
                {c.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="wrap mp__body">
        {results ? (
          <div className="results" aria-live="polite">
            <p className="results__count">
              {results.length === 0
                ? `Nothing matches “${deferred}”. Try a shorter word, or call us — we may still make it.`
                : `${results.length} ${results.length === 1 ? 'dish' : 'dishes'} match “${deferred}”`}
            </p>
            <ul className="items">
              {results.map((it) => (
                <MenuItem key={`${it.categoryId}-${it.no}`} item={it} onPhoto={openPhoto} />
              ))}
            </ul>
          </div>
        ) : (
          menu.map((cat, ci) => (
            <section
              key={cat.id}
              id={`cat-${cat.id}`}
              data-cat={cat.id}
              className="cat"
              aria-labelledby={`h-${cat.id}`}
            >
              <div className="cat__head">
                <span className="cat__index" aria-hidden="true">
                  {String(ci + 1).padStart(2, '0')}
                </span>
                <h2 id={`h-${cat.id}`} className="display cat__title">
                  {cat.title}
                </h2>
                {cat.blurb && <p className="cat__blurb muted">{cat.blurb}</p>}
              </div>
              {cat.groups.map((g, gi) => (
                <div key={gi} className="group">
                  {g.title && <h3 className="group__title">{g.title}</h3>}
                  <ul className="items">
                    {g.items.map((it) => (
                      <MenuItem key={it.no} item={it} onPhoto={openPhoto} />
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))
        )}
      </div>

      <NextPage to="/contact" hint="Questions about a dish?" label="Contact us" />

      <Lightbox photo={photo?.name} caption={photo?.caption} onClose={() => setPhoto(null)} />
    </div>
  )
}
