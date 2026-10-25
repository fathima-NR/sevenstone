import { StoneMark } from './Icons'

export default function Marquee({ items, flat = false, label }) {
  const group = (hidden) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t} className="marquee__item">
          {t}
          <StoneMark fill="var(--ink)" cut="var(--saffron)" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee-clip">
      <div className={`marquee ${flat ? 'marquee--flat' : ''}`} role="region" aria-label={label}>
        <div className="marquee__track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </div>
  )
}
