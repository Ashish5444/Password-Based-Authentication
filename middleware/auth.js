module.exports.isAuth = async (req, res, next) => {
    if (req.session) {
      next();
    } else {
      res.json({ success: false, message: "Unauthorized" });
    }
  };
  