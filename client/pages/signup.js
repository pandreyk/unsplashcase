import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Link from 'next/link'
import { signup } from '../services/auth'
import '../styles/auth.css'

function SignUpPage() {
  const { addToast } = useToasts()
  const [form, setForm] = useState({ login: '', password: '' })
  const [isLoading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await signup(form)
      .then(res => {
        if (res.ok) {
          addToast(res.message, { appearance: 'success', autoDismiss: true })
        } else {
          throw new Error(res.error)
        }
      })
      .catch(e => {
        addToast(e.message, { appearance: 'error', autoDismiss: true })
      })
      .finally(() => {
        setForm({ login: '', password: '' })
        setLoading(false)
      })
  }

  return (
    <div className='auth'>
      <h2>SIGN UP</h2>

      <form 
        className={isLoading && 'auth-disabled'}
        onSubmit={handleFormSubmit}
      >
        <input 
          name='login' 
          placeholder='Login'
          type='text'
          value={form.login}
          onChange={handleChange}
        />
        <input 
          name='password'
          placeholder='Password' 
          type='password' 
          value={form.password}
          onChange={handleChange}
        />
        <button type='submit'>Sign Up</button>
      </form>

      <div className='auth-link'>
        <p>Have an account?</p>
        <Link href='/login' replace>
          <a>Log In</a>
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage