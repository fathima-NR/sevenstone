import { useRef } from 'react'
import { business, waLink } from '../data/business'
import { allItems, formatPrice, menu } from '../data/menu'
import { useCountUp } from '../hooks/useReveal'
import { Link, useTitle } from '../router'
import { useOrder } from '../order'
import ConfirmTag from '../components/ConfirmTag'
import Marquee from '../components/Marquee'
import Photo from '../components/Photo'
import { SocialIcons } from '../components/Social'
import {
  ArrowIcon,
  ArrowLeftIcon,
  ClockIcon,
  PhoneIcon,
  PlusIcon,
  ScooterIcon,
  StoneMark,
  WhatsAppIcon,
} from '../components/Icons'
import '../styles/home.css'

const byNo = (n) => allItems.find((i) => i.no === n)

// House favourites shown on the home page (menu numbers)
const FAVOURITES = [64, 66, 325, 322, 136, 141, 376, 290, 424, 479]

// Photo used for each menu category tile
const CATEGORY_PHOTO = {
  breakfast: '34',
  'tea-coffee': 'tea',
  biryani: '63',
  indian: '98',
  nadan: '138',
  'soups-salads': '176',
  chinese: '202',
  filipino: '291',
  'pasta-rice': '297',
  grill: '322',
  'fried-chicken': '338',
  wraps: '343',
  burgers: '377',
  snacks: '424',
  juices: '502',
  desserts: '504',
  mojitos: '513',
}

