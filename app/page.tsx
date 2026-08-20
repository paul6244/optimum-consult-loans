'use client'

import { useMemo, useState } from 'react'
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
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react'

const lenders = ['Consolidated Bank', 'Fidelity Bank', 'GCB Bank', 'Stanbic Bank', 'Absa Bank']
const faqs = [
  ['Who is eligible for this service?', 'Our service is designed for CAGD workers with a steady monthly payslip. We review each application based on income, existing obligations, and the lender criteria.'],
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
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
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
  const takeHome = Math.max(0, qualification - balances)

  return (
    <main>
      <div className="topline"><span>Trusted guidance for CAGD workers</span><span className="topline-right"><Phone size={14} /> +233 24 917 2594</span></div>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Optimum Consult LTD home"><span className="brand-mark"><img src="/icon.png" alt="Optimum Consult LTD Logo" width="64" height="64" /></span><span>OPTIMUM<span>CONSULT LTD</span></span></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="#services" onClick={() => setMenuOpen(false)}>Our services</a><a href="#faqs" onClick={() => setMenuOpen(false)}>FAQs</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-cta" href="#apply">Check your options <ArrowRight size={16} /></a>
        <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><Sparkles size={15} /> A clearer way forward</div><h1>More cash in your hands.<br /><em>Less stress</em> on your payslip.</h1><p>We help CAGD workers consolidate their loans, understand their options, and take home more each month.</p><div className="hero-actions"><a href="#estimator" className="button button-primary">Estimate my take-home <ArrowRight size={18} /></a><a href="#how-it-works" className="text-link">See how it works <ArrowRight size={16} /></a></div><div className="trust-row"><div className="avatar-stack"><span>EA</span><span>KO</span><span>MA</span></div><span>Join 2,000+ workers making<br />smarter money decisions</span></div></div>
        <div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="document-card"><div className="document-head"><span className="mini-logo"><img src="/icon.png" alt="Optimum Consult LTD Logo" width="32" height="32" /></span><span>MONTHLY STATEMENT</span><span className="status-dot" /></div><div className="document-line wide" /><div className="document-line" /><div className="document-amount">GHS 8,420.00</div><div className="document-label">Net monthly income</div><div className="document-chart"><span /><span /><span /><span /><span /><span /><span /></div></div><div className="float-note"><BadgeCheck size={18} /><div><strong>Option found</strong><small>Tailored to your payslip</small></div></div><div className="sun-stamp">Simple<br />. Secure<br />. Clear.</div></div>
      </section>

      <section className="proof-strip"><div><strong>GHS 45M+</strong><span>Loans reviewed</span></div><div><strong>2,000+</strong><span>Workers supported</span></div><div><strong>5</strong><span>Trusted bank partners</span></div><div><strong>100%</strong><span>Confidential process</span></div></section>

      <section className="section services" id="services"><div className="section-intro"><div className="eyebrow">What we do</div><h2>Your finances,<br /><em>made simpler.</em></h2><p>One conversation can change how you feel about your payslip. Our team brings clarity to the numbers and confidence to your next step.</p></div><div className="service-grid"><article className="service-card featured"><div className="icon-box"><Banknote /></div><h3>Loan consolidation</h3><p>Combine multiple repayments into one manageable plan, potentially freeing up more cash every month.</p><a href="#estimator">Explore this option <ArrowRight size={15} /></a></article><article className="service-card"><div className="icon-box"><BarChart3 /></div><h3>Payslip assessment</h3><p>Get a clear, honest view of what your income can support before you make a decision.</p><a href="#estimator">Check affordability <ArrowRight size={15} /></a></article><article className="service-card"><div className="icon-box"><ClipboardCheck /></div><h3>Application support</h3><p>From documents to submission, we stay with you and keep the process easy to follow.</p><a href="#apply">Start an application <ArrowRight size={15} /></a></article></div></section>

      <section className="section process" id="how-it-works"><div className="section-intro centered"><div className="eyebrow">The process</div><h2>From payslip to <em>peace of mind.</em></h2><p>No jargon. No pressure. Just four clear steps to a better understanding of your options.</p></div><div className="steps"><div><span>01</span><FileText /><h3>Share your details</h3><p>Tell us a little about your income and current obligations.</p></div><div><span>02</span><BarChart3 /><h3>We review</h3><p>Our team studies your payslip and finds the right path.</p></div><div><span>03</span><Landmark /><h3>See your options</h3><p>We explain suitable offers clearly, without the fine print.</p></div><div><span>04</span><ShieldCheck /><h3>Move forward</h3><p>Choose what works for you. We support your application.</p></div></div></section>

      <section className="estimator-section" id="estimator"><div className="estimator-card"><div className="estimator-header"><div><div className="eyebrow">Quick estimate</div><h2>What could your new<br /><em>take-home look like?</em></h2></div><span className="secure-chip"><ShieldCheck size={14} /> Private & secure</span></div><div className="estimator-body"><div className="fields"><label>Gross salary<input type="number" min="0" placeholder="0.00" onChange={e => setSalary(Number(e.target.value))} /><span>GHS</span></label><label>Total deductions of the loans you want to pay off<input type="number" min="0" placeholder="0.00" onChange={e => setDeductions(Number(e.target.value))} /><span>GHS</span></label><div className="optional-title">Optional details <span>helps us refine your estimate</span></div><label>Affordability<input type="number" min="0" placeholder="0.00" onChange={e => setBalances(Number(e.target.value))} /><span>GHS</span></label></div><div className="result-panel"><div className="result-label">Estimated qualification</div><div className="result-value">{money(qualification)}</div><p><Check size={15} /> This is an estimate, not a guarantee. We&apos;ll confirm the details with you.</p><a className="button button-light" href="#apply">Get my personalised review <ArrowRight size={17} /></a></div></div></div></section>

      <section className="section partners"><div className="partner-copy"><div className="eyebrow">Our network</div><h2>Connected to the<br /><em>right people.</em></h2><p>We work with trusted financial institutions to help you explore options that fit your situation.</p></div><div className="lender-grid">{lenders.map((lender, index) => <div className="lender" key={lender}><span className="lender-icon">{index === 0 ? <Landmark /> : index === 1 ? <Banknote /> : <BarChart3 />}</span><strong>{lender}</strong><small>Financial partner</small></div>)}</div></section>

      <section className="apply-section" id="apply"><div className="apply-card"><div className="apply-copy"><div className="eyebrow">Ready when you are</div><h2>Let&apos;s find your<br /><em>better number.</em></h2><p>Start with a confidential conversation. There&apos;s no obligation and no pressure to proceed.</p><div className="contact-line"><MessageCircle size={20} /><span><small>Prefer to speak to someone?</small><strong>Chat with a consultant</strong></span></div></div><form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}><div className="form-row"><label>Full name<input required placeholder="Your name" /></label><label>Phone number<input required type="tel" placeholder="0257859442" /></label></div><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Tell us about your situation<textarea rows={3} placeholder="A little context helps us prepare..." /></label><label className="upload"><UploadCloud size={22} /><span><strong>Upload your latest payslip</strong><small>PDF, JPG or PNG · max 10MB</small></span><input type="file" accept=".pdf,.jpg,.jpeg,.png" /></label><button className="button button-primary" type="submit">{submitted ? 'Request received' : 'Request a confidential review'} <ArrowRight size={17} /></button>{submitted && <p className="success-message"><Check size={15} /> Thank you. A consultant will be in touch shortly.</p>}</form></div></section>

      <section className="section faqs" id="faqs"><div className="section-intro"><div className="eyebrow">Questions, answered</div><h2>Good decisions<br /><em>start with clarity.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={openFaq === index ? 'faq is-open' : 'faq'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <Minus size={19} /> : <ChevronDown size={19} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <footer id="contact"><div className="footer-main"><a href="#home" className="brand footer-brand"><span className="brand-mark"><img src="/icon.png" alt="Optimum Consult LTD Logo" width="64" height="64" /></span><span>OPTIMUM<span>CONSULT LTD</span></span></a><p>Clearer financial decisions<br />for the people who keep Ghana moving.</p><a href="#apply" className="button button-outline">Talk to a consultant <ArrowRight size={16} /></a></div><div className="footer-bottom"><span>© 2026 Optimum Consult LTD</span><span>Confidentiality · Transparency · Care</span></div></footer>
      <ChatWidget />
    </main>
  )
}
