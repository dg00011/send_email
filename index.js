const express = require('express')
const app = express()
const https = require('https');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/test", (req, res) => {


    console.log('req.body:', req.body)

    //if (Object.keys(req.query).length > 0) {

    // const configurationLink = `${req.query.configuration_link}${req.query.threekit_short_id}`;

    const data = JSON.stringify({
        From: 'DNA@jlgloveco.com',
        To: 'dheerajg@digitizeco.in',
        MessageStream: 'jl-gloves',
        TemplateAlias: 'code-your-own-1',
        TemplateModel: {
            customer_name: req.body.name,
            customer_email: req.body.email,
            customer_phone: req.body.phone,
            configuration_id: req.body.configuration_id,
            configuration_link: req.body.configuration_link,
            snapshot: req.body.snapshot,
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




app.post("/cart", (req, res) => {

    // const configurationLink = `${req.query.configuration_link}${req.query.threekit_short_id}`;

    let jlGlovesInfo = JSON.parse(req.body.jlGloves);
    //console.log('gg', jlGlovesInfo)
    let productName = jlGlovesInfo.productInfo.gloveSelected
    let size = jlGlovesInfo['productInfo']['size'].replace('"', ' inches') //replace('"',' inches',jlGlovesInfo['productInfo']['size']);
    let hand = jlGlovesInfo['productInfo']['hand'];
    let price = jlGlovesInfo['itemPrice'];
    let orderIdentification = jlGlovesInfo['orderIdentification'];


    let allDataObject = Object();

    let webbingHtml = ''
    let webbingInfo = jlGlovesInfo.productInfo.Webbing;
    webbingHtml = "<table border='0' cellpadding='0' cellspacing='0' class='row row-15' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='1' bordercolor='#e1e1e1' cellpadding='6' cellspacing='8' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecf0f3; color: #000000; width: 680px;' width='680'><tbody><tr><th colspan='2' style='text-align:left;'>Webbing</th></tr>"
    if (webbingInfo) {
        Object.keys(webbingInfo).forEach(key => {
            if ((key) && (key !== 'reset')) {
                webbingHtml += `<tr><th>${key}</th><td>${webbingInfo[key]}</td></tr>`;               
                allDataObject[key]=webbingInfo[key];
            }
        });
    }
    webbingHtml += "</tbody></table></td></tr></tbody></table>";


    let colorHtml = ''
    let colorInfo = jlGlovesInfo.productInfo.Color;
    colorHtml = "<table border='0' cellpadding='0' cellspacing='0' class='row row-15' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='1' bordercolor='#e1e1e1' cellpadding='6' cellspacing='8' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecf0f3; color: #000000; width: 680px;' width='680'><tbody><tr><th colspan='2' style='text-align:left;'>Color</th></tr>"
    if (colorInfo) {
        Object.keys(colorInfo).forEach(key => {
            if ((key) && (key !== 'reset')) {
                colorHtml += `<tr><th>${key}</th><td>${colorInfo[key]}</td></tr>`;
                allDataObject[key]=colorInfo[key];
            }
        });
    }
    colorHtml += "</tbody></table></td></tr></tbody></table>";


    let logoHtml = ''
    let logoInfo = jlGlovesInfo.productInfo.Logo;
    logoHtml = "<table border='0' cellpadding='0' cellspacing='0' class='row row-15' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='1' bordercolor='#e1e1e1' cellpadding='6' cellspacing='8' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecf0f3; color: #000000; width: 680px;' width='680'><tbody><tr><th colspan='2' style='text-align:left;'>Logo</th></tr>"
    if (logoInfo) {
        Object.keys(logoInfo).forEach(key => {
            if ((key) && (key !== 'reset')) {
                logoHtml += `<tr><th>${key}</th><td>${logoInfo[key]}</td></tr>`;
                allDataObject[key]=logoInfo[key];
            }
        });
    }
    logoHtml += "</tbody></table></td></tr></tbody></table>";


    let fingerWristHtml = ''
    let fingerWristInfo = jlGlovesInfo.productInfo.FingerWrist;
    fingerWristHtml = "<table border='0' cellpadding='0' cellspacing='0' class='row row-15' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='1' bordercolor='#e1e1e1' cellpadding='6' cellspacing='8' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecf0f3; color: #000000; width: 680px;' width='680'><tbody><tr><th colspan='2' style='text-align:left;'>Finger / Wrist</th></tr>"
    if (fingerWristInfo) {
        Object.keys(fingerWristInfo).forEach(key => {
            if ((key) && (key !== 'reset')) {
                fingerWristHtml += `<tr><th>${key}</th><td>${fingerWristInfo[key]}</td></tr>`;
                allDataObject[key]=fingerWristInfo[key];
            }
        });
    }
    fingerWristHtml += "</tbody></table></td></tr></tbody></table>";


    let embroideryHtml = ''
    let embroideryInfo = jlGlovesInfo.productInfo.Embroidery;
    embroideryHtml = "<table border='0' cellpadding='0' cellspacing='0' class='row row-15' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='1' bordercolor='#e1e1e1' cellpadding='6' cellspacing='8' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecf0f3; color: #000000; width: 680px;' width='680'><tbody><tr><th colspan='2' style='text-align:left;'>Embroidery</th></tr>"
    if (embroideryInfo) {
        Object.keys(embroideryInfo).forEach(key => {
            if ((key) && (key !== 'reset')) {
                embroideryHtml += `<tr><th>${key}</th><td>${embroideryInfo[key]}</td></tr>`;
                allDataObject[key]=embroideryInfo[key];
            }
        });
    }
    embroideryHtml += "</tbody></table></td></tr></tbody></table>";


    const data = JSON.stringify({
        From: 'DNA@jlgloveco.com',
        To: 'dheerajg@digitizeco.in',
        MessageStream: 'jl-gloves',
        TemplateAlias: 'code-your-own-2',
        TemplateModel: {
            glove_name: productName,
            glove_size: size,
            glove_hand: hand,
            glove_price: price,
            webbing: webbingHtml,
            orderIdentification: orderIdentification,
            color: colorHtml,
            logo: logoHtml,
            embroidery: embroideryHtml,
            fingerWrist: fingerWristHtml,
            snapshot: req.body.snapshot,
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
            res.send({isEmailSent:true,data:allDataObject})
        });
    });


    request.on('error', (error) => {
        console.error(error);
    });

    request.write(data);
    request.end();


})



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running at ${port}`));