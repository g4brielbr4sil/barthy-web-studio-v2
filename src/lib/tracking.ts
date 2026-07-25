export type TrackingEventName = 'cta_click'

export interface CtaClickPayload {
  source: string
  destination: string
}

/**
 * Contrato local de tracking. Nesta fase não há analytics, cookies,
 * armazenamento ou requests externos.
 */
export function trackEvent(
  event: TrackingEventName,
  payload: CtaClickPayload,
): void {
  if (typeof window === 'undefined') return
  if (document.documentElement.dataset.visualMode === 'static') return

  window.dispatchEvent(
    new CustomEvent('barthy:track', {
      detail: { event, ...payload },
    }),
  )
}
