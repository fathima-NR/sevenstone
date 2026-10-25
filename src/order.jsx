import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { formatPrice } from './data/menu'

/*
 * A simple order list that the customer sends to the restaurant on WhatsApp.
 * There is no checkout or payment — the restaurant confirms the order in chat.
 */

const OrderContext = createContext(null)
const STORAGE_KEY = 'seven-stones-order-v1'

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function OrderProvider({ children }) {
  const [lines, setLines] = useState(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — the list still works for this visit */
    }
  }, [lines])

  const add = useCallback((item, option) => {
    const key = `${item.no}|${option?.label ?? ''}|${option?.price ?? 'asp'}`
    setLines((prev) => {
      const found = prev.find((l) => l.key === key)
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
      return [
        ...prev,
        { key, no: item.no, name: item.name, label: option?.label ?? '', price: option?.price ?? null, qty: 1 },
      ]
    })
  }, [])

  const change = useCallback((key, delta) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const total = lines.reduce((s, l) => s + (l.price ?? 0) * l.qty, 0)
    const hasAsp = lines.some((l) => l.price == null)
    return { lines, count, total, hasAsp, add, change, clear, open, setOpen }
  }, [lines, add, change, clear, open])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = () => useContext(OrderContext)

export function orderMessage(lines, total, hasAsp) {
  const rows = lines.map((l) => {
    const name = l.label ? `${l.name} (${l.label})` : l.name
    const price = l.price == null ? 'price on request' : `AED ${formatPrice(l.price * l.qty)}`
    return `${l.qty} x #${l.no} ${name} - ${price}`
  })
  return [
    'Hello Seven Stones, I would like to order:',
    '',
    ...rows,
    '',
    `Menu total: AED ${formatPrice(total)}${hasAsp ? ' + items priced on request' : ''}`,
    '',
    'Name:',
    'Delivery address:',
  ].join('\n')
}
