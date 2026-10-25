import { SHOW_CONFIRM_MARKERS } from '../data/business'

// Marks details that could not be verified from the menu card.
export default function ConfirmTag({ note }) {
  if (!SHOW_CONFIRM_MARKERS || !note) return null
  return (
    <span className="confirm-tag" title={note}>
      to confirm<span className="visually-hidden">: {note}</span>
    </span>
  )
}
