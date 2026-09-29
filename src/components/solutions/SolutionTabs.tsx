import {
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
} from 'react'
import type { SolutionGroup } from './solution-map.types'

interface SolutionTabsProps {
  groups: SolutionGroup[]
  activeIndex: number
  onSelect: (index: number) => void
}
export function SolutionTabs({
  groups,
  activeIndex,
  onSelect,
}: SolutionTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const hasPlacedIndicatorRef = useRef(false)

  useLayoutEffect(() => {
    const moveIndicator = () => {
      const activeTab = tabRefs.current[activeIndex]
      const indicator = indicatorRef.current
      if (!activeTab || !indicator) return

      // The first placement must not slide in from the top of the list.
      const isFirstPlacement = !hasPlacedIndicatorRef.current
      if (isFirstPlacement) indicator.style.transition = 'none'

      indicator.style.transform = `translateY(${activeTab.offsetTop}px)`
      indicator.style.height = `${activeTab.offsetHeight}px`

      if (isFirstPlacement) {
        hasPlacedIndicatorRef.current = true
        // Not cancelled on cleanup: a pending restore must always land, or
        // the indicator would keep transition: none for good.
        window.requestAnimationFrame(() => {
          indicator.style.removeProperty('transition')
        })
      }
    }

    // A window resize isn't the only thing that can move a tab: late web
    // font swaps or content reflow change row heights too, and either
    // would leave the indicator sitting on stale offsetTop/offsetHeight.
    // Watching every tab button catches all of that, not just viewport width.
    if (typeof ResizeObserver === 'undefined') {
      moveIndicator()
      window.addEventListener('resize', moveIndicator, { passive: true })
      return () => window.removeEventListener('resize', moveIndicator)
    }

    // No synchronous measurement here: reading offsetTop during the commit
    // forced a full-page layout inside React's task (~200ms on a throttled
    // mobile CPU), even on mobile where the tabs are not rendered. The
    // observer's initial notification runs after layout and before paint,
    // so the indicator is still in place on the first frame.
    const observer = new ResizeObserver(moveIndicator)
    tabRefs.current.forEach((tab) => tab && observer.observe(tab))
    return () => observer.disconnect()
  }, [activeIndex, groups.length])

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % groups.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + groups.length) % groups.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = groups.length - 1
    } else {
      return
    }

    event.preventDefault()
    onSelect(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div
      className="solutions__tabs"
      role="tablist"
      aria-label="Grupos de soluções"
      aria-orientation="vertical"
    >
      <span
        ref={indicatorRef}
        className="solutions__tabs-indicator"
        aria-hidden="true"
      />
      {groups.map((group, index) => {
        const Icon = group.icon
        const selected = index === activeIndex

        return (
          <button
            key={group.id}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            id={`tab-${group.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="solutions-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <Icon size={22} aria-hidden="true" />
            <strong>{group.title}</strong>
            <small>{group.summary}</small>
          </button>
        )
      })}
    </div>
  )
}
