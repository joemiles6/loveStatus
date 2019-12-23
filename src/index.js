const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app  = express()
const port = process.env.PORT || 3000;

// setting up  directory
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// templates paths
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up express for public path
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        name: "love App",
        message: 'created by crazyDev',
        
    })
})
app.get('/calculate', (req, res) => {
   if(!req.query.boo){
       return res.send({error: "fill in content"})
   } 
   res.send({
       boo : req.query.boo,
       bae: req.query.bae 
   })


})
app.listen(port, () => {
    console.log(`server connected on port:: ${port}`)
})