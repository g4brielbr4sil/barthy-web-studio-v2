type IntersectionHandler = (entry: IntersectionObserverEntry) => void

const handlers = new Map<Element, Set<IntersectionHandler>>()
let sharedObserver: IntersectionObserver | null = null

function getObserver() {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        handlers.get(entry.target)?.forEach((handler) => handler(entry))
      })
    },
    {
      rootMargin: '-18% 0px -56% 0px',
      threshold: [0, 0.12, 0.18, 0.3, 0.55, 0.8],
    },
  )

  return sharedObserver
}

export function observeIntersection(
  element: Element,
  handler: IntersectionHandler,
) {
  const elementHandlers = handlers.get(element) ?? new Set()
  elementHandlers.add(handler)
  handlers.set(element, elementHandlers)
  getObserver().observe(element)

  return () => {
    const currentHandlers = handlers.get(element)
    currentHandlers?.delete(handler)

    if (!currentHandlers?.size) {
      handlers.delete(element)
      sharedObserver?.unobserve(element)
    }

    if (!handlers.size) {
      sharedObserver?.disconnect()
      sharedObserver = null
    }
  }
}
