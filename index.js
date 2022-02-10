/* eslint-disable quote-props */
/* eslint-disable no-use-before-define */
import fetch from 'node-fetch';

import xlsx from 'xlsx';

import inquirer from 'inquirer';

import dotenv from 'dotenv';

dotenv.config();

class SearchItem {

  constructor(title, description, link) {
    this.title = title;
    this.description = description;
    this.link = link;
  }

}

let searchName;
let searchNumber; 

async function searchNameGetter() {
  const answers = await inquirer.prompt({
    name: 'search_name',
    type: 'input',
    message: 'What do you want to search in google?', 
    default() {
      return 'Search';
    },
  });
  searchName = answers.search_name;
}

async function searchNumberGetter() {
  const answers = await inquirer.prompt({
    name: 'search_number',
    type: 'input',
    message: 'How many search results do you want? (max 100)', 
    default() {
      return 'Number';
    },
  });
  searchNumber = answers.search_number;
}

await searchNameGetter();
await searchNumberGetter();

const search = `q=${searchName}&num=${searchNumber}`;
// convert to async await
fetch(`https://google-search3.p.rapidapi.com/api/v1/search/${search}`, {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.API_KEY,
  },
})
  .then((res) => res.json())
  .then((res) => createListOfSearchItem(res))
  .then((searchItems) => listToArrayOfArray(searchItems))
  .then((arrayOfArray) => createExcel(arrayOfArray))
  .catch((error) => console.log('error', error));
  
function createListOfSearchItem(data) {
  return data.results.map((item) => new SearchItem(item.title, item.description, item.link));
}

function listToArrayOfArray(searchItems) {
  const results = [['Title', 'Links']];
  searchItems.forEach((searchItem) => {
    results.push([searchItem.title, searchItem.link]);
  });
  return results;
}

function createExcel(arrayOfArray) {
  const fileName = 'GoogleLinks.xlsx';
  const workSheetName = 'results';
  const workBook = xlsx.utils.book_new();
  let workSheet = xlsx.utils.aoa_to_sheet(arrayOfArray);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, fileName);
}
// CREATE A GIST OF INQUIRER!! 
