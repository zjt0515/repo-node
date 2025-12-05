const Banner = require('./model/banner');

module.exports.addBannerDao = async function (banner) {
  const result = await Banner.create(banner);
};

module.exports.getBannerDao = async function (banner) {
  const result = await Banner.create(banner);
};
