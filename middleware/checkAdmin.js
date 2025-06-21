const checkAdmin = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next(); // allow preflight to go through without blocking
      }
    const userEmail = req.headers['user-email']; // sent from frontend Auth0
    if (userEmail === "jadmousa12@gmail.com") {
        next();
    } else {
        res.status(403).json({ message: "Access denied" });
    }
};

export default checkAdmin;
