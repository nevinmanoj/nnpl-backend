import ExcelJs from "exceljs";
import { calcTotal } from "../../utils/calcTotal.js";
import { ddmmyyyy } from "../../utils/formatDate.js";

export const POExcel = (data) => {
  const workbook = new ExcelJs.Workbook();
  var sheet = workbook.addWorksheet();

  sheet.properties.defaultColWidth = 10;
  sheet.getColumn("A").width = 8;
  sheet.getColumn("J").width = 12;
  sheet.getColumn("K").width = 12;

  const bold = {
    size: 11,
    bold: true,
  };
  const centerAlign = {
    horizontal: "center",
    vertical: "middle",
  };

  //heading
  sheet.mergeCells("A1:K1");
  sheet.getCell("A1").value = "Purchase Order";
  sheet.getCell("A1").font = bold;
  sheet.getCell("A1").alignment = centerAlign;

  //PO number
  sheet.getCell("A2").value = "Purchase Order No:";
  sheet.getCell("A2").font = bold;
  sheet.getCell("C2").value = data.ref;
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: 2,
    EndCol: 2,
    EndRow: 2,
    sheet,
  });
  sheet = makeOuterBorder({
    startCol: 3,
    startRow: 2,
    EndCol: 7,
    EndRow: 2,
    sheet,
  });

  //Date

  sheet.getCell("H2").value = "Date";
  sheet.getCell("H2").font = bold;
  sheet.getCell("I2").value = ddmmyyyy(data.date);
  sheet = makeOuterBorder({
    startCol: 8,
    startRow: 2,
    EndCol: 8,
    EndRow: 2,
    sheet,
  });
  sheet = makeOuterBorder({
    startCol: 9,
    startRow: 2,
    EndCol: 11,
    EndRow: 2,
    sheet,
  });

  //distributor

  sheet.getCell("A3").value = "To,";
  sheet.getCell("A3").font = bold;
  sheet.getCell("A4").value = data.distributor.title;
  sheet.getCell("A4").font = bold;
  sheet.getCell("A5").value = data.distributor.address1;
  sheet.getCell("A6").value = data.distributor.address2
    ? data.distributor.address2
    : "";
  // sheet.getCell("A7").value = data.distributor.address3
  // ? data.distributor.address3
  // : "";
  sheet.getCell("A7").value = data.distributor.address3;
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: 3,
    EndCol: 7,
    EndRow: 3,
    sheet,
  });
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: 4,
    EndCol: 7,
    EndRow: 10,
    sheet,
  });

  //Billing details
  sheet.getCell("H3").value = "BILLING& DELIVERY ADDRESS";
  sheet.getCell("H3").font = bold;
  sheet.getCell("H4").value = data.billing.title;
  sheet.getCell("H4").font = bold;
  sheet.getCell("H5").value = data.billing.address1;
  sheet.getCell("H6").value =
    data.billing.address2 + " " + data.billing.address3;
  sheet.getCell("H7").value = "Ph.No:" + data.billing.phno;
  sheet.getCell("H8").value = "Email: " + data.billing.email;
  sheet.getCell("H9").value = "GST";
  sheet.getCell("J9").value = data.billing.gst;
  sheet.getCell("H10").value = "PAN";
  sheet.getCell("J10").value = data.billing.pan;
  sheet = makeOuterBorder({
    startCol: 8,
    startRow: 3,
    EndCol: 11,
    EndRow: 3,
    sheet,
  });
  sheet = makeOuterBorder({
    startCol: 8,
    startRow: 4,
    EndCol: 11,
    EndRow: 8,
    sheet,
  });

  for (let row = 9; row <= 10; row++) {
    for (let col = 8; col <= 10; col += 2) {
      sheet = makeOuterBorder({
        startCol: col,
        startRow: row,
        EndCol: col + 1,
        EndRow: row,
        sheet,
      });
    }
  }

  //Sir
  sheet.getCell("A11").value = "Sir,";
  sheet.getCell("B12").value =
    "We here by place an order for the folowing items as per the terms & Conditions. ";
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: 11,
    EndCol: 11,
    EndRow: 13,
    sheet,
  });
  //products table
  //header
  sheet.getCell("A14").value = "Sl.No.";
  sheet.getCell("A14").font = bold;
  sheet.getCell("A14").alignment = centerAlign;
  sheet.mergeCells("B14:G14");
  sheet.getCell("B14").value = "Product Description";
  sheet.getCell("B14").font = bold;
  sheet.getCell("B14").alignment = centerAlign;
  sheet.getCell("H14").value = "Partcode";
  sheet.getCell("H14").font = bold;
  sheet.getCell("H14").alignment = centerAlign;
  sheet.getCell("I14").value = "Qty";
  sheet.getCell("I14").font = bold;
  sheet.getCell("I14").alignment = centerAlign;
  sheet.getCell("J14").value = "Rate/Unit";
  sheet.getCell("J14").font = bold;
  sheet.getCell("J14").alignment = centerAlign;
  sheet.getCell("K14").value = "Amount Rs.";
  sheet.getCell("K14").font = bold;
  sheet.getCell("K14").alignment = centerAlign;

  //items
  var index = 15;
  for (var i = 0; i < data.products.length; i++) {
    var prd = data.products[i];
    sheet.getCell(`A${index}`).value = i + 1;
    sheet.getCell(`A${index}`).alignment = centerAlign;
    sheet.mergeCells(`B${index}:G${index}`);
    let prddec = prd.product;
    if (prd.productDesc) {
      prddec = prddec + " " + prd.productDesc;
    }
    const height = Math.ceil(prddec.length / 60) * 16;
    sheet.getRow(index).height = height;
    sheet.getCell(`B${index}`).value = prddec;
    sheet.getCell(`B${index}`).alignment = { wrapText: true };
    sheet.getCell(`H${index}`).value = prd.partCode;
    sheet.getCell(`H${index}`).alignment = centerAlign;
    sheet.getCell(`I${index}`).value = prd.qty;
    sheet.getCell(`I${index}`).alignment = centerAlign;
    sheet.getCell(`J${index}`).value = prd.ratePerUnit;
    sheet.getCell(`J${index}`).alignment = centerAlign;
    sheet.getCell(`J${index}`).numFmt = "#,##,##0.00";
    sheet.getCell(`K${index}`).value = prd.qty * prd.ratePerUnit;
    sheet.getCell(`K${index}`).alignment = centerAlign;
    sheet.getCell(`K${index}`).numFmt = "#,##,##0.00";
    index = index + 1;
    if (prd.footNote != null) {
      sheet.mergeCells(`B${index}:G${index}`);
      sheet.mergeCells(`A${index - 1}:A${index}`);
      sheet.mergeCells(`H${index - 1}:H${index}`);
      sheet.mergeCells(`I${index - 1}:I${index}`);
      sheet.mergeCells(`J${index - 1}:J${index}`);
      sheet.mergeCells(`K${index - 1}:K${index}`);
      sheet.getCell(`C${index}`).value = prd.footNote;
      sheet.getCell(`C${index}`).alignment = { ...centerAlign, wrapText: true };
      index = index + 1;
    }
  }
  sheet = makeAllBorders({
    startCol: 1,
    startRow: 14,
    EndCol: 11,
    EndRow: index - 1,
    sheet,
  });
  //subtotal, total and tax
  const subTotal = calcTotal(data.products);
  sheet.getCell(`H${index}`).value = "Sub Total";
  sheet.getCell(`H${index}`).font = bold;
  sheet.getCell(`K${index}`).value = subTotal;
  sheet.getCell(`K${index}`).font = bold;
  sheet.getCell(`K${index}`).numFmt = "#,##,##0.00";
  index = index + 1;
  const convtax = parseFloat(data.ledgerAccount.tax);
  const taxValue = (subTotal * convtax) / 100;
  sheet.getCell(`H${index}`).value = "GST";
  sheet.getCell(`H${index}`).font = bold;
  sheet.getCell(`J${index}`).value = data.ledgerAccount.tax + "%";
  sheet.getCell(`J${index}`).font = bold;
  sheet.getCell(`K${index}`).value = taxValue;
  sheet.getCell(`K${index}`).font = bold;
  sheet.getCell(`K${index}`).numFmt = "#,##,##0.00";
  index = index + 1;
  const convDiscount = parseFloat(data.discount);
  sheet.getCell(`H${index}`).value = "Discount";
  sheet.getCell(`H${index}`).font = bold;
  sheet.getCell(`K${index}`).value = data.discount;
  sheet.getCell(`K${index}`).font = bold;
  sheet.getCell(`K${index}`).numFmt = "#,##,##0.00";
  index = index + 1;
  const convRoundOff = parseFloat(data.roundOff);
  sheet.getCell(`H${index}`).value = "RoundOff";
  sheet.getCell(`H${index}`).font = bold;
  sheet.getCell(`K${index}`).value = data.roundOff;
  sheet.getCell(`K${index}`).font = bold;
  sheet.getCell(`K${index}`).numFmt = "#,##,##0.00";
  index = index + 1;

  sheet.getCell(`H${index}`).value = "Total with tax";
  sheet.getCell(`H${index}`).font = bold;
  const grandTotal = subTotal + taxValue + convRoundOff - convDiscount;
  sheet.getCell(`K${index}`).value = grandTotal;
  sheet.getCell(`K${index}`).font = bold;
  sheet.getCell(`K${index}`).numFmt = "#,##,##0.00";
  index = index + 1;

  //customer
  sheet.getCell(`A${index}`).value = "End User Detail:";
  sheet.getCell(`A${index}`).font = bold;
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: index,
    EndCol: 11,
    EndRow: index,
    sheet,
  });
  index = index + 1;
  sheet.getCell(`A${index}`).value = data.customer.companyName;
  sheet.getCell(`A${index}`).font = bold;
  sheet.getCell(`G${index}`).value = "Contact Person: " + data.customer.contact;
  sheet.getCell(`G${index}`).font = bold;
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: index,
    EndCol: 11,
    EndRow: index + 4,
    sheet,
  });
  index = index + 1;
  sheet.getCell(`A${index}`).value = data.customer.address1;
  sheet.getCell(`G${index}`).value = "Email: " + data.customer.contactEmail;
  sheet.getCell(`G${index}`).font = bold;
  index = index + 1;
  sheet.getCell(`A${index}`).value = data.customer.address2;
  sheet.getCell(`G${index}`).value = "Con no: " + data.customer.contactNumber;
  sheet.getCell(`G${index}`).font = bold;
  index = index + 1;
  sheet.getCell(`A${index}`).value =
    data.customer.city + "-" + data.customer.pin;
  index = index + 1;

  //terms and conditions
  sheet.mergeCells(`A${index}:K${index}`);
  sheet.getCell(`A${index}`).value = "Terms&Conditions";
  sheet.getCell(`A${index}`).font = bold;
  sheet.getCell(`A${index}`).alignment = centerAlign;
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: index,
    EndCol: 11,
    EndRow: index,
    sheet,
  });
  index = index + 1;
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: index,
    EndCol: 2,
    EndRow: index + Object.keys(data.tc).length - 1,
    sheet,
  });
  sheet = makeOuterBorder({
    startCol: 3,
    startRow: index,
    EndCol: 11,
    EndRow: index + Object.keys(data.tc).length - 1,
    sheet,
  });
  for (var item in data.tc) {
    sheet.getCell(`A${index}`).value =
      item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    sheet.getCell(`A${index}`).font = bold;
    sheet.getCell(`C${index}`).value = data.tc[item];
    index = index + 1;
  }

  //sign
  sheet.getCell(`A${index}`).value = "Sincerely, ";
  index = index + 1;
  sheet.getCell(`A${index}`).value = "For NEURAL NETWORKS PVT. LTD.";
  sheet.getCell(`A${index}`).font = bold;
  index = index + 1;
  const sign = workbook.addImage({
    filename: "src/assets/manojsign.png",
    extension: "png",
  });
  sheet.addImage(sign, `A${index}:B${index + 3}`);
  index = index + 4;
  sheet.getCell(`A${index}`).value = "MANOJ P. JOSEPH";
  sheet.getCell(`A${index}`).font = bold;
  index = index + 1;
  sheet.getCell(`A${index}`).value = "DIRECTOR ";
  sheet.getCell(`A${index}`).font = bold;

  // outer border
  sheet = makeOuterBorder({
    startCol: 1,
    startRow: 1,
    EndCol: 11,
    EndRow: index + 1,
    sheet,
  });
  return workbook;
};

//apply border funcitons
const makeOuterBorder = ({ startCol, startRow, EndCol, EndRow, sheet }) => {
  for (let row = startRow; row <= EndRow; row++) {
    for (let col = startCol; col <= EndCol; col++) {
      let cell = sheet.getCell(row, col);

      // Apply border styles
      if (row === startRow) {
        cell.border = { ...cell.border, top: { style: "thin" } };
      }
      if (row === EndRow) {
        cell.border = { ...cell.border, bottom: { style: "thin" } };
      }
      if (col === EndCol) {
        cell.border = { ...cell.border, right: { style: "thin" } };
      }
      if (col === startCol) {
        cell.border = { ...cell.border, left: { style: "thin" } };
      }
    }
  }
  return sheet;
};
const makeAllBorders = ({ startCol, startRow, EndCol, EndRow, sheet }) => {
  for (let row = startRow; row <= EndRow; row++) {
    for (let col = startCol; col <= EndCol; col++) {
      let cell = sheet.getCell(row, col);
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }
  }
  return sheet;
};
