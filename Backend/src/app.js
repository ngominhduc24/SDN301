var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
var cors = require("cors");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user.router");
const setupSwagger = require('./config/swagger');
var connectMongoDB =  require("./config/mongodb.config.js");
const categoryRouter = require("./routes/category.router.js");
const shopRouter = require("./routes/shop.router.js");
const productRouter = require("./routes/product.router.js");
const invoiceRouter = require("./routes/invoice.router.js");

require("dotenv").config();

// swagger url:  http://localhost:9999/api-docs/ 

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// routers controller
app.use("/", indexRouter);
app.use("/api", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/shop", shopRouter);
app.use("/api/product", productRouter);
app.use("/api/invoice", invoiceRouter);

// swagger config
setupSwagger(app);

// Connect mongo DB
connectMongoDB()

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
