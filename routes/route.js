const express = require("express")
const router = express.Router()
const request = require("request")

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/crypto", (req, res) => {
    res.render("crypto")
})

router.get("/stock-market", (req, res) => {
    res.render("stock")
})

router.get("/currency", (req, res) => {
    res.render("currency")
})

router.post("/crypto-prices", (req, res) => {
    const access_key = '0037ae847749e04f0f951df407d8ad55'

    fetch(`http://api.coinlayer.com/api/live?access_key=${access_key}&symbols=${req.body.input.toString()}`)
    .then(response => response.json())
    .then(data => {
        res.status(200).json( {message: data} )
    })
    .catch(error => {
        console.error('Hiba történt a fetch kérés során:', error)
    })

})

router.post("/stock-prices", (req, res) => {
    let TDKEY = "7852a1e3df16458b858733c4764e161a"
    var tdurl = `https://api.twelvedata.com/price?symbol=${req.body.input.toString()}&apikey=${TDKEY}`

    request.get({
        url: tdurl,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, response, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (response.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            res.status(200).json({ message: data})
        }
    })
})


module.exports = router