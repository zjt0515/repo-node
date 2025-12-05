const articleMapper = article => ({
  title: article.title,
  desc: article.desc,
  toc: JSON.parse(article.toc),
  htmlContent: article.htmlContent,
  createDate: article.createDate,
  thumb: article.thumb
});
module.exports = articleMapper;
