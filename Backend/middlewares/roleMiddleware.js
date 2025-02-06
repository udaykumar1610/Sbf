const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }
  next();
};

module.exports = { adminOnly };
