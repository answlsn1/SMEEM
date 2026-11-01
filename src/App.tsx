import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent, SVGProps } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Download, Droplets, FlaskConical, Leaf, Menu, Minus, NotebookPen, Plus, X } from 'lucide-react'

const instagram = 'https://www.instagram.com/official_smeem/'
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

function Instagram({ size = 24, strokeWidth = 2, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></svg>
}

const moods = [
  { name: '평온한 마음', english: 'A MOMENT OF CALM', title: '조용한 숲에 머무는 마음', description: '잠시 걸음을 늦추고 싶은 날. 나무 사이로 스치는 바람처럼, 맑고 차분한 우디의 인상을 떠올려 보세요.', family: 'GREEN & WOODY', notes: ['사이프러스', '시더우드', '모스'], memory: '바람이 머물던 숲, 오롯이 나에게 집중하던 순간.', color: '#dce0d0', accent: '#5f6b4b', feeling: '평온' },
  { name: '작은 설렘', english: 'A LITTLE NEW BEGINNING', title: '햇살처럼 번지는 설렘', description: '새로운 계절의 첫 페이지를 여는 날. 막 껍질을 벗긴 과일처럼, 산뜻하고 밝은 시트러스의 인상을 떠올려 보세요.', family: 'CITRUS & GREEN', notes: ['베르가모트', '네롤리', '페티그레인'], memory: '창을 열자 들어온 햇빛, 무언가 시작될 것 같던 아침.', color: '#eee2ba', accent: '#8d793d', feeling: '설렘' },
  { name: '다정한 위로', english: 'A SOFT PLACE TO LAND', title: '포근히 나를 안아주는 시간', description: '익숙한 온기가 필요한 날. 햇볕에 잘 마른 이불 속처럼, 부드러운 머스크와 파우더리한 인상을 떠올려 보세요.', family: 'SOFT & MUSKY', notes: ['아이리스', '머스크', '샌달우드'], memory: '따뜻한 차 한 잔, 말없이 곁을 내어주던 다정함.', color: '#e6d8cd', accent: '#937662', feeling: '위로' },
  { name: '오랜 그리움', english: 'SOMETHING THAT LINGERS', title: '마음 한편에 오래 남은 장면', description: '문득 오래된 기억이 떠오르는 날. 책 사이에 간직한 꽃잎처럼, 은은하고 깊은 플로럴의 인상을 떠올려 보세요.', family: 'FLORAL & POWDERY', notes: ['로즈', '바이올렛', '머스크'], memory: '오래된 편지 한 장, 다시 꺼내어 보고 싶은 그날.', color: '#e2d8dc', accent: '#8b6e7a', feeling: '그리움' },
]

const navigation = [
  { label: '스밈의 이야기', href: '#story' },
  { label: '향을 만나는 시간', href: '#experience' },
  { label: '오늘의 향', href: '#your-scent' },
]

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#home" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="스밈 홈으로">
      <img src={asset('images/smeem-monogram.png')} width="38" height="46" alt="" />
      <span className="brand-type">SMEEM<span>PERFUME STUDIO</span></span>
    </a>
  )
}

