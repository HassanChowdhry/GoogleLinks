/* eslint-disable quote-props, no-use-before-define, import/extensions */
/* eslint-disable import/prefer-default-export */
import fetch from 'node-fetch';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

import { SearchItem } from './modal.js';

import * as excelUtils from './ExcelUtils.js';

dotenv.config();

// Get user input -

// TODO: validate user input
let searchName = (await inquirer.prompt({
  name: 'search_name',
  type: 'input',
  message: 'What do you want to search in google?', 
})).search_name;

// TODO: validate user input
let searchNumber = (await inquirer.prompt({
  name: 'search_number',
  type: 'input',
  message: 'How many search results do you want? (max 100)', 
})).search_number;

// Lets do some magic - API call
const search = `q=${searchName}&num=${searchNumber}`;

const response = await (await fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${searchName}&num=${searchNumber}`, {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.API_KEY,
    'x-proxy-location': 'US',
  },
})).json();

// toModel
const searchItems = await response.results.map((item) => new SearchItem(item.title, item.description, item.link));

// Create excel!
const arrayOfArray = excelUtils.toExcelArrayOfArray(searchItems);
excelUtils.createExcel(arrayOfArray, searchName);
