const errorHandler = (err, req, res, next) => {
  process.env.NODE_ENV != "production" &&
    console.log("###errorhandler#### Error Stack: ", err.stack);

  if (err.myErrCode === "903") {
    //                                    my custom codes :- messages
    err.message = "This code is still incomplete. Please at a future date.";
  }
  res.status(500).json({ error: err.message });
};

export default errorHandler;
