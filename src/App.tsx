import { useEffect, useRef, useState } from 'react'
import { moods } from './moods'
import ScentCarousel from './ScentCarousel'
import type { FormEvent, KeyboardEvent, SVGProps } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Download, Droplets, FlaskConical, Leaf, Menu, Minus, NotebookPen, Plus, X } from 'lucide-react'

const instagram = 'https://www.instagram.com/official_smeem/'
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

function Instagram({ size = 24, strokeWidth = 2, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></svg>
}

const navigation = [
  { label: '오늘의 향', href: '#your-scent' },
  { label: '스밈의 이야기', href: '#story' },
  { label: '향을 만나는 시간', href: '#experience' },
]

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#home" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="스밈 홈으로">
      <img src={asset('images/smeem-monogram.png')} width="38" height="46" alt="" />
      <span className="brand-type">SMEEM<span>PERFUME STUDIO</span></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMood, setActiveMood] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [noteOpen, setNoteOpen] = useState(false)
  const [note, setNote] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const noteTriggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const mood = moods[activeMood]

  useEffect(() => {
    const initialHash = window.location.hash
    if (!initialHash) return
    let cancelled = false
    // Fragment targets appear after React mounts; fonts can change their position.
    void document.fonts.ready.then(() => {
      if (cancelled || window.location.hash !== initialHash) return
      document.getElementById(initialHash.slice(1))?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      })
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && document.getElementById('mobile-nav')) {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  useEffect(() => {
    if (!noteOpen) return
    const previousFocus = noteTriggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setNoteOpen(false)
    }
    document.addEventListener('keydown', onEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onEscape)
      previousFocus?.focus()
    }
  }, [noteOpen])

  function trapDialogFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab') return
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button, textarea, a[href]')
    if (!focusables?.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const now = new Date()
    const noteDate = now.toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
    const contents = `스밈 — 나의 향 노트\n${now.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}\n\n오늘의 마음: ${mood.name}\n향의 인상: ${mood.family}\n떠올려 볼 향: ${mood.notes.join(' · ')}\n\n${note.trim() || mood.memory}\n\n향이 기억에 스미는 시간, 스밈\ninstagram.com/official_smeem\n\n이 노트에 오늘 떠오른 향과 마음을 간직해 보세요.\n`
    const url = URL.createObjectURL(new Blob([contents], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `스밈_나의_향_노트_${noteDate}.txt`
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setNoteSaved(true)
  }

  return (
    <>
      <div className="site" inert={noteOpen}>
        <a className="skip-link" href="#main">본문으로 바로가기</a>
        <header className="header">
          <div className="header-inner">
            <Brand />
            <nav className="desktop-nav" aria-label="주 메뉴">
              {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
            </nav>
            <a className="header-contact" href="#contact">공방 문의 <ArrowUpRight size={15} strokeWidth={1.5} /></a>
            <button className="menu-toggle" ref={menuToggleRef} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
          {menuOpen && <nav className="mobile-nav" id="mobile-nav" aria-label="모바일 주 메뉴">
            {[...navigation, { label: '공방 문의', href: '#contact' }].map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={18} /></a>)}
          </nav>}
        </header>

        <main id="main">
          <section className="hero" id="home" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow"><span className="tiny-line" /> A SCENT THAT BECOMES YOU</p>
              <h1 id="hero-title"><span className="hero-kicker">향이 기억에<br />스미는 시간,</span><span className="hero-brand">스밈</span></h1>
              <p className="hero-description">보이지 않지만, 오래 남는 것.<br />당신의 기억과 감정이 하나의 향이 되는 곳.</p>
              <a href="#your-scent" className="button button-olive">나를 닮은 향 만나보기 <ArrowUpRight size={18} strokeWidth={1.5} /></a>
              <div className="hero-bottom"><span>천천히, 깊게.<br />당신의 일상에 스며들다.</span><a href="#your-scent" aria-label="오늘의 향으로 내려가기"><span>SCROLL TO DISCOVER</span><ArrowDown size={16} strokeWidth={1} /></a></div>
            </div>
            <div className="hero-visual">
              <img src={asset('images/smeem-still-life.webp')} alt="따뜻한 햇살과 올리브 가지, 린넨 위 향수병으로 표현한 스밈의 감성 이미지" fetchPriority="high" className="hero-photo" />
              <span className="photo-topline">SMEEM · PERFUME STUDIO</span>
              <div className="hero-photo-caption"><span>Made of<br /><i>your moments.</i></span><span className="photo-index">SCENT & MEMORY<br />01 — SMEEM</span></div>
            </div>
          </section>

          <div className="brand-ribbon" aria-hidden="true"><span>SCENT</span><span className="ribbon-dot" /><span>MEMORY</span><span className="ribbon-dot" /><span>EMOTION</span><span className="ribbon-line" /><span className="ribbon-korean">향으로 스며들다</span><span className="ribbon-line" /><span>SMEEM PERFUME STUDIO</span></div>

          <section className="scent section-wrap" id="your-scent" aria-labelledby="scent-title">
            <div className="section-label"><span>01 / YOUR SCENT, YOUR STORY</span><span>오늘의 감정을 향으로 담다</span></div>
            <div className="section-heading"><div><p className="eyebrow">HOW ARE YOU FEELING TODAY?</p><h2 id="scent-title">오늘의 마음에,<br />어떤 향이 스밀까요?</h2></div><p>정답은 없습니다.<br />지금 당신의 마음에 가까운 단어를 골라보세요.</p></div>
            <ScentCarousel
              activeMood={activeMood}
              onMoodChange={setActiveMood}
              noteOpen={noteOpen}
              onOpenNote={trigger => {
                noteTriggerRef.current = trigger
                setNoteOpen(true)
                setNoteSaved(false)
              }}
            />
            <p className="scent-footnote"><Leaf size={13} strokeWidth={1.3} /> 오늘의 마음에서 향을 떠올려 보세요. 나를 닮은 향은 언제든 새롭게 발견할 수 있습니다.</p>
          </section>

          <section className="story section-wrap" id="story" aria-labelledby="story-title">
            <div className="section-label"><span>02 / OUR STORY</span><span>향이 일상에 스미는 공간</span></div>
            <div className="story-grid">
              <div className="story-heading"><p className="eyebrow">INVISIBLE, BUT UNFORGETTABLE</p><h2 id="story-title">향으로 떠오르는<br />그날의 기억.</h2><img className="story-monogram" src={asset('images/smeem-monogram.png')} width="44" height="53" alt="스밈 심벌" loading="lazy" /></div>
              <div className="story-copy"><p className="story-intro">향은 보이지 않아도 오래 남아요.</p><p>어느 날의 공기, 좋아했던 사람의 향기.<br />여행지에서 맡았던 낯선 향,<br />문득 떠오르는 어느 계절의 기억처럼.</p><p>스밈은 당신의 취향과 이야기가<br />하나의 향으로 천천히 스며드는 공간이에요.</p><p>오늘의 감정이 향이 되고,<br />그 향이 다시 당신의 기억이 되도록.</p><div className="story-signature"><span>당신의 이야기가, 당신의 향이 됩니다.</span><span className="signature">smeem</span></div></div>
            </div>
          </section>

          <section className="experience" id="experience" aria-labelledby="experience-title">
            <div className="section-wrap">
              <div className="section-label"><span>03 / THE EXPERIENCE</span><span>향을 만나는 시간</span></div>
              <div className="section-heading"><div><p className="eyebrow">MORE THAN MAKING A PERFUME</p><h2 id="experience-title">향수를 만드는 시간을 넘어,<br /><span>나를 알아가는 시간.</span></h2></div><p>정해진 답을 찾기보다, 마음이 머무는 향을 따라.<br />스밈에서 당신만의 이야기를 천천히 펼쳐보세요.</p></div>
              <div className="experience-grid">
                {[{ num: '01', icon: <NotebookPen />, title: '기억을 꺼내다', english: 'RECALL YOUR MOMENT', text: <>좋아하는 계절, 잊히지 않는 장면.<br />향으로 간직하고 싶은 기억을 떠올리다.</> }, { num: '02', icon: <Droplets />, title: '취향을 발견하다', english: 'FOLLOW YOUR SENSES', text: <>낯선 향과 익숙한 향 사이에서,<br />내 마음이 이끌리는 향을 만나보세요.</> }, { num: '03', icon: <FlaskConical />, title: '나의 향으로 담다', english: 'EXPRESS YOURSELF', text: <>서로 다른 향에 나만의 이야기를 더해,<br />오늘의 감정을 하나의 향으로 표현하다.</> }].map(step => <article className="experience-step" key={step.num}><div className="step-top"><span>{step.num}</span>{step.icon}</div><p className="eyebrow">{step.english}</p><h3>{step.title}</h3><p className="step-description">{step.text}</p></article>)}
              </div>
            </div>
          </section>

          <section className="brand-quote" aria-label="스밈의 약속"><span className="quote-mark">“</span><p><span className="quote-lead">나를 닮은 향 하나가,</span><span className="quote-line">일상을 조금 더 <em>나답게.</em></span></p><span className="eyebrow">SLOWLY, DEEPLY, INTO YOUR EVERYDAY.</span><svg viewBox="0 0 500 210" fill="none" aria-hidden="true" className="quote-lines"><ellipse cx="270" cy="142" rx="242" ry="74" stroke="currentColor" /><ellipse cx="270" cy="142" rx="210" ry="60" stroke="currentColor" /><ellipse cx="270" cy="142" rx="177" ry="46" stroke="currentColor" /></svg></section>

          <section className="faq section-wrap" aria-labelledby="faq-title">
            <div className="faq-heading"><p className="eyebrow">A LITTLE MORE ABOUT SMEEM</p><h2 id="faq-title">궁금한 이야기</h2><p>스밈을 만나기 전,<br />조금 더 가까워지는 시간.</p></div>
            <div className="faq-list">{[
              { title: '향수를 잘 몰라도 괜찮을까요?', answer: <>향을 잘 몰라도 괜찮아요. 좋아하는 풍경과 계절, 지금의 기분에서부터 천천히 시작해 보세요. 마음이 머무는 향을 따라가다 보면, 나만의 취향을 조금씩 만나게 될 거예요.</> },
              { title: '간직하고 싶은 기억은 어떤 향일까요?', answer: <>좋아하던 계절의 공기나 문득 그리운 장면을 떠올려 보세요. 그때의 온기와 기분을 따라가다 보면, 그 기억을 닮은 향이 조금씩 떠오를 거예요.</> },
              { title: '공방 소식과 방문 문의는 어디에서 하나요?', answer: <>스밈의 인스타그램에서 공방 소식을 확인하고 방문 관련 문의를 남기실 수 있어요. <a href={instagram} target="_blank" rel="noopener noreferrer">@official_smeem <ArrowUpRight size={13} /></a></> },
            ].map((item, i) => <article className={`faq-item ${openFaq === i ? 'is-open' : ''}`} key={item.title}><h3><button aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>{item.title}{openFaq === i ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}</button></h3><div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={openFaq !== i}><p>{item.answer}</p></div></article>)}</div>
          </section>

          <section className="contact" id="contact" aria-labelledby="contact-title"><div className="contact-inner"><div className="contact-heading"><p className="eyebrow">LET YOUR STORY SEEP IN</p><h2 id="contact-title"><span className="contact-lead">우리의 다음 이야기는,</span><span className="contact-emphasis">당신의 향으로.</span></h2><p>스밈의 일상과 공방 소식을 만나보세요.<br />공방에 대해 궁금한 이야기는 인스타그램으로 전해주세요.</p><a href={instagram} className="button button-cream" target="_blank" rel="noopener noreferrer"><Instagram size={18} strokeWidth={1.5} /> 인스타그램에서 스밈 만나기 <ArrowUpRight size={18} strokeWidth={1.5} /></a><span className="instagram-handle">@official_smeem</span></div><div className="contact-art" aria-hidden="true"><span className="contact-circle" /><span className="contact-circle circle-two" /><img src={asset('images/smeem-monogram.png')} width="164" height="197" alt="" loading="lazy" /><span>SCENT BECOMES MEMORY.</span></div></div></section>
        </main>

        <footer className="footer"><div className="footer-top"><Brand footer /><p>향은 보이지 않지만 천천히 스며들어<br />어느 순간 나만의 기억이 돼요.</p><a href={instagram} target="_blank" rel="noopener noreferrer" className="footer-instagram" aria-label="스밈 인스타그램 새 창으로 열기"><Instagram size={21} strokeWidth={1.4} /><ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span className="copyright">Copyright © {new Date().getFullYear()} SMEEM PERFUME STUDIO. All rights reserved.</span><span>향이 기억에 스미는 시간, 스밈.</span><a href="#home">BACK TO TOP <ArrowUpRight size={13} /></a></div></footer>
      </div>

      {noteOpen && <div className="modal-backdrop" onClick={event => { if (event.target === event.currentTarget) setNoteOpen(false) }}><div className="note-dialog" role="dialog" aria-modal="true" aria-labelledby="note-title" aria-describedby="note-description" ref={dialogRef} onKeyDown={trapDialogFocus}><button className="dialog-close" onClick={() => setNoteOpen(false)} aria-label="향 노트 닫기"><X size={22} strokeWidth={1.5} /></button><p className="eyebrow">A SMALL NOTE TO YOURSELF</p><h2 id="note-title">오늘의 나를,<br />향으로 기억하기.</h2><p className="note-mood"><span>{mood.feeling}</span>{mood.notes.join(' · ')}</p><form onSubmit={saveNote}><label htmlFor="memory-note">어떤 장면이 떠오르나요?</label><textarea id="memory-note" value={note} onChange={event => { setNote(event.target.value); setNoteSaved(false) }} placeholder={mood.memory} maxLength={600} rows={4} /><p id="note-description" className="note-privacy">이 기록은 전송되지 않아요. 나만 간직할 수 있도록<br />향 노트를 텍스트 파일로 저장해 보세요.</p><button className="button button-olive" type="submit">{noteSaved ? <Check size={17} /> : <Download size={17} />} {noteSaved ? '향 노트 다시 저장하기' : '나의 향 노트 저장하기'}<ArrowRight size={17} /></button><p className="note-status" role="status">{noteSaved ? '향 노트 파일을 만들었어요. 다운로드 목록에서 확인해 주세요.' : '\u00a0'}</p></form></div></div>}
    </>
  )
}

export default App
