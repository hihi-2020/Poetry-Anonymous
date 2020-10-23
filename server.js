
const express = require('express')
const hbs = require('express-handlebars')
const fs = require ('fs')
//const poems = require ('./data.json')

const server = express()

// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))


server.get('/', (req, res)=>{

    res.render('index')

})


server.get('/conjure', (req,res) => {

    fs.readFile('./data.json', 'utf-8', (err, data) => {
      data = JSON.parse(data)

      let randomPoem = Math.floor((Math.random() * data.poems.length));


      let thePoem = data.poems.find((onePoem) =>{ 
        return onePoem == data.poems[randomPoem]})
  
      res.render('view', thePoem)
    })
  })



server.get('/create', (req, res)=>{

    res.render('create')

})


server.get('/submitted', (req, res)=>{

  res.render('submitted')

})

server.post('/create', (req,res) =>{

  fs.readFile('./data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)

    data.poems.push({

      "id": data.poems.length + 1,
      "poem": req.body.poem,
      "author":req.body.author,
      "region":req.body.region,
      "year": req.body.year    

    })
    fs.writeFile('./data.json', JSON.stringify(data, null, 2), ()=>{
  
      res.redirect('/submitted')
  })

  
    })


  
})









module.exports = server