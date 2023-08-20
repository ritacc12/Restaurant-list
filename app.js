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
  res.render('index',{restaurant:restaurant})
})

app.get('/restaurant/:id', (req, res) =>{
  const id = req.params.id
  const item = restaurant.find((target) => target.id.toString() === id)
  res.render('detail',{item})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})