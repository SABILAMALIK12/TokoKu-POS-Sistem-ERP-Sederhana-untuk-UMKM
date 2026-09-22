const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const authRepository = require('./auth.repository');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const register = async ({ nama, email, password }) => {
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
        const error = new Error('email sudah terdaftar');
        error.statusCode = 400;
        throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authRepository.createUser({ nama, email, password: hashedPassword });
    return user;
};

const login = async ({ email, password }) => {
    const user = await authRepository.findByEmail(email);
    if (!user || !user.password) {
        const error = new Error('Email atau password salah');
        error.statusCode = 401
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Email atau password salah');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token, role: user.role };
};

const loginWithGoogle = async (credential) => {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name: nama } = payload;

    let user = await authRepository.findByGoogleId(googleId);

    if (!user) {
        const existingByEmail = await authRepository.findByEmail(email);
        if (existingByEmail) {
            const error = new Error('Email ini sudah terdaftar dengan metode login lain');
            error.statusCode = 400;
            throw error;
        }
        user = await authRepository.createGoogleUser({ nama, email, googleId });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token, role: user.role };
};

module.exports = { register, login, loginWithGoogle };