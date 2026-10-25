import { Link } from '../router'
import { ArrowIcon } from './Icons'

// Big "next page" link at the end of each page, so visitors can keep going
export default function NextPage({ to, label, hint }) {
  return (
    <section className="wrap next-page">
      <Link to={to} className="next-page__link" data-reveal="up">
        <span className="next-page__hint">{hint}</span>
        <span className="next-page__row">
          <span className="display next-page__label">{label}</span>
          <span className="next-page__arrow">
            <ArrowIcon />
          </span>
        </span>
      </Link>
    </section>
  )
}
