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

const DAY = [
  { time: 'From 6 am', title: 'Breakfast', dishes: 'Ghee roast, idly vada, puri bhaji, karak tea', photo: '40' },
  { time: 'Lunch', title: 'Biryani & curries', dishes: 'Thalassery dum biryani, Kerala chatti curries', photo: '66' },
  { time: 'Dinner', title: 'Grills & wok', dishes: 'Charcoal chicken, silog plates, Chinese wok', photo: '322' },
]

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
        <div className="wrap">
          <div className="ab-story__grid">
            <div>
              <p className="ab-story__tag" data-reveal="up">A day in our kitchen</p>
              <h2 className="display display-l ab-story__title" data-reveal="up" style={{ '--i': 1 }}>
                From 6 am dosa to <span className="ab-story__hl">charcoal grills</span>
              </h2>
            </div>
            <div className="ab-story__copy">
              <p className="lead" data-reveal="up">
                The day starts with breakfast at 6 am: ghee roast, idly vada, puri bhaji and karak tea. Later the
                kitchen moves on to Thalassery dum biryani, Kerala chatti curries, charcoal chicken, Filipino silog
                plates and Chinese wok dishes.
              </p>
              <p className="ab-story__note" data-reveal="up" style={{ '--i': 1 }}>
                <strong>{allItems.length} dishes</strong> across <strong>{menu.length} sections</strong>. Every dish
                has a number, so you can order the way regulars do: just quote the number.
              </p>
            </div>
          </div>

          <ol className="ab-day">
            {DAY.map((d, i) => (
              <li key={d.title} className="ab-day__card" data-reveal="up" style={{ '--i': i }}>
                <div className="ab-day__img">
                  <Photo name={d.photo} alt="" sizes="(min-width: 760px) 30vw, 90vw" />
                  <span className="ab-day__time">{d.time}</span>
                </div>
                <div className="ab-day__body">
                  <h3>{d.title}</h3>
                  <p>{d.dishes}</p>
                </div>
              </li>
            ))}
          </ol>
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
