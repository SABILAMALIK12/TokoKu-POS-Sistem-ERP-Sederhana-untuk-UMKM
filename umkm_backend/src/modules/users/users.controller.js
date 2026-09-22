const userService = require('./users.service');

const getPending = async (req, res, next) => {
    try {
        const data = await userService.getPendingUsers();
        res.json({ data }); 

    }catch (err) {
        next(err);
    }
};

const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const data = await userService.updateUserRole(id, role);
        res.json({message : 'Role berhasil diperbarui', data});
    }catch (err){
        next(err);
    }
};

module.exports = { getPending, updateRole};