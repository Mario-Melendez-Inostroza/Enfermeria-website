import { useState, useEffect } from 'react'

const WHATSAPP_NUMBER = '56978649964'
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`
const wa = (msg: string) =>
  `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`

const HERO_IMG = '/images/hero.png'

// ── Icons ────────────────────────────────────────────────────────────────────

function IconPain() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  )
}

function IconCare() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function IconBandage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)" />
      <circle cx="9" cy="9" r="1" transform="rotate(45 12 12)" />
      <circle cx="15" cy="15" r="1" transform="rotate(45 12 12)" />
    </svg>
  )
}

function IconSyringe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M18 3l3 3-2 2-3-3z" />
      <path d="M19 4l-9.5 9.5" />
      <path d="M14 6l4 4" />
      <path d="M12 8l4 4" />
      <path d="M9.5 13.5L4 19l-1 3 3-1 5.5-5.5" />
    </svg>
  )
}

function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="8" y="3" width="8" height="4" rx="1" />
      <path d="M8 13l2.5 2.5L16 10" />
    </svg>
  )
}

function IconVial() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M9 2h6" />
      <path d="M10 2v8.5L4.5 19a2 2 0 001.7 3h11.6a2 2 0 001.7-3L14 10.5V2" />
      <path d="M6 16h12" />
    </svg>
  )
}

function IconDroplet() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 2.69s6 7.2 6 11.31a6 6 0 01-12 0c0-4.11 6-11.31 6-11.31z" />
    </svg>
  )
}

function IconBloodDrop() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 2.69s6 7.2 6 11.31a6 6 0 01-12 0c0-4.11 6-11.31 6-11.31z" />
      <path d="M9.5 14a2.5 2.5 0 002.5 2.5" />
    </svg>
  )
}

function IconIVBag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M8 2h8l1 5H7z" />
      <rect x="6" y="7" width="12" height="11" rx="2" />
      <path d="M12 11v4" />
      <path d="M10 21l2-3 2 3" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconWhatsApp({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// ── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2DB9A0, #5B9BD5)' }}>
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4-4h-2V8h2v4zm0 4h-2v-2h2v2z" />
              <path d="M11 6h2v2h-2zM13 10h2v2h-2z" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg group-hover:text-teal-600 transition-colors"
              style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
              Salud y Estética
            </div>
            <div className="text-xs text-gray-500 font-body -mt-0.5">en tu Hogar</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-gray-600 hover:text-teal-600 transition-colors text-sm font-medium"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA button */}
        <a
          href={wa('Hola, me gustaría agendar una atención de enfermería a domicilio.')}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: '#25D366', fontFamily: 'Outfit, sans-serif' }}
        >
          <IconWhatsApp className="w-4 h-4" />
          Agendar por WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-teal-50 transition-colors"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-teal-600 text-base font-medium py-1 transition-colors"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {label}
            </a>
          ))}
          <a
            href={wa('Hola, me gustaría agendar una atención de enfermería a domicilio.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold transition-all"
            style={{ background: '#25D366', fontFamily: 'Outfit, sans-serif' }}
          >
            <IconWhatsApp className="w-5 h-5" />
            Agendar por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="inicio" className="pt-20 min-h-screen flex items-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0faf8 0%, #EBF3FB 50%, #f8f4f0 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#2DB9A0' }} />
      <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: '#5B9BD5' }} />

      <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ background: '#d6f2ed', color: '#1d766d', fontFamily: 'Outfit, sans-serif' }}>
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" style={{ background: '#2DB9A0' }} />
            Disponible en Santiago
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900"
            style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b', lineHeight: 1.15 }}>
            Cuidado profesional,<br />
            <span style={{ color: '#2DB9A0' }}>en la tranquilidad</span><br />
            de tu hogar
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8"
            style={{ fontFamily: 'Outfit, sans-serif', color: '#4a6663' }}>
            Atención de enfermería a domicilio con un trato humano, cercano
            y a precios accesibles. Cuidamos de ti y de quienes más quieres.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {['Atención a domicilio', 'Trato personalizado', 'Precios accesibles'].map(item => (
              <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm text-sm font-medium"
                style={{ color: '#1d766d', fontFamily: 'Outfit, sans-serif' }}>
                <span className="text-teal-500" style={{ color: '#2DB9A0' }}>✓</span>
                {item}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={wa('Hola, necesito solicitar una atención de enfermería a domicilio.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-95 shadow-lg"
              style={{ background: '#25D366', fontFamily: 'Outfit, sans-serif', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}
            >
              <IconWhatsApp className="w-5 h-5" />
              Solicitar atención por WhatsApp
            </a>
            <a
              href="#servicios"
              className="flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-base transition-all hover:bg-teal-50 border-2"
              style={{ color: '#2DB9A0', borderColor: '#2DB9A0', fontFamily: 'Outfit, sans-serif' }}
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative md:-translate-y-5">
          {/* Ambient contact shadow — grounds the cutout instead of leaving it "floating" */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-1/2 h-3 -z-10 blur-xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(26,46,43,0.14) 0%, transparent 75%)' }} />
          <img
            src={HERO_IMG}
            alt="Enfermera tomando la presión a un paciente adulto joven"
            className="w-full h-auto max-h-[540px] mx-auto object-contain"
          />
          {/* Floating card */}
          <div className="absolute -bottom-16 -left-3 sm:-left-5 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 max-w-52">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#d6f2ed' }}>
              <span style={{ color: '#2DB9A0' }}>🏠</span>
            </div>
            <div>
              <div className="text-xs text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Atención en</div>
              <div className="font-semibold text-sm" style={{ color: '#1a2e2b', fontFamily: 'Outfit, sans-serif' }}>Tu propio hogar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Servicios ─────────────────────────────────────────────────────────────────

type ServiceItem = {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
  iconColor: string
}

function ServiceGroup({
  id,
  eyebrow,
  title,
  services,
  background,
  cols,
}: {
  id?: string
  eyebrow: string
  title: string
  services: ServiceItem[]
  background: string
  cols: string
}) {
  return (
    <section id={id} className="py-20" style={{ background }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: '#d6f2ed', color: '#1d766d', fontFamily: 'Outfit, sans-serif' }}>
            {eyebrow}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
            {title}
          </h2>
        </div>

        <div className={`grid ${cols} gap-6 mb-10`}>
          {services.map(({ icon, title: cardTitle, desc, color, iconColor }) => (
            <div key={cardTitle}
              className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ background: color }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white"
                style={{ background: iconColor }}>
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
                {cardTitle}
              </h3>
              <p className="text-gray-600 leading-relaxed flex-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Todo en la comodidad de tu hogar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
          <p className="text-lg font-semibold text-center" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
            Todo en la comodidad de tu hogar
          </p>
          <a
            href={wa(`Hola, me gustaría consultar por los ${title.toLowerCase()}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
            style={{ background: '#25D366', color: 'white', fontFamily: 'Outfit, sans-serif' }}
          >
            <IconWhatsApp className="w-4 h-4" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function NursingServicesSection() {
  const services: ServiceItem[] = [
    {
      icon: <IconBandage />,
      title: 'Curaciones',
      desc: 'Curaciones de heridas realizadas con técnica profesional en la comodidad de tu hogar.',
      color: '#EBF3FB',
      iconColor: '#5B9BD5',
    },
    {
      icon: <IconSyringe />,
      title: 'Inyecciones a domicilio',
      desc: 'Administración de inyecciones y tratamientos indicados por tu médico, sin salir de casa.',
      color: '#f0faf8',
      iconColor: '#2DB9A0',
    },
    {
      icon: <IconClipboard />,
      title: 'Controles',
      desc: 'Control de signos vitales y seguimiento de tu estado de salud de forma periódica.',
      color: '#EBF3FB',
      iconColor: '#5B9BD5',
    },
    {
      icon: <IconPain />,
      title: 'Manejo del dolor',
      desc: 'Acompañamiento y cuidados de enfermería orientados al bienestar, comodidad y manejo indicado del dolor del paciente.',
      color: '#f0faf8',
      iconColor: '#2DB9A0',
    },
    {
      icon: <IconCare />,
      title: 'Cuidado de enfermos',
      desc: 'Apoyo y cuidados de enfermería para personas que necesitan asistencia en su hogar, entregando tranquilidad tanto al paciente como a su familia.',
      color: '#EBF3FB',
      iconColor: '#5B9BD5',
    },
    {
      icon: <IconVial />,
      title: 'Toma de muestra a domicilio',
      desc: 'Toma de muestras de laboratorio en tu hogar, con traslado seguro para su análisis.',
      color: '#f0faf8',
      iconColor: '#2DB9A0',
    },
  ]

  return (
    <ServiceGroup
      id="servicios"
      eyebrow="Lo que ofrezco"
      title="Servicios Enfermería"
      services={services}
      background="#f8fcfa"
      cols="sm:grid-cols-2 lg:grid-cols-3"
    />
  )
}

