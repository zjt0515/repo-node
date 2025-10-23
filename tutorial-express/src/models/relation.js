const Student = require('./Student');
const Class = require('./Class');

Student.belongsTo(Class);
Class.hasMany(Student);