function Hero() {
  const wa = business.whatsapp[0]
  return (
    <section className="hb" aria-labelledby="hb-title">
      <div className="wrap hb__grid">
        <div className="hb__text">
          <h1 id="hb-title" className="display hb__title">
            <span className="hb__l1">Nine cuisines.</span>
            <span className="hb__l2">One kitchen.</span>
          </h1>
          <p className="lead hb__lead">
            Thalassery biryani, Kerala nadan curries, charcoal grills, fresh burgers and a full juice bar in Barsha
            Heights.
          </p>
          <ul className="hb__facts">
            <li>
              <ScooterIcon /> Free home delivery
            </li>
            <li>
              <ClockIcon /> {business.hours.summary}
              {business.hours.confirm && (
                <ConfirmTag note="The menu card shows a 24-hour badge but no written opening hours" />
              )}
            </li>
          </ul>
          <div className="hb__actions">
            <a
              className="btn btn-saffron"
              href={waLink(wa.number, 'Hello Seven Stones, I would like to order:')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Order on WhatsApp
            </a>
            <Link to="/menu" className="btn btn-ghost">
              See the full menu
            </Link>
          </div>
        </div>

        <div className="hb__visual" aria-hidden="true">
          <div className="hb__sun" />
          <svg className="hb__ring" viewBox="0 0 200 200">
            <path d="M 22 78 A 80 80 0 0 1 178 78" />
            <path d="M 178 122 A 80 80 0 0 1 22 122" />
          </svg>
          <div className="hb__plate">
            <Photo name="cut/hero-disc" alt="" eager sizes="(min-width: 960px) 40vw, 80vw" />
          </div>
          <div className="hb__mini hb__mini--a">
            <Photo name="141" alt="" />
          </div>
          <div className="hb__mini hb__mini--b">
            <Photo name="64" alt="" />
          </div>
          <p className="hb__tag hb__tag--a">
            <strong>{allItems.length}</strong> dishes
          </p>
          <p className="hb__tag hb__tag--b">
            Since <strong>{business.established}</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

function Favourites() {
  const track = useRef(null)
  const { add } = useOrder()
  const scroll = (dir) => {
    const t = track.current
    if (!t) return
    t.scrollBy({ left: dir * Math.min(t.clientWidth * 0.8, 720), behavior: 'smooth' })
  }
  return (
    <section className="favs section" aria-labelledby="favs-title">
      <div className="wrap favs__head">
        <div>
          <p className="tag" data-reveal="up">
            <StoneMark fill="var(--saffron)" cut="var(--ink)" /> House favourites
          </p>
          <h2 id="favs-title" className="display display-l" data-reveal="up" style={{ '--i': 1 }}>
            Plates people
            <br />
            <span className="outline-saffron">come back for</span>
          </h2>
        </div>
        <div className="favs__arrows">
          <button onClick={() => scroll(-1)} aria-label="Scroll favourites left">
            <ArrowLeftIcon />
          </button>
          <button onClick={() => scroll(1)} aria-label="Scroll favourites right">
            <ArrowIcon />
          </button>
        </div>
      </div>

      <ul className="favs__track" ref={track}>
        {FAVOURITES.map(byNo)
          .filter(Boolean)
          .map((it, i) => {
            const single = it.price.kind === 'single'
            const first = it.price.options?.[0]
            return (
              <li key={it.no} className="fav" data-reveal="up" style={{ '--i': Math.min(i, 4) }}>
                <div className="fav__img">
                  <Photo name={it.photo} alt={it.name} sizes="340px" />
                  <span className="fav__no">No. {it.no}</span>
                </div>
                <div className="fav__body">
                  <h3 className="fav__name">{it.name}</h3>
                  <p className="fav__cat muted">{it.categoryTitle}</p>
                  <div className="fav__row">
                    <p className="fav__price">
                      {!single && <small>from </small>}
                      <span>AED</span> {formatPrice(Math.min(...it.price.options.map((o) => o.price)))}
                    </p>
                    {single ? (
                      <button
                        className="fav__add"
                        onClick={() => add(it, first)}
                        aria-label={`Add ${it.name} to your order`}
                      >
                        <PlusIcon />
                      </button>
                    ) : (
                      <Link
                        to={`/menu?cat=${it.categoryId}`}
                        className="fav__add fav__add--link"
                        aria-label={`Choose an option for ${it.name}`}
                      >
                        <ArrowIcon />
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
      </ul>
    </section>
  )
}

function DishCount() {
  const [ref, n] = useCountUp(allItems.length)
  return (
    <span ref={ref} className="bento__num">
      {n}
    </span>
  )
}

function Bento() {
  return (
    <section className="wrap bento" aria-label="Why Seven Stones">
      <Link to="/menu?cat=grill" className="bento__card bento__card--big" data-reveal="clip">
        <Photo
          name="cover-grill"
          alt="Mixed grill skewers with roast potatoes and grilled peppers"
          sizes="(min-width: 960px) 50vw, 100vw"
        />
        <div className="bento__over">
          <p className="bento__kicker">Grilled corner</p>
          <h3 className="display display-m">Charcoal grills and kababs</h3>
          <span className="bento__go">
            See the grills <ArrowIcon />
          </span>
        </div>
      </Link>

      <div className="bento__card bento__card--saffron on-saffron" data-reveal="scale" style={{ '--i': 1 }}>
        <ScooterIcon className="bento__icon" />
        <h3 className="bento__title">Free home delivery</h3>
        <p>Order on WhatsApp or call {business.phones[0].display}.</p>
      </div>

      <div className="bento__card" data-reveal="scale" style={{ '--i': 2 }}>
        <DishCount />
        <h3 className="bento__title">dishes on one menu</h3>
        <p className="muted">Each one numbered, so you can order by number.</p>
      </div>

      <div className="bento__card" data-reveal="scale" style={{ '--i': 3 }}>
        <span className="bento__num outline-saffron">{business.established}</span>
        <h3 className="bento__title">cooking in Barsha Heights</h3>
      </div>

      <Link
        to="/menu?cat=breakfast"
        className="bento__card bento__card--photo"
        data-reveal="scale"
        style={{ '--i': 4 }}
      >
        <Photo name="40" alt="Masala dosa with chutney and sambar" sizes="(min-width: 960px) 25vw, 50vw" />
        <div className="bento__over">
          <p className="bento__kicker">Breakfast from 6 am</p>
          <h3 className="bento__title">Dosa, idly, parotta and karak tea</h3>
        </div>
      </Link>
    </section>
  )
}

function Explore() {
  return (
    <section className="section explore" aria-labelledby="explore-title">
      <div className="wrap">
        <div className="explore__head">
          <h2 id="explore-title" className="display display-l" data-reveal="up">
            Explore
            <br />
            the menu
          </h2>
          <p className="lead muted" data-reveal="up" style={{ '--i': 1 }}>
            {menu.length} sections, from Kerala breakfasts to Filipino silog plates. Tap one to jump straight in.
          </p>
        </div>
        <ul className="explore__grid">
          {menu.map((c, i) => {
            const n = c.groups.reduce((s, g) => s + g.items.length, 0)
            return (
              <li key={c.id} data-reveal="up" style={{ '--i': i % 4 }}>
                <Link to={`/menu?cat=${c.id}`} className="tile">
                  <Photo name={CATEGORY_PHOTO[c.id]} alt="" sizes="(min-width: 960px) 25vw, 50vw" />
                  <span className="tile__shade" />
                  <span className="tile__text">
                    <span className="tile__title">{c.title}</span>
                    <span className="tile__count">{n} dishes</span>
                  </span>
                  <span className="tile__arrow">
                    <ArrowIcon />
                  </span>
                </Link>
              </li>
            )
          })}
          <li className="explore__more" data-reveal="up">
            <Link to="/menu" className="tile-cta">
              <span className="display">See the full menu</span>
              <ArrowIcon />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

function JuiceBar() {
  const juices = menu.find((c) => c.id === 'juices')
  const fresh = juices.groups.find((g) => g.title === 'Fresh juices').items.length
  const healthy = juices.groups.find((g) => g.title === 'Healthy juices').items.length
  return (
    <section className="juice on-saffron" aria-labelledby="juice-title">
      <div className="wrap juice__grid">
        <div className="juice__text">
          <h2 id="juice-title" className="display display-xl" data-reveal="up">
            Juice
            <br />
            bar
          </h2>
          <p className="lead" data-reveal="up" style={{ '--i': 1 }}>
            {fresh} fresh juices, {healthy} healthy blends, plus lassi, faloodas, thick shakes and mojitos.
          </p>
          <div data-reveal="up" style={{ '--i': 2 }}>
            <Link to="/menu?cat=juices" className="btn btn-ink">
              See juices and desserts
            </Link>
          </div>
        </div>
        <div className="juice__glasses" aria-hidden="true">
          <Photo name="cut/juice-passion" alt="" className="juice__g juice__g--1" />
          <Photo name="cut/juice-mango" alt="" className="juice__g juice__g--2" />
          <Photo name="cut/mojito" alt="" className="juice__g juice__g--3" />
        </div>
      </div>
    </section>
  )
}

const FOLLOW_SHOTS = ['325', '64', '322', '376', '136', '141']

function FollowUs() {
  return (
    <section className="section follow-home" aria-labelledby="follow-home-title">
      <div className="wrap follow-home__head">
        <div>
          <h2 id="follow-home-title" className="display display-l" data-reveal="up">
            Follow
            <br />
            <span className="outline-saffron">Seven Stones</span>
          </h2>
        </div>
        <div className="follow-home__side" data-reveal="up" style={{ '--i': 1 }}>
          <p className="muted">New dishes, offers and what’s cooking today.</p>
          <SocialIcons />
        </div>
      </div>
      <ul className="follow-home__strip" aria-label="Photos from our kitchen">
        {FOLLOW_SHOTS.map((n, i) => (
          <li key={n} data-reveal="scale" style={{ '--i': i }}>
            <Link to="/gallery" aria-label="Open the gallery">
              <Photo name={n} alt="" sizes="(min-width: 960px) 16vw, 33vw" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

const CTA_STEPS = [
  ['Pick your dishes', 'Tap + on anything in the menu.'],
  ['Send it on WhatsApp', 'Your list arrives as a ready message.'],
  ['We deliver for free', 'We confirm the total and time in the chat.'],
]

function OrderCta() {
  return (
    <section className="section cta" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta__panel on-saffron" data-reveal="up">
          <div className="cta__copy">
            <h2 id="cta-title" className="display cta__word">
              Hungry?
            </h2>
            <p className="lead cta__lead">
              Send us your order on WhatsApp and we’ll confirm it in the chat. Delivery is free.
            </p>
            <ol className="cta__steps">
              {CTA_STEPS.map(([t, d], i) => (
                <li key={t}>
                  <span className="cta__n">{i + 1}</span>
                  <span>
                    <strong>{t}</strong>
                    <span className="cta__d">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="cta__actions">
              {business.whatsapp.map((w) => (
                <a
                  key={w.number}
                  className="btn btn-ink"
                  href={waLink(w.number, 'Hello Seven Stones, I would like to order:')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> {w.display}
                </a>
              ))}
              <a className="btn btn-ghost-ink" href={`tel:${business.phones[0].tel}`}>
                <PhoneIcon /> {business.phones[0].display}
              </a>
            </div>
          </div>

          <div className="cta__art" aria-hidden="true">
            <div className="cta__ring" />
            <div className="cta__dish cta__dish--main">
              <Photo name="cut/hero-disc" alt="" sizes="360px" />
            </div>
            <div className="cta__dish cta__dish--a">
              <Photo name="322" alt="" sizes="160px" />
            </div>
            <div className="cta__dish cta__dish--b">
              <Photo name="376" alt="" sizes="160px" />
            </div>
            <Photo name="cut/juice-mango" alt="" className="cta__glass" />
            <span className="cta__chip">
              <ScooterIcon /> Free delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useTitle('Seven Stones Restaurant | Barsha Heights, Dubai')
  return (
    <>
      <Hero />
      <Marquee items={business.cuisines} label="Cuisines we cook" />
      <Favourites />
      <Bento />
      <Explore />
      <JuiceBar />
      <FollowUs />
      <OrderCta />
    </>
  )
}
