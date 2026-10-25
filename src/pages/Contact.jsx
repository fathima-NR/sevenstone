import { business, mapsEmbed, mapsLink, waLink } from '../data/business'
import { useTitle } from '../router'
import ConfirmTag from '../components/ConfirmTag'
import NextPage from '../components/NextPage'
import { SocialCards } from '../components/Social'
import { ArrowIcon, CardIcon, ClockIcon, PhoneIcon, PinIcon, ScooterIcon, WhatsAppIcon } from '../components/Icons'
import '../styles/pages.css'

export default function Contact() {
  useTitle('Contact us | Seven Stones Restaurant')
  const { address, hours, phones, whatsapp } = business
  return (
    <>
      <section className="wrap ph">
        <h1 className="display display-xl ph-in">
          Come
          <br />
          <span className="outline-saffron">hungry</span>
        </h1>
        <p className="lead muted ph-in" style={{ '--d': '120ms' }}>
          Call, message or visit us in Barsha Heights. Delivery is free.
        </p>
      </section>

      <section className="wrap ct">
        <div className="ct__cards">
          <a className="ccard ccard--saffron" href={`tel:${phones[0].tel}`} data-reveal="up">
            <PhoneIcon className="ccard__icon" />
            <span className="ccard__label">Call us</span>
            <span className="ccard__big">{phones[0].display}</span>
            <ArrowIcon className="ccard__go" />
          </a>
          {whatsapp.map((w, i) => (
            <a
              key={w.number}
              className="ccard"
              href={waLink(w.number, 'Hello Seven Stones, I would like to order:')}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal="up"
              style={{ '--i': i + 1 }}
            >
              <WhatsAppIcon className="ccard__icon" />
              <span className="ccard__label">WhatsApp</span>
              <span className="ccard__big">{w.display}</span>
              <ArrowIcon className="ccard__go" />
            </a>
          ))}
        </div>

        <div className="ct__grid">
          <dl className="ct__facts" data-reveal="up">
            <div>
              <dt>
                <PinIcon /> Address
              </dt>
              <dd>
                {address.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="ct__link">
                  Get directions
                </a>
              </dd>
            </div>
            <div>
              <dt>
                <ClockIcon /> Hours
              </dt>
              <dd>
                <span>
                  {hours.summary}
                  {hours.confirm && (
                    <ConfirmTag note="The menu card shows a 24-hour badge but no written opening hours" />
                  )}
                </span>
                <span>{hours.breakfast}</span>
              </dd>
            </div>
            <div>
              <dt>
                <ScooterIcon /> Delivery
              </dt>
              <dd>Free home delivery</dd>
            </div>
            <div>
              <dt>
                <CardIcon /> Payment
              </dt>
              <dd>Visa and Mastercard accepted</dd>
            </div>
          </dl>

          <div className="ct__map" data-reveal="clip">
            <iframe
              title="Map showing Seven Stones Restaurant in Barsha Heights"
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {address.mapConfirm && (
              <p className="ct__mapnote muted">
                Pin placed from the printed address
                <ConfirmTag note="Check that the map pin matches the restaurant entrance" />
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="wrap follow" aria-labelledby="follow-title">
        <h2 id="follow-title" className="display display-m" data-reveal="up">
          Follow us
        </h2>
        <p className="muted follow__lead" data-reveal="up">
          Message us, find us on the map, or follow along for new dishes and offers.
        </p>
        <SocialCards />
      </section>

      <NextPage to="/menu" hint="Ready to order?" label="See the menu" />
    </>
  )
}
