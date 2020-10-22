
const express = require('express')
const hbs = require('express-handlebars')
const fs = require ('fs')
const poemsYo = require ('./data.json')

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
  
   let randomPoem =  Math.floor(Math.random() * data.poems.length) + 1;
  
    

        let thePoem = data.poems.find((onePoem) =>{ 
          return onePoem == data.poems[randomPoem]})
  
        
          res.render('view', thePoem)
        })
        
})














module.exports = server