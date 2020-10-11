import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';

export default function ExcelService(headers, data, moduleName = 'report') {
  const filename = `${moduleName}_${moment().format('YYYYMMDD')}`;

  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet(filename);

  worksheet.columns = headers;

  addRows(worksheet, 1, data);

  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF8A80' },
  };

  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    fs.saveAs(blob, `${filename}.xlsx`);
  });
}

function addRows(worksheet, startRow, datas) {
  datas.forEach((data, id) => {
    const dataId = id + 1;
    worksheet.addRow({ id: dataId, ...data });
  });

  for (let i = startRow; i < datas.length + startRow + 1; i++) {
    worksheet.getRow(i).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  }

  return worksheet;
}
