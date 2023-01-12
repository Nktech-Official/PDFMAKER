const env = require("dotenv")
const puppeteer = require('puppeteer')
env.config()

// import html template;


async function printPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(process.env.url, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', path: process.env.location, printBackground: true });

    await browser.close();
    return pdf
}

printPDF()
module.exports = { printPDF }


// allsave boat telegram