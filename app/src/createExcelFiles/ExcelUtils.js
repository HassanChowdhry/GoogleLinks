import * as XLSX from "xlsx";

export function toExcelArrayOfArray(searchItems) {
  const results = [["Title", "Links"]];
  searchItems.forEach((searchItem) => {
    results.push([searchItem.title, searchItem.link]);
  });
  return results;
}

export function createExcel(arrayOfArray, searchName) {
  let name = searchName;
  name = name.split(" ").join("");

  const fileName = `${name}.xlsx`;
  const workSheetName = "results";
  const workBook = XLSX.utils.book_new();
  let workSheet = XLSX.utils.aoa_to_sheet(arrayOfArray);
  XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
  XLSX.writeFile(workBook, fileName);
}
