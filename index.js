/* eslint-disable no-use-before-define */
import fetch from 'node-fetch';

import xlsx from 'xlsx';

const search = 'q=dogs&num=100';

fetch(`https://google-search3.p.rapidapi.com/api/v1/search/${search}`, {
  method: 'GET',
  headers: {
    // key    
  },
})
  .then((res) => res.json())
  .then((res) => {
    // console.log(res);
    dataParsor(res);
  })
  .catch((error) => console.log('error', error));

const fileName = 'GoogleLinks.xlsx';
const workSheetName = 'results';
const workBook = xlsx.utils.book_new();

function dataParsor(data) {
  let content = [['Title', 'Links']];

  data.results.forEach((website, index) => {
    content[index + 1] = [website.title];
    content[index + 1].push(website.link); 
  });
  let workSheet = xlsx.utils.aoa_to_sheet(content);

  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, fileName);
}
