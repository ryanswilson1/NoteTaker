const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static("/assets"));

require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

app.listen(PORT, () => console.log("Server is running on " + PORT));