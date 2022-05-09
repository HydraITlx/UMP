import { jsPDF } from "jspdf";
import logo from "../../images/cofinanciado.png";
import autoTable from "jspdf-autotable";
function Header() {}

export function CreateOrderPDF(HeaderData, RowData, DocumentNo) {
  console.log("HeaderData");
  console.log(HeaderData);
  console.log("RowData");
  console.log(RowData);

  const doc = new jsPDF();
  var totalPagesExp = "{total_pages_count_string}";
  let head = [
    [
      "CHNM",
      "Artigo",
      "Qtd. Caixa",
      "Preço Un.",
      "Preço Caixa",
      "Quantidade",
      "Preço",
    ],
  ];

  let body = [];

  RowData.map((item) => {
    body.push([
      item.CHNM,
      item.Description,
      item.Box_Quantity,
      item.Unit_Price_UN,
      item.Unit_Price_Box,
      item.Quantity,
      item.Total_Amount,
    ]);
  });

  body.push([
    {
      content: `Total s/IVA: ${HeaderData.Total_Amount}`,
      colSpan: 7,
      styles: {
        //  fillColor: [196, 189, 151],
        halign: "right",
        fontStyle: "bold",
      },
    },
  ]);

  body.push([
    {
      content: `Total c/IVA: ${HeaderData.Total_AmountVat}`,
      colSpan: 7,
      styles: {
        //   fillColor: [196, 189, 151],
        halign: "right",
        fontStyle: "bold",
      },
    },
  ]);

  doc.autoTable({
    head: head,
    body: body,
    tableWidth: "100%",
    styles: {
      cellWidth: "wrap",
      fontSize: 8,
    },
    headStyles: { fillColor: [238, 236, 225], textColor: 0 },
    columnStyles: {
      ID: { cellWidth: "auto" },
      Country: { cellWidth: "auto" },
      Rank: { cellWidth: "auto" },
    },
    theme: "striped",
    pageBreak: "auto",
    showHead: "everyPage",
    showFoot: "everyPage",
    margin: { top: 75, bottom: 45 },
    didDrawPage: function (data) {
      //HEADER
      doc.addImage(HeaderData.Logo, "jpeg", 10, 10, 20, 20, "teste", "none", 0);
      doc.setFontSize(14).setFont(undefined, "bold");
      doc.text("Unidade de Cuidados Continuados Divina Providência", 40, 20);
      doc.setFontSize(12).setFont(undefined, "bold");
      doc.text(HeaderData.UCC_Name, 10, 40);
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(HeaderData.UccAddress, 10, 45);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text("Contacto:", 10, 50);
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(HeaderData.UccPhoneNo, 27, 50);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text("NIPC:", 10, 55);
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(HeaderData.NIPC, 21, 55);
      doc.setLineWidth(8);
      doc.setDrawColor(238, 236, 225);
      doc.line(210, 65, 0, 65);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text(10, 66, "Local Entrega:");
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(36, 66, HeaderData.Delivery_Address);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text(100, 66, "NE:");
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(108, 66, DocumentNo);
      doc.setFontSize(10).setFont(undefined, "bold");
      doc.text(135, 66, "Fornecedor:");
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(157, 66, HeaderData.Laboratory_Name);

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

      let PharmacSignature = "";

      if (HeaderData.Replacement === true) {
        PharmacSignature = `Assinatura substituto: ${HeaderData.Pharmacist_Name}`;
      } else {
        PharmacSignature = `Assinatura: ${HeaderData.Pharmacist_Name}`;
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
    },
  });

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }
  doc.save(`${DocumentNo}.pdf`);
}
