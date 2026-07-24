type IntersectionHandler = (entry: IntersectionObserverEntry) => void

interface ObserverRegistry {
  handlers: Map<Element, Set<IntersectionHandler>>
  observer: IntersectionObserver
}

const observerRegistries = new Map<string, ObserverRegistry>()

function normalizeThreshold(
  threshold: IntersectionObserverInit['threshold'],
): number[] {
  if (Array.isArray(threshold)) return [...threshold]
  return [threshold ?? 0]
}

function getObserverKey(options: IntersectionObserverInit): string {
  return JSON.stringify({
    rootMargin: options.rootMargin ?? '0px',
    threshold: normalizeThreshold(options.threshold),
  })
}

function getObserverRegistry(
  options: IntersectionObserverInit,
): ObserverRegistry {
  const key = getObserverKey(options)
  const existing = observerRegistries.get(key)
  if (existing) return existing

  const handlers = new Map<Element, Set<IntersectionHandler>>()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        handlers.get(entry.target)?.forEach((handler) => handler(entry))
      })
    },
    options,
  )
  const registry = { handlers, observer }
  observerRegistries.set(key, registry)
  return registry
}

const defaultOptions: IntersectionObserverInit = {
  rootMargin: '-18% 0px -56% 0px',
  threshold: [0, 0.12, 0.18, 0.3, 0.55, 0.8],
}

export function observeIntersection(
  element: Element,
  handler: IntersectionHandler,
  options: IntersectionObserverInit = defaultOptions,
) {
  const key = getObserverKey(options)
  const registry = getObserverRegistry(options)
  const elementHandlers =
    registry.handlers.get(element) ?? new Set<IntersectionHandler>()
  elementHandlers.add(handler)
  registry.handlers.set(element, elementHandlers)
  registry.observer.observe(element)

  return () => {
    const currentHandlers = registry.handlers.get(element)
    currentHandlers?.delete(handler)

    if (!currentHandlers?.size) {
      registry.handlers.delete(element)
      registry.observer.unobserve(element)
    }

    if (!registry.handlers.size) {
      registry.observer.disconnect()
      observerRegistries.delete(key)
    }
  }
}
