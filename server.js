const express = require("express")
const path = require("path")
const bodyParser = require('body-parser');

const app = express()
const router = require("./routes/route")

let initialPath = path.join(__dirname, "public")


app.set("view engine", "ejs")


app.use(bodyParser.json());
app.use(express.static(path.join(initialPath)));
app.use("/", router)


router.post("/stock-prices", (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: req.body })
    // let TDKEY = "7852a1e3df16458b858733c4764e161a"

    // async function CurrentPrices(tickers) {
    //     var tdurl = `https://api.twelvedata.com/price?symbol=${tickers.toString()}&apikey=${TDKEY}`;

    //     request.get({
    //         url: tdurl,
    //         json: true,
    //         headers: { 'User-Agent': 'request' }
    //     }, (err, res, data) => {
    //         if (err) {
    //             console.log('Error:', err);
    //         } else if (res.statusCode !== 200) {
    //             console.log('Status:', res.statusCode);
    //         } else {
    //             console.log(data);
    //         }
    //     });
    // }
    // CurrentPrices(["IBM", "TSLA"])
})


app.listen(process.env.PORT || 1000)