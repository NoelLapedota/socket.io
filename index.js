require('dotenv').config()
const { port } = process.env;
const app = require('./app')


app.listen(port, (err) => {
  if (err) console.log("ERROR", err);
  console.log(`App running on port ${port}`);
});
