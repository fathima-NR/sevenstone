import { business } from '../data/business'
import { allItems, menu } from '../data/menu'
import { useCountUp } from '../hooks/useReveal'
import { Link, useTitle } from '../router'
import Marquee from '../components/Marquee'
import Photo from '../components/Photo'
import Badge from '../components/Badge'
import NextPage from '../components/NextPage'
import '../styles/pages.css'

function Stat({ to, label, suffix = '', static: fixed }) {
  const [ref, n] = useCountUp(fixed ? 0 : to)
  return (
    <div className="stat" data-reveal="up">
      <span ref={ref} className="stat__num">
        {fixed ? to : n}
        {suffix}
      </span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

const STEPS = [
  [
    'Pick your dishes',
    'Browse the menu and tap + on anything you want. Every dish keeps its number from our printed menu.',
  ],
  ['Send it on WhatsApp', 'Your list goes to us as a ready-written message. Add your name and delivery address.'],
  [
    'We confirm in the chat',
    'We reply with your order, the total and the delivery time. Nothing is charged on the website.',
  ],
  ['Free delivery', 'Your food comes to your door at no extra cost. We accept Visa and Mastercard.'],
]

export default function About() {
  useTitle('About | Seven Stones Restaurant')
  return (
    <>
      <section className="ab-hero wrap">
        <div className="ab-hero__text">
          <p className="tag ph-in">Since {business.established}</p>
          <h1 className="display display-l ph-in" style={{ '--d': '80ms' }}>
            One kitchen.
            <br />
            <span className="outline-saffron">Nine cuisines.</span>
          </h1>
          <p className="lead muted ph-in" style={{ '--d': '160ms' }}>
            Seven Stones has been cooking in Barsha Heights (TECOM) since {business.established}, near the Grand
            Millennium Hotel.
          </p>
        </div>
        <div className="ab-collage" aria-hidden="true">
          <div className="ab-collage__a" data-reveal="clip">
            <Photo name="cover-grill" alt="" eager sizes="40vw" />
          </div>
          <div className="ab-collage__b" data-reveal="clip" style={{ '--i': 2 }}>
            <Photo name="66" alt="" sizes="25vw" />
          </div>
          <div className="ab-collage__c" data-reveal="clip" style={{ '--i': 4 }}>
            <Photo name="138" alt="" sizes="25vw" />
          </div>
          <Badge className="ab-collage__badge" text="FREE HOME DELIVERY ✦ BARSHA HEIGHTS ✦ SINCE 2016 ✦ " size={130} />
        </div>
      </section>

      <section className="section on-light ab-story">
        <div className="wrap ab-story__grid">
          <h2 className="display display-m" data-reveal="up">
            From 6 am dosa to charcoal grills
          </h2>
          <div className="ab-story__copy">
            <p className="lead" data-reveal="up">
              The day starts with breakfast at 6 am: ghee roast, idly vada, puri bhaji and karak tea. Later the kitchen
              moves on to Thalassery dum biryani, Kerala chatti curries, charcoal chicken, Filipino silog plates and
              Chinese wok dishes.
            </p>
            <p className="muted" data-reveal="up" style={{ '--i': 1 }}>
              The menu runs to {allItems.length} dishes across {menu.length} sections, from burgers and club sandwiches
              to faloodas, fresh juices and mojitos. Each dish has a number, so you can order the way regulars do: just
              quote the number.
            </p>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="stats">
          <Stat to={business.established} label="opened in Barsha Heights" static />
          <Stat to={allItems.length} label="dishes on the menu" />
          <Stat to={9} label="cuisines in one kitchen" />
          <Stat to="6 am" label="breakfast starts" static />
        </div>
      </section>

      <Marquee items={business.cuisines} label="Cuisines we cook" />

      <section className="section wrap steps-wrap">
        <h2 className="display display-l" data-reveal="up">
          How ordering
          <br />
          <span className="text-saffron">works</span>
        </h2>
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="step" data-reveal="up" style={{ '--i': i }}>
              <span className="step__n">{i + 1}</span>
              <h3>{t}</h3>
              <p className="muted">{d}</p>
            </li>
          ))}
        </ol>
        <div className="steps__cta" data-reveal="up">
          <Link to="/menu" className="btn btn-saffron">
            Start your order
          </Link>
        </div>
      </section>

      <NextPage to="/menu" hint="Next" label="The menu" />
    </>
  )
}
