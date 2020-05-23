const express = require("express");
const formidable = require("formidable");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const { convertXMITOJSON } = require("../server1/scripts");
const cors = require("cors");

// middlewares
app.use(bodyParser.json());
app.use(cors());

app.post("/submit", (req, res) => {
  console.log("route visited");
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "error in parsing the file",
      });
    }

    if (files.myfile !== undefined) {
      console.log(files.myfile.path);

      convertXMITOJSON(files.myfile.path)
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((err) => console.log("error in getting result!"));
    } else {
      return res.status(400).json({
        error: "error in reading the file",
      });
    }
  });
});

app.get("/", (req, res) => {
  return res.send("hello world!");
});

const port = 8000 || process.env.PORT;

app.listen(port, () => {
  console.log("server is running on port ", port);
});
