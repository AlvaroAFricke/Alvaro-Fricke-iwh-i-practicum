const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.TOKEN;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const companies = 'https://api.hubspot.com/crm/v3/objects/companies?properties=name,city,annualrevenue';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(companies, { headers });
        const data =  resp.data.results;
        res.render('companies', { title: 'Companies', companies: data });      
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.
// * Code for Route 2 goes here
app.get('/update', async (req, res) => {
    try {
        res.render('form', { title: 'Companies'});      
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.
// * Code for Route 3 goes here
app.post('/update', async (req, res) => {
    const companies = 'https://api.hubspot.com/crm/v3/objects/companies'
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    const newCompanie = {
        properties : {
            "name": req.body.name,
            "city": req.body.city,
            "annualrevenue": req.body.annualrevenue
        }
    }
    const JSONnewCompanie = JSON.stringify(newCompanie)
    try {
        await axios.post(companies, JSONnewCompanie, { headers });
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})
 
// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));