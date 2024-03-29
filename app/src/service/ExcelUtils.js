import * as XLSX from "xlsx";

function toExcelArray(searchItemList) {
  const result = searchItemList.map((searchItem) => [
    searchItem.title,
    searchItem.link,
    searchItem.description,
  ]);
  result.unshift(["Title", "Links", "Description"]);
  return result;
}

export function createExcel(searchItemList, searchQuery) {
  const excelResultList = toExcelArray(searchItemList);
  let name = searchQuery;
  name = name.trim().split(" ").join("-");

  const fileName = `${name}.xlsx`;
  const workSheetName = "results";
  const workBook = XLSX.utils.book_new();
  let workSheet = XLSX.utils.aoa_to_sheet(excelResultList);
  XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
  XLSX.writeFile(workBook, fileName);
}
