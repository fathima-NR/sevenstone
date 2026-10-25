import { photoSizes } from '../data/photoSizes'

// Image from /public/img with intrinsic size set to avoid layout shift.
export default function Photo({ name, alt, eager = false, className, sizes, style }) {
  const size = photoSizes[String(name)] || [400, 300]
  return (
    <img
      className={className}
      style={style}
      src={`/img/${name}.webp`}
      width={size[0]}
      height={size[1]}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      sizes={sizes}
    />
  )
}
