import { checkTokens } from '../../../helpers/checkTokens'

export default async function (req, res) {
  const { accessToken } = await checkTokens(req, res)

  const response = await fetch(
    `${process.env.API_ADRESS}/favorites/getFavorites`,  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': accessToken
    }
  })
  const data = await response.json()
  
  res.status(response.status).json(data)
}
