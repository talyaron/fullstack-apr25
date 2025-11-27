import { useState } from 'react'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
    onSubmit?: (email: string, password: string) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit?.(email, password)
    }

    return (
        <div className={styles.loginForm}>
            <div className={styles.header}>
                <h2>Welcome Back</h2>
                <p>Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <div className={styles.inputWrapper}>
                        <span className={styles.icon}>✉</span>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.inputWrapper}>
                        <span className={styles.icon}>🔒</span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className={styles.togglePassword}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '👁' : '👁‍🗨'}
                        </button>
                    </div>
                </div>

                <div className={styles.options}>
                    <label className={styles.rememberMe}>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <a href="#" className={styles.forgotPassword}>Forgot password?</a>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Sign In
                </button>

                <div className={styles.divider}>
                    <span>or continue with</span>
                </div>

                <div className={styles.socialButtons}>
                    <button type="button" className={styles.socialBtn}>
                        <span>G</span> Google
                    </button>
                    <button type="button" className={styles.socialBtn}>
                        <span>f</span> Facebook
                    </button>
                </div>

                <p className={styles.signupLink}>
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </form>
        </div>
    )
}

export default LoginForm
