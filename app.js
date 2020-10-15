const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const mongoConfig = require("./config/mongo.config");

// connect to db
mongoConfig.connect();

// register user route
require('./routes/user.routes')(app);

app.use((res, err) => {
    res.status(401).json({ err });
});

var server = app.listen(process.env.PORT || 8110, () => {
    console.log(`Application started on PORT ${server.address().port}`);
});