require("dotenv").config();
const express = require("express");
const cors = require("cors");
const generateRoute = require("./routes/generatePath");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/generate", generateRoute);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
