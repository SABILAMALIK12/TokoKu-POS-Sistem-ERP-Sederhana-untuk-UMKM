const pool = require('../../config/db');

const findByRole = async (role) => {
    const result = await pool.query (
        'SELECT id, nama, email, role FROM users WHERE role = $1 ORDER BY id',
        [role]
    );
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT id, nama, email, role FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

const updateRole = async (id, role) => {
    const result = await pool.query (
        'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, nama, email, role',
        [role, id]
    );
    return result.rows[0]
}

module.exports = { findByRole, findById, updateRole}