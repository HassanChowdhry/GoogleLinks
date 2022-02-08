const xlsx = require('xlsx');

let myHeaders = new Headers();

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

fetch('https://google-search3.p.rapidapi.com/api/v1/search/q=cats', requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));

let fileName = 'GoogleLinks.xlsx';
let wsName = 'results';

let wb = xlsx.utils.book_new();
let ws = xlsx.utils.aoa_to_sheet();

xlsx.utils.book_append_sheet(wb, ws, wsName);
xlsx.writeFile(wb, fileName);
