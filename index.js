var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Example API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  let dateInput = req.params.date;

  if (!dateInput) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
  }

  let date;
  if (!isNaN(dateInput)) {
    date = new Date(parseInt(dateInput));
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
