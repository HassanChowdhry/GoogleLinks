/* eslint-disable quote-props */
/* eslint-disable no-use-before-define */
import fetch from 'node-fetch';

import xlsx from 'xlsx';

import inquirer from 'inquirer';

import dotenv from 'dotenv';

// import SearchItem from './SearchItem';

dotenv.config();

class SearchItem {

  constructor(title, description, link) {
    this.title = title;
    this.description = description;
    this.link = link;
  }

}

let searchName = (await inquirer.prompt({
  // TODO: validate user input

  name: 'search_name',
  type: 'input',
  message: 'What do you want to search in google?', 
})).search_name;

let searchNumber = (await inquirer.prompt({
  // TODO: validate user input

  name: 'search_number',
  type: 'input',
  message: 'How many search results do you want? (max 100)', 
})).search_number;

const search = `q=${searchName}&num=${searchNumber}`;

async function loadSearchResults() {
  const response = await fetch(`https://google-search3.p.rapidapi.com/api/v1/search/${search}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.API_KEY,
      'x-proxy-location': 'US',
    }, 
  });
  const jsonResponse = await response.json();
  const searchItems = await mapToSearchItems(jsonResponse);
  const arrayOfArray = await toExcelArrayOfArray(searchItems);
  await createExcel(arrayOfArray);
}
await loadSearchResults();

function mapToSearchItems(data) {
  return data.results.map((item) => new SearchItem(item.title, item.description, item.link));
}

function toExcelArrayOfArray(searchItems) {
  const results = [['Title', 'Links']];
  searchItems.forEach((searchItem) => {
    results.push([searchItem.title, searchItem.link]);
  });
  return results;
}

function createExcel(arrayOfArray) {
  let name = searchName;
  name = name.split(' ').join('');

  const fileName = `${name}.xlsx`;
  const workSheetName = 'results';
  const workBook = xlsx.utils.book_new();
  let workSheet = xlsx.utils.aoa_to_sheet(arrayOfArray);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, fileName);
}
