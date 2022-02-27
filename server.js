const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const PORT = process.env.PORT || 3000;
const app = express();
const AWS_NAME_API =
  "https://avbzrb4rcg.execute-api.us-east-2.amazonaws.com/prod/name-resource";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send(
    "<span>This is the home page of the server please click on this link for the function call response" +
      "<a href='/say?keyword=hello!!' target='_blank'> link </a></span>"
  );
});

app.get("/say", (req, res) => {
  let keyword = req.query.keyword;
  axios
    .post(AWS_NAME_API, { keyword })
    .then((response) => {
      return res.status(response.status).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
