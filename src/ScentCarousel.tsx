import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent, TransitionEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { moods } from './moods'

type ScentCarouselProps = {
  activeMood: number
  onMoodChange: (index: number) => void
  onOpenNote: (trigger: HTMLButtonElement) => void
  noteOpen: boolean
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const interval = 3000
const slides = [
  { index: moods.length - 1, clone: true, key: 'last-clone' },
  ...moods.map((item, index) => ({ index, clone: false, key: item.image })),
  { index: 0, clone: true, key: 'first-clone' },
]

export default function ScentCarousel({ activeMood, onMoodChange, onOpenNote, noteOpen }: ScentCarouselProps) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [autoplayEnabled, setAutoplayEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [focusPaused, setFocusPaused] = useState(false)
  const [touching, setTouching] = useState(false)
  const [manualRevision, setManualRevision] = useState(0)
  const [track, setTrack] = useState({ position: activeMood + 1, animate: false })
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const previousMood = useRef(activeMood)
  const currentMood = useRef(activeMood)
  const transitioning = useRef(false)
  const transitionFallback = useRef<number | undefined>(undefined)
  const playing = autoplayEnabled && inView && pageVisible && !hoverPaused && !focusPaused && !touching && !noteOpen
  const mood = moods[activeMood]

  const finishMovement = useCallback(() => {
    window.clearTimeout(transitionFallback.current)
    transitioning.current = false
    // A clone and its real slide are identical; rebase without a visible move.
    setTrack({ position: currentMood.current + 1, animate: false })
  }, [])

  useLayoutEffect(() => {
    const previous = previousMood.current
    previousMood.current = activeMood
    currentMood.current = activeMood
    if (reducedMotion) {
      finishMovement()
      return
    }
    if (previous === activeMood) return
    window.clearTimeout(transitionFallback.current)
    // Rapid selections settle directly instead of animating across the whole strip.
    const animate = !transitioning.current
    let position = activeMood + 1
    if (animate && previous === moods.length - 1 && activeMood === 0) position = moods.length + 1
    else if (animate && previous === 0 && activeMood === moods.length - 1) position = 0
    transitioning.current = animate
    setTrack({ position, animate })
    if (animate) transitionFallback.current = window.setTimeout(finishMovement, 850)
  }, [activeMood, reducedMotion, finishMovement])

  useEffect(() => () => window.clearTimeout(transitionFallback.current), [])

  useEffect(() => {
    const node = carouselRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= .2), { threshold: [0, .2] })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden)
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => {
      setReducedMotion(motionPreference.matches)
      if (motionPreference.matches) setAutoplayEnabled(false)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    motionPreference.addEventListener('change', onMotionChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionPreference.removeEventListener('change', onMotionChange)
    }
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => onMoodChange((activeMood + 1) % moods.length), interval)
    return () => window.clearTimeout(timer)
  }, [activeMood, manualRevision, onMoodChange, playing])

  function onTrackTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && event.propertyName === 'transform') finishMovement()
  }

  function selectMood(index: number) {
    setManualRevision(value => value + 1)
    onMoodChange((index + moods.length) % moods.length)
  }

  function togglePlayback() {
    if (autoplayEnabled) {
      setAutoplayEnabled(false)
    } else {
      // Explicit Play takes precedence over the control's own hover and focus.
      setHoverPaused(false)
      setFocusPaused(false)
      setManualRevision(value => value + 1)
      setAutoplayEnabled(true)
    }
  }

  function onControlKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next: number
    if (event.key === 'ArrowRight') next = activeMood + 1
    else if (event.key === 'ArrowLeft') next = activeMood - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = moods.length - 1
    else return
    event.preventDefault()
    selectMood(next)
  }

  function onSwipeStart(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'touch' || !event.isPrimary) return
    touchStart.current = { x: event.clientX, y: event.clientY }
    setTouching(true)
  }

  function onSwipeEnd(event: PointerEvent<HTMLDivElement>) {
    const start = touchStart.current
    touchStart.current = null
    setTouching(false)
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) selectMood(activeMood + (dx < 0 ? 1 : -1))
  }

  return (
    <div
      className="scent-carousel"
      data-reveal=""
      ref={carouselRef}
      role="region"
      aria-roledescription="캐러셀"
      aria-label="오늘의 향 슬라이드"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={event => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setFocusPaused(false)
      }}
    >
      <div className="carousel-toolbar" onKeyDown={onControlKeyDown}>
        <div className="carousel-current"><span className="carousel-count">{String(activeMood + 1).padStart(2, '0')}<span> / {String(moods.length).padStart(2, '0')}</span></span><span className="carousel-mood-name">{mood.name}</span></div>
        <div className="carousel-actions">
          <button type="button" className="carousel-control" aria-label="이전 향 보기" aria-controls="scent-carousel-slides" onClick={() => selectMood(activeMood - 1)}><ArrowLeft size={18} strokeWidth={1.4} /></button>
          <button type="button" className="carousel-control" aria-label={autoplayEnabled ? '자동 재생 정지' : '자동 재생 시작'} aria-controls="scent-carousel-slides" onClick={togglePlayback}>{autoplayEnabled ? <Pause size={16} strokeWidth={1.4} /> : <Play size={16} strokeWidth={1.4} />}</button>
          <button type="button" className="carousel-control" aria-label="다음 향 보기" aria-controls="scent-carousel-slides" onClick={() => selectMood(activeMood + 1)}><ArrowRight size={18} strokeWidth={1.4} /></button>
        </div>
      </div>
      <div
        className="carousel-window"
        id="scent-carousel-slides"
        aria-live={playing ? 'off' : 'polite'}
        aria-atomic="false"
        onPointerDown={onSwipeStart}
        onPointerUp={onSwipeEnd}
        onPointerCancel={() => { touchStart.current = null; setTouching(false) }}
      >
        <div className="carousel-track" data-animated={track.animate} style={{ transform: `translateX(-${track.position * 100}%)` }} onTransitionEnd={onTrackTransitionEnd}>
          {slides.map(({ index, clone, key }) => {
            const item = moods[index]
            const visible = !clone && index === activeMood
            return (
            <div className="mood-panel carousel-slide" key={key} data-clone={clone || undefined} role={clone ? undefined : 'group'} aria-roledescription={clone ? undefined : '슬라이드'} aria-label={clone ? undefined : `${index + 1} / ${moods.length}, ${item.name}`} aria-hidden={!visible} inert={!visible || track.animate}>
              <div className="scent-art">
                <img className="scent-image" src={asset(`images/moods/${item.image}`)} alt={item.imageAlt} style={{ objectPosition: item.imagePosition }} width="1100" height="1100" loading={inView ? 'eager' : 'lazy'} decoding="async" />
                <span className="art-corner">SCENT OF YOUR MOMENT</span>
                <div className="art-caption"><span>No. 0{index + 1}</span><span>{item.family}</span></div>
              </div>
              <div className="mood-copy">
                <p className="eyebrow">{item.english}</p>
                <h3>{item.title}</h3>
                <p className="mood-description">{item.description}</p>
                <div className="scent-notes"><span>떠올려 볼 향</span><div>{item.notes.map(note => <span key={note}>{note}</span>)}</div></div>
                <button type="button" className="text-link" tabIndex={clone ? -1 : undefined} onClick={event => onOpenNote(event.currentTarget)}>이 마음, 향 노트에 담기 <ArrowUpRight size={18} strokeWidth={1.5} /></button>
              </div>
            </div>
          )})}
        </div>
      </div>
      <div className="carousel-pagination" role="group" aria-label="향 슬라이드 선택" onKeyDown={onControlKeyDown}>
        {moods.map((item, index) => <button key={item.name} type="button" aria-label={`${item.name} 보기`} aria-current={index === activeMood ? 'true' : undefined} aria-controls="scent-carousel-slides" onClick={() => selectMood(index)}><span aria-hidden="true" /></button>)}
      </div>
    </div>
  )
}
