const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // Ambil token dari header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY||"mysecretkey12345!@#security"); // Pastikan untuk menyimpan secret key dengan aman
        
        req.user_id = decoded.user_id;  // Simpan user_id ke request object untuk digunakan di query
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authenticate;
