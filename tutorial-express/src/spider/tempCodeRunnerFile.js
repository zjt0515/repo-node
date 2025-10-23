// * =================== Section: utils ===================
async function getHtml(link) {
  const resp = await axios.get(link);
  return resp.data;
}
async function getBookLinks() {
  const html = getHtml('https://book.douban.com/latest');

  const $ = cheerio.load(html);

  const $bookLists = $('div.article ul li a');
  console.log($bookLists.length);
  // $bookLists.map(ele => {
  //   $(ele);
  // });
}

getBookLinks();