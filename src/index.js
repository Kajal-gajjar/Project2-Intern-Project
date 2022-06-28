const express = require("express");
var bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

const route = require("./routes/route.js");
const app = express();

app.use(bodyParser.json()); // tells the system that you want json to be used
app.use(bodyParser.urlencoded({ extended: true })); // It is a inbuilt method in express to recognize the incoming Request Object as strings or arrays

// mongoDb connection
mongoose
  .connect(
    "mongodb+srv://kajolshrivastava:mongo%401999@cluster0.hzs17.mongodb.net/group30Database",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

// Initial route
app.use("/", route);

// port
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});