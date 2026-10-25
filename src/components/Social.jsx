import { business, mapsLink, waLink } from '../data/business'
import { FacebookIcon, InstagramIcon, MapIcon, TikTokIcon, WhatsAppIcon } from './Icons'

/*
 * Social and messaging links in one place. WhatsApp and Google Maps are real
 * links; Instagram, Facebook and TikTok become clickable as soon as their URLs
 * are added in src/data/business.js.
 */
export function socialLinks() {
  const s = business.social
  return [
    { id: 'instagram', label: 'Instagram', href: s.instagram, Icon: InstagramIcon },
    { id: 'facebook', label: 'Facebook', href: s.facebook, Icon: FacebookIcon },
    { id: 'tiktok', label: 'TikTok', href: s.tiktok, Icon: TikTokIcon },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: waLink(business.whatsapp[0].number, 'Hello Seven Stones'),
      Icon: WhatsAppIcon,
      handle: business.whatsapp[0].display,
    },
    { id: 'maps', label: 'Google Maps', href: mapsLink, Icon: MapIcon, handle: 'Directions and reviews' },
  ]
}

/* Row of round icon buttons */
export function SocialIcons({ className = '' }) {
  return (
    <ul className={`social-icons ${className}`}>
      {socialLinks().map(({ id, label, href, Icon }) => (
        <li key={id}>
          {href ? (
            <a className="social-icon" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon />
            </a>
          ) : (
            <span className="social-icon" aria-label={label}>
              <Icon />
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

/* Larger cards with the network name and handle */
export function SocialCards() {
  return (
    <ul className="social-cards">
      {socialLinks().map(({ id, label, href, Icon, handle }, i) => {
        const inner = (
          <>
            <Icon className="social-card__icon" />
            <span className="social-card__label">{label}</span>
            <span className="social-card__handle">
              {handle || business.socialName}
            </span>
          </>
        )
        return (
          <li key={id} data-reveal="up" style={{ '--i': i }}>
            {href ? (
              <a className={`social-card social-card--${id}`} href={href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div className={`social-card social-card--${id}`}>{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
