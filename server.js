const express = require("express")
const path = require("path")

const app = express()
const router = require("./routes/route")

let initialPath = path.join(__dirname, "public")


app.set("view engine", "ejs")


app.use(express.static(path.join(initialPath)));
app.use("/", router)


app.listen(process.env.PORT || 1000)