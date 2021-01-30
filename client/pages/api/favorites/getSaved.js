import { checkTokens } from '../../../helpers/checkTokens'

export default async function (req, res) {
  const { accessToken } = await checkTokens(req, res)

  const response = await fetch(
    `${process.env.API_ADRESS}/favorites/getSaved`,  {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': accessToken
    },
    body: JSON.stringify({
      id: req.query.id
    })
  })
  const data = await response.json()

  res.status(response.status).json(data)
}
