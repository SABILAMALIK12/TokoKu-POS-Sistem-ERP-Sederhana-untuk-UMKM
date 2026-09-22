const pool = require('../../config/db');

const findByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

const createUser = async ({nama, email, password, role }) => {
    const result = await pool.query (
        `INSERT INTO users (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, nama, email, role`,
        [nama, email, password, role || 'pending']
    );
    return result.rows[0];
};

const findByGoogleId = async (googleId) => {
    const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
    return result.rows[0];
};

const createGoogleUser = async ({nama, email, googleId }) => {
    const result = await pool.query(
        `INSERT INTO users (nama, email, google_id, role) VALUES ($1, $2, $3, 'pending') RETURNING id, nama, email, role`,
        [nama, email, googleId]

    );
    return result.rows[0]
}
module.exports = { findByEmail, createUser, findByGoogleId, createGoogleUser };