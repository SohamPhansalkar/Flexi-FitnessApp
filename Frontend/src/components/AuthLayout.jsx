import { Link } from 'react-router-dom'
import '../styles/auth.css'

function AuthLayout({ title, subtitle = '', children, footer }) {
  return (
    <div className="auth-page">
      <div className="auth-backdrop" aria-hidden="true" />
      <div className="auth-card" role="region" aria-live="polite">
        <div className="auth-header">
          <div className="brand-icon" aria-hidden="true">
            <span className="brand-flame" />
          </div>
          <div>
            <h1 className="brand-title">FIT<span>FUSION</span></h1>
            <p className="brand-subtitle">Your AI-Powered Fitness Companion</p>
          </div>
        </div>
        <div className="auth-body">
          <div className="auth-body-header">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {children}
        </div>
        <div className="auth-footer">
          {footer || (
            <p>
              Need help? <Link to="/signup">Contact support</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
