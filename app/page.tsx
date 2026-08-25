'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChatWidget } from '@/components/chat-widget'
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Landmark,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
  Zap,
} from 'lucide-react'

const lenders = ['Consolidated Bank', 'Fidelity Bank', 'GCB Bank', 'Stanbic Bank', 'Absa Bank', 'Bayport Savings and Loans', 'Izwe Savings and Loans', 'Dalex Finance', 'TF Financial Services', 'Leshego Savings and Loans', 'Amansie Community Bank', 'Adansi Community Bank', 'National Investment Bank', 'Teachers Fund']
const rotatingMessages = [
  'Less debt',
  'More savings',
  'Better future',
  'Clearer goals'
]
const faqs = [
  ['Who is eligible for this service?', 'Our service is designed for Controller & Accountant-General&apos;s Department (CAGD) workers with a steady monthly payslip. We review each application based on income, existing obligations, and the lender criteria.'],
  ['How much can I qualify for?', 'Your estimated qualification is based on your monthly affordability. The final amount is confirmed after a full review of your payslip and supporting documents.'],
  ['Do you charge before I apply?', 'No. We are transparent about fees and explain every cost before you commit to an option.'],
  ['How secure are my documents?', 'Your documents are used only for assessment and are handled with care. We never share them outside the agreed loan review process.'],
]

