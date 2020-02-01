"use strict";

module.exports = fastify => ({
  printPDF: async (req, reply) => {
    var PdfPrinter = require("pdfmake");
    var vfsfonts = require("pdfmake/build/vfs_fonts.js");

    // var fonts = {
    //   Roboto: {
    //     normal: "Roboto-Regular",
    //     bold: "Roboto-Medium",
    //     italics: "Roboto-Italic",
    //     bolditalics: "Roboto-MediumItalic"
    //   }
    // };

    var printer = new PdfPrinter({ timesRoman: { normal: "Times-Roman" } });
    var fs = require("fs");

    var docDefinition = {
      defaultStyle: {
        font: "timesRoman"
      },
      content: [
        {
          text: [
            "This paragraph is defined as an array of elements to make it possible to ",
            { text: "restyle part of it and make it bigger ", fontSize: 15 },
            "than the rest."
          ]
        }
      ]
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream("document.pdf"));
    pdfDoc.end();
  }
});
