module.exports = (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    return res.status(401).json({ msg: "You do not have permission!" });
  }
  next();
};
