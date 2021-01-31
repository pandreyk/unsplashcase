import cookie from 'js-cookie'
import Router from 'next/router'

export const logout = () => {
  cookie.remove('accessToken')
  cookie.remove('refreshToken')
  Router.replace('/login')
}
