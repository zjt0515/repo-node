const swaggerJsdoc = require('swagger-jsdoc');

// Swagger配置选项
const options = {
  definition: {
    openapi: '3.0.0', // 版本号
    info: {
      title: 'Node.js API', // API名称
      version: '1.0.0', // API版本
      description: 'API 文档示例' // API描述
    }
  },
  apis: ['./routes/*.js'] // 包含API文档的路由文件的路径
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
