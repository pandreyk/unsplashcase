import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export const checkTokens = async (req, res) => { 
  try {
    let tokens

    if (typeof window === 'undefined') {  
      tokens = {
        accessToken: req.cookies.accessToken,
        refreshToken: req.cookies.refreshToken
      }
    } else {
      tokens = {
        accessToken: cookie.get('accessToken'),
        refreshToken: cookie.get('refreshToken')
      }
    }
  
    const { exp } = jwt.decode(tokens.accessToken)
  
    if (Date.now() >= exp * 1000) {
      const response = await fetch('http://localhost:5000/auth/refresh', { 
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: tokens.refreshToken })
      })

      if (response.status === 500) {
        throw new Error('Invalid token!')
      }
  
      tokens = await response.json()
      
      if (typeof window === 'undefined') {
        res.setHeader(
          'Set-Cookie', [
            `accessToken=${tokens.accessToken}; path=/`,
            `refreshToken=${tokens.refreshToken}; path=/`,
          ]
        )
      } else {
        cookie.set('accessToken', tokens.accessToken)
        cookie.set('refreshToken', tokens.refreshToken)
      }
    }
  
    return { isAuth: true, accessToken: tokens.accessToken }

  } catch (e) {
    console.error(e.message)
    return { isAuth: false, error: e.message }
  } 
}









// try {
//   let tokens = {
//     accessToken: req.cookies.token,
//     refreshToken: req.cookies.refreshToken
//   }
//   const { exp } = jwt.decode(tokens.accessToken)

//   if (Date.now() >= exp * 1000) {
//     const response = await fetch('http://localhost:5000/auth/refresh', { 
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ refreshToken: tokens.refreshToken })
//     })
//     if (response.status === 500) {
//       throw new Error('Invalid token!')
//     }

//     tokens = await response.json()

//     res.setHeader('Set-Cookie', [
//       `token=${tokens.accessToken}; path=/`,
//       `refreshToken=${tokens.refreshToken}; path=/`,
//     ])
//   }

//   return { accessToken: tokens.accessToken }

// } catch (e) {
//   console.log(e.message)
//   return { error: e.message }
// }