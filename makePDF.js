const env = require("dotenv")
env.config()
const puppeteer = require('puppeteer')
const convertapi = require('convertapi')(process.env.api);


// import html template;


async function printPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(process.env.url, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', path: process.env.location, printBackground: true });
    convertapi.convert('compress', {
        File: process.env.location
    }, 'pdf').then(function (result) {
        result.saveFiles(process.env.locationCompressed);
    });
    await browser.close();
    return pdf
}

printPDF()
module.exports = { printPDF }


// allsave boat telegram