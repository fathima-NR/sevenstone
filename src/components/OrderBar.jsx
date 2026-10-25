import { useEffect, useRef, useState } from 'react'
import { business, waLink } from '../data/business'
import { formatPrice } from '../data/menu'
import { orderMessage, useOrder } from '../order'
import { CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from './Icons'

export default function OrderBar() {
  const { lines, count, total, hasAsp, change, clear, open, setOpen } = useOrder()
  const ref = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  // The floating WhatsApp button appears once the page's own buttons are out of view
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  useEffect(() => {
    if (count === 0) setOpen(false)
  }, [count, setOpen])

  const msg = orderMessage(lines, total, hasAsp)

  return (
    <>
      <div className="dock">
        {count === 0 ? (
          scrolled && (
            <a
              className="wa-float"
              href={waLink(business.whatsapp[0].number, 'Hello Seven Stones, I would like to order:')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              <span>WhatsApp us</span>
            </a>
          )
        ) : (
          <button className="order-bar" onClick={() => setOpen(true)} aria-haspopup="dialog">
            <span className="order-bar__count" key={count}>
              {count}
            </span>
            <span className="order-bar__text">
              Your order
              <small>
                AED {formatPrice(total)}
                {hasAsp ? ' +' : ''}
              </small>
            </span>
            <span className="order-bar__cta">
              <WhatsAppIcon /> Review & send
            </span>
          </button>
        )}
      </div>

      <dialog
        ref={ref}
        className="sheet"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && setOpen(false)}
        aria-labelledby="sheet-title"
      >
        <div className="sheet__inner">
          <div className="sheet__head">
            <h2 id="sheet-title">Your order</h2>
            <button className="sheet__close" onClick={() => setOpen(false)}>
              <CloseIcon />
              <span className="visually-hidden">Close</span>
            </button>
          </div>

          <ul className="lines">
            {lines.map((l) => (
              <li key={l.key} className="line">
                <div className="line__name">
                  <span className="line__no">{l.no}</span> {l.name}
                  {l.label && <span className="line__opt">{l.label}</span>}
                </div>
                <div className="qty">
                  <button onClick={() => change(l.key, -1)} aria-label={`Remove one ${l.name}`}>
                    <MinusIcon />
                  </button>
                  <span aria-live="polite">{l.qty}</span>
                  <button onClick={() => change(l.key, 1)} aria-label={`Add one more ${l.name}`}>
                    <PlusIcon />
                  </button>
                </div>
                <div className="line__price">{l.price == null ? 'Ask' : formatPrice(l.price * l.qty)}</div>
              </li>
            ))}
          </ul>

          <div className="sheet__total">
            <span>Menu total</span>
            <strong>
              AED {formatPrice(total)}
              {hasAsp && <small> + items priced on request</small>}
            </strong>
          </div>
          <p className="sheet__note">
            This sends your list to us on WhatsApp. We’ll confirm the order, total and delivery time in the chat.
            Nothing is charged here.
          </p>

          <div className="sheet__send">
            {business.whatsapp.map((w) => (
              <a
                key={w.number}
                className="btn btn-saffron"
                href={waLink(w.number, msg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Send to {w.display}
              </a>
            ))}
          </div>
          <button className="sheet__clear" onClick={clear}>
            Clear the list
          </button>
        </div>
      </dialog>
    </>
  )
}
