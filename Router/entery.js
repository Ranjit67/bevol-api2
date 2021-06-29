const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const http = require("https");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password, source } = req.body;

    const data = JSON.stringify({
      email,
      password,
      source,
    });
    const option = {
      hostname: "bevol.org",
      path: "/api/v2/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const requestData = await http.request(option, (responseData) => {
      let body = "";
      responseData.on("data", (chunk) => {
        body += chunk;
      });
      responseData.on("end", (chunk) => {
        const change = JSON.parse(body);
        res.send({ data: change });
      });
    });

    requestData.write(data);
    requestData.end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
