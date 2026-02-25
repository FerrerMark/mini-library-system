import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const jwt_token = process.env.JWT_SECRET;

    jwt.verify(token, jwt_token, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = decoded; 
        next();
    });
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

