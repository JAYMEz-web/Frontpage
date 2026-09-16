import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'

function Login ({onNavigate, onLogin, authError})  {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        onLogin(email, password)
    }
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-logo">📖fRONTPAGE</h1>
                <h2 className="auth-title">Log in to your account</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                        
                    </label>

                    <label>
                      Password
                      <div className="password-field">
                        <input type={showPassword ?"text" : "password"}
                         placeholder="••••••••"
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

                    {authError && <p className="auth-error">{authError}</p>}

                    <button type="submit" className="auth-submit">Log In</button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <span onClick={() => onNavigate("signup")}>Sign up</span>
                </p>

                <p className="auth-switch">
                    <span onClick={() => onNavigate("app")}>Continue as guest</span>
                </p>
            </div>
        </div>
    )
}

export default Login