function ScentArtwork({ index }: { index: number }) {
  const mood = moods[index]
  return (
    <div className="scent-art" style={{ backgroundColor: mood.color, color: mood.accent }} aria-hidden="true">
      <span className="art-corner">SCENT OF YOUR MOMENT</span>
      <svg className="botanical-art" viewBox="0 0 420 380" fill="none">
        <defs>
          <radialGradient id="scent-glow"><stop stopColor="#fffdf2" stopOpacity=".9" /><stop offset="1" stopColor="#fffdf2" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="210" cy="180" r="159" fill="url(#scent-glow)" />
        <ellipse cx="210" cy="187" rx="122" ry="141" stroke="currentColor" strokeOpacity=".2" transform="rotate(25 210 187)" />
        <ellipse cx="210" cy="187" rx="122" ry="141" stroke="currentColor" strokeOpacity=".2" transform="rotate(-25 210 187)" />
        <path d="M192 326C207 271 196 239 226 189C247 155 242 103 265 63" stroke="currentColor" strokeWidth="1.5" />
        <path d="M215 211C178 212 146 194 139 164C174 163 205 180 215 211Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth=".9" />
        <path d="M231 178C260 174 284 150 287 122C258 125 238 146 231 178Z" fill="currentColor" fillOpacity=".23" stroke="currentColor" strokeWidth=".9" />
        <path d="M247 127C220 119 204 99 205 74C232 82 246 101 247 127Z" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth=".9" />
        <path d="M202 256C170 252 150 235 147 214C173 219 195 233 202 256Z" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeWidth=".9" />
        <path d="M199 277C222 276 248 259 259 235C229 237 208 252 199 277Z" fill="currentColor" fillOpacity=".14" stroke="currentColor" strokeWidth=".9" />
        <path d="M256 89C273 82 285 66 285 49C268 56 259 69 256 89Z" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeWidth=".9" />
        <circle cx="136" cy="108" r="3" fill="currentColor" fillOpacity=".4" />
        <circle cx="296" cy="232" r="2" fill="currentColor" fillOpacity=".4" />
      </svg>
      <div className="art-caption"><span>No. 0{index + 1}</span><span>{mood.family}</span></div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMood, setActiveMood] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [noteOpen, setNoteOpen] = useState(false)
  const [note, setNote] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)
  const moodRefs = useRef<(HTMLButtonElement | null)[]>([])
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const noteTriggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const mood = moods[activeMood]

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

  function changeMood(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % moods.length
    else if (event.key === 'ArrowLeft') next = (index + moods.length - 1) % moods.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = moods.length - 1
    else return
    event.preventDefault()
    setActiveMood(next)
    moodRefs.current[next]?.focus()
  }

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
    const contents = `스밈 — 나의 향 노트\n${now.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}\n\n오늘의 마음: ${mood.name}\n향의 인상: ${mood.family}\n떠올려 볼 향: ${mood.notes.join(' · ')}\n\n${note.trim() || mood.memory}\n\n향이 기억에 스미는 시간, 스밈\ninstagram.com/official_smeem\n\n이 노트는 향의 인상을 기록하는 개인 메모입니다.\n`
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
        <header className="header" id="home">
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
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow"><span className="tiny-line" /> A SCENT THAT BECOMES YOU</p>
              <h1 id="hero-title">향이 기억에<br />스미는 시간,<br /><span>스밈.</span></h1>
              <p className="hero-description">보이지 않지만, 오래 남는 것.<br />당신의 기억과 감정이 하나의 향이 되는 곳.</p>
              <a href="#your-scent" className="button button-olive">나를 닮은 향 만나보기 <ArrowUpRight size={18} strokeWidth={1.5} /></a>
              <div className="hero-bottom"><span>천천히, 깊게.<br />당신의 일상에 스며듭니다.</span><a href="#story" aria-label="스밈의 이야기로 내려가기"><span>SCROLL TO DISCOVER</span><ArrowDown size={16} strokeWidth={1} /></a></div>
            </div>
            <div className="hero-visual">
              <img src={asset('images/smeem-still-life.webp')} alt="따뜻한 햇살과 올리브 가지, 린넨 위 향수병으로 표현한 스밈의 감성 이미지" fetchPriority="high" className="hero-photo" />
              <span className="photo-topline">SMEEM · PERFUME STUDIO</span>
              <div className="hero-photo-caption"><span>Made of<br /><i>your moments.</i></span><span className="photo-index">SCENT & MEMORY<br />01 — SMEEM</span></div>
            </div>
          </section>

          <div className="brand-ribbon" aria-hidden="true"><span>SCENT</span><span className="ribbon-dot" /><span>MEMORY</span><span className="ribbon-dot" /><span>EMOTION</span><span className="ribbon-line" /><span className="ribbon-korean">향으로 스며드는 나</span><span className="ribbon-line" /><span>SMEEM PERFUME STUDIO</span></div>

          <section className="story section-wrap" id="story" aria-labelledby="story-title">
            <div className="section-label"><span>01 / OUR STORY</span><span>향이 일상에 스미는 공간</span></div>
            <div className="story-grid">
              <div className="story-heading"><p className="eyebrow">INVISIBLE, BUT UNFORGETTABLE</p><h2 id="story-title">어떤 향은,<br />우리를 그날로<br />데려갑니다.</h2><img className="story-monogram" src={asset('images/smeem-monogram.png')} width="44" height="53" alt="스밈 심벌" loading="lazy" /></div>
              <div className="story-copy"><p className="story-intro">향은 보이지 않지만 오래 남습니다.</p><p>어느 날의 공기, 좋아했던 사람의 향기.<br />여행지에서 맡았던 낯선 향,<br />문득 떠오르는 어느 계절의 기억처럼.</p><p>스밈은 당신의 취향과 이야기가<br />하나의 향으로 천천히 스며드는 공간입니다.</p><p>오늘의 감정이 향이 되고,<br />그 향이 다시 당신의 기억이 되도록.</p><div className="story-signature"><span>당신의 이야기가, 당신의 향이 됩니다.</span><span className="signature">smeem</span></div></div>
            </div>
          </section>

          <section className="experience" id="experience" aria-labelledby="experience-title">
            <div className="section-wrap">
              <div className="section-label"><span>02 / THE EXPERIENCE</span><span>향을 만나는 시간</span></div>
              <div className="section-heading"><div><p className="eyebrow">MORE THAN MAKING A PERFUME</p><h2 id="experience-title">향수를 만드는 시간을 넘어,<br /><span>나를 알아가는 시간.</span></h2></div><p>정해진 답을 찾기보다, 마음이 머무는 향을 따라.<br />스밈에서 당신만의 이야기를 천천히 펼쳐보세요.</p></div>
              <div className="experience-grid">
                {[{ num: '01', icon: <NotebookPen />, title: '기억을 꺼내다', english: 'RECALL YOUR MOMENT', text: <>좋아하는 계절, 잊히지 않는 장면.<br />향으로 간직하고 싶은 기억을 떠올려요.</> }, { num: '02', icon: <Droplets />, title: '취향을 발견하다', english: 'FOLLOW YOUR SENSES', text: <>낯선 향과 익숙한 향 사이에서,<br />내 마음이 이끌리는 향을 만나보세요.</> }, { num: '03', icon: <FlaskConical />, title: '나의 향으로 담다', english: 'EXPRESS YOURSELF', text: <>서로 다른 향에 나만의 이야기를 더해,<br />오늘의 감정을 하나의 향으로 표현해요.</> }].map(step => <article className="experience-step" key={step.num}><div className="step-top"><span>{step.num}</span>{step.icon}</div><p className="eyebrow">{step.english}</p><h3>{step.title}</h3><p className="step-description">{step.text}</p></article>)}
              </div>
            </div>
          </section>

          <section className="scent section-wrap" id="your-scent" aria-labelledby="scent-title">
            <div className="section-label"><span>03 / YOUR SCENT, YOUR STORY</span><span>오늘의 감정을 향으로 담다</span></div>
            <div className="section-heading"><div><p className="eyebrow">HOW ARE YOU FEELING TODAY?</p><h2 id="scent-title">오늘의 마음에,<br />어떤 향이 스밀까요?</h2></div><p>정답은 없어요.<br />지금 당신의 마음에 가까운 단어를 골라보세요.</p></div>
            <div className="mood-tabs" role="tablist" aria-label="오늘의 마음 선택">{moods.map((item, i) => <button key={item.name} id={`mood-tab-${i}`} role="tab" aria-selected={activeMood === i} aria-controls="mood-panel" tabIndex={activeMood === i ? 0 : -1} ref={el => { moodRefs.current[i] = el }} onClick={() => setActiveMood(i)} onKeyDown={event => changeMood(event, i)}><span className="mood-number">0{i + 1}</span>{item.name}<span className="mood-indicator">{activeMood === i ? <Minus size={17} /> : <Plus size={17} />}</span></button>)}</div>
            <div className="mood-panel" id="mood-panel" role="tabpanel" aria-labelledby={`mood-tab-${activeMood}`} tabIndex={0}>
              <ScentArtwork index={activeMood} />
              <div className="mood-copy" key={mood.name}><p className="eyebrow">{mood.english}</p><h3>{mood.title}</h3><p className="mood-description">{mood.description}</p><div className="scent-notes"><span>떠올려 볼 향</span><div>{mood.notes.map(note => <span key={note}>{note}</span>)}</div></div><button className="text-link" onClick={event => { noteTriggerRef.current = event.currentTarget; setNoteOpen(true); setNoteSaved(false) }}>이 마음, 향 노트에 담기 <ArrowUpRight size={18} strokeWidth={1.5} /></button></div>
            </div>
            <p className="scent-footnote"><Leaf size={13} strokeWidth={1.3} /> 감정에서 떠올려 보는 향의 이야기입니다. 나의 취향은 언제든 새롭게 발견할 수 있어요.</p>
          </section>

          <section className="brand-quote" aria-label="스밈의 약속"><span className="quote-mark">“</span><p>나를 닮은 향 하나가,<br />일상을 조금 더 <em>나답게.</em></p><span className="eyebrow">SLOWLY, DEEPLY, INTO YOUR EVERYDAY.</span><svg viewBox="0 0 500 210" fill="none" aria-hidden="true" className="quote-lines"><ellipse cx="270" cy="142" rx="242" ry="74" stroke="currentColor" /><ellipse cx="270" cy="142" rx="210" ry="60" stroke="currentColor" /><ellipse cx="270" cy="142" rx="177" ry="46" stroke="currentColor" /></svg></section>

          <section className="faq section-wrap" aria-labelledby="faq-title">
            <div className="faq-heading"><p className="eyebrow">A LITTLE MORE ABOUT SMEEM</p><h2 id="faq-title">궁금한 이야기</h2><p>스밈을 만나기 전,<br />조금 더 가까워지는 시간.</p></div>
            <div className="faq-list">{[
              { title: '향수를 잘 몰라도 괜찮을까요?', answer: <>향에 대한 지식보다 중요한 건 나의 느낌입니다. 좋아하는 풍경과 계절, 지금의 기분에서부터 천천히 시작해 보세요. 스밈은 나만의 취향을 발견하는 시간을 소중히 생각합니다.</> },
              { title: '공방 소식과 방문 문의는 어디에서 하나요?', answer: <>스밈의 인스타그램에서 공방 소식을 확인하고 방문 관련 문의를 남기실 수 있어요. <a href={instagram} target="_blank" rel="noopener noreferrer">@official_smeem <ArrowUpRight size={13} /></a></> },
              { title: '홈페이지에서 향수를 구매할 수 있나요?', answer: <>이곳은 스밈의 브랜드와 향에 대한 이야기를 전하는 공간입니다. 현재 홈페이지에서는 제품 판매와 결제를 제공하지 않습니다.</> },
            ].map((item, i) => <article className={`faq-item ${openFaq === i ? 'is-open' : ''}`} key={item.title}><h3><button aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>{item.title}{openFaq === i ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}</button></h3><div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={openFaq !== i}><p>{item.answer}</p></div></article>)}</div>
          </section>

          <section className="contact" id="contact" aria-labelledby="contact-title"><div className="contact-inner"><div className="contact-heading"><p className="eyebrow">LET YOUR STORY SEEP IN</p><h2 id="contact-title">우리의 다음 이야기는,<br />당신의 향으로.</h2><p>스밈의 일상과 공방 소식을 만나보세요.<br />공방에 대해 궁금한 이야기는 인스타그램으로 전해주세요.</p><a href={instagram} className="button button-cream" target="_blank" rel="noopener noreferrer"><Instagram size={18} strokeWidth={1.5} /> 인스타그램에서 스밈 만나기 <ArrowUpRight size={18} strokeWidth={1.5} /></a><span className="instagram-handle">@official_smeem</span></div><div className="contact-art" aria-hidden="true"><span className="contact-circle" /><span className="contact-circle circle-two" /><img src={asset('images/smeem-monogram.png')} width="164" height="197" alt="" loading="lazy" /><span>SCENT BECOMES MEMORY.</span></div></div></section>
        </main>

        <footer className="footer"><div className="footer-top"><Brand footer /><p>향은 보이지 않지만 천천히 스며들어<br />어느 순간 나만의 기억이 됩니다.</p><a href={instagram} target="_blank" rel="noopener noreferrer" className="footer-instagram" aria-label="스밈 인스타그램 새 창으로 열기"><Instagram size={21} strokeWidth={1.4} /><ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SMEEM PERFUME STUDIO</span><span>향이 기억에 스미는 시간, 스밈.</span><a href="#home">BACK TO TOP <ArrowUpRight size={13} /></a></div></footer>
      </div>

      {noteOpen && <div className="modal-backdrop" onClick={event => { if (event.target === event.currentTarget) setNoteOpen(false) }}><div className="note-dialog" role="dialog" aria-modal="true" aria-labelledby="note-title" aria-describedby="note-description" ref={dialogRef} onKeyDown={trapDialogFocus}><button className="dialog-close" onClick={() => setNoteOpen(false)} aria-label="향 노트 닫기"><X size={22} strokeWidth={1.5} /></button><p className="eyebrow">A SMALL NOTE TO YOURSELF</p><h2 id="note-title">오늘의 나를,<br />향으로 기억하기.</h2><p className="note-mood"><span>{mood.feeling}</span>{mood.notes.join(' · ')}</p><form onSubmit={saveNote}><label htmlFor="memory-note">어떤 장면이 떠오르나요?</label><textarea id="memory-note" value={note} onChange={event => { setNote(event.target.value); setNoteSaved(false) }} placeholder={mood.memory} maxLength={600} rows={4} /><p id="note-description" className="note-privacy">이 기록은 전송되지 않아요. 나만 간직할 수 있도록<br />향 노트를 텍스트 파일로 저장해 보세요.</p><button className="button button-olive" type="submit">{noteSaved ? <Check size={17} /> : <Download size={17} />} {noteSaved ? '향 노트 다시 저장하기' : '나의 향 노트 저장하기'}<ArrowRight size={17} /></button><p className="note-status" role="status">{noteSaved ? '향 노트 파일을 만들었어요. 다운로드 목록에서 확인해 주세요.' : '\u00a0'}</p></form></div></div>}
    </>
  )
}

export default App
