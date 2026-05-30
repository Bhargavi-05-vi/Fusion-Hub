// Role-based access control middleware
// "user" aur "customer" ko same maanta 
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userRole = req.user.role;
    // "user" aur "customer" same hain (frontend "user" bhejta hai)
    const normalizedRole = userRole === "user" ? "customer" : userRole;

    if (!roles.includes(normalizedRole) && !roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(" or ")}`,
      });
    }

    next();
  };
};

export default authorizeRoles;
