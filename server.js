const express = require('express')
const dotenv = (require('dotenv')).config()


const app = express()
const port = process.env.port || 3000

app.use(express.static('./pdfTemp/dist'))



const start = () => {
    const server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    return server

}

// 
if (!module.parent) {
    start()
}

module.exports = { start, port }