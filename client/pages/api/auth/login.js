export default async function (req, res) {
  const response = await fetch(`${process.env.API_ADRESS}/auth/login`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: req.body.login, 
      password: req.body.password
    })
  })
  const data = await response.json()

  res.status(response.status).json(data)
}
