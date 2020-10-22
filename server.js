
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


server.get('/:id', (req,res) => {

    fs.readFile('./data.json', 'utf-8', (err, data) => {
      data = JSON.parse(data)

      let thePoem = data.poems.find((onePoem) =>{ 
        return onePoem.id == req.params.id})

      console.log(thePoem + "+++++++++++++")
      console.log(data + "________________________")
  
      res.render('/', thePoem)
    })
  })










module.exports = server