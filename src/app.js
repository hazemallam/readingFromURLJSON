const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

//Define App
const app = express()

//Define main folders paths
const publicDirectory = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialDirectory = path.join(__dirname,'../templates/partials')

//setup handelbars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsDirectory)
hbs.registerPartials(partialDirectory)

//set static files
app.use(express.static(publicDirectory))

// Routes

app.get('/', (req, res)=>{
    const url = "https://restcountries.eu/rest/v2/all";
    request({url}, (error, response)=>{
        data = JSON.parse(response.body);
        // console.log(data)
        res.render('allRepo', {
            title:'all repo',
            data:data
        })
    })
})

app.get('/:alpha2Code',(req,res)=>{
    const alpha2Code = req.params.alpha2Code
    const url="https://restcountries.eu/rest/v2/all"
    request({url:url},(error,response)=>{
        data=JSON.parse(response.body)
        // data = data.nativeName
        index = data.findIndex(function(single){
            return single.alpha2Code == alpha2Code
        })
        res.render('singleCountry',{
            title:'single country',
            data: data[index]
        })
    })
})








//run server on localhost:5000
app.listen(5000)