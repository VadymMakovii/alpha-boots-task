const mongoose = require("mongoose");

const app = require("./app");
const bot = require("./bot");

const { DB_HOST, PORT = 8080 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    bot.launch().then();
    console.log("Bot launch successful")
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err.messsage);
    process.exit(1);
  });


module.exports = mongoose;