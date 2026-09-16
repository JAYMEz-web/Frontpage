import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'

function Signup({ onNavigate, onSignup, authError,}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    if (password !== confirmPassword) {
      setLocalError("Passwords don't match.")
      return
    }

    setLocalError("")
    onSignup(name, email, password)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-logo">📖fRONTPAGE</h1>
        <h2 className="auth-title">Create an account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              placeholder="e.g. John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <label>
            Confirm password
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {(localError || authError) && (
            <p className="auth-error">{localError || authError}</p>
          )}

          <button type="submit" className="auth-submit">Sign Up</button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => onNavigate("login")}>Login</span>
        </p>

        <p className="auth-switch">
          <span onClick={() => onNavigate("app")}>Continue as a guest</span>
        </p>
      </div>
    </div>
  )
}

export default Signup