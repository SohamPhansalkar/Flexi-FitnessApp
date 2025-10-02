import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import { signup } from '../services/authService.js'

const SignupPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please check and try again.')
      return
    }

    setIsSubmitting(true)

    try {
      const { user } = await signup({
        userName: formData.userName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })
      setSuccess(`Welcome aboard, ${user.userName || user.email}!`)

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setError(err.message || 'We could not create your account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join the FitFusion community and unlock your personalised fitness hub."
      footer={
        <p>
          Already a member?{' '}
          <Link to="/login" aria-label="Go to login">
            Return to login
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
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            name="userName"
            type="text"
            autoComplete="username"
            className="auth-input"
            placeholder="alex.morgan"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

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
            autoComplete="new-password"
            className="auth-input"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="auth-input"
            placeholder="Repeat your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <div className="auth-action">
          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Sign Up'}
          </button>
          <p className="auth-alt-action">
            Already have an account? <Link to="/login">Sign in instead</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default SignupPage
