const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'postgresql://dev:dev@localhost/hacker-news-api';

exports.DATABASE = {
  client: 'pg',
  connection: 'postgres://ketifrif:5Ezna2ojaWREDfvWBE-oyy2kAzJi2bsx@stampy.db.elephantsql.com:5432/ketifrif',
  debug: true
};

exports.PORT = process.env.PORT || 8080; 