function AestheticServicesSection() {
  const services: ServiceItem[] = [
    {
      icon: <IconDroplet />,
      title: 'Toxina botulínica (Botox)',
      desc: 'Aplicación de toxina botulínica para suavizar líneas de expresión, en un ambiente cómodo y seguro.',
      color: '#EBF3FB',
      iconColor: '#5B9BD5',
    },
    {
      icon: <IconBloodDrop />,
      title: 'Ácido hialurónico',
      desc: 'Tratamientos con ácido hialurónico para hidratar y realzar de forma natural.',
      color: '#f0faf8',
      iconColor: '#2DB9A0',
    },
    {
      icon: <IconVial />,
      title: 'Plasma rico en plaquetas',
      desc: 'Tratamiento regenerativo con plasma rico en plaquetas para el cuidado de la piel.',
      color: '#EBF3FB',
      iconColor: '#5B9BD5',
    },
    {
      icon: <IconIVBag />,
      title: 'Sueroterapia (vitaminas a la vena)',
      desc: 'Sueros vitamínicos administrados por vía endovenosa para reforzar tu bienestar.',
      color: '#f0faf8',
      iconColor: '#2DB9A0',
    },
  ]

  return (
    <ServiceGroup
      id="servicios-esteticos"
      eyebrow="Belleza y bienestar"
      title="Servicios Estéticos"
      services={services}
      background="#ffffff"
      cols="sm:grid-cols-2"
    />
  )
}

