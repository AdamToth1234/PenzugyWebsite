const express = require("express")
const request = require("request")
const router = express.Router()

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


module.exports = router