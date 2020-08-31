const functions = require('firebase-functions');

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const stripe = require('stripe')('add your key');
var path = require('path')
var fs = require('fs')
var https = require('https')
var certOptions = {
  key: fs.readFileSync(path.resolve('./server.key')),
  cert: fs.readFileSync(path.resolve('./server.crt'))
}

const port = 8585
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

app.get('*', (req, res) => {
  res.send("Hello from the API")
})

app.post('/pay', async (req, res) => {
    const {amount, billingDetails} = req.body;
    
    const customer = await stripe.customers.create({
      email: billingDetails.email,
      name: billingDetails.name,
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        customer: customer.id,
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: billingDetails.email,
        description: `Purchased the ${billingDetails.name}`,
        shipping: {
          name: billingDetails.name,
          address: {
            line1: billingDetails.address.line1,
            city: billingDetails.address.city,
            country: billingDetails.address.country,
            postal_code: billingDetails.address.postal_code
          }
        }
      });
      res.json({'client_secret': paymentIntent['client_secret']})
})

//https.createServer(certOptions, app).listen(port, () => console.log(`Example app listening on port ${port}! https://localhost:${port}`))

app.listen(port, () => console.log(`Example app listening on port ${port}! http://localhost:${port}`))
exports.api = functions.https.onRequest(app)