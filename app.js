//require packages used in the project
const express = require('express')
const app = express()

const port = 3000

//require express-handlebars used here
const exphbs = require('express-handlebars')

//setting restaurant_list from json
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))



//routes setting 
app.get('/', (req, res) => {

  res.render('index', { restaurant: restaurantList.results })
})

//show setting 
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurantId })
})


//search specific restaurant setting
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filterRestaurant = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase().trim()))

  res.render('index', { restaurant: filterRestaurant, keyword: keyword })
})



//start and listen on the express serve
app.listen(port, () => {
  console.log('set successfully')
})