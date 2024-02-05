const specialOwnerAccess = (req, res, next) => {
  
  if (req.isAuthenticated() && req.user.role === 'Owner') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Only Owners allowed.' });
};

const updateViewAccess = (req, res, next) => {
  console.log(req.user)
  if (req.isAuthenticated() && ['Owner', 'Manager', 'Cashier'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Only Staffs allowed.' });
};

const softDeleteAccess = (req, res, next) => {
  if (req.isAuthenticated() && ['Owner', 'Manager'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Only Manager and Owner allowed.' });
};

module.exports = {
  specialOwnerAccess,
  updateViewAccess,
  softDeleteAccess
};


// // User access only for ownler.
// const specialOwnerAccess = (req, res, next) => {
//     const userRole = req.user.role; // Extract from session data
//     if (userRole !== 'Owner') {
//       return res.status(403).json({ error: 'Access denied. Only Owners allowed.' });
//     }
//     next();
// };

// // Update records access for 3 types of users.
// const updateViewAccess = (req, res, next) => {
//     const userRole = req.user.role; // Extract from session data
//     if (userRole !== 'Owner' || 'Manager' || 'Cashier') {
//       return res.status(403).json({ error: 'Access denied. Only Staffs allowed.' });
//     }
//     next();
// };

// // Soft delete access for 2 types of users.
// const softDeleteAccess = (req, res, next) => {
//     const userRole = req.user.role; // Extract from session data
//     if (userRole !== 'Owner' || 'Manager' ) {
//       return res.status(403).json({ error: 'Access denied. Only Manager and Owner allowed.' });
//     }
//     next();
// };

// module.exports = {
//     specialOwnerAccess,
//     updateViewAccess,
//     softDeleteAccess
// };
