import { useState } from 'react'
import { useTitle } from '../router'
import Lightbox from '../components/Lightbox'
import Photo from '../components/Photo'
import NextPage from '../components/NextPage'
import '../styles/pages.css'

// Photos from the restaurant's own menu card. Captions use the menu names.
const SHOTS = [
  ['325', 'Mixed Grill', 'grills'],
  ['64', 'Charcoal Biryani', 'biryani'],
  ['136', 'Kizhi Parotta', 'kerala'],
  ['376', 'Angus Burger', 'burgers'],
  ['479', 'Chocolate Falooda', 'drinks'],
  ['322', 'Peri Peri Chicken Charcoal', 'grills'],
  ['63', 'Pothi Biryani', 'biryani'],
  ['34', 'English Breakfast', 'breakfast'],
  ['138', 'Chicken Nadan Fry', 'kerala'],
  ['290', 'Beef Bulalo with Rice', 'asian'],
  ['315', 'Seafood Mix Grill', 'grills'],
  ['389', 'Mighty Zinker Burger', 'burgers'],
  ['463', 'Mango Juice', 'drinks'],
  ['66', 'Thalassery Dum Biryani', 'biryani'],
  ['141', 'Chemmeen Varattiyathu', 'kerala'],
  ['247', 'Chicken Lollipop', 'asian'],
  ['332', 'Lamb Chops', 'grills'],
  ['40', 'Masala Dosa', 'breakfast'],
  ['504', 'Classic Banana Split', 'drinks'],
  ['422', 'International Club Sandwich', 'burgers'],
  ['67', 'Mix Grill Biryani', 'biryani'],
  ['202', 'Schezwan Noodles', 'asian'],
  ['37', 'Idly Vada Set', 'breakfast'],
  ['512', 'Blue Mojito', 'drinks'],
  ['333', 'Mix Kabab', 'grills'],
  ['137', 'Kothu Parotta', 'kerala'],
  ['291', 'Tapsilog', 'asian'],
  ['tea', 'Tea & coffee', 'breakfast'],
  ['497', 'Nutella Shake', 'drinks'],
  ['377', 'Grill Double Burger', 'burgers'],
]

const FILTERS = [
  ['all', 'All'],
  ['grills', 'Grills'],
  ['biryani', 'Biryani'],
  ['kerala', 'Kerala'],
  ['burgers', 'Burgers'],
  ['breakfast', 'Breakfast'],
  ['asian', 'Chinese & Filipino'],
  ['drinks', 'Juices & desserts'],
]

export default function Gallery() {
  useTitle('Gallery | Seven Stones Restaurant')
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  const shots = SHOTS.filter((s) => filter === 'all' || s[2] === filter)

  return (
    <>
      <section className="wrap ph">
        <h1 className="display display-xl ph-in">
          From the
          <br />
          <span className="outline-saffron">kitchen</span>
        </h1>
        <p className="lead muted ph-in" style={{ '--d': '120ms' }}>
          A look at what comes out of the Seven Stones kitchen. Pictures are for illustration only.
        </p>
      </section>

      <section className="wrap gal">
        <div className="gal__filters" role="group" aria-label="Filter photos">
          {FILTERS.map(([id, label]) => (
            <button key={id} className="chip-lg" aria-pressed={filter === id} onClick={() => setFilter(id)}>
              {label}
            </button>
          ))}
        </div>

        <ul className="gal__grid" key={filter}>
          {shots.map(([name, caption], i) => (
            <li key={name} className="shot" style={{ '--i': i % 8 }}>
              <button onClick={() => setOpen({ name, caption })} aria-label={`Enlarge photo: ${caption}`}>
                <Photo name={name} alt="" sizes="(min-width: 1000px) 25vw, 50vw" />
                <span className="shot__cap">{caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <NextPage to="/contact" hint="Hungry now?" label="Contact us" />

      <Lightbox photo={open?.name} caption={open?.caption} onClose={() => setOpen(null)} />
    </>
  )
}
