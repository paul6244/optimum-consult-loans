'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          background: '#f6f5ef'
        }}>
          <h1 style={{ color: '#176348', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ color: '#66716b', marginBottom: '2rem', maxWidth: '500px' }}>
            We apologize for the inconvenience. Please refresh the page or contact us at 0257859442 if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#176348',
              color: '#fffefa',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700'
            }}
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
