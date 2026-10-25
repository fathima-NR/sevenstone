// Circular stamp: rotating text around the Seven Stones logo
export default function Badge({ text, size = 150, className = '' }) {
  return (
    <div className={`badge ${className}`} style={{ '--size': `${size}px` }} aria-hidden="true">
      <svg className="badge__text" viewBox="0 0 150 150">
        <defs>
          <path id="badge-circle" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>
        <text>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <img className="badge__logo" src="/img/logo.webp" width="512" height="512" alt="" />
    </div>
  )
}
