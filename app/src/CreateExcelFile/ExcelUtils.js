import * as XLSX from "xlsx";

function toExcelArray(searchItems) {
  const result = searchItems.map((searchItem) => [
    searchItem.title,
    searchItem.link,
  ]);
  result.unshift(["Title", "Links"]);
  return result;
}

export function createExcel(searchItemsList, searchQuery) {
  const excelResultList = toExcelArray(searchItemsList);
  let name = searchQuery;
  name = name.trim().split(" ").join("-");

  const fileName = `${name}.xlsx`;
  const workSheetName = "results";
  const workBook = XLSX.utils.book_new();
  let workSheet = XLSX.utils.aoa_to_sheet(excelResultList);
  XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
  XLSX.writeFile(workBook, fileName);
}
