/* eslint-disable quote-props */
/* eslint-disable no-use-before-define */
import fetch from 'node-fetch';

import xlsx from 'xlsx';

import dotenv from 'dotenv';

import inquirer from 'inquirer';

dotenv.config();

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
  .then((res) => {
    // console.log(res);
    dataParsor(res);
  })
  .catch((error) => console.log('error', error));
  
// split into two parts
const results = [];
function dataParsor(data) {
  data.results.forEach((website) => {
    results.push({
      'title': website.title,
      'link': website.link,
      'description': website.description,
    });
  });
}
console.log(results);

// const fileName = 'GoogleLinks.xlsx';
// const workSheetName = 'results';
// const workBook = xlsx.utils.book_new();
// let workSheet = xlsx.utils.aoa_to_sheet(); // array of arrays
// xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
// xlsx.writeFile(workBook, fileName);
