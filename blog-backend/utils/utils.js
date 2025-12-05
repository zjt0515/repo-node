const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { Model } = require('sequelize');
const toc = require('markdown-toc');

module.exports.decodeToken = function (token) {
  return jwt.verify(token.split(' ')[1], md5(process.env.JWT_SECRET));
};

module.exports.formatResponse = function (code, msg, data) {
  return {
    code,
    msg,
    data
  };
};

/**
 * 处理数组类型的 DAO数据
 * @param {Model} data
 * @returns
 */
module.exports.parseArrayData = function (data) {
  return data.map(item => item.dataValues);
};

module.exports.markdownToToc = function (md) {
  const articleToc = toc('# 1\n\n# 2\n\n ## 2-1\n\n ## 2-2\n\n # 3').json;
  console.log(articleToc);
  console.log(exports.transferToc(articleToc));
  return articleToc;
};

function createTocItem(toc) {
  return {
    name: toc.content,
    anchor: `title-${toc.lvl}`,
    children: []
  };
}

function findMinLvl(flatTocArr) {
  let res = Number.MAX_VALUE;
  for (const item of flatTocArr) {
    res = item.lvl < res ? item.lvl : res;
  }
  return res;
}

module.exports.transferToc = function (flatToc) {
  const result = [];
  // [1,2,2,3,2,1]
  const stack = [];
  const minLvl = findMinLvl(flatToc);
  console.log(`minLvl: ${minLvl}`);

  for (const item of flatToc) {
    const { lvl } = item;
    // 是根节点
    if (stack.length === 0 || lvl === minLvl) {
      console.log(`${item.content}是根元素`);
      const mapper = createTocItem(item);
      // 要插入子节点，使用item.children.push()
      item.children = mapper.children;
      result.push(mapper);
      stack.push(item);
      continue;
    }
    // 找当前节点的父节点
    while (stack.length && stack[stack.length - 1].lvl >= lvl) {
      // (栈顶节点没有子节点了)
      console.log(stack[stack.length - 1].content, '没有子节点了');
      stack.pop();
    }
    // 找到父节点
    if (stack.length) {
      const parent = stack[stack.length - 1];
      console.log(`找到${item.content}的父元素:${parent.content}`);
      if (parent.children == null) {
        console.log('object');
        parent.children = [];
      }
      parent.children.push(createTocItem(item));
    } else {
      result.push(createTocItem(item));
    }
    stack.push(item);
  }

  return result;
};

exports.markdownToToc();
