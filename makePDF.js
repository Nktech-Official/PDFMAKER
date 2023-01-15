const env = require("dotenv")
env.config()
const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const path = require('path');
const { execSync } = require("child_process");




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function compressPDF(input) {
    let output = (input.split("."))[0]
    output += "_Compressed.pdf"
    execSync(`gs -q -dNOPAUSE -dBATCH -dSAFER -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 -dAutoRotatePages=/None  -dPDFSETTINGS=/ebook -dEmbedAllFonts=true -dSubsetFonts=true -dColorImageDownsampleType=/Bicubic -dColorImageResolution=240 -dGrayImageDownsampleType=/Bicubic -dGrayImageResolution=240 -dMonoImageDownsampleType=/Bicubic -dMonoImageResolution=240 -sOutputFile=${output} ${input}`)

}



async function printPDF({ compress = false, imgDir, xslxData }) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(process.env.url, { waitUntil: 'networkidle0' });
    const excelData = await page.$("input[name=xlsx]");
    await excelData.uploadFile(xslxData);

    const dir = imgDir
    let filesInDr = []
    const files = await fs.readdir(dir);
    for (const file of files) {
        filesInDr.push(path.join(__dirname, `${dir}/${file}`));
    }
    const [FileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click("input[name=img]"), // some button that triggers file selection
    ]);
    await FileChooser.accept(filesInDr);
    await page.waitForSelector(".container")
    await page.evaluate(async () => {
        const selectors = Array.from(document.querySelectorAll("img"));
        await Promise.all(selectors.map(img => {
            if (img.complete) return;
            return new Promise((resolve, reject) => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', reject);
            });
        }));
    })
    const pdf = await page.pdf({ format: 'A4', path: process.env.location, printBackground: true });
    await browser.close();
    console.log("PDF Catelouge Generated");
    if (compress) {

        compressPDF(process.env.location)
        console.log("PDF Catelouge compressed");

    }
    return pdf
}

// 
if (!module.parent) {
    printPDF(true)
}




module.exports = { printPDF, sleep }


