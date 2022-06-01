import { SearchItem } from "./modal";
import { mapToExcelArray } from "./ExcelUtils";

export async function fetchSearches(searchName, searchNumber) {
  const response = await (
    await fetch(
      `https://google-search3.p.rapidapi.com/api/v1/search/q=${searchName}&num=${searchNumber}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-proxy-location": "US",
        },
      }
    )
  ).json();

  const searchItems = await response.results.map(
    (item) => new SearchItem(item.title, item.description, item.link)
  );
  
  const arrayOfArray = mapToExcelArray(searchItems);  

  return arrayOfArray;
}
