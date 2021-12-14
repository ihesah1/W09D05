const mongoose = require('mongoose')
require('dotenv').config()
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(`mongodb://localhost/social`, options).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err.message);
  }
);
