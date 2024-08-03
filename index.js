const { printPDF, sleep } = require("./makePDF.js")
const { start } = require("./server.js")
const { DirImg, compress, dataXlsx } = require("./argvFilter.js")





const argv = process.argv;

async function main() {
    const server = start()
    const pdf = await printPDF({
        compress: argv.findIndex(compress) > -1 ? true : false,
        imgDir: argv.findIndex(DirImg) > -1 ? argv[process.argv.findIndex(DirImg) + 1] : process.env.imgDir,
        xslxData: argv.findIndex(dataXlsx) > -1 ? argv[process.argv.findIndex(dataXlsx) + 1] : process.env.xslxData,
    })

    server.close()
    console.log("finished");


}

// console.log(process.argv);
// console.log(argv.findIndex(compress));
// console.log(argv.findIndex(DirImg));
// console.log(argv.findIndex(dataXlsx));
main()
