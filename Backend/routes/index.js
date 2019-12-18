const user = require('./user');
const blog = require('./blog');
const category = require('./category');

module.exports = app => {
  app.use('/blog', blog);
  app.use('/user', user);
  app.use('/category', category);
  app.use('/', blog);
};