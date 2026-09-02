'use client'

import { useState } from 'react'
import { ChatWidget } from '@/components/chat-widget'
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Landmark,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from 'lucide-react'

const services = [
  {
    icon: <Sparkles />,
    title: 'Instant Loan',
    description: 'Your remaining afford for the month shall qualify you for a loan amount of your choice with corresponding duration and deduction based on the affordability.',
    cta: 'Get instant loan',
    benefits: ['Quick approval', 'Flexible duration', 'Based on affordability', 'Deduction from payslip']
  },
  {
    icon: <Landmark />,
    title: 'Loan Consolidation',
    description: 'Combine multiple repayments into one manageable plan, potentially freeing up more cash every month.',
    cta: 'Explore this option',
    benefits: ['Lower monthly payments', 'Single payment to track', 'Reduced interest rates', 'Improved cash flow']
  },
  {
    icon: <ArrowRight />,
    title: 'Salary Account Switch',
    description: 'Get your internal loans in salary account paid off with the loans on your payslip, freeing up your affordability and increasing your net salary while changing the bank for your salary account.',
    cta: 'Switch account',
    benefits: ['Pay off internal loans', 'Increase net salary', 'Change salary bank', 'Better affordability']
  }
]

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main>
      <div className="topline"><span>Trusted guidance for Controller & Accountant-General&apos;s Department (CAGD) workers</span><span className="topline-right"><a href="tel:0257859442" className="phone-link"><Phone size={14} /> 0257859442</a></span></div>
      <header className="site-header">
        <a href="/" className="brand"><span className="brand-mark"><img src="/icon.png" alt="Optimum Consult LTD Logo" width="48" height="48" loading="lazy" /></span><span>OPTIMUM<span>CONSULT LTD</span></span></a>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/services" className="active">Services</a>
          <a href="/#how-it-works">How it works</a>
          <a href="/#partners">Partners</a>
          <a href="/#faqs">FAQs</a>
        </nav>
        <div className="header-cta"><a href="/#apply" className="button button-primary">Get Started <ArrowRight size={16} /></a></div>
        <button className="menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu"><Menu size={24} /></button>
      </header>
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X size={24} /></button>
          <nav className="mobile-nav-links">
            <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="/services" className="active" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <a href="/#partners" onClick={() => setMobileMenuOpen(false)}>Partners</a>
            <a href="/#faqs" onClick={() => setMobileMenuOpen(false)}>FAQs</a>
            <a href="/#apply" className="button button-primary" onClick={() => setMobileMenuOpen(false)}>Get Started <ArrowRight size={16} /></a>
          </nav>
        </div>
      )}

      <section className="section" style={{ background: '#e9eee5' }}>
        <div className="service-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-box">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="/#apply" className="text-link">{service.cta} <ArrowRight size={16} /></a>
              <ul>
                {service.benefits.map((benefit, i) => (
                  <li key={i}><BadgeCheck size={14} /> {benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="apply-section">
        <div className="apply-card">
          <div className="apply-copy">
            <div className="eyebrow">Ready to get started?</div>
            <h2>Let&apos;s find your<br /><em>better number.</em></h2>
            <p>Start with a confidential conversation. There&apos;s no obligation and no pressure to proceed.</p>
            <div className="contact-line"><MessageCircle size={20} /><span><small>Prefer to speak to someone?</small><strong>Chat with a consultant</strong></span></div>
          </div>
          <a href="/#apply" className="button button-primary">Request a confidential review <ArrowRight size={17} /></a>
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="brand footer-brand"><span className="brand-mark"><img src="/icon.png" alt="Optimum Consult LTD Logo" width="64" height="64" loading="lazy" /></span><span>OPTIMUM<span>CONSULT LTD</span></span><span className="brand-motto">We are the lifeline to your credit situation</span></a><p>Clearer financial decisions<br />for the people who keep Ghana moving.</p><div className="footer-contact"><a href="tel:0257859442" className="phone-link"><Phone size={14} /> 0257859442</a><a href="tel:0257859442" className="button button-outline">Talk to a consultant <ArrowRight size={16} /></a></div></div>
        <div className="footer-bottom"><span>© 2026 Optimum Consult LTD</span><span>Confidentiality · Transparency · Care</span></div>
      </footer>
      <ChatWidget />
    </main>
  )
}
