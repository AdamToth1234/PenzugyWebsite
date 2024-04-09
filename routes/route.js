const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/currency", (req, res) => {
    res.render("currency")
})


// app.get("/currency-exchange", (req, res) => {
//     fetch
// })


module.exports = router