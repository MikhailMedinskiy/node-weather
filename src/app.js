const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// define path for express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');


// setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

console.log(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mikhail'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mikhail'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Some help text here'
    })
});


app.get('/weather', (req, res) => {

    if(!req.query.adress){
        return res.send({
            error: "You must provide an adress"
        })
    }

    const { adress } = req.query;

    geocode(adress, (error, {lat, lot, loaction} = {}) =>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(lat, lot, (error, dataForcast) =>{
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast: dataForcast,
                loaction: loaction,
                adress
            })
        })

    });

});

app.get('/products', (req, res) => {

    console.log(req.query.search);

    if(!req.query.search){
      return res.send({
          error: 'you mast provide search'
      })
    };

    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render("404", {
        name: 'Mikhail',
        title: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render("404", {
        name: 'Mikhail',
        title: '404 page'
    })
});

// app.use((req, res) => {
//     res.status(404).render("404", {
//         name: 'me',
//         title: '404 page'
//     })
// });


app.listen(port, () => {
    console.log(`erver is run on port ${port}`)
});