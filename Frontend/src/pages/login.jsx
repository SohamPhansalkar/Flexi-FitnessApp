import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import { login } from '../services/authService.js'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const { user } = await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })
      sessionStorage.setItem('ff:user', JSON.stringify(user))
      setSuccess(`Welcome back, ${user.userName || user.email}!`)

      // Placeholder navigation until dashboard is implemented
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 1200)
    } catch (err) {
      setError(err.message || 'We could not sign you in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Member Login"
      subtitle="Enter your credentials to continue your fitness journey."
      footer={
        <p>
          New to FitFusion?{' '}
          <Link to="/signup" aria-label="Go to sign up">
            Create an account
          </Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}
        {success && <div className="auth-success">{success}</div>}

        <div className="auth-field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="auth-input"
            placeholder="alex@fitfusion.io"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="auth-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <div className="auth-action">
          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
          <p className="auth-alt-action">
            Don&apos;t have an account? <Link to="/signup">Sign up instead</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage

