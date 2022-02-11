import xlsx from 'xlsx';

export function toExcelArrayOfArray(searchItems) {
  const results = [['Title', 'Links']];
  searchItems.forEach((searchItem) => {
    results.push([searchItem.title, searchItem.link]);
  });
  return results;
}

export function createExcel(arrayOfArray, searchName) {
  let name = searchName;
  name = name.split(' ').join('');

  const fileName = `output/${name}.xlsx`;
  const workSheetName = 'results';
  const workBook = xlsx.utils.book_new();
  let workSheet = xlsx.utils.aoa_to_sheet(arrayOfArray);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, fileName);
}
