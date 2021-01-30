export default async function (req, res) {

  const quickSearch = [
    'Wallpapers', 'Textures & Patterns', 'Nature', 'Current Events', 
    'Architecture', 'Business & Work', 'Film', 'Travel', 'Fashion',
    'Food & Drink', 'Spirituality', 'Experimential', 'People', 
    'Health', 'Arts & Culture'
  ]

  res.status(200).json(quickSearch)
}
