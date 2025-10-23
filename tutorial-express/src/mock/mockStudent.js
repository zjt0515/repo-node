// 使用 Mock
var Mock = require('mockjs');
var StudentMock = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'datas|10-20': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      name: '@cname',
      birthday: '@date',
      'sex|1-1': true,
      mobile: /1\d{10}/,
      'classId|1-5': 0
    }
  ]
}).datas;
// 输出结果
console.log(JSON.stringify(StudentMock, null, 4));

function mock() {
  const Student = require('../models/Student');
  const Class = require('../models/Class');
  Student.bulkCreate(StudentMock);
  console.log('mock success!');
}
