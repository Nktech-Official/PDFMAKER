const express = require('express')
const dotenv = (require('dotenv')).config()
const { printPDF } = require("./makePDF.js")


const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/pdfGenrate", async (req, res) => {
    console.log(req.data);
    const data = await printPDF();
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': data.length })
    res.send(data)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
