import { useState } from 'react'
import Link from 'next/link'
import { useToasts } from 'react-toast-notifications'
import { login } from '../services/auth'
import '../styles/auth.css'

function LogInPage() {
  const { addToast } = useToasts()
  const [form, setForm] = useState({ login: '', password: '' })
  const [isLoading, setLoading] = useState(false)
  
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await login(form)
      .then(res => {
        if (res.ok) {
          addToast(res.message, { appearance: 'success', autoDismiss: true })
        } else {
          throw new Error(res.error)
        }
      })
      .catch((e) => {
        addToast(e.message, { appearance: 'error', autoDismiss: true })
      })
      .finally(() => {
        setForm({ login: '', password: '' })
        setLoading(false) 
      })
  }

  return (
    <div className='auth'>
      <h2>LOG IN</h2>

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
        <button  type='submit'>Log In</button>
      </form>

      <div className='auth-link'>
        <p>Don't have an account?</p>
        <Link href='/signup' replace>
          <a>Sign Up</a>
        </Link>
      </div>
    </div>
  )
}

export default LogInPage