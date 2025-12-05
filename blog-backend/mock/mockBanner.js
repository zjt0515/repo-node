// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
var banners = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'datas|5-10': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      title: '@title(3)',
      midImg: `${Random.image('200x100')}`,
      bigImg: `${Random.image('400x200')}`,
      desc: '@sentence()'
    }
  ]
}).datas;
// 输出结果
console.log(banners);
// console.log(JSON.stringify(banners));

function mock() {
  const Student = require('../models/Student');
  const Class = require('../models/Class');
  Student.bulkCreate(StudentMock);
  console.log('mock success!');
}

module.exports = banners;
