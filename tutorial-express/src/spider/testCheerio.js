const cheerio = require('cheerio');
const $ = cheerio.load(
  `<ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>`
);

const listItems = $('ul').find('li');

console.log(listItems);
