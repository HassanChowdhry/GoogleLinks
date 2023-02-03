import { SearchItem } from "../model/Model";

export async function search(searchQuery, numberOfResults) {
  const response = await (
    await fetch(
      `https://google-web-search1.p.rapidapi.com/?query=${searchQuery}&limit=${numberOfResults}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
        },
      }
    )
  ).json();

  const searchItemList = await response.results.map(
    (item) => new SearchItem(item.title, item.description, item.url)
  );

  return searchItemList;
}
