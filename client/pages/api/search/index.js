export default async function (req, res) {
  await fetch(`${process.env.UNSPLASH}/search/photos?client_id=${process.env.ACCESS_KEY}&query=${req.body.stringSearch}&page=${req.body.page}&per_page=15`)
    .then(response => response.json())
    .then(json => res.status(200).json(json))
    .catch(e => res.status(500).json({ error: e.message }))
}
