const checkAdmin = (req, res, next) => {
    const userEmail = req.headers['user-email']; // sent from frontend Auth0
    console.log("Checking admin access. Received email:", userEmail); // Log incoming header
    if (userEmail === "jadmousa12@gmail.com") {
        next();
    } else {
        res.status(403).json({ message: "Access denied" });
    }
};

export default checkAdmin;
