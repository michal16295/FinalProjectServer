const express = require("express");
const cors = require("cors");
const app = express();
var corOp = {
  credentials: true,
  origin: "http://localhost:3006",
  optionsSuccessStatus: 200,
};
app.use(cors(corOp));
const connectDB = require("./config/db");
connectDB();
require("./startup/routes")(app);
const PORT = process.env.PORT || 5010;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
