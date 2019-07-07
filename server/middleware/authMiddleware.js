const usersOnly = (req, res, next) => {
    if (!req.session.user) {
      res.status(401).json("Please log in");
      return;
    } else {
      next();
    }
  };
  
  const adminsOnly = (req, res, next) => {
    if (!req.session.user.isAdmin) {
      res.status(403).json("You are not an admin");
      return;
    }
    next();
  };
  
  module.exports = {
    usersOnly,
    adminsOnly
  };