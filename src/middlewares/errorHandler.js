const errorHandler = (err, req, res, next) => {
  console.log(err);
  process.env.NODE_ENV != "production" &&
    console.log("###errorhandler#### Error Stack: ", err.stack);
  if (err.myErrCode === "903") {
    // custom codes :- messages
    err.message = "Err code not defined. Please check at a future date.";
  }
  // res.status(500).json({ error: err.message });
  res.status(err.code).json({ error: err.message });
};

export default errorHandler;
