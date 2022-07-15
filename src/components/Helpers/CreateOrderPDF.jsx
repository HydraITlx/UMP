import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import base64 from "base-64";

export function CreateOrderPDF(HeaderData, RowData, DocumentNo, printBase64) {
  console.log("CRIA O PDF");
  console.log(HeaderData);
  let TotalAmount = 0;
  let TotalAmountVat = 0;

  console.log({ RowData });

  const doc = new jsPDF();
  var totalPagesExp = "{total_pages_count_string}";
  let head = [];

  let body = [];

  let columnStyles = [];

  let obsLines = [];

  if (HeaderData.Stockist == true) {
    head = [
      [
        "CHNM",
        "Artigo",
        "Nome C.",
        "Unid/Embal",
        "Preço Un.(s/IVA)",
        "Preço Emb.",
        "Nº Emb.",
        "Preço(s/IVA)",
      ],
    ];

    RowData.map((item) => {
      body.push([
        item.CHNM,
        item.Description,
        item.Comercial_Branch,
        item.Box_Quantity,
        item.Unit_Price_UN,
        item.Unit_Price_Box,
        item.Quantity,
        item.Total_Amount,
      ]);
      if (item.Observations !== "") {
        console.log(item.Observations);
        if (obsLines.length === 0) {
          console.log(item.CHNM);
          obsLines.push({
            content: `Observações: ${item.Observations}(${item.CHNM});`,
            colSpan: 8,
            styles: {
              //   fillColor: [196, 189, 151],
              halign: "lett",
              fontStyle: "bold",
            },
          });
          console.log("obsLines");
          console.log(obsLines[0].content);
        } else {
          obsLines[0].content =
            obsLines[0].content + ` ${item.Observations}(${item.CHNM});`;
        }
      }
    });

    columnStyles = {
      0: { cellWidth: 18 },
      1: { cellWidth: 50 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 20 },
      7: { cellWidth: 20 },
    };
  } else {
    RowData.map((item) => {
      head = [
        [
          "CHNM",
          "Artigo",
          "Unid/Embal",
          "Preço Un.(s/IVA)",
          "Preço Emb.",
          "Nº Emb.",
          "Preço(s/IVA)",
        ],
      ];

      body.push([
        item.CHNM,
        item.Description,
        item.Box_Quantity,
        item.Unit_Price_UN,
        item.Unit_Price_Box,
        item.Quantity,
        item.Total_Amount,
      ]);
      20;
    });

    columnStyles = {
      0: { cellWidth: 18 },
      1: { cellWidth: 70 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 20 },
    };
  }

  //TESTESTETE
  let TotalIndexes = [];
  let ArrayAmountVat = 0;
  let ArrayAmount = 0;
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      TotalIndexes.indexOf(currentValue.Tax_Percentage) === -1
        ? TotalIndexes.push(currentValue.Tax_Percentage)
        : "";
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  const GroupedByVat = groupBy(RowData, "Tax_Percentage");

  TotalIndexes.map((index) => {
    body.push([
      {
        content: ``,
        colSpan: 8,
        styles: {
          fillColor: [255, 255, 255],
          halign: "right",
          fontStyle: "bold",
        },
      },
    ]);
    ArrayAmount = 0;
    ArrayAmountVat = 0;
    GroupedByVat[index].map(({ Total_Amount, Total_AmountVat }) => {
      ArrayAmount = ArrayAmount + parseFloat(Total_Amount.replace(",", "."));
      ArrayAmountVat =
        ArrayAmountVat + parseFloat(Total_AmountVat.replace(",", "."));
      TotalAmount = TotalAmount + parseFloat(Total_Amount.replace(",", "."));
      TotalAmountVat =
        TotalAmountVat + parseFloat(Total_AmountVat.replace(",", "."));
    });
    body.push([
      {
        content: `Total s/IVA( ${index}% ):  ${Number(ArrayAmount)
          .toFixed(2)
          .replace(".", ",")}€`,
        colSpan: 8,
        styles: {
          fillColor: [238, 236, 225],
          halign: "right",
          fontStyle: "bold",
          borders: "t",
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
        },
      },
    ]);

    body.push([
      {
        content: `Total c/IVA( ${index}% ): ${Number(ArrayAmountVat)
          .toFixed(2)
          .replace(".", ",")}€`,
        colSpan: 8,
        styles: {
          fillColor: [238, 236, 225],
          halign: "right",
          fontStyle: "bold",
          borders: "t",
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
        },
      },
    ]);
  });

  //TESTESTETE

  body.push([
    {
      content: `Total s/IVA: ${Number(TotalAmount)
        .toFixed(2)
        .replace(".", ",")}€`,
      colSpan: 8,
      styles: {
        //  fillColor: [196, 189, 151],
        halign: "right",
        fontStyle: "bold",
      },
    },
  ]);

  body.push([
    {
      content: `Total c/IVA: ${Number(TotalAmountVat)
        .toFixed(2)
        .replace(".", ",")}€`,
      colSpan: 8,
      styles: {
        //   fillColor: [196, 189, 151],
        halign: "right",
        fontStyle: "bold",
      },
    },
  ]);

  body.push(obsLines);

  doc.autoTable({
    head: head,
    body: body,
    tableWidth: "100%",
    styles: {
      cellWidth: "wrap",
      fontSize: 8,
      halign: "center",
    },

    headStyles: { fillColor: [238, 236, 225], textColor: 0 },

    columnStyles: columnStyles,
    theme: "striped",
    pageBreak: "auto",
    showHead: "everyPage",
    showFoot: "everyPage",
    margin: { top: 75, bottom: 45 },
    didDrawPage: function (data) {
      //HEADER
      console.log("HeaderData.Logo");
      console.log(HeaderData.Logo);
      if (HeaderData.Logo !== "") {
        doc.addImage(
          HeaderData.Logo,
          "jpeg",
          10,
          10,
          20,
          20,
          "teste",
          "none",
          0
        );
      }
      doc.setFontSize(14).setFont(undefined, "bold");
      doc.text("Nota de Encomenda", 90, 20);
      doc.setFontSize(14).setFont(undefined, "bold");
      doc.text("Unidade de Cuidados Continuados", 70, 30);
      doc.setFontSize(12).setFont(undefined, "bold");
      doc.text(HeaderData.UCC_Name, 10, 35);

      if (HeaderData.Stockist == true) {
        doc.setFontSize(10).setFont(undefined, "bold");
        doc.text("Cod. impresso Armazenista:", 120, 40);
        doc.setFontSize(10).setFont(undefined, "normal");
        doc.text(HeaderData.Encoding_of_Stockist, 169, 40);
      } else {
        doc.setFontSize(10).setFont(undefined, "bold");
        doc.text("Cod. impresso Lab:", 120, 40);
        doc.setFontSize(10).setFont(undefined, "normal");
        doc.text(HeaderData.Lab_print_coding, 154, 40);
      }
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(HeaderData.UccAddress, 10, 40);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text("Cód. Postal:", 10, 45);
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(HeaderData.Post_Code, 32, 45);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text("Contacto:", 10, 50);
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(HeaderData.UccPhoneNo, 27, 50);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text("NIPC:", 10, 55);
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(HeaderData.NIPC, 21, 55);
      doc.setLineWidth(16);
      doc.setDrawColor(238, 236, 225);
      doc.line(210, 65, 0, 65);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text(10, 70, "Local Entrega:");
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(36, 70, HeaderData.Delivery_Address);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text(10, 63, "NE:");
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(17, 63, DocumentNo);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text(110, 63, "Fornecedor:");
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(132, 63, HeaderData.Laboratory_Name);

      //HEADER

      let currentPageNum = doc.internal.getCurrentPageInfo().pageNumber;

      // Footer
      var str = "Página " + currentPageNum; //doc.internal.getNumberOfPages();
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        str = str + " de " + totalPagesExp;
      }

      var dateStr = `Data e Hora: ${HeaderData.PostedDateTime.slice(
        0,
        10
      )} ${HeaderData.PostedDateTime.slice(11, 16)}`;

      doc.setFontSize(8);
      doc.setTextColor(40);
      //doc.setFontStyle('normal');
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      var pageWidth = pageSize.width;

      let PharmacSignature = `Assinatura: ${HeaderData.Pharmacist_Name}`;
      let IsSub = "";

      if (HeaderData.Replacement == true) {
        IsSub = `Farmacêutica substituta`;
      } else {
        IsSub = ``;
      }

      doc.setLineWidth(16);
      doc.setDrawColor(238, 236, 225);
      doc.line(210, pageHeight - 35, 0, pageHeight - 35);

      doc.setFontSize(8).setFont(undefined, "bold");
      doc.text("Prazos/Condições entrega:", 14, pageHeight - 39);
      doc.setFontSize(8).setFont(undefined, "normal");
      doc.text(HeaderData.Delivery_Terms, 51, pageHeight - 39);
      doc.setFontSize(8).setFont(undefined, "bold");
      doc.text("Prazo Pagamento:", 14, pageHeight - 29);
      doc.setFontSize(8).setFont(undefined, "normal");
      doc.text(HeaderData.Payment_Terms, 39, pageHeight - 29);
      doc.setFontSize(8).setFont(undefined, "bold");
      doc.text("Valor Mínimo:", 14, pageHeight - 34);
      doc.setFontSize(8).setFont(undefined, "normal");
      doc.text(HeaderData.Order_Minimum_Amount, 33, pageHeight - 34);
      doc.setFontSize(8).setFont(undefined, "normal");

      doc.setFontSize(8).setFont(undefined, "bold");
      doc.text("Contacto:", pageWidth / 2, pageHeight - 39);
      doc.setFontSize(8).setFont(undefined, "normal");
      doc.text(HeaderData.Contact_Phone, pageWidth / 1.77, pageHeight - 39);

      doc.setFontSize(8).setFont(undefined, "bold");
      doc.text("E-Mail:", pageWidth / 2, pageHeight - 34);
      doc.setFontSize(8).setFont(undefined, "normal");
      doc.text(HeaderData.Contact_Order, pageWidth / 1.82, pageHeight - 34);

      doc.setFontSize(8).setFont(undefined, "bold");
      doc.text(dateStr, 14, pageHeight - 20);
      doc.text(str, 14, pageHeight - 15);

      doc.setFontSize(8).setFont(undefined, "bold");
      doc.text(PharmacSignature, 120, pageHeight - 20);
      doc.setFontSize(8).setFont(undefined, "bold");
      doc.text(IsSub, 120, pageHeight - 15);
    },
  });

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  if (printBase64) {
    var out = doc.output();
    var url = "data:application/pdf;base64," + base64.encode(out);
    return base64.encode(out);
  } else {
    doc.saveasop;
    doc.save(`${DocumentNo}.pdf`);
  }
}
