const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors")
const fs = require("fs");
const json2csv = require("json2csv");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.post("/csv", (req, res) => {
  console.log(req.body.fname)
  res.send("hello");
  let newLine = "\r\n";

  let fields = ["fname", "lname", "email", "phone", "book", "os"];

  let appendThis = `${req.body.fname}, ${req.body.lname}, ${req.body.email}, ${req.body.phone}, ${req.body.book}, ${req.body.os}`;
  

  let toCsv = {
    data: appendThis,
    fields: fields,
    header: false,
  };

  fs.stat("file.csv", function (err, stat) {
    if (err == null) {
      console.log("File exists");

      //write the actual data and end with newline
      let csv = appendThis + newLine;

      fs.appendFile("file.csv", csv, function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    } else {
      //write the headers and newline
      console.log("New file, just writing headers");
      fields = fields + newLine;

      fs.writeFile("file.csv", fields, function (err) {
        if (err) throw err;
        console.log("file saved");
      });
    }
  });
});

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
