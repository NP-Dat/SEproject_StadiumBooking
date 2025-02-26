const handleErrors = (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

export default handleErrors;