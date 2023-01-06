const fs = require('fs');
const env = require("dotenv")
const excelToJson = require('convert-excel-to-json');
const puppeteer = require('puppeteer')
env.config()

// import html template;


async function printPDF() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(process.env.url, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', path: process.env.location , printBackground: true });

    await browser.close();
    return pdf
}

function excelJson(file) {

    const excelData = excelToJson({
        sourceFile: file
    });
    const data = excelData.Sheet1;
    const d = []
    for (let i = 1; i < data.length; i++) {
        d.push({
            "code": data[i].A,
            "name": data[i].B,
            "prize": data[i].C,
            "size": data[i].D,
            "color": data[i].E,
            "image": data[i].F

        })


    }
    return d;
}

// const ed = excelJson("./DATA/daat.ods")
// fs.writeFile("./daat.json", JSON.stringify(ed), () => { })
// console.log(data.Sheet1[0]);

printPDF()
module.exports = { printPDF, excelJson }


// allsave boat telegram