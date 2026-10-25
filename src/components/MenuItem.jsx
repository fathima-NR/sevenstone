import { formatPrice } from '../data/menu'
import { useOrder } from '../order'
import ConfirmTag from './ConfirmTag'
import Photo from './Photo'
import { PlusIcon } from './Icons'

export default function MenuItem({ item, onPhoto }) {
  const { add, lines } = useOrder()
  const inOrder = lines.filter((l) => l.no === item.no).reduce((n, l) => n + l.qty, 0)
  const { price } = item
  const single = price.kind === 'single' || price.kind === 'asp'

  return (
    <li className="item" data-photo={item.photo != null}>
      {item.photo != null && (
        <button className="item__photo" onClick={() => onPhoto(item)} aria-label={`View photo of ${item.name}`}>
          <Photo name={item.photo} alt="" sizes="80px" />
        </button>
      )}

      <div className="item__body">
        <div className="item__head">
          <p className="item__name">
            <span className="item__no">{item.no}</span>
            {item.name}
            <ConfirmTag note={item.confirm} />
          </p>
          {single && (
            <span className="item__price">
              {price.kind === 'asp' ? (
                <abbr title="Price on request — ask when you order">Ask</abbr>
              ) : (
                formatPrice(price.options[0].price)
              )}
            </span>
          )}
        </div>

        {item.note && <p className="item__note">{item.note}</p>}

        {!single && (
          <div className="item__options" role="group" aria-label={`${item.name} options`}>
            {price.options.map((o, i) => (
              <button
                key={i}
                className="opt"
                onClick={() => add(item, o)}
                aria-label={`Add ${item.name}${o.label ? `, ${o.label}` : ''}, AED ${formatPrice(o.price)}`}
              >
                {o.label && <span className="opt__label">{o.label}</span>}
                <span className="opt__price">{formatPrice(o.price)}</span>
                <PlusIcon />
              </button>
            ))}
          </div>
        )}
      </div>

      {single && (
        <button
          className="item__add"
          onClick={() => add(item, price.kind === 'asp' ? null : price.options[0])}
          aria-label={`Add ${item.name} to your order`}
        >
          <PlusIcon />
        </button>
      )}
      {inOrder > 0 && (
        <span className="item__count" key={inOrder} aria-label={`${inOrder} in your order`}>
          {inOrder}
        </span>
      )}
    </li>
  )
}
