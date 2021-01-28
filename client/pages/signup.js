import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Link from 'next/link'
import { signup } from '../services/auth'

function SignUpPage() {
  const { addToast } = useToasts()
  const [form, setForm] = useState({ login: '', password: '' })

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

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
      })
  }

  return (
    <div className='auth'>
      <h2>SIGN UP</h2>

      <form onSubmit={handleFormSubmit}>
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
        <button type='submit'>Sign In</button>
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