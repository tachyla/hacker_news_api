require('dotenv').config();
const {DATABASE_URL} = process.env;
<<<<<<< HEAD

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE_URL,
  debug: false
};

exports.PORT = process.env.PORT || 8080; 

console.log(DATABASE_URL);
=======
exports.DATABASE = {
	client: 'pg',
	connection: DATABASE_URL,
	debug: false
};

exports.PORT = process.env.PORT || 8080;

console.log(DATABASE_URL);
>>>>>>> 9aaaeb76babfcb17d2e5ab0aaff96241063dc9b9
