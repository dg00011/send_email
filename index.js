const express = require('express')
const app = express()
const https = require('https');

app.get("/", (req, res) => {


    console.loga('req',req,req.body)
    // res.send({message:'Hey'})

    //if (Object.keys(req.query).length > 0) {

    //const configurationLink = `${req.query.configuration_link}${req.query.threekit_short_id}`;


    const data = JSON.stringify({
        From: 'DNA@jlgloveco.com',
        To: 'dheerajg@digitizeco.in',
        MessageStream: 'jl-gloves',
        TemplateAlias: 'code-your-own-1',
        TemplateModel: {
            customer_name: 'we are in index',
            customer_email: "req.query.email",
            customer_phone: "req.query.phone",
            configuration_id: "req.query.configuration_id",
            configuration_link: "configurationLink",
            snapshot: req.query.snapshot,
        },
    });



    const options = {
        hostname: 'api.postmarkapp.com',
        path: '/email/withTemplate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': '8100fc97-2fd9-4472-85f5-7df8d87f71b2',
        },
    };


    const request = https.request(options, (response) => {

        let responseBody = '';
        response.on('data', (chunk) => {
            responseBody += chunk;
        });


        response.on('end', () => {
            console.log(responseBody);
        });

    });


    request.on('error', (error) => {
        console.error(error);
    });


    request.write(data);
    request.end();

    // }

})



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running at ${port}`));