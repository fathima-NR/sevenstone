import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'

/*
 * Tiny client-side router.
 * - Clean URLs (/menu, /about …) on the live site. vercel.json sends every
 *   path to index.html so refreshing a page works.
 * - Hash URLs (#/menu) when the site is opened as a local file or inside a
 *   preview frame.
 * - The page state is the source of truth: if the browser refuses to update
 *   the address bar (sandboxed previews do), navigation still works.
 * - Uses the View Transitions API for animated page changes where supported.
 */

function detectHashMode() {
  if (typeof window === 'undefined') return false
  if (window.__HASH_ROUTER === true) return true
  const { protocol } = window.location
  return protocol === 'file:' || protocol === 'about:' || protocol === 'blob:' || protocol === 'data:'
}
const HASH = detectHashMode()

function readUrl() {
  try {
    if (HASH) {
      const h = window.location.hash.replace(/^#/, '')
      return h.startsWith('/') ? h : '/'
    }
    return window.location.pathname + window.location.search
  } catch {
    return '/'
  }
}

export function parseUrl(url) {
  const [p, q = ''] = url.split('?')
  return { path: p.replace(/\/+$/, '') || '/', query: new URLSearchParams(q) }
}

export const href = (to) => (HASH ? `#${to}` : to)

function writeUrl(to) {
  try {
    window.history.pushState(null, '', href(to))
  } catch {
    // Address bar can't change here (sandboxed preview) — the page still changes.
  }
}

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  const [url, setUrl] = useState(readUrl)

  useEffect(() => {
    const sync = () => setUrl(readUrl())
    window.addEventListener('popstate', sync)
    if (HASH) window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const navigate = useCallback(
    (to) => {
      if (to === url) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const go = () => {
        writeUrl(to)
        flushSync(() => setUrl(to))
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      if (document.startViewTransition && !reduce) {
        try {
          document.startViewTransition(go)
          return
        } catch {
          /* fall through to a plain page change */
        }
      }
      go()
    },
    [url],
  )

  const value = useMemo(() => ({ url, ...parseUrl(url), navigate }), [url, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export const useRouter = () => useContext(RouterContext)

export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useRouter()
  return (
    <a
      href={href(to)}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
