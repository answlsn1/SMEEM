import { useEffect } from 'react'
import type { RefObject } from 'react'

const revealMedia = '(max-width: 700px) and (prefers-reduced-motion: no-preference)'
// Mirrors the observer's rootMargin (bottom -10%) and threshold (8%).
const viewportCut = 0.1
const visibleRatio = 0.08
const staggerStep = 90
const staggerMax = 4

/**
 * Reveals `[data-reveal]` elements inside `root` as they scroll into view on
 * small screens. Only elements this hook has marked `data-reveal="hidden"` are
 * ever hidden, so nothing disappears without JavaScript or when an element
 * mounts later. Elements already in view on mount are shown at once; passing
 * an element (deep link, fast fling) also shows everything above it.
 */
export function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = root.current
    if (!container || typeof IntersectionObserver === 'undefined') return

    const media = window.matchMedia(revealMedia)
    const targets = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'))
    let observer: IntersectionObserver | null = null

    const show = (target: HTMLElement, step = 0) => {
      target.style.transitionDelay = step ? `${Math.min(step, staggerMax) * staggerStep}ms` : ''
      target.dataset.reveal = 'shown'
      observer?.unobserve(target)
    }

    const isInView = (target: HTMLElement) => {
      const { top, bottom } = target.getBoundingClientRect()
      const limit = window.innerHeight * (1 - viewportCut)
      const visible = Math.min(bottom, limit) - Math.max(top, 0)
      return visible >= (bottom - top) * visibleRatio
    }

    const stop = () => {
      observer?.disconnect()
      observer = null
      for (const target of targets) {
        if (target.dataset.reveal === 'hidden') target.dataset.reveal = ''
      }
    }

    const start = () => {
      if (observer) return
      observer = new IntersectionObserver(entries => {
        // Reveal in document order, including anything scrolled past.
        const reached = Math.max(...entries.filter(entry => entry.isIntersecting).map(entry => targets.indexOf(entry.target as HTMLElement)))
        let step = 0
        for (const target of targets.slice(0, reached + 1)) {
          if (target.dataset.reveal !== 'hidden') continue
          show(target, isInView(target) ? step++ : 0)
        }
      }, { rootMargin: `0px 0px -${viewportCut * 100}% 0px`, threshold: visibleRatio })
      for (const target of targets) {
        if (target.dataset.reveal === 'shown') continue
        if (isInView(target)) {
          show(target)
          continue
        }
        target.dataset.reveal = 'hidden'
        observer.observe(target)
      }
    }

    const sync = () => {
      if (media.matches) start()
      else stop()
    }
    sync()
    media.addEventListener('change', sync)

    return () => {
      media.removeEventListener('change', sync)
      stop()
    }
  }, [root])
}
