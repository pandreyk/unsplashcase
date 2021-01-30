import cookie from 'js-cookie'

export const login = async (form) => {
  console.log(process.env.API_ADRESS)
  return await fetch(`/api/auth/login`, {
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

      cookie.set('accessToken', res.tokens.accessToken)
      cookie.set('refreshToken', res.tokens.refreshToken)

      document.location.replace('/')
      
      return {ok: true, message: res.message}
    })
    .catch((e) => {
      return {ok: false, error: e.message}
    })
}