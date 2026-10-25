import { useEffect, useRef } from 'react'
import Photo from './Photo'
import { CloseIcon } from './Icons'

// Enlarged photo in a native <dialog> (focus trap and Esc handled by the browser).
export default function Lightbox({ photo, caption, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (photo != null && !d.open) d.showModal()
    if (photo == null && d.open) d.close()
  }, [photo])

  return (
    <dialog
      ref={ref}
      className="lightbox"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={caption || 'Photo'}
    >
      {photo != null && (
        <figure>
          <Photo name={photo} alt={caption || ''} eager />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )}
      <button className="lightbox__close" onClick={onClose}>
        <CloseIcon />
        <span className="visually-hidden">Close photo</span>
      </button>
    </dialog>
  )
}
