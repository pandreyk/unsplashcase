import Router from 'next/router'

export const signup = async (form) => {
  return await fetch(`http://localhost:5000/auth/signup`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: form.login, 
      password: form.password
    })
  })
    .then(response => response.json()) 
    .then(res => {
      if (res.error) {
        throw new Error(res.error)
      }
      
      Router.replace('/login')

      return {ok: true, message: res.message}
    })
    .catch(e => {
      return {ok: false, error: e.message}
    })
}