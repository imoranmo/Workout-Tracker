const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api.js");

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
