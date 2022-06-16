import { SearchItem } from "../model/Model";

export async function search(searchQuery, numberOfResults) {
  const response = await (
    await fetch(
      `https://google-search3.p.rapidapi.com/api/v1/search/q=${searchQuery}&num=${numberOfResults}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-proxy-location": "US",
        },
      }
    )
  ).json();

  const searchItemList = await response.results.map(
    (item) => new SearchItem(item.title, item.description, item.link)
  ); 

  return searchItemList;
}
