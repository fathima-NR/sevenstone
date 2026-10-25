const base = { 'aria-hidden': true, focusable: 'false', viewBox: '0 0 24 24' }

export const WhatsAppIcon = (p) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.25 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.17-.29.19-.54.06a6.75 6.75 0 0 1-3.37-2.95c-.25-.44.25-.41.72-1.36.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.23 3.74 1.57.68 2.19.74 2.98.62.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.3Z" />
  </svg>
)

const Stroke = ({ children, ...p }) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

export const PhoneIcon = (p) => (
  <Stroke {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </Stroke>
)
export const PinIcon = (p) => (
  <Stroke {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Stroke>
)
export const ClockIcon = (p) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Stroke>
)
export const ScooterIcon = (p) => (
  <Stroke {...p}>
    <circle cx="6" cy="17" r="3" />
    <circle cx="18" cy="17" r="3" />
    <path d="M9 17h6l-2-7h-3M16 6h2l2 8M4 11h6" />
  </Stroke>
)
export const CardIcon = (p) => (
  <Stroke {...p}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </Stroke>
)
export const SearchIcon = (p) => (
  <Stroke {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Stroke>
)
export const PlusIcon = (p) => (
  <Stroke {...p}>
    <path d="M12 5v14M5 12h14" />
  </Stroke>
)
export const MinusIcon = (p) => (
  <Stroke {...p}>
    <path d="M5 12h14" />
  </Stroke>
)
export const CloseIcon = (p) => (
  <Stroke {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Stroke>
)
export const MenuIcon = (p) => (
  <Stroke {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </Stroke>
)
export const InstagramIcon = (p) => (
  <Stroke {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </Stroke>
)
export const FacebookIcon = (p) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" />
  </svg>
)

export const ArrowIcon = (p) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
)
export const ArrowLeftIcon = (p) => (
  <Stroke {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Stroke>
)
export const BagIcon = (p) => (
  <Stroke {...p}>
    <path d="M6 7h12l1 13H5L6 7Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </Stroke>
)

/* The "O" from the logo: a stone with a spoon cut out of it */
export const StoneMark = ({ fill = 'currentColor', cut = 'var(--saffron)', ...p }) => (
  <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" {...p}>
    <circle cx="50" cy="50" r="47" fill={fill} />
    <ellipse cx="50" cy="38" rx="13" ry="17" fill={cut} />
    <rect x="46" y="52" width="8" height="34" rx="4" fill={cut} />
  </svg>
)

export const TikTokIcon = (p) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M16.6 3c.4 2.2 1.8 3.7 4 4v3.2a8 8 0 0 1-4-1.2v6.6A6.4 6.4 0 1 1 10.2 9v3.3a3.1 3.1 0 1 0 3.1 3.1V3h3.3Z" />
  </svg>
)
export const MapIcon = (p) => (
  <Stroke {...p}>
    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
    <path d="M9 4v14M15 6v14" />
  </Stroke>
)
