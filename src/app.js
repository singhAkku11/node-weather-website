const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akanksha'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akanksha'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Akanksha',
        message: 'This is some helpful text.'
    });
})

app.get('/weather', (req,res) => {
    const location = req.query.address;
    if(!location){
        return res.send({
            error: 'Please provide an address!'
        })
    }

    forecast(location,(error, data) => {
       if(error){
        return res.send({ error })
       }

       res.send({
        forecast: data,
        address: location,
    });
    })
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Akanksha',
        errorMessage: 'Help article not found.'
    });
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Akanksha',
        errorMessage: 'Page not found.'
    });
})

app.listen(3000, () => {
    console.log('Server started on port 3000!');
});