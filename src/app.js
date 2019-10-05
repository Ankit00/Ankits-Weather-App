const express = require('express');
const hbs = require('hbs');
const path = require('path');
const utils = require('./Utils/utils');
const app = express();

const port = process.env.PORT;
const publicDirectory = path.join(__dirname,"../public");
const viewsDirectory = path.join(__dirname,'../views/templates');
const partialsDirectory = path.join(__dirname,"../views/partials");

app.set('view engine','hbs');
app.set('views',viewsDirectory);
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsDirectory);

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Ankit Singh'
    })
});

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name : 'Ankit Singh'
    })
});

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        name : 'Ankit Singh',
        helpMessage : 'This is some help text'
    })
});

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            Error : 'You must enter an address!'
        })
    }
    else{
        utils.geocode(req.query.address,(err,{latitude,longitude,place} = {}) =>{
            if(err){
                return res.send({
                    Error : err
                });
            }
            utils.weatherInfo(latitude,longitude,(error,{summary,temperature,rainProbability})=>{
                if(error){
                    return res.send({
                        Error : error
                    });
                }
                return res.send({
                    place,
                    summary,
                    temperature,
                    rainProbability
                })
            })
        })
    }
});

app.get('*',(req,res) => {
    res.render('404',{
        title : 'Page Not Found',
        name : 'Ankit Singh'
    })
});

app.listen(port,() => {
    console.log('Server started and listening @port'+port);
})
