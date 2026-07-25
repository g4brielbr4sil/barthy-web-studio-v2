type IntersectionHandler = (entry: IntersectionObserverEntry) => void

interface ObserverRegistry {
  handlers: Map<Element, Set<IntersectionHandler>>
  observer: IntersectionObserver
}

type ObserverRoot = Element | Document | null

const viewportRegistries = new Map<string, ObserverRegistry>()
const rootedRegistries = new WeakMap<
  Exclude<ObserverRoot, null>,
  Map<string, ObserverRegistry>
>()

function normalizeThreshold(
  threshold: IntersectionObserverInit['threshold'],
): number[] {
  if (Array.isArray(threshold)) {
    return [...threshold].sort((first, second) => first - second)
  }
  return [threshold ?? 0]
}

function getObserverKey(options: IntersectionObserverInit): string {
  return JSON.stringify({
    rootMargin: options.rootMargin ?? '0px',
    threshold: normalizeThreshold(options.threshold),
  })
}

function getRegistryStore(root: ObserverRoot): Map<string, ObserverRegistry> {
  if (!root) return viewportRegistries

  const existing = rootedRegistries.get(root)
  if (existing) return existing

  const registries = new Map<string, ObserverRegistry>()
  rootedRegistries.set(root, registries)
  return registries
}

function getObserverRegistry(
  options: IntersectionObserverInit,
): ObserverRegistry {
  const registries = getRegistryStore(options.root ?? null)
  const key = getObserverKey(options)
  const existing = registries.get(key)
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
  registries.set(key, registry)
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
  const root = options.root ?? null
  const registries = getRegistryStore(root)
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
      registries.delete(key)
      if (root && !registries.size) rootedRegistries.delete(root)
    }
  }
}
