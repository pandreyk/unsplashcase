import { checkTokens } from '../../../helpers/checkTokens'

export default async function (req, res) {
  const { accessToken } = await checkTokens(req, res)

  const response = await fetch(
    `${process.env.API_ADRESS}/history/addToHistory`,  {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': accessToken
    },
    body: JSON.stringify({
      stringSearch: req.query.stringSearch
    })
  })

  res.status(response.status).json({ok: response.ok})
} 