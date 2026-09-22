const usersRepository = require('./users.repository');

const ROLE_VALID = ['owner', 'kasir', 'pending'];

const getPendingUsers = () => usersRepository.findByRole('pending');

const updateUserRole = async (id, role) => {
  if (!ROLE_VALID.includes(role)) {
    const error = new Error('Role tidak valid');
    error.statusCode = 400;
    throw error;
  }

  const user = await usersRepository.findById(id);
  if (!user) {
    const error = new Error('User tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return usersRepository.updateRole(id, role);
};

module.exports = { getPendingUsers, updateUserRole };