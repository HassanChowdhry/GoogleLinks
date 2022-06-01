import * as XLSX from "xlsx";

export function mapToExcelArray(searchItems) {
  const result = searchItems.map((searchItem) => [
    searchItem.title,
    searchItem.link,
  ]);
  result.unshift(["Title", "Links"]);
  return result;
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
