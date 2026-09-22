const authService = require('./auth.service');

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: 'Registrasi berhasil', data: user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json({ message: 'Login berhasil', ...result });
  } catch (err) {
    next(err);
  }
};

const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;
    const result = await authService.loginWithGoogle(credential);
    res.json({ message: 'Login dengan akun Google berhasil', ...result});
  }catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } =req.body;
    const user = await userService.updateRole(id, role);
    res.json({message: 'Role berhasil diperbarui', data: user });
  }catch (err) {
    next(err);
  }
};

module.exports = { register, login, googleLogin, updateRole };