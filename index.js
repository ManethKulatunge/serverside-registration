const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors")
const fs = require("fs");
let csvToJson = require("convert-csv-to-json");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.post("/csv", (req, res) => {
  console.log(req.body.fname)
  let newLine = "\r\n";

  let fields = ["fname", "lname", "email", "phone", "book", "os"];

  let appendThis = `${req.body.fname}, ${req.body.lname}, ${req.body.email}, ${req.body.phone}, ${req.body.book}, ${req.body.os}`;
  

  let toCsv = {
    data: appendThis,
    fields: fields,
    header: false,
  };

  let name = "mini6.csv"
  fs.stat(name, function (err, stat) {
    if (err == null) {
      console.log("File exists");

      //write the actual data and end with newline
      let csv = appendThis + newLine;

      fs.appendFile(name, csv, function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    } else {
      //write the headers and newline
      console.log("New file, just writing headers");
      fields = fields + newLine;

      fs.writeFile(name, fields, function (err) {
        if (err) throw err;
        console.log("file saved");
      });
    }
  });
  let json = csvToJson.getJsonFromCsv("mini6.csv");
  res.send(json)
});

app.get("/csvtojson", (req, res) => {
  let getJson = csvToJson.getJsonFromCsv("mini6.csv");
  res.send(getJson)
});

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
