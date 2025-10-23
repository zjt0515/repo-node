const { default: axios } = require('axios');
const cheerio = require('cheerio');
const sequelize = require('sequelize');

async function getBookDetail(detailUrl) {
  const html = await getHtml(detailUrl);
  // loading html
  const $ = cheerio.load(html);
  const $spans = $('#info span.pl');

  // name
  const bookName = $('h1').text().trim();
  // imgUrl
  const imgUrl = $('#mainpic a.nbg img').attr('src');
  // author
  const $authorSpan = $spans.filter((i, ele) => {
    return $(ele).text().includes('作者');
  });
  const author = $authorSpan.next().text().trim();
  // publishDate
  const $timeSpan = $spans.filter((i, ele) => {
    return $(ele).text().includes('出版年');
  });

  const time = $timeSpan[0].nextSibling.nodeValue.trim();

  // console.log($authorSpan);
  // console.log(bookName);
  // console.log(author);
  // console.log(time);
  // console.log(imgUrl);
  return {
    name: bookName,
    imgUrl,
    publishDate: time,
    author
  };
}

getBookDetail('https://book.douban.com/subject/37407149');

async function fetchAllBooks(params) {
  const links = getBookLinks();
}

async function saveToDB(books) {
  sequelize.bulkcreate();
}

// * =================== Section: utils ===================
async function getHtml(link) {
  const resp = await axios.get(link);
  return resp.data;
}
async function getBookLinks() {
  const html = await getHtml('https://book.douban.com/latest');

  const $ = cheerio.load(html);

  const $bookLinkLists = $('div.article a');
  console.log($bookLinkLists.length);
  const links = $bookLinkLists.map((i, ele) => {
    return ele.attr['href'];
  });
  console.log(links);
  // $bookLists.map(ele => {
  //   $(ele);
  // });
}

getBookLinks();