function money(value: number) {
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', maximumFractionDigits: 2 }).format(value)
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [salary, setSalary] = useState(0)
  const [deductions, setDeductions] = useState(0)
  const [balances, setBalances] = useState(0)
  const [fees, setFees] = useState(0)
  const [calculatorError, setCalculatorError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % rotatingMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  const affordability = Math.max(0, deductions)
  const qualification = useMemo(() => {
    const baseAmount = deductions + (balances > 0 ? balances : 0)
    const baseQualification = baseAmount / 0.0244
    const thousands = Math.floor(baseQualification / 1000)
    const remainder = baseQualification % 1000
    let roundedQualification
    if (remainder > 501) {
      roundedQualification = (thousands * 1000) + 500
    } else {
      roundedQualification = thousands * 1000
    }
    return roundedQualification * 0.85
  }, [deductions, balances])

  useEffect(() => {
    if (salary < 0 || deductions < 0 || balances < 0 || fees < 0) {
      setCalculatorError('Values cannot be negative')
    } else if (salary > 1000000 || deductions > 1000000 || balances > 1000000) {
      setCalculatorError('Please enter reasonable values')
    } else {
      setCalculatorError('')
    }
  }, [salary, deductions, balances, fees])
  const takeHome = Math.max(0, qualification - balances)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in all fields')
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address')
      return
    }
    
    try {
      const message = `New consultation request:%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}%0A%0ASent from Optimum Consult LTD website`
      const whatsappUrl = `https://wa.me/233257859442?text=${encodeURIComponent(message)}`
      
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank')
        setSubmitted(true)
      }
    } catch (error) {
      setFormError('Failed to open WhatsApp. Please try again or call us directly.')
      console.error('Form submission error:', error)
    }
  }

  return (
    <main>
      <div className="topline"><span>Trusted guidance for Controller & Accountant-General&apos;s Department (CAGD) workers</span><span className="topline-right"><a href="tel:0257859442" className="phone-link"><Phone size={14} /> 0257859442</a></span></div>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Optimum Consult LTD home"><span className="brand-mark"><img src="/icon.png" alt="Optimum Consult LTD Logo" width="64" height="64" /></span><span>OPTIMUM<span>CONSULT LTD</span></span><span className="brand-motto">We are the lifeline to your credit situation</span></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="/services" onClick={() => setMenuOpen(false)}>Our services</a><a href="#faqs" onClick={() => setMenuOpen(false)}>FAQs</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-cta" href="#apply">Check your options <ArrowRight size={16} /></a>
        <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><Sparkles size={15} /> A clearer way forward</div><h1>More cash in your hands.<br /><em className="rotating-text">{rotatingMessages[currentMessageIndex]}</em> on your payslip.</h1><p>We help Controller & Accountant-General&apos;s Department (CAGD) workers consolidate their loans, understand their options, and take home more each month.</p><div className="hero-actions"><a href="#estimator" className="button button-primary">Estimate my take-home <ArrowRight size={18} /></a><a href="#how-it-works" className="text-link">See how it works <ArrowRight size={16} /></a></div><div className="trust-row"><div className="avatar-stack"><span>EA</span><span>KO</span><span>MA</span></div><span>Join 2,000+ workers making<br />smarter money decisions</span></div></div>
        <div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="document-card"><div className="document-head"><span className="mini-logo"><img src="/icon.png" alt="Optimum Consult LTD Logo" width="32" height="32" /></span><span>MONTHLY STATEMENT</span><span className="status-dot" /></div><div className="document-line wide" /><div className="document-line" /><div className="document-amount">GHS 8,420.00</div><div className="document-label">Net monthly income</div><div className="document-chart"><span /><span /><span /><span /><span /><span /><span /></div></div><div className="float-note"><BadgeCheck size={18} /><div><strong>Option found</strong><small>Tailored to your payslip</small></div></div><div className="sun-stamp">Simple<br />. Secure<br />. Clear.</div></div>
      </section>

      <section className="attention-banner">
        <div className="attention-content">
          <div className="attention-question">How would you feel?</div>
          <div className="attention-subtitle">If you could...</div>
          <div className="attention-list">
            <div className="attention-item"><BadgeCheck size={20} /> Pay off all expensive loans on your payslip</div>
            <div className="attention-item"><BadgeCheck size={20} /> Restructure the deductions on your payslip</div>
            <div className="attention-item"><BadgeCheck size={20} /> Increase your net salary while you get money home</div>
          </div>
          <a href="#estimator" className="button button-primary attention-cta">See what's possible <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="proof-strip"><div><strong>GHS 45M+</strong><span>Loans reviewed</span></div><div><strong>2,000+</strong><span>Workers supported</span></div><div><strong>14</strong><span>Trusted bank partners</span></div><div><strong>100%</strong><span>Confidential process</span></div></section>

      <section className="section services" id="services"><div className="section-intro"><div className="eyebrow">What we do</div><h2>Your finances,<br /><em>made simpler.</em></h2><p>One conversation can change how you feel about your payslip. Our team brings clarity to the numbers and confidence to your next step.</p></div><div className="service-grid"><article className="service-card featured"><div className="icon-box"><Sparkles /></div><h3>Instant loan</h3><p>Your remaining afford for the month shall qualify you for a loan amount of your choice with corresponding duration and deduction based on the affordability.</p><a href="#apply">Get instant loan <ArrowRight size={15} /></a></article><article className="service-card"><div className="icon-box"><Banknote /></div><h3>Loan consolidation</h3><p>Combine multiple repayments into one manageable plan, potentially freeing up more cash every month.</p><a href="#estimator">Explore this option <ArrowRight size={15} /></a></article><article className="service-card featured"><div className="icon-box"><ArrowRight /></div><h3>Salary Account switch</h3><p>Get your internal loans in salary account paid off with the loans on your payslip, freeing up your affordability and increasing your net salary while changing the bank for your salary account.</p><a href="#apply">Switch account <ArrowRight size={15} /></a></article></div></section>

      <section className="section process" id="how-it-works"><div className="section-intro centered"><div className="eyebrow">The process</div><h2>From payslip to <em>peace of mind.</em></h2><p>No jargon. No pressure. Just four clear steps to a better understanding of your options.</p></div><div className="steps"><div><span>01</span><FileText /><h3>Share your details</h3><p>Tell us a little about your income and current obligations.</p></div><div><span>02</span><BarChart3 /><h3>We review</h3><p>Our team studies your payslip and finds the right path.</p></div><div><span>03</span><Landmark /><h3>See your options</h3><p>We explain suitable offers clearly, without the fine print.</p></div><div><span>04</span><ShieldCheck /><h3>Move forward</h3><p>Choose what works for you. We support your application.</p></div></div></section>

      <section className="estimator-section" id="estimator"><div className="estimator-card"><div className="estimator-header"><div><div className="eyebrow">Quick estimate</div><h2>What could your new<br /><em>take-home look like?</em></h2></div><span className="secure-chip"><ShieldCheck size={14} /> Private & secure</span></div><div className="estimator-body"><div className="fields"><label>Gross salary<input type="number" min="0" placeholder="0.00" onChange={e => setSalary(Number(e.target.value))} /><span>GHS</span></label><label>Total Loan deduction on payslip<input type="number" min="0" placeholder="0.00" onChange={e => setDeductions(Number(e.target.value))} /><span>GHS</span></label><div className="optional-title">Optional details <span>helps us refine your estimate</span></div><label className="full-width">Affordability<input type="number" min="0" placeholder="0.00" onChange={e => setBalances(Number(e.target.value))} /><span>GHS</span></label></div><div className="result-panel">{calculatorError && <p className="error-message">{calculatorError}</p>}<div className="result-label">Estimated qualification</div><div className="result-value">{money(qualification)}</div><p><Check size={15} /> This is an estimate, not a guarantee. We&apos;ll confirm the details with you.</p><a className="button button-light" href="#apply">Get my personalised review <ArrowRight size={17} /></a></div></div></div></section>

      <section className="section partners"><div className="partner-copy"><div className="eyebrow">Our network</div><h2>Connected to the<br /><em>right people.</em></h2><p>We work with trusted financial institutions to help you explore options that fit your situation.</p></div><div className="lender-grid">{lenders.map((lender, index) => <div className="lender" key={lender}><span className="lender-icon">{index === 0 ? <Landmark /> : index === 1 ? <Banknote /> : <BarChart3 />}</span><strong>{lender}</strong><small>Financial partner</small></div>)}</div></section>

      <section className="apply-section" id="apply"><div className="apply-card"><div className="apply-copy"><div className="eyebrow">Ready when you are</div><h2>Let&apos;s find your<br /><em>better number.</em></h2><p>Start with a confidential conversation. There&apos;s no obligation and no pressure to proceed.</p><div className="contact-line"><MessageCircle size={20} /><span><small>Prefer to speak to someone?</small><strong>Chat with a consultant</strong></span></div></div><form onSubmit={handleSubmit}><div className="form-row"><label>Full name<input required placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></label><label>Phone number<input required type="tel" placeholder="0257859442" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></label></div><label>Email address<input required type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></label><label>Tell us about your situation<textarea rows={3} placeholder="A little context helps us prepare..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} /></label>{formError && <p className="error-message">{formError}</p>}<button className="button button-primary" type="submit">{submitted ? 'Request received' : 'Request a confidential review'} <ArrowRight size={17} /></button>{submitted && <p className="success-message"><Check size={15} /> Thank you. A consultant will be in touch shortly.</p>}</form></div></section>

      <section className="section faqs" id="faqs"><div className="section-intro"><div className="eyebrow">Questions, answered</div><h2>Good decisions<br /><em>start with clarity.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={openFaq === index ? 'faq is-open' : 'faq'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <Minus size={19} /> : <ChevronDown size={19} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <footer id="contact"><div className="footer-main"><a href="#home" className="brand footer-brand"><span className="brand-mark"><img src="/icon.png" alt="Optimum Consult LTD Logo" width="64" height="64" /></span><span>OPTIMUM<span>CONSULT LTD</span></span><span className="brand-motto">We are the lifeline to your credit situation</span></a><p>Clearer financial decisions<br />for the people who keep Ghana moving.</p><div className="footer-contact"><a href="tel:0257859442" className="phone-link"><Phone size={14} /> 0257859442</a><a href="tel:0257859442" className="button button-outline">Talk to a consultant <ArrowRight size={16} /></a></div></div><div className="footer-bottom"><span>© 2026 Optimum Consult LTD</span><span>Confidentiality · Transparency · Care</span></div></footer>
      <ChatWidget />
    </main>
  )
}
