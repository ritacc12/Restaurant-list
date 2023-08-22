const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurant = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurant')
})

app.get('/restaurant', (req, res) => {
  const keywords = req.query.keyword?.trim()
  console.log(keywords)
  const matchedRestaurant = keywords?restaurant.filter(target => Object.values(target).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keywords.toLowerCase())
      }else{
      return false
      }})): restaurant
  res.render('index',{restaurant: matchedRestaurant, keywords})
})

app.get('/restaurant/:id', (req, res) =>{
  const id = req.params.id
  const item = restaurant.find(target => target.id === Number(id))
  res.render('detail',{item})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})