// ── Sobre mí ──────────────────────────────────────────────────────────────────

function AboutSection() {
  const trust = [
    'Atención personalizada',
    'Compromiso con cada paciente',
    'Atención profesional',
    'Cuidado con respeto y empatía',
  ]

  return (
    <section id="sobre-mi" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-5">
        {/* Text */}
        <div>
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ background: '#EBF3FB', color: '#5B9BD5', fontFamily: 'Outfit, sans-serif' }}>
            Sobre mí
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
            Una atención más humana y cercana
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Soy una enfermera dedicada a entregar atención y cuidados a domicilio. Mi propósito
            es acompañar a cada paciente y su familia con respeto, responsabilidad y cercanía,
            facilitando el acceso a cuidados profesionales desde la comodidad de su hogar.
          </p>
          <ul className="space-y-3">
            {trust.map(item => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: '#2DB9A0' }}>
                  <IconCheck />
                </div>
                <span className="text-gray-700 font-medium" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ── Cobertura ─────────────────────────────────────────────────────────────────

const COMUNAS = [
  'La Cisterna',
  'San Miguel',
  'Cerrillos',
  'El Bosque',
  'San Joaquín',
  'Santiago Centro',
]

function CoverageSection() {
  return (
    <section id="cobertura" className="py-20" style={{ background: 'linear-gradient(135deg, #1a2e2b 0%, #1d766d 100%)' }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontFamily: 'Outfit, sans-serif' }}>
            Zona de atención
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            Atención a domicilio en tu comuna
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Outfit, sans-serif' }}>
            Actualmente realizo atenciones domiciliarias en distintos sectores de Santiago.
          </p>
        </div>

        {/* Comunas grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {COMUNAS.map(comuna => (
            <div key={comuna}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200">
              <span style={{ color: '#77cec2' }}>
                <IconPin />
              </span>
              <span className="text-white font-medium" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem' }}>
                {comuna}
              </span>
            </div>
          ))}
        </div>

        {/* ¿Tu comuna no aparece? */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            ¿Vives cerca pero tu comuna no aparece?
          </h3>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Outfit, sans-serif' }}>
            Consúltame directamente para revisar disponibilidad.
          </p>
          <a
            href={wa('Hola, quiero saber si realizas atención domiciliaria en mi comuna.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#25D366', fontFamily: 'Outfit, sans-serif' }}
          >
            <IconWhatsApp className="w-5 h-5" />
            Consultar cobertura por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Cómo solicitar ────────────────────────────────────────────────────────────

function HowSection() {
  const steps = [
    {
      num: '1',
      title: 'Escríbeme',
      desc: 'Contáctame directamente por WhatsApp. Estoy disponible para responder tus dudas.',
    },
    {
      num: '2',
      title: 'Cuéntame qué necesitas',
      desc: 'Indícame el tipo de atención, tu comuna y la situación del paciente.',
    },
    {
      num: '3',
      title: 'Coordinamos la visita',
      desc: 'Confirmamos disponibilidad, horario y valor antes de realizar la atención.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
            ¿Cómo solicitar una atención?
          </h2>
          <p className="text-lg text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Tres pasos simples, rápidos y transparentes.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5"
            style={{ background: 'linear-gradient(90deg, #2DB9A0, #5B9BD5)' }} />

          {steps.map(({ num, title, desc }) => (
            <div key={num} className="relative flex flex-col items-center text-center p-8 rounded-3xl border"
              style={{ borderColor: '#d6f2ed', background: '#f0faf8' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-md relative z-10"
                style={{ background: 'linear-gradient(135deg, #2DB9A0, #5B9BD5)', fontFamily: 'Fraunces, Georgia, serif' }}>
                {num}
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Emocional ─────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #f0faf8, #EBF3FB)' }}>
      <div className="max-w-2xl mx-auto px-5 text-center">
        <div className="text-5xl mb-6">🏡</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
          El cuidado que necesitas, sin salir de casa
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Conversemos sobre la atención que necesitas para ti o para un familiar.
        </p>
        <a
          href={wa('Hola, me gustaría hablar sobre una atención de enfermería a domicilio.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white text-lg font-semibold transition-all hover:opacity-90 active:scale-95 shadow-xl"
          style={{ background: '#25D366', fontFamily: 'Outfit, sans-serif', boxShadow: '0 8px 30px rgba(37,211,102,0.4)' }}
        >
          <IconWhatsApp className="w-6 h-6" />
          Hablar por WhatsApp
        </a>
      </div>
    </section>
  )
}

// ── Contacto ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ nombre: '', telefono: '', comuna: '', atencion: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Hola, mi nombre es ${form.nombre}. Mi teléfono es ${form.telefono}, estoy en ${form.comuna}. Necesito: ${form.atencion}`
    window.open(wa(msg), '_blank')
    setSent(true)
  }

  const info = [
    { emoji: '📱', label: 'WhatsApp / Teléfono', value: '+56 9 7864 9964', sub: 'Escríbenos directamente' },
    { emoji: '🕐', label: 'Horario de atención', value: 'Lunes a sábado', sub: 'Consulta disponibilidad de horario' },
    { emoji: '📍', label: 'Área de cobertura', value: 'Santiago, zona sur y centro', sub: 'Consulta disponibilidad por tu comuna' },
  ]

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ background: '#d6f2ed', color: '#1d766d', fontFamily: 'Outfit, sans-serif' }}>
            Contacto
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
            Estamos aquí para ayudarte
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
            La forma más rápida de contactarme es por WhatsApp. También puedes completar el formulario
            y te responderé a la brevedad.
          </p>
          <div className="space-y-5">
            {info.map(({ emoji, label, value, sub }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border"
                style={{ borderColor: '#d6f2ed', background: '#f0faf8' }}>
                <div className="text-2xl flex-shrink-0">{emoji}</div>
                <div>
                  <div className="text-sm text-gray-500 mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{label}</div>
                  <div className="font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{value}</div>
                  <div className="text-xs text-gray-400 italic mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-8 rounded-3xl border" style={{ borderColor: '#d6f2ed', background: '#f0faf8' }}>
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
                ¡Mensaje enviado!
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Se abrió WhatsApp con tu información. Te responderemos pronto.
              </p>
              <button onClick={() => setSent(false)}
                className="mt-6 text-sm underline"
                style={{ color: '#2DB9A0', fontFamily: 'Outfit, sans-serif' }}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#1a2e2b' }}>
                Solicitar información
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre completo' },
                  { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+56 9 XXXX XXXX' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a2e2b', fontFamily: 'Outfit, sans-serif' }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-all focus:ring-2"
                      style={{
                        borderColor: '#d6f2ed',
                        background: 'white',
                        color: '#1a2e2b',
                        fontFamily: 'Outfit, sans-serif',
                        boxShadow: 'none',
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a2e2b', fontFamily: 'Outfit, sans-serif' }}>
                    Comuna
                  </label>
                  <select
                    name="comuna"
                    value={form.comuna}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border text-base outline-none"
                    style={{ borderColor: '#d6f2ed', background: 'white', color: '#1a2e2b', fontFamily: 'Outfit, sans-serif' }}
                  >
                    <option value="">Selecciona tu comuna</option>
                    {COMUNAS.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Otra">Otra (consultar)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a2e2b', fontFamily: 'Outfit, sans-serif' }}>
                    ¿Qué atención necesitas?
                  </label>
                  <textarea
                    name="atencion"
                    value={form.atencion}
                    onChange={handleChange}
                    placeholder="Cuéntame brevemente sobre la atención que necesitas..."
                    rows={3}
                    required
                    className="w-full px-4 py-3 rounded-xl border text-base outline-none resize-none"
                    style={{ borderColor: '#d6f2ed', background: 'white', color: '#1a2e2b', fontFamily: 'Outfit, sans-serif' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-95"
                  style={{ background: '#25D366', fontFamily: 'Outfit, sans-serif' }}
                >
                  <IconWhatsApp className="w-5 h-5" />
                  Solicitar información por WhatsApp
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <footer style={{ background: '#1a2e2b' }} className="py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-lg text-white mb-1" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              Salud y Estética en tu Hogar
            </div>
            <div className="text-sm italic" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Outfit, sans-serif' }}>
              "Cuidado profesional, cercano y accesible."
            </div>
          </div>
          <nav className="flex flex-wrap gap-5 justify-center">
            {links.map(({ label, href }) => (
              <a key={href} href={href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Outfit, sans-serif' }}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif' }}>
          © {new Date().getFullYear()} Salud y Estética en tu Hogar · Santiago, Chile
        </div>
      </div>
    </footer>
  )
}

// ── Floating WhatsApp ─────────────────────────────────────────────────────────

function FloatingWhatsApp() {
  return (
    <a
      href={wa('Hola, me gustaría consultar sobre atención de enfermería a domicilio.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
      style={{ background: '#25D366', boxShadow: '0 4px 24px rgba(37,211,102,0.5)' }}
      aria-label="Contactar por WhatsApp"
    >
      <IconWhatsApp className="w-7 h-7" />
    </a>
  )
}

// ── Mobile bottom bar ─────────────────────────────────────────────────────────

function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t px-4 py-3 flex gap-3"
      style={{ borderColor: '#d6f2ed' }}>
      <a
        href={wa('Hola, quiero solicitar una atención de enfermería a domicilio.')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-semibold text-sm transition-all"
        style={{ background: '#25D366', fontFamily: 'Outfit, sans-serif' }}
      >
        <IconWhatsApp className="w-5 h-5" />
        Solicitar atención
      </a>
      <a
        href="tel:+56978649964"
        className="px-4 py-3.5 rounded-2xl font-semibold text-sm border-2 transition-all"
        style={{ color: '#2DB9A0', borderColor: '#2DB9A0', fontFamily: 'Outfit, sans-serif' }}
      >
        Llamar
      </a>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
      <Header />
      <main>
        <Hero />
        <NursingServicesSection />
        <AestheticServicesSection />
        <CoverageSection />
        <AboutSection />
        <HowSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </div>
  )
}
