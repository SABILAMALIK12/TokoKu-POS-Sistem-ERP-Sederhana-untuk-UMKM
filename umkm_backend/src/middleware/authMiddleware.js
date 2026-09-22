const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith ('Bearer ')) {
        return res.status(401).json({message: 'token tidak ditemukan' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) =>{
        if (err) {
            return res.status(401).json({message: 'Token tidak valid'});
        }
        req.user = decode;
        next();
    });
};

const isOwner = (req, res, next) => {
    if (req.user.role !== 'owner') {
        return res.status(403).json({message: 'Akses khusus owner '});
    }
    next();
}

const isStaff = (req, res, next) => {
    if (req.user.role === 'pending') {
        return res.status(403).json({message: "akun anda menunggu persetujuan owner" });
    }
    next();
}

module.exports = { verifyToken, isOwner};