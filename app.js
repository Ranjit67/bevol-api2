const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});
app.get("/", async (req, res, next) => {
  try {
    res.json({ data: "success" });
  } catch (error) {
    next(error);
  }
});
//route section
const entery = require("./Router/entery");
app.use("/bevole", entery);
//route section end
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("The port 4000 is ready to start...");
});
