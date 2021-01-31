export default async function (req, res) {  
  await fetch(`${process.env.UNSPLASH}/collections/${req.query.id}/photos?page=${req.query.page}&per_page=15&client_id=${process.env.ACCESS_KEY}`)
    .then(response => response.json())
    .then(json => res.status(200).json(json))
    .catch(e => res.status(500).json({ error: e.message }))
}
