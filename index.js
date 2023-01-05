const dotenv = (require("dotenv")).config();
// Import the required libraries
const excelToJson = require('convert-excel-to-json');
const { jsPDF } = require('jspdf');
const fs = require("fs")

// Convert the Excel file to JSON
const excelData = excelToJson({
    sourceFile: './DATA/footbalDATA.xlsx'
});

// console.log(excelData);
fs.writeFile("./DATA/output/data.json", JSON.stringify(excelData), () => {
    // Create a new PDF document

    const doc = new jsPDF();
    const data = require("./DATA/output/data.json");
    console.log(doc.getPageInfo(1));

    // Iterate through the rows of data in the Excel file
    let page = 1;
    for (let i = 0; i < data.PlayerData.length; i++) {
        // Get the current row of data
        const row = data.PlayerData[i];
        // console.log(`${row.A}\t\t${row.B}\t\t${row.C}`);

        // // Add the data from the row to the PDF document
        if ((10 + (i * 10)) > (doc.getPageInfo(page)).pageContext.mediaBox.topRightY) {
            doc.addPage();
            console.log(doc.getPageInfo(page + 1));
            page += 1;



        }
        doc.text(String(row.A), 10, (((page - 1) * 841.89) + 10) + (i * 10));
        doc.text(String(row.B), 40, (((page - 1) * 841.89) + 10) + (i * 10));
        doc.text(String(row.C), 90, (((page - 1) * 841.89) + 10) + (i * 10));



    }

    // Save the PDF document
    doc.save('./DATA/output/data.pdf');
})

